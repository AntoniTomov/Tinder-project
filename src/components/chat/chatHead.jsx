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
        background: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '2rem 0 0 2rem',
    },
    missed : {
        border: '2px solid #e66465'
    }
}));

export default function ChatHead({ selectTargetChat,  chat, isActive  }) {
    const styles = useStyles();
    const allUsers = useSelector(state => state.allUsers.allUsers);
    const currentUserId = useSelector(state => state.currentUser.uid)
    const targetUserId  = chat.id.split('_').filter(id => id !== currentUserId).join('');
    const targetUser = allUsers.find(user => user.uid === targetUserId);
    const [currentChat, setCurrentChat] = useState(chat);
    const [hasMissedMessages, setHasMissedMessages] = useState(false);

    useEffect(() => {
        if (chat.messages.length > 0) {
            let lastMessageSender = chat.messages[chat.messages.length - 1].sender;
            if(currentChat.messages.length !== chat.messages.length && lastMessageSender !== currentUserId && !isActive) {
                setHasMissedMessages(true);
                setCurrentChat(chat);
            }
            if(isActive) {
                setHasMissedMessages(false);
            }
        }
    }, [chat, isActive, currentChat.messages.length])
    
    const handleChatOnClick = () => {
        selectTargetChat(chat.id, targetUser);
    }

    return (
        <span key={targetUser.id} style={hasMissedMessages ? {borderRight: '3px solid #e66465'} : {}} className={isActive ? styles['active'] : ''} onClick={handleChatOnClick}>
            <Avatar className={styles.head} alt={targetUser.name} src={targetUser.images[0]} />
            {targetUser.name}
        </span>
    )
}