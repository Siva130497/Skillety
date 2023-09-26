import { createContext, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();

    const [jobPosted, setJobPosted] = useState(false);
    const [employeeId, setEmployeeId] = useState("");
    const [appliedJobStatus, setAppliedJobStatus] = useState(false);
    const [recruiterCreatedStatus, setRecruiterCreatedStatus] = useState(false);
    

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
                // localStorage.setItem("clientToken", result.accessToken);
                setEmployeeId(result.id);
                if (userData[1] === "staff") {
                    navigate("/recruiter-dashboard");
                } else if (userData[1] === "admin") {
                    navigate("/admin-dashboard");
                } else if (userData[1] === "login-Candidate") {
                    navigate("/candidate-dashboard");
                } else if (userData[1] === "login-Client") {
                    navigate("/client-dashboard");
                }
            } else {
                console.log(result);
               
            }
        } catch (error) {
            console.log(error);
            alert("Invalid login credentials")
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

    //jobposting
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

    //candidate apply for job
    const applyingjob = async(job) => {
        try{
            const res = await axios.post('http://localhost:5002/job-applying', job, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = res.data;
            if(!result.error){
                console.log(result);
                setAppliedJobStatus(true);
            }else {
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }

    //recruiter create request
    const createRecruiter = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5002/recruiter-create', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const result = response.data;
    
            if (!result.error) {
                console.log(result);
                setRecruiterCreatedStatus(true);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    return<AuthContext.Provider value={{registerUser, candidateReg, postOtherSkills, postOtherDesignation, jobPosting, jobPosted, setJobPosted, employeeId, applyingjob, appliedJobStatus, setAppliedJobStatus, createRecruiter, setRecruiterCreatedStatus, recruiterCreatedStatus, loginUser, }}>
            {children}
        </AuthContext.Provider>
}

export default AuthContext;