import recipeDataReducer, {
  Recipe,
  RecipeListState,
  addRecipe,
  shuffleRecipes,
} from './recipeDataSlice'

const defaultState = recipeDataReducer(undefined, { type: undefined })
const minimalInitialState: RecipeListState = { recipes: [] }

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
      recipeDataReducer(
        {
          ...minimalInitialState,
          recipes: [],
        },
        { type: addRecipe.type, payload: dummyRecipe }
      )
    ).toMatchObject({
      recipes: [dummyRecipe],
    })

    expect(
      recipeDataReducer(
        {
          ...minimalInitialState,
          recipes: [dummyRecipe],
        },
        { type: addRecipe.type, payload: dummyRecipe2 }
      )
    ).toMatchObject({
      recipes: [dummyRecipe, dummyRecipe2],
    })
  })

  it('should shuffle recipes', () => {
    // Using the large set of data to reduce chance of shuffle not changing order
    const shuffled = recipeDataReducer(defaultState, {
      type: shuffleRecipes.type,
      payload: 0,
    })
    expect(shuffled.recipes).not.toEqual(defaultState.recipes)

    expect(shuffled).toMatchObject({
      recipes: expect.arrayContaining(defaultState.recipes),
    })

    expect(shuffled.recipes).toHaveLength(defaultState.recipes.length)

    expect(shuffled.recipes).toMatchSnapshot()
  })
})
