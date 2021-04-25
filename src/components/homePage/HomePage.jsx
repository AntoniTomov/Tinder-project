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
import { updateAllUsers } from '../users/users.action';
import { createChatRoom } from './Services';
import { changeUserData } from '../login-register/user.actions';
import { updateUserInFirebase } from './Services';
import store from '../../redux/store'

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function HomePage () {
  const dispatch = useDispatch();
  const alreadyRemoved = useSelector(state => state.alreadyRemoved);
  let currentUser = useSelector(state => state.currentUser);
  const users = useSelector(state => state.allUsers.allUsers);
  const [characters, setCharacters] = useState([]);
  const [isSwipeView, setIsSwipeView] = useState(true);
  const childRefs = useMemo(() => Array(characters.length).fill(0).map(i => React.createRef()), [characters.length]); 
  // const childRefs = useMemo(() => Array(characters.length).fill(0).map(i => React.createRef()), [currentUser.disliked.length, characters.length]); 
  const lowestAge = users.map(user => +user.age).sort((a, b) => a - b).filter(age => !isNaN(age))[0];
  const highestAge = users.map(user => +user.age).sort((a, b) => b - a).filter(age => !isNaN(age))[0];
  const [ageRange, setAgeRange] = useState([lowestAge, highestAge]);
  const [genderValue, setGenderValue] = useState('all');
  const [swipeAction, setSwipeAction] = useState('');
  const [swipedUserName, setSwipedUserName] = useState('');
  const [didCardLeave, setDidCardLeave] = useState(false);

  function select(state) {
    return state.allUsers.allUsers;
  }

  function getUpdatedCurrentUser() {
    const prevCurrentUser = currentUser;
    const allUsers = select(store.getState());
    const newState = allUsers.find(user => user.uid === currentUser.uid)
    const excludedUsers = allUsers.filter(user => newState.disliked.includes(user.uid) || newState.liked.includes(user.uid) || newState.matches.includes(user.uid));
    const idsOfExcludedUsers = excludedUsers.map(user => user.uid);
    if(prevCurrentUser.disliked.length !== newState.disliked.length) {
      currentUser = {...newState};
      console.log('currentUser: ', currentUser.disliked)
      console.log('newState: ', newState.disliked)
      if (didCardLeave) {
        dispatch({type: 'setRemoved', payload: idsOfExcludedUsers})
        const updatedUsers = filterProfiles(allUsers);
        setCharacters(updatedUsers);
        setDidCardLeave(false);
        console.log('Setvame didCardLeave na False: ', didCardLeave)
      }
    } else {
      setDidCardLeave(false);
      console.log('Ne sme promenqli currentUser: ', prevCurrentUser, newState)
    }
  }

  useEffect(() => {
    const unsubscribe = store.subscribe(getUpdatedCurrentUser);
    // if(didCardLeave) {
    //   setDidCardLeave(false);
    // }
    console.log('!!!didCardLeave ot useEffect s unsubscribe e: ', didCardLeave)
    return () => unsubscribe();
  }, [didCardLeave])

  useEffect(() => {
    const filteredUsers = filterProfiles(users);
    setCharacters(filteredUsers);
  }, [ageRange, genderValue])
  
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
    let swipeAction = '';

    switch(direction){
      case 'left' :
        arrProp = 'disliked';
        swipeAction = 'disliked';
      break;
      case 'right' :
        arrProp = 'liked';
        swipeAction = 'liked';
      break;
      case 'up' :
        arrProp = 'matches';
        swipeAction = 'matched';
      break;
      case 'down' :
        arrProp = 'disliked';
        swipeAction = 'disliked';
      break;
      default: break;
    }
    updateDB(arrProp, userIdToBeAdded);
    setSwipeAction(swipeAction);
    dispatch({type: 'addToRemoved', payload: userIdToBeAdded})
  }

  const outOfFrame = (userId) => {
    console.log('didCardLeave e: ', didCardLeave)
    setDidCardLeave(true);
    console.log('Setvame didCardLeave na TRUE: ', didCardLeave)
  }

  const updateProfileMatches = (userOneId, userTwoId) => {
    dispatch(updateAllUsers(userOneId, userTwoId));
    createChatRoom(userOneId, userTwoId);
    // dispatch({type: 'userAddedToMatches', payload: userTwoId});
  }

  function changeUserProps(arrProp, userIdToBeAdded) {
    updateUserInFirebase(currentUser.uid, userIdToBeAdded, arrProp)
    .then(() => {
      dispatch(changeUserData(arrProp, userIdToBeAdded))
      console.log('Update-nahme usera!!!')
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });

    if (arrProp === 'liked') {
      const targetUserLiked = users.find(user => user.uid === userIdToBeAdded).liked;
      console.log('targetUserLiked from homePage---->', targetUserLiked)
      if (targetUserLiked.includes(currentUser.uid)) {
        updateProfileMatches(currentUser.uid, userIdToBeAdded)
      }
    } else if(arrProp === 'matches') {
      updateProfileMatches(currentUser.uid, userIdToBeAdded)
    }
  }

  const updateDB = (arrProp, userIdToBeAdded) => {
    changeUserProps(arrProp, userIdToBeAdded);
    // outOfFrame(userIdToBeAdded);
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
    // setDidCardLeave(true);
    changeUserProps(arrProp, userIdToBeAdded);
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
      setCharacters(users);
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
      // TODO: reset Users on the page without refresh
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

  useEffect(() => {
    if(alreadyRemoved.length > 0) {
      const swipedId = alreadyRemoved[alreadyRemoved.length - 1]
      const userNameToDisplay = users.find(user => user.uid === swipedId).name;
      setSwipedUserName(userNameToDisplay);
    }
  }, [alreadyRemoved])

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
            {childRefs && childRefs.length > 0 && characters.map((character, index) =>
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
          {swipeAction ? <h3 key={swipeAction} className='infoText'>You {swipeAction} {swipedUserName}!</h3> : <h3 className='infoText'>Swipe a card or press a button to get started!</h3>}
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
                    <Button size="small" color="primary" onClick={() => cardViewSwipe('disliked', user.uid)}>
                    Dislike
                    </Button>
                    <Button size="small" color="primary" onClick={() => cardViewSwipe('liked', user.uid)}>
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