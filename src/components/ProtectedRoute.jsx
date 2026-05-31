import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a blank or loading state while local storage syncs the session token
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#0063B1] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-xs font-bold text-gray-400">Verifying security token context...</p>
        </div>
      </div>
    );
  }

  // Intercept unauthorized requests and redirect directly to the login panel
  if (!isAuthenticated) {
    console.warn("🔒 [Security Wall] Unauthorized access blocked. Redirecting to login.");
    return <Navigate to="/editor/login" replace />;
  }

  // Authorized: Render the children components safely
  return children;
}
