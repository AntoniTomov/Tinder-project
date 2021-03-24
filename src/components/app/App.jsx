import React, { useState } from 'react';
import './App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import MenuAppBar from '../menuAppBar/MenuAppBar';
import HomePage from '../homePage/HomePage';
import Profile from '../profile/Profile';
import Register from "../login-register/Register";
import Login from '../login-register/Login';
import ChosenMatch from '../chosenMatch/ChosenMatch';
import { CssBaseline } from '@material-ui/core';

function Matches() {
  return (
    <>
      <p>Here will reside your matches!</p>
    </>
  )
}

function App() {

  let [user, setUser] = useState({ name: 'Pesho', age: 19 , url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg'});

  function login(user) {
    setUser({ name: user.name, password: user.password, age: user.age , url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg' || null });
  }

  function reg(user) {
    // setUser({name: user.name, password: user.password});
    login(user);
  }

  return (
    <>
    <CssBaseline />
    <header>
      <MenuAppBar login={login} user={user} />
    </header>
    <main className="App">
      <Switch>
        <Route exact path='/'>
          {user ? 
          <>
            <h3>Home page</h3>
            <HomePage />
          </> : <Redirect to="/login" />}
        </Route>
        <Route exact path='/login'>
          <>
            {user ? 
            <div>
              <Redirect to="/Home" />
            </div>
                  : 
            <Login login={(user) => login(user)}/>
            }
            {/* <h3>Login page</h3>
            <button onClick={login}>Log fake user</button> */}
          </>
        </Route>
        <Route exact path='/register'>
          <Register regUser={(user) => reg(user)}/>
        </Route>
        <Route exact path='/Matches'>
          {/* <Matches /> */}
          <ChosenMatch user={user}/>
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>

    </main>
    </>
  );
}

export default App;
