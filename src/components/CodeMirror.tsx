import React from "react";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "@codemirror/basic-setup";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";

const languageConf = new Compartment();

const CodeMirror = ({ value = '', onUpdate = undefined }) => {
  const editor = React.useRef(null);

  React.useEffect(() => {
    const currentEditor = editor.current;

    // const extensions = [basicSetup, oneDark, javascript()];
    const extensions = [basicSetup, oneDark, languageConf.of(markdown())];
    if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate));

    console.log(value);

    const state = EditorState.create({
      doc: value,
      // doc: 'console.log("hello")',
      extensions
    });
    if (currentEditor != null) {
      const view = new EditorView({ state, parent: currentEditor });
      return () => view.destroy();
    }

  }, [editor, onUpdate, value]);

  return <div ref={editor} />;
};

export default CodeMirror;
