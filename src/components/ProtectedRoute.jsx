import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userId = localStorage.getItem('userId');
    return userId ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
