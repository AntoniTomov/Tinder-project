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
import Matches from '../matches/Matches';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import Chat from '../chat/Chat';

function App() {

  let [user, setUser] = useState(null);
  const [isChatOpened, setIsChatOpened] = useState(false);
  //{ name: 'Pesho', age: 19 , url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg'}

  const users = [
    { name: 'Pesho', age: 19 , url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg', id: 0, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Sofia'},
    { name: 'Genadi', age: 23 , url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg', id: 1, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Varna'},
    { name: 'Ginka', age: 25 , url: 'https://media.jobcase.com/images/24b8d0dd-2b2b-4f53-b8a9-c1d3a1e5f248/large', id: 2, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Kitanchevo'},
    { name: 'Strahinka', age: 19 , url: 'https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg', id: 3, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Zlatograd'},
    { name: 'Doy4o', age: 19 , url: 'https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png', id: 4, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Burgas'},
    { name: 'Ivan', age: 19 , url: 'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70', id: 5, location: 'Kaspichan'},
    { name: 'Zlatko', age: 19 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU53EcOIyxE7pOZJBvGHJGbDk39EYxvOhbdw&usqp=CAU', id: 6, location: 'Kiten'},
    { name: 'Donyo', age: 19 , url: 'https://expertphotography.com/wp-content/uploads/2018/10/cool-profile-pictures-fake-smile.jpg', id: 7, description: 'Golqm/a sum pi4/ka i shte te shruskam... Ha ha ha, ne sum lud/a, a ekstravaganten/na. Obrushtam se kum sebe si w sreden rod - kEkS!!!', location: 'Gorna Djumaya'},
    { name: 'Zasmqna', age: 19 , url: 'https://competition.adesignaward.com/images/designers-portrait-photo-1.jpg', id: 8, location: 'Vraca'},
    { name: 'Ivanka', age: 19 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlSyMW39B5owZrxmWcxQy8x8cTC5ofBFPsvA&usqp=CAU', id: 9, location: 'Blagoevgrad'}
];

  function login(user) {
    setUser({ name: user.name, password: user.password, age: user.age , url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg' || null });
  }

  function reg(user) {
    // setUser({name: user.name, password: user.password});
    login(user);
  }

  const showChat = () => {
    setIsChatOpened(!isChatOpened);
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
            {user ? 
            <div>
              <Redirect to="/Home" />
            </div>
                  : 
            <Login login={(user) => login(user)}/>
            }
        </Route>
        <Route exact path='/register'>
          <Register regUser={(user) => reg(user)}/>
        </Route>
        <Route exact path='/matches'>
          <Matches users={users}/>
          {/* <Route exact path='/chosenMatch'>
            <ChosenMatch user={user}/>
          </Route> */}
          {/* <ChosenMatch user={user}/> */}
        </Route>
        <Route path="/matches/:userId">
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
    {isChatOpened && <Chat users={users}/>}
    {user && <InsertCommentIcon fontSize='large' className='chatIcon' onClick={showChat}/>}
    </>
  );
}

export default App;
