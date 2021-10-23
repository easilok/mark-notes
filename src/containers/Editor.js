import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveNote, setNoteContent, deleteNote
} from '../store/slices/notesSlice';
import NotePreview from '../components/NotePreview';
import NoteEditor from '../components/NoteEditor';
import EditorActions from '../components/EditorActions';

import '../styles/editor.css';

function Editor() {
  const noteText = useSelector(state => state.notes.noteContent);
  const [editMode, setEditMode] = useState(false);
  const [splitPanel, setSplitPanel] = useState(false);
  const dispatch = useDispatch();

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
          onEditModeChange={() => setEditMode(prevState => !prevState)}
          onSplit={() => setSplitPanel(prevState => !prevState)}
          onSave={() => dispatch(saveNote())}
          onDelete={() => dispatch(deleteNote())}
        />
      </div>
    </div>
  );
};

export default Editor;
