import {
  Button,
  Container,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'

import { Check } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import React from 'react'

/**
 * A simple about page. Ripped from the current readme
 */
const Homepage = () => (
  <Container maxWidth="md">
    <Typography paragraph variant="h2" align="center">
      What's for supper?
    </Typography>
    <Typography paragraph variant="h6" align="center">
      Faster Meal Decisions
    </Typography>
    <Typography paragraph align="center">
      A recipe management application to decide what to eat, without the
      headache.
    </Typography>

    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={3}>
        <Button to="/app" variant="contained" color="primary" component={Link}>
          Go to the app
        </Button>
      </Grid>
    </Grid>
    <br />
    <Typography paragraph>
      What's For Supper is a single page cross platform web app that simplifies
      the process of meal planning. It will adapt to your family's preferences,
      while keeping a history of recent meals to not over-suggest.
    </Typography>

    <Typography paragraph>
      The application provides a low friction way for a family to plan meals.
      Meal selection is as simple as navigating to a recipe card and selecting
      the meal you want to eat. The app feels quite at home on mobile devices to
      allow you to select meals from anywhere without needing to install
      anything extra.
    </Typography>

    <Typography paragraph>
      The application will adapt the suggestions provided over time according to
      your preferences. Recipes you like will be suggested to you more
      immedtiately, but with some mixing to avoid getting stale.
    </Typography>

    <Typography paragraph variant="h4">
      Our Goals:
    </Typography>

    <ListItem>
      <ListItemIcon>
        <Check />
      </ListItemIcon>
      <ListItemText primary="Remove five or more minutes a day on deciding what's for dinner" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <Check />
      </ListItemIcon>
      <ListItemText primary="Save time for 130 million families in the US every evening" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <Check />
      </ListItemIcon>
      <ListItemText primary="Encourage cooking meals for dinner rather than going to restaurants" />
    </ListItem>
  </Container>
)
export default Homepage
