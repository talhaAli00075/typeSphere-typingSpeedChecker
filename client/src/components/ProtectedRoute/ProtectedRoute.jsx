import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  console.log("ProtectedRoute rendered. Token:", token);

  if (!token) {
    return (
      <>
        <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
          You are not authorized. Redirecting to login...
        </p>
        <Navigate to="/login" replace />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
