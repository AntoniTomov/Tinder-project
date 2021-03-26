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
        position: 'relative',
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

export default function Matches({ users }) {
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
            <Card className={areExpanded ? `${classes.root} ${classes.expanded}` : classes.root} key={user.id}>
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
