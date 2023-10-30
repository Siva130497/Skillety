import React from 'react'

import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard/RecruiterDashboard';
import { PrimeReactProvider } from 'primereact/api';
import { GoogleOAuthProvider } from '@react-oauth/google';

const AdminPanel = () => {
  return (
    <AuthContextProvider>
      <PrimeReactProvider>
        <GoogleOAuthProvider clientId="844630167314-gr9sc81b599kvna7vhlecf5447ogd9fn.apps.googleusercontent.com">
          <Routes>
            
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/recruiter-dashboard' element={<RecruiterDashboard />} />

          </Routes>
        </GoogleOAuthProvider>
      </PrimeReactProvider>
    </AuthContextProvider>
  )
}

export default AdminPanel