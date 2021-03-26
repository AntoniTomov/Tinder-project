import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'
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
        width: '100%',
        margin: '20px 0',
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
    formControl: {
        '& .MuiSelect-select:focus': {
            background: 'rgba(255, 255,	255, 0.3)',
        },
        minWidth: '250px',
        margin: 0
    },
}));

const Profile = () => {
    const classes = useStyles();

    const [aboutYou, setAboutYou] = useState('');
    const [passions, setPassions] = useState('');
    const [gender, setGender] = useState('female');
    const [orientation, setOrientation] = useState('');
    const [region, setRegion] = useState('');
    const [allCountriesInARegion, setAllCountriesInARegion] = useState([]);
    const [livingIn, setLivingIn] = useState('');

    
    const handleAboutYouChange = (e) => {
        setAboutYou(e.target.value);
    }
    const handlePassionsChange = e => {
        setPassions(e.target.value)
    }
    const handleGenderChange = e => {
        setGender(e.target.value)
    }
    const handleOrientationChange = e => {
        setOrientation(e.target.value);
    }
    const handleLivingInChange = e => {
        setLivingIn(e.target.value);
    }
    const handleRegion = (e) => {
        setRegion(e.target.value);
    }

    useEffect(() => {
        region && fetch(`https://restcountries.eu/rest/v2/region/` + region)
                    .then(res => res.json())
                    .then(res => setAllCountriesInARegion(res))
                    .catch(err => console.log(err))
                    .finally(console.log('prikliuchi'))
    }, [region]);

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
                    <Paper elevation={20} className={classes.paper}>
                        <Grid
                            container
                            direction='column'
                            alignItems='center'
                        >
                            <Grid item className={classes.item}>
                                <Typography variant='h4' color='primary'>Gender:</Typography>
                            </Grid>
                            <Grid item xs={'auto'} style={{ justifyContent: 'center' }}>
                                <RadioGroup style={{ margin: '0 auto' }} row aria-flowto='right' aria-label="gender" name="gender1" value={gender} onChange={handleGenderChange}>
                                    <FormControlLabel className={classes.radio} value="female" control={<Radio color='secondary' />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio color='primary' />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio color='default' />} label="Other" />
                                </RadioGroup>
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
                                <Typography variant='h4' color='primary'>Sexual orientation:</Typography>
                            </Grid>
                            <Grid item xs={'auto'} className={classes.item}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        variant='standard'
                                        labelId="demo-simple-select-label"
                                        id='sexualOrientation-select'
                                        value={orientation}
                                        onChange={handleOrientationChange}
                                    >
                                        <MenuItem value={'Straight'}>Straight</MenuItem>
                                        <MenuItem value={'Gay'}>Gay</MenuItem>
                                        <MenuItem value={'Lesbian'}>Lesbian</MenuItem>
                                        <MenuItem value={'Bisexual'}>Bisexual</MenuItem>
                                        <MenuItem value={'Asexual'}>Asexual</MenuItem>
                                        <MenuItem value={'Demisexual'}>Demisexual</MenuItem>
                                        <MenuItem value={'Queer'}>Queer</MenuItem>
                                        <MenuItem value={'Questioning'}>Questioning</MenuItem>
                                    </Select>
                                </FormControl>
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
                                <Typography variant='h4' color='primary'>Living in:</Typography>
                            </Grid>
                            <Grid item xs={'auto'} className={classes.item}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        variant='standard'
                                        labelId="demo-simple-select-label"
                                        id='sexualOrientation-select'
                                        value={region}
                                        onChange={handleRegion}
                                    >
                                        <MenuItem value={'africa'}>Africa</MenuItem>
                                        <MenuItem value={'americas'}>Americas</MenuItem>
                                        <MenuItem value={'asia'}>Asia</MenuItem>
                                        <MenuItem value={'europe'}>Europe</MenuItem>
                                        <MenuItem value={'oceania'}>Oceania</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={'auto'} className={classes.item}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        variant='standard'
                                        labelId="demo-simple-select-label"
                                        id='sexualOrientation-select'
                                        value={livingIn}
                                        onChange={handleLivingInChange}
                                    >
                                        {allCountriesInARegion.map(country => <MenuItem value={country.name}>{country.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile;

