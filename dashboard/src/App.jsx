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
import AssignedCandidate from './pages/AssignedCandidates/AssignedCandidate';
import JobEditing from './pages/EditJob/JobEditing';
import InvoicePayment from './pages/InvoicePayment/InvoicePayment';
import PackagePlans from './pages/PackagePlans/PackagePlans';

import JobDetails from './pages/JobDetails/JobDetails';
import ClientProfile from './pages/ClientProfile/ClientProfile';
import CompanyDetail from './pages/CompanyDetail/CompanyDetail';
import AllClientStaff from './pages/AllClientStaff/AllClientStaff';

//ATS
import AtsLogin from './atsPages/AtsLogin/AtsLogin';
import AtsDashboard from './atsPages/AtsDashboard/AtsDashboard';
import OfflineClientCreate from './atsPages/OfflineClientCreate/OfflineClientCreate';
import AllOfflineClients from './atsPages/AllOfflineClients/AllOfflineClients';
import JobPostingATS from './atsPages/JobPostingATS/JobPostingATS';
import ATSJobs from './atsPages/ATSJobs/ATSJobs';
import AppliedCandidateATS from './atsPages/AppliedCandidateATS/AppliedCandidateATS';
import TalentsAtsOnly from './atsPages/TalentsAtsOnly/TalentsAtsOnly';
import AllOfflineCandidates from './atsPages/AllOfflineCandidates/AllOfflineCandidates';
import OfflineCandidateCreate from './atsPages/OfflineCandidateCreate/OfflineCandidateCreate';
import AllCompanyStaffATS from './atsPages/AllCompanyStaffATS/AllCompanyStaffATS';
import AtsReports from './atsPages/AtsReports/AtsReports';
import TeamPerformanceReport from './atsPages/AtsReports/ReportPages/TeamPerformanceReport';
import DailySubmissionReport from './atsPages/AtsReports/ReportPages/DailySubmissionReport';
import CandidateSourceReport from './atsPages/AtsReports/ReportPages/CandidateSourceReport';
import TurnaroundTimeReport from './atsPages/AtsReports/ReportPages/TurnaroundTimeReport';
import ClientReport from './atsPages/AtsReports/ReportPages/ClientReport';
import InterviewReport from './atsPages/AtsReports/ReportPages/InterviewReport';
import LeadConversionReport from './atsPages/AtsReports/ReportPages/LeadConversionReport';
import LeadReport from './atsPages/AtsReports/ReportPages/LeadReport';

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
import RecruiterLogin from './pages/RecruiterLogin/RecruiterLogin';
import JobEditingRecruiter from './pages/EditJob recruiter/JobEditingRecruiter';
import AppliedCandidateRecruiter from './pages/AppliedCandidate Recruiter/AppliedCandidateRecruiter';
import AllCompanyStaff from './pages/AllCompanyStaff/AllCompanyStaff';
import CandidateCreate from './pages/CandidateCreate/CandidateCreate';
import CreateCandidate from './pages/CreateCandidate/CreateCandidate';
import CreateClient from './pages/CreateClient/CreateClient';
import TalentsProfileSearchAts from './pages/TalentsProfileSearchAts/TalentsProfileSearchAts';
import TalentsAts from './pages/TalentsAts/TalentsAts';
import JobSearchAts from './pages/JobSearchAts/JobSearchAts';
import JobDetailsAts from './pages/JobDetailsAts/JobDetailsAts';

