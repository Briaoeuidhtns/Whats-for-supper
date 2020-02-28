import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'
import { sha1 as hash } from 'hash.js'
import InitialRecipes from 'recipes'
import { Model } from 'app/store'

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
    shuffleRecipes(state, { payload: salt }: PayloadAction<any>) {
      state.recipes.sort(
        (a, b) =>
          keyfn(b, salt) + (b.rating ?? 0) - (keyfn(a, salt) + (a.rating ?? 0))
      )
    },
    getFromCouch(
      state,
      { payload }: PayloadAction<PouchDB.Replication.SyncResult<Model>>
    ) {
      state.recipes = payload.change.docs[0].state.recipes.recipes
    },
  },
})

export const {
  addRecipe,
  shuffleRecipes,
  getFromCouch,
} = recipeDataSlice.actions

export const selectRecipes = (state: RootState) => state.recipes.recipes

export default recipeDataSlice.reducer
