import React from 'react'

import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Collapse,
  IconButton,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@material-ui/icons'

import { Recipe } from './recipeSlice'

interface IconProps {
  expand: boolean
}

const ExpandableIcon: React.FC<IconProps> = ({ expand }) =>
  expand ? <ExpandLessIcon /> : <ExpandMoreIcon />

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
  showDescription: boolean
  toggleDescription: React.MouseEventHandler<HTMLButtonElement>
}

type Props = OwnProps

const RecipeCard: React.FC<Props> = ({
  recipe,
  placeholder,
  showDescription,
  toggleDescription,
}) => {
  const classes = useStyles()
  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={recipe.image || placeholder || defaultPlaceholder}
      ></CardMedia>
      <CardHeader title={recipe.title} />
      <IconButton onClick={toggleDescription}>
        <ExpandableIcon expand={showDescription} />
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
