import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addRecipe } from './recipeSlice'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const mapState = () => ({})
const mapDispatch = { addRecipe }
interface OwnProps {}

type Props = ReturnType<typeof mapState> & typeof mapDispatch & OwnProps

const AddRecipe: React.FC<Props> = ({ addRecipe }) => {
  const [recipeText, setRecipeText] = useState('')

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!recipeText.trim()) {
            return
          }
          addRecipe({ title: recipeText })
          setRecipeText('')
        }}
      >
        <TextField
          variant="outlined"
          label="Recipe Title"
          fullWidth
          value={recipeText}
          onChange={e => setRecipeText(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth>
          Add Recipe
        </Button>
      </form>
    </div>
  )
}

export default connect(
  mapState,
  mapDispatch
)(AddRecipe)
