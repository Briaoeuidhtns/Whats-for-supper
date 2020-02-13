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
import { shuffleRecipes } from '../features/recipes/recipeSlice'
import PouchDB from 'pouchdb'
import Pouchpls from 'pouchdb-upsert'
import { testAwait } from 'util/test'
import { isPouchDBError } from 'util/types/pouchdb'
PouchDB.plugin(Pouchpls)

const persistConfig = { key: 'root', storage, whitelist: ['recipes'] }

interface Model {
  state: ReturnType<typeof store.getState>
}

const db = new PouchDB<Model>('http://localhost:5984/cards')
testAwait(db.info())

const addfirst = async (mstore: any) => {
  // TODO remove after Redux Persist is removed
  const { _persist: _, ...state } = mstore.getState()
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

const addtodata: Middleware = mstore => next => action => {
  const add_to = next(action)
  testAwait(addfirst(mstore))
  return add_to
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
    addtodata,
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

export type AppDispatch = typeof store.dispatch

export default store

export { persistor }
