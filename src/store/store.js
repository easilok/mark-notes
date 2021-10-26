import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import settingsReducer from './slices/settingsSlice';

export default configureStore({
  reducer: {
    notes: notesReducer,
    settings: settingsReducer,
  },
});
