import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from './LoadingSpinner';
import { useTheme } from '../hooks/useTheme';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: string;
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireRole,
  fallbackPath = '/'
}) => {
  const { isAuthenticated, loading, hasRole, user } = useAuth();
  const { isDarkMode } = useTheme();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#29323c] via-[#3a4550] to-[#485563]' 
          : 'bg-gradient-to-br from-[#fdfbfb] via-[#f4f6f7] to-[#ebedee]'
      }`}>
        <LoadingSpinner isDarkMode={isDarkMode} />
      </div>
    );
  }

  // If not authenticated, redirect to home page (they can click sign in there)
  if (!isAuthenticated) {
    console.log('ProtectedRoute: User not authenticated, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // If specific role required and user doesn't have it, redirect to fallback
  if (requireRole && !hasRole(requireRole)) {
    console.log('ProtectedRoute: User lacks required role:', requireRole, 'User roles:', user?.roles);
    return <Navigate to={fallbackPath} replace />;
  }

  // User is authenticated and has required role - allow access
  console.log('ProtectedRoute: Access granted to', location.pathname);
  return <>{children}</>;
};