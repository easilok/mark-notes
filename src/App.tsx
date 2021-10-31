import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks/store';
import NoteApp from './pages/Note';
import MainMenu from './components/MainMenu';
import EmptySelection from './pages/EmptySelection';

import { loadNotes } from './store/slices/notesSlice';
import { loadUserSettings } from './store/slices/settingsSlice';
import { sync } from './store/slices/syncSlice';

import { useInterval } from './hooks/interval';

import './styles/App.scss';

const App: React.FC = () => {
  const {
    notes,
    categories,
    currentNote,
    pendingSync,
    loading: notesLoading,
  } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadNotes());
    dispatch(loadUserSettings());
  }, [dispatch]);

  useInterval(() => {
    if (!notesLoading) {
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
}

export default App;
