import { combineReducers } from 'redux'
import recipes from 'features/recipes/recipeSlice'
import recipeUi from 'features/recipes/uiSlice'

const rootReducer = combineReducers({ recipes, recipeUi })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
