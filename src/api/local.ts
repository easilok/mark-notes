import { NotesLocalData, SyncPayload, ApplicationData } from '../types';
import {
  NoteInterface,
  NoteInformation,
  convertFilepath,
  convertTitle,
} from '../models/Note';
import {
  STORAGE_DATA_TYPE,
  saveDataToStorage,
  getDataFromStorage,
} from '../storage/local';

export const syncNoteData = (
  payload: SyncPayload
): Promise<NotesLocalData | null> =>
  new Promise<NotesLocalData | null>((resolve) => {
    saveDataToStorage<NotesLocalData>(
      STORAGE_DATA_TYPE.APPLICATION_NOTES,
      payload.notesData
    );
    // For now removed sync current note and work only with queue
    // if (
    //   payload.currentNote.filename.length > 0 &&
    //   payload.currentNote.content.length > 0
    // ) {
    //   saveDataToStorage<NoteInterface>(
    //     STORAGE_DATA_TYPE.NOTE,
    //     payload.currentNote
    //   );
    // }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Saving pending notes: ', payload.pendingSync);
    }
    payload.pendingSync.forEach((n) => {
      saveDataToStorage<NoteInterface>(STORAGE_DATA_TYPE.NOTE, n);
    });
    resolve(
      getDataFromStorage<NotesLocalData>(STORAGE_DATA_TYPE.APPLICATION_NOTES)
    );
  });

export const loadNoteInformation = (): Promise<ApplicationData> =>
  new Promise<ApplicationData>((resolve) => {
    const storageData = getDataFromStorage<NotesLocalData>(
      STORAGE_DATA_TYPE.APPLICATION_NOTES
    );
    const fetchedData: ApplicationData = {
      notes: [],
      categories: [],
      favorites: [],
    };
    if (storageData) {
      // rebuild data in case of missing base
      if (storageData.notes) {
        fetchedData.notes = storageData.notes;
      }
      if (storageData.categories) {
        fetchedData.categories = storageData.categories;
      }
      fetchedData.notes.forEach((n) => {
        if (n.favorite) {
          fetchedData.favorites.push({
            ...n,
          });
        }
      });
    }
    resolve(fetchedData);
  });

export const scanMissingNotes = (
  payload: NoteInformation[]
): Promise<NoteInformation[]> =>
  new Promise<NoteInformation[]>((resolve) => {
    const storageKeys = Object.keys(localStorage);
    const storageMissingDocs: NoteInformation[] = [];
    storageKeys.forEach((key) => {
      if (key.endsWith('.md')) {
        const noteIndex = payload.findIndex(
          (n) => convertFilepath(n.filename) === key
        );
        if (noteIndex < 0) {
          const selectedNote = localStorage.getItem(key);
          storageMissingDocs.push({
            filename: key,
            title: selectedNote ? convertTitle(selectedNote) : '',
            favorite: false,
          });
        }
      }
    });
    // console.log('scanMissingNotes - API', storageMissingDocs)
    const mergedData: NoteInformation[] = [...storageMissingDocs];
    resolve(mergedData);
  });

export const removeLocalNote = (payload: string): Promise<null> =>
  new Promise((resolve) => {
    if (payload.length > 0) {
      const filepath = convertFilepath(payload);
      localStorage.removeItem(filepath);
    }
    resolve(null);
  });

export const openLocalNote = (payload: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    if (payload.length > 0) {
      const selectedNote = localStorage.getItem(convertFilepath(payload));
      resolve(selectedNote || '');
    }
    reject('Empty filename');
  });
