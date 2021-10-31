import { PlusCircle } from 'react-feather'

import { useAppDispatch } from '../hooks/store'
import { newNote } from '../store/slices/notesSlice'

const EmptySelection: React.FC = () => {
  // dispatch group
  const dispatch = useAppDispatch()
  const _newNote = () => dispatch(newNote())

  return (
    <div className="empty-page">
      <div className="empty-page__content">
        <h2>Welcome to your note platform</h2>
        <h4>Open a note with the side bar or create a new one!</h4>
        <button onClick={_newNote}>
          <PlusCircle /> New Note
        </button>
      </div>
    </div>
  )
}

export default EmptySelection
