import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoutes wraps routes that require authentication (and optionally a specific role).
 * @param {ReactNode} children - The components to render if access is allowed.
 * @param {string} role - Optional user role required to access the route.
 */
const ProtectedRoutes = ({ children, role }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // Redirect to login if not logged in, or if role is provided and doesn't match
  if (!userInfo || (role && userInfo.role !== role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
