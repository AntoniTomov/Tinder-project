import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
        color: 'white',
    },
    title: {
        fontSize: '2rem',
        width: 'max-content',
    },
    container: {
        width: '60%',
        position: 'relative',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginTop: '1rem',
        '& a' : {
            textDecoration: 'none',
        }
    },
    item: {
        margin: `${theme.spacing(2)}px`,
        '&:hover':  {boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'},
    },
    root: {
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
        top: '135px',
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
    const removedFromHomePage = useSelector(state => state.alreadyRemoved);
    const [moreDetailsCardKey, setMoreDetailsCardKey] = useState(-1);
    const currentUser = useSelector(state => state.currentUser);
    const [matches, setMatches] = useState([]);
    const allUsers = useSelector(state => state.allUsers.allUsers);
    const defaultProfilePic = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const allMatches = allUsers.filter(user => currentUser.matches.includes(user.uid));
        setMatches(allMatches);
    }, [currentUser])

    useEffect(() => {
        matches?.length > 0 && setIsLoading(false);
    }, [matches])

    const manageCards = (uid) => {
        moreDetailsCardKey === uid ? setMoreDetailsCardKey('') : setMoreDetailsCardKey(uid);
    }

    const dislikeUser = (userId) => {
        const updatedRemovedFromHomePage = removedFromHomePage.filter(id => id !== userId);
        dispatch({type: 'setRemoved', payload: updatedRemovedFromHomePage})
        const currUserMatchesIds = currentUser.matches.filter(matchId => matchId !== userId);
        const currUserLikedProfilesIds = currentUser.liked.filter(likedId => likedId !== userId);
        const removedUser = allUsers.find(user => user.uid === userId)
        const removedUserMatches = removedUser.matches.filter(matchId => matchId !== currentUser.uid);

        db.collection('users').doc(currentUser.uid).update({
            matches: [...currUserMatchesIds],
            liked: [...currUserLikedProfilesIds],
        }).then(() => {
            dispatch({type: 'userRemovedFromLiked', payload: currUserLikedProfilesIds});
            dispatch({type: 'userRemovedFromMatches', payload: currUserMatchesIds});
        }).catch(err => console.log('Error after updating db for currentUser: ', err))

        db.collection('users').doc(userId).update({
            matches: [...removedUserMatches],
        }).then(() => {
            let updatedUsers = [...allUsers];
            updatedUsers = updatedUsers.map(user => {
                if(user.uid === userId) {
                    user.matches = removedUserMatches;
                }
                return user;
            });
            dispatch({type: 'getAllUsers', payload: updatedUsers});

            const newMatches = matches.filter(user => user.uid !== userId);
            setMatches(newMatches);
        }).catch(err => console.log('Error after updating db for currentUser: ', err))
        deleteChatRoom(userId, currentUser.uid)
    }

    // To be moved to a Service file:
    function deleteChatRoom(selectedUserId, currentUserId) {
        let chatRoomDocId = selectedUserId > currentUserId ? `${currentUserId}_${selectedUserId}` : `${selectedUserId}_${currentUserId}`;
        db.collection('chatRooms').doc(chatRoomDocId).delete()
            .then(() => console.log("Successfully deleted the chatRoom for users: ", currentUserId, selectedUserId))
            .catch((err) => console.log("Error on chatRoom deleting: ", err))
    }

    const updateChosenProfile = (user) => {
        dispatch({type: 'setChosenProfile', payload: user});
        window.localStorage.setItem('chosenProfile', JSON.stringify(user));
    }

    return (
        <div className={classes.flexColumn}>
        {matches.length === 0 ?
        <h2>You don't have any matches yet!</h2>
        :
        <Typography className={classes.title}>Your matches</Typography>
        }
        <Grid
            container
            className={classes.container}
        >
        {matches.map((user) =>
            <Card elevation={20} className={moreDetailsCardKey === user.uid ? `${classes.root} ${classes.expanded}` : classes.root} key={user.uid} onClick={() => updateChosenProfile(user)}>
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
                        {user.aboutYou ? user.aboutYou : `From ${user.country?.split(' ')[1]}`}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.btnContainer}>
                    <Button size="small" color="primary" onClick={() => dislikeUser(user.uid)}>
                    Remove match
                    </Button>
                </CardActions>
                    <Button className={styles.btnStyle} onClick={() => manageCards(user.uid)}>{moreDetailsCardKey === user.uid ? 'Show less' : 'Show more'}</Button>
            </Card>
        )}        
        </Grid>
        </div>
    );
}
