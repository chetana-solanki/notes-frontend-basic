import React from 'react'

const About = () => {
    return (
        <div className="py-8 bg-gradient-to-br from-bg via-accent/5 to-pink/5">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-accent via-pink to-secondary bg-clip-text text-transparent mb-4">About iNotebook</h1>
                <p className="text-xl text-text-muted max-w-2xl mx-auto">Your secure, cloud-based personal notebook — accessible anywhere, anytime.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
                <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-xl text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="text-6xl mb-4 group-hover:animate-bounce">☁️</div>
                    <h5 className="font-bold text-xl text-accent mb-3">Cloud Sync</h5>
                    <p className="text-text-muted text-lg">Access your notes from any device, anytime with seamless synchronization.</p>
                </div>
                <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-xl text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="text-6xl mb-4 group-hover:animate-bounce">🔒</div>
                    <h5 className="font-bold text-xl text-secondary mb-3">Secure & Private</h5>
                    <p className="text-text-muted text-lg">Protected with JWT-based authentication and end-to-end encryption.</p>
                </div>
                <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-xl text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="text-6xl mb-4 group-hover:animate-bounce">⚡</div>
                    <h5 className="font-bold text-xl text-warning mb-3">Fast & Lightweight</h5>
                    <p className="text-text-muted text-lg">Built with React and Express for lightning-fast performance.</p>
                </div>
                <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-xl text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="text-6xl mb-4 group-hover:animate-bounce">🏷️</div>
                    <h5 className="font-bold text-xl text-success mb-3">Organised by Tags</h5>
                    <p className="text-text-muted text-lg">Keep everything neatly categorised with customizable tags.</p>
                </div>
            </div>
        </div>
    )
}

export default About
