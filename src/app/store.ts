import * as Sentry from '@sentry/browser'
import {
  configureStore,
  getDefaultMiddleware,
  Middleware,
} from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { shuffleRecipes, getFromCouch } from '../features/recipes/recipeSlice'
import PouchDB from 'pouchdb'
import Pouch from 'pouchdb-upsert'
import { testAwait } from 'util/test'
import { isPouchDBError } from 'util/types/pouchdb'
import { isEqual } from 'lodash'
PouchDB.plugin(Pouch)

type State = ReturnType<typeof store.getState>
export interface Model {
  state: State
}

const shuffleSalt = Date.now()
const observeStore = (
  mstore: typeof store,
  onChange: (state: State) => void
) => {
  let currentState: State

  function handleChange() {
    let nextState = store.getState()
    if (!isEqual(nextState, currentState)) {
      currentState = nextState
      onChange(currentState)
    }
  }
  mstore.dispatch(shuffleRecipes(shuffleSalt))
  const unsubscribe = mstore.subscribe(handleChange)
  handleChange()
  return unsubscribe
}

const COUCHDB_HOST = process.env.REACT_APP_COUCHDB_HOST ?? 'http://localhost'
const COUCHDB_PORT = process.env.REACT_APP_COUCHDB_PORT ?? 5984
const COUCHDB_DB = process.env.REACT_APP_COUCHDB_DB ?? 'cards'

const db = new PouchDB<Model>(COUCHDB_DB)
db.sync<Model>(`${COUCHDB_HOST}:${COUCHDB_PORT}/${COUCHDB_DB}`, {
  live: true,
  retry: true,
}).on('change', function(info) {
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
  reducer: rootReducer,
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
          //PERSIST,
        ],
      },
    }),
  ],
})

//const persistor = persistStore(store, null, () => {
//  store.dispatch(shuffleRecipes(shuffleSalt))
//})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    store.replaceReducer(rootReducer)
  })
}

observeStore(store, state => testAwait(addfirst(state)))

export type AppDispatch = typeof store.dispatch

export default store

//export { persistor }
