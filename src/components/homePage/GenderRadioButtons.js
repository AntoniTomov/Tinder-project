import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

export default function GenderRadioButtons({setGenderValue}) {
  const useStyles = makeStyles({
    root: {
      '& legend':{
        color: 'white',
      },
    },
  });

  const [value, setValue] = React.useState('all');

  const handleChange = (event) => {
    setValue(event.target.value);
    setGenderValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup display="flex" aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="female" control={<Radio color="secondary"/>} label="Female" />
        <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
        <FormControlLabel value="other" control={<Radio color="default"/>} label="Other" />
        <FormControlLabel value="all" control={<Radio color="default"/>} label="All" />
      </RadioGroup>
    </FormControl>
  );
}