import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this path is correct
import { AuthProvider } from './context/AuthContext';
import { MembersProvider } from './context/MembersContext';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
    <AuthProvider>
      <MembersProvider>
        <App />
      </MembersProvider>
    </AuthProvider>
    </React.Suspense>
  </React.StrictMode>
);

