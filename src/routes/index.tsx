import React from 'react';
import { AuthProvider } from './AuthProvider';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default Routes;
