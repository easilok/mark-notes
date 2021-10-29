import { ApplicationData } from '../types';
import { ApplicationSettings } from '../store/slices/settingsSlice';
import { NoteInterface, convertFilepath } from '../models/Note';

export enum STORAGE_DATA_TYPE {
  APPLICATION_SETTINGS,
  APPLICATION_NOTES,
  NOTE
};

const STORAGE_FIELD = {
  [STORAGE_DATA_TYPE.APPLICATION_SETTINGS]: 'noteSettings',
  [STORAGE_DATA_TYPE.APPLICATION_NOTES]: 'noteData',
};

type StoragePayload = ApplicationData | ApplicationSettings | NoteInterface;

export function saveDataToStorage<T extends StoragePayload>(
  type: STORAGE_DATA_TYPE, data: T): void {
  switch (type) {
    case STORAGE_DATA_TYPE.APPLICATION_SETTINGS:
      localStorage.setItem(STORAGE_FIELD[type], JSON.stringify(data));
      break;
    case STORAGE_DATA_TYPE.APPLICATION_NOTES:
      localStorage.setItem(STORAGE_FIELD[type], JSON.stringify(data));
      break;
    case STORAGE_DATA_TYPE.NOTE:
      const { filename, content } = data as NoteInterface;
      localStorage.setItem(convertFilepath(filename), content);
      break;
    default:
      return;
  }
}

export function getDataFromStorage<T extends StoragePayload>(type: STORAGE_DATA_TYPE, payload?: string | null): T | null {
  switch (type) {
    case STORAGE_DATA_TYPE.APPLICATION_SETTINGS:
      const appSettings = localStorage.getItem(STORAGE_FIELD[type]);
      if (!appSettings) {
        return null;
      }
      return JSON.parse(appSettings) as T;
    case STORAGE_DATA_TYPE.APPLICATION_NOTES:
      const appNotes = localStorage.getItem(STORAGE_FIELD[type]);
      if (!appNotes) {
        return null;
      }
      return JSON.parse(appNotes) as T;
    case STORAGE_DATA_TYPE.NOTE:
      if (payload) {
        const savedNote = localStorage.getItem(payload)
        if (savedNote) {
          return JSON.parse(savedNote) as T;
        }
      }
      return null;
    default:
      return null;
  }
}
