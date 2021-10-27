import { createSlice } from '@reduxjs/toolkit'

// import { finishLoadNotes } from './slices/notesSlice';


interface SyncState {
  lastSync: string;
};

const initialState: SyncState = {
  lastSync: '',
}

export const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    finishSync: (state) => {
      state.lastSync = new Date().toISOString();
      console.log("Sync: ", state.lastSync);
    }
  }
});

export const {
  finishSync
} = syncSlice.actions;

export default syncSlice.reducer;
