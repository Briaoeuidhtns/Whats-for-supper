import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { configureStore } from 'redux-starter-kit'

import App from './components/App'
import rootReducer from './app/rootReducer'

import * as serviceWorker from './serviceWorker'

const store = configureStore({
  reducer: rootReducer,
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
