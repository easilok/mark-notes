import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faEdit, faColumns, faSave, faDumpster,
  faBookmark, faLayerGroup
} from '@fortawesome/free-solid-svg-icons';

export default function EditorActions(props) {
  const { editMode } = props;

  const editModeIcon = editMode ? faEye : faEdit;

  return (
    <div className="editor-actions">
      <section>
        <FontAwesomeIcon icon={editModeIcon}
          onClick={props.onEditModeChange}
        />
        <FontAwesomeIcon icon={faColumns}
          onClick={props.onSplit}
        />
        <FontAwesomeIcon icon={faBookmark}
          onClick={props.onFavorite}
        />
        <FontAwesomeIcon icon={faLayerGroup}
          onClick={props.onCategoryChange}
        />
      </section>
      <section>
        <FontAwesomeIcon icon={faSave}
          onClick={props.onSave}
        />
        <FontAwesomeIcon icon={faDumpster}
          onClick={props.onDelete}
        />
      </section>
    </div>
  );
};
