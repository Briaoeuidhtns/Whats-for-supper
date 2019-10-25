import { createSlice } from 'redux-starter-kit'

export interface Recipe {
  title: string
}

export interface RecipeListState {
  recipes: Recipe[]
  index: number
}

let initialState: RecipeListState = {
  recipes: [],
  index: 0,
}

const recipeSlice = createSlice({
  slice: 'recipes',
  initialState,
  reducers: {
    addRecipe(state: RecipeListState, { payload: recipe }) {
      state.recipes.push(recipe)
    },
    nextRecipe(state) {
      state.index++
    },
    prevRecipe(state) {
      state.index--
    },
  },
})

export const { addRecipe, nextRecipe, prevRecipe } = recipeSlice.actions

export default recipeSlice.reducer
