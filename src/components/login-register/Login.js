import React, { useState } from 'react';
import { CssBaseline, InputLabel, OutlinedInput, FormControl, Container, TextField, IconButton, InputAdornment, makeStyles, Button, FormHelperText } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { auth, db } from '../../firebase';
import firebase from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
        '& .MuiFormHelperText-contained': {
            color: 'red',
            fontSize: '0.9rem',
            padding: 0,
            borderRadius: '0',
        },
    },
    form: {
        minWidth: '300px',
        maxWidth: '400px',
    },
    container: {
        marginTop: '5rem',
        maxWidth: '500px',
        margin: '0 auto',
        display: 'flex',
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
        '& .MuiOutlinedInput-root': {
            color: 'rgb(225, 225, 225)',
            '& fieldset': {
                borderColor: 'rgb(225, 225, 225)',
            },
            '&:hover fieldset': {
                borderColor: 'rgb(225, 225, 225)',
            },
        },
    },
})(TextField);

const CssOutlinedInput = withStyles({
    root: {
        '& span.MuiIconButton-label': {
            color: 'rgb(225, 225, 225)',
        },
        '& input': {
            color: 'rgb(225, 225, 225)',
        },
        '& fieldset': {
            border: '1px solid rgb(225, 225, 225)',
        },
        '&:hover fieldset': {
            border: '1px solid rgb(225, 225, 225) !important', //changing the outline on hover!!!
        },
        '&.MuiOutlinedInput-root.Mui-focused fieldset': {
            border: '2px solid rgb(225, 225, 225) !important', //changing the outline on focus!!!
        },
    }
})(OutlinedInput);

export default function Login() {
    const classes = useStyles();
    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const dispatch = useDispatch();

    function changeEmailInput(ev) {
        setEmailInput(ev.target.value.trim());
    }

    function changePasswordInput(ev) {
        setPassInput(ev.target.value.trim());
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }

    const validateForm = () => {

        let emailErr = '';
        let passwordErr = false;
        const emailIsValid = validateEmail(emailInput);


        if (!emailIsValid) {
            emailErr = 'Email is badly formatted!';
        }

        if (passInput.length < 6) {
            passwordErr = true;
        }

        if (emailErr || passwordErr) {
            setEmailError(emailErr);
            setPasswordError(passwordErr);
            return false;
        }
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        return true;
    }

    function login(e) {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            console.log('validno e !')
            auth.setPersistence('session')
                .then(() => {
                    return auth.signInWithEmailAndPassword(emailInput, passInput)
                })
                .then((authToken) => {
                    db.collection('users').doc(authToken.user.uid).get().then(res => {
                        console.log('=====>', res.data())
                        dispatch({
                            type: 'userLoggedIn',
                            payload: res.data()
                        });
                        setEmailInput('');
                        setPassInput('');
                    })
                })
                .catch(error => {
                    console.log(error.message);
                    setEmailError(error.message);
                });


        }
    }

    const handleClickShowPassword = () => {
        isPassVisible ? setIsPassVisible(false) : setIsPassVisible(true);
        console.log(isPassVisible)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <CssBaseline />
            <Container className={classes.container} position="relative" align="center">
                <form className={classes.root} onSubmit={login} noValidate autoComplete="off">
                <FormControl variant="outlined">
                    <CssTextField
                        id="email"
                        fullWidth={true}
                        autoFocus
                        // helperText={emailError}
                        error={!!emailError}
                        aria-describedby="email-login-text-helper"
                        onChange={changeEmailInput}
                        label="Email" variant="outlined" />
                        {!! emailError && <FormHelperText id="email-login-text-helper">{emailError}</FormHelperText>}
                        </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel className="label" style={{ color: 'rgb(225, 225, 225)' }} htmlFor="password">Password</InputLabel>
                        <CssOutlinedInput
                            id="password"
                            fullWidth={true}
                            // helperText={passwordError}
                            aria-describedby="password-login-text-helper"
                            error={!!passwordError}
                            value={passInput}
                            onChange={changePasswordInput}
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
                        {!! passwordError && <FormHelperText id="password-login-text-helper">Must be at least 6 chars!</FormHelperText>}
                    </FormControl>
                    <Button type='submit' variant="contained" color="primary">Login</Button>
                </form>
            </Container>
        </>
    )
}