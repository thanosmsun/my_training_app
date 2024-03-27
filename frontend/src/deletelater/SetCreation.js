import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createSetsGoal } from '../services/api'; // Adjust the path as needed

function SetCreationPage() {
  const [setDetails, setSetDetails] = useState({
    workout: '',
    exercise: '',
    setNumberMin: '',
    setNumberMax: '',
    weightMin: '',
    weightMax: '',
    repsMin: '',
    repsMax: '',
    targetRPEMin: '',
    targetRPEMax: '',
    date: new Date() // Automatically set to current date
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSetDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Prepare data for submission
    const formData = {
      ...setDetails,
      date: setDetails.date.toISOString() // Assuming date needs to be in ISO format
    };
  
    try {
      const response = await createSetsGoal(formData); // Using function from api.js
      if (response.success) {
        console.log('Set created successfully:', response.data);
        // Handle success (e.g., showing a message, redirecting, etc.)
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // Handle errors (e.g., showing an error message)
      console.error('Failed to create SetsGoal:', error);
    }
  };

  return (
    <Container component="main">
      <Navbar />
      <h2>Create a New Set</h2>
      <form onSubmit={handleSubmit}>
        {/* Workout Field */}
        <TextField
          label="Workout"
          name="workout"
          type="text"
          value={setDetails.workout}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Exercise Field */}
        <TextField
          label="Exercise"
          name="exercise"
          type="text"
          value={setDetails.exercise}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Set Number Min Field */}
        <TextField
          label="Set Number Min"
          name="setNumberMin"
          type="number"
          value={setDetails.setNumberMin}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Set Number Max Field */}
        <TextField
          label="Set Number Max"
          name="setNumberMax"
          type="number"
          value={setDetails.setNumberMax}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Weight Min Field */}
        <TextField
          label="Weight Min"
          name="weightMin"
          type="number"
          value={setDetails.weightMin}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Weight Max Field */}
        <TextField
          label="Weight Max"
          name="weightMax"
          type="number"
          value={setDetails.weightMax}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Reps Min Field */}
        <TextField
          label="Reps Min"
          name="repsMin"
          type="number"
          value={setDetails.repsMin}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Reps Max Field */}
        <TextField
          label="Reps Max"
          name="repsMax"
          type="number"
          value={setDetails.repsMax}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Target RPE Min Field */}
        <TextField
          label="Target RPE Min"
          name="targetRPEMin"
          type="number"
          value={setDetails.targetRPEMin}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Target RPE Max Field */}
        <TextField
          label="Target RPE Max"
          name="targetRPEMax"
          type="number"
          value={setDetails.targetRPEMax}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
        {/* Submit Button */}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
        >
          Create Set
        </Button>
      </form>
      <Footer />
    </Container>
  );
  
}

export default SetCreationPage;
