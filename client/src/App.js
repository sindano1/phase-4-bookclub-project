import { useEffect, useContext } from "react";
import { UserContext } from "./Components/UserContext/UserContext";
import { UserProvider } from './Components/UserContext/UserContext';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Components/Home/Home';
import MyLibrary from './Components/MyLibrary/MyLibrary';
import CurrentBooks from './Components/CurrentBooks/CurrentBooks';
import PastBooks from './Components/PastBooks/PastBooks';
import BookClub from './Components/BookClub/BookClub';
import Landing from './Components/Landing/Landing';
import Login from './Components/Login/Login';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';

function App() {

  return (
    <div className="App">
      {/* The UserProvider provides us with the user state.  */}
      <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="login" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="mylibrary" element={<MyLibrary />}>
            <Route path="current-books" element={<CurrentBooks/>}/>
            <Route path="past-books" element={<PastBooks/>}/>
        </Route>
        <Route path="book-clubs" element={<BookClub />}/>
      </Routes>
      <Footer/>
      </UserProvider>
    </div>
  );
}

export default App;
