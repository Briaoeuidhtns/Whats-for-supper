import { Action } from 'redux'

export const isReduxInternalAction = (
  action: Action<unknown>
): action is Action<never> =>
  typeof action.type == 'string' && action.type.startsWith('@@')
