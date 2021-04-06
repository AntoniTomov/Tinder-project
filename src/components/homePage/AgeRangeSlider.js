import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        height: 200,
    },
});

function valueText(value) {
    return `Age range: ${value}`;
}

export default function AgeRangeSlider({ lowestAge, highestAge, setAgeRange }) {
    const classes = useStyles();
    const [value, setValue] = React.useState([lowestAge, highestAge]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const passValues = () => {
        setAgeRange(value);
    }

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Age range
            </Typography>
            <Slider
                style={{color: 'white'}}
                orientation="vertical"
                min={lowestAge+1}
                max={highestAge}
                value={value}
                // step={5}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valueText}
                onMouseUp={passValues}
            />
        </div>
    );
}