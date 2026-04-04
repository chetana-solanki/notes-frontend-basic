import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {
    const host = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [noteCount, setNoteCount] = useState(null);
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(true);

    const authToken = localStorage.getItem('token');

    useEffect(() => {
        if (!authToken) {
            props.showAlert("Please login to continue", "danger");
            navigate('/login');
            return;
        }
        fetchUser();
        fetchNoteCount();
        // eslint-disable-next-line
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch(`${host}/api/auth/getuser`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'auth-token': authToken }
            });
            const json = await res.json();
            setUser(json);
            setCredentials({ name: json.name, email: json.email, password: '' });
        } catch (error) {
            props.showAlert("Failed to fetch user details", "danger");
        } finally {
            setLoading(false);
        }
    };

    const fetchNoteCount = async () => {
        try {
            const res = await fetch(`${host}/api/notes/countnotes`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'auth-token': authToken }
            });
            const json = await res.json();
            if (json.success) setNoteCount(json.totalNotes);
        } catch (error) {
            console.error("Could not fetch note count");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const body = {};
            if (credentials.name) body.name = credentials.name;
            if (credentials.email) body.email = credentials.email;
            if (credentials.password) body.password = credentials.password;

            const res = await fetch(`${host}/api/auth/updateuser/${user._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'auth-token': authToken },
                body: JSON.stringify(body)
            });
            const json = await res.json();
            if (res.ok) {
                setUser(json.user);
                props.showAlert("Profile updated successfully", "success");
            } else {
                const errMsg = json.errors?.[0]?.msg || json.errors || "Update failed";
                props.showAlert(errMsg, "danger");
            }
        } catch (error) {
            props.showAlert("Internal Server Error", "danger");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
        try {
            const res = await fetch(`${host}/api/auth/deleteuser/${user._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'auth-token': authToken }
            });
            if (res.ok) {
                localStorage.removeItem('token');
                props.showAlert("Account deleted successfully", "success");
                navigate('/login');
            } else {
                props.showAlert("Could not delete account", "danger");
            }
        } catch (error) {
            props.showAlert("Internal Server Error", "danger");
        }
    };

    const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    if (loading) return (
        <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto mt-4 mb-5 px-4">
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">

                    {/* ── Hero / Identity Card ── */}
                    <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-2xl mb-6">
                        <div className="bg-gradient-to-r from-accent via-pink to-secondary h-24 rounded-t-radius"></div>
                        <div className="text-center pb-6 pt-0 px-6 -mt-12">
                            <div className="inline-block mb-4">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-warning to-pink-500 text-white text-3xl flex items-center justify-center shadow-2xl animate-pulse">👤</div>
                            </div>
                            <h4 className="font-bold text-2xl text-text mb-1 tracking-tight">{user?.name}</h4>
                            <p className="text-text-muted text-lg mb-3">{user?.email}</p>
                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold shadow-lg ${user?.role === 'admin' ? 'bg-gradient-to-r from-danger to-red-400 text-white' : 'bg-gradient-to-r from-secondary to-indigo text-white'}`}>
                                {user?.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                            </span>
                            <div className="mt-6 flex justify-center gap-4 flex-wrap">
                                <div className="bg-gradient-to-r from-accent to-pink text-white px-4 py-2 rounded-xl text-sm shadow-lg">
                                    📝 Notes <strong className="text-lg">{noteCount !== null ? noteCount : '—'}</strong>
                                </div>
                                <div className="bg-gradient-to-r from-secondary to-indigo text-white px-4 py-2 rounded-xl text-sm shadow-lg">
                                    📅 Joined <strong className="text-lg">{user?.date ? new Date(user.date).toLocaleDateString() : '—'}</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Update Profile Card ── */}
                    <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-2xl mb-6">
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <div className="text-3xl mr-3 animate-bounce">✏️</div>
                                <h5 className="font-bold text-xl text-accent">Update Profile</h5>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-text font-semibold text-sm mb-3">Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-secondary focus:ring-4 focus:ring-secondary/20 outline-none transition-all duration-200" id="name" name="name"
                                        value={credentials.name} onChange={onChange} minLength={3} maxLength={20} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-text font-semibold text-sm mb-3">Email</label>
                                    <input type="email" className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-secondary focus:ring-4 focus:ring-secondary/20 outline-none transition-all duration-200" id="email" name="email"
                                        value={credentials.email} onChange={onChange} />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password" className="block text-text font-semibold text-sm mb-3">
                                        New Password&nbsp;
                                        <span className="text-text-muted font-normal">(leave blank to keep current)</span>
                                    </label>
                                    <input type="password" className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-secondary focus:ring-4 focus:ring-secondary/20 outline-none transition-all duration-200" id="password" name="password"
                                        value={credentials.password} onChange={onChange} placeholder="Enter new password" />
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-accent to-pink text-white py-4 rounded-xl hover:from-accent-hover hover:to-pink-hover transition-all duration-200 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ── Danger Zone Card ── */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-danger/30 rounded-radius shadow-2xl mb-6">
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <div className="text-3xl mr-3 animate-pulse">⚠️</div>
                                <h5 className="font-bold text-xl text-danger">Danger Zone</h5>
                            </div>
                            <p className="text-text-muted text-lg mb-6">
                                Deleting your account will permanently remove all your notes and cannot be undone.
                            </p>
                            <button className="w-full bg-gradient-to-r from-danger to-red-400 text-white py-4 rounded-xl hover:from-danger-hover hover:to-red-500 transition-all duration-200 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1" onClick={handleDelete}>
                                🗑️ Delete My Account
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
