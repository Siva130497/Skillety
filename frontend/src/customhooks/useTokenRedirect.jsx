import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import AuthContext from '../context/AuthContext';
import { auth } from '../firebase/firebaseConfig';

const useTokenRedirect = () => {
  const navigate = useNavigate();
  const { getProtectedData } = useContext(AuthContext);

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

      const fetchData = async () => {
          try {
              const userData = await getProtectedData();
              console.log(userData);
              if(userData.userToken){
                  auth.signOut()
                    .then(() => {
                      showErrorMessage("You have been logged out successfully. See you soon.")
                    })
                    .catch((error) => {
                      showErrorMessage('Error logging out:', error);
                      // Handle logout error if needed
                    });
              }
          } catch (error) {
              console.error(error);
          }
      };

    if (clientToken) {
      // navigate("/client-home");
      localStorage.removeItem("clientToken");
      showErrorMessage("You have been logged out successfully. See you soon.")
    }else if (candidateToken){
      // navigate("/")
      localStorage.removeItem("candidateToken");
      showErrorMessage("You have been logged out successfully. See you soon.")
    }

    fetchData();
    
  }, [navigate]);
};

export default useTokenRedirect;
