import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import '../styles/takenote_previewer.scss';

const renderListItem = (props) => {
  if (props.checked !== null && props.checked !== undefined) {
    return (
      <React.Fragment>
        <input type="checkbox" readOnly onClick={e => e.preventDefault()} checked={props.checked} />
        {props.children}
      </React.Fragment>
    )
  }
  // otherwise default to list item
  return props.node;
}

function NotePreview(props) {

  return (
    <ReactMarkdown className="tk_previewer editor__preview"
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
      components={{
        input: renderListItem
      }}
      children={props.children}
    />
  );
}

export default NotePreview;
