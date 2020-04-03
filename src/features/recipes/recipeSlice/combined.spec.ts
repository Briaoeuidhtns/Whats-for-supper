import { Recipe, makeRecipe, minimalInitialState, removeRecipe } from '.'

import combinedRecipeReducer from './combined'

// Not using the default from combinedRecipeReducer to avoid default recipes
const defaultState: ReturnType<typeof combinedRecipeReducer> = {
  recipes: minimalInitialState,
  recipeUi: { index: 0, showDescription: false },
}

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

describe('combined recipe reducer', () => {
  it('should handle removeRecipe', () => {
    expect(
      combinedRecipeReducer(
        {
          ...defaultState,
          recipes: {
            recipes: [dummyRecipe],
            rehydrated: true,
          },
        },
        { type: removeRecipe.type, payload: 0 }
      )
    ).toMatchObject({
      recipes: {
        recipes: [],
      },
    })

    expect(
      combinedRecipeReducer(
        {
          ...defaultState,
          recipes: {
            recipes: [dummyRecipe, dummyRecipe2],
            rehydrated: true,
          },
        },
        { type: removeRecipe.type, payload: 1 }
      )
    ).toMatchObject({
      recipes: { recipes: [dummyRecipe] },
    })

    expect(
      combinedRecipeReducer(
        {
          ...defaultState,
          recipes: {
            recipes: [dummyRecipe, dummyRecipe2],
            rehydrated: true,
          },
        },
        { type: removeRecipe.type, payload: 0 }
      )
    ).toMatchObject({
      recipes: { recipes: [dummyRecipe2] },
    })
  })

  it('should handle makeRecipe', () => {
    expect(
      combinedRecipeReducer(
        {
          ...defaultState,
          recipes: {
            recipes: [dummyRecipe, dummyRecipe2],
            rehydrated: true,
          },
        },
        { type: makeRecipe.type }
      )
    ).toMatchObject({
      recipes: { recipes: [dummyRecipe2, dummyRecipe] },
    })

    expect(
      combinedRecipeReducer(
        {
          ...defaultState,
          recipes: { recipes: [dummyRecipe, dummyRecipe2], rehydrated: true },
        },
        { type: makeRecipe.type, payload: 1 }
      )
    ).toMatchObject({
      recipes: { recipes: [dummyRecipe, dummyRecipe2] },
    })
  })

  expect(
    combinedRecipeReducer(
      {
        ...defaultState,
        recipes: {
          recipes: [dummyRecipe, dummyRecipe2, dummyRecipe3],
          rehydrated: true,
        },
      },
      { type: makeRecipe.type, payload: 1 }
    )
  ).toMatchObject({
    recipes: { recipes: [dummyRecipe, dummyRecipe3, dummyRecipe2] },
  })
})
