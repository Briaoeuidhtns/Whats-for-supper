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
import { Menu, MenuItem, ListItemIcon, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon, MoreVert as MenuIcon } from '@material-ui/icons'
import { identity } from 'lodash'

const selectRecipe = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) =>
    recipes[index] ??
    identity<Recipe>({
      title: 'No available recipes',
      description: "Add a recipe with the '+' button on the bottom right.",
      tags: [],
    })
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
            removeRecipe()
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
