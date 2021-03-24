import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';


import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import logo from '../menuAppBar/dinderTrans2.png'

const profile = {
    name: 'PeshoPi4a',
    age: 19,
    email: 'pesho@abv.bg',
    url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg',
    more: {
        description: 'Az sum Mega Pi4!1!',
        socialNetwork: 'IG:peshoPi4a',
        location: 'Sofeto',
        hobbies: 'skiing'
    },
    infoField: '',
};

const useStyles = makeStyles((theme) => ({
    logoPaper: {
        margin: `${theme.spacing(1)}px auto`,
        background: 'rgba(255,255,255,0.3)',
        padding: '0 10px',
    },
    logo: {
        width: '100px',
    },
    appBar: {
        background: 'none',
        padding: `0 ${theme.spacing(3)}px`
    },
    title: {
        fontSize: '3rem',
    },
    menu: {
        fontSize: '35px'
    }
}));



const Profile = () => {
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
        <>
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
                    <Grid item xs={4}>
                        <Typography variant="h4" className={classes.title}>
                            DINDER!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <MenuIcon className={classes.menu} aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenu} />
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem component={Link} to='/home'>Home</MenuItem>
                            {
                                true ?
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
                        </Menu>
                    </Grid>

                </Grid>
            </AppBar>
        </>
    )
}

export default Profile;