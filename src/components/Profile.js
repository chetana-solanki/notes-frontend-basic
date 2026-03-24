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
        <div className="container mt-5 text-center">
            <div className="spinner-border" style={{ color: 'var(--accent)' }} role="status"></div>
        </div>
    );

    return (
        <div className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">

                    {/* ── Hero / Identity Card ── */}
                    <div className="card shadow profile-hero-card mb-4">
                        <div className="profile-banner"></div>
                        <div className="card-body text-center pb-4 pt-0 px-4">
                            <div className="profile-avatar-wrap mb-2">
                                <div className="profile-avatar">👤</div>
                            </div>
                            <h4 className="mb-0 fw-bold" style={{ letterSpacing: '-0.3px' }}>{user?.name}</h4>
                            <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>{user?.email}</p>
                            <span className={user?.role === 'admin' ? 'role-badge-admin' : 'role-badge-user'}>
                                {user?.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                            </span>
                            <div className="mt-3 d-flex justify-content-center gap-2 flex-wrap">
                                <div className="profile-stat-chip">
                                    📝 Notes &nbsp;<strong>{noteCount !== null ? noteCount : '—'}</strong>
                                </div>
                                <div className="profile-stat-chip">
                                    📅 Joined &nbsp;<strong>{user?.date ? new Date(user.date).toLocaleDateString() : '—'}</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Update Profile Card ── */}
                    <div className="card shadow mb-4">
                        <div className="card-body p-4">
                            <div className="profile-section-header">
                                <div className="profile-section-icon">✏️</div>
                                <h5 className="profile-section-title">Update Profile</h5>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="name"
                                        value={credentials.name} onChange={onChange} minLength={3} maxLength={20} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email"
                                        value={credentials.email} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        New Password&nbsp;
                                        <span className="text-muted" style={{ fontWeight: 400 }}>(leave blank to keep current)</span>
                                    </label>
                                    <input type="password" className="form-control" id="password" name="password"
                                        value={credentials.password} onChange={onChange} placeholder="Enter new password" />
                                </div>
                                <button type="submit" className="btn btn-profile-save w-100 text-white">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ── Danger Zone Card ── */}
                    <div className="card profile-danger-card mb-4">
                        <div className="card-body p-4">
                            <div className="profile-section-header">
                                <div className="profile-section-icon">⚠️</div>
                                <h5 className="profile-section-title" style={{ color: 'var(--danger)' }}>Danger Zone</h5>
                            </div>
                            <p className="text-muted small mb-3">
                                Deleting your account will permanently remove all your notes and cannot be undone.
                            </p>
                            <button className="btn btn-danger-outline-custom w-100" onClick={handleDelete}>
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
