import React from 'react';
import { Edit, Eye, Columns, Bookmark, Layers, Trash2 } from 'react-feather';

import TimeAgo from '../components/TimeAgo';

interface EditorActionsProps {
  editMode: boolean;
  favorite?: boolean;
  lastSync: string;
  onSplit: () => void;
  onFavorite: () => void;
  onCategoryChange: () => void;
  onEditModeChange: () => void;
  onSave: () => void;
  onDelete: () => void;
  onSync: () => void;
}

const EditorActions: React.FC<EditorActionsProps> = (props) => {
  const { editMode } = props;
  const favorite = props.favorite || false;

  const EditModeIcon = editMode ? (
    <Eye onClick={props.onEditModeChange} />
  ) : (
    <Edit onClick={props.onEditModeChange} />
  );

  return (
    <div className="editor-actions">
      <section>
        {EditModeIcon}
        <Columns onClick={props.onSplit} />
        <Bookmark
          onClick={props.onFavorite}
          className={favorite ? 'active' : ''}
        />
        <Layers onClick={props.onCategoryChange} />
      </section>
      <section>
        <TimeAgo
          interval={5000}
          timeReference={props.lastSync}
          onClick={props.onSync}
        />
        {/*
        <span onClick={props.onSync}>{props.lastSync}</span>
        */}
        {/*
        <Save onClick={props.onSave} />
        */}
        <Trash2 onClick={props.onDelete} />
      </section>
    </div>
  );
};

export default EditorActions;
