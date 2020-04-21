import { Recipe, makeRecipe } from '.'
import uiReducer, {
  availabilityStateMap,
  cancelEdit,
  nextRecipe,
  openRecipeDialog,
  prevRecipe,
  toggleDescription,
} from './uiSlice'

const defaultState = uiReducer(undefined, { type: undefined })
const rootstate = {
  settings: { voiceControl: false },
}

const dummyRecipe: Recipe = {
  title: 'Dummy Recipe',
  description: 'Dummy Recipe Description',
  tags: ['Dummy Tag'],
  rating: 3,
}

describe('ui reducer', () => {
  it('should handle prevRecipe', () => {
    expect(
      uiReducer(
        {
          index: 1,
          showDescription: false,
        },
        { type: prevRecipe.type }
      )
    ).toMatchObject({
      index: 0,
      showDescription: false,
    })

    expect(
      uiReducer(
        {
          index: 1,
          showDescription: true,
        },
        { type: prevRecipe.type }
      )
    ).toMatchObject({
      index: 0,
      showDescription: false,
    })
  })

  it('should handle nextRecipe', () => {
    expect(
      uiReducer(
        {
          index: 0,
          showDescription: false,
        },
        { type: nextRecipe.type }
      )
    ).toMatchObject({
      index: 1,
      showDescription: false,
    })
  })

  it('should handle makeRecipe', () => {
    expect(
      uiReducer(
        {
          ...defaultState,
          index: 0,
        },
        { type: makeRecipe.type, payload: 0 }
      )
    ).toMatchObject({ index: 0 })

    expect(
      uiReducer(
        {
          ...defaultState,
          index: 1,
        },
        { type: makeRecipe.type, payload: 1 }
      )
    ).toMatchObject({ index: 0 })
  })

  expect(
    uiReducer({ ...defaultState, index: 1 }, { type: makeRecipe.type })
  ).toMatchObject({
    index: 0,
    showDescription: false,
  })

  it('should show the description on toggle', () => {
    expect(
      uiReducer(
        {
          ...defaultState,
          showDescription: false,
        },
        { type: toggleDescription.type }
      )
    ).toMatchObject({
      showDescription: true,
    })

    expect(
      uiReducer(
        {
          ...defaultState,
          showDescription: true,
        },
        { type: toggleDescription.type }
      )
    ).toMatchObject({
      showDescription: false,
    })
  })

  it('should open the add recipe modal dialog', () => {
    expect(
      uiReducer(
        {
          ...defaultState,
          editing: undefined,
        },
        { type: openRecipeDialog.type, payload: 'add' }
      )
    ).toMatchObject({
      ...defaultState,
      editing: 'add',
    })
  })

  it('should open the edit current recipe modal dialog', () => {
    expect(
      uiReducer(
        {
          ...defaultState,
          editing: undefined,
        },
        { type: openRecipeDialog.type, payload: 'current' }
      )
    ).toMatchObject({
      ...defaultState,
      editing: defaultState.index,
    })
  })

  it('should open the edit at index recipe modal dialog', () => {
    expect(
      uiReducer(
        {
          ...defaultState,
          editing: undefined,
        },
        { type: openRecipeDialog.type, payload: 0 }
      )
    ).toMatchObject({
      ...defaultState,
      editing: 0,
    })
  })

  it('should close the recipe modal dialog', () => {
    expect(
      uiReducer(
        {
          ...defaultState,
          editing: 'add',
        },
        { type: cancelEdit.type }
      )
    ).toMatchObject({
      ...defaultState,
      editing: undefined,
    })
  })
})

describe('avaliability state map', () => {
  it('describes recipe availability', () => {
    expect(
      availabilityStateMap({
        ...rootstate,
        recipes: {
          recipes: { recipes: [] },
          recipeUi: { ...defaultState, index: 0 },
        },
      })
    ).toEqual({
      hasPrev: false,
      has: false,
      hasNext: false,
    })

    expect(
      availabilityStateMap({
        ...rootstate,
        recipes: {
          recipes: { recipes: [dummyRecipe] },
          recipeUi: { ...defaultState, index: 0 },
        },
      })
    ).toEqual({
      hasPrev: false,
      has: true,
      hasNext: false,
    })

    expect(
      availabilityStateMap({
        ...rootstate,
        recipes: {
          recipes: { recipes: [dummyRecipe, dummyRecipe] },
          recipeUi: { ...defaultState, index: 0 },
        },
      })
    ).toEqual({
      hasPrev: false,
      has: true,
      hasNext: true,
    })

    expect(
      availabilityStateMap({
        ...rootstate,
        recipes: {
          recipes: { recipes: [dummyRecipe, dummyRecipe] },
          recipeUi: { ...defaultState, index: 1 },
        },
      })
    ).toEqual({
      hasPrev: true,
      has: true,
      hasNext: false,
    })
  })
})
