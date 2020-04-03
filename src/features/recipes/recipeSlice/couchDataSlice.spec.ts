import _recipeDataReducer, { Recipe } from './recipeDataSlice'
import getFromCouchReducer, {
  addDefaultRecipes,
  getFromCouch,
  minimalInitialState,
} from './couchDataSlice'

import { Action } from 'redux'
import { isReduxInternalAction } from 'util/types/redux'

jest.mock('./recipeDataSlice')

const recipeDataReducer = _recipeDataReducer as jest.MockedFunction<
  typeof _recipeDataReducer
>

const dummyRecipe: Recipe = {
  title: 'Dummy Recipe',
  description: 'Dummy Recipe Description',
  rating: 3,
  tags: [],
}

describe('get from couch reducer', () => {
  it('has the proper action creator type', () => {
    const action = getFromCouch({ state: { recipes: [], rehydrated: true } })
    expect(action.type).toBe('couchdb/getFromCouch')
  })

  it('should handle update from remote', () => {
    expect(
      getFromCouchReducer(
        undefined,
        getFromCouch({ state: { recipes: [dummyRecipe] } })
      )
    )
  })

  it('should handle populating defaults', () => {
    const action = addDefaultRecipes()
    const state = getFromCouchReducer(undefined, action)
    recipeDataReducer.mockReturnValue(minimalInitialState)

    expect(state.rehydrated).toBeTruthy()
    expect(recipeDataReducer).toHaveBeenCalledWith(undefined, action)
  })

  it('should throw on invalid calls', () => {
    expect(() =>
      getFromCouchReducer(undefined, { type: 'tests/INVALID_ACTION_TYPE' })
    ).toThrowErrorMatchingInlineSnapshot(
      `"Action dispatched before rehydrated: {\\"type\\":\\"tests/INVALID_ACTION_TYPE\\"}"`
    )
  })

  it('should initialize with minimal state on redux internal', () => {
    const action: Action = {
      type: '@@REDUX/DUMMY_INTERNAL',
    }
    expect(isReduxInternalAction(action)).toBeTruthy()

    const state = getFromCouchReducer(undefined, action)
    expect(state.rehydrated).toBeFalsy()
    expect(state.recipes).toHaveLength(0)
  })

  it('should pass through calls to recipeDataSlice after initialized', () => {
    const args = [
      { ...minimalInitialState, rehydrated: true },
      { type: 'test/dummyAction' },
    ] as const

    getFromCouchReducer(...args)

    expect(recipeDataReducer).toHaveBeenCalledWith(...args)
  })
})
