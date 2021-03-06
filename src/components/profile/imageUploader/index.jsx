import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CircularProgress from '@material-ui/core/CircularProgress';

import firebase from '../../../firebase';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'relative',
        height: '200px',
        width: '130px',
        margin: '13px 13px',
        backgroundColor: 'rgba(255,255,255,0.5)',
        '& .MuiFab-root:hover': {
            backgroundColor: '#e66465',
            '& .MuiSvgIcon-root': {
                color: 'rgb(225,225,225)'
            },
        },
        '& input': {
            display: 'none'
        }
    },
    divImg: {
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallBtn: {
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '40px',
        height: '40px',
        '& .MuiSvgIcon-root': {
            width: '25px'
        },
        color: '#e66465',
        background: 'rgb(225,225,225)',
    },
    error: {
        color: 'red',
        width: '90%',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0.8)',
    }
}));

const ImageUploaderContainer = ({ id, userId, imgUrl, replaceImgUrl, updateImages }) => {
    const classes = useStyles();
    const [imageError, setImageError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loaderProgress, setLoaderProgress] = useState(null);


    const handleUploadClick = (e) => {

        const data = e.target;
        if (data.files && data.files[0]) {
            let file = data.files[0];

            if (file.size > 6123456){
                setImageError('Image must be less then 6Mb!');
                return;
            }
            setIsLoading(true);
            setImageError('');

            let dotPossition = file.name.lastIndexOf('.');
            let newFileName = file.name.slice(0, dotPossition) + Date.now();
            console.log(newFileName);

            const storageRef = firebase.storage().ref();
            const uploadTask = storageRef.child(`${userId}/${newFileName}`).put(file);
            
            uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setLoaderProgress(progress);

                    // eslint-disable-next-line default-case
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log('An error occurred on image upload ', error.message);
                },
                () => {
                    // Handle successful uploads on complete
                    uploadTask.snapshot.ref.getDownloadURL()
                    .then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        const newImagesArr = async () => await replaceImgUrl(id, downloadURL);
                        newImagesArr().then((images) => updateImages(images));
                        setIsLoading(false);
                    })
                    .catch(err => console.log('Error while uploading the image: ', err.message));
                }
            );
        }
    }

    return (
        <>
            <Paper elevation={6} className={classes.paper}>
                <div className={classes.divImg} style={{backgroundImage: `url(${imgUrl})`}}>
                    {imageError ? <span className={classes.error}>{imageError}</span> : null}
                    {isLoading ? <CircularProgress variant="determinate" value={loaderProgress} /> : null}
                </div>
                <input
                    accept="image/*"
                    className={classes.input}
                    id={`contained-button-file-${id}`}
                    multiple={false}
                    type="file"
                    onChange={e => handleUploadClick(e)}
                />
                <label htmlFor={`contained-button-file-${id}`}>
                    <Tooltip title="Add Photo" arrow TransitionComponent={Zoom} placement='right'>
                        <Fab component="div" className={classes.smallBtn}>
                            <AddPhotoAlternateIcon />
                        </Fab>
                    </Tooltip>
                </label>
            </Paper>
        </>
    )
}

export default ImageUploaderContainer;