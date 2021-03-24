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

import logo from './dinderTrans2.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: '100px',
    fontFamily: 'Nunito',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black',
    fontSize: '2rem',
    fontWeight: '800',
  },
  appbar: {
    background: 'none',
  },
  logoPaper:{
    background: 'rgba(255,255,255,0.3)',
    padding: '0 10px',
  },
  logo: {
    flexGrow: 1,
    width: '100px',
  }
}));

export default function MenuAppBar({ login, user }) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Paper className={classes.logoPaper} elevation={10}>
            <img src={logo} className={classes.logo} alt='logo'></img>
          </Paper>
          <Typography variant="h4" className={classes.title}>
            DINDER!
          </Typography>
          <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenu}>
          </MenuIcon>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to='/home'>Home</MenuItem>
            {
              user ?
                <div>
                  <MenuItem component={Link} to='/matches'>Kotenca</MenuItem>
                  <MenuItem component={Link} to='/profile'>Profile</MenuItem>
                </div>
                :
                <div>
                  <MenuItem component={Link} to='/register'>Register</MenuItem>
                  <MenuItem component={Link} to='/login'>Login</MenuItem>
                </div>
            }

            {/* <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Menu>
            
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}