import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import HomePage from './HomePage';
import LoadingSpinner from '@/components/LoadingSpinner';

const Index: React.FC = () => {
  const { user } = useApp();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <HomePage />;
};

export default Index;
