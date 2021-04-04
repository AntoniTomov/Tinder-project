import chatClasses from './Chat.module.css';
import { useState, useEffect, useMemo, useRef } from "react";
import Avatar from '@material-ui/core/Avatar';
import { CssBaseline, makeStyles } from '@material-ui/core';
import firebase, { db } from '../../firebase';
import { useSelector } from 'react-redux';
import ChatHead from './chatHead';
import { sentMessage } from './chatService';
import Message from './Message';


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

export default function Chat() {
    const styles = useStyles();
    const user = useSelector(state => state.currentUser);

    const [formValue, setFormValue] = useState('');
    const [allChats, setAllChats] = useState([]);
    const [targetChatId, setTargetChatId] = useState('');
    const dummyDiv = useRef();
    // const [lastChatChangedId, setLastChatChangedId] = useState('');
    // const [updatedChats, setUpdatedChats] = useState([]);

    const chatRoomsRef = db.collection('chatRooms').where('users', 'array-contains', user.uid);

    // Fetch all chat rooms
    useEffect(() => {
        /* gledame za promeni v qnkoi ot tezi documenti */
        chatRoomsRef.onSnapshot(snapShot => {
            // console.log('snapshot=> ', snapShot)
            const tempAllChats = []
            snapShot.forEach(doc => {
                const data = doc.data();
                let chat = { ...data, id: doc.id }
                // сорт бъ тиместамп
                tempAllChats.push(chat)
            })

            const sortedByTimeChats = tempAllChats.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);

            setAllChats(sortedByTimeChats)

            // if(sortedByTimeChats.length > 0) {
            //     setTargetChatId(sortedByTimeChats[0].id)
            // }
        })
    }, [])

    useEffect(() => {
        dummyDiv.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    }, [allChats, dummyDiv, targetChatId])


    const sendMessage = async (e) => {
        e.preventDefault();

        await sentMessage(targetChatId, user.uid, formValue);
        console.log('izpratih ei tui: ', formValue, 'v chata: ', targetChatId, 'ot: ', user.uid);
        setFormValue('');

        // scroll to bottom -> useRef()
        dummyDiv.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    }

    const selectTargetChat = (id) => {
        setTargetChatId(id);
    }

    const currentChat = useMemo(() => {
        const id = allChats.findIndex(chat => chat.id === targetChatId);
        return allChats[id];
    }, [targetChatId, allChats])

    // console.log('currentChat =>>> ', currentChat)
    return (
        <CssBaseline>
            <div className={chatClasses.chatContainer}>
                <div className={chatClasses.profilesInChat}>
                    <div className={chatClasses.innerDivChat}>
                        {
                            allChats.map(chat => {
                                return (<ChatHead 
                                    chat={chat}
                                    isActive={targetChatId === chat.id}
                                    selectTargetChat={selectTargetChat}
                                    key={chat.id}
                                    />)
                            })
                        }
                    </div>
                </div>
                <main className={chatClasses.chat}>
                    <div className={chatClasses.messageContainer}>

                        {
                            currentChat &&
                            currentChat.messages.map(message => {
                                return <Message message={message} />
                            })
                        }
                        <div ref={dummyDiv} />
                    </div>
                    <form className={chatClasses.chatForm} onSubmit={sendMessage}>
                        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
                        <button type="submit" disabled={!currentChat || !formValue}>💕</button>
                    </form>
                </main>
            </div>
        </CssBaseline>
    )
}