import './styles/App.css'
import Home from './home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Admin } from './contextApi';
import ChatPage from './chatPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Admin>
        <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/chat' element={<ChatPage/>}/>
      </Routes>
        </Admin>
    </div>
    </Router>
  );
}

export default App;
