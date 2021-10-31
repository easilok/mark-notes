import CodeMirror from '@uiw/react-codemirror'
// import CodeMirror from './CodeMirror';
import { EditorView } from '@codemirror/view'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'

interface NoteEditorProps {
  noteContent: string
  onChange: (value: string) => void
}

const NoteEditor: React.FC<NoteEditorProps> = (props) => {
  const { noteContent, onChange } = props

  /*
  return (
    <CodeMirror
      value={noteContent}
      className='editor__edit'
      onUpdate={(update) => {
        onChange(update.state.doc.toString());
        // console.log(update.state.doc.toString());
      }}
    />
  );
  */

  return (
    <CodeMirror
      value={noteContent}
      theme="dark"
      className="editor__edit"
      extensions={[oneDark, markdown(), EditorView.lineWrapping]}
      onChange={(value, _) => {
        onChange(value)
      }}
      basicSetup
    />
  )
}

export default NoteEditor
