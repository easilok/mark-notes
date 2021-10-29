import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks/store';
import NoteApp from './pages/Note';
import MainMenu from './components/MainMenu';

import { loadNotes } from './store/slices/notesSlice';
import { loadUserSettings } from './store/slices/settingsSlice';
import { sync, finishSync } from './store/slices/syncSlice';
// import { finishSync } from './store/slices/syncSlice';
// import { saveDataToStorage, STORAGE_DATA_TYPE } from './storage/local';
// import { Note } from './models/Note';

import './styles/App.scss';

function App() {

  const { notes, categories } = useAppSelector(state => state.notes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadNotes());
    dispatch(loadUserSettings());
    dispatch(finishSync());
  }, [dispatch]);

  useEffect (() => {
    const timerRef = setInterval(() => {
        dispatch(sync({notes, categories}));
    }, 10000);
    return () => clearInterval(timerRef);
  }, [dispatch, notes, categories]);

  // useEffect(() => {
  //   const timerRef = setInterval(() => {
  //     const notes: NoteState = useAppSelector(state => state.notes);
  //     saveDataToStorage<ApplicationData>(
  //       STORAGE_DATA_TYPE.APPLICATION_NOTES,
  //       { notes: notes.notes, categories: notes.categories }
  //     );
  //     const note = new Note(notes.filename, notes.noteContent);
  //     saveDataToStorage<Note>(STORAGE_DATA_TYPE.NOTE, note);
  //     dispatch(finishSync());
  //   }, 10000);
  //   return () => clearInterval(timerRef);
  // }, [dispatch, useAppSelector, saveDataToStorage]);

  return (
    <div className="App">
      <MainMenu />
      <NoteApp />
    </div>
  );
}

export default App;
