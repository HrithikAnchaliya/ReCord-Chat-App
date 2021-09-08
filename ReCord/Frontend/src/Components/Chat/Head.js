import React from 'react'
import '../../Style/ChatBar.css';

function Head(props) {
    return (
        <div id="chatbar-head-user">
            <h3>{props.name}</h3>
            <p>{new Date(props.lastSeen).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })}</p>
        </div>
    )
}


export default Head