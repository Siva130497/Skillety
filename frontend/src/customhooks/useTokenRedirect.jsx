import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useTokenRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const staffToken = localStorage.getItem('staffToken');
    const candidateToken = localStorage.getItem('candidateToken');
    const clientToken = localStorage.getItem('clientToken');

    if (adminToken || staffToken || candidateToken || clientToken) {
      alert(`You already login as ${adminToken ? "ADMIN" : staffToken ? "STAFF" : candidateToken ? "CANDIDATE" : "CLIENT"}`);
      if (clientToken) {
        navigate('/client-dashboard');
      } else if (adminToken) {
        navigate('/admin-dashboard');
      } else if (staffToken) {
        navigate('/recruiter-dashboard');
      } else if (candidateToken) {
        navigate('/candidate-dashboard');
      }
    }
  }, [navigate]);
};

export default useTokenRedirect;
