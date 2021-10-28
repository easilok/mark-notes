import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { NoteInformation } from '../../models/NoteInformation';
import { NoteInterface, convertFilepath, convertTitle } from '../../models/Note';

const NOTE_DATA_STORE_KEY = "noteData";

export interface ApplicationData {
  notes: NoteInformation[];
  categories: string[];
}

export interface NoteState extends ApplicationData {
  currentNote: NoteInterface;
}

const removeNoteFromStorage = (state: NoteState) => {
  if (state.currentNote.filename.length > 0) {
    const filepath = convertFilepath(state.currentNote.filename);
    localStorage.removeItem(filepath);
  }
  const newNoteList = state.notes.filter(
    n => n.filename !== state.currentNote.filename
  );
  state.notes = newNoteList;
  localStorage.setItem(NOTE_DATA_STORE_KEY, JSON.stringify({
    categories: state.categories,
    notes: state.notes
  }));
}

const saveNoteToStorage = (state: NoteState) => {
  if (state.currentNote.filename.length === 0) {
    return;
  }
  const filepath = convertFilepath(state.currentNote.filename);
  const noteTitle = convertTitle(state.currentNote.content);
  localStorage.setItem(filepath, state.currentNote.content);
  const noteIndex = state.notes.findIndex(
    n => n.filename === state.currentNote.filename
  );
  if (noteIndex < 0) {
    state.notes.push({
      filename: state.currentNote.filename,
      title: noteTitle,
    });
  } else {
    state.notes[noteIndex].title = noteTitle;
  }
  saveNotesListToStorage(state);
};

const saveNotesListToStorage = (state: ApplicationData) => {
  localStorage.setItem(NOTE_DATA_STORE_KEY, JSON.stringify({
    categories: state.categories,
    notes: state.notes
  }));
};

const initialState: NoteState = {
  notes: [],
  categories: [],
  currentNote: {
    filename: '',
    content: ''
  },
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    loadNotes: (state) => {
      // getting stored value
      const noteData = localStorage.getItem(NOTE_DATA_STORE_KEY);
      if (!noteData) {
        return;
      }
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
      const storageMissingDocs: NoteInformation[] = [];
      storageKeys.forEach(key => {
        if (key.endsWith('.md')) {
          const noteIndex = state.notes.findIndex(
            n => NoteInformation.getFilepath(n.filename) === key
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
    openNote: (state, action: PayloadAction<string>) => {
      // getting stored value
      state.currentNote.filename = action.payload;
      const selectedNote = localStorage.getItem(
        convertFilepath(state.currentNote.filename)
      );
      state.currentNote.content = selectedNote || '';
    },
    saveNote: (state) => {
      console.log("Save note", state);
      saveNoteToStorage(state);
    },
    setFilename: (state, action: PayloadAction<string>) => {
      removeNoteFromStorage(state);
      state.currentNote.filename = action.payload;
      saveNoteToStorage(state);
    },
    setNoteContent: (state, action) => {
      console.log("Set note content", action);
      state.currentNote.content = action.payload;
      saveNoteToStorage(state);
    },
    newNote: (state) => {
      saveNoteToStorage(state);
      state.currentNote = {
        filename: new Date().toISOString(),
        content: ''
      };
    },
    deleteNote: (state) => {
      removeNoteFromStorage(state);
      state.currentNote = {
        filename: '',
        content: ''
      };
    },
    finishLoadNotes: (state, { payload }: PayloadAction<ApplicationData | null>) => {
      if (!payload) {
        state.notes = [];
        state.categories = [];
      } else {
        state.notes = payload.notes;
        state.categories = payload.categories;
      }
    },

  },
})

// Action creators are generated for each case reducer function
export const {
  loadNotes, openNote, saveNote, setFilename,
  setNoteContent, newNote, deleteNote, scanNotes,
  finishLoadNotes
} = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer
