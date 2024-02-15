
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Alert from './components/Alerts';
import About from './components/About';
import Navbar from './components/Navbar'
import { Home } from './components/Home';
import NoteState  from './context/notes/NoteState';
function App() {
  const[alert,setAlert]=useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    },1500);}
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar/>
        <Alert alert={alert} />
          <Routes>

            <Route
            exact
              path="/"
              element={
                <Home  showAlert={showAlert}/>
              }
            />
           
            <Route
              path="/signup"
              element={
                <SignUp  showAlert={showAlert}/>
              }
            />
             <Route
            path="/login"
            element={
              <Login showAlert={showAlert}/>
            }
          />
          <Route
            path="/about"
            element={
              <About showAlert={showAlert}/>
            }
          />
          </Routes>
        </Router>
        </NoteState>
    </div>
  );
}

export default App;
