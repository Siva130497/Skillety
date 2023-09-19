import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ClientRegister from "./pages/ClientRegister/ClientRegister";
import Packages from './pages/Packages/Packages';
import Home from './pages/Home/Home';
import About from './pages/AboutUs/About';
import Contact from './pages/Contact/Contact';
import Services from './pages/Services/Services';
import RPO from './pages/RPO/RPO';
import ClientDetail from './pages/ClientDetail/ClientDetail';
import ClientNewPassword from './pages/ClientNewPassword/ClientNewPassword';
import ClientLogin from './pages/ClientLogin/ClientLogin';
import CandidateRegister from './pages/CandidateRegister/CandidateRegister';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
// import Chat from './pages/Chat/Chat';
// import LiveChat from './pages/Chat/LiveChat';
import PDFViewer from './pages/pdfViewer';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboard';
import CandidateLogin from './pages/CandidateLogin/CandidateLogin';


function App() {
  
  return (
    <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/services' element={<Services />} />
          <Route path='/rpo' element={<RPO />} />
          <Route path='/pdf' element={<PDFViewer />} />
          {/* <Route path='/live-chat' element={<LiveChat />} /> */}
          <Route path='/client-register' element={<ClientRegister />} />
          <Route path='/candiate-register' element={<CandidateRegister />} />
          <Route path='/client-login' element={<ClientLogin />} />
          <Route path='/candidate-login' element={<CandidateLogin />} />
          <Route path='/pdf' element={<PDFViewer />} />
          {/* <Route path='/live-chat' element={<LiveChat />} /> */}
          <Route path='/packages' element={<Packages />} />
          <Route path='/client-detail' element={<ClientDetail />} />
          <Route path='/client-dashboard' element={<ClientDashboard />} />
          <Route path='/candidate-dashboard' element={<CandidateDashboard />} />
          {/* <Route path='/client-recruiter-chat' element={<Chat />} /> */}
          <Route path='/:id' element={<ClientNewPassword />} />
        </Routes>
    </AuthContextProvider>
  );
}

export default App;
