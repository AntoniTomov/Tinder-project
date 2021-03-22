import React, { useState } from 'react';
import { CssBaseline, Typography, Container, TextField, Label, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
    flex: {
        flexGrow: 1,
        margin: theme.spacing(1),
        width: '25ch',
    },
}));

export default function Register(props) {
    const classes = useStyles();
    const [usernameInput, changeUserNameInput] = useState("");
    const [passInput, changePassInput] = useState("");
    const [repeatPassInput, changeRepeatPassInput] = useState("");
    const [ageInput, changeAgeInput] = useState("");

    function changeInput(ev, field) {
        switch(field) {
            case 'username': changeUserNameInput(ev.target.value);
            break;
            case 'password': changePassInput(ev.target.value);
            break;
            case 'repeatPassword': changeRepeatPassInput(ev.target.value);
            break;
            case 'age': changeAgeInput(ev.target.value);
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
        changeUserNameInput('');
        changePassInput('');
        changeRepeatPassInput('');
        changeAgeInput('');
    }

    return (
        <>
        <CssBaseline />
        <Container className={classes.flex} position="relative" align="center" gutterBottom>
            <form className={classes.root} noValidate autoComplete="off">
                {/* <Label></Label> */}
                <TextField id="username" value={usernameInput} onChange={(ev) => changeInput(ev, 'username')} label="Username" variant="outlined" margin="dense" />
                <TextField id="password" value={passInput} onChange={(ev) => changeInput(ev, 'password')}  label="Password" variant="outlined" margin="dense" type="password" autoComplete="current-password" />
                <TextField id="repeatPassword" value={repeatPassInput} onChange={(ev) => changeInput(ev, 'repeatPassword')}
                label="Re-type password"
                variant="outlined"
                margin="dense"
                type="password"
                autoComplete="current-password" />
                <TextField id="age" value={ageInput} onChange={(ev) => changeInput(ev, 'age')}
                label="How old are you?"
                variant="outlined"
                margin="dense"
                type="number" />

                <Button onClick={getInputData} variant="contained" color="primary">Register</Button>
            </form>
        </Container>
        </>
    )
}