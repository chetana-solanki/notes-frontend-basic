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
        <div className="min-h-screen bg-gradient-to-br from-bg via-accent/10 to-pink/10 flex items-center justify-center px-4">
            <div className="bg-bg-card/90 backdrop-blur-lg border-t-4 border-accent rounded-radius shadow-2xl w-full max-w-md">
                <div className="p-8">

                    {/* Logo */}
                    <div className="text-7xl text-center mb-6 animate-pulse">📒</div>

                    {/* Heading */}
                    <h3 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-accent to-pink bg-clip-text text-transparent">Welcome back</h3>
                    <p className="text-text-muted text-center mb-8 text-lg">Sign in to continue to iNotebook</p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-text font-semibold text-sm mb-3">Email address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-secondary focus:ring-4 focus:ring-secondary/20 outline-none transition-all duration-200 text-lg"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={onChange}
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="password" className="block text-text font-semibold text-sm mb-3">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-secondary focus:ring-4 focus:ring-secondary/20 outline-none transition-all duration-200 text-lg"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={onChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-accent to-pink text-white py-4 rounded-xl hover:from-accent-hover hover:to-pink-hover transition-all duration-200 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            Sign In →
                        </button>
                    </form>

                    {/* Footer link */}
                    <p className="text-center mt-8 text-text-muted">
                        Don't have an account?&nbsp;
                        <Link to="/signup" className="text-accent hover:text-pink font-semibold text-lg transition-colors">Create one free</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login
