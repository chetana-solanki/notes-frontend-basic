import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const host = process.env.REACT_APP_API_URL || 'http://localhost:5000'

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.authtoken) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in successfully", "success");
            navigate("/");
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })

    return (
        <div className="login-page">
            <div className="login-card card">
                <div className="card-body p-4 p-sm-5">

                    {/* Logo */}
                    <div className="login-logo">📒</div>

                    {/* Heading */}
                    <h3 className="card-title text-center mb-1">Welcome back</h3>
                    <p className="login-subtitle text-center mb-4">Sign in to continue to iNotebook</p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={onChange}
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={onChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-login">
                                Sign In →
                            </button>
                        </div>
                    </form>

                    {/* Footer link */}
                    <p className="login-footer-text">
                        Don't have an account?&nbsp;
                        <Link to="/signup">Create one free</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login
