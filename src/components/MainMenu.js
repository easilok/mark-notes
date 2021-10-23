import React, { useState, useCallback } from 'react';
import {
  faBook, faPlusCircle, faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { loadNotes, newNote, openNote } from '../store/slices/notesSlice';

import SidePanel from '../containers/SidePanel';
import NotesMenu from './NotesMenu';
import MenuItem from './MenuItem';

function MainMenu() {
  const [showNotesList, setShowNotesList] = useState(false);
  const [minimizeMenu, setMinimizeMenu] = useState(false);
  const notesList = useSelector(state => state.notes.list);
  const dispatch = useDispatch();

  const notesClickHandler = useCallback(() => {
    console.log("dispatching load notes");
    dispatch(loadNotes());
    setShowNotesList(true);
  }, [dispatch, setShowNotesList]);

  const newNoteHandler = useCallback(() => {
    dispatch(newNote());
  }, [dispatch]);

  const bookmarksClickHandler = () => {
  };

  return (
    <React.Fragment>
      <SidePanel canIconify iconify={minimizeMenu}
        onIconify={() => setMinimizeMenu(!minimizeMenu)}>
        <MenuItem onMenuClick={newNoteHandler}
          iconify={minimizeMenu}
          title="New Note" icon={faPlusCircle} />
        <MenuItem onMenuClick={notesClickHandler}
          iconify={minimizeMenu}
          title="Notes" icon={faBook} />
        <MenuItem onMenuClick={bookmarksClickHandler}
          iconify={minimizeMenu}
          title="Bookmarks" icon={faBookmark} />
      </SidePanel>
      <NotesMenu
        isVisible={showNotesList}
        notesList={notesList}
        onPanelClose={() => setShowNotesList(false)}
        onNoteSelected={(filename) => {
          setShowNotesList(false);
          dispatch(openNote(filename));
        }}
      />
    </React.Fragment>
  );
};

export default MainMenu;
