import { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import { CssBaseline, makeStyles } from '@material-ui/core';
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

const toggleClass = (ev) => {
    console.log(ev.target);
    ev.target.className === 'active' ? ev.target.className = '' : ev.target.className = 'active';
    console.log(ev.target);
}

export default function ChatHead({ id, selectTargetChat }) {
    const styles = useStyles();
    const allUsers = useSelector(state => state.allUsers.allUsers);
    const currentUserId = useSelector(state => state.currentUser.user.uid)
    const targetUserId  = id.split('_').filter(id => id !== currentUserId).join('');
    // let targetUserId  = id.replaceAll(/_{0,1}(iRAJrtLOEtO92cbkP4ZYOC0nNMv2)_{0,1}/g, '');
    const [targetUser, setTargetUser] = useState(allUsers.find(user => user.uid === targetUserId));

    const handleChatOnClick = (e) => {
        toggleClass(e);
        selectTargetChat(id);
    }

    return (
        <span key={targetUser.id} className={chatClasses.missedMsg} onClick={e => handleChatOnClick(e)}>
            <Avatar className={styles.head} alt={targetUser.name} src={targetUser.images[0]} />
            {targetUser.name}
        </span>
    )
}