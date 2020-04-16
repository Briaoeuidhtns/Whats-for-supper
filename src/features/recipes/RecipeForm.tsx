import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { Formik, Form, Field } from "formik";
import { TextField, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { isEmpty } from 'lodash';
import { cancelEdit } from './recipeSlice/uiSlice';
import { Recipe, editRecipe } from './recipeSlice/recipeDataSlice';

const selectEdit = (state: RootState) => {
    const index = state.recipeUi.editing

    if (index != null)
      return { recipe: state.recipes.recipes[index] ?? {}, index }
    
    return { recipe: undefined, index }
}

const FormDialog: React.FC = () => {
  const dispatch = useDispatch()
  const { recipe, index } = useSelector(selectEdit)
  console.log(recipe, index)

  return (
  <Formik
    enableReinitialize
    initialValues={{
      title: "",
      description: "",
      rating: 0,
      ...(recipe ?? {})
      } as Recipe
    }
    onSubmit={(data, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      // dispatch function that dispatchs thunk
      if (index != null)
        dispatch(editRecipe({recipe: data, index}))
      // async call?
      setSubmitting(false);
      // resetForm()
    }}
  >
    {({ values, isSubmitting }) => (
      <Form>
        <Dialog
          open={!!recipe}
          onClose={() => dispatch(cancelEdit())}
        >
          <DialogTitle>
          {(isEmpty(recipe)) ? "Add" : "Edit"} Recipe
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Add your recipe information</DialogContentText>
        <Field
          name="title"
          type="input"
          as={TextField}
          autoFocus
          margin="dense"
          label="Recipe Title"
          fullWidth
        />
        <Field
          name="description"
          type="input"
          as={TextField}
          variant="outlined"
          multiline
          rows="3"
          placeholder="Add information about your recipe here..."
          margin="dense"
          label="Recipe Description"
          fullWidth
        />
        <Box borderColor="transparent">
          <Typography>How would you rate this?</Typography>
          <Field
            name="rating"
            //type="input"
            as={Rating}
            id="rating"
            size="large"
          />
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(cancelEdit())} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Add
          </Button>
        </DialogActions>
        </Dialog>
      </Form>
    )}
  </Formik>
)};

export default FormDialog;
