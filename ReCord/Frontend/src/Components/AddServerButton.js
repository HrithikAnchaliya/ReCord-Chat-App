import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sideBarToggle } from '../Redux/Action/action';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        flex : "0.5"
      },
    },
  }));


function AddServerButton() {

  const classes = useStyles();
  const dispatch = useDispatch();

    return (
        <Link to='/addserver' onClick={() => dispatch(sideBarToggle())}>
          <div className={classes.root}>
              <Button color="primary">
                  ADD SERVER
              </Button>
          </div>
        </Link>
    )
}

export default AddServerButton