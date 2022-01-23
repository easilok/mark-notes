import React from 'react';

import Editor from '../containers/Editor';
import { SearchNote } from '../containers/search';
import { useAppSelector } from '../hooks/store';

import { MENU_SELECTION } from '../types';

const Note: React.FC = () => {
  const { currentMenu } = useAppSelector((state) => state.settings);

  return (
    <div className="note-page">
      <Editor />
      {currentMenu === MENU_SELECTION.SEARCH && <SearchNote />}
    </div>
  );
};

export default Note;
