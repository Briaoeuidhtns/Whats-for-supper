import React, { useState } from 'react'
import { connect } from 'react-redux'
import Rating from '@material-ui/lab/Rating'

import {
  TextField,
  Button,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { addRecipe, removeRecipe, availabilityStateMap } from './recipeSlice'

const mapDispatch = { addRecipe, removeRecipe }
interface OwnProps {}

type Props = ReturnType<typeof availabilityStateMap> &
  typeof mapDispatch &
  OwnProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

const AddRecipeDialog: React.FC<Props> = ({ addRecipe, removeRecipe, has }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [recipeText, setRecipeText] = useState('')
  const [ratingText, setRecipeRating] = useState()

  const submit = () => {
    setOpen(false)
    if (!recipeText.trim()) {
      return
    }
    addRecipe({
      title: recipeText,
      image: encodeURI(
        'https://loremflickr.com/400/250/' + recipeText + '?lock=1'
      ),
      rating: ratingText,
    })
    cancel()
  }

  const cancel = () => {
    setOpen(false)
    setRecipeText('')
    setRecipeRating(0)
  }

  return (
    <>
      <Box className={classes.fab}>
        <Fab onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
        {has && (
          <Fab onClick={() => removeRecipe()}>
            <RemoveIcon />
          </Fab>
        )}
      </Box>
      <Dialog
        open={open}
        onClose={cancel}
        onKeyPress={e => e.key === 'Enter' && submit()}
      >
        <DialogTitle>Add a recipe</DialogTitle>
        <DialogContent>
          <div>
            <DialogContentText>Add your recipe information</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Recipe Title"
              fullWidth
              value={recipeText}
              onChange={e => setRecipeText(e.target.value)}
            />
          </div>
          <div>
            <DialogContentText> How would you rate this? </DialogContentText>
            <Rating
              name="size-large"
              size="large"
              value={ratingText}
              onChange={(event, newValue) => setRecipeRating(newValue)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={submit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default connect(availabilityStateMap, mapDispatch)(AddRecipeDialog)
