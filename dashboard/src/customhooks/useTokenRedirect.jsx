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
    
    const staffToken = JSON.parse(localStorage.getItem('staffToken'));


    if (staffToken) {
      // navigate("/");
      localStorage.removeItem("staffToken");
      showErrorMessage("You have been logged out from the previous user!")
    }

    
  }, [navigate]);
};

export default useTokenRedirect;
