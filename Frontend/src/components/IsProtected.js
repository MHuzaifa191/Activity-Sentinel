import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const IsProtected = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default IsProtected;
