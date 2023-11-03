import { Route, Routes } from 'react-router-dom';
import './App.css';
import CandidateDashboard from './pages/CandidateDashboard/CandidateDashboard';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<CandidateDashboard />} />
      <Route path='/client-dashboard' element={<ClientDashboard />} />
    </Routes>
  );
}

export default App;
