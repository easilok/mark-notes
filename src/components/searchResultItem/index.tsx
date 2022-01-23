import React, { useCallback } from 'react';
import { openNote } from '../../store/slices/notesSlice';
import {
  setCurrentMenu,
  setPreviewNote,
} from '../../store/slices/settingsSlice';
import { useAppDispatch } from '../../hooks/store';

import { MENU_SELECTION } from '../../types';

import './searchResultItem.scss';

interface SearchResultItemProps {
  title: string;
  filename: string;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  title,
  filename,
}) => {
  const dispatch = useAppDispatch();
  const _openNote = useCallback(() => {
    dispatch(setPreviewNote(true));
    dispatch(openNote(filename));
    dispatch(setCurrentMenu(MENU_SELECTION.NONE));
  }, [dispatch, openNote, filename]);

  return (
    <div onClick={_openNote} className="search-note__item">
      <span>{title}</span>
    </div>
  );
};
