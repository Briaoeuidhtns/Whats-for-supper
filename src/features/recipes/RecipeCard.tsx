import React from 'react'
import { Recipe } from './recipeSlice'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Collapse } from '@material-ui/core'

const ExpandableIcon = (showDescription: boolean) =>
  showDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />

interface OwnProps {
  recipe: Recipe
  placeholder?: string
  showDescription: boolean
  toggleDescription: any // TODO: figure out what type this function is supposed to be
}

type Props = OwnProps

const RecipeCard: React.FC<Props> = ({
  recipe,
  placeholder,
  showDescription,
  toggleDescription,
}) => {
  return (
    <Card>
      <CardHeader title={recipe.title} />
      <IconButton onClick={() => toggleDescription()}>
        <ExpandableIcon {...showDescription} />
      </IconButton>
      <Collapse in={showDescription} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {recipe.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
export default RecipeCard
