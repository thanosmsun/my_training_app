import React, { useState, useEffect } from 'react';
import { TextField, IconButton, InputAdornment, TableCell, TableRow, Tooltip } from '@mui/material';
import TimeInput from './TimeInput'; // Assuming TimeInput is in the same directory
import DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // For toggling range

function SetRow({ setId, setGoal, handleChange, handleOpenExerciseFilter, exerciseName, handleDeleteSet }) {
  const [showRange, setShowRange] = useState({
    setNumber: false,
    weight: false,
    reps: false,
    RPE: false,
    rest: false,
  });

  useEffect(() => {
    // Automatically adjust max values or clear them based on range visibility
    Object.keys(showRange).forEach(attribute => {
      if (!showRange[attribute]) {
        // Clear the max value if the range is not shown
        handleChange(setId, `${attribute}_max`, '');
      } else {
        // Ensure max is at least equal to min when showing range
        const min = parseFloat(setGoal[`${attribute}_min`] || 0);
        let max = parseFloat(setGoal[`${attribute}_max`] || 0);
        if (max < min) {
          handleChange(setId, `${attribute}_max`, min.toString());
        }
      }
    });
  }, [showRange, setGoal, handleChange, setId]);
    


    const updateRestTime = (minOrMax, minutes, seconds) => {
      const totalSeconds = (parseInt(minutes, 10) || 0) * 60 + (parseInt(seconds, 10) || 0);
      handleChange(setId, `rest_${minOrMax}`, totalSeconds.toString());
    };
      
  
    const handleRestMinutesChange = (minOrMax, value) => {
      const currentSeconds = setGoal[`rest_${minOrMax}`] % 60;
      const minutes = parseInt(value, 10) || 0;
      updateRestTime(minOrMax, minutes, currentSeconds);
    };
  
    const handleRestSecondsChange = (minOrMax, value) => {
      const currentMinutes = Math.floor((setGoal[`rest_${minOrMax}`] || 0) / 60);
      const seconds = parseInt(value, 10) || 0;
      updateRestTime(minOrMax, currentMinutes, seconds);
    };

  const adjustMaxValueIfNeeded = (attribute) => {
    const min = parseFloat(setGoal[`${attribute}_min`] || 0);
    let max = parseFloat(setGoal[`${attribute}_max`] || 0);
    if (max < min) {
      handleChange(setId, `${attribute}_max`, min.toString());
    }
  };

  const handleInputChange = (attribute, value, isMax = false) => {
    console.log(`Before update: ${attribute}, isMax: ${isMax}, value: ${value}`);

    let processedValue = value;
    if (attribute === 'RPE') {
        // RPE values between 0 to 10 with .5 increment
        processedValue = parseFloat(value); 
        if (processedValue < 0 || processedValue > 10 || isNaN(processedValue)) {
          processedValue = '';
        } else {
          processedValue = (Math.round(processedValue * 2) / 2).toFixed(1);
        }
      } else if (attribute === 'reps' || attribute === 'setNumber'|| attribute === 'rest') {
        // Ensure reps and setNumber are positive integers
        processedValue = parseInt(value, 10);
        processedValue = isNaN(processedValue) || processedValue < 0 ? '' : processedValue;
      } // No else part for rest as it is handled separately

      const field = `${attribute}${isMax ? '_max' : '_min'}`;
      console.log(`After processing: ${attribute}, processedValue: ${processedValue}`);

      handleChange(setId, field, processedValue);
  };

  const handleInputBlur = (attribute, isMax = false) => {
    
    if (attribute === 'weight') {
      // Format weight with one decimal place on blur
      const field = `${attribute}${isMax ? '_max' : '_min'}`;
      const value = setGoal[field];
      const formattedValue = parseFloat(value).toFixed(1);
      handleChange(setId, field, isNaN(formattedValue) ? '' : formattedValue);
    };
    if (attribute !== 'rest') {
      adjustMaxValueIfNeeded(attribute);
    }
  }

  const toggleRange = (attribute) => {
    setShowRange(prev => {
        const newShowRange = { ...prev, [attribute]: !prev[attribute] };
        if (!newShowRange[attribute]) {
            // Clear the max value if the range is not shown
            handleChange(setId, `${attribute}_max`, '');
        } else {
            adjustMaxValueIfNeeded(attribute);
        }
        return newShowRange;
    });
  };

  
  return (
     <TableRow>
      {/* Exercise Name/Button Cell */}
      <TableCell>
        <Tooltip title={exerciseName ? "Edit Exercise" : "Select Exercise"}>
          <IconButton onClick={() => handleOpenExerciseFilter(setId)} size="small">
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        {exerciseName || "Select Exercise"}
      </TableCell>
      
     
    {/* Dynamically generated cells for each attribute */}
    {Object.entries(showRange).map(([attribute, isRangeActive]) => (
      <React.Fragment key={attribute}>
        {/* Handling for the 'rest' attribute with TimeInput component */}
        {attribute === 'rest' ? (

          <TableCell align="right" colSpan={1}>
            <TimeInput
              label="Rest Min"
              minutes={Math.floor((setGoal[`rest_min`] || 0) / 60)}
              seconds={(setGoal[`rest_min`] || 0) % 60}
              onMinutesChange={(e) => handleRestMinutesChange('min', e.target.value)}
              onSecondsChange={(e) => handleRestSecondsChange('min', e.target.value)}
            />
            {isRangeActive && (
              <>
                <span>-</span>
                <TimeInput
                  label="Rest Max"
                  minutes={Math.floor((setGoal[`${attribute}_max`] || 0) / 60)}
                  seconds={setGoal[`${attribute}_max`] % 60}
                  onMinutesChange={(e) => handleRestMinutesChange('max', e.target.value)}
                  onSecondsChange={(e) => handleRestSecondsChange('max', e.target.value)}
                />
              </>
            )}
            <IconButton onClick={() => toggleRange(attribute)}>
              <SwapHorizIcon />
            </IconButton>
          </TableCell>
          ):(
            // For all other attributes using TextField
          <TableCell align="right">
          <TextField
            label={`${attribute.charAt(0).toUpperCase() + attribute.slice(1)} Min`}
            type="number"
            size="small"
            fullWidth
            value={setGoal[`${attribute}_min`] || ''}
            onChange={(e) => handleInputChange(attribute, e.target.value)}
            onBlur={() => handleInputBlur(attribute)}
            InputProps={{
              endAdornment: attribute === 'weight' ? <InputAdornment position="end">kg</InputAdornment> : null,
              inputProps: { min: 0,max:attribute === 'RPE' ? 10 : undefined  ,step: attribute === 'RPE' ? 0.5 : 1 },
            }}
          />
          {isRangeActive && (
            <>
              <span>-</span>
              <TextField
                label={`${attribute.charAt(0).toUpperCase() + attribute.slice(1)} Max`}
                type="number"
                size="small"
                fullWidth
                value={setGoal[`${attribute}_max`] || ''}
                onChange={(e) => handleInputChange(attribute, e.target.value,true)}
                onBlur={() => handleInputBlur(attribute,true)}
                InputProps={{
                  endAdornment: attribute === 'weight' ? <InputAdornment position="end">kg</InputAdornment> : null,
                  inputProps: { min: 0,max:attribute === 'RPE' ? 10 : undefined  ,step: attribute === 'RPE' ? 0.5 : 1 },
                }}
              />
            </>
          )}
          <IconButton onClick={() => toggleRange(attribute)}>
            <SwapHorizIcon />
          </IconButton>
        </TableCell>
      )}
      </React.Fragment>
    ))}

    {/* Delete Set Icon Button */}
    <TableCell align="right">
      <IconButton onClick={() => handleDeleteSet(setId)} color="error">
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);
}
export default SetRow;
