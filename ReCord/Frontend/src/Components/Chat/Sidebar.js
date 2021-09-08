import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { sideBarToggle } from '../../Redux/Action/action';
import '../../Style/sidebar.css'
import SidebarChat from './SidebarChat';
import LogoutButton from '../LogoutButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AddServerButton from '../AddServerButton';
import { socket } from './ChatBar';


function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [open, setOpen] = useState(false)
    const [ StoreData, ViewPointMobile, isSideBar ] = useSelector((state) =>  [state.Auth_state, state.ViewPointMobile, state.isSideBar]);
    const dispatch = useDispatch();
    let idName;

    if(ViewPointMobile){
        if(isSideBar){
            idName = "sidebar-div-mobile-flex-display"
        }
        else {
            idName = "sidebar-div-mobile-no-display";
        }
    } else {
        idName = "sidebar-div";
    }

    useEffect(() => {
        getRooms();
    }, [])

    useEffect(() => {
        socket.on("reUpdateRoom", () => {
            getRooms();
        })
    }, [])

    function toggleSideBar(){
        if(!ViewPointMobile){
            setOpen(true);
        }
        dispatch(sideBarToggle());
    }
    
    async function getRooms(){
        try {
            const response = await fetch('http://localhost:4000/getRooms');
            const json = await response.json();
            setRooms(json)
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleTooltipClose = () => {
        setOpen(false);
    };
    
    return (
        <div id={idName}>
            <div id="sidebar-head">
                <Avatar src={StoreData.picture}/>
                <h3 id="name-head">{StoreData.name}</h3>
                <div id="sidebar-right">
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                    <Tooltip
                        PopperProps={{
                        disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="This Toolbar is Disabled And Only Accessible In Mobile View, And This Button Is Left Here To Show-off The Tooltip"
                    >
                        <IconButton onClick={toggleSideBar}>
                            <MenuIcon/>
                        </IconButton>
                    </Tooltip>
                    </div>
                </ClickAwayListener>
                </div>
            </div>
            <div id="sidebar-users">
            {
                rooms.map((roomData, id) => <SidebarChat room={roomData} key={id}/>)
            }
            </div>
            <div id="sidebar-logout">
                <AddServerButton/><LogoutButton/>
            </div>
        </div>
    )
}

export default Sidebar
 