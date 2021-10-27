import React from 'react';

import { NoteInformation } from '../models/NoteInformation';

import SidePanel from '../containers/SidePanel';
import NoteItem from './NoteItem';

interface NotesMenuProps {
  notesList: NoteInformation[];
  isVisible: boolean;
  onPanelClose: () => void;
  onNoteSelected: (filename: string) => void;

};

const NotesMenu: React.FC<NotesMenuProps> = (props) => {
  const { notesList, isVisible } = props;


  if (!isVisible) {
    return null;
  }

  return (
    <SidePanel onPanelClose={props.onPanelClose} canClose
      bodyClassName="scroll-y">
      <section className="note-section">
        {notesList.map((n, i) => (
          <NoteItem key={i}
            onItemClick={props.onNoteSelected.bind(this, n.filename)}
            title={n.title}
            filename={n.filename}
          />
        ))}
      </section>
    </SidePanel>
  );
};

export default NotesMenu;
