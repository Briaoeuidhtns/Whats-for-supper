import React from 'react'
import { Recipe } from './recipeSlice'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const RecipeCard = (recipe: Recipe) => {
  return (
    <Card>
      <CardHeader title={recipe.title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {recipe.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default RecipeCard
