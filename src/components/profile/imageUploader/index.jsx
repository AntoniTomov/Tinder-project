import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'relative',
        height: '300px',
        width: '170px',
        margin: '30px',
        backgroundColor: 'rgba(255,255,255,0.5)',
        '& .MuiFab-root:hover': {
            backgroundColor: 'lightgray',
        },
        '& input': {
            display: 'none'
        }
    },
    divImg: {
        height: '300px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    smallBtn: {
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '40px',
        height: '40px',
        '& .MuiSvgIcon-root': {
            width: '20px'
        },
        color: '#e66465',
        background: '#9198e5',
    },
}));

const ImageUploaderContainer = ({id}) => {
    const classes = useStyles();
    const [image, setImage] = useState('');

    const handleUploadClick = (e) => {
        const data = e.target;
        if (data.files && data.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(data.files[0]);

            reader.onloadend = function (e) {
                console.log('target', e.target);
                setImage(reader.result);
            }
        }
    }

    return (
        <>
            <Paper elevation={6} className={classes.paper}>
                <div className={classes.divImg} style={{ backgroundImage: `url(${image})` }}></div>
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