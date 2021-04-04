import { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import chatClasses from './Chat.module.css';

const useStyles = makeStyles(theme => ({
    head: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        margin: theme.spacing(1),
    },
    timestamp: {
        color: 'gray',
        fontSize: '8px',
    }
}));

export default function ChatHead({ message }) {
    const styles = useStyles();
    const allUsers = useSelector(state => state.allUsers);
    const user = useSelector(state => state.currentUser);
    const messageStyle = message.sender === user.uid ? 'sent' : 'received';
    const userImage = allUsers.find(user => user.uid === message.sender)?.images[0];

    return (
        <div className={[`${chatClasses.message} ${chatClasses[messageStyle]}`]}>
            <Avatar className={styles.head} alt={message.sender} src={userImage} />
            <p>{message.message}</p>
            <span>{new Date(message.createdAt).toDateString()}</span>
        </div>
    )
}