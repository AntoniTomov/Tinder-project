import { useEffect, useState } from "react";
import { CssBaseline, makeStyles, Grid, GridList, GridListTile, Typography  } from '@material-ui/core';
import FbImageLibrary from 'react-fb-image-grid';
import { useSelector } from 'react-redux';
import './ChosenUser.module.css'
// import useLocation from 'react-router-dom'

const useStyles = makeStyles({
    container: {
        width: '40vw',
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
        padding: '0 5rem',
        textAlign: 'center',
    },
});

export default function ChosenProfile() {
    const styles = useStyles();
    const chosenUser = useSelector(state => state.chosenProfile);
    const users = useSelector(state => state.allUsers);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const imagesToDisplay = chosenUser?.images.filter(image => image !== '');
        setImages(imagesToDisplay);
    }, [chosenUser])

    return (
        <CssBaseline>
            <div className={styles.container}>
                <h2 className={styles.name}>{chosenUser?.name}</h2>
                <FbImageLibrary
                images={images}
                width={300}
                // countFrom={1}
                renderOverlay={() => <div style={{fontSize: '2rem'}}>Show</div>}
                overlayBackgroundColor="tomato"
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