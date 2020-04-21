import { combineReducers } from 'redux'
import recipeReducer from 'features/recipes/recipeSlice'
import settingsReducer from 'features/config/settingsSlice'

const rootReducer = combineReducers({
  recipes: recipeReducer,
  settings: settingsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
