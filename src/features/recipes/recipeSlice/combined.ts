import reduceReducers from 'reduce-reducers'
import recipes from './recipeDataSlice'
import recipeUi from './uiSlice'
import { createReducer, combineReducers } from '@reduxjs/toolkit'
import { makeRecipe, removeRecipe } from './combinedActions'

const recipeReducer = combineReducers({ recipes, recipeUi })

const extraReducers = createReducer(
  // This is the second reducer in the chain, initial state is always defined by recipeReducer
  (undefined as unknown) as ReturnType<typeof recipeReducer>,
  b => {
    b.addCase(makeRecipe, (state, action) => {
      const index = action.payload ?? state.recipeUi.index
      const [selectedRecipe] = state.recipes.recipes.splice(index, 1)
      state.recipes.recipes.push(selectedRecipe)
    })

    b.addCase(removeRecipe, (state, action) => {
      const index = action.payload ?? state.recipeUi.index
      if (index === state.recipeUi.index)
        state.recipeUi.index = Math.max(state.recipeUi.index - 1, 0)
      state.recipes.recipes.splice(index)
    })
  }
)

// Some weird typing nonsense going on here
// neither of these reducers will ever return undefined, but combining them somehow triggers as may
// Seems compose functions are hard to type in general
// This isn't even close to correct or reliable, but it should be good enough
export default reduceReducers(
  extraReducers,
  recipeReducer
) as typeof recipeReducer
