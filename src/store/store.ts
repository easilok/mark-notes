import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import settingsReducer from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    settings: settingsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
