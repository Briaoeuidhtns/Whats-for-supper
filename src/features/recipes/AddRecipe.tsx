import { Box, Fab } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import { Add as AddIcon } from '@material-ui/icons'
import React from 'react'
import { openRecipeDialog } from './recipeSlice/uiSlice'
import { useDispatch } from 'react-redux'

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

const AddRecipeDialog: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <Box className={classes.fab}>
      <Fab onClick={() => dispatch(openRecipeDialog('add'))}>
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default AddRecipeDialog
