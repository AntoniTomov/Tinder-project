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

export default function Register(props) {
    const classes = useStyles();
    const [usernameInput, setUsernameInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [repeatPassInput, setRepeatPassInput] = useState("");
    const [ageInput, setAgeInput] = useState("");
    const [isPassVisible, setIsPassVisible] = useState(true);

    function changeInput(ev, field) {
        switch(field) {
            case 'username': setUsernameInput(ev.target.value);
            break;
            case 'password': setPassInput(ev.target.value);
            break;
            case 'repeatPassword': setRepeatPassInput(ev.target.value);
            break;
            case 'age': setAgeInput(ev.target.value);
            break;
            default:
        }
    }

    function getInputData() {



        let user = {
            name: usernameInput,
            age: Number(ageInput),
        }
        console.log('From Register.js: ', user);
        props.regUser(user);
        setUsernameInput('');
        setPassInput('');
        setRepeatPassInput('');
        setAgeInput('');
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
        <Container className={classes.container} position="relative" align="center" gutterBottom>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="username"
                    autoFocus
                    error={usernameInput.trim().length < 4 && usernameInput.length !== 0} value={usernameInput}
                    onChange={(ev) => changeInput(ev, 'username')}
                    label="Username" variant="outlined" />
                <FormControl variant="outlined">
                    <InputLabel className="label" htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        error={passInput.trim().length < 4 && passInput.length !== 0} 
                        value={passInput} 
                        onChange={(ev) => changeInput(ev, 'password')}  
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
                <FormControl variant="outlined">
                    <InputLabel className="label" htmlFor="repeatPassword">Repeat password</InputLabel>
                    <OutlinedInput
                        id="repeatPassword"
                        error={repeatPassInput.trim().length < 4 && repeatPassInput.length !== 0}
                        value={repeatPassInput}
                        onChange={(ev) => changeInput(ev, 'repeatPassword')}
                        label="Re-type password"
                        variant="outlined"
                        type={isPassVisible ? 'text' : 'password'}
                        autoComplete="current-password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
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
                    onChange={(ev) => changeInput(ev, 'age')}
                    label="How old are you?"
                    variant="outlined"
                    type="number"
                />
                <Button onClick={getInputData} variant="contained" color="primary">Register</Button>
            </form>
        </Container>
        </>
    )
}