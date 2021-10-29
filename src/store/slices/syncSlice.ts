import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {ApplicationData} from '../../types';

interface SyncState {
  syncing: boolean;
  lastSync: string;
};

const initialState: SyncState = {
  syncing: false,
  lastSync: '',
}

export const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    sync: (state, {payload}: PayloadAction<ApplicationData>) => {
      state.syncing = true;
    },
    finishSync: (state) => {
      state.syncing = false;
      state.lastSync = new Date().toLocaleString('en-GB', {dateStyle: 'short', timeStyle: 'short'});
      console.log("Sync: ", state.lastSync);
    }
  }
});

export const {
  sync, finishSync
} = syncSlice.actions;

export default syncSlice.reducer;
