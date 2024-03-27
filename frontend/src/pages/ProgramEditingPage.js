// ProgramEditingPage.js

import React, { useState,useEffect  } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrainingDayColumn from '../components/TrainingDayColumn';
import { Box, Container, Button, TextField, MenuItem, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { createProgram, updateProgram, getProgram, createTrainingDay, deleteTrainingDay, getTrainingDaysByProgramId,updateTrainingDay } from '../services/api';

function ProgramEditingPage() {
  const [programName, setProgramName] = useState('');
  const [durationNumber, setDurationNumber] = useState(4);
  const [durationUnit, setDurationUnit] = useState('weeks');
  const [programType, setProgramType] = useState('');
  const [daysInMicrocycle, setDaysInMicrocycle] = useState(7);
  const [currentStep, setCurrentStep] = useState(1);
  const [trainingDays, setTrainingDays] = useState([]);
  const { programId } = useParams();
  const navigate = useNavigate();
  const isEditing = programId != null;
  const [newProgramId, setNewProgramId] = useState(null); // Add this state to manage the new program ID

  useEffect(() => {
    if (programId) {
      fetchProgramData(programId);
    }
  }, [programId]);

  useEffect(() => {
    const loadOrCreateInitialTrainingDays = async () => {
      try {
        const response = await getTrainingDaysByProgramId(programId);
        if (response.data.length < daysInMicrocycle) {
          // Create missing days up to daysInMicrocycle
          for (let i = response.data.length; i < daysInMicrocycle; i++) {
            await createTrainingDay({
              program: programId,
              name: i + 1,
              restday: false // Assuming default is not a rest day, adjust as needed
            });
          }
          // Reload to include newly created days
          const updatedResponse = await getTrainingDaysByProgramId(programId);
          setTrainingDays(updatedResponse.data);
        } else {
          setTrainingDays(response.data.slice(0, daysInMicrocycle));
        }
      } catch (error) {
        console.error('Error managing initial training days:', error);
      }
    };
    // Step 2: Load or create up to daysInMicrocycle training days
    if (currentStep === 2 && programId) {
      loadOrCreateInitialTrainingDays();
    }
  }, [currentStep, programId, daysInMicrocycle,]);


  useEffect(() => {
    // Update training days when the unit or number changes
    if (durationNumber && durationUnit) {
      const totalDays = durationUnit.startsWith('microcycle') ? durationNumber * daysInMicrocycle : durationNumber * 7;
      setTrainingDays(Array.from({ length: totalDays }, (_, i) => ({ id: i + 1 })));
    }
  }, [durationNumber, durationUnit, daysInMicrocycle]);

  useEffect(() => {
    // Automatically adjust unit between singular and plural
    if (durationNumber === 1) {
      setDurationUnit(prevUnit => prevUnit.endsWith('s') ? prevUnit.slice(0, -1) : prevUnit);
    } else if (durationNumber > 1 && !durationUnit.endsWith('s')) {
      setDurationUnit(prevUnit => prevUnit + 's');
    }
  }, [durationNumber, durationUnit]);
  
  useEffect(() => {
    if (newProgramId) {
      // If there's a new program ID, navigate to the edit page for the new program
      navigate(`/edit-program/${newProgramId}`);
    }
  }, [newProgramId, navigate]);


  const fetchProgramData = async (id) => {
  try {
    const response = await getProgram(id);
    const programData = response.data;

    setProgramName(programData.name);
    setProgramType(programData.type);

    // Parsing the duration parts and setting the number and unit
    const durationParts = programData.duration.split(' ');
    if (durationParts.length === 2) {
      setDurationNumber(durationParts[0]);
      setDurationUnit(durationParts[1].toLowerCase());
    }

    // Update daysInMicrocycle from the fetched program data
    setDaysInMicrocycle(programData.days_in_microcycle);
  } catch (error) {
    console.error('Error fetching program data:', error);
  }
};
  const handleBack = async () => {
    if (currentStep === 1) {
      navigate('/dashboard');
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
     }
  }

  const handleSave = async () => {
    if (currentStep === 1) {
      const newProgramData = {
        user: localStorage.getItem('userId'),
        name: programName,
        duration: `${durationNumber} ${durationUnit}`,
        days_in_microcycle: daysInMicrocycle, // Include this in your payload
        completion_percentage: 0,
        adherence_percentage: 0,
        type: programType,
        // Include training days data if needed
      };
    
      try {
        if (!isEditing) {
          const response = await createProgram(newProgramData);
          if (response && response.data && response.data.id) {
            setNewProgramId(response.data.id); // This triggers the useEffect for navigation
            console.log('Program created successfully with ID:', response.data.id);
          } else {
            console.error('Unexpected response:', response);
          }
        } else {
          // Update existing program
          await updateProgram(programId, newProgramData);
          console.log('Program updated successfully');
          setCurrentStep(2); // Proceed to the next step for existing program
        }
      } catch (error) {
        console.error('Failed to save program:', error);
      }
      
    } else if (currentStep === 2) {
      
      await adjustTrainingDays(); // Ensure this runs only after any required updates are done
      
      
      setCurrentStep(3);

    } else if (currentStep === 3) {
      for (const day of trainingDays) {
        await updateTrainingDay(day.id, { restday: !day.isTrainingDay });
      }
      navigate('/dashboard'); // Navigate to dashboard after saving
     }
  };
  
  const calculateTotalDaysNeeded = ()  => {
    // Calculate and return the total number of training days needed based on durationNumber and durationUnit
    return durationNumber * daysInMicrocycle;
  };

  const adjustTrainingDays = async () => {
    const totalDaysNeeded = calculateTotalDaysNeeded(); // This function doesn't need to be async
    const response = await getTrainingDaysByProgramId(programId);
    const currentDays = response.data;

    // If there are more current days than needed, delete the excess
    if (currentDays.length > totalDaysNeeded) {
        const daysToDelete = currentDays.slice(totalDaysNeeded);
        await Promise.all(daysToDelete.map(day => deleteTrainingDay(day.id)));
    }

    // If fewer days than needed, create the additional days
    if (currentDays.length < totalDaysNeeded) {
        for (let i = currentDays.length; i < totalDaysNeeded; i++) {
            await createTrainingDay({
                program: programId,
                name: i + 1,
                restday: false // Adjust based on your logic
            });
        }
    }

    // Fetch and update the list of training days
    const updatedResponse = await getTrainingDaysByProgramId(programId);
    setTrainingDays(updatedResponse.data);
};


  /*
  const addTrainingDay = () => {
    setTrainingDays([...trainingDays, { id: trainingDays.length + 1 }]);
  };

  const deleteTrainingDay = (dayId) => {
    setTrainingDays(trainingDays.filter(day => day.id !== dayId));
  };
  */
  const durationUnits = durationNumber === '1'
  ? [{ value: 'week', label: 'Week' }, { value: 'microcycle', label: 'Microcycle' }]
  : [{ value: 'weeks', label: 'Weeks' }, { value: 'microcycles', label: 'Microcycles' }];

  useEffect(() => {
    // Reset days in microcycle to 7 when switching back to weeks
    if (durationUnit === 'weeks' || durationUnit === 'week') {
      setDaysInMicrocycle(7);
    }
  }, [durationUnit]);

  useEffect(() => {
    console.log('Training Days Updated:', trainingDays);
  }, [trainingDays]);

  const onToggleRestDay = async (dayId, isRestDay) => {
    try {
      // Update the state locally
      const updatedTrainingDays = trainingDays.map(day =>
        day.id === dayId ? { ...day, isRestDay } : day
      );
      setTrainingDays(updatedTrainingDays);
  
      // Send the update to the server
      await updateTrainingDay(dayId, { restday: isRestDay });
    } catch (error) {
      console.error('Error updating rest day:', error);
    }
  };
  

  
  const renderContent = () => {
    if (currentStep === 1) {
      // Return form for program creation
      return (
          <Container component="main" className="content-container" sx={{ mt: 8, mb: 2 }}>
            <h2>Program Creation</h2>
            <TextField
              label="Program Name"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ mb: 2, input: { color: 'black' } }} // Add input style
            />
            <Grid container spacing={2}>

              <Grid item xs={6}>
                <TextField
                  label="Duration Number"
                  type="number"
                  value={durationNumber}
                  onChange={(e) => setDurationNumber(e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{ input: { color: 'black' } }} // Add input style
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  label="Duration Unit"
                  value={durationUnit}
                  onChange={(e) => {
                    const newUnit = e.target.value;
                    setDurationUnit(newUnit || 'weeks'); // Set to 'weeks' if newUnit is empty
                  }}
                  variant="outlined"
                  fullWidth
                  sx={
                    {
                      '& .MuiOutlinedInput-input': {
                        color: 'black', // Style for text color of selected value
                      },
                    }
                  }
                >
                  {durationUnits.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={{ color: 'black' }}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>


              {(durationUnit === 'microcycle' || durationUnit ==='microcycles') && (
                <Grid item xs={6}>
                  <TextField
                    label="Days in Microcycle"
                    type="number"
                    value={daysInMicrocycle}
                    onChange={(e) => setDaysInMicrocycle(Number(e.target.value))}
                    variant="outlined"
                    fullWidth
                    sx={{ input: { color: 'black' } }}
                  />
                </Grid>
              )}

            </Grid>
              <TextField
                label="Type"
                value={programType}
                onChange={(e) => setProgramType(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mb: 2, mt: 2, input: { color: 'black' } }} // Add input style
              />

            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>   

              <Button variant="contained" color="primary" onClick={handleSave} sx={{ mb: 2 }}>
                Next
              </Button>
           
              <Button variant="contained" color="primary" onClick={handleBack} sx={{ mb: 2 }}>
                Back
              </Button>
            </div>
          </Container>
      );
    } else if (currentStep === 2) {
      return (
        <Container component="main" className="content-container" sx={{ mt: 8, mb: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mb: 2 }}>
              Next
            </Button>

            <Button variant="contained" color="primary" onClick={handleBack} sx={{ mb: 2 }}>
              Back
            </Button>
          </div>
          <div className="training-days-wrapper" style={{ display: 'flex', flexDirection:  'column', gap: '10px' }}>
            {trainingDays.map((day, index) => (

              (index % daysInMicrocycle === 0) && (
                <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                  {trainingDays.slice(index, daysInMicrocycle).map(subDay => (
                    <TrainingDayColumn
                      key={subDay.id}
                      id={subDay.id}
                      dayNumber={subDay.name}
                      isRestDay={subDay.isRestDay} // Ensure this matches your state's structure
                      onToggleRestDay={onToggleRestDay}
                    />                 
                   ))}
                </div>
              )
            ))}
          </div>
        </Container>
      )
    } else if (currentStep === 3) {
      return (
        <Container component="main" className="content-container" sx={{ mt: 8, mb: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mb: 2 }}>
              Save Program
            </Button>

            <Button variant="contained" color="primary" onClick={handleBack} sx={{ mb: 2 }}>
              Back
            </Button>
          </div>

          <div className="training-days-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {Array.from({ length: Math.ceil(trainingDays.length / daysInMicrocycle) }, (_, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            {trainingDays
              .slice(rowIndex * daysInMicrocycle, (rowIndex + 1) * daysInMicrocycle)
              .map(subDay => (
                    <TrainingDayColumn
                      key={subDay.id}
                      id={subDay.id}
                      dayNumber={subDay.name}
                      isRestDay={subDay.isRestDay} // Ensure this matches your state's structure
                      onToggleRestDay={onToggleRestDay}
                    />              
                   ))}
          </div>
        ))}
      </div>
        </Container>
      )
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
     <Navbar />
     
      {renderContent()}
      
     <Footer />
    </Box>
  );
}

export default ProgramEditingPage;