import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import notesReducer from './slices/notesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    notes: notesReducer,
  },
});
