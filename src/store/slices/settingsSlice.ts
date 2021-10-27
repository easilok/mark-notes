import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

import {
  STORAGE_DATA_TYPE, saveDataToStorage, getDataFromStorage
} from '../../storage/local';

export interface ApplicationSettings {
  menuCollapsed: boolean;
}

interface SettingsState {
  general: ApplicationSettings;
  previewNote: boolean;
}

const initialState: SettingsState = {
  general: {
    menuCollapsed: false,
  },
  previewNote: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loadUserSettings: (state) => {
      const userSettings = getDataFromStorage<ApplicationSettings>(STORAGE_DATA_TYPE.APPLICATION_SETTINGS);
      if (userSettings) {
        state.general = { ...userSettings };
      }
    },
    tooglePreviewNote: (state) => {
      state.previewNote = !state.previewNote;
    },
    setPreviewNote: (state, action) => {
      state.previewNote = action.payload;
    },
    toogleMenuCollapsed: (state) => {
      state.general.menuCollapsed = !state.general.menuCollapsed;
      saveDataToStorage<ApplicationSettings>(STORAGE_DATA_TYPE.APPLICATION_SETTINGS, state.general);
    },
  }
});

export const {
  tooglePreviewNote, setPreviewNote, loadUserSettings, toogleMenuCollapsed
} = settingsSlice.actions;

export const generalSettings = (state: RootState) => state.settings.general;

export default settingsSlice.reducer;
