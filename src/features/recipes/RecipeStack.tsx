import React from 'react'
import { connect } from 'react-redux'
import RecipeCard from './RecipeCard'
import { createSelector } from 'redux-starter-kit'
import { RootState } from '../../app/rootReducer'

const selectRecipes = (state: RootState) => state.recipeReducer.recipes
const selectIndex = (state: RootState) => state.recipeReducer.index

const selectRecipe = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) => recipes[index] || { title: 'No available recipes' }
)

const mapState = (state: RootState) => ({
  recipe: selectRecipe(state),
})

const mapDispatch = {}

interface OwnProps {}

type Props = ReturnType<typeof mapState> & typeof mapDispatch & OwnProps

const RecipeList: React.FC<Props> = ({ recipe }) => (
  <div>
    <RecipeCard {...recipe} />
  </div>
)

export default connect(
  mapState,
  mapDispatch
)(RecipeList)
