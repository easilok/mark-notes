import React, { useState, useCallback } from 'react';
import {
  Book, PlusCircle, Bookmark, UploadCloud
} from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadNotes, newNote, openNote, scanNotes
} from '../store/slices/notesSlice';
import { setPreviewNote } from '../store/slices/settingsSlice';

import SidePanel from '../containers/SidePanel';
import NotesMenu from './NotesMenu';
import MenuItem from './MenuItem';

function MainMenu() {
  const [showNotesList, setShowNotesList] = useState(false);
  const [minimizeMenu, setMinimizeMenu] = useState(true);
  const notesList = useSelector(state => state.notes.notes);
  const dispatch = useDispatch();

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
    dispatch(loadNotes());
    dispatch(scanNotes());
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
        onNoteSelected={(filename) => {
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
