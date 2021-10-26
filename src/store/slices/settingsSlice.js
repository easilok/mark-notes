import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    previewNote: false,
  },
  reducers: {
    tooglePreviewNote: (state) => {
      state.previewNote = !state.previewNote;
    },
    setPreviewNote: (state, action) => {
      state.previewNote = action.payload;
    },
  }
});

export const {
  tooglePreviewNote, setPreviewNote
} = settingsSlice.actions;

export default settingsSlice.reducer;
