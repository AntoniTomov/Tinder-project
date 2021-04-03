import { Hidden } from '@material-ui/core';
import React, { useState, useMemo, useEffect } from 'react';
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card';
import './HomePage.css';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { db } from '../../firebase';

const alreadyRemoved = [];

function HomePage () {
  // const users = useSelector(state => state.allUsers);

  // Filtering the users from liked/disliked/matches
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  let users = useSelector(state => state.allUsers);
  // let filteredUsers = users.filter(user => !currentUser.liked.includes(user.uid) && !currentUser.disliked.includes(user.uid) && !currentUser.matches.includes(user.uid) && currentUser.uid !== user.uid);
  
  // const filteredUsers = filterProfiles(users, currentUser);

  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [isSwipeView, setIsSwipeView] = useState(true);
  
  
  useEffect(() => {
    const filteredUsers = filterProfiles(users, currentUser);
    setCharacters(filteredUsers);
  }, [])

  let charactersState = characters;

  const childRefs = useMemo(() => Array(characters.length).fill(0).map(i => React.createRef()), [characters.length]); 
  
  function filterProfiles (allProfiles, currentUser) {
    return allProfiles.filter(user => !currentUser.liked.includes(user.uid) && !currentUser.disliked.includes(user.uid) && !currentUser.matches.includes(user.uid) && currentUser.uid !== user.uid)
  }

  const swiped = (direction, userIdToBeAdded, nameToDelete) => {
    // console.log('removing: ' + nameToDelete);
    let arrProp = '';
    switch(direction){
      case 'left' : arrProp = 'disliked';
      break;
      case 'right' : arrProp = 'liked';
      break;
      case 'up' : arrProp = 'matches';
      break;
      case 'down' : arrProp = 'disliked';
      break;
      default: break;
    }
    updateDB(arrProp, userIdToBeAdded);
    setLastDirection(direction);
    alreadyRemoved.push(userIdToBeAdded);
  }

  const outOfFrame = (userId) => {
    // console.log(name + ' left the screen!');
    // updateDB(arrProp, userIdToBeAdded);
    // charactersState = charactersState.filter(character => character.uid !== userId);
    // setCharacters(charactersState);
  }

  const updateProfileMatches = (userOneId, userTwoId) => {
    const userOneMatches = users.find(user => user.uid === userOneId).matches;
    const userTwoMatches = users.find(user => user.uid === userTwoId).matches;
    db.collection('users').doc(userOneId).update({
      matches: [...userOneMatches, userTwoId],
    })

    // Here we are creating the new chatRooms!
    createChatRoom(userOneId, userTwoId);

    db.collection('users').doc(userTwoId).update({
      matches: [...userTwoMatches, userOneId],
    })

    users = users.map(user => {
      if(user.uid === userOneId) {
        if(!user.matches.includes(userTwoId)) {
          user.matches = [...user.matches, userTwoId];
        }
      } else if (user.uid === userTwoId) {
        user.matches = [...user.matches, userOneId];
      }
      return user;
    });
    updateDataBase( 'getAllUsers', users);
  }

  function createChatRoom(userOneId, userTwoId) {
    const chatRoomDocId = userOneId > userTwoId ? `${userTwoId}_${userOneId}` : `${userOneId}_${userTwoId}`;
    db.collection('chatRooms').doc(chatRoomDocId).set({
      messages: [],
      users: [userOneId, userTwoId],
      isTyping: false, 
    })
      .then(() => console.log("Successfully created chatRoom with users: ", [userOneId, userTwoId]))
      .catch((error) => console.log("Error on chatRoom creation: ", error.message))
  }

  // TODO: да се зареждат картичките, които не се движат, иначе покажа и тези, които летят още...

  function updateDataBase(type, payload) {
    dispatch({ type: type, payload: payload});
  }

  const updateDB = (arrProp, userIdToBeAdded) => {
    
    console.log('arrProp', arrProp)
    db.collection('users').doc(currentUser.uid).update({
      [arrProp]: [...currentUser[arrProp], userIdToBeAdded],
    })
    .then(() => {
      currentUser[arrProp].push(userIdToBeAdded);
      updateDataBase('userLoggedIn', currentUser)
      // dispatch({ type: 'userLoggedIn', payload: currentUser})
      // console.log('Updated currentUser liked Array: ', currentUser[arrProp], ' with: ', userIdToBeAdded)
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });

    outOfFrame(userIdToBeAdded)

    console.log('characters: ', characters, ' sa setnati na ', charactersState, ' a filteredUsers sa ', characters)
    arrProp === 'liked' && db.collection('users').doc(userIdToBeAdded).get()
      .then(doc => {
        if (doc.data().liked.includes(currentUser.uid)) {
          // We are updating the matches of currentUser and lokedUser
          updateProfileMatches(currentUser.uid, userIdToBeAdded)
        }
      })
    arrProp === 'matches' && db.collection('users').doc(userIdToBeAdded).get()
      .then(() => {
        // We are updating the matches of currentUser and lokedUser
        updateProfileMatches(currentUser.uid, userIdToBeAdded)
      })
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.uid));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].uid; // Find the card object to be removed
      const index = characters.map(person => person.uid).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      console.log('!!!!!!!!!!!Index: ', index)
      console.log('!!!!!!!!!!!childRefs: ', childRefs)
      console.log('!!!!!!!!!!!alreadyRemoved: ', alreadyRemoved)
      console.log('!!!!!!!!!!!characters: ', characters)
      childRefs[index].current.swipe(dir); // Swipe the card!

      // charactersState = charactersState.filter(character => character.uid !== toBeRemoved);
      // setCharacters(charactersState);

      // const userIdToBeAdded = cardsLeft[cardsLeft.length - 1].uid;
      // const arrProp = dir === 'right' ? 'liked' : 'disliked';

      // updateDB(arrProp, userIdToBeAdded);
    }
  }

  const resetCurrentUser = () => (
    db.collection('users').doc(currentUser.uid).update({
      liked: [],
      disliked: [],
      matches: [],
    }).then(() => {
      dispatch({ type: 'userLoggedIn', payload: {...currentUser, liked: [], disliked: [], matches: []} })
      console.log('Successfully reset currentUser: ', currentUser)
    })

  )

  const changeViewState = () => {
    setIsSwipeView(!isSwipeView);
  }

  return (
    <div> 
      <button onClick={resetCurrentUser}>Reset currentUser</button>

      {isSwipeView ? (
        <div style={{width: '85%', margin: '0 auto'}}>
          <ViewModuleIcon onClick={changeViewState}/>
          <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
          <h1>React Tinder Card</h1>
          <div className='cardContainer'>
            {characters.map((character, index) =>
              <TinderCard ref={childRefs[index]} className='swipe' key={character.uid} onSwipe={(dir) => {
                swiped(dir, character.uid, character.name);
                }} onCardLeftScreen={() => outOfFrame(character.uid)}>
                <div style={{ backgroundImage: 'url(' + character.images[0] + ')' }} className='card'>
                  <h3>{character.name}</h3>
                </div>
              </TinderCard>
            )}
          </div>
          <div className='buttons'>
            <button onClick={() => swipe('left')}>Swipe left!</button>
            <button onClick={() => swipe('right')}>Swipe right!</button>
          </div>
          {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}

        </div>
      ) : (
        <div>
          <TouchAppIcon onClick={changeViewState}/>
          <div className="containerCardView">
            <div className="containerCardView">
              {characters.map((user) =>
                <Card elevation={20} className="root" key={user.uid} >
                  <CardActionArea>
                    <CardMedia
                      className="media"
                      image={user.images[0]}
                      title={user.name}
                    />
                    <CardContent>
                    <Typography className="colorBlack" gutterBottom variant="h5" component="h2">
                      {user.name.split(' ')[0]} {user.age}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                      {user.description ? user.description : `From ${user.location}`}
                    </Typography> */}
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="btnContainer">
                    <Button size="small" color="primary" onClick={() => updateDB('disliked', user.uid)}>
                    Dislike
                    </Button>
                    <Button size="small" color="primary" onClick={() => updateDB('liked', user.uid)}>
                    Like
                    </Button>
                  </CardActions>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage;