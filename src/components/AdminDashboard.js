import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.user;
    } catch { return null; }
};

const AdminDashboard = (props) => {
    const host = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const navigate = useNavigate();

    const [stats, setStats] = useState({ totalUsers: null, totalNotes: null });
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = getUserFromToken();
        if (!currentUser) {
            props.showAlert("Please login to continue", "danger");
            navigate('/login');
            return;
        }
        if (currentUser.role !== 'admin') {
            props.showAlert("Access denied. Admins only.", "danger");
            navigate('/');
            return;
        }
        fetchStats();
        fetchAllUsers();
        // eslint-disable-next-line
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const [usersRes, notesRes] = await Promise.all([
                fetch(`${host}/api/auth/countusers`, { headers: { 'auth-token': token } }),
                fetch(`${host}/api/notes/countallnotes`, { headers: { 'auth-token': token } })
            ]);
            const usersJson = await usersRes.json();
            const notesJson = await notesRes.json();
            setStats({
                totalUsers: usersJson.success ? usersJson.totalUsers : '—',
                totalNotes: notesJson.success ? notesJson.totalNotes : '—'
            });
        } catch (error) {
            props.showAlert("Failed to fetch stats", "danger");
        }
    };

    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${host}/api/auth/fetchallusers`, {
                headers: { 'auth-token': token }
            });
            const json = await res.json();
            if (json.success) setUsers(json.users);
        } catch (error) {
            props.showAlert("Failed to fetch users", "danger");
        } finally {
            setLoading(false);
        }
    };

    const fetchSingleUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${host}/api/auth/getsingleuser/${id}`, {
                headers: { 'auth-token': token }
            });
            const json = await res.json();
            if (json.success) setSelectedUser(json.user);
        } catch (error) {
            props.showAlert("Failed to fetch user details", "danger");
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">🛡️ Admin Dashboard</h3>

            {/* Stats Row */}
            <div className="row g-3 mb-4">
                <div className="col-sm-6">
                    <div className="card shadow text-center py-3">
                        <div className="card-body">
                            <h2 className="text-primary mb-1">{stats.totalUsers !== null ? stats.totalUsers : '…'}</h2>
                            <p className="text-muted mb-0">👥 Total Users</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card shadow text-center py-3">
                        <div className="card-body">
                            <h2 className="text-success mb-1">{stats.totalNotes !== null ? stats.totalNotes : '…'}</h2>
                            <p className="text-muted mb-0">📝 Total Notes</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {/* Users Table */}
                <div className={selectedUser ? "col-lg-7" : "col-12"}>
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title mb-3">All Users</h5>
                            {loading ? (
                                <div className="text-center"><div className="spinner-border" role="status"></div></div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Joined</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((u, idx) => (
                                                <tr key={u._id} className={selectedUser?._id === u._id ? "table-primary" : ""}>
                                                    <td>{idx + 1}</td>
                                                    <td>{u.name}</td>
                                                    <td>{u.email}</td>
                                                    <td>
                                                        <span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-secondary'} text-capitalize`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(u.date).toLocaleDateString()}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => fetchSingleUser(u._id)}>
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {users.length === 0 && <p className="text-center text-muted mt-3">No users found.</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Single User Detail Panel */}
                {selectedUser && (
                    <div className="col-lg-5">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <h5 className="card-title mb-0">User Details</h5>
                                    <button className="btn-close" onClick={() => setSelectedUser(null)}></button>
                                </div>
                                <div className="text-center mb-3">
                                    <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-2"
                                        style={{ width: 56, height: 56, fontSize: 24 }}>
                                        👤
                                    </div>
                                    <h5 className="mb-0">{selectedUser.name}</h5>
                                    <p className="text-muted small mb-1">{selectedUser.email}</p>
                                    <span className={`badge ${selectedUser.role === 'admin' ? 'bg-danger' : 'bg-secondary'} text-capitalize`}>
                                        {selectedUser.role}
                                    </span>
                                </div>
                                <hr />
                                <ul className="list-unstyled small">
                                    <li className="mb-2"><strong>ID:</strong> <span className="text-muted">{selectedUser._id}</span></li>
                                    <li><strong>Joined:</strong> {new Date(selectedUser.date).toLocaleString()}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
