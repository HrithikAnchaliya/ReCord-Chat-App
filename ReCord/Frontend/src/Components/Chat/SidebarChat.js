import React, { useEffect, useState } from 'react'
import SVG from 'react-inlinesvg';
import {Link} from 'react-router-dom';
import { socket } from './ChatBar';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import '../../Style/SidebarChat.css'
import { useDispatch } from 'react-redux';
import { sideBarToggle } from '../../Redux/Action/action';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        paddingLeft: "20px"
      },
    },
}));
  

function SidebarChat(props) {
    
    const classes = useStyles();
    const [flipIndicator, setFlipIndicator] = useState(false)
    const [lastMessage, setLastMessage] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        socket.on(`${props.room.id}-latest-message`, ({message}) => {
            setLastMessage(message)
            didWeGotTheMessage();
        })
        // eslint-disable-next-line
    },[])

    function didWeGotTheMessage(){
        const pathname = window.location.pathname;
        if(`/${props.room.id}` !== pathname){
            setFlipIndicator(true)
        }
    }

    function toggleThings(){
        setFlipIndicator(false);
        dispatch(sideBarToggle());
    }

    useEffect(() => {
        setLastMessage(props.room.lastMessage);
    }, [props.room.lastMessage])


    return (
        <Link to={`/${props.room.id}`} onClick={toggleThings} key={props.room.id}>
            <div id="sidebarChat-div">
                <SVG src={props.room.SVG} width={45} />
                <div id="sidebarChat-user">
                    <h2>{props.room.name}</h2>
                    <p  id="sidebarChat-p">{lastMessage}</p>
                </div>
                {
                    flipIndicator ? 
                    (
                        <div className={classes.root}>
                            <MailIcon />
                        </div>
                    ) : (null)
                }

            </div>
        </Link>
    )
}

export default SidebarChat
