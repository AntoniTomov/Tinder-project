import React, { useState } from 'react';
import '../App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import Advanced from './Advanced';
import Profile from './Profile';

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

  return (
    <div className="App">

      <MenuAppBar login={login} user={user}>
        
      </MenuAppBar>

      <Switch>
        <Route exact path='/'>
          {user ? 
          <>
            <h3>Home page</h3>
            <Advanced />
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
          <h3>Register page</h3>
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

    </div>
  );
}

export default App;
