import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import RecipeCard from './RecipeCard'
import {
  selectRecipes,
  removeRecipe,
  selectIndex,
  selectShowDescription,
  toggleDescription,
  availabilityStateMap,
  Recipe,
} from './recipeSlice'
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  makeStyles,
} from '@material-ui/core'
import { Delete as DeleteIcon, MoreVert as MenuIcon } from '@material-ui/icons'

const TUTORIAL_RECIPE: Readonly<Recipe> = {
  title: 'No available recipes',
  description: "Add a recipe with the '+' button on the bottom right.",
  tags: [],
}

const selectRecipe = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) => {
    const [head, next] = recipes.slice(index, index + 1)
    return [head, next ?? TUTORIAL_RECIPE]
  }
)

const mapState = createSelector(
  [selectRecipe, selectShowDescription, selectIndex, availabilityStateMap],
  (recipes, showDescription, currentRecipe, { has }) => ({
    recipes,
    showDescription,
    currentRecipe,
    has,
  })
)

const mapDispatch = { toggleDescription, removeRecipe }

interface OwnProps {}

type Props = ReturnType<typeof mapState> & typeof mapDispatch & OwnProps

const useStyles = makeStyles({
  cardStack: {
    display: 'grid',
    gridTemplate: '1fr / 1fr',
    placeItems: 'center',
    '& > *': {
      gridColumn: '1 / 1',
      gridRow: '1 / 1',
      width: '100%',
      height: '100%',
    },
    '& $top': { zIndex: 100 },
    '& $bottom': { zIndex: -100 },
  },
  top: { position: 'relative' },
  bottom: {},
})

const RecipeList: React.FC<Props> = ({
  recipes: [head, next],
  showDescription,
  toggleDescription,
  removeRecipe,
  has,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const classes = useStyles()
  const closeMenu = () => setMenuAnchor(null)
  const headCard = head && (
    <RecipeCard
      recipe={head}
      className={classes.top}
      showDescription={showDescription}
      toggleDescription={() => toggleDescription()}
      menuButton={
        <IconButton
          onClick={e => setMenuAnchor(e.currentTarget)}
          disabled={!has}
        >
          <MenuIcon />
        </IconButton>
      }
    />
  )

  const nextCard = (
    <RecipeCard
      recipe={next}
      className={classes.bottom}
      menuButton={
        <IconButton disabled={!has}>
          <MenuIcon />
        </IconButton>
      }
    />
  )

  return (
    <>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            closeMenu()
            removeRecipe()
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Box className={classes.cardStack}>
        {headCard}
        {nextCard}
      </Box>
    </>
  )
}

export default connect(mapState, mapDispatch)(RecipeList)
