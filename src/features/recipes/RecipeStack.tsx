import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'redux-starter-kit'

import RecipeCard from './RecipeCard'
import { RootState } from '../../app/rootReducer'
import { selectRecipes } from './recipeSlice'
import {
  selectIndex,
  selectShowDescription,
  toggleDescription,
} from './uiSlice'

const selectRecipe = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) =>
    recipes[index] || {
      title: 'No available recipes',
      description: "Add a recipe with the '+' button on the bottom right.",
    }
)

const mapState = (state: RootState) => ({
  recipe: selectRecipe(state),
  showDescription: selectShowDescription(state),
})

const mapDispatch = { toggleDescription }

interface OwnProps {}

type Props = ReturnType<typeof mapState> & typeof mapDispatch & OwnProps

const RecipeList: React.FC<Props> = ({
  recipe,
  showDescription,
  toggleDescription,
}) => (
  <div>
    <RecipeCard
      {...{
        recipe,
        showDescription,
        toggleDescription: () => toggleDescription(),
      }}
    />
  </div>
)

export default connect(mapState, mapDispatch)(RecipeList)
