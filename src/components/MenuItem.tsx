function MenuItem(props) {
  const { iconify } = props;
  return (
    <div className={`menu-item ${iconify ? 'iconify' : ''}`}
      onClick={props.onMenuClick}>
      {props.icon}
      {!iconify && <h4>{props.title}</h4>}
    </div>
  );
}

export default MenuItem;
