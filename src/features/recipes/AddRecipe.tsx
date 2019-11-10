import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeRecipe, availabilityStateMap } from './recipeSlice'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Fab from '@material-ui/core/Fab'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { DialogTitle } from '@material-ui/core'
import Box from '@material-ui/core/Box'

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
  const [recipeDescription, setRecipeDescription] = useState('')

  const submit = () => {
    setOpen(false)
    if (!recipeText.trim()) {
      return
    }
    addRecipe({ title: recipeText, description: recipeDescription })
    setRecipeText('')
    setRecipeDescription('')
  }

  const cancel = () => {
    setOpen(false)
    setRecipeText('')
    setRecipeDescription('')
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
          <TextField
            multiline
            rows="3"
            placeholder="Add information about your recipe here..."
            margin="dense"
            label="Recipe Description"
            fullWidth
            value={recipeDescription}
            onChange={e => setRecipeDescription(e.target.value)}
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
  availabilityStateMap,
  mapDispatch
)(AddRecipeDialog)
