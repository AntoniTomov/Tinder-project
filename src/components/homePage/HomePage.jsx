import { Hidden } from '@material-ui/core';
import React, { useState, useMemo, useEffect } from 'react';
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card';
import './HomePage.css';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  const users = useSelector(state => state.allUsers.allUsers);
  let charactersState = users;
  const [characters, setCharacters] = useState(users);
  console.log("Characters from homePage: ", characters)
  const [lastDirection, setLastDirection] = useState();
  const [isSwipeView, setIsSwipeView] = useState(true);

  const childRefs = useMemo(() => Array(users.length).fill(0).map(i => React.createRef()), []);

  // setCharacters(users);

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
    charactersState = charactersState.filter(character => character.name !== name);
    setCharacters(charactersState);
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = users.map(person => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  }

  const changeViewState = () => {
    setIsSwipeView(!isSwipeView);
  }

  return (
    <div>
      {isSwipeView ? (
        <div style={{width: '85%', margin: '0 auto'}}>
          <ViewModuleIcon onClick={changeViewState}/>
          <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
          <h1>React Tinder Card</h1>
          <div className='cardContainer'>
            {characters.map((character, index) =>
              <TinderCard ref={childRefs[index]} className='swipe' key={character.uid} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
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
                <Card elevation={20} className="asd" key={user.uid} >
                  <CardActionArea>
                    <CardMedia
                      className="media"
                      image={user.images[0]}
                      title={user.name}
                    />
                    <CardContent>
                    <Typography className="colorBlack" gutterBottom variant="h5" component="h2">
                      {user.name} {user.age}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                      {user.description ? user.description : `From ${user.location}`}
                    </Typography> */}
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="btnContainer">
                    <Button size="small" color="primary">
                    Dislike
                    </Button>
                    <Button size="small" color="primary">
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