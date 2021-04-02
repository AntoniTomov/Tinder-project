import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ImageUploaderContainer from './imageUploader';

import firebase, { auth, db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '40vw',
        minWidth: '400px',
        margin: '0 auto',
        '& .MuiSvgIcon-root.MuiSelect-icon ': {
            color: 'white'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'white'
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottom: '1px solid rgb(205,205,205)'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '&:hover': {
            borderBottomColor: 'red'
        },
        '& input.MuiInputBase-input.MuiInput-input': {
            color: 'white',
        },
        '& div.MuiSelect-select.MuiSelect-selectMenu.MuiInputBase-input.MuiInput-input': {
            color: 'white',
        },
    },
    paper: {
        margin: '5px 0',
        // background: 'rgba(255, 255, 255, 0.5)',
        background: 'none',
        color: 'white',
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
        display: 'none',
        color: 'white',
        '& .MuiInputBase-input': {
            color: 'white',
        },
    },
    formControl: {
        '& .MuiSelect-select:focus': {
            background: 'none', // rgba(255, 255,	255, 0.3)
        },
        minWidth: '250px',
        margin: 0,
    },

}));

const CssTextField = withStyles({
    root: {
        '& label': {
            color: 'rgb(225, 225, 225)',
            // fontFamily: 'Nunito',
        },
        '& label.Mui-focused': {
            color: 'rgb(225, 225, 225)',
            // fontFamily: 'Nunito',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1976d2',
        },
        '& .MuiOutlinedInput-root': {
            color: 'rgb(225, 225, 225)',
            // fontFamily: 'Nunito',
            '& fieldset': {
                borderColor: 'rgb(225, 225, 225)',
            },
            '&:hover fieldset': {
                borderColor: 'rgb(225, 225, 225)',
            },
        },
    },
})(TextField);

