import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import ImageUploaderContainer from './imageUploader';
import { getDefaultNormalizer } from '@testing-library/dom';

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
        width: '40vw',
        minWidth: '400px',
        margin: '0 auto',

    },
    paper: {
        margin: '5px 0',
        background: 'rgba(255, 255, 255, 0.5)',
    },
    item: {
        // border: '1px solid black',
    },
    button: {
        color: '#e66465',
        background: '#9198e5',
    },
    input: {
        display: 'none'
    },
    box: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 30px',
    },
    radio: {
        color: 'green'
    },
}));

const GreenRadio = withStyles({
    root: {
        color: 'primary.main',
        '&$checked': {
            color: 'secondary.main',
        },
    },
    checked: {},
})(Radio)


const Profile = () => {
    const classes = useStyles();

    const [aboutYou, setAboutYou] = useState('');
    const [passions, setPassions] = useState('');
    const [gender, setGender] = useState('female');

    const handleAboutYouChange = (e) => {
        setAboutYou(e.target.value);
    }

    const handlePassionsChange = e => {
        setPassions(e.target.value)
    }

    const handleGenderChange = e => {
        setGender(e.target.value)
    }


    return (
        <>
            <CssBaseline />
            <Grid
                container
                className={classes.root}
                direction='column'
            >
                <Grid item>
                    <Paper elevation={20} className={classes.paper}>
                        <Grid container direction='column'>
                            <Grid item className={classes.item}>
                                <Typography variant='h4' color='primary'>Upload your images</Typography>
                            </Grid>
                            <Grid
                                container
                                justify='center'
                                wrap='wrap'
                                style={{ margin: '30px 0', padding: '20px' }}
                            >
                                {/* lg={3} md={'auto'} sm={1} */}
                                <Grid xs={'auto'} item>
                                    <ImageUploaderContainer id='1' key='1' />
                                </Grid>
                                <Grid xs={'auto'} item>
                                    <ImageUploaderContainer id='2' key='2' />
                                </Grid>
                                <Grid xs={'auto'} item>
                                    <ImageUploaderContainer id='3' key='3' />
                                </Grid>
                                <Grid xs={'auto'} item>
                                    <ImageUploaderContainer id='4' key='4' />
                                </Grid>
                                <Grid xs={'auto'} item>
                                    <ImageUploaderContainer id='5' key='5' />
                                </Grid>
                                <Grid xs={'auto'} item>
                                    <ImageUploaderContainer id='6' key='6' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={20} className={classes.paper}>
                        <Grid
                            container
                            direction='column'
                            alignItems='center'
                        >
                            <Grid item className={classes.item}>
                                <Typography variant='h4' color='primary'>About you</Typography>
                            </Grid>
                            <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="About you"
                                    multiline
                                    rows={4}
                                    rowsMax={4}
                                    fullWidth
                                    value={aboutYou}
                                    onChange={handleAboutYouChange}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={20} className={classes.paper}>
                        <Grid
                            container
                            direction='column'
                            alignItems='center'
                        >
                            <Grid item className={classes.item}>
                                <Typography variant='h4' color='primary'>Passions</Typography>
                            </Grid>
                            <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Passions"
                                    multiline
                                    rows={4}
                                    rowsMax={4}
                                    fullWidth
                                    value={passions}
                                    onChange={handlePassionsChange}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Box className={classes.box} boxShadow='0 3px 5px 2px rgba(255, 105, 135, .3)'>
                        <Grid
                            container
                            direction='column'
                            alignItems='center'
                        >
                            <Grid item className={classes.item}>
                                <Typography variant='h4' color='primary'>Gender:</Typography>
                            </Grid>
                            <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                <RadioGroup style={{flexDirection: 'row', justifyContent: 'center'}} aria-flowto='right' aria-label="gender" name="gender1" value={gender} onChange={handleGenderChange}>
                                    <FormControlLabel className={classes.radio} value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile;