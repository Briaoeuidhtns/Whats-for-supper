import { Action } from 'redux'

export class InvalidReducerCallError extends Error {
  action: Action

  constructor(action: Action, msg?: string) {
    super(`${msg}: ${JSON.stringify(action)}`)
    this.name = 'InvalidReducerCallError'
    this.action = action
  }
}
