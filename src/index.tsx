import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import App from './components/App'

import store, { persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'

import CircularProgress from '@material-ui/core/CircularProgress'

import * as serviceWorker from './serviceWorker'

render(
  <Provider store={store}>
    <PersistGate loading={<CircularProgress />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
