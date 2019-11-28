import React from 'react'

import { Card, CardHeader, CardContent, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import { Recipe } from './recipeSlice'

// A single pixel gif
const defaultPlaceholder =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

const useStyles = makeStyles({
  media: {
    height: 250,
  },
})

interface OwnProps {
  recipe: Recipe
  placeholder?: string
}

type Props = OwnProps

const RecipeCard: React.FC<Props> = ({ recipe, placeholder }) => {
  const classes = useStyles()
  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={recipe.image || placeholder || defaultPlaceholder}
      ></CardMedia>
      <CardHeader title={recipe.title} />
      <CardContent>
        <Rating name="recipeRating" value={recipe.rating || null} readOnly />
      </CardContent>
    </Card>
  )
}
export default RecipeCard
