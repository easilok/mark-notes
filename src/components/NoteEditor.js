import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from "@codemirror/theme-one-dark";

export default function App(props) {
  const { noteContent, onChange } = props;

  return (
    <CodeMirror
      value={noteContent}
      theme='dark'
      className='editor__edit'
      extensions={[oneDark, markdown()]}
      onChange={(value, viewUpdate) => {
        onChange(value);
      }}
    />
  );
}
