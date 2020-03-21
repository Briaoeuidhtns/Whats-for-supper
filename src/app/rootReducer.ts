import recipeReducer from 'features/recipes/recipeSlice'

const rootReducer = recipeReducer

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
