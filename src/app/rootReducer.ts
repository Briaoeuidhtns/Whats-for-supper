import recipeReducer from 'features/recipes/recipeSlice'
import {Reducer} from 'redux'

const rootReducer = recipeReducer

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
