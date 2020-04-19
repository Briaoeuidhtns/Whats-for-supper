import { Box, Button, Card, Container, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'

import React from 'react'
import TextField from 'components/MuiFormik/TextField'
import clsx from 'clsx'
import { newAccountSchema } from './account'
import useStyles from './styles'

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const classes = useStyles()
  return (
    <Box className={classes.verticalCenter}>
      <Container maxWidth="sm" component={Card} className={classes.card}>
        <Box className={clsx(classes.title, classes.verticalCenter)}>
          <Typography
            variant="h4"
            component="h1"
            className={classes.titleText}
            align="center"
          >
            Create an account
          </Typography>
        </Box>

        <Formik
          initialValues={{}}
          onSubmit={data => {
            console.log(data)
          }}
          validationSchema={newAccountSchema}
          validateOnMount
        >
          {data => (
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
              <TextField
                required
                fullWidth
                margin="normal"
                type="password"
                name="confirmPassword"
                variant="outlined"
                label="Confirm Password"
              />
              <Box className={classes.actions}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={data.isSubmitting || !data.isValid}
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
