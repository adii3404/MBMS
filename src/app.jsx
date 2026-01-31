import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import Login from './Pages/Login.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import StaffDashboard from './Pages/StaffDashboard.jsx';
import Profile from './Pages/Profile.jsx';
import ChangePassword from './Pages/ChangePassword.jsx';
import BillingDashbord from './Pages/BillingDashboard.jsx';
// Component to protect routes (checks if user is logged in)
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

         {/* Protected Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

         {/* Protected Routes */}
        <Route path="/billing-dashboard" element={
          <ProtectedRoute>
            <BillingDashbord />
          </ProtectedRoute>
        } />

        <Route path="/staff-dashboard" element={
          <ProtectedRoute>
            <StaffDashboard />
          </ProtectedRoute>
        } />
      
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/change-password" element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;