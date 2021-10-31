import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SyncPayload } from '../../types';

interface SyncState {
  syncing: boolean;
  lastSync: string;
}

const initialState: SyncState = {
  syncing: false,
  lastSync: '',
};

export const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    sync: (state, _payload: PayloadAction<SyncPayload>) => {
      state.syncing = true;
    },
    finishSync: (state) => {
      state.syncing = false;
      state.lastSync = new Date().toLocaleString('en-GB', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
    },
  },
});

export const { sync, finishSync } = syncSlice.actions;

export default syncSlice.reducer;
