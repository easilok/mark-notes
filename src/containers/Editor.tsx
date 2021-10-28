import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/store';

import {
  saveNote, setNoteContent, deleteNote
} from '../store/slices/notesSlice';
import { tooglePreviewNote } from '../store/slices/settingsSlice';
import NotePreview from '../components/NotePreview';
import NoteEditor from '../components/NoteEditor';
import EditorActions from '../components/EditorActions';

import { SwalConfirm, SwalToast } from '../helpers/SweetAlert';

import '../styles/editor.scss';

function Editor() {
  const noteText = useAppSelector(state => state.notes.currentNote.content);
  const editMode = useAppSelector(state => !state.settings.previewNote);
  const [splitPanel, setSplitPanel] = useState(false);
  const dispatch = useAppDispatch();

  const deleteNoteHandler = () => {
    SwalConfirm({
      title: 'Delete Note',
      text: 'Are you sure you want to delete this note?',
      icon: 'warning',
    })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(deleteNote());
          SwalToast({
            title: 'Note Deleted!',
          });
        }
      });
  };

  let editorComponent = null;
  if (splitPanel || editMode) {
    editorComponent = <NoteEditor noteContent={noteText}
      onChange={value => dispatch(setNoteContent(value))} />;
  }
  let viewerComponent = null;
  if (splitPanel || !editMode) {
    viewerComponent = <NotePreview>{noteText}</NotePreview>;
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
          onEditModeChange={() => dispatch(tooglePreviewNote())}
          onSplit={() => setSplitPanel(prevState => !prevState)}
          onSave={() => dispatch(saveNote())}
          onDelete={deleteNoteHandler}
          onFavorite={() => { }}
          onCategoryChange={() => { }}
        />
      </div>
    </div>
  );
};

export default Editor;
