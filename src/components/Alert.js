import React from 'react'

export const Alert = (props) => {
    const capitalize = (word) => {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <div style={{ minHeight: '52px' }}>
            {props.alert &&
                <div className={`alert alert-${props.alert.type} shadow-sm mb-0 py-2`} role="alert">
                    <strong>{capitalize(props.alert.type)}: </strong> {props.alert.msg}
                </div>
            }
        </div>
    )
}
