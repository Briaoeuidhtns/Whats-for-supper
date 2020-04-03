import { identity, isEqual } from 'lodash'

import { Store } from 'redux'

export const observeStore = <StoreT extends Store, T>(
  mstore: StoreT,
  onChange: (t: T) => void,
  selector: (state: ReturnType<StoreT['getState']>) => T = identity
) => {
  let currentState: T

  const handleChange = () => {
    let nextState = selector(mstore.getState())
    if (!isEqual(nextState, currentState)) {
      currentState = nextState
      onChange(currentState)
    }
  }
  const unsubscribe = mstore.subscribe(handleChange)
  handleChange()
  return unsubscribe
}
