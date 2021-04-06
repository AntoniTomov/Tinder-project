import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuAppBar from '../menuAppBar/MenuAppBar';
import HomePage from '../homePage/HomePage';
import Profile from '../profile/Profile';
import Register from "../login-register/Register";
import Login from '../login-register/Login';
import ChosenMatch from '../chosenMatch/ChosenMatch';
import ChosenProfile from '../chosenProfile/ChosenProfile';
import { CssBaseline, Fab } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Matches from '../matches/Matches';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import Chat from '../chat/Chat';
import CircularProgress from '@material-ui/core/CircularProgress';
import { auth, db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
  paper: {
    position: 'fixed !important',
    bottom: '50px',
    right: '50px',
    color: 'rgb(136, 25, 163)',
    backgroundColor: 'rgba(255,255,255,0.5)',
    '& .MuiFab-root:hover': {
      backgroundColor: '#e66465',
      '& .MuiSvgIcon-root': {
        color: 'rgb(225,225,225)',
        zIndex: 2,
      },
    },
    zIndex: 2,
  },
  smallBtn: {
    position: 'absolute',
    width: '50px',
    height: '50px',
    '& .MuiSvgIcon-root': {
      width: '30px'
    },
    color: '#e66465',
    background: 'rgb(225,225,225)',
  },
}));


function App() {
  const dispatch = useDispatch();
  const styles = useStyles();

  const [isChatOpened, setIsChatOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const showChat = () => {
    setIsChatOpened(!isChatOpened);
  }

  const user = useSelector(state => state.currentUser);


  //is a user still logged in
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        db.collection('users').doc(user.uid).get().then(res => {
          dispatch({
            type: 'userLoggedIn',
            payload: res.data()
          });
          setIsLoading(false);
        })
      } else {
        dispatch({
          type: 'userLoggedOut'
        });
        setIsLoading(false);
      }
    });
  }, [])

  useEffect(() => {
    db.collection('users').onSnapshot(res => {
      let users = [];
      res.forEach(element => {
        element.uid !== user.uid && users.push(element.data());
      });
      // console.log('Tuk otnovo setvame users ot App.jsx: ', users)
      dispatch({
        type: 'getAllUsers',
        payload: users,
      });
    })
  }, [user])

  useEffect(() => {
    const choseUser = JSON.parse(window.localStorage.getItem('chosenProfile'))
    dispatch({type: 'setChosenProfile', payload: choseUser});
}, [])

  if (isLoading) {
    return <div style={{ margin: 'calc(50vh - 100px) auto' }}>
      <CircularProgress size={100} />
    </div>
  }

  return (
    <>
      <CssBaseline />
      <header>
        <MenuAppBar user={user} />
      </header>
      <main className="App">
        <Switch>
          <Route exact path='/' >
            {user.uid ?
              <HomePage />
              : <Redirect to="/login" />}
          </Route>
          <Route path="/chosenProfile/:id">
            {user.uid ?
              <ChosenProfile />
              :
              <Redirect to="/register" />
            }
          </Route>
          <Route exact path='/login'>
            {user.uid ?
              <div>
                <Redirect to="/" />
              </div>
              :
              <Login />
            }
          </Route>
          <Route exact path='/register'>
            {user.uid ?
              <div>
                <Redirect to="/" />
              </div>
              :
              <Register />
            }
          </Route>
          {user.uid ?
            <Route exact path='/matches'>
              <Matches />
            </Route>
            :
            <Redirect to='/register' />
          }
          {user.uid ?
            <Route path="/matches/:id">
              <ChosenMatch />
            </Route>
            :
            <Redirect to='/register' />
          }
          <Route exact path='/profile'>
            {user.uid ? <Profile /> : <Redirect to='/profile' />}
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </main>
      {user.uid && isChatOpened && <Chat />}
      {user.uid &&
        <Paper className={styles.paper}>
          <Tooltip title={isChatOpened ? 'Close Chat':'Open Chat'} className={styles.tooltip} arrow TransitionComponent={Zoom} placement='top'>
            <Fab component="span" className={styles.smallBtn}>
              <InsertCommentIcon fontSize='large' onClick={showChat} />
            </Fab>
          </Tooltip>
        </Paper>
      }
    </>
  );
}

export default App;
