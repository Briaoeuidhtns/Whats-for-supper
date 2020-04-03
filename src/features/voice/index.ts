import { Action, ActionCreator, Dispatch } from 'redux'

import { last } from 'lodash'

export type VoiceActionCallback = (result: string) => void

export type VoiceRecognitionArgs = {
  callback: VoiceActionCallback
  commands: Array<string>
}

declare global {
  interface Window {
    webkitSpeechRecognition?: typeof SpeechRecognition
  }
}

// Firefox (after config option) and opera have no prefix, chrome and edge have prefix
window.SpeechRecognition =
  window.SpeechRecognition ?? window.webkitSpeechRecognition

export const initVoiceRecognition =
  // Be undefined when speech recognition support is undefined
  (typeof SpeechRecognition !== 'undefined' || undefined) &&
  (({ callback, commands }: VoiceRecognitionArgs) => {
    const grammar = `#JSGF V1.0;
    grammar in;
    public <response> = ${commands.join(' | ')};
  `

    const recogniser = new SpeechRecognition()
    recogniser.grammars.addFromString(grammar)
    recogniser.onend = () => recogniser.start()

    recogniser.onresult = res => {
      const cmd = last(res.results ?? [])?.[0]?.transcript?.trim()
      if (cmd) return callback(cmd)
    }

    recogniser.start()

    return recogniser
  })

export const voiceReduxAdaptor = (
  dispatch: Dispatch,
  actions: Record<string, ActionCreator<Action>>
): VoiceRecognitionArgs => ({
  callback(cmd: keyof typeof actions) {
    const a = actions[cmd]
    if (a) dispatch(a())
  },
  commands: Object.keys(actions),
})
