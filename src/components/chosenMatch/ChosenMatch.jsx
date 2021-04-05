import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import  Avatar from '@material-ui/core/Avatar';
import { CssBaseline, makeStyles, Grid, GridList, GridListTile, Typography  } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
// import SimpleImageSlider from "react-simple-image-slider";
import FbImageLibrary from 'react-fb-image-grid';
import { useSelector } from 'react-redux';
import './ChosenMatch.module.css'


const useStyles = makeStyles({
    container: {
        width: '40vw',
        minWidth: '400px',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
    },
    name: {
        marginBottom: '3rem',
    },
    textField: {
        fontSize: '1.2rem',
        color: 'rgb(225,225,225)',
        margin: '0 auto',
        width: '100%',
        padding: '0 3rem',
        textAlign: 'center',
    },
});

    
export default function ChosenMatch({ chosenProfileId }) {
    console.log('chosenProfileId', chosenProfileId);
    const styles = useStyles();
    const users = useSelector(state => state.allUsers);
    const [chosenUser, setChosenUser] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const focusedUser = users.find(user => user.uid === chosenProfileId);
        setChosenUser(focusedUser);
        console.log('chosenUser from useEffect: ', chosenUser);
        console.log('chosenProfileId from useEffect: ', chosenProfileId);
    }, [users])

    useEffect(() => {
        const imagesToDisplay = chosenUser?.images.filter(image => image !== '');
        setImages(imagesToDisplay);
    }, [chosenUser])
    
    console.log('chosenUser', chosenUser);
    console.log('images', images);
    return (
        <CssBaseline>
            <div className={styles.container}>
                <h2 className={styles.name}>{chosenUser?.name}</h2>
                <FbImageLibrary
                images={images}
                width={300}
                // countFrom={1}
                renderOverlay={() => <div style={{fontSize: '2rem'}}>Show</div>}
                overlayBackgroundColor="#e66465"
                />
                <h3>About me</h3>
                <div className={styles.textField}>
                    {chosenUser?.aboutYou}
                </div>
                <hr />
                <h3>Passions</h3>
                <div className={styles.textField}>
                    {chosenUser?.passions.join(', ')}
                </div>
                <hr />
                <h3>Gender</h3>
                <div className={styles.textField}>
                    {chosenUser?.gender}
                </div>
                <hr />
                <h3>Sexual orientation</h3>
                <div className={styles.textField}>
                    {chosenUser?.sexualOrientation}
                </div>
                <hr />
                <h3>Living in</h3>
                <div className={styles.textField}>
                    {chosenUser?.country}
                </div>
                <hr />
                <h3>Job title</h3>
                <div className={styles.textField}>
                    {chosenUser?.jobTitle}
                </div>
                <hr />
                <h3>Company</h3>
                <div className={styles.textField}>
                    {chosenUser?.company}
                </div>
                <hr />
                <h3>College</h3>
                <div className={styles.textField}>
                    {chosenUser?.collageOrUni}
                </div>
            </div>
        </CssBaseline>
    )}