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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qui ita
          affectus, beatum esse numquam probabis; Tamen a proposito, inquam,
          aberramus. Vitiosum est enim in dividendo partem in genere numerare.
          Duo Reges: constructio interrete.
        </Typography>
      </CardContent>
    </Card>
  )
}
export default RecipeCard
