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
        <div className="min-h-screen bg-gradient-to-br from-bg via-indigo/5 to-secondary/5 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-accent via-pink to-secondary bg-clip-text text-transparent mb-2">
                        🛡️ Admin Dashboard
                    </h1>
                    <p className="text-text-muted text-lg">Manage users and monitor platform statistics</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-accent to-pink-500 rounded-radius shadow-xl p-6 text-center text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-6xl mb-4 animate-bounce">👥</div>
                        <h2 className="text-4xl font-bold mb-2">{stats.totalUsers !== null ? stats.totalUsers : '…'}</h2>
                        <p className="text-white/90 text-lg font-medium">Total Users</p>
                    </div>
                    <div className="bg-gradient-to-br from-secondary to-indigo rounded-radius shadow-xl p-6 text-center text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-6xl mb-4 animate-bounce">📝</div>
                        <h2 className="text-4xl font-bold mb-2">{stats.totalNotes !== null ? stats.totalNotes : '…'}</h2>
                        <p className="text-white/90 text-lg font-medium">Total Notes</p>
                    </div>
                </div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Users Table */}
                    <div className={selectedUser ? "lg:col-span-7" : "lg:col-span-12"}>
                        <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-xl overflow-hidden">
                            <div className="p-6 border-b border-border/30">
                                <h3 className="text-2xl font-bold text-accent mb-2">👥 All Users</h3>
                                <p className="text-text-muted">Manage and monitor all platform users</p>
                            </div>
                            <div className="p-6">
                                {loading ? (
                                    <div className="flex justify-center items-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b-2 border-border/30">
                                                    <th className="text-left py-3 px-4 font-bold text-text">#</th>
                                                    <th className="text-left py-3 px-4 font-bold text-text">Name</th>
                                                    <th className="text-left py-3 px-4 font-bold text-text">Email</th>
                                                    <th className="text-left py-3 px-4 font-bold text-text">Role</th>
                                                    <th className="text-left py-3 px-4 font-bold text-text">Joined</th>
                                                    <th className="text-left py-3 px-4 font-bold text-text">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((u, idx) => (
                                                    <tr key={u._id} className={`border-b border-border/20 hover:bg-bg-surface/50 transition-colors ${selectedUser?._id === u._id ? "bg-accent/10" : ""}`}>
                                                        <td className="py-4 px-4 font-medium text-text">{idx + 1}</td>
                                                        <td className="py-4 px-4 font-medium text-text">{u.name}</td>
                                                        <td className="py-4 px-4 text-text-muted">{u.email}</td>
                                                        <td className="py-4 px-4">
                                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${u.role === 'admin' ? 'bg-gradient-to-r from-danger to-red-400 text-white' : 'bg-gradient-to-r from-secondary to-indigo text-white'}`}>
                                                                {u.role}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-4 text-text-muted">{new Date(u.date).toLocaleDateString()}</td>
                                                        <td className="py-4 px-4">
                                                            <button
                                                                className="bg-gradient-to-r from-accent to-pink text-white px-4 py-2 rounded-lg hover:from-accent-hover hover:to-pink-hover transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                                                                onClick={() => fetchSingleUser(u._id)}>
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {users.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="text-6xl mb-4">👤</div>
                                                <p className="text-text-muted text-lg">No users found.</p>
                                            </div>
                                        )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                    {/* User Detail Panel */}
                    {selectedUser && (
                        <div className="lg:col-span-5">
                            <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-xl overflow-hidden">
                                <div className="p-6 border-b border-border/30">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-accent mb-0">👤 User Details</h3>
                                        <button
                                            className="text-text-muted hover:text-danger transition-colors p-1 rounded-full hover:bg-danger/10"
                                            onClick={() => setSelectedUser(null)}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="text-center mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-accent to-pink rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
                                            👤
                                        </div>
                                        <h4 className="text-xl font-bold text-text mb-1">{selectedUser.name}</h4>
                                        <p className="text-text-muted mb-3">{selectedUser.email}</p>
                                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${selectedUser.role === 'admin' ? 'bg-gradient-to-r from-danger to-red-400 text-white' : 'bg-gradient-to-r from-secondary to-indigo text-white'} shadow-md`}>
                                            {selectedUser.role}
                                        </span>
                                    </div>
                                    <div className="border-t border-border/30 pt-4">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-text">User ID:</span>
                                                <span className="text-text-muted text-sm font-mono bg-bg-surface px-2 py-1 rounded">{selectedUser._id}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-text">Joined:</span>
                                                <span className="text-text-muted">{new Date(selectedUser.date).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
