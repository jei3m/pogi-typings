import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Chat from './components/Chat';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route index element={<Chat/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/about" element={<About/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
