import { useState } from "react";
import { useParams } from 'react-router-dom'
import  Avatar from '@material-ui/core/Avatar';
import { CssBaseline, makeStyles } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',

    },
    head: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            margin: theme.spacing(1),
        },
    }));

export default function ChosenMatch({users}) {

    const styles = useStyles();

    const { id } = useParams();

    const chosenUser = users.find(user => user.id === parseInt(id));
    console.log('Type of ID: ', id, typeof id);
    console.log(users);
    console.log('User: ', chosenUser);
        
    return (
        <CssBaseline>
            <div className={styles.container}>
                <CardMedia>Gledame user: {chosenUser.name}</CardMedia>
            </div>
        </CssBaseline>
    )
}