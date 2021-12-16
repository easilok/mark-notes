import { all, put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { sync, finishSync } from '../store/slices/syncSlice';
import {
  loadNotes,
  finishLoadNotes,
  errorLoadNotes,
  scanNotes,
  finishScanNotes,
  deleteNote,
  finishDeleteNote,
  openNote,
  finishOpenNote,
  selectNotes,
  selectCurrentNote,
  selectPendingSync,
  clearQueue,
  toggleFavorite,
} from '../store/slices/notesSlice';
import {
  syncNoteData,
  loadNoteInformation,
  scanMissingNotes,
  removeLocalNote,
  openLocalNote,
} from '../api/local';
import {
  fetchNoteInformationFromServer,
  putNoteOnServer,
  fetchNoteFromServer,
  deleteNoteOnServer,
  toggleNoteFavoriteOnServer,
  scanNotesInServer,
} from '../api/server';
import {
  ScanAction,
  SyncAction,
  DeleteNoteAction,
  OpenNoteAction,
  ApplicationData,
} from '../types';

import { NoteInterface, NoteInformation } from '../models/Note';

const isServerMode = process.env.REACT_APP_SERVER_MODE;

function* syncData({ payload }: SyncAction) {
  // const isDemo = true;
  try {
    // yield console.log("sync saga called");
    if (isServerMode) {
      yield payload.pendingSync.map((n) => putNoteOnServer(n));
      // const currentNote: NoteInterface = yield select(selectCurrentNote);
      // yield put(openNote(currentNote.filename));
    } else {
      yield syncNoteData(payload);
    }
    yield put(clearQueue());
    yield put(finishSync());
    yield put(loadNotes());
  } catch (error) {
    // eslint-disable-next-line no-console
    yield console.log('saga error ', error);
  }
}

function* fetchNotes() {
  try {
    let noteData: ApplicationData = {
      notes: [],
      favorites: [],
      categories: [],
    };
    if (isServerMode) {
      const { notes, favorites } = yield fetchNoteInformationFromServer();
      noteData.notes = notes;
      noteData.favorites = favorites;
      // yield console.log("Saga Notes putting :", noteData);
    } else {
      // yield console.log("Saga Notes fetched");
      noteData = yield loadNoteInformation();
      // yield console.log("Saga Notes putting :", noteData);
    }
    yield put(finishLoadNotes(noteData));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message) {
      yield put(errorLoadNotes(error.message));
    }
  }
}

function* fetchMissingNotes({ payload }: ScanAction) {
  try {
    // yield console.log("Saga Missing Notes fetched");
    let noteData: NoteInformation[];
    if (isServerMode) {
      noteData = yield scanNotesInServer();
    } else {
      noteData = yield scanMissingNotes(payload);
    }
    // yield console.log("Saga Missing Notes putting :", noteData);
    yield put(finishScanNotes(noteData));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message) {
      yield put(errorLoadNotes(error.message));
    }
  }
}

function* removeNote({ payload }: DeleteNoteAction) {
  try {
    if (isServerMode) {
      yield deleteNoteOnServer(payload);
    } else {
      // yield console.log("Saga Deleting Notes: " + payload);
      yield removeLocalNote(payload);
    }
    yield put(finishDeleteNote(payload));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message) {
      yield put(errorLoadNotes(error.message));
    }
  }
}

function* fetchNote({ payload }: OpenNoteAction) {
  try {
    // yield console.log("Saga fetching Note: " + payload);
    const pendingNotes: NoteInterface[] = yield select(selectPendingSync);
    const pendingNote = pendingNotes.find((n) => n.filename === payload);
    let noteContent: string;
    if (pendingNote) {
      noteContent = pendingNote.content;
    } else {
      if (isServerMode) {
        const fetchedNote: NoteInterface = yield fetchNoteFromServer(payload);
        noteContent = fetchedNote.content;
      } else {
        noteContent = yield openLocalNote(payload);
      }
    }
    yield put(finishOpenNote(noteContent));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message) {
      yield put(errorLoadNotes(error.message));
    }
  }
}

function* toggleFavoriteNote() {
  try {
    if (isServerMode) {
      const currentNote: NoteInterface = yield select(selectCurrentNote);
      const notesState: NoteInformation[] = yield select(selectNotes);
      const noteFavorited = notesState.find(
        (n) => n.filename === currentNote.filename
      );
      let setFavorite = false;
      if (noteFavorited) {
        setFavorite = noteFavorited.favorite;
      }
      yield toggleNoteFavoriteOnServer(currentNote.filename, setFavorite);
      yield put(loadNotes());
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message) {
      yield put(errorLoadNotes(error.message));
    }
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* rootSaga() {
  yield all([
    takeLatest(sync.type, syncData),
    takeLatest(loadNotes.type, fetchNotes),
    takeLatest(scanNotes.type, fetchMissingNotes),
    takeEvery(deleteNote.type, removeNote),
    takeLatest(openNote.type, fetchNote),
    takeEvery(toggleFavorite.type, toggleFavoriteNote),
  ]);
}

export default rootSaga;
