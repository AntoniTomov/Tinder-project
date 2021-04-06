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
    console.log(`Age range: ${value}`)
    return `Age range: ${value}`;
}

export default function AgeRangeSlider({ lowestAge, highestAge, setAgeRange }) {
    const classes = useStyles();
    const [value, setValue] = React.useState([lowestAge, highestAge]);
    
    // TODO handle the debounce better

    const handleChange = (event, newValue) => {
        
        debouncedPassValues(newValue);
    };

    const passValues = (newValue) => {
        console.log('Setvame age range na: ', value)
        setValue(newValue);
        setAgeRange(value);
    }

    function debounce(func, time) {
    let timerId;
    return function (...newValue) {
        clearTimeout(timerId);
        timerId = setTimeout(func, time, ...newValue);
    };
    }

    const debouncedPassValues = debounce(passValues, 1);

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                {valueText(value).replace(',', ' - ')}
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
                getAriaValueText={() => valueText}
                // onMouseUp={passValues}
            />
        </div>
    );
}