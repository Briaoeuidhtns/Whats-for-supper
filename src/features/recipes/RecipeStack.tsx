import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import RecipeCard from './RecipeCard'
import {
  selectRecipes,
  removeRecipe,
  nextRecipe,
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
import { useWindowSize, useElSize } from 'util/hooks'
import { Delete as DeleteIcon, MoreVert as MenuIcon } from '@material-ui/icons'

import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const TUTORIAL_RECIPE: Readonly<Recipe> = {
  title: 'No available recipes',
  description: "Add a recipe with the '+' button on the bottom right.",
  tags: [],
}

const selectRecipe = createSelector(
  [selectRecipes, selectIndex],
  (recipes, index) => {
    const [head, next] = recipes.slice(index, index + 1 + 1)
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

const mapDispatch = { toggleDescription, removeRecipe, nextRecipe }

interface OwnProps {}

type Props = ReturnType<typeof mapState> & typeof mapDispatch & OwnProps

const useStyles = makeStyles({
  cardStack: {
    display: 'grid',
    gridTemplate: '1fr / 1fr',
    placeItems: 'center',
    userSelect: 'none',
    '& > *': {
      gridColumn: '1 / 1',
      gridRow: '1 / 1',
      width: '100%',
      height: '100%',
    },
    '& $top': { zIndex: 100 },
    '& $bottom': { zIndex: -100 },
  },
  top: {},
  bottom: {},
})

const RecipeList: React.FC<Props> = ({
  recipes: [head, next],
  showDescription,
  toggleDescription,
  nextRecipe,
  removeRecipe,
  has,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const classes = useStyles()
  const { width } = useWindowSize()
  const [bindCardSize, cardSize] = useElSize<HTMLDivElement>()

  // Ref over state bc animations don't trigger a render,
  // so setState may not take effect between calling and the frame which triggers onRest
  const isLeaving = useRef(false)

  const [springStyle, setSpring] = useSpring(() => ({
    x: 0,
    opacity: 1,
    onRest: () => {
      if (isLeaving.current) {
        nextRecipe()
        isLeaving.current = false
        setSpring({ x: 0, opacity: 1, reset: true })
      }
    },
  }))

  const bindDrag = useDrag(({ down, movement: [mx, _my], velocity }) => {
    if (!isLeaving.current) {
      setSpring({ x: down ? mx : 0 })
      if (Math.abs(velocity) > 5) {
        setSpring({
          opacity: 0,
          x: ((width + (cardSize?.width ?? 0)) / 2) * Math.sign(velocity),
        })
        isLeaving.current = true
      }
    }
  })

  const closeMenu = () => setMenuAnchor(null)
  const headCard = head && (
    <animated.div style={springStyle} {...bindDrag()} {...bindCardSize}>
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
    </animated.div>
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
