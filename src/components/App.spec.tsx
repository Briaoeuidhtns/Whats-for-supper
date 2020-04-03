import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { pending } from 'util/test'
import store from '../app/store'

it('renders without crashing', async () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider {...{ store }}>
      <App />
    </Provider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
  await pending()
})
