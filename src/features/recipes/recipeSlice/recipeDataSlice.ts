import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'
import { sha1 as hash } from 'hash.js'
import InitialRecipes from 'recipes'
import { Model } from 'app/store'
import { Reducer } from 'redux'
import { isReduxInternalAction } from 'util/types/redux'

export interface Recipe {
  title: string
  description: string
  image?: string
  rating?: number
  tags: string[]
}

export interface RecipeListState {
  recipes: Recipe[]
  rehydrated: boolean
}

export const initialState: RecipeListState = {
  recipes: InitialRecipes,
  rehydrated: false,
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
    shuffleRecipes(state, { payload: salt }: PayloadAction<any>) {
      state.recipes.sort(
        (a, b) =>
          keyfn(b, salt) + (b.rating ?? 0) - (keyfn(a, salt) + (a.rating ?? 0))
      )
    },
  },
})

export const getFromCouch = createAction<Model>('recipes/getFromCouch')

const getFromCouchReducer: Reducer<RecipeListState> = (state, action) => {
  if (getFromCouch.match(action))
    return { ...action.payload.state.recipes, rehydrated: true }

  // Allows initialize action to pass through, may not be correct
  if (!state?.rehydrated && !isReduxInternalAction(action))
    throw new Error(
      `Action dispatched before rehydrated: ${JSON.stringify(action)}`
    )

  return recipeDataSlice.reducer(state, action)
}

export const { addRecipe, shuffleRecipes } = recipeDataSlice.actions

export const selectRecipes = (state: RootState) => state.recipes.recipes

export default getFromCouchReducer
