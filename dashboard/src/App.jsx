import { Route, Routes } from 'react-router-dom';
import './App.css';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboard';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import MyApplication from './pages/MyApplication/MyApplication';
import SettingsCandidate from './pages/SettingsCandidate/SettingsCandidate';
import SettingsClient from './pages/SettingsClient/SettingsClient';

function App() {
  return (
    <Routes>
      <Route path='/' element={<CandidateDashboard />} />
      <Route path='/client-dashboard' element={<ClientDashboard />} />
      <Route path='/my-application' element={<MyApplication />} />
      <Route path='/settings' element={<SettingsCandidate />} />
      <Route path='/client-settings' element={<SettingsClient />} />
    </Routes>
  );
}

export default App;
