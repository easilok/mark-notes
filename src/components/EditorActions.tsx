import {
  Edit, Eye, Columns, Bookmark, Layers,
  Save, Trash2
} from 'react-feather';

export default function EditorActions(props) {
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
