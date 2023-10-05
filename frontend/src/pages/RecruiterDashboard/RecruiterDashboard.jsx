import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import axios from 'axios';
import HRPage from '../HRPage/HRPage';
import OperatorPage from '../OperatorPage/OperatorPage';
import FinancePage from '../FinancePage/FinancePage';
import CustomerSupportExecutivePage from '../CustomerSupportExecutivePage/CustomerSupportExecutivePage';
import DigitalMarketingTeamPage from '../DigitalMarketingTeamPage/DigitalMarketingTeamPage';
import RMGPage from '../RMGPage/RMGPage';
import { Footer } from '../../components/Footer';
import AllJobs from '../../components/AllJobs';
import PostedJobs from '../../components/PostedJobs';
import JobPosting from '../../components/JobPosting';
import AllCandidates from '../../components/AllCandidates';
import AllClients from '../../components/AllClients';
import { useNavigate } from 'react-router-dom';


const RecruiterDashboard = () => {
  
  const staffToken = localStorage.getItem("staffToken");
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();

  const [dashBoard, setDashBoard] = useState(true);
  const [allClientMode, setAllClientMode] = useState(false);
  const [allCandidateMode, setAllCandidateMode] = useState(false);
  const [allJobMode, setAllJobMode] = useState(false);
  const [postedJobMode, setPostedJobMode] = useState(false);
  const [jobPostingMode, setJobPostingMode] = useState(false);
  const [staff, setStaff] = useState("");

  const getAnIndividualRecruiter = async() => {
    try{
        const res = await axios.get(`http://localhost:5002/staff/${employeeId}`, {
          headers: {
              Authorization: `Bearer ${staffToken}`,
              Accept: 'application/json'
          }
        });
        const result = res.data;
        if (!result.error) {
          console.log(result);
          setStaff(result.companyStaff);
        } else {
          console.log(result);
        }
    }catch(err){
      console.log(err);
    }
  }

  const getProtectedData = async () => {
    try {
      const response = await axios.get('http://localhost:5002/protected', {
        headers: {
            Authorization: `Bearer ${staffToken}`,
            Accept: 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getProtectedData();
        console.log(id);
        setEmployeeId(id);
      } catch (error) {
        navigate("/recruiter-login")
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    if(employeeId){
      getAnIndividualRecruiter();
    }
  },[employeeId])
  
  return (
    <div>
        <Layout/>
        <div className='container-fluid' style={{display: 'flex'}}>
          <div style={{flex:2}}>
            <ul>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(true);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
              }}>Dash board</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(true);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
              }}>All Clients</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(true);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
              }}>All Candidates</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(true);
                setPostedJobMode(false);
                setJobPostingMode(false);
              }}>All Jobs</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(true);
                setJobPostingMode(false);
              }}>Posted Jobs</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(true);
              }}>Job Posting</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                localStorage.removeItem("recruiterToken");
                window.location.reload();
              }}>Logout</button></li>
            </ul>
          </div>
          <div style={{flex:10}}>
            {dashBoard && <div>
            <h1>Dash Board</h1>
              {staff === "HR" ? <HRPage/> : staff === "Operator" ? <OperatorPage/> : staff === "Finance" ? <FinancePage/> : staff === "Customer support executive" ? <CustomerSupportExecutivePage/> : staff === "digitalmarketing team" ? <DigitalMarketingTeamPage/> : staff === "RMG" ? <RMGPage/> : null}
            </div>}
            {allClientMode && <AllClients staffToken={staffToken}/>
            }
            {allCandidateMode && <AllCandidates employeeId={employeeId} staffToken={staffToken}/>
            }
            {allJobMode > 0 && <AllJobs staffToken={staffToken} employeeId={employeeId}/>
            }
            {postedJobMode > 0 && <PostedJobs employeeId={employeeId} staffToken={staffToken}/>
            }
            {jobPostingMode  && <JobPosting employeeId={employeeId} staffToken={staffToken}/>
            }
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default RecruiterDashboard