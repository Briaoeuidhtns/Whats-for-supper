import { configureStore } from 'redux-starter-kit'
import rootReducer from './rootReducer'

const store = configureStore({ reducer: rootReducer })

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default // TODO replace with es6 import
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store
