import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from '@material-ui/core'
import { selectVoiceControl, toggleVoiceControl } from './settingsSlice'
import { useDispatch, useSelector } from 'react-redux'

import React from 'react'

const SettingsDialog: React.FC<DialogProps> = props => {
  const dispatch = useDispatch()
  const voiceControl = useSelector(selectVoiceControl)

  return (
    <Dialog scroll="paper" maxWidth="xl" fullWidth {...props}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent dividers>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={voiceControl}
                onChange={() => dispatch(toggleVoiceControl)}
              />
            }
            label="Voice Control"
          />
        </FormGroup>
        <DialogContentText>
          <br />
          <Typography paragraph>
            Enables voice control. If active, voice data may be sent to another
            service (such as Google) for processing.
          </Typography>
          <Typography paragraph>* Only works in Chrome.</Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog
