import { combineReducers } from 'redux'
import recipeReducer, { slice } from 'features/recipes/recipeSlice'

const rootReducer = combineReducers({ [slice]: recipeReducer })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
