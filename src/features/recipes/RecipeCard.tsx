import React from 'react'

import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Collapse,
  IconButton,
  CardActions,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'

import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  MoreVert as MenuIcon,
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
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
  },
})

interface OwnProps {
  recipe: Recipe
  placeholder?: string
  showDescription: boolean
  toggleDescription: React.MouseEventHandler<HTMLButtonElement>
  onMenuOpen?: React.MouseEventHandler
}

type Props = OwnProps

const RecipeCard: React.FC<Props> = ({
  recipe,
  placeholder,
  showDescription,
  toggleDescription,
  onMenuOpen,
}) => {
  const classes = useStyles()

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={recipe.image || placeholder || defaultPlaceholder}
      />

      <CardHeader
        title={recipe.title}
        action={
          <IconButton onClick={onMenuOpen}>
            <MenuIcon />
          </IconButton>
        }
      />

      <CardContent>
        <Rating name="recipeRating" value={recipe.rating || null} readOnly />
      </CardContent>

      <CardActions>
        <IconButton
          className={classes.expand}
          onClick={toggleDescription}
          disabled={!recipe.description}
        >
          <ExpandableIcon expand={showDescription} />
        </IconButton>
      </CardActions>

      <Collapse
        in={showDescription && !!recipe.description}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <Typography paragraph variant="body2" color="textSecondary">
            {recipe.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
export default RecipeCard
