import { Store } from 'redux'
import { isEqual } from 'lodash'

export const observeStore = <StoreT extends Store>(
  mstore: StoreT,
  onChange: (state: ReturnType<StoreT['getState']>) => void
) => {
  let currentState: ReturnType<StoreT['getState']>

  const handleChange = () => {
    let nextState = mstore.getState()
    if (!isEqual(nextState, currentState)) {
      currentState = nextState
      onChange(currentState)
    }
  }
  const unsubscribe = mstore.subscribe(handleChange)
  handleChange()
  return unsubscribe
}
