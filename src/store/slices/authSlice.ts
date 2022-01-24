import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { LoginResponse } from '../../types';

import {
  STORAGE_DATA_TYPE,
  saveDataToStorage,
  getDataFromStorage,
} from '../../storage/local';

interface AuthState {
  access: LoginResponse;
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: process.env.REACT_APP_SERVER_MODE ? false : true,
  access: {
    access_token: '',
    refresh_token: '',
    expiryDate: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadAuthData: (state) => {
      const authData = getDataFromStorage<LoginResponse>(
        STORAGE_DATA_TYPE.AUTH_DATA
      );
      if (authData) {
        state.access = { ...authData };
        if (authData.access_token.length > 0) {
          state.isAuth = true;
        }
      }
    },
    saveAuthData: (state, { payload }: PayloadAction<LoginResponse | null>) => {
      if (payload === null) {
        state.access = {
          access_token: '',
          refresh_token: '',
          expiryDate: '',
        };
        saveDataToStorage<''>(STORAGE_DATA_TYPE.AUTH_DATA, '');
      } else {
        state.access = { ...payload };
        saveDataToStorage<LoginResponse>(
          STORAGE_DATA_TYPE.AUTH_DATA,
          state.access
        );
      }
    },
    setAuthenticated: (state) => {
      state.isAuth = true;
    },
    clearAuthenticated: (state) => {
      state.isAuth = false;
    },
  },
});

export const {
  loadAuthData,
  saveAuthData,
  setAuthenticated,
  clearAuthenticated,
} = authSlice.actions;

export const authAccessSelector = (state: RootState): LoginResponse =>
  state.auth.access;

export default authSlice.reducer;