const Profile = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUser.user);

    const userRef = db.collection('users').doc(user.uid);

    const classes = useStyles();
    const numberOfImageContainers = 6;

    const [aboutYou, setAboutYou] = useState(user.aboutYou);
    const [passions, setPassions] = useState('');
    const [gender, setGender] = useState(user.gender);
    const [orientation, setOrientation] = useState('');
    const [region, setRegion] = useState('');
    const [allCountriesInARegion, setAllCountriesInARegion] = useState([]);
    const [livingIn, setLivingIn] = useState('');
    const [userImages, setUserImages] = useState([]);

    const handleAboutYouChange = (e) => {
            setAboutYou(e.target.value);
    }
    const handleAboutYou = (e) => {
        if (user.aboutYou !== aboutYou) {
            console.log('na blyr promenihme neshto');
            dispatch({
                type: 'userChangedAboutYou',
                payload: e.target.value
            });
            
            /* TUKA PRAVIM PROMQNA NA USERa v DB !*/
            // userRef.update({aboutYou: e.target.value})
            //     .then(() => {
            //         console.log('updated successfully')
            //     })
            //     .catch(error => {
            //         console.log('Error updating', error)
            //     })
        }
    }

    const handlePassionsChange = e => {
        setPassions(e.target.value)
    }
    const handleGenderChange = e => {
        // setGender(e.target.value);
        dispatch({
            type: 'userChangedGender',
            payload: e.target.value
        })
        /* TUKA PRAVIM PROMQNA NA USERa v DB !*/
            // userRef.update({gender: e.target.value})
            //     .then(() => {
            //         console.log('updated successfully')
            //     })
            //     .catch(error => {
            //         console.log('Error updating', error)
            //     })
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
    }, [region]);

    useEffect(() => {

        const docRef = db.collection('users').doc(`${user.uid}`);
        // console.log(user.uid, 'ot profile')
        docRef.get().then((doc) => {
        // console.log(doc, 'ot profile pak')

            if (doc.exists) {

                const imagesArraySet = setImagesArrLengthAndFill(doc.data().images, numberOfImageContainers);

                setUserImages(imagesArraySet)
                console.log('snimkite v db', doc.data().images)
                console.log('imagesArraySet', imagesArraySet)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, []);


    const updateImages = (imagesArr) => {
        let userRef = db.collection('users').doc(`${user.uid}`);
        return userRef.update({
            images: imagesArr,
        }).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    const replaceImgUrl = (index, url) => {
        const replacedImageUrls = [...userImages];
        replacedImageUrls[index] = url;
        setUserImages(replacedImageUrls);
        dispatch({
            type: 'userChangedProfilePic',
            payload: replacedImageUrls,
        })
        return replacedImageUrls;
    }

    const setImagesArrLengthAndFill = (imagesArr, maxSize) => {
        let resultArr = [...imagesArr]
        resultArr.length = maxSize;
        if (imagesArr.length < maxSize) {
            resultArr.fill('', imagesArr.length);
        }
        return resultArr;
    }

    return (
        <>
            <CssBaseline />
            <form noValidate autoComplete="off">
                <Grid
                    container
                    className={classes.root}
                    direction='column'
                >
                    <Grid item>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid container direction='column'>
                                <Grid item className={classes.item}>
                                    <Typography variant='h4'>Upload your images</Typography>
                                </Grid>
                                <Grid
                                    container
                                    justify='center'
                                    wrap='wrap'
                                    style={{ margin: '30px 0', padding: '20px' }}
                                >
                                    {/* lg={3} md={'auto'} sm={1} */}

                                    {userImages.map((container, i) => {
                                        return (
                                            <Grid xs={'auto'} item>
                                                <ImageUploaderContainer id={i} key={i} userId={user.uid} replaceImgUrl={replaceImgUrl} updateImages={updateImages} imgUrl={userImages[i] || ''} />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                            >
                                <Grid item className={classes.item}>
                                    <Typography variant='h4'>About you</Typography>
                                </Grid>
                                <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                    <CssTextField
                                        id="outlined-multiline-flexible"
                                        label="About you"
                                        multiline
                                        rows={4}
                                        rowsMax={4}
                                        fullWidth
                                        value={aboutYou}
                                        onChange={handleAboutYouChange}
                                        onBlur={handleAboutYou}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                            >
                                <Grid item className={classes.item}>
                                    <Typography variant='h4'>Passions</Typography>
                                </Grid>
                                <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                    <CssTextField
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
                        <Paper elevation={0} className={classes.paper}>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                            >
                                <Grid item className={classes.item}>
                                    <Typography variant='h4'>Gender:</Typography>
                                </Grid>
                                <Grid item xs={'auto'} style={{ justifyContent: 'center' }}>
                                    <RadioGroup style={{ margin: '0 auto' }} row aria-flowto='right' aria-label="gender" name="gender1" value={user.gender} onChange={handleGenderChange}>
                                        <FormControlLabel className={classes.radio} value="female" control={<Radio color='secondary' />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio color='primary' />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio color='default' />} label="Other" />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                            >
                                <Grid item className={classes.item}>
                                    <Typography variant='h4'>Sexual orientation:</Typography>
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
                        <Paper elevation={0} className={classes.paper}>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                            >
                                <Grid item className={classes.item}>
                                    <Typography variant='h4'>Living in:</Typography>
                                </Grid>
                                <Grid item xs={'auto'} className={classes.item}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel style={{ color: 'white' }}>Region</InputLabel>
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
                                        <InputLabel style={{ color: 'white' }} disabled>Country</InputLabel>
                                        <Select
                                            disabled={!region}
                                            variant='standard'
                                            labelId="demo-simple-select-label"
                                            id='sexualOrientation-select'
                                            value={livingIn}
                                            onChange={handleLivingInChange}
                                        >
                                            {allCountriesInARegion.map(country => <MenuItem key={country.alpha2Code} value={country.name}>{country.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                            >
                                <Grid item className={classes.item}>
                                    <Typography variant='h4'>Job title:</Typography>
                                </Grid>
                                <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                    <CssTextField id="standard-secondary" label="Job title" fullWidth color="secondary" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                            >
                                <Grid item className={classes.item}>
                                    <Typography variant='h4'>Company:</Typography>
                                </Grid>
                                <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                    <CssTextField id="standard-secondary" label="Company" fullWidth color="secondary" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                            >
                                <Grid item className={classes.item}>
                                    <Typography variant='h4'>College/Uni:</Typography>
                                </Grid>
                                <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                    <CssTextField id="standard-secondary" label="College/Uni" fullWidth color="secondary" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default Profile;