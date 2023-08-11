import React from 'react'

export default function Alert(props) {

    const { message, type, visibility } = props

    return (
        <div className={`alert alert-${type}`} role="alert" style={{ visibility: visibility }}>
            {message}
        </div>
    )
}
