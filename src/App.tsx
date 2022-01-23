import React, { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './hooks/store';
import NoteApp from './pages/Note';
import Login from './pages/Login';
import MainMenu from './components/MainMenu';
import EmptySelection from './pages/EmptySelection';
import Error from './pages/Error';

import { loadNotes } from './store/slices/notesSlice';
import { loadUserSettings } from './store/slices/settingsSlice';
import { sync } from './store/slices/syncSlice';

import { useInterval } from './hooks/interval';

import { LoginResponse, LoginCredentials } from './types';

import { loginInServer } from './api/server';

import './styles/App.scss';
import {
  clearAuthenticated,
  loadAuthData,
  saveAuthData,
  setAuthenticated,
} from './store/slices/authSlice';
import { SwalToast } from './helpers/SweetAlert';

const App: React.FC = () => {
  const { isAuth, access } = useAppSelector((state) => state.auth);
  const {
    notes,
    categories,
    currentNote,
    pendingSync,
    loading: notesLoading,
    error: notesError,
  } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  const _clearAuth = () => {
    dispatch(saveAuthData(null));
    dispatch(clearAuthenticated());
  };
  const _saveAuthData = (authData: LoginResponse) => {
    dispatch(saveAuthData(authData));
    dispatch(setAuthenticated());
  };

  const logoutHandler = useCallback(() => {
    _clearAuth();
    // setAccess('');
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, [_clearAuth]);

  const setAutoLogout = useCallback(
    (milliseconds) => {
      setTimeout(() => {
        logoutHandler();
      }, milliseconds);
    },
    [logoutHandler]
  );

  useEffect(() => {
    if (access.access_token.length === 0) {
      return;
    }
    if (new Date(access.expiryDate) <= new Date()) {
      logoutHandler();

      return;
    }
    const remainingMilliseconds =
      new Date(access.expiryDate).getTime() - new Date().getTime();
    // setIsAuth(true);
    setAutoLogout(remainingMilliseconds);
  }, [setAutoLogout, logoutHandler, access]);

  const loginHandler = (authData: LoginCredentials) => {
    loginInServer({ username: authData.username, password: authData.password })
      .then((loginResult: LoginResponse) => {
        const remainingMilliseconds = 24 * 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        setAutoLogout(remainingMilliseconds);
        _saveAuthData({ ...loginResult, expiryDate: expiryDate.toISOString() });
      })
      .catch((err) => {
        SwalToast({
          title: 'Invalid Credentials',
          icon: 'error',
        });
        // eslint-disable-next-line no-console
        console.log(err);
        _clearAuth();
      });
  };

  useEffect(() => {
    dispatch(loadAuthData());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      dispatch(loadNotes());
      dispatch(loadUserSettings());
    }
  }, [dispatch, isAuth]);

  useInterval(() => {
    if (!notesLoading && isAuth) {
      dispatch(
        sync({
          notesData: { notes, categories },
          currentNote,
          pendingSync,
        })
      );
    }
  }, 10000);

  // useEffect(() => {
  //   console.log("Set interval");
  //   const timerRef = setInterval(() => {
  //     if (!notesLoading) {
  //       dispatch(sync({
  //         notesData: { notes, categories },
  //         currentNote,
  //         pendingSync
  //       }));
  //     }
  //   }, 10000);
  //   return () => clearInterval(timerRef);
  // }, [dispatch, notes, categories, currentNote, notesLoading, pendingSync]);
  //

  if (!isAuth) {
    return (
      <div className="App">
        <Login onLogin={loginHandler} />
      </div>
    );
  }

  if (notesError.length > 0) {
    return (
      <div className="App">
        <Error />
      </div>
    );
  }

  return (
    <div className="App">
      <MainMenu />
      {currentNote.filename.length > 0 || currentNote.content.length > 0 ? (
        <NoteApp />
      ) : (
        <EmptySelection />
      )}
    </div>
  );
};

export default App;
