import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import AllCandidates from '../../components/AllCandidates';
import PostedJobs from '../../components/PostedJobs';
import JobPosting from '../../components/JobPosting';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4} from "uuid";
import AuthContext from '../../context/AuthContext';


const ClientDashboard = () => {
    const clientToken = JSON.parse(localStorage.getItem("clientToken"));
    const {getProtectedData} = useContext(AuthContext)
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState([]);
    const navigate = useNavigate();

    const [dashBoard, setDashBoard] = useState(true);
    const [allCandidateMode, setAllCandidateMode] = useState(false);
    const [postedJobMode, setPostedJobMode] = useState(false);
    const [jobPostingMode, setJobPostingMode] = useState(false);
    const [clientStaffCreatingMode, setClientStaffCreatingMode] = useState(false);
    const [allClientStaffs, setAllClientStaffs] = useState([]);
    const [allClientStaffMode, setAllClientStaffMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const [credentials, setCredentials] = useState({
      name: "",
      password: "",
    });

    const getLoginClientDetail = async() => {
      try{
          const res = await axios.get(`http://localhost:5002/client/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
          });
          const result = res.data;
          if (!result.error) {
            console.log(result);
            setLoginClientDetail(result);
          } else {
            console.log(result);
          }
      }catch(err){
        console.log(err);
      }
    }
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const user = await getProtectedData(clientToken);
          console.log(user);
          setEmployeeId(user.id);
        } catch (error) {
          navigate("/client-login")
        }
      };
  
      fetchData();
    }, []);

    useEffect(()=>{
      if(employeeId){
        getLoginClientDetail();
      }
    },[employeeId]);

    const getAllClientStaffs = async() => {
      try{
          const res = await axios.get(`http://localhost:5002/all-client-staffs/${loginClientDetail.companyId}`, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
          });
          const result = res.data;
          if (!result.error) {
            console.log(result);
            setAllClientStaffs(result);
          } else {
            console.log(result);
          }
      }catch(err){
        console.log(err);
      }
    }

    //client staff create request
  const createClientStaff = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5002/client-staff-register', userData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
          });

        const result = response.data;

        if (!result.message) {
            console.log(result);
            alert("New client staff has been created successfully!")
            setCredentials({name:"", password:""})
        } else {
            console.log(result);
            setCredentials({name:"", password:""})
        }
    } catch (error) {
        console.log(error);
    }
  };

    const handleInputChange = (event) => {
      const {name, value} = event.target;
      setCredentials({ ...credentials, [name]: value });
    }

    const generateRandomPassword = () => {
      axios.get("http://localhost:5002/random-password")
        .then(response => {
          const password = response.data;
          setCredentials({...credentials, password});
        })
        .catch(error => {
          console.error('Error fetching random password:', error);
        });
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const id = uuidv4();
      const updatedCredentials = {
        ...credentials,
        id,
        companyName:loginClientDetail.companyName,
        companyId:loginClientDetail.companyId,
        role:"Client-staff"
      };
      console.log(updatedCredentials);
      createClientStaff(updatedCredentials);
    }

    return (
        <div>
            {/* <Layout /> */}
            <div className='container-fluid' style={{display: 'flex'}}>
              <div style={{flex:2}}>
                <ul>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(true);
                    setAllCandidateMode(false);
                    setPostedJobMode(false);
                    setJobPostingMode(false);
                    setAllClientStaffMode(false);
                    setClientStaffCreatingMode(false);
                  }}>Dash board</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(false);
                    setAllCandidateMode(true);
                    setPostedJobMode(false);
                    setJobPostingMode(false);
                    setAllClientStaffMode(false);
                    setClientStaffCreatingMode(false);
                  }}>All Candidates</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(false);
                    setAllCandidateMode(false);
                    setPostedJobMode(true);
                    setJobPostingMode(false);
                    setAllClientStaffMode(false);
                    setClientStaffCreatingMode(false);
                  }}>Posted Jobs</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(false);
                    setAllCandidateMode(false);
                    setPostedJobMode(false);
                    setJobPostingMode(true);
                    setAllClientStaffMode(false);
                    setClientStaffCreatingMode(false);
                  }}>Job Posting</button></li>
                  {loginClientDetail.role === "Client" &&  
                    <div>
                      <li style={{listStyleType:'none'}}><button onClick={()=>{
                      setDashBoard(false);
                      setAllCandidateMode(false);
                      setAllClientStaffMode(false);
                      setPostedJobMode(false);
                      setJobPostingMode(false);
                      setClientStaffCreatingMode(true);
                      }}>Client Staff Creating</button></li>
                      <li style={{listStyleType:'none'}}><button onClick={()=>{
                      getAllClientStaffs();
                      setDashBoard(false);
                      setAllClientStaffMode(true);
                      setAllCandidateMode(false);
                      setPostedJobMode(false);
                      setJobPostingMode(false);
                      setClientStaffCreatingMode(false);
                      }}>All Client Staffs</button></li>
                    </div>
                  }
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    localStorage.removeItem("clientToken");
                    window.location.reload();
                  }}>Logout</button></li>
                </ul>
              </div>
              <div style={{flex:10}}>
                {dashBoard && <div>
                <h1>Dash Board</h1>
                </div>}
                {allCandidateMode && <AllCandidates employeeId={employeeId} clientToken={clientToken}/>
                }
                {postedJobMode > 0 && <PostedJobs companyId={loginClientDetail.companyId} clientToken={clientToken}/>
                }
                {jobPostingMode  && <JobPosting companyId={loginClientDetail.companyId} role={loginClientDetail.role} employeeId={employeeId} clientToken={clientToken}/>}
                {allClientStaffMode &&
                  <div>
                    {allClientStaffs.length > 0 ?
                      <div>
                      <h3>Created client staffs</h3>
                      <table className="table table-hover my-3">
                        <tbody>
                        {allClientStaffs.map((clientStaff)=>{
                            return (
                              <tr key={clientStaff.id}>
                                  <th scope="row">{clientStaff.name}</th>
                                  <td>{}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      </div> : <p>No Client Staff Created Yet</p>}
                  </div>
                }
                {clientStaffCreatingMode &&
                  <div>
                  <h4>Creating A Client Staff</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label 
                      htmlFor="nameInput" 
                      className="form-label mt-4">
                        Client Staff Name
                        </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="nameInput" 
                        aria-describedby="clientStaffName" 
                        name="name" 
                        value={credentials.name} 
                        onChange = {handleInputChange} 
                        placeholder="enter the client-staff name"
                        required />
                    </div>
                    <div className="form-group">
                      <span className="badge rounded-pill bg-info" onClick={generateRandomPassword}>Create random password</span>
                        <input 
                        type={showPassword ? "text" : "password"} 
                        className="form-control" 
                        id="passwordInput" 
                        aria-describedby="clientStaffName" 
                        name="password" 
                        value={credentials.password}  
                        placeholder="create random password"
                        required />
                        <span className="badge rounded-pill bg-dark" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>
                    </div>
                    <input type='submit' value="Create" className='btn btn-primary my-3' />
                  </form>
                </div>
                }
              </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ClientDashboard;

