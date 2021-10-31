import React, { useState, useCallback, useRef } from 'react';
import {
  Book,
  PlusCircle,
  Bookmark,
  Upload,
  Database,
  Tool,
  Download,
} from 'react-feather';
import { useAppSelector, useAppDispatch } from '../hooks/store';
import {
  newNote,
  openNote,
  scanNotes,
  importNote,
} from '../store/slices/notesSlice';
import {
  setPreviewNote,
  toogleMenuCollapsed,
  setCurrentMenu,
} from '../store/slices/settingsSlice';
import { MENU_SELECTION } from '../types';

import SidePanel from '../containers/SidePanel';
import NotesMenu from './NotesMenu';
import MenuItem from './MenuItem';
import { SwalConfirm, SwalToast } from '../helpers/SweetAlert';

import {
  downloadNote,
  importNote as browserImportNote
} from '../helpers/browserFileHandling';

const MainMenu: React.FC = () => {
  const [showNotesList, setShowNotesList] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const minimizeMenu = useAppSelector(
    (state) => state.settings.general.menuCollapsed
  );
  const currentMenu = useAppSelector((state) => state.settings.currentMenu);
  const { notes, favorites, currentNote } = useAppSelector((state) => state.notes);
  const hasNoteLoaded = currentNote.filename.length > 0;
  // Dispatch group
  const dispatch = useAppDispatch();
  const _scan = useCallback(() => {
    // dispatch(loadNotes());
    dispatch(scanNotes(notes));
  }, [dispatch, notes]);
  const _importNote = (filename: string, content: string) =>
    dispatch(importNote({ filename, content }));
  const _downloadNote = () =>
    downloadNote(currentNote.filename, currentNote.content);

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
    }).then((result) => {
      if (result.isConfirmed) {
        _scan();
        SwalToast({
          title: 'Scanned lost notes.',
        });
      }
    });
  }, [_scan]);

  const onImportHandler = useCallback(() => {
    // const fileInputEl = document.querySelector("#file-input") as HTMLInputElement;
    // if (fileInputEl) {
    //   fileInputEl.click();
    // }
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, [fileInput]);

  const onFileImportHandler = useCallback(() => {
    if (fileInput.current && fileInput.current.files) {
      browserImportNote(fileInput.current.files, (filename, e) => {
        if (e.target) {
          _importNote(filename, e.target.result as string);
        }
      });
    }
  }, [fileInput]);

  let notesList = notes;

  if (currentMenu === MENU_SELECTION.FAVORITES) {
    notesList = favorites;
  }

  return (
    <React.Fragment>
      <SidePanel
        canIconify
        iconify={minimizeMenu}
        onIconify={() => dispatch(toogleMenuCollapsed())}
        bodyClassName="flex-1"
      >
        <section>
          <MenuItem
            onMenuClick={newNoteHandler}
            iconify={minimizeMenu}
            active={false}
            title="New Note"
            icon={<PlusCircle />}
          />
          <MenuItem
            onMenuClick={notesClickHandler}
            iconify={minimizeMenu}
            active={currentMenu === MENU_SELECTION.NOTES}
            title="Notes"
            icon={<Book />}
          />
          <MenuItem
            onMenuClick={bookmarksClickHandler}
            iconify={minimizeMenu}
            active={currentMenu === MENU_SELECTION.FAVORITES}
            title="Bookmarks"
            icon={<Bookmark />}
          />
        </section>
        <section>
          {showTools && hasNoteLoaded && (
            <MenuItem
              onMenuClick={_downloadNote}
              iconify={minimizeMenu}
              active={false}
              title="Export"
              icon={<Download />}
            />
          )}
          {showTools && (
            <MenuItem
              onMenuClick={onImportHandler}
              iconify={minimizeMenu}
              active={false}
              title="Import"
              icon={<Upload />}
            />
          )}
          {showTools && (
            <MenuItem
              onMenuClick={onScanFilesHandler}
              iconify={minimizeMenu}
              active={false}
              title="Scan"
              icon={<Database />}
            />
          )}
          <MenuItem
            onMenuClick={() => setShowTools(!showTools)}
            iconify={minimizeMenu}
            active={showTools}
            title="Tools"
            icon={<Tool />}
          />
          <input
            type="file"
            id="file-input"
            ref={fileInput}
            accept="text/plain"
            style={{ display: 'none' }}
            onChange={onFileImportHandler}
          />
        </section>
      </SidePanel>
      <NotesMenu
        isVisible={showNotesList}
        notesList={notesList}
        onPanelClose={() => setShowNotesList(false)}
        onNoteSelected={(filename: string) => {
          setShowNotesList(false);
          dispatch(setPreviewNote(true));
          dispatch(openNote(filename));
        }}
      />
    </React.Fragment>
  );
};

export default MainMenu;
