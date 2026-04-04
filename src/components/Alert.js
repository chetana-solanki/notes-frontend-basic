import React from 'react'

export const Alert = (props) => {
    const capitalize = (word) => {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <div style={{ minHeight: '52px' }}>
            {props.alert &&
                <div className={`px-6 py-4 rounded-xl shadow-lg mb-0 ${props.alert.type === 'success' ? 'bg-gradient-to-r from-success to-emerald-400 text-white border border-success/50' : 'bg-gradient-to-r from-danger to-red-400 text-white border border-danger/50'} animate-pulse`} role="alert">
                    <strong className="text-lg">{capitalize(props.alert.type)}: </strong> {props.alert.msg}
                </div>
            }
        </div>
    )
}
