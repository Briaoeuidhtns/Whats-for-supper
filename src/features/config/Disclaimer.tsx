import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export const Disclaimer: React.FC = () => {
  const [disclaimer, setDisclaimer] = useState<React.ReactNode>(
    'Loading disclaimer'
  )
  // Disclaimer is big and expensive to load, so do it lazily
  useEffect(
    () =>
      void import('DISCLAIMER')
        .then(({ default: d }) => atob(d))
        .then(d =>
          d.split('\n\n').map(p => <Typography paragraph>{p}</Typography>)
        )
        .then(setDisclaimer),
    []
  )
  return <DialogContentText>{disclaimer}</DialogContentText>
}

const DisclaimerDialog: React.FC<DialogProps> = props => (
  <Dialog scroll="paper" maxWidth="xl" fullWidth {...props}>
    <DialogTitle>License Disclaimer</DialogTitle>
    <DialogContent dividers>
      <Disclaimer />
    </DialogContent>
  </Dialog>
)

export default DisclaimerDialog
