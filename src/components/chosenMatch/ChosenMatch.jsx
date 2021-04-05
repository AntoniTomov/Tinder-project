import { useEffect, useState } from "react";
import { CssBaseline, makeStyles } from '@material-ui/core';
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

    
export default function ChosenMatch() {
    const styles = useStyles();
    const chosenProfile = useSelector(state => state.chosenProfile);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const imagesToDisplay = chosenProfile.images.filter(image => image !== '');
        setImages(imagesToDisplay);
    }, [chosenProfile])

    return (
        <CssBaseline>
            <div className={styles.container}>
                <h2 className={styles.name}>{chosenProfile?.name}</h2>
                <FbImageLibrary
                images={images}
                width={300}
                // countFrom={1}
                renderOverlay={() => <div style={{fontSize: '2rem'}}>Show</div>}
                overlayBackgroundColor="#e66465"
                />
                <h3>About me</h3>
                <div className={styles.textField}>
                    {chosenProfile?.aboutYou}
                </div>
                <hr />
                <h3>Passions</h3>
                <div className={styles.textField}>
                    {chosenProfile?.passions.join(', ')}
                </div>
                <hr />
                <h3>Gender</h3>
                <div className={styles.textField}>
                    {chosenProfile?.gender}
                </div>
                <hr />
                <h3>Sexual orientation</h3>
                <div className={styles.textField}>
                    {chosenProfile?.sexualOrientation}
                </div>
                <hr />
                <h3>Living in</h3>
                <div className={styles.textField}>
                    {chosenProfile?.country}
                </div>
                <hr />
                <h3>Job title</h3>
                <div className={styles.textField}>
                    {chosenProfile?.jobTitle}
                </div>
                <hr />
                <h3>Company</h3>
                <div className={styles.textField}>
                    {chosenProfile?.company}
                </div>
                <hr />
                <h3>College</h3>
                <div className={styles.textField}>
                    {chosenProfile?.collageOrUni}
                </div>
            </div>
        </CssBaseline>
    )}