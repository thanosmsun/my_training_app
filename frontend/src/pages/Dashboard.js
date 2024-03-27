import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import { Box, Container, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { fetchUserDetailsById, fetchProgramsByUserId, deleteProgram } from '../services/api';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard() {
  const [userDetails, setUserDetails] = useState({});
  const [userPrograms, setUserPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchUserData(userId);
      fetchUserPrograms(userId);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const details = await fetchUserDetailsById(userId);
      setUserDetails(details);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fetchUserPrograms = async (userId) => {
    try {
      const programs = await fetchProgramsByUserId(userId);
      setUserPrograms(programs);
    } catch (error) {
      console.error('Failed to fetch user programs:', error);
    }
  };

  const handleCreateProgramClick = () => {
    navigate('/program-creation');
  };

  const handleEditProgramClick = (programId) => {
    navigate(`/edit-program/${programId}`); // Ensure this route is set up in your routing
  };

  const handleDeleteProgram = async (programId) => {
    await deleteProgram(programId); // Ensure this function is implemented in api.js
    setUserPrograms(userPrograms.filter(program => program.id !== programId));
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Container component="main" className="main-content" sx={{ mt: 8, mb: 2 }}>
        <h2>Welcome, {userDetails.username}</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProgramClick}
          sx={{ mb: 2 }}
        >
          Create New Program
        </Button>
        {userPrograms.length > 0 && (
          <div>
            <h3>Your Programs</h3>
            <List>
              {userPrograms.map((program) => (
                <ListItem key={program.id}>
                  <ListItemText primary={program.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleEditProgramClick(program.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteProgram(program.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        {/* Additional Dashboard Content Here */}
      </Container>
      <Footer />
    </Box>
  );
}

export default Dashboard;
