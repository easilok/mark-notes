import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from "@codemirror/theme-one-dark";

interface NoteEditorProps {
  noteContent: string;
  onChange: (value: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = (props) => {
  const { noteContent, onChange } = props;

  return (
    <CodeMirror
      value={noteContent}
      theme='dark'
      className='editor__edit'
      extensions={[oneDark, markdown()]}
      onChange={(value, _) => {
        onChange(value);
      }}
    />
  );
}

export default NoteEditor;
