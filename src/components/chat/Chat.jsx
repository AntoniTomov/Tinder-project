import chatClasses from './Chat.module.css';
import { useState, useEffect, useMemo, useRef } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import ChatHead from './chatHead';
import { sentMessage } from './chatService';
import Message from './Message';

export default function Chat() {
    const user = useSelector(state => state.currentUser);
    const allUsers = useSelector(state => state.allUsers);

    const [formValue, setFormValue] = useState('');
    const [allChats, setAllChats] = useState([]);
    const [targetChatId, setTargetChatId] = useState('');
    const [selectedChatUsername, setSelectedChatUsername] = useState('');
    const dummyDiv = useRef();

    const chatRoomsRef = db.collection('chatRooms').where('users', 'array-contains', user.uid);

    // Fetch all chat rooms
    useEffect(() => {
        chatRoomsRef.onSnapshot(snapShot => {
            const tempAllChats = []
            snapShot.forEach(doc => {
                const data = doc.data();
                let chat = { ...data, id: doc.id }
                chat.messages.length !== 0 ? tempAllChats.unshift(chat) : tempAllChats.push(chat);
            })
            const sortedByTimeChats = tempAllChats.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
            setAllChats(sortedByTimeChats);
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

        dummyDiv.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    }

    const selectTargetChat = (id, targetUser) => {
        setTargetChatId(id);
        setSelectedChatUsername(targetUser.name)
    }

    const currentChat = useMemo(() => {
        const id = allChats.findIndex(chat => chat.id === targetChatId);
        return allChats[id];
    }, [targetChatId, allChats])

    return (
        <CssBaseline>
            <div className={chatClasses.chatContainer}>
                <div className={chatClasses.profilesInChat}>
                    <div className={chatClasses.innerDivChat}>
                        {
                            allChats.length > 0 && allChats.map(chat => {
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
                                return <Message message={message} key={message.createdAt} />
                            })
                        }
                        <div ref={dummyDiv} />
                    </div>
                    <form className={chatClasses.chatForm} onSubmit={sendMessage}>
                        <input value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        placeholder={currentChat ? `Chat with ${selectedChatUsername}` : ''} />
                        <button type="submit" disabled={!currentChat || !formValue}>
                            <FavoriteIcon />
                        </button>
                    </form>
                </main>
            </div>
        </CssBaseline>
    )
}