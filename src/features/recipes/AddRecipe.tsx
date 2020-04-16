import {
  Box,
  //Button,
  //Dialog,
  //DialogActions,
  //DialogContent,
  //DialogContentText,
  //DialogTitle,
  Fab,
  //TextField,
  //Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { addRecipe, removeRecipe } from './recipeSlice'
import { openRecipeDialog } from './recipeSlice/uiSlice'
import FormDialog from './RecipeForm'
import { Add as AddIcon } from '@material-ui/icons'
//import { Rating } from '@material-ui/lab'
//import TagInput from 'components/TagInput'
import { connect, useDispatch } from 'react-redux'

const mapDispatch = { addRecipe, removeRecipe }

interface OwnProps {}

const mapState = () => ({})

type Props = typeof mapDispatch & ReturnType<typeof mapState> & OwnProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fieldset: {
      borderColor: 'transparent',
      marginLeft: 0,
      paddingLeft: 0,
    },
    legend: {
      pointerEvents: 'none',
    },
  })
)

const AddRecipeDialog: React.FC<Props> = ({ addRecipe }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  //const [recipeText, setRecipeText] = useState('')
  //const [recipeRating, setRecipeRating] = useState<number | undefined>()
  //const [recipeDescription, setRecipeDescription] = useState('')
  //const [recipeTags, setRecipeTags] = useState<string[]>([])

  /*const submit = () => {
    setOpen(false)
    if (!recipeText.trim()) {
      return
    }
    addRecipe({
      title: recipeText,
      image: encodeURI(
        'https://loremflickr.com/400/250/' + recipeText + '?lock=1'
      ),
      rating: recipeRating,
      description: recipeDescription,
      tags: recipeTags,
    })
    cancel()
  }

  const cancel = () => {
    setOpen(false)
    setRecipeText('')
    setRecipeRating(undefined)
    setRecipeDescription('')
    setRecipeTags([])
  }*/

  return (
    <>
      <Box className={classes.fab}>
        <Fab onClick={() => dispatch(openRecipeDialog())}>
          <AddIcon />
        </Fab>
      </Box>
      <FormDialog />
      {/*<Dialog
        open={open}
        onClose={cancel}
        //onKeyPress={e => e.key === 'Enter' && submit()}
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
            variant="outlined"
            multiline
            rows="3"
            placeholder="Add information about your recipe here..."
            margin="dense"
            label="Recipe Description"
            fullWidth
            value={recipeDescription}
            onChange={e => setRecipeDescription(e.target.value)}
          />
          <Box
            component="fieldset"
            borderColor="transparent"
            className={classes.fieldset}
          >
            <Typography
              component="legend"
              className={classes.legend}
              color="textSecondary"
            >
              How would you rate this?
            </Typography>
            <Rating
              id="rating"
              name="size-large"
              size="large"
              value={recipeRating ?? null}
              onChange={(_, newValue) => setRecipeRating(newValue)}
            />
          </Box>
          <TagInput {...{ recipeTags, setRecipeTags }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={submit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>*/}
    </>
  )
}

export default connect(mapState, mapDispatch)(AddRecipeDialog)
