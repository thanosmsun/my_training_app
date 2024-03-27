import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';




const setUpAxiosInterceptor = () => {
  axios.interceptors.request.use(
    config => {
      const url = config.url;
      // Exclude login and register URLs from the interceptor
      if (!url.includes('/login/') && !url.includes('/register/')) {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    },
    error => Promise.reject(error)
  );
};
setUpAxiosInterceptor();

export const getTrainingDaysByProgramId = async (programId) => {
  return axios.get(`${API_BASE_URL}/training_days/?program=${programId}`);
};

// Fetch muscles
export const fetchMuscles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/muscles/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching muscles:', error);
    throw error;
  }
};


export const fetchFilteredExercises = async ({ searchTerm = '', selectedType = '', isBodyweight = false, selectedMuscle = '' }) => {
  let query = `${API_BASE_URL}/exercises/?`;

  // Ensure we're encoding the parameters to handle spaces and special characters.
  if (searchTerm) query += `name=${encodeURIComponent(searchTerm)}&`;
  if (selectedType) query += `exercise_type=${encodeURIComponent(selectedType)}&`;
  if (isBodyweight !== undefined) query += `is_bodyweight=${isBodyweight ? 'true' : 'false'}&`;
  if (selectedMuscle) query += `muscle=${encodeURIComponent(selectedMuscle)}&`;

  try {
    const response = await axios.get(query.slice(0, -1)); // Remove the last '&' for cleanliness
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered exercises:', error);
    throw error;
  }
};


// Fetch all exercises
export const fetchAllExercises = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exercises/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

export const fetchProgramsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/programs/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};



const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error);
    throw error;
  }
};

// Fetch Current User Data based on JWT Token
const fetchUserDetailsById = async (userId) => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};


const setAuthHeaders = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

const logoutUser = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('username');
  // Add any other user data clearances here
};

// User Information Functions
const fetchCurrentUser = async () => {
  setAuthHeaders(localStorage.getItem('jwtToken'));
  return axios.get(`${API_BASE_URL}/users/current`);
};

const fetchUserById = async (userId) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`);
};

// Data Management Functions
const fetchAllUsers = async () => {
  return axios.get(`${API_BASE_URL}/users/`);
};

const updateUser = async (userId, userData) => {
  return axios.put(`${API_BASE_URL}/users/${userId}`, userData);
};

const deleteUser = async (userId) => {
  return axios.delete(`${API_BASE_URL}/users/${userId}`);
};

// Utility Functions
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code that falls out of the range of 2xx
    console.error('Data:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }
  console.error('Config:', error.config);
};

// Program-related operations
export const createProgram = async (programData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/programs/`, programData);
    return response.data;
  } catch (error) {
    console.error('Error creating program:', error);
    throw error;
  }
};



export const getProgram = async (programId) => {
  return axios.get(`${API_BASE_URL}/programs/${programId}/`);
};

export const updateProgram = async (programId, programData) => {
  return axios.put(`${API_BASE_URL}/programs/${programId}/`, programData);
};

export const deleteProgram = async (programId) => {
  return axios.delete(`${API_BASE_URL}/programs/${programId}/`);
};

export const createExercise = async (exerciseData) => {
  return axios.post(`${API_BASE_URL}/exercises/`, exerciseData);
};

//used
export const getExercise = async (exerciseId) => {
  return axios.get(`${API_BASE_URL}/exercises/${exerciseId}/`);
};

export const updateExercise = async (exerciseData, exerciseId) => {
  return axios.put(`${API_BASE_URL}/exercise_muscles/${exerciseId}/`, exerciseData);
};

export const deleteExercise = async (exerciseId) => {
  return axios.delete(`${API_BASE_URL}/exercise_muscles/${exerciseId}/`);
};

export const createExerciseMuscle = async (exerciseMuscleData) => {
  return axios.post(`${API_BASE_URL}/exercise_muscles/`, exerciseMuscleData);
};

export const getExerciseMuscle = async (exerciseMuscleId) => {
  return axios.get(`${API_BASE_URL}/exercise_muscles/${exerciseMuscleId}/`);
};

