import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this path is correct
import { AuthProvider } from './context/AuthContext';
import { MembersProvider } from './context/MembersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <MembersProvider>
        <App />
      </MembersProvider>
    </AuthProvider>
  </React.StrictMode>
);

