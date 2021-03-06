import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { auth } from '../../firebase';

import { useDispatch, useSelector } from 'react-redux'


import logo from './DINDER-LOGO.png'

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
    minWidth: '120px',
  },
  logo: {
    width: '100px',
  },
  appBar: {
    zIndex: '1',
    background: 'none',
    padding: `0 ${theme.spacing(3)}px`,
    marginTop: 10,
  },
  title: {
    fontSize: '3rem',
  },
  menuIcon: {
    fontSize: '35px',
  },
  '& ul': {
    padding: '40 !important',
  },
  linkMenuItem: {
    textDecoration: 'none !important',
    '&:focus':{
      outline: 'none !important',
    }
  },
  menu: {
    '& div ul.MuiList-padding': {
    }
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
    .then(() => {
      dispatch({type: 'userLoggedOut'});
      dispatch({type: 'resetAllUsers'});
    })
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
              <img src={logo} className={classes.logo} alt='logo'></img>
          </Grid>
          <Grid>
            <MenuIcon className={classes.menuIcon} aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenu} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.menu}
            >
              <MenuItem component={Link} className={classes.linkMenuItem} to='/'>Home</MenuItem>
              {
                user.uid ?
                  <div>
                    <MenuItem component={Link} className={classes.linkMenuItem} to='/matches'>Matches</MenuItem>
                    <MenuItem component={Link} className={classes.linkMenuItem} to='/profile'>Profile</MenuItem>
                    <MenuItem component={Link} className={classes.linkMenuItem} to='/' onClick={() => {logout()}} >Logout</MenuItem>
                  </div>
                  :
                  <div>
                    <MenuItem component={Link} className={classes.linkMenuItem} to='/register'>Register</MenuItem>
                    <MenuItem component={Link} className={classes.linkMenuItem} to='/login'>Login</MenuItem>
                  </div>
              }
            </Menu>
          </Grid>

        </Grid>
      </AppBar>
    </div>
  );
}