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
import Events from '../Events/Events';
import EventPosting from '../../components/EventPosting';
import Chat from '../Chat/Chat';


const RecruiterDashboard = () => {
  
  const staffToken = JSON.parse(localStorage.getItem("staffToken"));
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();

  const [dashBoard, setDashBoard] = useState(true);
  const [allClientMode, setAllClientMode] = useState(false);
  const [allCandidateMode, setAllCandidateMode] = useState(false);
  const [allJobMode, setAllJobMode] = useState(false);
  const [postedJobMode, setPostedJobMode] = useState(false);
  const [jobPostingMode, setJobPostingMode] = useState(false);
  const [eventPostingMode, setEventPostingMode] = useState(false);
  const [contactMessageMode, setContactMessageMode] = useState(false);
  const [candidateContactMessageMode, setCandidateContactMessageMode] = useState(false);
  const [contactMsgDetails, setContactMsgDetails] = useState([]);
  const [candidateContactMsgDetails, setCandidateContactMsgDetails] = useState([]);
  const [enquiryFormsMode, setEnquiryFormMode] = useState(false);
  const [enquiryFormDetails, setEnquiryFormDetails] = useState([]);
  const [postedEventsMode, setPostedEventsMode] = useState(false);
  const [realTimeChatMode, setRealTimeChatMode] = useState(false);
  const [staff, setStaff] = useState("");
  const [staffName, setStaffName] = useState("");
  
  const getAnIndividualRecruiter = async() => {
    try{
        const res = await axios.get(`https://skillety.onrender.com/staff/${employeeId}`, {
          headers: {
              Authorization: `Bearer ${staffToken}`,
              Accept: 'application/json'
          }
        });
        const result = res.data;
        if (!result.error) {
          console.log(result);
          setStaff(result.companyStaff);
          setStaffName(result.name);
        } else {
          console.log(result);
        }
    }catch(err){
      console.log(err);
    }
  }

  const getProtectedData = async () => {
    try {
      const response = await axios.get('https://skillety.onrender.com/protected', {
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
        const user = await getProtectedData();
        console.log(user);
        setEmployeeId(user.id);
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
  },[employeeId]);

  const getAllContactMessages = async () => {
    try {
        const response = await axios.get('https://skillety.onrender.com/contact', {
          headers: {
              Authorization: `Bearer ${staffToken}`,
              Accept: 'application/json'
          }
        });

        const result = response.data;

        if (!result.error) {
            console.log(result);
            setContactMsgDetails(result);
        } else {
            console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
  };

  const getAllCandidateContactMessages = async () => {
    try {
        const response = await axios.get('https://skillety.onrender.com/candidate-contact', {
          headers: {
              Authorization: `Bearer ${staffToken}`,
              Accept: 'application/json'
          }
        });

        const result = response.data;

        if (!result.error) {
            console.log(result);
            setCandidateContactMsgDetails(result);
        } else {
            console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
  };

  const getAllEnquiryForms = async () => {
    try {
        const response = await axios.get('https://skillety.onrender.com/enquiry-form', {
          headers: {
              Authorization: `Bearer ${staffToken}`,
              Accept: 'application/json'
          }
        });

        const result = response.data;

        if (!result.error) {
            console.log(result);
            setEnquiryFormDetails(result);
        } else {
            console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
  };
  
  return (
    <div>
        {/* <Layout/> */}
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
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>Dash board</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(true);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>All Clients</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(true);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>All Candidates</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(true);
                setPostedJobMode(false);
                setJobPostingMode(false);
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>All Jobs</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(true);
                setJobPostingMode(false);
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>Posted Jobs</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(true);
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>Job Posting</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
                setEventPostingMode(true);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>Event Posting</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                getAllContactMessages();
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
                setEventPostingMode(false);
                setContactMessageMode(true);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>Contact Message Details</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                getAllCandidateContactMessages();
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(true);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>Candidate Contact Message Details</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                getAllEnquiryForms();
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(true);
                setPostedEventsMode(false);
                setRealTimeChatMode(false);
              }}>Enquiry Forms Details</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(true);
                setRealTimeChatMode(false);
              }}>Posted Events</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllClientMode(false);
                setAllCandidateMode(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
                setEventPostingMode(false);
                setContactMessageMode(false);
                setCandidateContactMessageMode(false);
                setEnquiryFormMode(false);
                setPostedEventsMode(false);
                setRealTimeChatMode(true);
              }}>Real time chat with Candidate</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                localStorage.removeItem("staffToken");
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
            {eventPostingMode && <EventPosting employeeId={employeeId} staffToken={staffToken}/>
            }
            {contactMessageMode &&
              <div>
                {contactMsgDetails.length > 0 ?
                   contactMsgDetails.map((msg)=>{
                    return <div key={msg._id}>
                        <div>FULL NAME: {msg.fullName}</div>
                        <div>EMAIL: {msg.email}</div>
                        <div>PHONE NO: {msg.phoneNo}</div>
                        <div>SUBJECT: {msg.subject}</div>
                        <div>MESSAGE: {msg.message}</div>
                        <br></br>
                    </div>
                   }):
                  <p>no contact message details found</p>
                }
              </div>
            }
            {candidateContactMessageMode &&
              <div>
                {candidateContactMsgDetails.length > 0 ?
                   candidateContactMsgDetails.map((msg)=>{
                    return <div key={msg._id}>
                        <div>FULL NAME: {msg.fullName}</div>
                        <div>EMAIL: {msg.email}</div>
                        <div>PHONE NO: {msg.phoneNo}</div>
                        <div>SUBJECT: {msg.subject}</div>
                        <div>MESSAGE: {msg.message}</div>
                        <br></br>
                    </div>
                   }):
                  <p>no candidate contact message details found</p>
                }
              </div>
            }
            {enquiryFormsMode &&
              <div>
                {enquiryFormDetails.length > 0 ?
                   enquiryFormDetails.map((detail)=>{
                    return <div key={detail._id}>
                        <div>Full Name: {detail.fullName}</div>
                        <div>Mobile No: {detail.phoneNo}</div>
                        <div>Email: {detail.email}</div>
                        <div>Company Name: {detail.companyName}</div>
                        <div>Designation: {detail.designation}</div>
                        <div>Location: {detail.location}</div>
                        <div>Which RPO model do you want to opt for? {detail.rpoModel}</div>
                        <div>How many positions are open to be outsourced? {detail.positionCount}</div>
                        <div>What is the tentative deadline to close these positions? {detail.deadline}</div>
                        <div>Would you like our dedicated Account Manager to work from your premises or our premises? {detail.premisesType}</div>
                        <br></br>
                    </div>
                   }):
                  <p>no enquiry forms found</p>
                }
              </div>
            }
            {postedEventsMode &&
              <Events staffToken={staffToken} />
            }
            {realTimeChatMode && 
              <Chat userName ={staffName} userId ={employeeId} staffToken={staffToken}/>
            }
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default RecruiterDashboard