import React from 'react';
import { Typography, TextField, Input, Container, CssBaseline, Grid, Paper, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { } from '@material-ui/icons';
import { spacing } from '@material-ui/system'
import { 
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';

const user = {
    name: 'Pesho',
    age: 19,
    url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg',
    more: {
        description: 'Az sum Mega Pi4!1!',
        socialNetwork: 'IG:peshoPi4a',
        location: 'Sofeto',
        hobbies: 'skiing'
    },
    infoField: '',
};

let fields = Object.keys(user.more);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        color: 'red',
        fontWeight: 'bold',
    },
    bg: {
        background: 'lightgray',
    },
    input: {
        lineHeight: '20px',
    }
}));

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#3f51b5',
      },
      '& .MuiInputBase-input': {
        paddingLeft: '20px',
      },
    },
  })(TextField);

const Profile = () => {

    let classes = useStyles();

    return (
        <>
            <CssBaseline />
            <Container maxWidth='md'>
                <Paper elevation={10} className={classes.bg}>
                    <List className={classes.root}>
                        {fields.map(field => (
                            <div>
                                <ListItem>
                                    <ListItemText primary={field.toUpperCase()} secondary="write sth about you" />
                                </ListItem>
                                <Divider component="li" />
                                <form noValidate autoComplete="off" className={classes.input}>
                                    <CssTextField fullWidth label="" defaultValue={user.more[field]}/>
                                </form >
                            </div>
                        ))}
                    </List>
                    {/* <ListItemAvatar>
                        <Avatar>
                            <BeachAccessIcon />
                        </Avatar>
                    </ListItemAvatar> */}
                </Paper>
            </Container>
        </>
    )
}

export default Profile;