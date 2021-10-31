import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/store';

import {
  saveNote,
  setNoteContent,
  deleteNote,
  toggleFavorite,
} from '../store/slices/notesSlice';
import { tooglePreviewNote } from '../store/slices/settingsSlice';
import { sync } from '../store/slices/syncSlice';
import NotePreview from '../components/NotePreview';
import NoteEditor from '../components/NoteEditor';
import EditorActions from '../components/EditorActions';

import { SwalConfirm, SwalToast } from '../helpers/SweetAlert';
import { downloadNote } from '../helpers/browserFileHandling';

import '../styles/editor.scss';

const Editor: React.FC = () => {
  // const noteText = useAppSelector(state => state.notes.currentNote.content);
  const editMode = useAppSelector((state) => !state.settings.previewNote);
  const { notes, categories, currentNote, pendingSync, isFavorite } =
    useAppSelector((state) => state.notes);
  const lastSync = useAppSelector((state) => state.sync.lastSync);
  const [splitPanel, setSplitPanel] = useState(false);

  // dispatch function group
  const dispatch = useAppDispatch();

  const _sync = () =>
    dispatch(
      sync({
        notesData: { notes, categories },
        currentNote,
        pendingSync,
      })
    );
  const _saveNote = () => dispatch(saveNote());
  const _deleteNote = () => dispatch(deleteNote(currentNote.filename));
  const _togglePreview = () => dispatch(tooglePreviewNote());
  const _setNoteContent = (value: string) => dispatch(setNoteContent(value));
  const _toogleFavorite = () => dispatch(toggleFavorite());
  const _downloadNote = () => downloadNote(currentNote.filename, currentNote.content);

  const deleteNoteHandler = () => {
    SwalConfirm({
      title: 'Delete Note',
      text: 'Are you sure you want to delete this note?',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        _deleteNote();
        SwalToast({
          title: 'Note Deleted!',
        });
      }
    });
  };

  let editorComponent = null;
  if (splitPanel || editMode) {
    editorComponent = (
      <NoteEditor
        noteContent={currentNote.content}
        onChange={(value) => _setNoteContent(value)}
      />
    );
  }
  let viewerComponent = null;
  if (splitPanel || !editMode) {
    viewerComponent = <NotePreview>{currentNote.content}</NotePreview>;
  }

  return (
    <div className="editor__container tk_dark">
      <div className="editor__split-panel splitted">
        {editorComponent}
        {viewerComponent}
      </div>
      <div className="editor-actions__container">
        <EditorActions
          editMode={editMode}
          favorite={isFavorite}
          lastSync={lastSync}
          onEditModeChange={_togglePreview}
          onSplit={() => setSplitPanel((prevState) => !prevState)}
          onSave={_saveNote}
          onDelete={deleteNoteHandler}
          onSync={_sync}
          onFavorite={_toogleFavorite}
          onDownload={_downloadNote}
          onCategoryChange={() => { }} // eslint-disable-line @typescript-eslint/no-empty-function
        />
      </div>
    </div>
  );
}

export default Editor;
