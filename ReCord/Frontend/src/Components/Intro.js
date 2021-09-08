import React from 'react'
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import '../Style/Intro.css'
import { useDispatch, useSelector } from 'react-redux';
import { sideBarToggle } from '../Redux/Action/action';

function Intro() {

    const [ ViewPointMobile, isSideBar ] = useSelector((state) =>  [state.ViewPointMobile, state.isSideBar]);
    const dispatch = useDispatch();
    let IntroIdName

    if(ViewPointMobile){
        if(isSideBar){
            IntroIdName = "intro-div-mobile-no-display"
        }
        else {
            IntroIdName = "intro-div-mobile-flex-display";
        }
    } else {
        IntroIdName = "intro-div";
    }

    function toggleSideBar(){
        dispatch(sideBarToggle());
    }


    return (
        <div id={IntroIdName}>
            <div id="intro-head">
                <IconButton onClick={toggleSideBar}>
                    <MenuIcon/>
                </IconButton>
            </div>
        </div>
    )
}
 
export default Intro
