import React, { useState } from 'react';
import './App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import MenuAppBar from '../menuAppBar/MenuAppBar';
import HomePage from '../homePage/HomePage';
import Profile from '../profile/Profile';
import Register from "../login-register/Register";

function Login() {

  return (
    <div>
      <h1>Login in order to continue...</h1>
    </div>
  )
}

function Matches() {
  return (
    <>
      <p>Here will reside your matches!</p>
    </>
  )
}

function App() {

  let [user, setUser] = useState(null);

  function login() {
    setUser({ name: 'Pesho', age: 15 });
  }

  function reg(user) {
    console.log('From the App.js file: ', user);
    setUser({name: user.name, age: user.age});
  }

  return (
    <>
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
            <Login />
            }
            {/* <h3>Login page</h3>
            <button onClick={login}>Log fake user</button> */}
          </>
        </Route>
        <Route exact path='/register'>
          <Register regUser={(user) => reg(user)}/>
        </Route>
        <Route exact path='/Matches'>
          <Matches />
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
