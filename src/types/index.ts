import { sync } from '../store/slices/syncSlice';
import { NoteInformation } from '../models/Note';

export interface ApplicationData {
  notes: NoteInformation[];
  categories: string[];
}

export interface SyncAction {
  type: typeof sync.type;
  payload: ApplicationData;
}
