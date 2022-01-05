import { LoginResponse, NotesLocalData } from '../types';
import { ApplicationSettings } from '../store/slices/settingsSlice';
import { NoteInterface, convertFilepath } from '../models/Note';

export enum STORAGE_DATA_TYPE {
  APPLICATION_SETTINGS,
  APPLICATION_NOTES,
  NOTE,
  AUTH_DATA
}

const STORAGE_FIELD = {
  [STORAGE_DATA_TYPE.APPLICATION_SETTINGS]: 'noteSettings',
  [STORAGE_DATA_TYPE.APPLICATION_NOTES]: 'noteData',
  [STORAGE_DATA_TYPE.AUTH_DATA]: 'access',
};

type StoragePayload = NotesLocalData | ApplicationSettings | NoteInterface | LoginResponse | '';

export function saveDataToStorage<T extends StoragePayload>(
  type: STORAGE_DATA_TYPE,
  data: T
): void {
  switch (type) {
    case STORAGE_DATA_TYPE.APPLICATION_SETTINGS:
      localStorage.setItem(STORAGE_FIELD[type], JSON.stringify(data));
      break;
    case STORAGE_DATA_TYPE.APPLICATION_NOTES:
      localStorage.setItem(STORAGE_FIELD[type], JSON.stringify(data));
      break;
    case STORAGE_DATA_TYPE.AUTH_DATA:
      localStorage.setItem(STORAGE_FIELD[type], JSON.stringify(data));
      break;
    case STORAGE_DATA_TYPE.NOTE:
      // eslint-disable-next-line no-case-declarations
      const { filename, content } = data as NoteInterface;
      localStorage.setItem(convertFilepath(filename), content);
      break;
    default:
      break;
  }
}

export function getDataFromStorage<T extends StoragePayload>(
  type: STORAGE_DATA_TYPE,
  payload?: string | null
): T | null {
  switch (type) {
    case STORAGE_DATA_TYPE.APPLICATION_SETTINGS:
      // eslint-disable-next-line no-case-declarations
      const appSettings = localStorage.getItem(STORAGE_FIELD[type]);
      if (!appSettings) {
        return null;
      }

      return JSON.parse(appSettings) as T;
    case STORAGE_DATA_TYPE.APPLICATION_NOTES:
      // eslint-disable-next-line no-case-declarations
      const appNotes = localStorage.getItem(STORAGE_FIELD[type]);

      if (!appNotes) {
        return null;
      }

      return JSON.parse(appNotes) as T;
    case STORAGE_DATA_TYPE.NOTE:
      if (payload) {
        // eslint-disable-next-line no-case-declarations
        const savedNote = localStorage.getItem(payload);

        if (savedNote) {
          return JSON.parse(savedNote) as T;
        }
      }

      return null;
    case STORAGE_DATA_TYPE.AUTH_DATA:
      // eslint-disable-next-line no-case-declarations
      const authData = localStorage.getItem(STORAGE_FIELD[type]);

      if (authData) {
        return JSON.parse(authData) as T;
      }

      return null;
    default:
      return null;
  }
}
