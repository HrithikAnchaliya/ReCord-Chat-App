import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import AppsIcon from '@material-ui/icons/Apps';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DisplayIcon from './DisplayIcon';
import axios from 'axios';
import '../../Style/Icons.css'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "transparent",
    '& > div' : {
      position: "relative",
    },
    '@media (min-width: 300px) and (max-width: 700px)' : {
      width: "130%",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  Icon : {
    '@media (min-width: 300px) and (max-width: 700px)' : {
      minWidth: "45px",
    },
  },
}));

function Icons(props) {

    const API_ID = process.env.REACT_APP_ICONS8_API;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [icons, setIcons] = useState([]);

    const handleClick = () => {
        setOpen(!open);
    };

    const selectSVG = (selectSVGIcon) => {
        props.selectSVG(selectSVGIcon)
    };

    function handleChange(e){
        setSearchValue(e.target.value);
    }

    async function searchIcons(e){
        if(e.charCode === 13){
            try{
                if(searchValue){
                    const {  data  } = await axios.get(`https://search.icons8.com/api/iconsets/v5/search?term=${searchValue}&token=${API_ID}&amount=15`);
                    setIcons(data.icons)
                }
            } catch (e) {
                console.log(e);
            }
        }
    }


  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Icons By ICONS8
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon className={classes.Icon}>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Icons" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TextField onKeyPress={searchIcons} value={searchValue} onChange={handleChange} label="Search Icon" />
        <div id="display-icons">
        {
            icons.map((icon) => (
                <DisplayIcon icon={icon} key={icon.id} handleclick={selectSVG}/>
            ))
        }
        </div>
      </Collapse>
    </List>
  );
}

export default Icons