import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './Matches.module.css';
import { db } from '../../firebase';

const useStyles = makeStyles(theme => ({
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: '2rem',
        width: 'max-content',
    },
    container: {
        width: '60%',
        position: 'relative',
        display: 'flex',
        // padding: theme.spacing(0, 10, 2),
        justifyContent: "center",
        alignItems: "center",
        marginTop: '1rem',
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
        margin: '13px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    expanded: {
        height: 'auto',
        position: 'fixed',
        top: '50px',
        left: '5%',
        zIndex: 2,
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

export default function Matches() {
    const classes = useStyles();
    const [moreDetailsCardKey, setMoreDetailsCardKey] = useState(-1);
    const [matches, setMatches] = useState([]);
    const currentUser = useSelector(state => state.currentUser);
    const allUsers = useSelector(state => state.allUsers);
    const matchesIds = useSelector(state => state.currentUser.matches);
    const defaultProfilePic = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

    useEffect(() => {
        let currentMatches = allUsers.filter(user => currentUser.matches.includes(user.uid));
        setMatches(currentMatches);
    }, [])

    console.log('matches: ', matches);

    const manageCards = (uid) => {
        moreDetailsCardKey === uid ? setMoreDetailsCardKey(-1) : setMoreDetailsCardKey(uid);
    }

    const showProfile = (id) => {
        
    }

    const dislikeUser = (userId) => {
        console.log(userId)
        const currUserMatchesIds = currentUser.matches.filter(user => user !== userId);
        const currUserLikedProfilesIds = currentUser.liked.filter(user => user !== userId);
        const removedUser = allUsers.find(user => user.uid === userId)
        const removedUserMatches = removedUser.matches.filter(user => user !== currentUser.uid);
        console.log('currUserMatches', currUserMatchesIds);
        console.log('currUserLikedProfiles', currUserLikedProfilesIds);
        console.log('currUserLikedProfiles sus removedUser: ', currentUser.liked);
        console.log('removedUser', removedUser);
        console.log('removedUserMatches', removedUserMatches);

        db.collection('users').doc(currentUser.uid).update({
            matches: [...currUserMatchesIds],
            liked: [...currUserLikedProfilesIds],
        });
        db.collection('users').doc(userId).update({
            matches: [...removedUserMatches],
        })
        deleteChatRoom(userId, currentUser.uid)
        let currentMatches = allUsers.filter(user => currUserMatchesIds.includes(user.uid));
        setMatches(currentMatches);
    }

    // To be moved to a Service file:
    function deleteChatRoom(selectedUserId, currentUserId) {
        let chatRoomDocId = selectedUserId > currentUserId ? `${currentUserId}_${selectedUserId}` : `${selectedUserId}_${currentUserId}`;
        db.collection('chatRooms').doc(chatRoomDocId).delete()
            .then(() => console.log("Successfully deleted the chatRoom for users: ", currentUserId, selectedUserId))
            .catch((err) => console.log("Error on chatRoom deleting: ", err))
    }

    return (
        <div className={classes.flexColumn}>
        <Typography className={classes.title}>Your matches</Typography>
        <Grid
            container
            className={classes.container}
        >
        {matches.map((user) =>
            <Card elevation={20} className={moreDetailsCardKey === user.uid ? `${classes.root} ${classes.expanded}` : classes.root} key={user.uid} onClick={() => showProfile(user.uid)}>
                <CardActionArea component={Link} to={'/matches/' + user.uid}>
                    <CardMedia
                    className={classes.media}
                    image={user.images && user.images[0] || defaultProfilePic}
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
                    <Button size="small" color="primary" onClick={() => dislikeUser(user.uid)}>
                    Dislike
                    </Button>
                </CardActions>
                    <Button className={styles.btnStyle} onClick={() => manageCards(user.uid)}>{moreDetailsCardKey === user.uid ? 'Show less' : 'Show more'}</Button>
            </Card>
        )}
        
        </Grid>
        </div>
    );
}
