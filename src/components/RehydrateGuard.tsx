import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { selectRecipeDataSlice } from 'features/recipes/recipeSlice/recipeDataSlice'
import { useSelector } from 'react-redux'

interface Props {
  loading?: React.ReactNode
}

const selectRehydrate = createSelector(
  selectRecipeDataSlice,
  ({ rehydrated }) => rehydrated
)

const RehydrateGuard: React.FC<Props> = ({ loading, children }) => {
  const rehydrated = useSelector(selectRehydrate)
  return <>{rehydrated ? children : loading}</>
}

export default RehydrateGuard
