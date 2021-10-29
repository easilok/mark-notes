import { all, put, takeLatest } from 'redux-saga/effects';

import { sync, finishSync } from '../store/slices/syncSlice';
import { saveNoteInformation } from '../api/local';

import {
  SyncAction
} from '../types';

function* syncData({payload}: SyncAction) {
  // const isDemo = true;
  try {
    // yield console.log("sync saga called");
    yield saveNoteInformation(payload);
    yield put(finishSync());
  } catch (error) {
    yield console.log("saga error ", error);
  }
}

function* rootSaga() {
  yield all([
    takeLatest(sync.type, syncData)
  ]);
}

export default rootSaga;
