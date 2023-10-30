import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const useTokenRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    const candidateToken = JSON.parse(localStorage.getItem('candidateToken'));
    const clientToken = JSON.parse(localStorage.getItem('clientToken'));

    if (clientToken) {
      navigate("/");
    }else if (candidateToken){
      navigate("/candidate-home")
    }
  }, [navigate]);
};

export default useTokenRedirect;
