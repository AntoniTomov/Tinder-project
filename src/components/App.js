import React, { useState } from 'react';
import '../App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';

function HomePage() {

  return (
    <div>
      <h1>Welcome to the best Dating website!!!</h1>
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
    setUser({name: 'Pesho', age: 15});
  }

  return (
    <div className="App">
      
      <MenuAppBar login={login} user={user}>
        {/* <ul>
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/login" >Login</Link>
          </li>
          <li>
            <Link to="/register" >Register</Link>
          </li>
          <li>
            <Link to="/matches" >Matches</Link>
          </li>
          <li>
            <Link to="/profile" >Profile</Link>
          </li>
        </ul> */}
      </MenuAppBar>

      <Switch>
        <Route exact path='/'>
          {user ? <h3>Home page</h3> : <Redirect to="/login"/>}
        </Route>
        <Route exact path='/login'>
          <>
            <h3>Login page</h3>
            <button onClick={login}>Log fake user</button>
          </>
        </Route>
        <Route exact path='/register'>
          <h3>Register page</h3>
        </Route>
        <Route exact path='/Matches'>
          <Matches />
        </Route>
        <Route exact path='/profile'>
          <h2>My Profile</h2>
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
