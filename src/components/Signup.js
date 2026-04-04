import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const host = process.env.REACT_APP_API_URL || 'http://localhost:5000'

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.authtoken) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account created successfully", "success");
            navigate("/");
        } else {
            const errMsg = json.errors?.[0]?.msg || json.errors || "Sign up failed";
            props.showAlert(errMsg, "danger");
        }
    }

    const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })

    return (
        <div className="min-h-screen bg-gradient-to-br from-bg via-secondary/10 to-indigo/10 flex items-center justify-center px-4">
            <div className="bg-bg-card/90 backdrop-blur-lg border-t-4 border-secondary rounded-radius shadow-2xl w-full max-w-md">
                <div className="p-8">

                    {/* Logo */}
                    <div className="text-7xl text-center mb-6 animate-pulse">📒</div>

                    {/* Heading */}
                    <h3 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-secondary to-indigo bg-clip-text text-transparent">Create an account</h3>
                    <p className="text-text-muted text-center mb-8 text-lg">Join iNotebook — it's free</p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-text font-semibold text-sm mb-3">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all duration-200 text-lg" id="name" name="name"
                                value={credentials.name} onChange={onChange} placeholder="Your full name" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-text font-semibold text-sm mb-3">Email address</label>
                            <input type="email" className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all duration-200 text-lg" id="email" name="email"
                                value={credentials.email} onChange={onChange} placeholder="you@example.com" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-text font-semibold text-sm mb-3">Password</label>
                            <input type="password" className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all duration-200 text-lg" id="password" name="password"
                                value={credentials.password} onChange={onChange} minLength={8} required placeholder="Min. 8 characters" />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="cpassword" className="block text-text font-semibold text-sm mb-3">Confirm Password</label>
                            <input type="password" className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all duration-200 text-lg" id="cpassword" name="cpassword"
                                value={credentials.cpassword} onChange={onChange} minLength={8} required placeholder="Repeat your password" />
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-secondary to-indigo text-white py-4 rounded-xl hover:from-cyan-500 hover:to-indigo-600 transition-all duration-200 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            Create Account →
                        </button>
                    </form>

                    {/* Footer link */}
                    <p className="text-center mt-8 text-text-muted">
                        Already have an account?&nbsp;
                        <Link to="/login" className="text-secondary hover:text-indigo font-semibold text-lg transition-colors">Sign in</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Signup
