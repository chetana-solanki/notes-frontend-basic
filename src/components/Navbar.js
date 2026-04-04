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
        <nav className="bg-gradient-to-r from-accent via-pink to-secondary shadow-lg backdrop-blur-md border-b border-border/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link className="text-white font-bold text-xl tracking-tight drop-shadow-lg" to="/">📒 iNotebook</Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link className={`text-white/90 hover:text-white transition-colors font-medium ${location.pathname === "/" ? "text-white font-semibold" : ""}`} to="/">Home</Link>
                        <Link className={`text-white/90 hover:text-white transition-colors font-medium ${location.pathname === "/about" ? "text-white font-semibold" : ""}`} to="/about">About</Link>
                        {isLoggedIn && (
                            <Link className={`text-white/90 hover:text-white transition-colors font-medium ${location.pathname === "/profile" ? "text-white font-semibold" : ""}`} to="/profile">Profile</Link>
                        )}
                        {isAdmin && (
                            <Link className={`text-white/90 hover:text-white transition-colors font-medium ${location.pathname === "/admin" ? "text-white font-semibold" : ""}`} to="/admin">
                                🛡️ Admin
                            </Link>
                        )}
                    </div>
                    {isLoggedIn
                        ? <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warning to-pink-500 text-white font-bold text-sm flex items-center justify-center shadow-lg">
                                    {userName ? userName.charAt(0).toUpperCase() : '?'}
                                </div>
                                {userName && (
                                    <span className="font-semibold text-sm text-white max-w-32 truncate">
                                        {userName}
                                    </span>
                                )}
                            </div>
                            <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-medium px-4 py-2 my-2 rounded-lg transition-all duration-200 flex items-center justify-center" onClick={handleLogout}>Logout</button>
                        </div>
                        : <div className="flex space-x-2 items-center">
                            <Link className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-medium px-4 py-2 my-2 rounded-lg transition-all duration-200 flex items-center justify-center" to="/login">Login</Link>
                            <Link className="bg-white text-accent hover:bg-white/90 font-semibold px-4 py-2 my-2 rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center" to="/signup">Sign Up</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
