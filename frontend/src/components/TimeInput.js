import React from 'react';
import { TextField } from '@mui/material';

function TimeInput({ label, minutes, seconds, onMinutesChange, onSecondsChange }) {
  const containerStyle = {
    display: 'flex', // Use flex display to align items inline
    alignItems: 'center', // Center align the items vertically
    gap: '8px', // Add gap between items
  };

  const labelStyle = {
    marginRight: '8px', // Add some space after the label
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <TextField
        type="number"
        label="Min"
        value={minutes}
        onChange={onMinutesChange}
        InputProps={{ inputProps: { min: 0, max: 59 } }}
        size="small"
        variant="outlined"
      />
      <span>:</span>
      <TextField
        type="number"
        label="Sec"
        value={seconds}
        onChange={onSecondsChange}
        InputProps={{ inputProps: { min: 0, max: 59 } }}
        size="small"
        variant="outlined"
      />
    </div>
  );
}

export default TimeInput;
