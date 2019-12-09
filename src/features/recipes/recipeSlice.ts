import { createSlice, PayloadAction } from 'redux-starter-kit'
import { RootState } from '../../app/rootReducer'
import { sha1 as hash } from 'hash.js'
import InitialRecipes from '../../recipes'

export interface Recipe {
  title: string
  description: string
  image?: string
  rating?: number
}

export interface RecipeListState {
  recipes: Recipe[]
}

let initialState: RecipeListState = {
  recipes: InitialRecipes,
}

// To the best of my knowledge, this generates a normalish distribution
const keyfn = (val: Recipe, salt: any) => {
  const variance = 15
  const [...h] = hash()
    .update(JSON.stringify({ val, salt }))
    .digest('hex')

  const shift =
    (h.map(a => parseInt(a, 16)).reduce((a, b) => a + b) -
      (15 * h.length) / 2) / // Shift center to 0
    variance // Shrink the range

  return shift
}

const recipeSlice = createSlice({
  slice: 'recipes',
  initialState,
  reducers: {
    addRecipe(state, { payload: recipe }: PayloadAction<Recipe>) {
      state.recipes.push(recipe)
    },
    removeRecipe(state, { payload: index }: PayloadAction<number>) {
      state.recipes.splice(index, 1)
    },
    makeRecipe(state, { payload: index }: PayloadAction<number>) {
      const selected_recipe = state.recipes.splice(index, 1)[0]

      // Add it as the last recipe
      state.recipes.push(selected_recipe)
    },
    shuffleRecipes(state, { payload: salt }: PayloadAction<any>) {
      state.recipes.sort(
        (a, b) =>
          keyfn(b, salt) + (b.rating || 0) - (keyfn(a, salt) + (a.rating || 0))
      )
    },
  },
})

export const {
  addRecipe,
  removeRecipe,
  makeRecipe,
  shuffleRecipes,
} = recipeSlice.actions

export const selectRecipes = (state: RootState) => state.recipes.recipes

export default recipeSlice.reducer
