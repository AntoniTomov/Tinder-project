import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './Matches.module.css';

const useStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
        display: 'flex',
        padding: theme.spacing(0, 10, 2),
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        margin: `${theme.spacing(2)}px`,
        '&:hover':  {boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'},
    },
    root: {
        // maxWidth: 250,
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: 250,
        height: 350,
        margin: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    expanded: {
        height: 'auto',
    },
    media: {
        height: 240,
    },
    colorBlack: {
        color: 'black',
    },
    btnContainer: {
        marginBottom: '2rem',
    },
}));

const users = [
    { name: 'Pesho', age: 19 , url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg', id: 0, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Sofia'},
    { name: 'Genadi', age: 23 , url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg', id: 1, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Varna'},
    { name: 'Ginka', age: 25 , url: 'https://media.jobcase.com/images/24b8d0dd-2b2b-4f53-b8a9-c1d3a1e5f248/large', id: 2, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Kitanchevo'},
    { name: 'Strahinka', age: 19 , url: 'https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg', id: 3, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Zlatograd'},
    { name: 'Doy4o', age: 19 , url: 'https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png', id: 4, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Burgas'},
    { name: 'Ivan', age: 19 , url: 'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70', id: 5, location: 'Kaspichan'},
    { name: 'Zlatko', age: 19 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU53EcOIyxE7pOZJBvGHJGbDk39EYxvOhbdw&usqp=CAU', id: 6, location: 'Kiten'},
    { name: 'Donyo', age: 19 , url: 'https://expertphotography.com/wp-content/uploads/2018/10/cool-profile-pictures-fake-smile.jpg', id: 7, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Gorna Djumaya'},
    { name: 'Zasmqna', age: 19 , url: 'https://competition.adesignaward.com/images/designers-portrait-photo-1.jpg', id: 8, location: 'Vraca'},
    { name: 'Ivanka', age: 19 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlSyMW39B5owZrxmWcxQy8x8cTC5ofBFPsvA&usqp=CAU', id: 9, location: 'Blagoevgrad'}
];



export default function Matches() {
    const classes = useStyles();
    const [areExpanded, setAreExpanded] = useState(false);
    const [btnMessage, setBtnMessage] = useState('Show more');

    const manageCards = (id) => {
        setAreExpanded(!areExpanded);
        btnMessage === 'Show more' ? setBtnMessage('Show less') : setBtnMessage('Show more');
    }

    return (
        <Grid
            container
            className={classes.container}
        >
        {users.map((user) =>
            <Card className={areExpanded ? [classes.root, classes.expanded] : classes.root} key={user.id}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={user.url}
                    title={user.name}
                    />
                    <CardContent>
                    <Typography className={classes.colorBlack} gutterBottom variant="h5" component="h2">
                        {user.name} - {user.age}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {user.description ? user.description : `From ${user.location}`}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.btnContainer}>
                    <Button size="small" color="primary">
                    Chat
                    </Button>
                    <Button size="small" color="primary">
                    Dislike
                    </Button>
                </CardActions>
                    <Button className={styles.asd} onClick={() => manageCards(user.id)}>{btnMessage}</Button>
            </Card>
        )}
        </Grid>
    );
}
