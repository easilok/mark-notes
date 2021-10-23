import '../styles/menu-item.css';

function NoteItem(props) {
  return (
    <div className="note-item" onClick={props.onItemClick}>
      <div className="note-item__info">
        <h4>{props.title}</h4>
        <h5>{props.filename}</h5>
      </div>
      <button className="note-item__action">...</button>
    </div>
  );
};

export default NoteItem;
