import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import CircleSpinner from '../components/loaders/circle-spinner.tsx';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) 
    return <div className='h-96 flex items-center justify-center'><CircleSpinner /></div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;