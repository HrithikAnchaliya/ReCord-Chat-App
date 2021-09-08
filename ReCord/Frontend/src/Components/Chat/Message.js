import React from 'react'
import { useSelector } from 'react-redux';
import '../../Style/ChatBar.css';

function Message(props) {

    const user = useSelector((state) => state.Auth_state);
    return (
        <p className={`chatbar-message ${ props.message.name === user.name && 'chat-reciever'}`}>
            <span className="chatbar-user-span">{props.message.name.split(" ")[0]}</span>
                {props.message.message}
            <span className="chatbar-time">{new Date(props.message.timestamp).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })}</span> 
        </p>
    )
}


export default Message