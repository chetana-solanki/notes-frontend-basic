import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const { clearNotes } = useContext(noteContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        clearNotes();
        navigate("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark dark-navbar">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">📒 iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active fw-semibold" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active fw-semibold" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {localStorage.getItem('token')
                        ? <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                        : <div className="d-flex gap-2">
                            <Link className="btn btn-outline-light" to="/login">Login</Link>
                            <Link className="btn btn-accent" to="/signup">Sign Up</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
