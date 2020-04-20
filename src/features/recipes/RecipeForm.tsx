import * as yup from 'yup'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import { Form, Formik, FormikConfig } from 'formik'
import React, { useCallback } from 'react'
import { Recipe, addRecipe, editRecipe } from './recipeSlice/recipeDataSlice'
import { useDispatch, useSelector } from 'react-redux'

import Rating from 'components/MuiFormik/Rating'
import { RootState } from 'app/rootReducer'
import TagInput from 'components/TagInput'
import TextField from 'components/MuiFormik/TextField'
import { cancelEdit } from './recipeSlice/uiSlice'
import { isEmpty } from 'lodash'

const selectEdit = (state: RootState) => {
  const index = state.recipeUi.editing
  let recipe: Partial<Recipe> | undefined

  if (index == null) recipe = undefined
  else if (index === 'add') recipe = {}
  else recipe = state.recipes.recipes[index]
  return { recipe, index }
}

const dialogValidationSchema = yup.object<Recipe>({
  title: yup
    .string()
    .required()
    .max(50),
  description: yup
    .string()
    .ensure()
    .max(500),
  rating: yup
    .number()
    .notRequired()
    .min(0)
    .max(5),
  tags: yup.array().of(yup.string().max(25)),
})

const RecipeForm: React.FC = () => {
  const dispatch = useDispatch()
  const { recipe, index } = useSelector(selectEdit)

  const onSubmit = useCallback<FormikConfig<Recipe>['onSubmit']>(
    (data, { setSubmitting, resetForm }) => {
      // Shouldn't ever happen, but it's technically still part of the union
      // Makes ts happy, and better to be loud if something goes wrong
      if (index == null) throw new Error("Can't submit edit while not editing")

      if (index === 'add') dispatch(addRecipe(data))
      else
        dispatch(
          editRecipe({
            recipe: {
              image: encodeURI(
                `https://loremflickr.com/400/250/${data.title}?lock=1`
              ),
              ...data,
            },
            index,
          })
        )

      setSubmitting(false)
      resetForm()
    },
    [index, dispatch]
  )

  const initialRecipe: Recipe = {
    title: '',
    description: '',
    rating: 0,
    tags: [],
    // undefined if not shown, doesn't matter what's here in that case
    ...(recipe ?? {}),
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialRecipe}
      onSubmit={onSubmit}
      validationSchema={dialogValidationSchema}
    >
      {({ resetForm }) => (
        <Dialog
          open={!!recipe}
          onClose={() => {
            dispatch(cancelEdit())
            resetForm()
          }}
        >
          <Form>
            <DialogTitle>{isEmpty(recipe) ? 'Add' : 'Edit'} Recipe</DialogTitle>
            <DialogContent>
              <DialogContentText>Add your recipe information</DialogContentText>
              <TextField
                name="title"
                margin="dense"
                label="Recipe Title"
                fullWidth
              />
              <TextField
                name="description"
                variant="outlined"
                multiline
                rows="3"
                placeholder="Add information about your recipe here..."
                label="Recipe Description"
                fullWidth
              />
              <Rating
                name="rating"
                size="large"
                margin="dense"
                label={
                  <Typography variant="body1" color="textSecondary">
                    How would you rate this?
                  </Typography>
                }
              />
              <TagInput name="tags" />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  dispatch(cancelEdit())
                  resetForm()
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Add
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  )
}

export default RecipeForm
