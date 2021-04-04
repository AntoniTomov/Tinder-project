import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import MenuAppBar from '../menuAppBar/MenuAppBar';
import HomePage from '../homePage/HomePage';
import Profile from '../profile/Profile';
import Register from "../login-register/Register";
import Login from '../login-register/Login';
import ChosenMatch from '../chosenMatch/ChosenMatch';
import { CssBaseline } from '@material-ui/core';
import Matches from '../matches/Matches';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import Chat from '../chat/Chat';
import { users } from '../matches/Matches';
import firebase, { auth, db } from '../../firebase';

import { useDispatch, useSelector } from 'react-redux';
import { CodeSharp } from '@material-ui/icons';


function App() {
  const dispatch = useDispatch();

  const [isChatOpened, setIsChatOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const showChat = () => {
    setIsChatOpened(!isChatOpened);
  }

  const user = useSelector(state => state.currentUser);
  const [chosenProfileId, setChosenProfileId] = useState(null);
  
  console.log('Kolko puti se rendnah?!?!?');

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
        console.log('ima lognat ')
      } else {
        dispatch({
          type: 'userLoggedOut'
        });
        setIsLoading(false);
        console.log('nqma lognat uj...')
      }
    });
  }, [])

  useEffect(() => {
    db.collection('users').onSnapshot(res => {
      let users = [];
      res.forEach(element => {
        users.push(element.data());
      });
      console.log('Tuk otnovo setvame users ot App.jsx: ', users)
      dispatch({
        type: 'getAllUsers',
        payload: users,
      });
      // console.log('Users from App.jsx: ', users)
  })
  }, [])

  const getChosenMatchId = (id) => {
    setChosenProfileId(id);
  }


  return (
    <>
      <CssBaseline />
      <header>
        <MenuAppBar user={user} />
      </header>
      <main className="App">
        <Switch>
          <Route exact path='/'>
            {user ?
              <>
                <HomePage />
              </> : <Redirect to="/login" />}
          </Route>
          <Route exact path='/login'>
            {user ?
              <div>
                <Redirect to="/" />
              </div>
              :
              <Login />
            }
          </Route>
          <Route exact path='/register'>
            {user ?
              <div>
                <Redirect to="/" />
              </div>
              :
              <Register />
            }
          </Route>
          {user ?
            <Route exact path='/matches'>
              <Matches getChosenMatchId={(id) => getChosenMatchId(id)}/>
              {/* <Route exact path='/chosenMatch'>
              <ChosenMatch user={user}/>
            </Route> */}
              {/* <ChosenMatch user={user}/> */}
            </Route>
          :
            <Register />
          }
          {user ?
            chosenProfileId && <Route path="/matches/:id">
              <ChosenMatch chosenProfileId={chosenProfileId}/>
            </Route>
          :
            <Register />
          }
          <Route exact path='/profile'>
            { user ? <Profile /> : <Redirect to='/profile' />}
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>

      </main>
      {user && isChatOpened && <Chat />}
      {user && <InsertCommentIcon fontSize='large' className='chatIcon' onClick={showChat} />}
    </>
  );
}

export default App;
