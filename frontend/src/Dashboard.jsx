import React from 'react'

import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';


import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboard';


import { PrimeReactProvider } from 'primereact/api';
import { GoogleOAuthProvider } from '@react-oauth/google';


const Dashboard = () => {
  return (
    <AuthContextProvider>
      <PrimeReactProvider>
        <GoogleOAuthProvider clientId="844630167314-gr9sc81b599kvna7vhlecf5447ogd9fn.apps.googleusercontent.com">
          <Routes>
            
            <Route path='/client-dashboard' element={<ClientDashboard />} />
            <Route path='/candidate-dashboard' element={<CandidateDashboard />} />

          </Routes>
        </GoogleOAuthProvider>
      </PrimeReactProvider>
    </AuthContextProvider>
  )
}

export default Dashboard