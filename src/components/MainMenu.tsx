import React, { useState, useCallback } from 'react';
import {
  Book, PlusCircle, Bookmark, UploadCloud
} from 'react-feather';
// import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../hooks/store';
import {
  loadNotes, newNote, openNote, scanNotes
} from '../store/slices/notesSlice';
import { setPreviewNote } from '../store/slices/settingsSlice';

import SidePanel from '../containers/SidePanel';
import NotesMenu from './NotesMenu';
import MenuItem from './MenuItem';
import { SwalConfirm, SwalToast } from '../helpers/SweetAlert';

function MainMenu() {
  const [showNotesList, setShowNotesList] = useState(false);
  const [minimizeMenu, setMinimizeMenu] = useState(true);
  const notesList = useAppSelector(state => state.notes.notes);
  const dispatch = useAppDispatch();

  const notesClickHandler = useCallback(() => {
    console.log("dispatching load notes");
    dispatch(loadNotes());
    setShowNotesList(true);
  }, [dispatch, setShowNotesList]);

  const newNoteHandler = useCallback(() => {
    dispatch(setPreviewNote(false));
    dispatch(newNote());
  }, [dispatch]);

  const bookmarksClickHandler = () => {
  };

  const onScanFilesHandler = useCallback(() => {
    // Maybe show full sidebar
    // Dispatch load files from storate
    SwalConfirm({
      title: 'Scan lost notes',
      text: 'Are you sure you want to scan and add lost notes?',
    })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(loadNotes());
          dispatch(scanNotes());
          SwalToast({
            title: 'Scanned lost notes.',
          });
        }
      })
  }, [dispatch]);

  return (
    <React.Fragment>
      <SidePanel canIconify iconify={minimizeMenu}
        onIconify={() => setMinimizeMenu(!minimizeMenu)}
        bodyClassName="flex-1">
        <section>
          <MenuItem onMenuClick={newNoteHandler}
            iconify={minimizeMenu}
            title="New Note" icon={
              <PlusCircle />
            } />
          <MenuItem onMenuClick={notesClickHandler}
            iconify={minimizeMenu}
            title="Notes" icon={
              <Book />
            } />
          <MenuItem onMenuClick={bookmarksClickHandler}
            iconify={minimizeMenu}
            title="Bookmarks" icon={
              <Bookmark />
            } />
        </section>
        <section>
          <MenuItem onMenuClick={onScanFilesHandler}
            iconify={minimizeMenu}
            title="Notes" icon={
              <UploadCloud />
            } />
        </section>
      </SidePanel>
      <NotesMenu
        isVisible={showNotesList}
        notesList={notesList}
        onPanelClose={() => setShowNotesList(false)}
        onNoteSelected={(filename: string) => {
          console.log("Dispatched open ", filename);
          setShowNotesList(false);
          dispatch(setPreviewNote(true));
          dispatch(openNote(filename));
        }}
      />
    </React.Fragment>
  );
};

export default MainMenu;
