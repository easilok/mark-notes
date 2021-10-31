import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import {
  STORAGE_DATA_TYPE,
  saveDataToStorage,
  getDataFromStorage,
} from '../../storage/local'

import { MENU_SELECTION } from '../../types'

export interface ApplicationSettings {
  menuCollapsed: boolean
}

interface SettingsState {
  general: ApplicationSettings
  previewNote: boolean
  currentMenu: MENU_SELECTION
}

const initialState: SettingsState = {
  general: {
    menuCollapsed: false,
  },
  previewNote: false,
  currentMenu: MENU_SELECTION.NONE,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loadUserSettings: (state) => {
      const userSettings = getDataFromStorage<ApplicationSettings>(
        STORAGE_DATA_TYPE.APPLICATION_SETTINGS
      )
      if (userSettings) {
        state.general = { ...userSettings }
      }
    },
    tooglePreviewNote: (state) => {
      state.previewNote = !state.previewNote
    },
    setPreviewNote: (state, action) => {
      state.previewNote = action.payload
    },
    toogleMenuCollapsed: (state) => {
      state.general.menuCollapsed = !state.general.menuCollapsed
      saveDataToStorage<ApplicationSettings>(
        STORAGE_DATA_TYPE.APPLICATION_SETTINGS,
        state.general
      )
    },
    setCurrentMenu: (state, action: PayloadAction<MENU_SELECTION>) => {
      state.currentMenu = action.payload
    },
  },
})

export const {
  tooglePreviewNote,
  setPreviewNote,
  loadUserSettings,
  toogleMenuCollapsed,
  setCurrentMenu,
} = settingsSlice.actions

export const generalSettings = (state: RootState) => state.settings.general

export default settingsSlice.reducer
