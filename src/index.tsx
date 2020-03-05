import React from 'react'
import { render } from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import * as Sentry from '@sentry/browser'

import { CircularProgress } from '@material-ui/core'

import App from './components/App'
import store from './app/store' //, { persistor } 
import ErrorBoundary from 'components/ErrorBoundary'

import { version as release } from '../package.json'
import { initVoiceRecognition, voiceReduxAdaptor } from 'features/voice'
import {
  nextRecipe,
  prevRecipe,
  makeRecipe,
} from 'features/recipes/recipeSlice'

Sentry.init({
  dsn: 'https://60a4c38b006549769ba249366b78887b@sentry.io/1850302',
  release,
  environment: process.env.NODE_ENV,
})


render(
  <ErrorBoundary>
    <Provider store={store}>
        <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
)

initVoiceRecognition?.(
  voiceReduxAdaptor(store.dispatch, {
    next: nextRecipe,
    back: prevRecipe,
    select: makeRecipe,
  })
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
