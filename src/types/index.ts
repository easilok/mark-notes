import { sync } from '../store/slices/syncSlice';
import { scanNotes, deleteNote, openNote } from '../store/slices/notesSlice';
import { NoteInformation, NoteInterface } from '../models/Note';

export interface NotesLocalData {
  notes: NoteInformation[];
  categories: string[];
}

export interface ApplicationData extends NotesLocalData {
  favorites: NoteInformation[];
}

export interface SyncPayload {
  notesData: NotesLocalData;
  currentNote: NoteInterface;
  pendingSync: NoteInterface[];
}

export interface SyncAction {
  type: typeof sync.type;
  payload: SyncPayload;
}

export interface ScanAction {
  type: typeof scanNotes.type;
  payload: NoteInformation[];
}

export interface OpenNoteAction {
  type: typeof openNote.type;
  payload: string;
}

export interface DeleteNoteAction {
  type: typeof deleteNote.type;
  payload: string;
}

export enum MENU_SELECTION {
  NONE = 'NONE',
  NOTES = 'NOTES',
  FAVORITES = 'FAVORITES',
  CATEGORY = 'CATEGORY',
  SCRATCHPAD = 'SCRATCHPAD',
  TRASH = 'TRASH',
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  refresh_token: string;
  access_token: string;
  expiryDate: string;
}

