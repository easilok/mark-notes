import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import '../styles/takenote_previewer.scss';

// interface ListItemProps {
//   checked: boolean;
//   node: any;
// }

interface NotePreviewProps {
  children: React.ReactNode;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderListItem = (props: any) => {
  if (props.checked !== null && props.checked !== undefined) {
    return (
      <React.Fragment>
        <input
          type="checkbox"
          readOnly
          onClick={(e) => e.preventDefault()}
          checked={props.checked}
        />
        {props.children}
      </React.Fragment>
    );
  }

  // otherwise default to list item
  return props.node;
};

const NotePreview: React.FC<NotePreviewProps> = (props) => {
  return (
    <ReactMarkdown
      className="tk_previewer editor__preview"
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
      components={{
        input: renderListItem,
      }}
    >
      {props.children as string}
    </ReactMarkdown>
  );
};

export default NotePreview;
