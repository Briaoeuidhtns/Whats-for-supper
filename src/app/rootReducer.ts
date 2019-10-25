import { combineReducers } from 'redux'
import recipeReducer from 'features/recipes/recipeSlice'

const rootReducer = combineReducers({ recipeReducer })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
