// src/components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from './Loading';
import { ROUTES } from '../utils/constants';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protected Route component that redirects to login if user is not authenticated
 */
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return <Loading fullScreen text="Loading..." />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
}

export default ProtectedRoute;
