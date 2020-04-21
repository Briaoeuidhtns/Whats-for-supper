import { createSelector, createSlice } from '@reduxjs/toolkit'

import { RootState } from 'app/rootReducer'

export interface SettingsState {
  voiceControl: boolean
}

let initialState: SettingsState = {
  voiceControl: false,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleVoiceControl(state) {
      state.voiceControl = !state.voiceControl
    },
  },
})

export const { toggleVoiceControl } = settingsSlice.actions

export const selectSettings = (state: RootState) => state.settings

export const selectVoiceControl = createSelector(
  [selectSettings],
  settings => settings.voiceControl
)

export default settingsSlice.reducer
