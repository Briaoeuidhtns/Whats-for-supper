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
    makeRecipe(state) {
      // Remove the selected recipe
      const selected_recipe = state.recipes.splice(state.index, 1)[0]

      // Add it as the last recipe
      state.recipes.push(selected_recipe)
      state.index = 0
    },
  },
})

export const {
  addRecipe,
  nextRecipe,
  prevRecipe,
  makeRecipe,
} = recipeSlice.actions

export default recipeSlice.reducer
