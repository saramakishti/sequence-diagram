import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FilterGroup({ config, label, onChange }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        onChange={onChange}
        defaultChecked={false}
        row
        name='row-radio-buttons-group'
      >
        {config.map((el) => {
          return (
            <FormControlLabel
              value={el.value}
              control={<Radio />}
              label={el.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
