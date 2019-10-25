import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import PrevIcon from '@material-ui/icons/NavigateBefore'
import { createSelector } from 'redux-starter-kit'
import NextIcon from '@material-ui/icons/NavigateNext'
import { nextRecipe, prevRecipe } from './recipeSlice'
import { RootState } from '../../app/rootReducer'

const selectRecipes = (state: RootState) => state.recipeReducer.recipes
const selectIndex = (state: RootState) => state.recipeReducer.index

const mapState = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) => ({
    hasPrev: index > 0,
    hasNext: index < recipes.length,
  })
)

const mapDispatch = { nextRecipe, prevRecipe }
interface OwnProps {}

type Props = ReturnType<typeof mapState> & typeof mapDispatch & OwnProps
const Reactions: React.FC<Props> = ({
  nextRecipe,
  prevRecipe,
  hasPrev,
  hasNext,
}) => (
  <ButtonGroup color="primary" variant="contained" fullWidth>
    <Button onClick={prevRecipe} disabled={!hasPrev}>
      <PrevIcon />
      Previous
    </Button>

    <Button disabled={!hasNext}>Select</Button>

    <Button disabled={!hasNext} onClick={nextRecipe}>
      Next
      <NextIcon />
    </Button>
  </ButtonGroup>
)

export default connect(
  mapState,
  mapDispatch
)(Reactions)
