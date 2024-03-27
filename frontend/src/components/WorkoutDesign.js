import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const WorkoutDesign = ({ onPrev, programDetails }) => {
    const [workouts, setWorkouts] = useState(programDetails.workouts || []);

    const addWorkout = () => {
        setWorkouts([...workouts, { id: workouts.length + 1, name: '', sets: '' }]);
    };

    const handleWorkoutChange = (index, field, value) => {
        const updatedWorkouts = workouts.map((workout, i) => {
            if (i === index) {
                return { ...workout, [field]: value };
            }
            return workout;
        });
        setWorkouts(updatedWorkouts);
    };

    return (
        <Container>
            <Typography variant="h5">Workout Design</Typography>
            {workouts.map((workout, index) => (
                <Grid container spacing={2} key={workout.id}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Exercise Name"
                            value={workout.name}
                            onChange={(e) => handleWorkoutChange(index, 'name', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Sets"
                            value={workout.sets}
                            onChange={(e) => handleWorkoutChange(index, 'sets', e.target.value)}
                        />
                    </Grid>
                </Grid>
            ))}
            <Button onClick={addWorkout} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Add Workout
            </Button>
            <Button onClick={onPrev} variant="contained" color="secondary" style={{ marginTop: '20px', marginLeft: '10px' }}>
                Back
            </Button>
        </Container>
    );
};

export default WorkoutDesign;
