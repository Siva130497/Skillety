import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const useTokenRedirect = () => {
  const navigate = useNavigate();

  //for show error message for payment
  function showErrorMessage(message) {
    Swal.fire({
        title: 'Alert!',
        text: message,
        icon: 'info',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
    });
}

  useEffect(() => {
    
    const candidateToken = JSON.parse(localStorage.getItem('candidateToken'));
    const clientToken = JSON.parse(localStorage.getItem('clientToken'));
    // const staffToken = JSON.parse(localStorage.getItem('staffToken'));


    if (clientToken) {
      // navigate("/");
      localStorage.removeItem("clientToken");
      showErrorMessage("You have been signed out by the previous user.")
    }else if (candidateToken){
      // navigate("/candidate-home")
      localStorage.removeItem("candidateToken");
      showErrorMessage("You have been signed out by the previous user.")
    }

    
  }, [navigate]);
};

export default useTokenRedirect;