import CandidateChat from './pages/Chat/CandidateChat';
import ClientChat from './pages/Chat/ClientChat';
import CandidateChatSupport from './pages/CandidateChat/CandidateChatSupport';
import ClientChatSupport from './pages/ClientChat/ClientChatSupport';

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
        <Route path='/post-job/:token' element={<JobPosting />} />
        <Route path='/manage-application' element={<ManageApplication />} />
        <Route path='/candidate-profile/:id' element={<CandidateProfile />} />
        <Route path='/talents/:id' element={<Talents />} />
        <Route path='/job-detail/:id' element={<JobDetails />} />
        <Route path='/applied-candidate/:id' element={<AppliedCandidate />} />
        <Route path='/assigned-candidate/:id' element={<AssignedCandidate />} />
        <Route path='/edit-job/:id' element={<JobEditing />} />
        <Route path='/invoice-payment' element={<InvoicePayment />} />
        <Route path='/package-plans' element={<PackagePlans />} />
        <Route path='/job-details' element={<JobDetails />} />
        <Route path='/client-profile/:id' element={<ClientProfile />} />
        <Route path='/company-detail/:id' element={<CompanyDetail />} />
        <Route path='/client-staff' element={<AllClientStaff />} />
        <Route path='/candidate-chat-support' element={<CandidateChatSupport/>} />
        <Route path='/client-chat-support' element={<ClientChatSupport/>} />

        {/*ATS*/}
        <Route path='/ats' element={<AtsLogin />} />
        <Route path='/ats-dashboard/:token' element={<AtsDashboard />} />
        <Route path='/offline-client-create' element={<OfflineClientCreate />} />
        <Route path='/all-offline-clients' element={<AllOfflineClients />} />
        <Route path='/job-posting-ats' element={<JobPostingATS />} />
        <Route path='/all-ats-jobs' element={<ATSJobs />} />
        <Route path='/applied-candidate-ats/:id' element={<AppliedCandidateATS />} />
        <Route path='/talents-ats-only/:id' element={<TalentsAtsOnly />} />
        <Route path='/all-offline-candidates' element={<AllOfflineCandidates />} />
        <Route path='/offline-candidate-create' element={<OfflineCandidateCreate />} />
        <Route path='/all-company-staff-ats' element={<AllCompanyStaffATS />} />

        <Route path='/ats-reports' element={<AtsReports />} />
        <Route path='/team-performance-report' element={<TeamPerformanceReport />} />
        <Route path='/daily-submission-report' element={<DailySubmissionReport />} />
        <Route path='/candidate-source-report' element={<CandidateSourceReport />} />
        <Route path='/lead-report' element={<LeadReport />} />
        <Route path='/turnaround-time-report' element={<TurnaroundTimeReport />} />
        <Route path='/client-report' element={<ClientReport />} />
        <Route path='/interview-report' element={<InterviewReport />} />
        <Route path='/lead-conversion-report' element={<LeadConversionReport />} />


        {/* for recruiter */}
        <Route path='/' element={<RecruiterLogin />} />
        <Route path='/recruiter-dashboard/:token' element={<RecruiterDashboard />} />
        <Route path='/all-clients' element={<AllClients />} />
        <Route path='/all-candidates' element={<AllCandidates />} />
        <Route path='/all-jobs' element={<AllJobs />} />
        <Route path='/non-approval-jobs' element={<NonApprovalJobs />} />
        <Route path='/posted-jobs' element={<PostedJobs />} />
        <Route path='/job-posting' element={<PostingJob />} />
        <Route path='/media-posting/:type' element={<EventPosting />} />
        <Route path='/posted-media/:type' element={<PostedEvents />} />
        <Route path='/enquiry-details' element={<EnquiryDetails />} />
        <Route path='/candidate-contact-message' element={<CandidateContact />} />
        <Route path='/client-contact-message' element={<ClientContact />} />
        <Route path='/edit-job-recruiter/:id' element={<JobEditingRecruiter />} />
        <Route path='/applied-candidate-recruiter/:id' element={<AppliedCandidateRecruiter />} />
        <Route path='/chat-candidate' element={<CandidateChat />} />
        <Route path='/chat-client' element={<ClientChat />} />
        {/* <Route path='/candidate-create' element={<CandidateCreate />} /> */}
        <Route path='/create-candidate' element={<CreateCandidate />} />
        <Route path='/create-client' element={<CreateClient />} />
        <Route path='/talent-profile-search-ats' element={<TalentsProfileSearchAts />} />
        <Route path='/talents-ats/:id' element={<TalentsAts />} />
        <Route path='/search-jobs-ats' element={<JobSearchAts />} />
        <Route path='/job-detail-ats/:id' element={<JobDetailsAts />} />

        {/* admin pages */}
        <Route path='/all-company-staff' element={<AllCompanyStaff />} />

      </Routes>
    </AuthContextProvider>
  );
}

export default App;
