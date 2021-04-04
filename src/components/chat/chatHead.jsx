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
    },
    active : {
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '2rem 0 0 2rem',
    },
    missed : {
        background: 'red',
    }
}));

const toggleClass = (ev) => {
    ev.target.className === 'active' ? ev.target.className = '' : ev.target.className = 'active';
}

export default function ChatHead({ selectTargetChat, targetChatId, chat, updatedChats, updateUpdatedChats }) {
    const styles = useStyles();
    const allUsers = useSelector(state => state.allUsers);
    const currentUserId = useSelector(state => state.currentUser.uid)
    const targetUserId  = chat.id.split('_').filter(id => id !== currentUserId).join('');
    // let targetUserId  = id.replaceAll(/_{0,1}(iRAJrtLOEtO92cbkP4ZYOC0nNMv2)_{0,1}/g, '');
    const targetUser = allUsers.find(user => user.uid === targetUserId);
    const activeStyle = chat.id === targetChatId ? 'active' : '';
    const [missedMessageStyle, setMissedMessageStyle] = useState(false);
    
    
    // useEffect(() => {
    //     const isInUpdatedChats = updatedChats.includes(chat.id);
    //     setMissedMessageStyle(isInUpdatedChats);
    // }, [updatedChats])
    
    useEffect(() => {
        if (chat.messages.length !== 0) {
            const lastMessage = chat.messages[chat.messages.length - 1];
            const isInUpdatedChats = updatedChats.includes(chat.id);
            // setMissedMessageStyle(isInUpdatedChats);
            console.log(`isInUpdatedChats:${isInUpdatedChats}  `)
            if (lastMessage.sender !== currentUserId && chat.id !== targetChatId && isInUpdatedChats) { 
                setMissedMessageStyle(true);
            }
        }
    }, [updatedChats])

    const handleChatOnClick = (e) => {
        // toggleClass(e);
        setMissedMessageStyle(false);
        updateUpdatedChats(chat.id);
        selectTargetChat(chat.id);
    }

    return (
        <span key={targetUser.id} style={missedMessageStyle ? {border: '2px solid red'} : {}} className={styles[activeStyle]} onClick={e => handleChatOnClick(e)}>
            <Avatar className={styles.head} alt={targetUser.name} src={targetUser.images[0]} />
            {targetUser.name}
        </span>
    )
}