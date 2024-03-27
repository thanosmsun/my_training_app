import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

function LandingPage() {
  return (
    <Container maxWidth="sm" className="responsive-container text-center" style={{ marginTop: '100px' }}>
      <Box style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)', backgroundColor: '#f4f4f4' }}>
        <Typography 
          variant="h2" 
          gutterBottom 
          style={{  
            textShadow: '4px 4px 10px rgba(0,0,0,0.3)',
            fontWeight: 'bold',
            fontSize: '2.5rem'
          }}
        >        
          Welcome to GainFrame
        </Typography>
        <Typography variant="h5" gutterBottom className="mt-2 mb-2">
          Your Ultimate Fitness Companion
        </Typography>
      
      
      <Box mt={4} className="button-container">
        <Button
          component={Link}
          to="/login"
          variant="contained"
          className="button-primary"
          size="large"
          style={{ marginRight: '20px' }}
        >
          Login
        </Button>
        
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          className="button-secondary"
          size="large"
        >
          Sign Up
        </Button>
      </Box>
      </Box>
    </Container>
  );
}

export default LandingPage;
