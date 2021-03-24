import React, { useState } from 'react';
import { CssBaseline, Typography, InputLabel, OutlinedInput, FormControl, Container, TextField, Label, IconButton, InputAdornment, makeStyles, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '30ch',
        },
    },
    container: {
        marginTop: '5rem',
        width: 'max-content',
        margin: theme.spacing(1),
        display: 'flex',
        maxWidth: '400px',
    },
    label: {
        lineHeight: '4px',
    },
}));

export default function Login(props) {

    const classes = useStyles();
    const [usernameInput, setUsernameInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [isPassVisible, setIsPassVisible] = useState(false);

    function changeUsernameInput(ev) {
        setUsernameInput(ev.target.value);
    }

    function changePasswordInput(ev) {
        setPassInput(ev.target.value);
    }

    function getInputData() {
        let user = {
            name: usernameInput,
            password: passInput,
        }
        props.login(user);
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
                    autoFocus
                    error={usernameInput.trim().length < 4 && usernameInput.length !== 0} value={usernameInput}
                    onChange={(ev) => changeUsernameInput(ev)}
                    label="Username" variant="outlined" />
                <FormControl variant="outlined">
                    <InputLabel className="label" htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
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
                <Button onClick={getInputData} variant="contained" color="primary">Register</Button>
            </form>
        </Container>
        </>
    )
}