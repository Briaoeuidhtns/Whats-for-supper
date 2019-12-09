import * as Sentry from '@sentry/browser'
import {
  configureStore,
  getDefaultMiddleware,
  Middleware,
} from 'redux-starter-kit'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'
import { PERSIST } from 'redux-persist/lib/constants'
import { shuffleRecipes } from '../features/recipes/recipeSlice'

const persistConfig = { key: 'root', storage, whitelist: ['recipes'] }

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
    const nextRootReducer = require('./rootReducer').default // TODO replace with es6 import
    store.replaceReducer(persistReducer(persistConfig, nextRootReducer))
  })
}

export type AppDispatch = typeof store.dispatch

export default store

export { persistor }
