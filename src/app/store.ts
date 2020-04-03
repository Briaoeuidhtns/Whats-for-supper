import * as Sentry from '@sentry/browser'
import {
  configureStore,
  getDefaultMiddleware,
  Middleware,
} from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

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
  middleware: [sentryReporter, ...getDefaultMiddleware()],
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    store.replaceReducer(rootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export type Store = typeof store
export default store
