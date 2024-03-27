import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from '@mui/material';

function ExerciseFilter({ open, onClose, onSelectExercise, exercises, exerciseTypes, muscles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('');

  // Filter exercises based on the input search term, selected type, and muscle
  const filteredExercises = exercises.filter(exercise => {
    const matchesName = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? exercise.exercise_type === selectedType : true;
    const matchesMuscle = selectedMuscle ? exercise.exmuscles.some(exmuscle => exmuscle.muscle.name === selectedMuscle) : true;
    console.log({exerciseName: exercise.name, matchesName, matchesType, matchesMuscle});
    return matchesName && matchesType && matchesMuscle;
  });

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>Filter Exercises</DialogTitle>
      <DialogContent>
        {/* Search by Name */}
        <TextField
          label="Search by name"
          variant="outlined"
          fullWidth
          margin="dense"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Filter by Type */}
        <FormControl fullWidth margin="normal">
            <InputLabel
                htmlFor="filter-by-type"
                style={{ color: '#000000' }} // Set label text color here
            >
                Filter by Type
            </InputLabel>
            <Select 
                label="Filter by Type" 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <MenuItem value="">
                    <em>Filter by Type</em>
                </MenuItem>
                {exerciseTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                        {type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        {/* Filter by Muscle */}
        <FormControl fullWidth margin="normal">
            <InputLabel
            htmlFor="filter-by-muscle"                         
             >
                Muscle
            </InputLabel>
            <Select
                label= "Muscle"
                value={selectedMuscle} 
                onChange={(e) => setSelectedMuscle(e.target.value)} 
            > 
            <MenuItem value="">
                <em>Filter by Muscle</em>
            </MenuItem>
            {muscles.map((muscle, index) => (
              <MenuItem key={index} value={muscle.name}>{muscle.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Display Filtered Exercises */}
        <List>
          {filteredExercises.map((exercise) => (
            <ListItem button key={exercise.id} onClick={() => onSelectExercise(exercise)}>
              <ListItemText primary={exercise.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}


export default ExerciseFilter;
