import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

import InitialRecipes from 'recipes'
import { RootState } from 'app/rootReducer'
import { sha1 as hash } from 'hash.js'

export interface Recipe {
  title: string
  description: string
  image?: string
  rating?: number
  tags: string[]
}

export interface RecipeListState {
  recipes: Recipe[]
}

export const initialState: RecipeListState = {
  recipes: InitialRecipes,
}

// To the best of my knowledge, this generates a normalish distribution
const keyfn = (val: Recipe, salt: any) => {
  const variance = 15
  const [...h] = hash()
    .update(JSON.stringify({ val, salt }))
    .digest('hex')

  const shift =
    (h.map(a => parseInt(a, 16)).reduce((a, b) => a + b) -
      (15 * h.length) / 2) / // Shift center to 0
    variance // Shrink the range

  return shift
}

const recipeDataSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe(state, { payload: recipe }: PayloadAction<Recipe>) {
      state.recipes.push(recipe)
    },
    editRecipe(
      state,
      {
        payload: { index, recipe },
      }: PayloadAction<{ index: number; recipe: Partial<Recipe> }>
    ) {
      state.recipes[index] = { ...state.recipes[index], ...recipe }
    },
    shuffleRecipes(state, { payload: salt }: PayloadAction<any>) {
      state.recipes.sort(
        (a, b) =>
          keyfn(b, salt) + (b.rating ?? 0) - (keyfn(a, salt) + (a.rating ?? 0))
      )
    },
  },
})

export const { addRecipe, editRecipe, shuffleRecipes } = recipeDataSlice.actions

export const selectRecipeDataSlice = (state: RootState) => state.recipes.recipes

export const selectRecipes = createSelector(
  [selectRecipeDataSlice],
  (state: RecipeListState) => state.recipes
)

export default recipeDataSlice.reducer
