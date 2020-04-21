import {
  Add as AddIcon,
  Copyright as DisclaimerIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons'
import {
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  createStyles,
  fade,
  makeStyles,
} from '@material-ui/core'
import React, { useState } from 'react'

import Disclaimer from './Disclaimer'
import SettingsDialog from './Settings'
import { openRecipeDialog } from 'features/recipes/recipeSlice'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme =>
  createStyles({
    main: { marginBottom: theme.spacing(2) },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
  })
)
const AppBar: React.FC = () => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [disclaimerOpen, setDisclaimerOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const dispatch = useDispatch()
  return (
    <>
      <MuiAppBar className={classes.main} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {"What's for Supper?"}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText
                primary="Add a recipe"
                onClick={() => dispatch(openRecipeDialog('add'))}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                onClick={() => setSettingsOpen(true)}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DisclaimerIcon />
              </ListItemIcon>
              <ListItemText
                primary="License disclaimers"
                onClick={() => setDisclaimerOpen(true)}
              />
            </ListItem>
          </List>
        </Drawer>
      </MuiAppBar>
      <Disclaimer
        open={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
      />
      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  )
}
export default AppBar
