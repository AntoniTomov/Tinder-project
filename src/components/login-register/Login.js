import React, { useState } from 'react';
import { CssBaseline, Typography, InputLabel, OutlinedInput, FormControl, Container, TextField, Label, IconButton, InputAdornment, makeStyles, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { auth } from '../../firebase';
import firebase from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
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
    label: {
        lineHeight: '4px',
    },
}));

export default function Login({ setCurrentUser }) {
    const classes = useStyles();
    const [usernameInput, setUsernameInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [isPassVisible, setIsPassVisible] = useState(false);

    const dispatch = useDispatch();
    const userInRedux = useSelector(state => state.currentUser)


    function changeUsernameInput(ev) {
        setUsernameInput(ev.target.value);
    }

    function changePasswordInput(ev) {
        setPassInput(ev.target.value);
    }

    function login() {
        // let user = {
        //     name: usernameInput,
        //     password: passInput,
        // }
        // props.login(user);
        auth.setPersistence('session')
            .then(() => {
                return auth.signInWithEmailAndPassword(usernameInput, passInput)
            })
            .then(() => {
                var user = auth.currentUser;
                console.log(user);
                dispatch({ type: 'userLoggedIn', payload: user });

            })
            .catch(error => console.log(error.message))

        setUsernameInput('');
        setPassInput('');
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
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="username"
                        fullWidth='true'
                        autoFocus
                        error={usernameInput.trim().length < 4 && usernameInput.length !== 0} value={usernameInput}
                        onChange={(ev) => changeUsernameInput(ev)}
                        label="Username" variant="outlined" />
                    <FormControl variant="outlined">
                        <InputLabel className="label" htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            fullWidth='true'
                            error={passInput.trim().length < 4 && passInput.length !== 0}
                            value={passInput}
                            onChange={(ev) => changePasswordInput(ev)}
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
                    <Button onClick={login} variant="contained" color="primary">Login</Button>
                </form>
            </Container>
        </>
    )
}