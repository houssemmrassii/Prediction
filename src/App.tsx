import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './Components/MainLayout';
import Dashboard1 from './Components/Dashboard1';
import Dashboard2 from './Components/Dashboard2';
import Dashboard3 from './Components/Dashboard3';
import ChurnPredictionForm from './Components/ChurnPredictionForm';
import CLVPredictionForm from './Components/CLVPredictionForm';
import Login from './Components/login';
import Register from './Components/regester';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard2" />} />
          <Route path="dashboard1" element={<Dashboard1 />} />
          <Route path="dashboard2" element={<Dashboard2 />} />
          <Route path="dashboard3" element={<Dashboard3 />} />
          <Route path="churn-prediction-form" element={<ChurnPredictionForm />} />
          <Route path="clv-prediction-form" element={<CLVPredictionForm />} />
          <Route path="*" element={<Navigate to="/dashboard1" />} />
        </Route>

        {/* Redirect any other route to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
