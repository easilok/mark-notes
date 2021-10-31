import { configureStore } from '@reduxjs/toolkit'
import creatSagaMiddleware from 'redux-saga'

import notesReducer from './slices/notesSlice'
import settingsReducer from './slices/settingsSlice'
import syncReducer from './slices/syncSlice'
import rootSaga from '../sagas'

const sagaMiddleware = creatSagaMiddleware()
const store = configureStore({
  reducer: {
    notes: notesReducer,
    settings: settingsReducer,
    sync: syncReducer,
  },
  // middleware: [sagaMiddleware, ...getDefaultMiddleware({thunk: false})],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
