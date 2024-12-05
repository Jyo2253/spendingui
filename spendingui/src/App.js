// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import only what you need
import LoginRegister from './Components/login-register/login-register';
import Dashboard from './Components/dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to login */}
    </Routes>
  );
}

// Protect the dashboard route by checking if the user is authenticated
const ProtectedRoute = ({ component: Component }) => {
  const token = localStorage.getItem('token'); // Check for token
  return token ? <Component /> : <Navigate to="/" />;
};

export default App;
