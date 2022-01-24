import React, { useState } from 'react';

import { SearchResultItem } from '../../components/searchResultItem';

import './searchNote.scss';
import '../../styles/forms.scss';
import { useAppSelector } from '../../hooks/store';
import { NoteInformation } from '../../models/Note';

export const SearchNote: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const { notes } = useAppSelector((state) => state.notes);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);

    // console.log(event.target.value);
  };

  let matchSearchNotes: NoteInformation[] = [];

  if (searchText.length > 2) {
    matchSearchNotes = notes.filter((note) =>
      note.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }

  return (
    <div className="search-note__container">
      <div className="search-note__content">
        <input
          className="input"
          type="text"
          placeholder="Enter text to search note title"
          value={searchText}
          onChange={inputChangeHandler}
          autoFocus={true}
        />
        {matchSearchNotes.length > 0 && (
          <div className="search-note__results">
            {matchSearchNotes.map((note) => (
              <SearchResultItem
                key={note.filename}
                filename={note.filename}
                title={note.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
