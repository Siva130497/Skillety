import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboard';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import TalentsProfileSearch from './pages/TalentsProfileSearch/TalentsProfileSearch';


function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<CandidateDashboard />} />
        <Route path='/client-dashboard/:token' element={<ClientDashboard />} />
        <Route path='/talent-profile-search/:clientToken' element={<TalentsProfileSearch />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
