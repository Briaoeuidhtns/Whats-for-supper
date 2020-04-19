import { createStyles, makeStyles } from '@material-ui/core'

export default makeStyles(theme =>
  createStyles({
    verticalCenter: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
    card: {
      padding: 0,
    },
    title: {
      height: 100,
      backgroundColor: theme.palette.primary.light,
      margin: 0,
    },
    titleText: {
      padding: theme.spacing(2),
    },
    actions: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      margin: 0,
      marginTop: theme.spacing(1),
      paddingTop: 0,
      width: '100%',
      '& > *': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
      },
      flexDirection: 'row-reverse',
    },
    form: {
      margin: `0 ${theme.spacing(4)}px`,
      '& > *': {
        paddingTop: theme.spacing(1),
      },
    },
  })
)
