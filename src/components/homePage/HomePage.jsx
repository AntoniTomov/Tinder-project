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

// const fakeUsers = [
//     {
//       name: 'Pesho',
//       age: 19,
//       url: 'https://pbs.twimg.com/profile_images/3780134937/491446ab9cc343e3a7200c621bb749b1.jpeg',
//       more: {
//         description: 'Az sum Mega Pi4!1!',
//         socialNetwork: 'IG:peshoPi4a',
//         location: 'Sofeto',
//       },
//       infoField: '',
//     },
//     {
//       name: 'SlaTkata93',
//       age: 19,
//       url: 'https://www.tiktok.com/api/img/?itemId=6917677726480551174&location=1&aid=1988',
//       more: {
//         description: 'Slatka sum.',
//         socialNetwork: 'IG:slatkata93',
//         location: 'Sofeto',
//       },
//       infoField: '',
//     },
//     {
//       name: 'Genata',
//       age: 39,
//       url: 'https://pbs.twimg.com/media/A9Hb3hdCIAMteGN.jpg',
//       more: {
//         description: 'Karam koolo',
//         socialNetwork: '',
//         location: 'Sofeto',
//       },
//       infoField: '',
//     }
//   ];

const alreadyRemoved = [];


function HomePage () {
  // const users = useSelector(state => state.allUsers.allUsers);

  // Filtering the users from liked/disliked/matches
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser.user);
  let users = useSelector(state => state.allUsers.allUsers);
  let tempUsers = [...users];
  // let filteredUsers = users.filter(user => !currentUser.liked.includes(user.uid) && !currentUser.disliked.includes(user.uid) && !currentUser.matches.includes(user.uid) && currentUser.uid !== user.uid);
  const filteredUsers = users.filter(user => !currentUser.liked.includes(user.uid) && !currentUser.disliked.includes(user.uid) && !currentUser.matches.includes(user.uid) && currentUser.uid !== user.uid);

  // useEffect(() => {
  //   filteredUsers = users.filter(user => !currentUser.liked.includes(user.uid) && !currentUser.disliked.includes(user.uid) && !currentUser.matches.includes(user.uid) && currentUser.uid !== user.uid);
  //   console.log('FilteredUsers from homePage', filteredUsers)
  //   console.log('currentUser from homePage', currentUser)
  // }, [currentUser])

  
  let charactersState = filteredUsers;
  const [characters, setCharacters] = useState(filteredUsers);
  const [lastDirection, setLastDirection] = useState();
  const [isSwipeView, setIsSwipeView] = useState(true);
  const childRefs = useMemo(() => Array(filteredUsers.length).fill(0).map(i => React.createRef()), []); 

  const swiped = (direction, nameToDelete, userIdToBeAdded) => {
    // console.log('removing: ' + nameToDelete);
    let arrProp = direction === 'left' ? 'disliked' : 'liked';
    updateDB(arrProp, userIdToBeAdded);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  }

  const outOfFrame = (userId) => {
    // console.log(name + ' left the screen!');
    // updateDB(arrProp, userIdToBeAdded);
    charactersState = charactersState.filter(character => character.uid !== userId);
    setCharacters(charactersState);
  }

  const updateProfileMatches = (userOneId, userTwoId) => {
    const userOneMathces = users.find(user => user.uid === userOneId).matches;
    const userTwoMathces = users.find(user => user.uid === userTwoId).matches;
    db.collection('users').doc(userOneId).update({
      matches: [...userOneMathces, userTwoId],
    })
    // Tuk pravim i novite chatRoomove!
    const chatRoomDocId = userOneId > userTwoId ? `${userTwoId}_${userOneId}` : `${userOneId}_${userTwoId}`;
    db.collection('chatRooms').doc(chatRoomDocId).set({
      messages: [],
      users: [userOneId, userTwoId],
      isTyping: false, 
    })
      .then(() => console.log("Successfully created chatRoom with users: ", [userOneId, userTwoId]))
      .catch((error) => console.log("Error on chatRoom creation: ", error.message))
    // .then(console.log('VVVV updateProfileMatches sme i update-nahme uspeshno matches na: ', userOneId))
    db.collection('users').doc(userTwoId).update({
      matches: [...userTwoMathces, userOneId],
    })
    // .then(console.log('VVVV updateProfileMatches sme i update-nahme uspeshno matches na: ', userTwoId));
    users = users.map(user => {
      if(user.uid === userOneId) {
        user.matches = [...user.matches, userTwoId];
      } else if (user.uid === userTwoId) {
        user.matches = [...user.matches, userOneId];
      }
      return user;
    });
    console.log('users after matching: ', users)
    dispatch({
      type: 'getAllUsers',
      payload: users,
    })
  }

  // TODO: да се зареждат картичките, които не се движат, иначе покажа и тези, които летят още...

  const updateDB = (arrProp, userIdToBeAdded) => {
    
    db.collection('users').doc(currentUser.uid).update({
      [arrProp]: [...currentUser[arrProp], userIdToBeAdded],
    })
    .then(() => {
      currentUser[arrProp].push(userIdToBeAdded);
      dispatch({ type: 'userLoggedIn', payload: currentUser})
      console.log('Updated currentUser liked Array: ', currentUser[arrProp], ' with: ', userIdToBeAdded)
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });

    outOfFrame(userIdToBeAdded)

    console.log('characters: ', characters, ' sa setnati na ', charactersState, ' a filteredUsers sa ', filteredUsers)
    arrProp === 'liked' && db.collection('users').doc(userIdToBeAdded).get()
      .then(doc => {
        if (doc.data().liked.includes(currentUser.uid)) {
          // We are updating the matches of currentUser and lokedUser
          updateProfileMatches(currentUser.uid, userIdToBeAdded)
        }
      })
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = characters.map(person => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!

      charactersState = charactersState.filter(character => character.name !== toBeRemoved);
      // setCharacters(charactersState);

      // const userIdToBeAdded = cardsLeft[cardsLeft.length - 1].uid;
      // const arrProp = dir === 'right' ? 'liked' : 'disliked';

      // updateDB(arrProp, userIdToBeAdded);
    }
  }

  const changeViewState = () => {
    setIsSwipeView(!isSwipeView);
  }

  return (
    <div> 
      <button onClick={() => {
        let refs = db.collection('users').where('liked', 'array-contains', 'iRAJrtLOEtO92cbkP4ZYOC0nNMv2'); //!important
        refs.get().then((querySnapshot) => {
          // console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, ' => ', doc.data());
            });
        });
      }}>find who liked me</button>

      {isSwipeView ? (
        <div style={{width: '85%', margin: '0 auto'}}>
          <ViewModuleIcon onClick={changeViewState}/>
          <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
          <h1>React Tinder Card</h1>
          <div className='cardContainer'>
            {characters.map((character, index) =>
              <TinderCard ref={childRefs[index]} className='swipe' key={character.uid} onSwipe={(dir) => {
                swiped(dir, character.name, character.uid);
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