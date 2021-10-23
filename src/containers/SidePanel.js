import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/panels.css';

export default function SidePanel(props) {
  const { canIconify, iconify, canClose } = props;
  // const panelWidth = props.width || '';

  const IconifyIcon = iconify ? faArrowCircleRight : faArrowCircleLeft;

  return (
    <aside className={`side-panel__container ${iconify ? 'iconify' : ''}`}>
      <div className={`side-panel__header ${iconify ? 'iconify' : ''}`}>
        {canClose && <FontAwesomeIcon className="side-panel__action"
          onClick={props.onPanelClose} icon={faArrowCircleLeft} />}
        {canIconify && <FontAwesomeIcon className="side-panel__action"
          onClick={props.onIconify} icon={IconifyIcon} />}
      </div>
      {props.children}
    </aside>
  );
};
