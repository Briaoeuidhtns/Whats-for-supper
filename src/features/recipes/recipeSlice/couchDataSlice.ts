import { Model } from 'app/db'
import { Reducer } from 'redux'
import { isReduxInternalAction } from 'util/types/redux'
import { InvalidReducerCallError } from 'util/errors'
import { createAction } from '@reduxjs/toolkit'
import recipeDataReducer, { RecipeListState } from './recipeDataSlice'

export const minimalInitialState: RecipeListState = {
  recipes: [],
  rehydrated: false,
}

export const getFromCouch = createAction<Model>('couchdb/getFromCouch')

export const addDefaultRecipes = createAction('couchdb/addInitialRecipes')

const getFromCouchReducer: Reducer<RecipeListState> = (state, action) => {
  if (getFromCouch.match(action))
    return { ...action.payload.state, rehydrated: true }

  if (addDefaultRecipes.match(action))
    return { ...recipeDataReducer(undefined, action), rehydrated: true }

  if (!state?.rehydrated)
    if (isReduxInternalAction(action)) return minimalInitialState
    else
      throw new InvalidReducerCallError(
        action,
        'Action dispatched before rehydrated'
      )

  return recipeDataReducer(state, action)
}

export default getFromCouchReducer
