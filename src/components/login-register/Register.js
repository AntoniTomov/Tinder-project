import React, { useState, useEffect } from 'react';
import { CssBaseline, Typography, InputLabel, OutlinedInput, FormControl, Container, TextField, Label, IconButton, InputAdornment, makeStyles, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import firebase, { db, auth } from '../../firebase';

import { useDispatch, useSelector } from 'react-redux';
import loginUser from './login-register.actions';
import { withStyles } from '@material-ui/core/styles';

const defaultProfilePicUrl = 'https://firebasestorage.googleapis.com/v0/b/fir-project-d9b09.appspot.com/o/profilePics%2Fdefault-profile-pic.jpg?alt=media&token=12bd0268-84bd-47ee-9bf7-5ca4269f87d5';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
        },
    },
    container: {
        marginTop: '1rem',
        width: 'max-content',
        margin: '0 auto',
        display: 'flex',
        maxWidth: '400px',
    },
    label: {
        lineHeight: '4px',
    },
    googleIcon: {
        width: '1.5rem',
        marginRight: '8px',
    },
}));

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
            '& fieldset': {
                borderColor: 'rgb(225, 225, 225)',
            },
            '&:hover fieldset': {
                borderColor: 'rgb(225, 225, 225)',
            },
        },
        '& .MuiFormHelperText-contained': {
            color: 'red',
            fontSize: '0.9rem',
            padding: 0,
            borderRadius: '0',
        }
    },
})(TextField);

