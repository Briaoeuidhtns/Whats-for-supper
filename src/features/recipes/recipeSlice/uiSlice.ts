import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'
import { createSelector } from '@reduxjs/toolkit'
import { selectRecipes, shuffleRecipes } from './recipeDataSlice'
import { makeRecipe, removeRecipe } from './combinedActions'
export interface RecipeUiState {
  index: number
  showDescription: boolean
}

let initialState: RecipeUiState = {
  index: 0,
  showDescription: false,
}

const recipeSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    nextRecipe(state) {
      state.index++
      state.showDescription = false
    },
    prevRecipe(state) {
      state.index--
      state.showDescription = false
    },
    toggleDescription(state) {
      state.showDescription = !state.showDescription
    },
  },
  extraReducers: b => {
    b.addCase(makeRecipe, state => {
      state.index = 0
    })
    b.addCase(shuffleRecipes, state => {
      state.index = 0
    })
    b.addCase(removeRecipe, (state, { payload: index }) => {})
  },
})

export const { nextRecipe, prevRecipe, toggleDescription } = recipeSlice.actions

export const selectRecipeUi = (state: RootState) => state.recipeUi

export const selectIndex = createSelector([selectRecipeUi], ui => ui.index)

export const selectShowDescription = createSelector(
  [selectRecipeUi],
  ui => ui.showDescription
)

export const availabilityStateMap = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) => ({
    hasPrev: index > 0,
    has: index < recipes.length,
    hasNext: index < recipes.length - 1,
  })
)

export default recipeSlice.reducer
