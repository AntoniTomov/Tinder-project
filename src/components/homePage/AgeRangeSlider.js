import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useEffect, useState } from 'react';

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
    const [value, setValue] = useState([lowestAge, highestAge]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                {valueText(value).replace(',', ' - ')}
            </Typography>
            <Slider
                style={{color: 'white'}}
                orientation="vertical"
                min={lowestAge}
                max={highestAge}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={() => valueText}
                onChangeCommitted={() => setAgeRange(value)}
            />
        </div>
    );
}