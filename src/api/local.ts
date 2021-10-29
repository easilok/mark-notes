import {ApplicationData} from '../types';
import { 
  STORAGE_DATA_TYPE, saveDataToStorage, getDataFromStorage 
} from '../storage/local';

export const saveNoteInformation = (payload: ApplicationData) =>
  new Promise<ApplicationData | null>((resolve) => {
    saveDataToStorage<ApplicationData>(
      STORAGE_DATA_TYPE.APPLICATION_NOTES, 
      payload
    );
    resolve(
      getDataFromStorage<ApplicationData>(STORAGE_DATA_TYPE.APPLICATION_NOTES)
    )
  })
