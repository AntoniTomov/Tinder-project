import { Link } from "react-router-dom";
import React, { useState, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './HomePage.css';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import firebase, { db } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import AgeRangeSlider from './AgeRangeSlider';
import GenderRadioButtons from './GenderRadioButtons'

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function HomePage () {
  const dispatch = useDispatch();
  const alreadyRemoved = useSelector(state => state.alreadyRemoved);
  const currentUser = useSelector(state => state.currentUser);
  const users = useSelector(state => state.allUsers);
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [isSwipeView, setIsSwipeView] = useState(true);
  const childRefs = useMemo(() => Array(characters.length).fill(0).map(i => React.createRef()), [characters.length]); 
  const lowestAge = users.map(user => +user.age).sort((a, b) => a - b).filter(age => !isNaN(age))[0];
  const highestAge = users.map(user => +user.age).sort((a, b) => b - a).filter(age => !isNaN(age))[0];
  const [ageRange, setAgeRange] = useState([lowestAge, highestAge]);
  const [genderValue, setGenderValue] = useState('all');

  useEffect(() => {
    const filteredUsers = filterProfiles(users);
    setCharacters(filteredUsers);
  }, [ageRange, genderValue])

  function setCharactersAfterFiltering(usersToFilter) {
    const filteredUsers = filterProfiles(users);
      setCharacters(filteredUsers);
  }
  
  function filterProfiles (allProfiles) {
    const tempFilteredUsers =  allProfiles.filter(user => !currentUser.liked.includes(user.uid) && !currentUser.disliked.includes(user.uid) && !currentUser.matches.includes(user.uid) && currentUser.uid !== user.uid)
    let filteredUsers = [];

    if(genderValue === 'all') {
      filteredUsers = tempFilteredUsers.filter(user => user.age >= ageRange[0] && user.age <= ageRange[1]);
    } else {
      filteredUsers = tempFilteredUsers.filter(user => user.age >= ageRange[0] && user.age <= ageRange[1] && user.gender === genderValue);
    }
    return filteredUsers;
  }

  const swiped = (direction, userIdToBeAdded) => {
    let arrProp = '';
    switch(direction){
      case 'left' : arrProp = 'Disliked';
      break;
      case 'right' : arrProp = 'Liked';
      break;
      case 'up' : arrProp = 'Matches';
      break;
      case 'down' : arrProp = 'Disliked';
      break;
      default: break;
    }
    updateDB(arrProp, userIdToBeAdded);
    setLastDirection(direction);
    dispatch({type: 'addToRemoved', payload: userIdToBeAdded})
  }

  const outOfFrame = (userId) => {
    console.log(userId + ' left the screen!!@#@!$!%@!$%#@^&#%&*@!$&^');
  }

  const updateProfileMatches = (userOneId, userTwoId) => {
    db.collection('users').doc(userOneId).update({
      matches: firebase.firestore.FieldValue.arrayUnion(userTwoId),
    })

    createChatRoom(userOneId, userTwoId);

    db.collection('users').doc(userTwoId).update({
      matches: firebase.firestore.FieldValue.arrayUnion(userOneId),
    }).then(() => {
      let updatedUsers = users.map(user => {
        if (user.uid === userTwoId) {
          user.matches = [...user.matches, userOneId];
        }
        return user;
      });
      updateDataBase( 'getAllUsers', updatedUsers);
      updateDataBase( 'userAddedToMatches', userTwoId);
    })
  }
  // To be moved to Service file:
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

  function updateDataBase(type, payload) {
    dispatch({ type: type, payload: payload});
  }

  const updateDB = (arrProp, userIdToBeAdded) => {
    
    console.log('arrProp', arrProp)

    arrProp !== 'Matches' && db.collection('users').doc(currentUser.uid).update({
      [arrProp.toLowerCase()]: firebase.firestore.FieldValue.arrayUnion(userIdToBeAdded),
    }).then(() => {
      updateDataBase(`userAddedTo${arrProp}`, userIdToBeAdded)
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });

    outOfFrame(userIdToBeAdded)

    arrProp === 'Liked' && db.collection('users').doc(userIdToBeAdded).get()
      .then(doc => {
        if (doc.data().liked.includes(currentUser.uid)) {
          updateProfileMatches(currentUser.uid, userIdToBeAdded)
        }
      })
    arrProp === 'Matches' && updateProfileMatches(currentUser.uid, userIdToBeAdded)
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.uid));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].uid;
      const index = characters.map(person => person.uid).indexOf(toBeRemoved);
      childRefs[index].current.swipe(dir);
    }
  }

  const cardViewSwipe = (arrProp, userIdToBeAdded) => {
    db.collection('users').doc(currentUser.uid).update({
      [arrProp.toLowerCase()]: [...currentUser[arrProp.toLowerCase()], userIdToBeAdded],
    }).then(() => {
      const currentUserNewState = {
        ...currentUser,
        [arrProp.toLowerCase()]: [...currentUser[arrProp.toLowerCase()], userIdToBeAdded],
      }
      updateDataBase('userLoggedIn', currentUserNewState)
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });

    arrProp === 'Liked' && db.collection('users').doc(userIdToBeAdded).get()
      .then(doc => {
        if (doc.data().liked.includes(currentUser.uid)) {
          updateProfileMatches(currentUser.uid, userIdToBeAdded)
        }
      })
    arrProp === 'Matches' && db.collection('users').doc(userIdToBeAdded).get()
      .then(() => {
        updateProfileMatches(currentUser.uid, userIdToBeAdded)
      })
      const usersToPrint = filterProfiles(users).filter(user => user.uid !== userIdToBeAdded);

      setCharacters(usersToPrint);
  }

  const resetCurrentUser = () => {
    const currentUserMatches = currentUser.matches;
    currentUserMatches.forEach(userId => {
      db.collection('users').doc(userId).get()
        .then(res => {
          let newMatches = res.data().matches.filter(matchId => matchId !== currentUser.uid);
          db.collection('users').doc(userId).update({
            matches: newMatches,
          })
        })
    })

    db.collection('users').doc(currentUser.uid).update({
      liked: [],
      disliked: [],
      matches: [],
    }).then(() => {
      dispatch({ type: 'userLoggedIn', payload: {...currentUser, liked: [], disliked: [], matches: []} })
      console.log('Successfully reset currentUser: ', currentUser)
    })
    db.collection('chatRooms').get()
    .then(res => res.forEach(doc => {
      if(doc.id.includes(currentUser.uid)) {
        db.collection('chatRooms').doc(doc.id).delete()
          .then(() => console.log('Successfully deleted the chatRooms for user: ', currentUser))
      }
    }))

    // TODO: Make the characters reset here!!!

    // dispatch({type: 'setRemoved', payload: []})
    // setCharacters(users);
    // console.log(users);
  }

  const resetAllUser = () => {
    db.collection('users').get()
    .then(res => res.forEach(doc => {
      doc.ref.update({
        liked: [],
        disliked: [],
        matches: [],
      })
    }))
    .then(() => {
      
      dispatch({ type: 'getAllUsers', payload: users.map(user => user.matches = []) });
      setCharacters(users);
    })
    // Here we are deleting ALL chats
    let chatRoomsRef = db.collection('chatRooms');
    chatRoomsRef.get()
      .then(res => res.forEach(doc => chatRoomsRef.doc(doc.id).delete()));
  }

  const changeViewState = () => {
    const filteredUsers = filterProfiles (users, currentUser)
    const charactersLeft = filteredUsers.filter(userId => !alreadyRemoved.includes(userId))

    setCharacters(charactersLeft);
    setIsSwipeView(!isSwipeView);
  }

  const updateChosenProfile = (user) => {
    dispatch({type: 'setChosenProfile', payload: user});
    window.localStorage.setItem('chosenProfile', JSON.stringify(user));
  }

  return (
    <div style={{minWidth: '450px', color: 'white'}}>
      <Button onClick={resetCurrentUser} variant='contained' className={'resetButton'}>Reset currentUser</Button>
      <Button onClick={resetAllUser} variant='contained' className={'resetButton'}>Reset all users</Button>
      {isSwipeView ? (
        <div style={{width: '85%', margin: '0 auto', zIndex: '2'}}>
          <ViewModuleIcon onClick={changeViewState} fontSize='large' style={{marginTop: '20px'}} />
          <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
          <h1 className={'homeTitle'}>React Tinder Card</h1>
          <div className='cardContainer'>
            {characters.map((character, index) =>
              <TinderCard ref={childRefs[index]} className='swipe' key={character.uid} onSwipe={(dir) => {
                swiped(dir, character.uid, character.name);
                }} onCardLeftScreen={() => outOfFrame(character.uid)}>
                <div style={{ backgroundImage: 'url(' + (character.images[0] || 'https://firebasestorage.googleapis.com/v0/b/fir-project-d9b09.appspot.com/o/profilePics%2Fdefault-profile-pic.jpg?alt=media&token=12bd0268-84bd-47ee-9bf7-5ca4269f87d5') + ')' }} className='card'>
                  <h3>{character.name}</h3>
                </div>
              </TinderCard>
            )}
          </div>
          <div className='buttons'>
            <button onClick={() => swipe('left')}>Swipe left!</button>
            <button onClick={() => swipe('right')}>Swipe right!</button>
          </div>
          {lastDirection ? <h3 key={lastDirection} className='infoText'>You swiped {lastDirection}</h3> : <h3 className='infoText'>Swipe a card or press a button to get started!</h3>}
        </div>
      ) : (
        <div>
          <div className='filtersContainer'>
            <GenderRadioButtons setGenderValue={setGenderValue}/>
            <AgeRangeSlider lowestAge={lowestAge} highestAge={highestAge} setAgeRange={setAgeRange}/>
          </div> 
          <TouchAppIcon onClick={changeViewState} fontSize='large' style={{marginTop: '20px', zIndex: '2'}} />
          <div className="cardViewWrapper">
            <div className="containerCardView">
              {characters.map((user) =>
                <Card elevation={20} className="root" key={user.uid} onClick={() => updateChosenProfile(user)}>
                  <CardActionArea component={Link} to={'/chosenProfile/' + user.uid}>
                    <CardMedia
                      className="media"
                      image={user.images[0] || 'https://firebasestorage.googleapis.com/v0/b/fir-project-d9b09.appspot.com/o/profilePics%2Fdefault-profile-pic.jpg?alt=media&token=12bd0268-84bd-47ee-9bf7-5ca4269f87d5'}
                      title={user.name}
                    />
                    <CardContent>
                      <Typography className="colorBlack" gutterBottom variant="h5" component="h2">
                        {user.name.split(' ')[0]} {user.age}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="btnContainer">
                    <Button size="small" color="primary" onClick={() => cardViewSwipe('Disliked', user.uid)}>
                    Dislike
                    </Button>
                    <Button size="small" color="primary" onClick={() => cardViewSwipe('Liked', user.uid)}>
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