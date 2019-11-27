import { createSlice } from 'redux-starter-kit'
import { RootState } from '../../app/rootReducer'
import { createSelector } from 'redux-starter-kit'

export interface Recipe {
  title: string
  description: string
}

export interface RecipeListState {
  recipes: Recipe[]
  index: number
  showDescription: boolean
}

let initialState: RecipeListState = {
  recipes: [],
  index: 0,
  showDescription: false,
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
      state.showDescription = false
    },
    prevRecipe(state) {
      state.index--
      state.showDescription = false
    },
    makeRecipe(state) {
      // Remove the selected recipe
      const selected_recipe = state.recipes.splice(state.index, 1)[0]

      // Add it as the last recipe
      state.recipes.push(selected_recipe)
      state.index = 0
    },
    toggleDescription(state: RecipeListState) {
      state.showDescription = !state.showDescription
    },
  },
})

export const {
  actions: {
    addRecipe,
    removeRecipe,
    nextRecipe,
    prevRecipe,
    makeRecipe,
    toggleDescription,
  },
  slice,
} = recipeSlice

export const selectRecipes = (state: RootState) => state[slice].recipes
export const selectIndex = (state: RootState) => state[slice].index
export const selectShowDescription = (state: RootState) =>
  state[slice].showDescription

export const availabilityStateMap = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) => ({
    hasPrev: index > 0,
    has: index < recipes.length,
    hasNext: index < recipes.length - 1,
  })
)

export default recipeSlice.reducer
