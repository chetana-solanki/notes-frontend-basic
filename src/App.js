import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => { setAlert(null) }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Routes>
              <Route path="/"        element={<Home showAlert={showAlert} />} />
              <Route path="/about"   element={<About />} />
              <Route path="/login"   element={<Login showAlert={showAlert} />} />
              <Route path="/signup"  element={<Signup showAlert={showAlert} />} />
              <Route path="/profile" element={<Profile showAlert={showAlert} />} />
              <Route path="/admin"   element={<AdminDashboard showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;