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
  Chip,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'

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
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
  },
})

interface OwnProps extends React.ComponentPropsWithoutRef<typeof Card> {
  recipe: Recipe
  placeholder?: string
  showDescription?: boolean
  toggleDescription?: React.MouseEventHandler<HTMLButtonElement>
  menuButton?: React.ReactNode
}

type Props = OwnProps

const RecipeCard: React.FC<Props> = ({
  recipe,
  placeholder,
  showDescription,
  toggleDescription,
  menuButton,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Card {...props}>
      <CardMedia
        className={classes.media}
        image={recipe.image ?? placeholder ?? defaultPlaceholder}
      />

      <CardHeader title={recipe.title} action={menuButton} />

      <CardContent>
        <div>
          {recipe.tags.map((txt, i) => (
            <Chip label={txt} key={i} />
          ))}
        </div>
        <Rating name="recipeRating" value={recipe.rating ?? null} readOnly />
      </CardContent>

      <CardActions>
        <IconButton
          className={classes.expand}
          onClick={toggleDescription}
          disabled={!recipe.description}
        >
          <ExpandableIcon expand={showDescription ?? false} />
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