export const updateExerciseMuscle = async (exerciseMuscleId, exerciseMuscleData) => {
  return axios.put(`${API_BASE_URL}/exercise_muscles/${exerciseMuscleId}/`, exerciseMuscleData);
};

export const deleteExerciseMuscle = async (exerciseMuscleId) => {
  return axios.delete(`${API_BASE_URL}/exercise_muscles/${exerciseMuscleId}/`);
};

export const createTrainerProgram = async (trainerProgramData) => {
  return axios.post(`${API_BASE_URL}/trainer_programs/`, trainerProgramData);
};

export const getTrainerProgram = async (trainerProgramId) => {
  return axios.get(`${API_BASE_URL}/trainer_programs/${trainerProgramId}/`);
};

export const updateTrainerProgram = async (trainerProgramId, trainerProgramData) => {
  return axios.put(`${API_BASE_URL}/trainer_programs/${trainerProgramId}/`, trainerProgramData);
};

export const deleteTrainerProgram = async (trainerProgramId) => {
  return axios.delete(`${API_BASE_URL}/trainer_programs/${trainerProgramId}/`);
};

export const createTrainingDay = async (trainingDayData) => {
  try {
    return axios.post(`${API_BASE_URL}/training_days/`, trainingDayData);
  } catch (error) {
    console.error('Failed to create training day:', error.response ? error.response.data : error);
    throw error; // Rethrow or handle as needed
  }
};

export const getTrainingDay = async (trainingDayId) => {
  return axios.get(`${API_BASE_URL}/training_days/${trainingDayId}/`);
};

export const updateTrainingDay = async (trainingDayId, trainingDayData) => {
  return axios.put(`${API_BASE_URL}/training_days/${trainingDayId}/`, trainingDayData);
};

export const deleteTrainingDay = async (trainingDayId) => {
  return axios.delete(`${API_BASE_URL}/training_days/${trainingDayId}/`);
};

export const createSetsGoal = async (setsGoalData) => {
  return axios.post(`${API_BASE_URL}/sets_goals/`, setsGoalData);
};

export const getSetsGoal = async (setsGoalId) => {
  return axios.get(`${API_BASE_URL}/sets_goals/${setsGoalId}/`);
};

export const updateSetsGoal = async (setsGoalId, setsGoalData) => {
  return axios.put(`${API_BASE_URL}/sets_goals/${setsGoalId}/`, setsGoalData);
};

export const deleteSetsGoal = async (setsGoalId) => {
  return axios.delete(`${API_BASE_URL}/sets_goals/${setsGoalId}/`);
};

export const createSetLogged = async (setLoggedData) => {
  return axios.post(`${API_BASE_URL}/sets_logged/`, setLoggedData);
};

export const getSetLogged = async (setLoggedId) => {
  return axios.get(`${API_BASE_URL}/sets_logged/${setLoggedId}/`);
};

export const updateSetLogged = async (setLoggedId, setLoggedData) => {
  return axios.put(`${API_BASE_URL}/sets_logged/${setLoggedId}/`, setLoggedData);
};

export const deleteSetLogged = async (setLoggedId) => {
  return axios.delete(`${API_BASE_URL}/sets_logged/${setLoggedId}/`);
};

export const createRunningSetsGoal = async (runningSetsGoalData) => {
  return axios.post(`${API_BASE_URL}/running_sets_goals/`, runningSetsGoalData);
};

export const getRunningSetsGoal = async (runningSetsGoalId) => {
  return axios.get(`${API_BASE_URL}/running_sets_goals/${runningSetsGoalId}/`);
};

export const updateRunningSetsGoal = async (runningSetsGoalId, runningSetsGoalData) => {
  return axios.put(`${API_BASE_URL}/running_sets_goals/${runningSetsGoalId}/`, runningSetsGoalData);
};

export const deleteRunningSetsGoal = async (runningSetsGoalId) => {
  return axios.delete(`${API_BASE_URL}/running_sets_goals/${runningSetsGoalId}/`);
};

