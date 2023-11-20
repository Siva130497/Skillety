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
import Talents from './pages/Talents/Talents';
import AppliedCandidate from './pages/AppliedCandidate/AppliedCandidate';
import JobEditing from './pages/EditJob/JobEditing';
import InvoicePayment from './pages/InvoicePayment/InvoicePayment';
import PackagePlans from './pages/PackagePlans/PackagePlans';

import JobDetails from './pages/JobDetails/JobDetails';

////for recruiter
import RecruiterDashboard from './pages/RecruiterDashboard/RecruiterDashboard';
import AllClients from './pages/AllClients/AllClients';
import AllCandidates from './pages/AllCandidates/AllCandidates';
import AllJobs from './pages/AllJobs/AllJobs';
import PostedJobs from './pages/PostedJobs/PostedJobs';
import PostingJob from './pages/PostingJob/PostingJob';
import EventPosting from './pages/EventPosting/EventPosting';
import PostedEvents from './pages/PostedEvents/PostedEvents';
import EnquiryDetails from './pages/EnquiryDetails/EnquiryDetails';
import CandidateContact from './pages/CandidateContact/CandidateContact';
import ClientContact from './pages/ClientContact/ClientContact';
import NonApprovalJobs from './pages/NonApprovalJobs/NonApprovalJobs';


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
        <Route path='/candidate-profile/:id' element={<CandidateProfile />} />
        <Route path='/talents/:id' element={<Talents />} />
        <Route path='/job-detail/:id' element={<JobDetails />} />
        <Route path='/applied-candidate/:id' element={<AppliedCandidate />} />
        <Route path='/edit-job/:id' element={<JobEditing />} />
        <Route path='/invoice-payment' element={<InvoicePayment />} />
        <Route path='/package-plans' element={<PackagePlans />} />
        <Route path='/job-details' element={<JobDetails />} />

        {/* for recruiter */}
        <Route path='/recruiter-dashboard/:token' element={<RecruiterDashboard />} />
        <Route path='/all-clients' element={<AllClients />} />
        <Route path='/all-candidates' element={<AllCandidates />} />
        <Route path='/all-jobs' element={<AllJobs />} />
        <Route path='/non-approval-jobs' element={<NonApprovalJobs />} />
        <Route path='/posted-jobs' element={<PostedJobs />} />
        <Route path='/job-posting' element={<PostingJob />} />
        <Route path='/event-posting' element={<EventPosting />} />
        <Route path='/posted-events' element={<PostedEvents />} />
        <Route path='/enquiry-details' element={<EnquiryDetails />} />
        <Route path='/candidate-contact-message' element={<CandidateContact />} />
        <Route path='/client-contact-message' element={<ClientContact />} />

      </Routes>
    </AuthContextProvider>
  );
}

export default App;
