import chatClasses from './Chat.module.css';
import { useState } from "react";
import  Avatar from '@material-ui/core/Avatar';
import { CssBaseline, makeStyles } from '@material-ui/core';
import firebase from '../../firebase';

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

export default function Chat({users}) {

    const [formValue, setFormValue] = useState('');
    const [isPersonActive, setisPersonActive] = useState(false);
    const styles = useStyles();

    
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
                            {users.map(user => 
                                <div key={user.id} className={[`${chatClasses.message} ${chatClasses.received}`]}>
                                    <Avatar className={styles.head} alt={user.name} src={user.url} />
                                    <p>dsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
                                    <span>12:30pm</span>
                                </div>
                            )}
                            {/* <div className={[`${chatClasses.message} ${chatClasses.sent}`]}>
                                <Avatar className={styles.head} alt={user.name} src={user.url} />
                                <p>Effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
                                <span>12:30pm</span>
                            </div>
                            <div className={[`${chatClasses.message} ${chatClasses.received}`]}>
                                    <Avatar className={styles.head} alt={user.name} src={user.url} />
                                    <p>Eto nqkuv message</p>
                                    <span>12:30pm</span>
                            </div>
                            <div className={[`${chatClasses.message} ${chatClasses.sent}`]}>
                                <Avatar className={styles.head} alt={user.name} src={user.url} />
                                <p>Eto nqkuv message</p>
                                <span>12:30pm</span>
                            </div>
                            <div className={[`${chatClasses.message} ${chatClasses.received}`]}>
                                    <Avatar className={styles.head} alt={user.name} src={user.url} />
                                    <p>Eto nqkuv message</p>
                                    <span>12:30pm</span>
                            </div>
                            <div className={[`${chatClasses.message} ${chatClasses.sent}`]}>
                                <Avatar className={styles.head} alt={user.name} src={user.url} />
                                <p>Eto nqkuv message</p>
                                <span>12:30pm</span>
                            </div>
                            <div className={[`${chatClasses.message} ${chatClasses.received}`]}>
                                    <Avatar className={styles.head} alt={user.name} src={user.url} />
                                    <p>Eto nqkuv message</p>
                                    <span>12:30pm</span>
                            </div>
                            <div className={[`${chatClasses.message} ${chatClasses.sent}`]}>
                                <Avatar className={styles.head} alt={user.name} src={user.url} />
                                <p>Eto nqkuv message</p>
                                <span>12:30pm</span>
                            </div>
                            <div className={[`${chatClasses.message} ${chatClasses.received}`]}>
                                    <Avatar className={styles.head} alt={user.name} src={user.url} />
                                    <p>Eto nqkuv message</p>
                                    <span>12:30pm</span>
                            </div>
                            <div className={[`${chatClasses.message} ${chatClasses.sent}`]}>
                                <Avatar className={styles.head} alt={user.name} src={user.url} />
                                <p>Eto nqkuv message</p>
                                <span>12:30pm</span>
                            </div> */}
                        </div>
                        <form className={chatClasses.chatForm} onSubmit={() => console.log('cuknaha me')}>
                            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
                            <button type="submit" disabled={!formValue}>💕</button>
                        </form>
                </main>
            </div>
        </CssBaseline>
    )
}