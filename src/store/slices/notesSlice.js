import { createSlice } from '@reduxjs/toolkit'

const NOTE_DATA_STORE_KEY = "noteData";

const getNoteFilepath = (filename) => {
  if (filename.endsWith(".md")) {
    return filename;
  }
  return filename + ".md";
}

const removeNoteFromStorage = (state) => {
  if (state.filename.length > 0) {
    const filepath = getNoteFilepath(state.filename);
    localStorage.removeItem(filepath);
  }
  const newNoteList = state.notes.filter(n => n.filename !== state.filename);
  state.notes = newNoteList;
  localStorage.setItem(NOTE_DATA_STORE_KEY, JSON.stringify({
    categories: state.categories,
    notes: state.notes
  }));
}

const saveNoteToStorage = (state) => {
  if (state.filename.length > 0) {
    const filepath = getNoteFilepath(state.filename);
    localStorage.setItem(filepath, state.noteContent);
  }
  const noteIndex = state.notes.findIndex(n => n.filename === state.filename);
  let noteTitle = '';
  if (state.noteContent.length > 0) {
    noteTitle = state.noteContent.split('\n')[0];
    noteTitle = noteTitle.replace('#', '').trim();
  }
  if (noteIndex < 0) {
    state.notes.push({
      filename: state.filename,
      title: noteTitle
    });
  } else {
    state.notes[noteIndex].title = noteTitle;
  }
  saveNotesListToStorage(state);
};

const saveNotesListToStorage = (state) => {
  localStorage.setItem(NOTE_DATA_STORE_KEY, JSON.stringify({
    categories: state.categories,
    notes: state.notes
  }));
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
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
        state.notes = parsedNoteData.notes;
        state.categories = parsedNoteData.categories;
      } else {
        state.notes = [];
        state.categories = [];
      }
      console.log("store notes", state.notes);
    },
    scanNotes: (state) => {
      const storageKeys = Object.keys(localStorage);
      const storageMissingDocs = [];
      storageKeys.forEach(key => {
        if (key.endsWith('.md')) {
          const noteIndex = state.notes.findIndex(
            n => getNoteFilepath(n.filename) === key
          );
          if (noteIndex < 0) {
            storageMissingDocs.push({
              filename: key,
              title: ''
            });
          }
        }
      });
      state.notes = [
        ...state.notes,
        ...storageMissingDocs
      ];
      saveNotesListToStorage(state);
    },
    openNote: (state, action) => {
      // getting stored value
      state.filename = action.payload;
      const filepath = getNoteFilepath(state.filename);
      const selectedNote = localStorage.getItem(filepath);
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
      state.filename = '';
      state.noteContent = '';
      removeNoteFromStorage(state);
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  loadNotes, openNote, saveNote, setFilename,
  setNoteContent, newNote, deleteNote, scanNotes
} =
  notesSlice.actions

export default notesSlice.reducer
