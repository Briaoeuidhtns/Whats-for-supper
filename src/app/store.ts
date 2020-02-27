import * as Sentry from '@sentry/browser'
import {
  configureStore,
  getDefaultMiddleware,
  Middleware,
} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'
import { PERSIST } from 'redux-persist/lib/constants'
import { shuffleRecipes,getFromCouch } from '../features/recipes/recipeSlice'
import PouchDB from 'pouchdb'
import Pouchpls from 'pouchdb-upsert'
import { testAwait } from 'util/test'
import { isPouchDBError } from 'util/types/pouchdb'
PouchDB.plugin(Pouchpls)

const persistConfig = { key: 'root', storage, whitelist: ['recipes'] }
type State = ReturnType<typeof store.getState>
export interface Model {
  state: State
}

function observeStore(mstore: typeof store, onChange: (store: State) => void) {
  let currentState: State

  function handleChange() {
    let nextState = store.getState()
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}


const db = new PouchDB<Model>('cards')
const sync = db.sync<Model>('http://localhost:5984/cards', {
  live: true,
  retry: true
}).on('change', function(info){
  store.dispatch(getFromCouch(info))
})

const addfirst = async (mstore: State) => {
  // TODO remove after Redux Persist is removed
  const { ...state } = mstore
  try {
    await db.upsert('State', oldstate => ({
      ...oldstate,
      state,
    }))
  } catch (error) {
    if (isPouchDBError(error)) console.error(error)
    throw error
  }
}

const sentryReporter: Middleware = store => next => action => {
  Sentry.addBreadcrumb({
    level: Sentry.Severity.Info,
    message: 'Dispatched action',
    data: { ...action },
  })
  try {
    return next(action)
  } catch (error) {
    Sentry.setExtras({ state: store.getState(), action })
    Sentry.captureException(error)
    throw error
  }
}

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [
    sentryReporter,
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // redux-persist uses non serializable functions in the PERSIST action
          // This isn't great practice, but it's pretty harmless
          // Only disable their action to keep checking for our own
          // https://github.com/rt2zz/redux-persist/issues/988
          PERSIST,
        ],
      },
    }),
  ],
})

const shuffleSalt = Date.now()
const persistor = persistStore(store, null, () => {
  store.dispatch(shuffleRecipes(shuffleSalt))
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    store.replaceReducer(persistReducer(persistConfig, rootReducer))
  })
}


observeStore(store, state => testAwait(addfirst(state)))

export type AppDispatch = typeof store.dispatch

export default store

export { persistor }
