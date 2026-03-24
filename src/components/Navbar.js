import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';

// Decode JWT to get user info (id, role) without external libraries
const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.user;
    } catch {
        return null;
    }
};

const host = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearNotes } = useContext(noteContext);

    const isLoggedIn = !!localStorage.getItem('token');
    const currentUser = isLoggedIn ? getUserFromToken() : null;
    const isAdmin = currentUser?.role === 'admin';

    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (!isLoggedIn) { setUserName(''); return; }
        fetch(`${host}/api/auth/getuser`, {
            headers: { 'auth-token': localStorage.getItem('token') }
        })
            .then(res => res.json())
            .then(data => { if (data.name) setUserName(data.name); })
            .catch(() => {});
    // eslint-disable-next-line
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserName('');
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
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/profile" ? "active fw-semibold" : ""}`} to="/profile">Profile</Link>
                            </li>
                        )}
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin" ? "active fw-semibold" : ""}`} to="/admin">
                                    🛡️ Admin
                                </Link>
                            </li>
                        )}
                    </ul>
                    {isLoggedIn
                        ? <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-2">
                                <div className="navbar-avatar">
                                    {userName ? userName.charAt(0).toUpperCase() : '?'}
                                </div>
                                {userName && (
                                    <span className="navbar-username">
                                        {userName}
                                    </span>
                                )}
                            </div>
                            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                        </div>
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
