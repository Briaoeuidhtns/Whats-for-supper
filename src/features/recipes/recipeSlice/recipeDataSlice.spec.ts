import recipeReducer, {
  Recipe,
  addRecipe,
  shuffleRecipes,
} from './recipeDataSlice'

const defaultState = recipeReducer(undefined, { type: undefined })

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
  }

describe('recipe data reducer', () => {
  it('should handle addRecipe', () => {
    expect(
      recipeReducer(
        {
          recipes: [],
        },
        { type: addRecipe.type, payload: dummyRecipe }
      )
    ).toEqual({
      recipes: [dummyRecipe],
    })

    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe],
        },
        { type: addRecipe.type, payload: dummyRecipe2 }
      )
    ).toEqual({
      recipes: [dummyRecipe, dummyRecipe2],
    })
  })

  it('should shuffle recipes', () => {
    // Using the large set of data to reduce chance of shuffle not changing order
    const shuffled = recipeReducer(defaultState, {
      type: shuffleRecipes.type,
      payload: 0,
    })
    expect(shuffled.recipes).not.toEqual(defaultState.recipes)

    expect(shuffled).toMatchObject({
      recipes: expect.arrayContaining(defaultState.recipes),
    })

    expect(shuffled.recipes).toHaveLength(defaultState.recipes.length)

    expect(shuffled).toMatchSnapshot()
  })
})
