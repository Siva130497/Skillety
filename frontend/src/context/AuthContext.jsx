import { createContext, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    //register user
    const registerUser = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5002/register-Client', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const result = response.data;
    
            if (!result.error) {
                console.log(result);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //user login request
    const loginUser = async (userData) => {
        try {
            const response = await axios.post(`http://localhost:5002/${userData[1]}`, userData[0], {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const result = response.data;
    
            if (result.accessToken) {
                console.log(result);
                if (userData[1] === "staff") {
                    localStorage.setItem("staffToken", JSON.stringify(result.accessToken));
                    navigate("/recruiter-dashboard");
                } else if (userData[1] === "admin") {
                    localStorage.setItem("adminToken",  JSON.stringify(result.accessToken));
                    navigate("/admin-dashboard");
                } else if (userData[1] === "login-Candidate") {
                    localStorage.setItem("candidateToken",  JSON.stringify(result.accessToken));
                    navigate("/candidate-home")
                } else if (userData[1] === "login-Client") {
                    localStorage.setItem("clientToken",  JSON.stringify(result.accessToken));
                    navigate("/")
                }
                
            } else {
                console.log(result);
                // window.location.reload();
            }
        } catch (error) {
            console.log(error.response.data);
            setErrorMsg(error.response.data.message);
            // window.location.reload();
        }
    }

    const getProtectedData = async (token) => {
        try {
          const response = await axios.get('http://localhost:5002/protected', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      };

    //candidate register
    const candidateReg = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5002/candidate-reg', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return<AuthContext.Provider value={{registerUser, candidateReg, loginUser, getProtectedData, errorMsg, setErrorMsg}}>
            {children}
        </AuthContext.Provider>
}

export default AuthContext;