import React from 'react';
import { PlusCircle } from 'react-feather';
import { SearchNote } from '../containers/search';

import { useAppDispatch, useAppSelector } from '../hooks/store';
import { newNote } from '../store/slices/notesSlice';
import { MENU_SELECTION } from '../types';

const EmptySelection: React.FC = () => {
  const { currentMenu } = useAppSelector((state) => state.settings);
  // dispatch group
  const dispatch = useAppDispatch();
  const _newNote = () => dispatch(newNote());

  return (
    <div className="empty-page">
      <div className="empty-page__content">
        <h2>Welcome to your note platform</h2>
        <h4>Open a note with the side bar or create a new one!</h4>
        <button onClick={_newNote}>
          <PlusCircle /> New Note
        </button>
      </div>
      {currentMenu === MENU_SELECTION.SEARCH && <SearchNote />}
    </div>
  );
};

export default EmptySelection;
