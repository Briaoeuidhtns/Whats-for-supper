import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import {
  addRecipe,
  editRecipe,
  selectRecipes,
  shuffleRecipes,
} from './recipeDataSlice'

import { RootState } from 'app/rootReducer'
import { makeRecipe } from './combinedActions'

export interface RecipeUiState {
  index: number
  showDescription: boolean
  editing?: number | 'add'
}

let initialState: RecipeUiState = {
  index: 0,
  showDescription: false,
}

export const NEW_RECIPE = -1

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
    openRecipeDialog(
      state,
      { payload: toEdit }: PayloadAction<number | 'add' | 'current'>
    ) {
      state.editing = toEdit === 'current' ? state.index : toEdit
    },
    cancelEdit(state) {
      state.editing = undefined
    },
  },
  extraReducers: b => {
    b.addCase(makeRecipe, state => {
      state.index = 0
      state.showDescription = false
    })
    b.addCase(shuffleRecipes, state => {
      state.index = 0
      state.showDescription = false
    })
    b.addCase(addRecipe, state => {
      state.editing = undefined
    })
    b.addCase(editRecipe, state => {
      state.editing = undefined
    })
  },
})

export const {
  nextRecipe,
  prevRecipe,
  toggleDescription,
  openRecipeDialog,
  cancelEdit,
} = recipeSlice.actions

export const selectRecipeUiSlice = (state: RootState) => state.recipes.recipeUi

export const selectIndex = createSelector([selectRecipeUiSlice], ui => ui.index)

export const selectShowDescription = createSelector(
  [selectRecipeUiSlice],
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
