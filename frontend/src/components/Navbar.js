import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api'; // Import the function


const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Fitness App
        </Typography>
        <Button color="inherit" onClick={() => navigate('/dashboard')}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate('/profile')}>
          Profile
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
