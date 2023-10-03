import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ClientRegister from "./pages/ClientRegister/ClientRegister";
import Packages from './pages/Packages/Packages';
import Home from './pages/Home/Home';
import About from './pages/AboutUs/About';
import CandidateAboutUs from './pages/CandidateAboutUs/CandidateAboutUs';
import Contact from './pages/Contact/Contact';
import ContactCandidate from './pages/ContactCandidate/ContactCandidate';
import JobDetail from './pages/JobDetail/JobDetail';
import Company from './pages/Company/Company';
import CompanyDetails from './pages/CompanyDetails/CompanyDetails';
import Services from './pages/Services/Services';
import RPO from './pages/RPO/RPO';
import Talents from './pages/Talents/Talents';
import Events from './pages/Events/Events';
import EventDetails from './pages/EventDetails/EventDetails';
import TalentsProfileSearch from './pages/TalentsProfileSearch/TalentsProfileSearch';
import Testimonial from './pages/Testimonial/Testimonial';
import CandidateTestimonial from './pages/CandidateTestimonial/CandidateTestimonial';
import TestimonialDetail from './pages/TestimonialDetail/TestimonialDetail';
import CandidateTestimonialDetail from './pages/CandidateTestimonialDetail/CandidateTestimonialDetail';
import ClientNewPassword from './pages/ClientNewPassword/ClientNewPassword';
import CandidateSignup from './pages/CandidateSignup/CandidateSignup';
import ClientSignup from './pages/ClientSignup/ClientSignup';
import ClientLogin from './pages/ClientLogin/ClientLogin';
import CandidateRegister from './pages/CandidateRegister/CandidateRegister';
// import Chat from './pages/Chat/Chat';
// import LiveChat from './pages/Chat/LiveChat';
// import PDFViewer from './pages/pdfViewer';
import CandidateLogin from './pages/CandidateLogin/CandidateLogin';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import RecruiterLogin from './pages/RecruiterLogin/RecruiterLogin';
import HomeCandidate from './pages/HomeCandidate/HomeCandidate';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard/RecruiterDashboard';
// import Slider from './pages/Slider';
import { PrimeReactProvider } from 'primereact/api';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from './components/GoogleAuth';


function App() {

  return (

    <AuthContextProvider>
      <PrimeReactProvider>
        <GoogleOAuthProvider clientId="844630167314-gr9sc81b599kvna7vhlecf5447ogd9fn.apps.googleusercontent.com">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/googleAuth' element={<GoogleAuth />} />
            {/* <Route path='/slider' element={<Slider />} /> */}
            <Route path='/candidate-home' element={<HomeCandidate />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/candidate-about-us' element={<CandidateAboutUs />} />
            <Route path='/contact-us' element={<Contact />} />
            <Route path='/services' element={<Services />} />
            <Route path='/rpo' element={<RPO />} />
            <Route path='/talents' element={<Talents />} />
            <Route path='/events' element={<Events />} />
            <Route path='/event-details' element={<EventDetails />} />
            <Route path='/talent-profile-search' element={<TalentsProfileSearch />} />
            <Route path='/testimonial' element={<Testimonial />} />
            <Route path='/candidate-testimonial' element={<CandidateTestimonial />} />
            <Route path='/testimonial-detail' element={<TestimonialDetail />} />
            <Route path='/candidate-testimonial-detail' element={<CandidateTestimonialDetail />} />
            <Route path='/talent-contact-us' element={<ContactCandidate />} />
            <Route path='/job-detail' element={<JobDetail />} />
            <Route path='/company' element={<Company />} />
            <Route path='/company-details' element={<CompanyDetails />} />
            {/* <Route path='/pdf' element={<PDFViewer />} /> */}
            {/* <Route path='/live-chat' element={<LiveChat />} /> */}
            <Route path='/client-register' element={<ClientRegister />} />
            <Route path='/client-signup' element={<ClientSignup />} />
            <Route path='/candidate-signup' element={<CandidateSignup />} />
            <Route path='/candiate-register' element={<CandidateRegister />} />
            <Route path='/client-login' element={<ClientLogin />} />
            <Route path='/candidate-login' element={<CandidateLogin />} />
            <Route path='/packages' element={<Packages />} />
            {/* <Route path='/client-recruiter-chat' element={<Chat />} /> */}
            <Route path='/:id' element={<ClientNewPassword />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/recruiter-login' element={<RecruiterLogin />} />
            <Route path='/client-dashboard' element={<ClientDashboard />} />
            <Route path='/candidate-dashboard' element={<CandidateDashboard />} />
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/recruiter-dashboard' element={<RecruiterDashboard />} />
          </Routes>
        </GoogleOAuthProvider>
      </PrimeReactProvider>
    </AuthContextProvider>

  );
}

export default App;
