import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import '../styles/panels.scss';

export default function SidePanel(props) {
  const { canIconify, iconify, canClose } = props;
  // const panelWidth = props.width || '';

  const IconifyIcon = iconify ? (
    <ArrowRightCircle className="side-panel__action"
      onClick={props.onIconify} />
  ) : (
    <ArrowLeftCircle className="side-panel__action"
      onClick={props.onIconify} />
  );

  return (
    <aside className={`
      side-panel__container ${iconify ? 'iconify' : ''} ${props.className || ""}
      `}>
      <div className={`side-panel__header ${iconify ? 'iconify' : ''}`}>
        {canClose && <ArrowLeftCircle className="side-panel__action"
          onClick={props.onPanelClose} />}
        {canIconify && IconifyIcon}
      </div>
      <div className={`
        side-panel__body ${iconify ? 'iconify' : ''} ${props.bodyClassName || ""}
        `}>
        {props.children}
      </div>
    </aside>
  );
};
