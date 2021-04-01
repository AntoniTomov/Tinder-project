import chatClasses from './Chat.module.css';
import { useState, useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import { CssBaseline, makeStyles } from '@material-ui/core';
import firebase, { db } from '../../firebase';
import { useSelector } from 'react-redux';


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
    const user = useSelector(state => state.currentUser.user);

    const [formValue, setFormValue] = useState('');
    const [isPersonActive, setisPersonActive] = useState(false);
    const [allMessages, setAllMessages] = useState([]);
    const styles = useStyles();

    const messagesRef = db.collection('chatRooms').doc('allMessages').collection('uid123');

    useEffect(() => {

        messagesRef.onSnapshot(snapShot => {
            snapShot.docChanges().forEach(change => {
                // console.log(change.doc.data())
                setAllMessages(prev => [...prev, change.doc.data()])
            })
        })

    }, [])


    const sendMessage = async (e) => {
        e.preventDefault();
        await messagesRef.add({
            message: formValue,
            sendAt: Date.now()
        })
        setFormValue('');
    }


    const toggleClass = (ev) => {
        console.log(ev.target);
        ev.target.className === 'active' ? ev.target.className = '' : ev.target.className = 'active';
        console.log(ev.target);
    }

    return (
        <CssBaseline>
            <div className={chatClasses.chatContainer}>
                <div className={chatClasses.profilesInChat}>
                    <div className={chatClasses.innerDivChat}>
                        {users.map(user =>
                            <span key={user.id} className={chatClasses.missedMsg} onClick={(ev) => toggleClass(ev)}>
                                <Avatar className={styles.head} alt={user.name} src={user.url} />
                                {user.name}
                            </span>
                        )}
                    </div>
                </div>
                <main className={chatClasses.chat}>
                    <div className={chatClasses.messageContainer}>
                        
                        {allMessages.map((message, i) =>
                            <div key={i} className={[`${chatClasses.message} ${chatClasses.received}`]}>
                                <p>{message.message}</p>
                                <span>{new Date(message.sendAt).toDateString()}</span>
                            </div>
                        )}

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