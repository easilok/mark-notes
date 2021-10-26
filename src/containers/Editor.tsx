import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import {
  saveNote, setNoteContent, deleteNote
} from '../store/slices/notesSlice';
import { tooglePreviewNote } from '../store/slices/settingsSlice';
import NotePreview from '../components/NotePreview';
import NoteEditor from '../components/NoteEditor';
import EditorActions from '../components/EditorActions';

import '../styles/editor.scss';

function Editor() {
  const noteText = useSelector(state => state.notes.noteContent);
  const editMode = useSelector(state => !state.settings.previewNote);
  const [splitPanel, setSplitPanel] = useState(false);
  const dispatch = useDispatch();

  const deleteNoteHandler = () => {
    Swal.fire({
      title: 'Delete Note',
      text: 'Are you sure you want to delete this note?',
      icon: 'warning',
      allowEnterKey: false,
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: true,
      focusConfirm: false,
    })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(deleteNote());
          Swal.fire({
            title: 'Note Deleted!',
            icon: 'success',
            toast: true,
            position: 'bottom-right',
            timer: 3000,
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
        />
      </div>
    </div>
  );
};

export default Editor;
