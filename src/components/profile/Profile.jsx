import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import ImageUploaderContainer from './imageUploader';

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
    root: {
        width: '50%',
        margin: '0 auto',
    },
    paper: {
        background: 'rgba(255, 255, 255, 0.5)',
    },
    item: {
        border: '1px solid black'
    },
    button: {
        color: '#e66465',
        background: '#9198e5',
    },
    input: {
        display: 'none'
    },
    img: {
        width: '200px',
    },
}));



const Profile = () => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <Grid
                container
                className={classes.root}
                justify='center'
                direction='column'
            >
                <Paper elevation={10} className={classes.paper}>
                    <Grid container direction='column'>
                        <Grid item className={classes.item}>
                            <Typography variant='h4' color='primary'>Upload your images</Typography>
                        </Grid>
                        <Grid
                            container
                            spacing={4}
                            justify='space-between'
                        >
                            <Grid item>
                                <ImageUploaderContainer key='1'/>
                            </Grid>
                            <Grid item>
                                <ImageUploaderContainer key='2'/>
                            </Grid>
                            <Grid item>
                                <ImageUploaderContainer key='3'/>
                            </Grid>
                            <Grid item>
                                <ImageUploaderContainer key='4'/>
                            </Grid>
                            <Grid item>
                                <ImageUploaderContainer key='5'/>
                            </Grid>
                            <Grid item>
                                <ImageUploaderContainer key='6'/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default Profile;