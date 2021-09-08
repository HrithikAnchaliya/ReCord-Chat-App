import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Remove_User } from '../Redux/Action/action';
import { useDispatch } from 'react-redux';
import { DeSerialize } from './Functions/functions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        flex : "0.5"
      },
    },
  }));


function LogoutButton() {

  const dispatch = useDispatch();

  const logOut = () => {
    DeSerialize();
    dispatch(Remove_User());
  }

  const classes = useStyles();

    return (
        <Link to='/'>
          <div className={classes.root}>
              <Button color="secondary" onClick={logOut}>
                  LOGOUT
              </Button>
          </div>
        </Link>
    )
}

export default LogoutButton
