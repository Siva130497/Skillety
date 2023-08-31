import { Route, Routes} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ClientRegister from "./pages/ClientRegister/ClientRegister";
import Packages from './pages/Packages/Packages';
import Home from './pages/Home/Home';
import ClientDetail from './pages/ClientDetail/ClientDetail';
import ClientNewPassword from './pages/ClientNewPassword/ClientNewPassword';
import ClientLogin from './pages/ClientLogin/ClientLogin';
import CandidateRegister from './pages/CandidateRegister/CandidateRegister';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';





function App() {
  return (
    
        <AuthContextProvider>
          <Layout>
            <Routes >
              <Route path='/' element={<Home />}/>
              <Route path='/client-register' element={<ClientRegister />}/>
              <Route path='/packages' element={<Packages />}/>
              <Route path='/client-detail' element={<ClientDetail />}/>
              <Route path=':id' element={<ClientNewPassword />}/>
              <Route path='/candiate-register' element={<CandidateRegister />}/>
              <Route path='/client-login' element={<ClientLogin />}/>
              <Route path='/client-dashboard' element={<ClientDashboard />}/>
            </Routes>
          </Layout>
        </AuthContextProvider>
    
    
  )
};

export default App;
