import { createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [jobPosted, setJobPosted] = useState(false);

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

    //client login request
    const loginClient = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5002/login-Client', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const result = response.data;
    
            if (!result.error) {
                console.log(result);
                localStorage.setItem("clientToken", result.accessToken);
                navigate('/client-dashboard'); 
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
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

    //post new skill
    const postOtherSkills = async(skills) => {
        try{
            const res = await axios.post("http://localhost:5002/skills", skills, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
            } else {
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }

    //post new designation
    const postOtherDesignation = async(designation) => {
        try{
            const res = await axios.post("http://localhost:5002/designations", designation, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
            } else {
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }

    const jobPosting = async(jobdetail) => {
        try{
            const res = await axios.post("http://localhost:5002/job-detail", jobdetail, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setJobPosted(true);
            } else {
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }

    return<AuthContext.Provider value={{registerUser, loginClient, candidateReg, postOtherSkills, postOtherDesignation, jobPosting, jobPosted, setJobPosted}}>
            {children}
        </AuthContext.Provider>
}

export default AuthContext;