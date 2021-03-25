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
    let [images, setImages] = useState([]);
    let [imagesCounter, setImagesCounter] = useState(0);
    // let [selectedFile, setSelectedFile] = useState(null);

    const handleUploadClick = (e) => {
        let data = e.target;
        if (data.files && data.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(data.files[0]);

            reader.onloadend = function (e) {
                console.log('target', e.target);
                setImages([...images, reader.result]);
            }

            setImagesCounter(prev => prev + 1);
        }
    }

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
                        <Grid item xs className={classes.item}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={e => { handleUploadClick(e) }}
                            />
                            <label htmlFor="contained-button-file">
                                <Tooltip title="Add Photo" arrow TransitionComponent={Zoom} placement='left'>
                                    <Fab component="span" size='medium' className={classes.button}>
                                        <AddPhotoAlternateIcon />
                                    </Fab>
                                </Tooltip>
                            </label>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                        >
                            {images && images.map((img, i) => {
                                return (
                                    <Grid item key={i} xs={4}>
                                        <img src={img} alt='userImage' className={classes.img} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default Profile;