import * as Sentry from '@sentry/browser'
import * as serviceWorker from './serviceWorker'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { initVoiceRecognition, voiceReduxAdaptor } from 'features/voice'
import {
  makeRecipe,
  nextRecipe,
  prevRecipe,
} from 'features/recipes/recipeSlice'

import App from './components/App'
import { DbOwner } from 'app/db'
import ErrorBoundary from 'components/ErrorBoundary'
import Homepage from 'components/Homescreen'
import { LinearProgress } from '@material-ui/core'
import LoginForm from 'features/accounts/LoginForm'
import { Provider } from 'react-redux'
import React from 'react'
import RehydrateGuard from 'components/RehydrateGuard'
import SignupForm from 'features/accounts/SignupForm'
import { version as release } from '../package.json'
import { render } from 'react-dom'
import store from './app/store'
import useStyles from 'globalStyle'

Sentry.init({
  dsn: 'https://60a4c38b006549769ba249366b78887b@sentry.io/1850302',
  release,
  environment: process.env.NODE_ENV,
})

const Configured: React.FC = () => {
  useStyles()

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignupForm />
            </Route>
            <Route path="/app">
              <DbOwner />
              <RehydrateGuard loading={<LinearProgress />}>
                <App />
              </RehydrateGuard>
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </ErrorBoundary>
  )
}
render(<Configured />, document.getElementById('root'))

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
