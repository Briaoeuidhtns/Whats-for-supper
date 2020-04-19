import { Box, Button, Card, Container, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'

import React from 'react'
import TextField from 'components/MuiFormik/TextField'
import { accountSchema } from './account'
import clsx from 'clsx'
import useStyles from './styles'

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const classes = useStyles()
  return (
    <Box className={classes.verticalCenter}>
      <Container maxWidth="xs" component={Card} className={classes.card}>
        <Box className={clsx(classes.title, classes.verticalCenter)}>
          <Typography
            variant="h4"
            component="h1"
            className={classes.titleText}
            align="center"
          >
            Sign in
          </Typography>
        </Box>

        <Formik
          initialValues={{}}
          onSubmit={() => {}}
          validationSchema={accountSchema}
        >
          {() => (
            <Form className={classes.form}>
              <TextField
                required
                fullWidth
                margin="normal"
                type="email"
                name="email"
                variant="outlined"
                label="Email"
              />
              <TextField
                required
                fullWidth
                margin="normal"
                type="password"
                name="password"
                variant="outlined"
                label="Password"
              />
              <Box className={classes.actions}>
                <Button type="submit" color="primary">
                  Create account
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Next
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  )
}

export default LoginForm
