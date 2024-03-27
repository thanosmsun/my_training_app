import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const ProgramBasics = ({ onNext, onProgramDetailChange, programDetails }) => {
    const handleChange = (e) => {
        onProgramDetailChange({ [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Typography variant="h5">Program Basics</Typography>
            <TextField label="Program Name" name="name" value={programDetails.name} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Description" name="description" value={programDetails.description} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />
            <TextField label="Goals" name="goals" value={programDetails.goals} onChange={handleChange} fullWidth margin="normal" />
            <Button onClick={onNext} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Next
            </Button>
        </Container>
    );
};

export default ProgramBasics;
