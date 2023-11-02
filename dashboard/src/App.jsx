import { Route, Routes } from 'react-router-dom';
import './App.css';
 import ClientDashboard from './pages/ClientDashboard/ClientDashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ClientDashboard />} />
    </Routes>
  );
}

export default App;