export const createRunningSetsLogged = async (runningSetsLoggedData) => {
  return axios.post(`${API_BASE_URL}/running_sets_logged/`, runningSetsLoggedData);
};

export const getRunningSetsLogged = async (runningSetsLoggedId) => {
  return axios.get(`${API_BASE_URL}/running_sets_logged/${runningSetsLoggedId}/`);
};

export const updateRunningSetsLogged= async (runningSetsLoggedId, runningSetsLoggedData) => {
  return axios.put(`${API_BASE_URL}/running_sets_logged/${runningSetsLoggedId}/`, runningSetsLoggedData);
};

export const deleteRunningSetsLogged = async (runningSetsLoggedId) => {
  return axios.delete(`${API_BASE_URL}/running_sets_logged/${runningSetsLoggedId}/`);
};

export const createGoal = async (goalData) => {
  return axios.post(`${API_BASE_URL}/goals/`, goalData);
};

export const getGoal = async (goalId) => {
  return axios.get(`${API_BASE_URL}/goals/${goalId}/`);
};

export const updateGoal = async (goalId, goalData) => {
  return axios.put(`${API_BASE_URL}/goals/${goalId}/`, goalData);
};

export const deleteGoal = async (goalId) => {
  return axios.delete(`${API_BASE_URL}/goals/${goalId}/`);
};

export const createWeightLog = async (weightLogData) => {
  return axios.post(`${API_BASE_URL}/weight_logs/`, weightLogData);
};

export const getWeightLog = async (weightLogId) => {
  return axios.get(`${API_BASE_URL}/weight_logs/${weightLogId}/`);
};

export const updateWeightLog = async (weightLogId, weightLogData) => {
  return axios.put(`${API_BASE_URL}/weight_logs/${weightLogId}/`, weightLogData);
};

export const deleteWeightLog = async (weightLogId) => {
  return axios.delete(`${API_BASE_URL}/weight_logs/${weightLogId}/`);
};

export const createDietLog = async (dietLogData) => {
  return axios.post(`${API_BASE_URL}/diet_logs/`, dietLogData);
};

export const getDietLog = async (dietLogId) => {
  return axios.get(`${API_BASE_URL}/diet_logs/${dietLogId}/`);
};

export const updateDietLog = async (dietLogId, dietLogData) => {
  return axios.put(`${API_BASE_URL}/diet_logs/${dietLogId}/`, dietLogData);
};

export const deleteDietLog = async (dietLogId) => {
  return axios.delete(`${API_BASE_URL}/diet_logs/${dietLogId}/`);
};

export const createMeasurement = async (measurementData) => {
  return axios.post(`${API_BASE_URL}/measurements/`, measurementData);
};

export const getMeasurement = async (measurementId) => {
  return axios.get(`${API_BASE_URL}/measurements/${measurementId}/`);
};

export const updateMeasurement = async (measurementId, measurementData) => {
  return axios.put(`${API_BASE_URL}/measurements/${measurementId}/`, measurementData);
};

export const deleteMeasurement = async (measurementId) => {
  return axios.delete(`${API_BASE_URL}/measurements/${measurementId}/`);
};

export const createWorkout = async (workoutData) => {
  return axios.post(`${API_BASE_URL}/workouts/`, workoutData);
};

export const getWorkout = async (workoutId) => {
  return axios.get(`${API_BASE_URL}/workouts/${workoutId}/`);
};

export const updateWorkout = async (workoutId, workoutData) => {
  return axios.put(`${API_BASE_URL}/workouts/${workoutId}/`, workoutData);
};

export const deleteWorkout = async (workoutId) => {
  return axios.delete(`${API_BASE_URL}/workouts/${workoutId}/`);
};

export { 
  loginUser,
  registerUser, 
  logoutUser, 
  fetchCurrentUser, 
  fetchUserById, 
  fetchAllUsers, 
  updateUser, 
  deleteUser, 
  handleError,
  fetchUserDetailsById,
};

export default setUpAxiosInterceptor;
