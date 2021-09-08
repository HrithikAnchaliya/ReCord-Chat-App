import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client';
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { sideBarToggle } from '../../Redux/Action/action'
import '../../Style/ChatBar.css';
import Message from './Message';
import Head from './Head';

export const socket = io.connect(process.env.REACT_APP_URL, { transports: ['websocket'] });

function ChatBar() {

    let { RoomID } = useParams();
    const [MsgData, setMsgData] = useState([]);
    const [roomData, setRoomData] = useState("")
    const [input, setInput] = useState("");
    const [ ViewPointMobile, isSideBar, Auth_state ] = useSelector((state) =>  [state.ViewPointMobile, state.isSideBar, state.Auth_state]);
    const dispatch = useDispatch();
    let chatIdName

    const messagesEndRef = useRef(null)

    useEffect(() => {
        getRoomData();
        return () => {
            setInput("")
            socket.emit('leftRoom');
        }
         // eslint-disable-next-line
    }, [RoomID])

    useEffect(() => {
        socket.on('message', ({name, message, timestamp}) => {
            let newMessage = {name, message, timestamp};
            setMsgData(oldMessage => [...oldMessage, newMessage]);
        })
    }, [])

    async function getRoomData(){
        try {
            let id = RoomID
            let dataBody = { id }
            const values = {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(dataBody)
            }
            const response = await fetch("https://re-cord.herokuapp.com/getMessages", values)
            if(response.ok){
                const data = await response.json();
                setMsgData(data.messages);
                setRoomData(data.room)
                socket.emit('room', RoomID);
            }
        } catch(e){
            console.log(e);
        }
    };

    if(ViewPointMobile){
        if(isSideBar){
            chatIdName = "chatbar-div-mobile-no-display"
        }
        else {
            chatIdName = "chatbar-div-mobile-flex-display";
        }
    } else {
        chatIdName = "chatbar-div";
    }

    function toggleSideBar(){
        dispatch(sideBarToggle());
    }

    function sendMessage(e){
        e.preventDefault();
        let message = input
        let name = Auth_state.name
        socket.emit('SendMessage', {name, message, RoomID});
        let newMessage = {name, message, timestamp : new Date()};
        setMsgData(oldMessage => [...oldMessage, newMessage]);
        setInput('')
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(() => {
        scrollToBottom()
    }, [MsgData.length]);

    return (
        <div id={chatIdName}>
            <div id="chatbar-head">
                <IconButton onClick={toggleSideBar}>
                    <MenuIcon/>
                </IconButton>
                <Head name={roomData} lastSeen={MsgData.length !== 0 ? MsgData[MsgData.length - 1].timestamp : null}/>
            </div>
            <div id="chatbar-body">
                {
                    MsgData.map((message, id) => (
                        <Message message={message} key={id}/>
                    ))
                }
                <div ref={messagesEndRef} />
            </div>
            <div id="chatbar-footer">
                <form id="chatbar-form">
                    <input id="chatbar-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type A Message .." type="text"/>
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default ChatBar
