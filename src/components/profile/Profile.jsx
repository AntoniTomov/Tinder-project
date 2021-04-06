import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
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

});

const CssTextField = withStyles({
    root: {
        '& label': {
            color: 'rgb(225, 225, 225)',
        },
        '& label.Mui-focused': {
            color: 'rgb(225, 225, 225)',
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
    const user = useSelector(state => state.currentUser);

    const userRef = db.collection('users').doc(user.uid);

    const classes = useStyles();
    const numberOfImageContainers = 6;

    const [aboutYou, setAboutYou] = useState(user.aboutYou);
    const passionsFromDb = user.passions.join(', ');
    const [passions, setPassions] = useState(passionsFromDb);
    const [gender, setGender] = useState(user.gender);
    const [orientation, setOrientation] = useState(user.sexualOrientation);
    const regionFromDb = user.country.split(' ')[0];
    const countryFromDb = user.country.split(' ')[1];
    const [region, setRegion] = useState(regionFromDb);
    const [allCountriesInARegion, setAllCountriesInARegion] = useState([]);
    const [livingIn, setLivingIn] = useState(countryFromDb);
    const [userImages, setUserImages] = useState([]);
    const [jobTitle, setJobTitle] = useState(user.jobTitle);
    const [company, setCompany] = useState(user.company);
    const [collegeOrUni, setCollegeOrUni] = useState(user.collageOrUni);

    useEffect(() => {
        region && fetch(`https://restcountries.eu/rest/v2/region/` + region)
            .then(res => res.json())
            .then(res => setAllCountriesInARegion(res))
            .catch(err => console.log(err))
    }, [region]);

    useEffect(() => {
        const docRef = db.collection('users').doc(`${user.uid}`);
        docRef.get().then((doc) => {
            if (doc.exists) {

                const imagesArraySet = setImagesArrLengthAndFill(doc.data().images, numberOfImageContainers);

                setUserImages(imagesArraySet)
            } else {
                // doc.data() will be undefined in this case
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, []);

    const handleAboutYouChange = (e) => {
        setAboutYou(e.target.value);
    }
    const handleAboutYou = (e) => {
        if (user.aboutYou !== aboutYou) {

            userRef.update({ aboutYou: e.target.value })
                .then(() => {
                    console.log('Updated successfully');
                    dispatch({
                        type: 'userChangedAboutYou',
                        payload: e.target.value
                    });

                })
                .catch(error => {
                    console.log('Error updating', error);
                })
        }
    }

    const handlePassionsChange = e => {
        setPassions(e.target.value);
    }

    const handlePassions = (e) => {
        let value = passions.split(', ');
        if (user.passions.join(', ') !== value) {
            userRef.update({ passions: value })
                .then(() => {
                    console.log('Updated successfully')
                    dispatch({
                        type: 'userChangedPassions',
                        payload: value
                    });
                })
                .catch(error => {
                    console.log('Error updating', error);
                })
        }
    }

    const handleGenderChange = e => {
        setGender(e.target.value);
        userRef.update({ gender: e.target.value })
            .then(() => {
                console.log('updated successfully');
                dispatch({
                    type: 'userChangedGender',
                    payload: e.target.value
                })
            })
            .catch(error => {
                console.log('Error updating', error);
            })
    }

    const handleOrientationChange = e => {
        setOrientation(e.target.value);
        userRef.update({ sexualOrientation: e.target.value })
            .then(() => {
                console.log('updated successfully');
                dispatch({
                    type: 'userChangedOrientation',
                    payload: e.target.value
                })
            })
            .catch(error => {
                console.log('Error updating', error);
            })

    }

    const handleLivingInChange = e => {
        setLivingIn(e.target.value);
        userRef.update({ country: `${region} ${e.target.value}` })
            .then(() => {
                console.log('updated successfully');
                dispatch({
                    type: 'userChangedLivingIn',
                    payload: `${region} ${e.target.value}`
                });
            })
            .catch(error => {
                console.log('Error updating', error);
            })
    }
    const handleRegion = (e) => {
        setRegion(e.target.value);
    }

    const handleJobTitleChange = (e) => {
        setJobTitle(e.target.value);
    }

    const handleJobTitle = (e) => {
        if (user.jobTitle !== e.target.value) {
            userRef.update({ jobTitle: e.target.value })
                .then(() => {
                    console.log('Updated successfully');
                    dispatch({
                        type: 'userChangedJobTitle',
                        payload: e.target.value
                    });
                })
                .catch(error => {
                    console.log('Error updating', error);
                })
        }
    }

    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    }
    const handleCompany = (e) => {
        if (user.company !== e.target.value) {
            userRef.update({ company: e.target.value })
                .then(() => {
                    console.log('Updated successfully');
                    dispatch({
                        type: 'userChangedCompany',
                        payload: e.target.value
                    });
                })
                .catch(error => {
                    console.log('Error updating', error);
                })
        }
    }
    const handleCollegeOrUniChange = (e) => {
        setCollegeOrUni(e.target.value);
    }
    const handleCollegeOrUni = (e) => {
        if (user.collageOrUni !== e.target.value) {
            userRef.update({ collageOrUni: e.target.value })
                .then(() => {
                    console.log('Updated successfully');
                    dispatch({
                        type: 'userChangedCollegeOrUni',
                        payload: e.target.value
                    });
                })
                .catch(error => {
                    console.log('Error updating', error);
                })
        }
    }

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
                                    {userImages.map((container, i) => {
                                        return (
                                            <Grid item key={i}>
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
                                        onBlur={handlePassions}
                                        variant="outlined"
                                        placeholder='Separate them by ", "'
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
                                            id='country'
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
                                    <CssTextField id="standard-secondary" label="Job title"
                                        fullWidth
                                        color="secondary"
                                        value={jobTitle}
                                        onChange={handleJobTitleChange}
                                        onBlur={handleJobTitle}
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
                                    <Typography variant='h4'>Company:</Typography>
                                </Grid>
                                <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                    <CssTextField id="standard-secondary" label="Company"
                                        fullWidth
                                        color="secondary"
                                        value={company}
                                        onChange={handleCompanyChange}
                                        onBlur={handleCompany}
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
                                    <Typography variant='h4'>College/Uni:</Typography>
                                </Grid>
                                <Grid item xs={'auto'} style={{ width: '80%', marginBottom: '30px' }}>
                                    <CssTextField id="standard-secondary" label="College/Uni"
                                        fullWidth
                                        color="secondary"
                                        value={collegeOrUni}
                                        onChange={handleCollegeOrUniChange}
                                        onBlur={handleCollegeOrUni}
                                    />
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