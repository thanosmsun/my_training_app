// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import setUpAxiosInterceptor from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProgramCreationWizard from './pages/ProgramCreationWizard'; // Assuming this is your new program creation component
import ProgramEditingPage from './pages/ProgramEditingPage';
import WorkoutCreationPage from './pages/WorkoutCreation';
import { ThemeProvider } from '@mui/material/styles';
import theme from './services/theme';
import MuscleSelectionPage from './pages/MuclePrioritization';
setUpAxiosInterceptor();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/program-creation" element={<ProgramCreationWizard />} /> 
          <Route path="/edit-program/:programId" element={<ProgramEditingPage />} />
          <Route path="/workout-creation" element={<WorkoutCreationPage />} />
          <Route path="/muscle-group-selection" element={<MuscleSelectionPage />} />

          {/* Add a redirect for unauthenticated users if necessary */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
