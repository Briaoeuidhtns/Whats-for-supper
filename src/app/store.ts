import { configureStore } from 'redux-starter-kit'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'

const store = configureStore({
  reducer: persistReducer({ key: 'root', storage }, rootReducer),
  devTools: process.env.NODE_ENV !== 'production',
})

const persistor = persistStore(store)

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default // TODO replace with es6 import
//     store.replaceReducer(newRootReducer)
//   })
// }

export type AppDispatch = typeof store.dispatch

export default store

export { persistor }
