import { all, put, takeLatest, takeEvery, select } from 'redux-saga/effects'

import { sync, finishSync } from '../store/slices/syncSlice'
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
  selectPendingSync,
  clearQueue,
} from '../store/slices/notesSlice'
import {
  syncNoteData,
  loadNoteInformation,
  scanMissingNotes,
  removeLocalNote,
  openLocalNote,
} from '../api/local'
import {
  ScanAction,
  SyncAction,
  DeleteNoteAction,
  OpenNoteAction,
  ApplicationData,
} from '../types'

import { NoteInterface, NoteInformation } from '../models/Note'

function* syncData({ payload }: SyncAction) {
  // const isDemo = true;
  try {
    // yield console.log("sync saga called");
    yield syncNoteData(payload)
    yield put(clearQueue())
    yield put(finishSync())
    yield put(loadNotes())
  } catch (error) {
    yield console.log('saga error ', error)
  }
}

function* fetchNotes() {
  try {
    // yield console.log("Saga Notes fetched");
    const noteData: ApplicationData = yield loadNoteInformation()
    // yield console.log("Saga Notes putting :", noteData);
    yield put(finishLoadNotes(noteData))
  } catch (error: any) {
    yield put(errorLoadNotes(error.message))
  }
}

function* fetchMissingNotes({ payload }: ScanAction) {
  try {
    // yield console.log("Saga Missing Notes fetched");
    const noteData: NoteInformation[] = yield scanMissingNotes(payload)
    // yield console.log("Saga Missing Notes putting :", noteData);
    yield put(finishScanNotes(noteData))
  } catch (error: any) {
    yield put(errorLoadNotes(error.message))
  }
}

function* removeNote({ payload }: DeleteNoteAction) {
  try {
    // yield console.log("Saga Deleting Notes: " + payload);
    yield removeLocalNote(payload)
    yield put(finishDeleteNote(payload))
  } catch (error: any) {
    yield put(errorLoadNotes(error.message))
  }
}

function* fetchNote({ payload }: OpenNoteAction) {
  try {
    // yield console.log("Saga fetching Note: " + payload);
    const pendingNotes: NoteInterface[] = yield select(selectPendingSync)
    const pendingNote = pendingNotes.find((n) => n.filename === payload)
    let noteContent: string
    if (pendingNote) {
      noteContent = pendingNote.content
    } else {
      noteContent = yield openLocalNote(payload)
    }
    yield put(finishOpenNote(noteContent))
  } catch (error: any) {
    yield put(errorLoadNotes(error.message))
  }
}

function* rootSaga() {
  yield all([
    takeLatest(sync.type, syncData),
    takeLatest(loadNotes.type, fetchNotes),
    takeLatest(scanNotes.type, fetchMissingNotes),
    takeEvery(deleteNote.type, removeNote),
    takeLatest(openNote.type, fetchNote),
  ])
}

export default rootSaga
