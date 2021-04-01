import chatClasses from './Chat.module.css';
import { useState, useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import { CssBaseline, makeStyles } from '@material-ui/core';
import firebase, { db } from '../../firebase';
import { useSelector } from 'react-redux';
import ChatHead from './chatHead';


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

export default function Chat({ users }) {
    const styles = useStyles();
    const user = useSelector(state => state.currentUser.user);

    const [formValue, setFormValue] = useState('');
    const [isPersonActive, setisPersonActive] = useState(false);
    const [allMessages, setAllMessages] = useState([]);
    const [allChats, setAllChats] = useState([]);
    const [targetChat, setTargetChat] = useState(null);
    const chat = null;

    // const messagesRef = db.collection('chatRooms').doc('allMessages').collection('uid123');

    useEffect(() => {
        /* samo pri zarejdane vzimame ref kym vsichki chatove kydeto uchastva current user-a */
        const chatroomsRef = db.collection('chatRooms').where('users', 'array-contains', 'iRAJrtLOEtO92cbkP4ZYOC0nNMv2');
        /* pylnim state-a na allChats, za da moje da gi polzvame */
        chatroomsRef.get().then(data => {
            data.forEach(el => {
                let chat = { id: el.id, messages: el.data().messages }
                setAllChats(prev => [...prev, chat])
            });
            setTargetChat(allChats[0]);
        })
        /* gledame za promeni v qnkoi ot tezi documenti */
        chatroomsRef.onSnapshot(snapShot => {
            snapShot.docChanges().forEach(change => {
                console.log('ima promqna v document s ID-> ', change.doc.get('messages'))
            })
        })
    }, [])

    useEffect(() => {
        // const targetChatRef = db.collection('chatRooms').doc(targetChat);
        
    }, [targetChat])


    const sendMessage = async (e) => {
        e.preventDefault();
        // await currentChatRef.update({
        //     messages: firebase.firestore.FieldValue.arrayUnion({ message: formValue, sender: 'boK' })
        // })
        setFormValue('');
    }
    
    const selectTargetChat = (id) => {
        const chat = allChats.find(chat => chat.id === id);
        setTargetChat(chat);
    }

    return (
        <CssBaseline>
            <div className={chatClasses.chatContainer}>
                <div className={chatClasses.profilesInChat}>
                    <div className={chatClasses.innerDivChat}>
                        {   
                            allChats.map(chat => {
                                return (<ChatHead id={chat.id} selectTargetChat={selectTargetChat} />)
                            })
                        }
                    </div>
                </div>
                <main className={chatClasses.chat}>
                    <div className={chatClasses.messageContainer}>

                        {
                            targetChat &&
                            targetChat.messages.map(message => (<p>{message.message}</p>))
                        }

                        {/* {allMessages.map((message, i) =>
                            <div key={i} className={[`${chatClasses.message} ${chatClasses.received}`]}>
                                <p>{message.message}</p>
                                <span>{new Date(message.sendAt).toDateString()}</span>
                            </div>
                        )} */}

                    </div>
                    <form className={chatClasses.chatForm} onSubmit={(e) => sendMessage(e)}>
                        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
                        <button type="submit" disabled={!formValue}>💕</button>
                    </form>
                </main>
            </div>
        </CssBaseline>
    )
}