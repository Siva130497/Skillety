import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ClientRegister from "./pages/ClientRegister/ClientRegister";
import Packages from './pages/Packages/Packages';
import Home from './pages/Home/Home';
import About from './pages/AboutUs/About';
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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path='/pdf' element={<PDFViewer />} />
          {/* <Route path='/live-chat' element={<LiveChat />} /> */}
          <Route path='/client-register' element={<ClientRegister />} />
          <Route path='/packages' element={<Packages />} />
          <Route path='/client-detail' element={<ClientDetail />} />
          <Route path='/candiate-register' element={<CandidateRegister />} />
          <Route path='/client-login' element={<ClientLogin />} />
          <Route path='/candidate-login' element={<CandidateLogin />} />
          <Route path='/client-dashboard' element={<ClientDashboard />} />
          <Route path='/candidate-dashboard' element={<CandidateDashboard />} />
          {/* <Route path='/client-recruiter-chat' element={<Chat />} /> */}
          <Route path='/:id' element={<ClientNewPassword />} />
        </Routes>
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
