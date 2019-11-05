import { createSlice } from 'redux-starter-kit'
import { RootState } from '../../app/rootReducer'
import { createSelector } from 'redux-starter-kit'

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
    removeRecipe(state: RecipeListState) {
      state.recipes.splice(state.index, 1)
      state.index = Math.max(state.index - 1, 0)
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

const selectRecipes = (state: RootState) => state.recipeReducer.recipes
const selectIndex = (state: RootState) => state.recipeReducer.index

export const availabilityStateMap = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) => ({
    hasPrev: index > 0,
    has: index < recipes.length,
    hasNext: index < recipes.length - 1,
  })
)

export const {
  addRecipe,
  removeRecipe,
  nextRecipe,
  prevRecipe,
  makeRecipe,
} = recipeSlice.actions

export default recipeSlice.reducer
