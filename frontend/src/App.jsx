import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ClientRegister from "./pages/ClientRegister/ClientRegister";
import Packages from './pages/Packages/Packages';
import Home from './pages/Home/Home';
import About from './pages/AboutUs/About';
import Contact from './pages/Contact/Contact';
import Services from './pages/Services/Services';
import RPO from './pages/RPO/RPO';
import Talents from './pages/Talents/Talents';
import Testimonial from './pages/Testimonial/Testimonial';
import TestimonialDetail from './pages/TestimonialDetail/TestimonialDetail';
import ClientDetail from './pages/ClientDetail/ClientDetail';
import ClientNewPassword from './pages/ClientNewPassword/ClientNewPassword';
import ClientSignup from './pages/ClientSignup/ClientSignup';
import ClientLogin from './pages/ClientLogin/ClientLogin';
import CandidateRegister from './pages/CandidateRegister/CandidateRegister';
// import Chat from './pages/Chat/Chat';
// import LiveChat from './pages/Chat/LiveChat';
import PDFViewer from './pages/pdfViewer';
import CandidateLogin from './pages/CandidateLogin/CandidateLogin';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import RecruiterLogin from './pages/RecruiterLogin/RecruiterLogin';
import HomeCandidate from './pages/HomeCandidate/HomeCandidate';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard/RecruiterDashboard';

function App() {
  
  return (
    <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/candidate-home' element={<HomeCandidate />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/services' element={<Services />} />
          <Route path='/rpo' element={<RPO />} />
          <Route path='/talents' element={<Talents />} />
          <Route path='/testimonial' element={<Testimonial />} />
          <Route path='/testimonial-detail' element={<TestimonialDetail />} />
          <Route path='/pdf' element={<PDFViewer />} />
          {/* <Route path='/live-chat' element={<LiveChat />} /> */}
          <Route path='/client-register' element={<ClientRegister />} />
          <Route path='/client-signup' element={<ClientSignup />} />
          <Route path='/candiate-register' element={<CandidateRegister />} />
          <Route path='/client-login' element={<ClientLogin />} />
          <Route path='/candidate-login' element={<CandidateLogin />} />
          <Route path='/pdf' element={<PDFViewer />} />
          {/* <Route path='/live-chat' element={<LiveChat />} /> */}
          <Route path='/packages' element={<Packages />} />
          <Route path='/client-detail' element={<ClientDetail />} />
          {/* <Route path='/client-recruiter-chat' element={<Chat />} /> */}
          <Route path='/:id' element={<ClientNewPassword />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/recruiter-login' element={<RecruiterLogin />} />
          <Route path='/client-dashboard' element={<ClientDashboard />} />
          <Route path='/candidate-dashboard' element={<CandidateDashboard />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/recruiter-dashboard' element={<RecruiterDashboard />} />
        </Routes>
    </AuthContextProvider>
  );
}

export default App;