export default function Register({ setCurrentUser }) {
    const classes = useStyles();
    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [ageInput, setAgeInput] = useState("");
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [ageError, setAgeError] = useState(false);

    const dispatch = useDispatch();

    function changeInput(value, field) {
        switch (field) {
            case 'firstName': setFirstNameInput(value);
                break;
            case 'lastName': setLastNameInput(value);
                break;
            case 'email': setEmailInput(value);
                break;
            case 'password': setPassInput(value);
                break;
            case 'age': setAgeInput(value);
                break;
            default:
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emailInput)
    }
    const changeAllErrorsState = (firstNameErr, lastNameErr, emailErr, passwordErr, ageErr) => {
        setFirstNameError(firstNameErr);
        setLastNameError(lastNameErr);
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        setAgeError(ageErr);
    }

    const validateForm = () => {

        let firstNameErr = '';
        let lastNameErr = '';
        let emailErr = '';
        let ageErr = '';
        let passwordErr = '';
        const emailIsValid = validateEmail(emailInput);

        if (firstNameInput.length <= 2) {
            firstNameErr = 'Must be at least 3 chars';
        }
        if (lastNameInput.length <= 2) {
            lastNameErr = 'Must be at least 3 chars';
        }
        if (!emailIsValid) {
            emailErr = 'Email is badly formatted!';
        }
        if (ageInput < 18) {
            ageErr = 'Must be over 18!';
        }
        if (passInput.length < 6) {
            passwordErr = 'Must be at least 6 chars';
        }

        if (firstNameErr || lastNameErr || emailErr || ageErr || passwordErr) {
            changeAllErrorsState(firstNameErr, lastNameErr, emailErr, passwordErr, ageErr);
            return false;
        }
        changeAllErrorsState(firstNameErr, lastNameErr, emailErr, passwordErr, ageErr);
        return true;
    }

    function register(e) {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            console.log('validno e!')
            auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => {
                    return auth.createUserWithEmailAndPassword(emailInput, passInput)
                })
                .then(() => {
                    var user = auth.currentUser;
                    let fullName = `${firstNameInput[0]}${firstNameInput.slice(1)} ${lastNameInput[0]}${lastNameInput.slice(1)}`;
                    let userInDb = {
                        uid: user.uid,
                        name: fullName,
                        email: emailInput,
                        aboutYou: '',
                        age: ageInput,
                        collageOrUni: '',
                        company: '',
                        country: '',
                        city: '',
                        gender: '',
                        jobTitle: '',
                        images: [defaultProfilePicUrl],
                        mediaProfiles: [],
                        sexualOrientation: '',
                        youtubeSong: '',
                        passions: [],
                        chats: [],
                        isOnline: true,
                        liked: [],
                        disliked: [],
                        matches: []
                    }
                    createUserInDb(user.uid, userInDb);
                    setEmailInput('');
                    setFirstNameInput('');
                    setLastNameInput('');
                    setPassInput('');
                    setAgeInput('');
                })
                .catch(error => {
                    setEmailError(error.message);
                })
        }
    }

    const handleClickShowPassword = () => {
        isPassVisible ? setIsPassVisible(false) : setIsPassVisible(true);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();

    };
    const createUserInDb = (userId, obj) => {
        db.collection("users").doc(`${userId}`).set(obj)
            .then(() => {
                console.log("Document successfully written!");
                dispatch({ type: 'userLoggedIn', payload: obj });
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    const createUpdateGoogleUserInDb = (userId, obj) => {
        var userRef = db.collection("users").doc(userId);

        userRef.get().then((doc) => {
            if (!doc.exists) {
                console.log('nqma takyv potrebirel')
                return userRef.set(obj)
                    .then(() => {
                        console.log("Document successfully updated! // syzdadoh takyv potrebitel");
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            } else {
                console.log('IVA VECHE takyv potrebirel, ne promenqm bazata')
            }
            dispatch({ type: 'userLoggedIn', payload: obj });
        })
            .catch((error) => {
                console.log("Error getting document:", error);
            });

    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth
            .signInWithPopup(provider)
            .then((res) => {
                console.log('logvane s google ', res);
                console.log('dokato zarejda dali e lognat')
                let userInDb = {
                    uid: res.user.uid,
                    name: res.user.displayName,
                    email: res.user.email,
                    aboutYou: '',
                    age: 18,
                    collageOrUni: '',
                    company: '',
                    country: '',
                    city: '',
                    gender: '',
                    jobTitle: '',
                    images: [res.additionalUserInfo.profile.picture || defaultProfilePicUrl],
                    mediaProfiles: [],
                    sexualOrientation: '',
                    youtubeSong: '',
                    passions: [],
                    chats: [],
                    isOnline: true,
                    liked: [],
                    disliked: [],
                    matches: [],
                }
                createUpdateGoogleUserInDb(res.user.uid, userInDb);
            }).catch((error) => {
                console.log(error.message)
            })
    };

    return (
        <>
            <CssBaseline />
            <Container className={classes.container} position="relative" align="center">
                <form className={classes.root} noValidate autoComplete="off" onSubmit={register}>
                    <CssTextField
                        id="firstNameInput"
                        autoFocus
                        helperText={firstNameError}
                        error={firstNameError}
                        value={firstNameInput}
                        onChange={(ev) => changeInput(ev.target.value.trim(), 'firstName')}
                        label="First name" variant="outlined" />
                    <CssTextField
                        id="lastNameInput"
                        autoFocus
                        helperText={lastNameError}
                        error={lastNameError}
                        onChange={(ev) => changeInput(ev.target.value.trim(), 'lastName')}
                        label="Last name" variant="outlined" />
                    <CssTextField
                        id="email"
                        autoFocus
                        type="email"
                        helperText={emailError}
                        error={emailError}
                        value={emailInput}
                        onChange={(ev) => changeInput(ev.target.value.trim(), 'email')}
                        label="Email" variant="outlined" />
                    <FormControl variant="outlined">
                        <InputLabel className="label" htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            helperText={passwordError}
                            error={passwordError}
                            value={passInput}
                            onChange={(ev) => changeInput(ev.target.value, 'password')}
                            label="Password"
                            variant="outlined"
                            type={isPassVisible ? 'text' : 'password'}
                            autoComplete="current-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {isPassVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <CssTextField
                        id="age"
                        helperText={ageError}
                        error={ageError}
                        value={ageInput}
                        onChange={(ev) => changeInput(ev.target.value, 'age')}
                        label="How old are you?"
                        variant="outlined"
                        type="number"
                    />
                    <Button variant="contained" color="primary" type='submit' disabled={!ageInput || !emailInput || !firstNameInput || !lastNameInput || passInput.length < 1} >Register</Button>
                    <Button variant="contained" color="primary" onClick={signInWithGoogle}>
                        <img className={classes.googleIcon} src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
                        <span> Continue with Google</span>
                    </Button>
                </form>
            </Container>
        </>
    )
}