import React, { useState } from 'react';
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProgramCreationWizard() {
  const [programType, setProgramType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (programType === 'bodybuilding') {
      navigate('/muscle-group-selection'); // Adjust this path as necessary
    } else {
      alert('This feature is still in development.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Create a New Program</Typography>
      <RadioGroup
        aria-label="program type"
        name="program-type"
        value={programType}
        onChange={(e) => setProgramType(e.target.value)}
        sx={{ mb: 2 }}
      >
        <FormControlLabel value="running" control={<Radio />} label="Running" />
        <FormControlLabel value="powerlifting" control={<Radio />} label="Powerlifting" />
        <FormControlLabel value="bodybuilding" control={<Radio />} label="Bodybuilding" />
      </RadioGroup>
      <Button variant="contained" onClick={handleSubmit}>Next</Button>
    </Box>
  );
}

export default ProgramCreationWizard;
