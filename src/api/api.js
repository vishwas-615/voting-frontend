import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

// Attach token if needed in future
// API.interceptors.request.use(...);

export const fetchLocations = () => API.get('/locations');
export const registerUser = (user) => API.post('/users', user);
export const loginUser = (data) => API.post('/users/login', data);
export const getUserByEmail = (email) => API.get(`/users?email=${encodeURIComponent(email)}`);

export const fetchElections = (location) =>
  API.get(`/elections?location=${encodeURIComponent(location)}`);

export const fetchCandidates = (electionName) =>
  API.get(`/candidates?electionName=${encodeURIComponent(electionName)}`);

export const voteCandidate = (voteData) => API.post('/votes', voteData);

export const fetchVoteCounts = () => API.get('/votes/counts');
