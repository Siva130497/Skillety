
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ClientRegister from "./pages/ClientRegister/ClientRegister";
import Packages from './pages/Packages/Packages';
import Home from './pages/Home/Home';
import About from './pages/AboutUs/About';
import CandidateAboutUs from './pages/CandidateAboutUs/CandidateAboutUs';
import Contact from './pages/Contact/Contact';
import ContactCandidate from './pages/ContactCandidate/ContactCandidate';
import JobSearch from './pages/JobSearch/JobSearch';
import Company from './pages/Company/Company';
import CompanyDetails from './pages/CompanyDetails/CompanyDetails';
import CompanyInformation from './pages/CompanyInformation/CompanyInformation';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';

import Services from './pages/Services/Services';
import ServicesCVSourcing from './pages/Services/ServicesCVSourcing';
import ServicesJobPosting from './pages/Services/ServicesJobPosting';
import ServicesSkillAssessment from './pages/Services/ServicesSkillAssessment';
import ServicesInterviewService from './pages/Services/ServicesInterviewService';
import ServicesOnboardingProcess from './pages/Services/ServicesOnboardingProcess';
import ServicesBackgroundVerification from './pages/Services/ServicesBackgroundVerification';

import RPO from './pages/RPO/RPO';
import Enquiry from './pages/Enquiry/Enquiry';
import Talents from './pages/Talents/Talents';
import Events from './pages/Events/Events';
import EventDetails from './pages/EventDetails/EventDetails';
import TalentsProfileSearch from './pages/TalentsProfileSearch/TalentsProfileSearch';
import Testimonial from './pages/Testimonial/Testimonial';
import CandidateTestimonial from './pages/CandidateTestimonial/CandidateTestimonial';
import TestimonialDetail from './pages/TestimonialDetail/TestimonialDetail';
import CandidateTestimonialDetail from './pages/CandidateTestimonialDetail/CandidateTestimonialDetail';
import CandidateSignup from './pages/CandidateSignup/CandidateSignup';
import ClientSignup from './pages/ClientSignup/ClientSignup';
import ClientLogin from './pages/ClientLogin/ClientLogin';
import CandidateRegister from './pages/CandidateRegister/CandidateRegister';
import LiveChat from './pages/Chat/LiveChat';
// import PDFViewer from './pages/pdfViewer';
import CandidateLogin from './pages/CandidateLogin/CandidateLogin';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import RecruiterLogin from './pages/RecruiterLogin/RecruiterLogin';
import HomeCandidate from './pages/HomeCandidate/HomeCandidate';
// import Slider from './pages/Slider';
import { PrimeReactProvider } from 'primereact/api';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ClientVerification from './pages/ClientVerification/ClientVerification';
import CandidateVerification from './pages/CandidateVerification/CandidateVerification';
import Chat from './pages/Chat/Chat';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard/RecruiterDashboard';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import JobDetails from './pages/JobDetails/JobDetails';
import ErrorPage from './404/404';

import RandomUserChatWeb from './components/RandomUserChatWeb';


function App() {

  return (

    <AuthContextProvider>
      <PrimeReactProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/slider' element={<Slider />} /> */}
            <Route path='/candidate-home' element={<HomeCandidate />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/candidate-about-us' element={<CandidateAboutUs />} />
            <Route path='/contact-us' element={<Contact />} />

            <Route path='/services' element={<Services />} />
            <Route path='/cv-sourcing' element={<ServicesCVSourcing />} />
            <Route path='/job-posting' element={<ServicesJobPosting />} />
            <Route path='/skill-assessment' element={<ServicesSkillAssessment />} />
            <Route path='/interview-as-a-service' element={<ServicesInterviewService />} />
            <Route path='/onboarding-process' element={<ServicesOnboardingProcess />} />
            <Route path='/background-verification' element={<ServicesBackgroundVerification />} />

            <Route path='/rpo' element={<RPO />} />
            <Route path='/enquiry' element={<Enquiry />} />
            <Route path='/talents/:id' element={<Talents />} />
            <Route path='/events' element={<Events />} />
            <Route path='/event-details/:id' element={<EventDetails />} />
            <Route path='/talent-profile-search' element={<TalentsProfileSearch />} />
            <Route path='/testimonial' element={<Testimonial />} />
            <Route path='/candidate-testimonial' element={<CandidateTestimonial />} />
            <Route path='/testimonial-detail' element={<TestimonialDetail />} />
            <Route path='/candidate-testimonial-detail' element={<CandidateTestimonialDetail />} />
            <Route path='/talent-contact-us' element={<ContactCandidate />} />
            <Route path='/job-detail/:id' element={<JobDetails />} />
            <Route path='/job-search' element={<JobSearch />} />
            <Route path='/company' element={<Company />} />
            <Route path='/terms-and-conditions' element={<TermsConditions />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/company-details/:id' element={<CompanyDetails />} />
            {/* <Route path='/pdf' element={<PDFViewer />} /> */}
            <Route path='/live-chat' element={<LiveChat />} />
            <Route path='/real-time-chat' element={<Chat />} />
            <Route path='/client-register' element={<ClientRegister />} />
            <Route path='/client-signup' element={<ClientSignup />} />
            <Route path='/candidate-signup' element={<CandidateSignup />} />
            <Route path='/candiate-register' element={<CandidateRegister />} />
            <Route path='/client-login' element={<ClientLogin />} />
            <Route path='/candidate-login' element={<CandidateLogin />} />
            <Route path='/packages' element={<Packages />} />
            <Route path='/verification/:id' element={<ClientVerification />} />
            <Route path='/verification-cand/:id' element={<CandidateVerification />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            {/* <Route path='/recruiter-login' element={<RecruiterLogin />} /> */}
            <Route path='/forgot-password/:role' element={<ForgotPassword />} />
            <Route path='/client-dashboard' element={<ClientDashboard />} />
            <Route path='/candidate-dashboard' element={<CandidateDashboard />} />
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/recruiter-dashboard' element={<RecruiterDashboard />} />
            <Route path='/company-info/:id' element={<CompanyInformation />} />
            <Route path='*' element={<ErrorPage />}/>

            <Route path='/random-user-chat-web' element={<RandomUserChatWeb />} />

          </Routes>
        </GoogleOAuthProvider>
      </PrimeReactProvider>
    </AuthContextProvider>

  );
}

export default App;
