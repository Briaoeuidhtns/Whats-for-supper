import { makeStyles } from '@material-ui/core'

export default makeStyles({
  // Needed for the cards that get thrown off the screen
  '@global': { body: { overflowX: 'hidden' } },
})
