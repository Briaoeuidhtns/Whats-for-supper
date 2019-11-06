import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'redux-starter-kit'

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

import { addRecipe, removeRecipe } from './recipeSlice'
import { RootState } from '../../app/rootReducer'

const selectRecipes = (state: RootState) => state.recipeReducer.recipes
const selectIndex = (state: RootState) => state.recipeReducer.index

const mapState = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) => ({
    has: index < recipes.length,
  })
)

const mapDispatch = { addRecipe, removeRecipe }
interface OwnProps {}

type Props = ReturnType<typeof mapState> & typeof mapDispatch & OwnProps

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
    })
    cancel()
  }

  const cancel = () => {
    setOpen(false)
    setRecipeText('')
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
          <DialogContentText>Add your recipe information</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Recipe Title"
            fullWidth
            value={recipeText}
            onChange={e => setRecipeText(e.target.value)}
          />
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

export default connect(
  mapState,
  mapDispatch
)(AddRecipeDialog)
