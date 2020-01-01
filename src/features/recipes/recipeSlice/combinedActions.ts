import { createAction } from '@reduxjs/toolkit'

export const makeRecipe = createAction<number | undefined>('recipes/makeRecipe')
export const removeRecipe = createAction<number | undefined>(
  'recipes/removeRecipe'
)
