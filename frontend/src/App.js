import { Route, Routes} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ClientRegister from "./pages/ClientRegister";
import Packages from './pages/Packages';
import Home from './pages/Home';
import ClientDetail from './pages/ClientDetail';
import ClientNewPassword from './pages/ClientNewPassword';
import ClientLogin from './pages/ClientLogin';
import CandidateRegister from './pages/CandidateRegister';
import ClientDashboard from './pages/ClientDashboard';
import Chat from './pages/Chat';
import PageNotFound from './pages/PageNotFound';





function App() {
  return (
    
        <AuthContextProvider>
          <Layout>
            <Routes >
              <Route path='/' element={<Home />}/>
              <Route path='/client-register' element={<ClientRegister />}/>
              <Route path='/packages' element={<Packages />}/>
              <Route path='/client-detail' element={<ClientDetail />}/>
              <Route path='/candiate-register' element={<CandidateRegister />}/>
              <Route path='/client-login' element={<ClientLogin />}/>
              <Route path='/client-dashboard' element={<ClientDashboard />}/>
              <Route path='/chat' element={<Chat />}/>
              <Route path='/:id' element={<ClientNewPassword />}/>
              <Route path='*' element={<PageNotFound />}/>
            </Routes>
          </Layout>
        </AuthContextProvider>
    
    
  )
};

export default App;
