import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'
import { PERSIST } from 'redux-persist/lib/constants'

const persistConfig = { key: 'root', storage }

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
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
})

const persistor = persistStore(store)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer').default // TODO replace with es6 import
    store.replaceReducer(persistReducer(persistConfig, nextRootReducer))
  })
}

export type AppDispatch = typeof store.dispatch

export default store

export { persistor }
