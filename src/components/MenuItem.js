import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function MenuItem(props) {
  const { iconify } = props;
  return (
    <div className={`menu-item ${iconify ? 'iconify' : ''}`}
      onClick={props.onMenuClick}>
      <FontAwesomeIcon icon={props.icon}
      />
      {!iconify && <h4>{props.title}</h4>}
    </div>
  );
}

export default MenuItem;
