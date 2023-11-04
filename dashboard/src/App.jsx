import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboard';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import TalentsProfileSearch from './pages/TalentsProfileSearch/TalentsProfileSearch';
import MyApplication from './pages/MyApplication/MyApplication';
import SettingsCandidate from './pages/SettingsCandidate/SettingsCandidate';
import SettingsClient from './pages/SettingsClient/SettingsClient';
import JobSearch from './pages/JobSearch/JobSearch';
import ManageJobs from './pages/ManageJobs/ManageJobs';
import JobPosting from './pages/JobPosting/JobPosting';


function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<CandidateDashboard />} />
        <Route path='/client-dashboard' element={<ClientDashboard />} />
        <Route path='/talent-profile-search' element={<TalentsProfileSearch />} />
        <Route path='/my-application' element={<MyApplication />} />
        <Route path='/search-jobs' element={<JobSearch />} />
      <Route path='/settings' element={<SettingsCandidate />} />
      <Route path='/client-settings' element={<SettingsClient />} />
      <Route path='/manage-job' element={<ManageJobs />} />
      <Route path='/post-job' element={<JobPosting />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
