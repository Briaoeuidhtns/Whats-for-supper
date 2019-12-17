import React from 'react'
import { connect } from 'react-redux'

import { Button, ButtonGroup } from '@material-ui/core'
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
} from '@material-ui/icons'

import {
  nextRecipe,
  prevRecipe,
  availabilityStateMap,
  selectIndex,
} from './uiSlice'

import { makeRecipe } from './recipeSlice'
import { createSelector } from '@reduxjs/toolkit'

const mapState = createSelector(
  [availabilityStateMap, selectIndex],
  (has, index) => ({ ...has, index })
)

const mapDispatch = { nextRecipe, prevRecipe, makeRecipe }

interface OwnProps {}

type Props = ReturnType<typeof mapState> & typeof mapDispatch & OwnProps

const Reactions: React.FC<Props> = ({
  nextRecipe,
  prevRecipe,
  makeRecipe,
  hasPrev,
  has,
  hasNext,
  index: current,
}) => (
  <ButtonGroup color="primary" variant="contained" fullWidth>
    <Button onClick={() => prevRecipe()} disabled={!hasPrev}>
      <PrevIcon />
      Previous
    </Button>

    <Button onClick={() => makeRecipe(current)} disabled={!has}>
      Select
    </Button>

    <Button onClick={() => nextRecipe()} disabled={!hasNext}>
      Next
      <NextIcon />
    </Button>
  </ButtonGroup>
)

export default connect(mapState, mapDispatch)(Reactions)
