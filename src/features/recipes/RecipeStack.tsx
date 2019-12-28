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
} from './recipeSlice'
import { Menu, MenuItem, ListItemIcon, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon, MoreVert as MenuIcon } from '@material-ui/icons'

const selectRecipe = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) =>
    recipes[index] ?? {
      title: 'No available recipes',
      description: "Add a recipe with the '+' button on the bottom right.",
    }
)

const mapState = createSelector(
  [selectRecipe, selectShowDescription, selectIndex, availabilityStateMap],
  (recipe, showDescription, currentRecipe, { has }) => ({
    recipe,
    showDescription,
    currentRecipe,
    has,
  })
)

const mapDispatch = { toggleDescription, removeRecipe }

interface OwnProps {}

type Props = ReturnType<typeof mapState> & typeof mapDispatch & OwnProps

const RecipeList: React.FC<Props> = ({
  recipe,
  showDescription,
  toggleDescription,
  removeRecipe,
  currentRecipe,
  has,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const closeMenu = () => setMenuAnchor(null)

  return (
    <>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            closeMenu()
            removeRecipe(currentRecipe)
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      <div>
        <RecipeCard
          {...{
            recipe,
            showDescription,
            toggleDescription: () => toggleDescription(),
            menuButton: (
              <IconButton
                onClick={e => setMenuAnchor(e.currentTarget)}
                disabled={!has}
              >
                <MenuIcon />
              </IconButton>
            ),
          }}
        />
      </div>
    </>
  )
}

export default connect(mapState, mapDispatch)(RecipeList)
