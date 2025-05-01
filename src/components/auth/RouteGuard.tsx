
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface RouteGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const RouteGuard = ({ children, allowedRoles }: RouteGuardProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You can show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and authorized
  return <>{children}</>;
};
