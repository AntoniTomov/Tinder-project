import React, { createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase, { auth } from '../../firebase';

import { useDispatch, useSelector } from 'react-redux'


import logo from './dinderTrans2.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: '50px',
    fontFamily: 'Nunito',
  },
  logoPaper: {
    margin: `${theme.spacing(1)}px auto`,
    background: 'rgba(255,255,255,0.3)',
    padding: '0 10px',
  },
  logo: {
    width: '100px',
  },
  appBar: {
    zIndex: '0',
    background: 'none',
    padding: `0 ${theme.spacing(3)}px`,
  },
  title: {
    fontSize: '3rem',
  },
  menu: {
    fontSize: '35px'
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    auth.signOut()
    .then(dispatch({type: 'userLoggedOut'}))
    .catch(error => console.log(error.message))
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={0} className={classes.appBar}>
        <Grid
          container
          justify='space-between'
          alignItems='center'
        >
          <Grid item xs={1}>
            <Paper className={classes.logoPaper} elevation={10}>
              <img src={logo} className={classes.logo} alt='logo'></img>
            </Paper>
          </Grid>
          <Grid>
            <MenuIcon className={classes.menu} aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenu} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to='/'>Home</MenuItem>
              {
                user.uid ?
                  <div>
                    <MenuItem component={Link} to='/matches'>Matches</MenuItem>
                    <MenuItem component={Link} to='/profile'>Profile</MenuItem>
                    <MenuItem component={Link} to='/' onClick={() => {logout()}} >Logout</MenuItem>
                  </div>
                  :
                  <div>
                    <MenuItem component={Link} to='/register'>Register</MenuItem>
                    <MenuItem component={Link} to='/login'>Login</MenuItem>
                  </div>
              }
            </Menu>
          </Grid>

        </Grid>
      </AppBar>
    </div>
  );
}