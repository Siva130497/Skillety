import { Route, Routes } from 'react-router-dom';
import './App.css';
 import ClientDashboard from './pages/ClientDashboard';

function App() {
  return (
    <Routes>
      <Route path='/client-dashboard' element={<ClientDashboard />} />
    </Routes>
  );
}

export default App;
