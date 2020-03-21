import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import * as Sentry from '@sentry/browser'

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
import RehydrateGuard from 'components/RehydrateGuard'
import { LinearProgress } from '@material-ui/core'

Sentry.init({
  dsn: 'https://60a4c38b006549769ba249366b78887b@sentry.io/1850302',
  release,
  environment: process.env.NODE_ENV,
})

render(
  <ErrorBoundary>
    <Provider store={store}>
      <RehydrateGuard loading={<LinearProgress />}>
        <App />
      </RehydrateGuard>
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
