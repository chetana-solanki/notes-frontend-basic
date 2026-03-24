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
        <div className="login-page">
            <div className="login-card card">
                <div className="card-body p-4 p-sm-5">

                    {/* Logo */}
                    <div className="login-logo">📒</div>

                    {/* Heading */}
                    <h3 className="card-title text-center mb-1">Create an account</h3>
                    <p className="login-subtitle text-center mb-4">Join iNotebook — it's free</p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" name="name"
                                onChange={onChange} placeholder="Your full name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email"
                                onChange={onChange} placeholder="you@example.com" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password"
                                onChange={onChange} minLength={8} required placeholder="Min. 8 characters" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" name="cpassword"
                                onChange={onChange} minLength={8} required placeholder="Repeat your password" />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-login">
                                Create Account →
                            </button>
                        </div>
                    </form>

                    {/* Footer link */}
                    <p className="login-footer-text">
                        Already have an account?&nbsp;
                        <Link to="/login">Sign in</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Signup
