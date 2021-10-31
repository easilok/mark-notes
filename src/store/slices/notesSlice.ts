import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
  NoteInterface,
  NoteInformation,
  convertFilepath,
  convertTitle,
} from '../../models/Note'

import { ApplicationData } from '../../types'

export interface NoteState extends ApplicationData {
  currentNote: NoteInterface
  isFavorite: boolean
  pendingSync: NoteInterface[]
  loading: boolean
  error: string
  scanning: boolean
  opening: boolean
}

const pushNoteInformation = (state: NoteState) => {
  if (state.currentNote.filename.length === 0) {
    return
  }
  const noteTitle = convertTitle(state.currentNote.content)
  const noteIndex = state.notes.findIndex(
    (n) => n.filename === state.currentNote.filename
  )
  if (noteIndex < 0) {
    state.notes.push({
      filename: state.currentNote.filename,
      title: noteTitle,
      favorite: false,
    })
  } else {
    state.notes[noteIndex].title = noteTitle
  }
}

const queueNoteSaving = ({ currentNote, pendingSync }: NoteState) => {
  if (currentNote.filename.length === 0 && currentNote.content.length === 0) {
    return
  }

  if (currentNote.content.length === 0) {
    return
  }

  if (currentNote.filename.length === 0) {
    currentNote.filename = new Date().toISOString()
  }
  const noteIndex = pendingSync.findIndex(
    (n) => n.filename === currentNote.filename
  )
  if (noteIndex < 0) {
    pendingSync.push({ ...currentNote })
  } else {
    pendingSync[noteIndex].content = currentNote.content
  }
}

const initialState: NoteState = {
  notes: [],
  categories: [],
  favorites: [],
  currentNote: {
    filename: '',
    content: '',
  },
  isFavorite: false,
  pendingSync: [],
  loading: false,
  error: '',
  scanning: false,
  opening: false,
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    loadNotes: (state) => {
      state.loading = true
    },
    finishLoadNotes: (
      state,
      { payload }: PayloadAction<ApplicationData | null>
    ) => {
      state.loading = false
      if (payload) {
        state.notes = payload.notes
        state.categories = payload.categories
        state.favorites = payload.favorites
      } else {
        state.notes = []
        state.categories = []
        state.favorites = []
      }
    },
    errorLoadNotes: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      console.log('Load Notes error', state.error)
    },
    scanNotes: (state, _action: PayloadAction<NoteInformation[]>) => {
      state.scanning = true
    },
    finishScanNotes: (state, { payload }: PayloadAction<NoteInformation[]>) => {
      state.scanning = false
      if (payload) {
        state.notes = [...state.notes, ...payload]
      }
    },
    openNote: (state, action: PayloadAction<string>) => {
      // getting stored value
      queueNoteSaving(state)
      state.currentNote.filename = action.payload
      state.currentNote.content = ''
      state.opening = true
      state.isFavorite = false
    },
    finishOpenNote: (state, action: PayloadAction<string>) => {
      state.currentNote.content = action.payload
      state.opening = false
      const noteInfo = state.notes.find(
        (n) => n.filename === state.currentNote.filename
      )
      if (noteInfo) {
        state.isFavorite = noteInfo.favorite
      }
    },
    saveNote: (state) => {
      console.log('Save note', state)
    },
    setFilename: (state, action: PayloadAction<string>) => {
      state.currentNote.filename = action.payload
    },
    setNoteContent: (state, action) => {
      state.currentNote.content = action.payload
      pushNoteInformation(state)
    },
    newNote: (state) => {
      queueNoteSaving(state)
      state.currentNote = {
        filename: new Date().toISOString(),
        content: '',
      }
      state.isFavorite = false
    },
    deleteNote: (state, _action: PayloadAction<string>) => {
      state.currentNote = {
        filename: '',
        content: '',
      }
      state.isFavorite = false
    },
    finishDeleteNote: (state, { payload }: PayloadAction<string>) => {
      state.notes = state.notes.filter(
        (n) => convertFilepath(n.filename) !== convertFilepath(payload)
      )
      state.favorites = state.favorites.filter(
        (n) => convertFilepath(n.filename) !== convertFilepath(payload)
      )
    },
    clearQueue: (state) => {
      state.pendingSync = []
    },
    toggleFavorite: (state) => {
      const currentNoteIndex = state.notes.findIndex(
        (n) => n.filename === state.currentNote.filename
      )
      if (currentNoteIndex >= 0) {
        const isFavorite = !state.notes[currentNoteIndex].favorite
        state.isFavorite = isFavorite
        state.notes[currentNoteIndex].favorite = isFavorite
        if (isFavorite) {
          state.favorites.push({
            ...state.notes[currentNoteIndex],
          })
        } else {
          state.favorites = state.favorites.filter(
            (n) => n.filename !== state.notes[currentNoteIndex].filename
          )
        }
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  loadNotes,
  finishLoadNotes,
  errorLoadNotes,
  openNote,
  finishOpenNote,
  saveNote,
  setFilename,
  setNoteContent,
  newNote,
  clearQueue,
  deleteNote,
  finishDeleteNote,
  scanNotes,
  finishScanNotes,
  toggleFavorite,
} = notesSlice.actions

export const selectNotes = (state: RootState) => state.notes.notes
export const selectFavorites = (state: RootState) => state.notes.favorites
export const selectPendingSync = (state: RootState) => state.notes.pendingSync

export default notesSlice.reducer
