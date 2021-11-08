import { ApplicationData } from '../types';
import {
  NoteInterface,
  NoteInformation,
  // convertFilepath,
  // convertTitle,
} from '../models/Note';

interface ServerCatalogResult {
  data: {
    notes: NoteInformation[];
  };
}

interface ServerNoteActionResult {
  data: NoteInformation;
}

interface ServerNoteResult {
  data: NoteInterface;
}

export const fetchNoteInformationFromServer = (): Promise<ApplicationData> =>
  new Promise<ApplicationData>((resolve, reject) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/api/catalog`)
      .then((result) => result.json())
      .then((resData: ServerCatalogResult) => {
        const response: ApplicationData = {
          notes: [],
          favorites: [],
          categories: [],
        };
        if (resData.data && resData.data.notes) {
          response.notes = [...resData.data.notes];
          response.notes.forEach((n) => {
            if (n.favorite) {
              response.favorites.push({ ...n });
            }
          });
          resolve(response);
        } else {
          reject('Error fetching data');
        }
      })
      .catch((error) => reject(error));
  });

export const fetchNoteFromServer = (filename: string): Promise<NoteInterface> =>
  new Promise<NoteInterface>((resolve, reject) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/api/note/${filename}`)
      .then((result) => result.json())
      .then((resData: ServerNoteResult) => {
        if (resData.data && resData.data.content) {
          resolve(resData.data);
        } else {
          reject('Error fetching note');
        }
      })
      .catch((error) => reject(error));
  });

export const putNoteOnServer = (
  note: NoteInterface
): Promise<NoteInformation> =>
  new Promise<NoteInformation>((resolve, reject) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/api/note/${note.filename}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: note.content,
      }),
    })
      .then((result) => result.json())
      .then((resData: ServerNoteActionResult) => {
        if (resData.data && resData.data.filename) {
          resolve(resData.data);
        } else {
          reject('Error sending note');
        }
      })
      .catch((error) => reject(error));
  });

export const deleteNoteOnServer = (
  filename: string
): Promise<NoteInformation> =>
  new Promise<NoteInformation>((resolve, reject) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/api/note/${filename}`, {
      method: 'DELETE',
    })
      .then((result) => result.json())
      .then((resData: ServerNoteActionResult) => {
        if (resData.data && resData.data.filename) {
          resolve(resData.data);
        } else {
          reject('Error deleting note');
        }
      })
      .catch((error) => reject(error));
  });

export const toggleNoteFavoriteOnServer = (
  filename: string,
  favorite: boolean
): Promise<NoteInformation> =>
  new Promise<NoteInformation>((resolve, reject) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/api/favorites/${filename}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favorite: favorite,
      }),
    })
      .then((result) => result.json())
      .then((resData: ServerNoteActionResult) => {
        if (resData.data && resData.data.filename) {
          resolve(resData.data);
        } else {
          reject('Error favoriting note');
        }
      })
      .catch((error) => reject(error));
  });

export const scanNotesInServer = (): Promise<NoteInformation[]> =>
  new Promise<NoteInformation[]>((resolve, reject) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/api/note/scan`)
      .then((result) => result.json())
      .then((resData: ServerCatalogResult) => {
        if (resData.data && resData.data.notes) {
          resolve(resData.data.notes);
        } else {
          reject('Error scanning notes');
        }
      })
      .catch((error) => reject(error));
  });
