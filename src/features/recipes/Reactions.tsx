import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import PrevIcon from '@material-ui/icons/NavigateBefore'
import NextIcon from '@material-ui/icons/NavigateNext'
import {
  nextRecipe,
  prevRecipe,
  makeRecipe,
  availabilityStateMap,
} from './recipeSlice'

const mapDispatch = { nextRecipe, prevRecipe, makeRecipe }
interface OwnProps {}

type Props = ReturnType<typeof availabilityStateMap> &
  typeof mapDispatch &
  OwnProps
const Reactions: React.FC<Props> = ({
  nextRecipe,
  prevRecipe,
  makeRecipe,
  hasPrev,
  has,
  hasNext,
}) => (
  <ButtonGroup color="primary" variant="contained" fullWidth>
    <Button onClick={() => prevRecipe()} disabled={!hasPrev}>
      <PrevIcon />
      Previous
    </Button>

    <Button onClick={() => makeRecipe()} disabled={!has}>
      Select
    </Button>

    <Button onClick={() => nextRecipe()} disabled={!hasNext}>
      Next
      <NextIcon />
    </Button>
  </ButtonGroup>
)

export default connect(
  availabilityStateMap,
  mapDispatch
)(Reactions)
