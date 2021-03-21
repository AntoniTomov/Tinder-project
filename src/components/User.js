import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import TinderCard from 'react-tinder-card';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export default function User(props) {
    // const [displayName, changeDisplayName] = useState(props.user.displayName);
    // const [image, changeImage] = useState(props.user.image);
    // const [age, changeAge] = useState(props.user.age);
    // const [more, changeMore] = useState(props.user.more);
    // const [infoField, changeInfo] = useState(more.description || more.socialNetwork || more.location);

    // const useStyles = makeStyles({
    //     root: {
    //         maxWidth: 345,
    //     },
    //     media: {
    //         height: 140,
    //     },
    // });

    // const classes = useStyles();

    const characters = props.users;
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <>
        <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
        <h1>Your next love:</h1>
        <div className='cardContainer'>
        {characters.map((character) =>
            <TinderCard className='swipe' key={character.displayName} onSwipe={(dir) => swiped(dir, character.displayName)} onCardLeftScreen={() => outOfFrame(character.displayName)}>
            <div style={{ backgroundImage: 'url(' + character.image + ')' }} className='card'>
                <h3 className="card-title">{character.displayName} {character.age}</h3>
                <p className="card-desc">{character.more.description}</p>
                <p className="card-loc">{character.more.location}<LocationOnIcon fontSize="small"/></p>
            </div>
            </TinderCard>
        )}
        </div>
        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
            {/* <Card className={classes.root}>
                <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={displayName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {displayName} {age}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {infoField}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary">
                    Like
                </Button>
                <Button size="small" color="primary">
                    Dislike
                </Button>
                </CardActions>
            </Card> */}
        </>
    )
}