import React from 'react';

// Styles
import './styles/App.css';

// Contexts
import { AlertProvider } from './contexts/AlertContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from './routes/index.tsx';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'NoAuth';

function App() {
  return (
    <div className="App">
      <AlertProvider>
        <AuthProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <AppRoutes />
          </GoogleOAuthProvider>
        </AuthProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
