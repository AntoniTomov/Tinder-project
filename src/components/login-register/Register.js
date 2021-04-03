import React, { useState } from 'react';
import { CssBaseline, Typography, InputLabel, OutlinedInput, FormControl, Container, TextField, Label, IconButton, InputAdornment, makeStyles, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import firebase, { db, auth } from '../../firebase';

import { useDispatch, useSelector } from 'react-redux';
import loginUser from './login-register.actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
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

export default function Register({ setCurrentUser }) {
    const classes = useStyles();
    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [ageInput, setAgeInput] = useState("");
    const [isPassVisible, setIsPassVisible] = useState(false);

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

    function register() {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return auth.createUserWithEmailAndPassword(emailInput, passInput)
            })
            .then(() => {
                var user = auth.currentUser;
                console.log(user);
                let fullName = `${firstNameInput[0]}${firstNameInput.slice(1)} ${lastNameInput[0]}${lastNameInput.slice(1)}`;
                console.log(fullName);
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
                    images: [],
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

                dispatch({ type: 'userLoggedIn', payload: user });
            })
            .catch(error => console.log(error.message))

        setEmailInput('');
        setFirstNameInput('');
        setLastNameInput('');
        setPassInput('');
        setAgeInput('');
    }

    const handleClickShowPassword = () => {
        isPassVisible ? setIsPassVisible(false) : setIsPassVisible(true);
        console.log(isPassVisible)
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
                let userInDb = {
                    uid: res.user.uid,
                    name: res.user.displayName,
                    email: emailInput,
                    aboutYou: '',
                    age: 18,
                    collageOrUni: '',
                    company: '',
                    country: '',
                    city: '',
                    gender: '',
                    jobTitle: '',
                    images: [res.additionalUserInfo.profile.picture],
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
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="firstNameInput"
                        autoFocus
                        error={firstNameInput.trim().length < 4 && firstNameInput.length !== 0} value={firstNameInput}
                        onChange={(ev) => changeInput(ev.target.value, 'firstName')}
                        label="First name" variant="outlined" />
                    <TextField
                        id="lastNameInput"
                        autoFocus
                        error={lastNameInput.trim().length < 4 && lastNameInput.length !== 0} value={lastNameInput}
                        onChange={(ev) => changeInput(ev.target.value, 'lastName')}
                        label="Last name" variant="outlined" />
                    <TextField
                        id="email"
                        autoFocus
                        type="email"
                        error={emailInput.trim().length < 4 && emailInput.length !== 0} value={emailInput}
                        onChange={(ev) => changeInput(ev.target.value, 'email')}
                        label="Email" variant="outlined" />
                    <FormControl variant="outlined">
                        <InputLabel className="label" htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            error={passInput.trim().length < 4 && passInput.length !== 0}
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
                    <TextField
                        id="age"
                        error={ageInput < 18 && ageInput !== ""}
                        value={ageInput}
                        onChange={(ev) => changeInput(ev.target.value, 'age')}
                        label="How old are you?"
                        variant="outlined"
                        type="number"
                    />
                    <Button variant="contained" color="primary" onClick={register}>Register</Button>
                    <Button variant="contained" color="primary" onClick={signInWithGoogle}>
                        <img className={classes.googleIcon} src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
                        <span> Continue with Google</span>
                    </Button>
                </form>
            </Container>
        </>
    )
}