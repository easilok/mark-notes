import {
  Edit, Eye, Columns, Bookmark, Layers,
  Save, Trash2
} from 'react-feather';

interface EditorActionsProps {
  editMode: boolean;
  onSplit: () => void;
  onFavorite: () => void;
  onCategoryChange: () => void;
  onEditModeChange: () => void;
  onSave: () => void;
  onDelete: () => void;
};

export default function EditorActions(props: EditorActionsProps) {
  const { editMode } = props;

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
        <Bookmark onClick={props.onFavorite} />
        <Layers onClick={props.onCategoryChange} />
      </section>
      <section>
        <Save onClick={props.onSave} />
        <Trash2 onClick={props.onDelete} />
      </section>
    </div>
  );
};
