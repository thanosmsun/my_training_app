import React, { useState, useEffect } from 'react';
import { fetchUserDetailsById } from '../services/api'; // Import the function
import { Container, Typography, Box, Paper } from '@mui/material';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    user_type: '',
    address: '',
    card_information: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      try {
        const userDetails = await fetchUserDetailsById(userId);
        if (userDetails) {
          setUserData(userDetails);
        } else {
          console.error('Unexpected response format:', userDetails);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <Container maxWidth="sm">
      <Navbar />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
        <Paper elevation={3} sx={{ padding: 3, marginTop: 2, width: '100%', bgcolor: 'primary.dark', color: 'text.primary' }}>
          <Typography variant="h5" gutterBottom>User Profile</Typography>
          <Typography variant="body1"><b>Username:</b> {userData.username}</Typography>
          <Typography variant="body1"><b>Email:</b> {userData.email}</Typography>
          <Typography variant="body1"><b>User Type:</b> {userData.user_type}</Typography>
          <Typography variant="body1"><b>Address:</b> {userData.address}</Typography>
          <Typography variant="body1"><b>Card Information:</b> {userData.card_information}</Typography>
        </Paper>
      </Box>
      <Footer />
    </Container>
  );
};

export default Profile;
