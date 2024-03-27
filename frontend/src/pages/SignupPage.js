import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { registerUser } from '../services/api'; // Import the function


const SignupPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        user_type: '' // Changed from 'role' to 'user_type'
    });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await registerUser(userData);
        navigate('/login');
      } catch (error) {
        console.error('Signup failed:', error);
      }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth="sm">
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                value={userData.username}
                onChange={handleChange}
                sx={{ mb: 2, input: { color: 'black' } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
                sx={{ mb: 2, input: { color: 'black' } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={handleChange}
                sx={{ mb: 2, input: { color: 'black' } }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>User Type</InputLabel>
                <Select
                  label="User Type"
                  name="user_type"
                  value={userData.user_type}
                  onChange={handleChange}
                  sx={{ 
                    mb: 2,
                    '& .MuiSelect-select': {color: 'black',}
                  }}
                >
                  <MenuItem value="trainee" sx={{ color: 'black' }}>Trainee</MenuItem>
                  <MenuItem value="coach" sx={{ color: 'black' }}>Coach</MenuItem>
                  <MenuItem value="admin"sx={{ color: 'black' }}>Admin</MenuItem>
                  

                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      );
    };
export default SignupPage;
