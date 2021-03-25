import chatClasses from './ChosenMatch.module.css';
import { useState } from "react";
import  Avatar from '@material-ui/core/Avatar';
import { CssBaseline, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { FullscreenExitTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',

    },
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

export default function ChosenMatch({user}) {

    const [formValue, setFormValue] = useState('');
    const styles = useStyles();
        
    return (
        <div className={styles.container}>
            <Grid className={styles.item} item xs key={user.name}>
                <div style={{ backgroundImage: 'url(' + user.url + ')' }} className='card'>
                    <h3>{user.name}</h3>
                    <h3>{user.age}</h3>
                </div>
            </Grid>
            <main className={chatClasses.chat}>
                <div className={chatClasses.messageContainer}>
                    <div className={[`${chatClasses.message} ${chatClasses.received}`]}>
                        <Avatar className={styles.head} alt={user.name} src={user.url} />
                        <p>dsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
                        <span>12:30pm</span>
                    </div>
                    <div className={[`${chatClasses.message} ${chatClasses.sent}`]}>
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
                    </div>
                </div>
                <form onSubmit={() => console.log('cuknaha me')}>
                    <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
                    <button type="submit" disabled={!formValue}>💕</button>
                </form>
            </main>
        </div>
    )
}