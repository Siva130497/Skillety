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
import ManageApplication from './pages/ManageApplication/ManageApplication';
import CandidateProfile from './pages/CandidateProfile/CandidateProfile';


function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/:token' element={<CandidateDashboard />} />
        <Route path='/client-dashboard/:token' element={<ClientDashboard />} />
        <Route path='/talent-profile-search' element={<TalentsProfileSearch />} />
        <Route path='/my-application' element={<MyApplication />} />
        <Route path='/search-jobs' element={<JobSearch />} />
        <Route path='/settings' element={<SettingsCandidate />} />
        <Route path='/client-settings' element={<SettingsClient />} />
        <Route path='/manage-job' element={<ManageJobs />} />
        <Route path='/post-job' element={<JobPosting />} />
        <Route path='/manage-application' element={<ManageApplication />} />
        <Route path='/candidate-profile' element={<CandidateProfile />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
