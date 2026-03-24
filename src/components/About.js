import React from 'react'

const About = () => {
    return (
        <div className="py-4">
            <div className="text-center mb-5">
                <h1 className="display-5 fw-bold">About iNotebook</h1>
                <p className="lead text-muted">Your secure, cloud-based personal notebook — accessible anywhere.</p>
            </div>
            <div className="row g-4">
                <div className="col-sm-6 col-lg-3">
                    <div className="card h-100 text-center shadow-sm">
                        <div className="card-body py-4">
                            <div className="feature-icon">☁️</div>
                            <h5 className="card-title">Cloud Sync</h5>
                            <p className="card-text">Access your notes from any device, anytime.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="card h-100 text-center shadow-sm">
                        <div className="card-body py-4">
                            <div className="feature-icon">🔒</div>
                            <h5 className="card-title">Secure & Private</h5>
                            <p className="card-text">Protected with JWT-based authentication.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="card h-100 text-center shadow-sm">
                        <div className="card-body py-4">
                            <div className="feature-icon">⚡</div>
                            <h5 className="card-title">Fast & Lightweight</h5>
                            <p className="card-text">Built with React and Express for speed.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="card h-100 text-center shadow-sm">
                        <div className="card-body py-4">
                            <div className="feature-icon">🏷️</div>
                            <h5 className="card-title">Organised by Tags</h5>
                            <p className="card-text">Keep everything neatly categorised.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
