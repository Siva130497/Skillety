import { createContext, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();

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
    
            if (!result.error) {
                console.log(result);
                if (userData[1] === "staff") {
                    localStorage.setItem("staffToken", result.accessToken);
                    navigate("/recruiter-dashboard");
                } else if (userData[1] === "admin") {
                    localStorage.setItem("adminToken", result.accessToken);
                    navigate("/admin-dashboard");
                } else if (userData[1] === "login-Candidate") {
                    localStorage.setItem("candidateToken", result.accessToken);
                    navigate("/candidate-dashboard");
                } else if (userData[1] === "login-Client" || userData[1] === "login-Client-staff") {
                    localStorage.setItem("clientToken", result.accessToken);
                    navigate("/client-dashboard");
                }
                
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
            alert("Invalid login credentials");
            window.location.reload();
        }
    }

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

    return<AuthContext.Provider value={{registerUser, candidateReg, loginUser, }}>
            {children}
        </AuthContext.Provider>
}

export default AuthContext;