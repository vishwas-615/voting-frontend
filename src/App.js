import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import ElectionList from './components/Elections/ElectionList';
import CandidateList from './components/Candidates/CandidateList';
import Results from './components/Results/Results';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>

          <Route path="/elections" element={
            <PrivateRoute>
              <ElectionList />
            </PrivateRoute>
          } />

          <Route path="/candidates/:electionTitle" element={
            <PrivateRoute>
              <CandidateList />
            </PrivateRoute>
          }/>

          <Route path="/results" element={
            <PrivateRoute>
              <Results />
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
