import * as Sentry from '@sentry/browser'

import { Button, Container, Typography } from '@material-ui/core'
import React, { ErrorInfo } from 'react'

import store from '../app/store'

interface Props {}

interface State {
  hasError: boolean
  eventId?: string
}

// Some lifecycle not implemented as hooks yet, particularly getDerivedStateFromError and componentDidCatch.
export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.setExtras(errorInfo)
    Sentry.setExtras({ state: store.getState() })
    const eventId = Sentry.captureException(error)
    this.setState({ eventId })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Typography>
            It looks like you{"'"}ve found an error. Please consider giving us a
            bit more information about what you were doing so we can continue to
            improve.
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              Sentry.showReportDialog({ eventId: this.state.eventId })
            }
          >
            Report feedback
          </Button>
        </Container>
      )
    }

    return this.props.children
  }
}
