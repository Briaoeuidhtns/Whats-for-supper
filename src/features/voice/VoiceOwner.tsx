import { Action, ActionCreator } from 'redux'
import React, { useEffect } from 'react'
import { initVoiceRecognition, voiceReduxAdaptor } from '.'
import { useDispatch, useSelector } from 'react-redux'

import { selectVoiceControl } from 'features/config/settingsSlice'

/**
 * An owner and manager for voice control.
 */
const VoiceOwner: React.FC<{
  actionMap: Record<string, ActionCreator<Action>>
}> = ({ actionMap }) => {
  const voiceEnabled = useSelector(selectVoiceControl) // TODO get voice is enabled
  const dispatch = useDispatch()
  useEffect(() => {
    if (voiceEnabled) {
      const recogniser = initVoiceRecognition?.(
        voiceReduxAdaptor(dispatch, actionMap)
      )
      return recogniser && (() => recogniser.abort())
    }
  }, [actionMap, dispatch, voiceEnabled])
  return null
}

export default VoiceOwner
