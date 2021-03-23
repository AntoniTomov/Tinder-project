import React, { useState } from 'react';
import '../App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import Advanced from './Advanced';
import Profile from './Profile';
import Register from './Register';
import Login from './Login';

function Matches() {
  return (
    <>
      <p>Here will reside your matches!</p>
    </>
  )
}

function App() {

  let [user, setUser] = useState(null);

  function login(user) {
    setUser({ name: user.name, password: user.password, age: user.age || null });
  }

  function reg(user) {
    // setUser({name: user.name, password: user.password});
    login(user);
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
