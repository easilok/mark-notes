import Note from './pages/Note';
import MainMenu from './components/MainMenu';

import './styles/App.scss';

function App() {

  return (
    <div className="App">
      <MainMenu />
      <Note />
    </div>
  );
}

export default App;
