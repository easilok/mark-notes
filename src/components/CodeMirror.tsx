import React from "react";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { basicSetup } from "@codemirror/basic-setup";
// import { javascript } from "@codemirror/lang-javascript";
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from "@codemirror/theme-one-dark";

interface EditorProps {
  value?: string;
  theme?: string;
  className?: string;
  onUpdate?: (update: ViewUpdate) => void;
}

const CodeMirror = ({ value = "", onUpdate = undefined, className = '', ...props }: EditorProps) => {
  const editor = React.useRef(null);

  React.useEffect(() => {
    const currentEditor = editor.current as Exclude<
      typeof editor["current"],
      null
    >;
    const extensions: Extension[] = [
      basicSetup,
      oneDark,
      EditorView.lineWrapping,
      markdown()
    ];
    if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate));

    const state = EditorState.create({
      doc: value,
      extensions
    });
    const view = new EditorView({ state, parent: currentEditor });

    return () => view.destroy();
  }, [editor]);

  return <div ref={editor} className={className} />;
};

export default CodeMirror;
