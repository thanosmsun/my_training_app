// WorkoutCreationPage.js
import React, { useState, useEffect } from 'react';
import SetRow from '../components/SetRow';
import ExerciseFilter from '../components/ExerciseFilter';
import {
  Button,
  Container,
  Typography,
  Box,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchAllExercises, fetchMuscles } from '../services/api';



function WorkoutCreationPage() {
  const [setGoals, setSetGoals] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentSetId, setCurrentSetId] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [muscles, setMuscles] = useState([]); // Add muscles state
  // Deduce exercise types from fetched exercises
  const [exerciseTypes, setExerciseTypes] = useState([]);

  useEffect(() => {
      const loadData = async () => {
          const exercisesData = await fetchAllExercises();
          setExercises(exercisesData);
          // Deduce exercise types from exercises
          const types = [...new Set(exercisesData.map(exercise => exercise.exercise_type))];
          setExerciseTypes(types);

          // Assuming fetchMuscles is similar to fetchAllExercises
          const musclesData = await fetchMuscles();
          setMuscles(musclesData);
      };
      loadData();
  }, []);


    const handleOpenExerciseFilter = (setId) => {
        setCurrentSetId(setId);
        setIsFilterOpen(true);
    };

    const handleSelectExercise = (exercise) => {
        const updatedSetGoals = setGoals.map((setGoal, index) => {
            if (index === currentSetId) {
                // Update setGoal to include exercise ID and name
                return { ...setGoal, exerciseId: exercise.id, exerciseName: exercise.name };
            }
            return setGoal;
        });
        setSetGoals(updatedSetGoals);
        setIsFilterOpen(false);
    };

    const handleChange = (setId, attribute, value) => {
        const updatedGoals = setGoals.map((set, index) => {
            if (index === setId) {
                return { ...set, [attribute]: value };
            }
            return set;
        });
        setSetGoals(updatedGoals);
    };

    const addNewSet = () => {
        setSetGoals([...setGoals, { exerciseId: null, exerciseName: '' }]);
    };

    const handleDeleteSet = (setId) => {
        const updatedSetGoals = setGoals.filter((_, index) => index !== setId);
        setSetGoals(updatedSetGoals);
      };
      

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <CssBaseline />
          <Navbar />
          <Container component="main" sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>Workout Creation</Typography>
            
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="workout set table">
                <TableHead>
                  <TableRow>
                    <TableCell>Exercise</TableCell>
                    <TableCell align="right">Set Number</TableCell>
                    <TableCell align="right">Weight</TableCell>
                    <TableCell align="right">Reps</TableCell>
                    <TableCell align="right">RPE</TableCell>
                    <TableCell align="right">Rest</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {setGoals.map((setGoal, index) => (
                    <SetRow
                      key={index}
                      setId={index}
                      setGoal={setGoal}
                      handleChange={handleChange}
                      handleOpenExerciseFilter={() => handleOpenExerciseFilter(index)}
                      handleDeleteSet={() => handleDeleteSet(index)}
                      exerciseName={setGoal.exerciseName}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
    
            <Button onClick={addNewSet} variant="contained" color="primary" sx={{ mt: 2 }}>
              Add New Set
            </Button>
            
            {isFilterOpen && (
              <ExerciseFilter
                open={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onSelectExercise={handleSelectExercise}
                exercises={exercises}
                exerciseTypes={exerciseTypes}
                muscles={muscles}
              />
            )}
          </Container>
          <Footer />
        </Box>
      );
}
    

export default WorkoutCreationPage;
