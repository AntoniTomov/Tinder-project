import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function User(props) {
    console.log(props);
    const [displayName, changeDisplayName] = useState(props.user.displayName);
    const [image, changeImage] = useState(props.user.image);
    const [age, changeAge] = useState(props.user.age);
    const [more, changeMore] = useState(props.user.more);
    const [infoField, changeInfo] = useState(more.description || more.socialNetwork || more.location);
    // location, interests, description, music
    // this.more.description || this.more.socialNetwork || this.more.location
    // changeInfo(more.description || more.socialNetwork || more.location);

    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
    });

    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
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
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                    {more.description}
                    </Typography> */}
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
            </Card>
        </>
    )
}