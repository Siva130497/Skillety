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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4} from "uuid";


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
  const [staff, setStaff] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateString, setDateString] = useState("");

  const [image, setImage] = useState();
  const InitialEventDetail = {
    title:"",
    description:"",
    location:"",
  }
  const [eventDetail, setEventDetail] = useState(InitialEventDetail);

  
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

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setEventDetail({...eventDetail, [name] : value});
  }

  const handleDateChange = date => {
    setSelectedDate(date);

    if (date) {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();

      setDateString(`${day}${daySuffix(day)} ${month} ${year}`);
    }
  };

  const daySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const eventPosting = async (event) => {
    try {
        const response = await axios.post('http://localhost:5002/events', event, {
          headers: {
              Authorization: `Bearer ${staffToken}`,
              Accept: 'application/json'
          }
        });

        const result = response.data;

        if (!result.error) {
            console.log(result);
            alert("new event has been posted");
            setEventDetail(InitialEventDetail);
            setSelectedDate(null);
            setDateString("");
        } else {
            console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
  };

  const getAllContactMessages = async () => {
    try {
        const response = await axios.get('http://localhost:5002/contact', {
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
        const response = await axios.get('http://localhost:5002/candidate-contact', {
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


  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const event = {
      ...eventDetail,
      id,
      recruiterId:employeeId,
      date: dateString,
    };
    console.log(event);
    eventPosting(event);
    const formData = new FormData()
    formData.append('image', image);
    formData.append('id', id)
    axios.post("http://localhost:5002/upload-image", formData)
    .then(res=>{
      console.log(res);
      setImage(null);
    })
    .catch(err=>console.log(err));
  }
  
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
              }}>Candidate Contact Message Details</button></li>
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
            {eventPostingMode &&
              <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label 
                  htmlFor="eventTitleInput" 
                  className="form-label mt-4">
                      Title
                  </label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="eventTitleInput"  
                  name="title" 
                  value={eventDetail.title} 
                  onChange = {handleInputChange} 
                  placeholder="enter event title"
                  required />
              </div>
              <div class="form-group">
                <label htmlForfor="event_description" className="form-label mt-4">Description</label>
                <textarea className="form-control" id="event_description" rows="3" name="description" 
                  value={eventDetail.description} 
                  onChange = {handleInputChange} 
                  placeholder="enter event description"
                  required></textarea>
              </div>
              <div className="form-group">
                  <label 
                  htmlFor="event_location" 
                  className="form-label mt-4">
                      Location
                  </label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="eventTitleInput"  
                  name="location" 
                  value={eventDetail.location} 
                  onChange = {handleInputChange} 
                  placeholder="enter event location"
                  required />
              </div>
              <div>
                <label
                htmlFor="days"
                className="form-label mt-4">
                  Date
                </label>
                <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                />
              </div>
              <div>
                <input type='file' onChange={e=>setImage(e.target.files[0])} />
              </div>
              <input type='submit' value="Post" className='btn btn-primary my-3' />
              </form>
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
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default RecruiterDashboard