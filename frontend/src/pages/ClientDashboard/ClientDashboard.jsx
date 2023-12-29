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
import Packages from '../Packages/Packages';


const ClientDashboard = () => {
    const clientToken = JSON.parse(localStorage.getItem("clientToken"));
    const {getProtectedData, getClientChoosenPlan, packageSelectionDetail} = useContext(AuthContext);
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
    const [packagePlanMode, setPackagePlanMode] = useState(false);
    

    const initialCredentials = {
      name: "",
      email: "",
      phone:"",
    }
    const [credentials, setCredentials] = useState(initialCredentials);
    
    const getLoginClientDetail = async() => {
      try{
          const res = await axios.get(`https://skillety-n6r1.onrender.com/client/${employeeId}`, {
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
        getClientChoosenPlan(loginClientDetail.companyId);
      }
    },[employeeId]);

    useEffect(()=>{
      if(loginClientDetail){
        getClientChoosenPlan(loginClientDetail.companyId);
      }
    },[loginClientDetail]);


    const getAllClientStaffs = async() => {
      try{
          const res = await axios.get(`https://skillety-n6r1.onrender.com/all-client-staffs/${loginClientDetail.companyId}`, {
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
        const response = await axios.post(`https://skillety-n6r1.onrender.com/tempPass-Client-staff/${employeeId}`, userData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
          });

        const result = response.data;

        if (!result.message) {
            console.log(result);
            if (result.emailSent) {
              alert("New client staff has been created successfully!")
              setCredentials(initialCredentials)
          } else {
              console.log('Email sending failed.');
          }
        } else {
            console.log(result);
            alert("you reached the limit of creating accounts, upgrade your plan")
            setCredentials(initialCredentials);
        }
    } catch (error) {
        console.log(error);
    }
  };

    const handleInputChange = (event) => {
      const {name, value} = event.target;
      setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const updatedCredentials = {
        ...credentials,
      };
      console.log(updatedCredentials);
      createClientStaff(updatedCredentials);
    }

    return (
        <div>
            {/* <Layout /> */}

            {packageSelectionDetail ? <div className='container-fluid' style={{display: 'flex'}}>
              <div style={{flex:2}}>
                <ul>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(true);
                    setAllCandidateMode(false);
                    setPostedJobMode(false);
                    setJobPostingMode(false);
                    setAllClientStaffMode(false);
                    setClientStaffCreatingMode(false);
                    packagePlanMode(false);
                  }}>Dash board</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(false);
                    setAllCandidateMode(true);
                    setPostedJobMode(false);
                    setJobPostingMode(false);
                    setAllClientStaffMode(false);
                    setClientStaffCreatingMode(false);
                    setPackagePlanMode(false);
                  }}>All Candidates</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(false);
                    setAllCandidateMode(false);
                    setPostedJobMode(true);
                    setJobPostingMode(false);
                    setAllClientStaffMode(false);
                    setClientStaffCreatingMode(false);
                    setPackagePlanMode(false);
                  }}>Posted Jobs</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(false);
                    setAllCandidateMode(false);
                    setPostedJobMode(false);
                    setJobPostingMode(true);
                    setAllClientStaffMode(false);
                    setClientStaffCreatingMode(false);
                    setPackagePlanMode(false);
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
                      setPackagePlanMode(false);
                      }}>Client Staff Creating</button></li>
                      <li style={{listStyleType:'none'}}><button onClick={()=>{
                      getAllClientStaffs();
                      setDashBoard(false);
                      setAllClientStaffMode(true);
                      setAllCandidateMode(false);
                      setPostedJobMode(false);
                      setJobPostingMode(false);
                      setClientStaffCreatingMode(false);
                      setPackagePlanMode(false);
                      }}>All Client Staffs</button></li>
                      <li style={{listStyleType:'none'}}><button onClick={()=>{
                      setDashBoard(false);
                      setAllClientStaffMode(false);
                      setAllCandidateMode(false);
                      setPostedJobMode(false);
                      setJobPostingMode(false);
                      setClientStaffCreatingMode(false);
                      setPackagePlanMode(true);
                      }}>Upgrade the current plan</button></li>
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
                {allCandidateMode && <AllCandidates companyId={loginClientDetail.companyId} clientToken={clientToken}/>
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
                      <label 
                      htmlFor="emailInput" 
                      className="form-label mt-4">
                        Client Staff Email
                        </label>
                        <input 
                        type="email" 
                        className="form-control" 
                        id="emailInput" 
                        aria-describedby="clientStaffEmail" 
                        name="email" 
                        value={credentials.email} 
                        onChange = {handleInputChange} 
                        placeholder="enter the client-staff email"
                        required />
                    </div>
                    <div className="form-group">
                      <label 
                      htmlFor="phoneNoInput" 
                      className="form-label mt-4">
                        Client Staff Phone No
                        </label>
                        <input 
                        type="number" 
                        className="form-control" 
                        id="phoneNoInput" 
                        aria-describedby="clientStaffPhoneNo" 
                        name="phone" 
                        value={credentials.phone} 
                        onChange = {handleInputChange}
                        min="0"
                        placeholder="enter the client-staff phoneNo"
                        required />
                    </div>
                    <input type='submit' value="Create" className='btn btn-primary my-3' />
                  </form>
                </div>
                }
                {packagePlanMode &&
                  <Packages companyId={loginClientDetail.companyId}/>
                }
              </div>
            </div> : <Packages companyId={loginClientDetail.companyId}/>}

            <Footer/>
        </div>
    );
};

export default ClientDashboard;

