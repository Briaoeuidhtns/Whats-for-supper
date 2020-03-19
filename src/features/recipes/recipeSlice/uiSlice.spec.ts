import uiReducer, {
  prevRecipe,
  nextRecipe,
  toggleDescription,
  availabilityStateMap,
} from './uiSlice'
import { Recipe, removeRecipe, makeRecipe } from '.'

const defaultState = uiReducer(undefined, { type: undefined })

const dummyRecipe: Recipe = {
    title: 'Dummy Recipe',
    description: 'Dummy Recipe Description',
    tags: ['Dummy Tag'],
    rating: 3,
  },
  dummyRecipe2: Recipe = {
    title: 'Dummy Recipe 2',
    description: 'Dummy Recipe 2 Description',
    tags: ['Dummy Tag'],
  },
  dummyRecipe3: Recipe = {
    title: 'Dummy Recipe 3',
    description: 'Dummy Recipe 3 Description',
    tags: ['Dummy Tag'],
    rating: 5,
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
})

describe('avaliability state map', () => {
  it('describes recipe availability', () => {
    expect(
      availabilityStateMap({
        recipes: { recipes: [] },
        recipeUi: { ...defaultState, index: 0 },
      })
    ).toEqual({
      hasPrev: false,
      has: false,
      hasNext: false,
    })

    expect(
      availabilityStateMap({
        recipes: { recipes: [dummyRecipe] },
        recipeUi: { ...defaultState, index: 0 },
      })
    ).toEqual({
      hasPrev: false,
      has: true,
      hasNext: false,
    })

    expect(
      availabilityStateMap({
        recipes: { recipes: [dummyRecipe, dummyRecipe] },
        recipeUi: { ...defaultState, index: 0 },
      })
    ).toEqual({
      hasPrev: false,
      has: true,
      hasNext: true,
    })

    expect(
      availabilityStateMap({
        recipes: { recipes: [dummyRecipe, dummyRecipe] },
        recipeUi: { ...defaultState, index: 1 },
      })
    ).toEqual({
      hasPrev: true,
      has: true,
      hasNext: false,
    })
  })
})
