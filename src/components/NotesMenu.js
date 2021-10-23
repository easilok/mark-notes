import React from 'react';

import SidePanel from '../containers/SidePanel';
import NoteItem from './NoteItem';

function NotesMenu(props) {
  const { notesList, isVisible } = props;


  if (!isVisible) {
    return null;
  }

  return (
    <SidePanel onPanelClose={props.onPanelClose} canClose>
      {notesList.map((n, i) => (
        <NoteItem key={i}
          onItemClick={props.onNoteSelected.bind(this, n.filename)}
          title={n.title}
          filename={n.filename}
        />
      ))}
    </SidePanel>
  );
};

export default NotesMenu;
