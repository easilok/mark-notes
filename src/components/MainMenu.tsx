import React, { useState, useCallback } from 'react';
import {
  Book, PlusCircle, Bookmark, UploadCloud
} from 'react-feather';
import { useAppSelector, useAppDispatch } from '../hooks/store';
import {
  newNote, openNote, scanNotes
} from '../store/slices/notesSlice';
import {
  setPreviewNote, toogleMenuCollapsed, setCurrentMenu
} from '../store/slices/settingsSlice';
import { MENU_SELECTION } from '../types';

import SidePanel from '../containers/SidePanel';
import NotesMenu from './NotesMenu';
import MenuItem from './MenuItem';
import { SwalConfirm, SwalToast } from '../helpers/SweetAlert';

function MainMenu() {
  const [showNotesList, setShowNotesList] = useState(false);
  const minimizeMenu = useAppSelector(state => state.settings.general.menuCollapsed);
  const currentMenu = useAppSelector(state => state.settings.currentMenu);
  const { notes, favorites } = useAppSelector(state => state.notes);
  // Dispatch group
  const dispatch = useAppDispatch();
  const _scan = useCallback(() => {
    // dispatch(loadNotes());
    dispatch(scanNotes(notes));
  }, [dispatch, notes]);

  const notesClickHandler = useCallback(() => {
    dispatch(setCurrentMenu(MENU_SELECTION.NOTES));
    setShowNotesList(true);
  }, [dispatch, setShowNotesList]);

  const newNoteHandler = useCallback(() => {
    dispatch(setPreviewNote(false));
    dispatch(newNote());
  }, [dispatch]);

  const bookmarksClickHandler = useCallback(() => {
    dispatch(setCurrentMenu(MENU_SELECTION.FAVORITES));
    setShowNotesList(true);
  }, [dispatch]);

  const onScanFilesHandler = useCallback(() => {
    // Maybe show full sidebar
    // Dispatch load files from storate
    SwalConfirm({
      title: 'Scan lost notes',
      text: 'Are you sure you want to scan and add lost notes?',
    })
      .then(result => {
        if (result.isConfirmed) {
          _scan();
          SwalToast({
            title: 'Scanned lost notes.',
          });
        }
      })
  }, [_scan]);

  let notesList = notes;

  if (currentMenu === MENU_SELECTION.FAVORITES) {
    notesList = favorites;
  }

  return (
    <React.Fragment>
      <SidePanel canIconify iconify={minimizeMenu}
        onIconify={() => dispatch(toogleMenuCollapsed())}
        bodyClassName="flex-1">
        <section>
          <MenuItem onMenuClick={newNoteHandler}
            iconify={minimizeMenu}
            active={false}
            title="New Note" icon={
              <PlusCircle />
            } />
          <MenuItem onMenuClick={notesClickHandler}
            iconify={minimizeMenu}
            active={currentMenu === MENU_SELECTION.NOTES}
            title="Notes" icon={
              <Book />
            } />
          <MenuItem onMenuClick={bookmarksClickHandler}
            iconify={minimizeMenu}
            active={currentMenu === MENU_SELECTION.FAVORITES}
            title="Bookmarks" icon={
              <Bookmark />
            } />
        </section>
        <section>
          <MenuItem onMenuClick={onScanFilesHandler}
            iconify={minimizeMenu}
            active={false}
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
