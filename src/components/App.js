import React, { useState } from 'react';
import '../App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import User from "./User";

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
  let users = [
    {
      displayName: 'Pesho',
      age: 19,
      image: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg',
      more: {
        description: 'Az sum Mega Pi4!1!',
        socialNetwork: 'IG:peshoPi4a',
        location: 'Sofeto',
      },
      infoField: '',
    },
    {
      displayName: 'SlaTkata93',
      age: 19,
      image: 'https://www.tiktok.com/api/img/?itemId=6917677726480551174&location=1&aid=1988',
      more: {
        description: 'Slatka sum.',
        socialNetwork: 'IG:slatkata93',
        location: 'Sofeto',
      },
      infoField: '',
    },
    {
      displayName: 'Genata',
      age: 39,
      image: 'https://pbs.twimg.com/media/A9Hb3hdCIAMteGN.jpg',
      more: {
        description: 'Karam koolo',
        socialNetwork: '',
        location: 'Sofeto',
      },
      infoField: '',
    }
  ];

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
          {user ? <>
            <h3>Home page</h3>
            <User users={users} />
            {/* {
              users.map(user => <User user={user} />)
            } */}
            
          </> : <Redirect to="/login"/>}
        </Route>
        <Route exact path='/login'>
          <>
          {user ? <Redirect to="/Home" />
          : <Login />
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
