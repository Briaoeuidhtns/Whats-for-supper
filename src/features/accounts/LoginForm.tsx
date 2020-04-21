import { Account, accountSchema } from './account'
import { Box, Button, Card, Container, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import TextField from 'components/MuiFormik/TextField'
import clsx from 'clsx'
import { isPouchDBError } from 'util/types/pouchdb'
import { remoteAuth } from 'app/db'
import { testAwait } from 'util/test'
import useStyles from './styles'

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const classes = useStyles()
  const [submitError, setSubmitError] = useState<PouchDB.Core.Error | unknown>()
  const history = useHistory()

  // When first mounted, make sure the user isn't here by mistake, ie bookmark or smth
  useEffect(() => {
    let cancelled = false

    testAwait(
      remoteAuth.getSession().then(
        ctx => {
          // logout causes session to have a null name?
          // doesn't match types, not documented, but whatever
          if (ctx.ok && ctx.userCtx.name && !cancelled) history.replace('/app')
        },
        // Should fail in most cases
        () => {}
      )
    )
    return () => void (cancelled = true)
  })

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
          initialValues={{} as Account}
          onSubmit={async data => {
            try {
              await remoteAuth.logIn(data.email, data.password)
              history.replace('/app')
            } catch (e) {
              setSubmitError(e)
            }
          }}
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
              {submitError != null && (
                <Typography color="error">
                  Error:{' '}
                  {isPouchDBError(submitError)
                    ? submitError.message ??
                      submitError.reason ??
                      `unknown (${submitError.status})`
                    : `unknown (${JSON.stringify(submitError)})`}
                </Typography>
              )}
              <Box className={classes.actions}>
                <Button
                  type="submit"
                  color="primary"
                  component={Link}
                  to="/signup"
                >
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
