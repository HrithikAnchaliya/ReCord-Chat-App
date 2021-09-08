import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import SVG from 'react-inlinesvg';
import '../../Style/AddServer.css'
import Icons from './Icons';
import axios from 'axios';
import { socket } from '../Chat/ChatBar';
import { useDispatch, useSelector } from 'react-redux';
import { sideBarToggle } from '../../Redux/Action/action';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth : "auto"
      },
    },
    inputField : {
        '& > *': {
            margin: "0",
            width: '25ch',

        },
    },
    ButtonClass: {
        backgroundColor : "#4bade1",
        '&:hover' : {
            backgroundColor : "#4bade1"
        },
        '& > *': {
          margin: theme.spacing(1)
        },
        '@media (min-width: 300px) and (max-width: 700px)' : {
            width: "0%",
            height: "50%",
        },
    },
    GridClass: {
        '& > *': {
          margin: theme.spacing(1)
        },
    },
}));


function AddServer() {

    const classes = useStyles();
    const [selectedSVG, setSelectedSVG] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [ ViewPointMobile, isSideBar ] = useSelector((state) =>  [state.ViewPointMobile, state.isSideBar]);
    const dispatch = useDispatch();
    let chatIdName

    const selectSVG = (selectSVGIcon) => {
        setSelectedSVG(selectSVGIcon)
    };

    async function serverBack(){
        try {
            if(selectedSVG && selectedName) {
                let server = { selectedSVG, selectedName };
                await axios.post("http://localhost:4000/api/addserver", { server });
                socket.emit("serverAdded")
            }
        } catch(e) {
            console.error(e);
        }
    }

    if(ViewPointMobile){
        if(isSideBar){
            chatIdName = "server-div-mobile-no-display"
        }
        else {
            chatIdName = "server-div-mobile-flex-display";
        }
    } else {
        chatIdName = "add-server-div";
    }

    function toggleSideBar(){
        dispatch(sideBarToggle());
    }


    return (
        <div id={chatIdName}>
                <div id="addserver-head">
                    <IconButton onClick={toggleSideBar}>
                        <MenuIcon/>
                    </IconButton>
                    <h5 id="add-server-h5">Add Server</h5>
                    <Button className={classes.ButtonClass} onClick={serverBack} variant="contained" color="secondary">
                        ADD
                    </Button>
                </div>
                
                <div id="scroll-div">
                    <div id="add-server-row">
                        <div>
                            <p id="add-server-p">Server Name</p>
                            <div className={classes.GridClass}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <SVG src={selectedSVG} width={45} />
                                    </Grid>
                                    <Grid item>
                                        <TextField value={selectedName} autoComplete="off" onChange={(e) => setSelectedName(e.target.value)} id="input-with-icon-grid" label="Name" />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div>
                            <p id="add-server-p">Server Icon</p>
                            <Icons selectSVG={selectSVG}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}
 
export default AddServer
