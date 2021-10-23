import { createSlice } from '@reduxjs/toolkit'

const NOTE_DATA_STORE_KEY = "noteData";

const removeNoteFromStorage = (state) => {
  if (state.filename.length > 0) {
    localStorage.removeItem(state.filename);
  }
  const newNoteList = state.list.filter(n => n.filename !== state.filename);
  state.list = newNoteList;
  localStorage.setItem(NOTE_DATA_STORE_KEY, JSON.stringify({
    categories: state.categories,
    notes: state.list
  }));
}

const saveNoteToStorage = (state) => {
  if (state.filename.length > 0) {
    localStorage.setItem(state.filename, state.noteContent);
  }
  const noteIndex = state.list.findIndex(n => n.filename === state.filename);
  let noteTitle = '';
  if (state.noteContent.length > 0) {
    noteTitle = state.noteContent.split('\n')[0];
    noteTitle = noteTitle.replace('#', '').trim();
  }
  if (noteIndex < 0) {
    state.list.push({
      filename: state.filename,
      title: noteTitle
    });
  } else {
    state.list[noteIndex].title = noteTitle;
  }
  localStorage.setItem(NOTE_DATA_STORE_KEY, JSON.stringify({
    categories: state.categories,
    notes: state.list
  }));
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    list: [],
    categories: [],
    filename: '',
    noteContent: '',
  },
  reducers: {
    loadNotes: (state) => {
      // getting stored value
      const noteData = localStorage.getItem(NOTE_DATA_STORE_KEY);
      const parsedNoteData = JSON.parse(noteData);
      if (parsedNoteData) {
        state.list = parsedNoteData.notes;
        state.categories = parsedNoteData.categories;
      } else {
        state.list = [];
        state.categories = [];
      }
      console.log("store notes", state.list);
    },
    openNote: (state, action) => {
      // getting stored value
      const selectedNote = localStorage.getItem(action.payload);
      state.filename = action.payload;
      state.noteContent = selectedNote || '';
      console.log("note title", state.noteContent.split('\n'));
    },
    saveNote: (state) => {
      console.log("Save note", state);
      saveNoteToStorage(state);
    },
    setFilename: (state, action) => {
      removeNoteFromStorage(state);
      state.filename = action.payload;
      saveNoteToStorage(state);
    },
    setNoteContent: (state, action) => {
      console.log("Set note content", action);
      state.noteContent = action.payload;
      saveNoteToStorage(state);
    },
    newNote: (state) => {
      saveNoteToStorage(state);
      state.filename = new Date().toISOString();
      state.noteContent = '';
    },
    deleteNote: (state) => {
      removeNoteFromStorage(state);
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  loadNotes, openNote, saveNote, setFilename,
  setNoteContent, newNote, deleteNote
} =
  notesSlice.actions

export default notesSlice.reducer
