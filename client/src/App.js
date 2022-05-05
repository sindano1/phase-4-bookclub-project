import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Components/Home/Home';
import ReadingList from './Components/ReadingList/ReadingList';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="reading-list" element={<ReadingList />}/>
      </Routes>
    </div>
  );
}

export default App;
