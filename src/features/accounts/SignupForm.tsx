import { Box, Button, Card, Container, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { NewAccount, newAccountSchema } from './account'
import React, { useEffect, useState } from 'react'

import TextField from 'components/MuiFormik/TextField'
import { addDefaultRecipes } from 'features/recipes/recipeSlice'
import clsx from 'clsx'
import { isPouchDBError } from 'util/types/pouchdb'
import { remoteAuth } from 'app/db'
import { testAwait } from 'util/test'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const classes = useStyles()
  const [submitError, setSubmitError] = useState<PouchDB.Core.Error | unknown>()
  const dispatch = useDispatch()
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
          initialValues={{} as NewAccount}
          onSubmit={async data => {
            try {
              await remoteAuth.signUp(data.email, data.password)
              await remoteAuth.logIn(data.email, data.password)
              dispatch(addDefaultRecipes())
              history.replace('/app')
            } catch (e) {
              setSubmitError(e)
            }
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
