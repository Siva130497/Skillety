import React, { useEffect, useState } from 'react'
import { useContext} from 'react';
import AuthContext from '../../context/AuthContext';
import RecruiterLogin from '../RecruiterLogin/RecruiterLogin';
import Layout from '../../components/Layout';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import HRPage from '../HRPage/HRPage';
import OperatorPage from '../OperatorPage/OperatorPage';
import FinancePage from '../FinancePage/FinancePage';
import CustomerSupportExecutivePage from '../CustomerSupportExecutivePage/CustomerSupportExecutivePage';
import DigitalMarketingTeamPage from '../DigitalMarketingTeamPage/DigitalMarketingTeamPage';
import RMGPage from '../RMGPage/RMGPage';

const RecruiterDashboard = () => {
  const {
    employeeId,
    jobPosting,
    postOtherSkills,
    postOtherDesignation,
    jobPosted,
    setJobPosted,
  } = useContext(AuthContext);

  const [dashBoard, setDashBoard] = useState(true);
  const [allJobMode, setAllJobMode] = useState(false);
  const [postedJobMode, setPostedJobMode] = useState(false);
  const [jobPostingMode, setJobPostingMode] = useState(false);
  const [staff, setStaff] = useState("");
  const [postedJobs, setPostedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [viewPostedJobStatus, setViewPostedJobStatus] = useState(false);
  const [viewJobStatus, setViewJobStatus] = useState(false);
  const [selectedPostedJobViewDetail, setSelectedPostedJobViewDetail] = useState([]);
  const [selectedJobViewDetail, setSelectedJobViewDetail] = useState([]);
  const [searchJobRoleInput, setSearchJobRoleInput] = useState("");
  const [searchSkillInput, setSearchSkillInput] = useState("");
  const [jobRoleArray, setjobRoleArray] = useState([])
  const [filteredJobRoles, setFilteredJobRoles] = useState([]);
  const [selectedJobRoles, setSelectedJobRoles] = useState([]);
  const [isCheckedJobRole, setIsCheckedJobRole] = useState(false);
  const [newJobRole, setNewJobRole] = useState("");
  const [otherJobRole, setOtherJobRole] = useState([]);

  const initialCredentials = {
    year: "",
    month: "",
    jobCategory: "",
    jobDescription: "",
  };

  const [credentials, setCredentials] = useState(initialCredentials);
  const [skillError, setSkillError] = useState("");
  const [skillArray, setSkillArray] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isCheckedSkill, setIsCheckedSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [otherSkill, setOtherSkill] = useState([]);
  const [additionalSkills, setAdditionalSkills] = useState([]);

  const totalMonths = parseInt(credentials.year * 12) + parseInt(credentials.month);
  const maxSkillNum = totalMonths <= 24 ? 6 : totalMonths <= 48 ? 8 : totalMonths <= 96 ? 10 : 12;

  const getAnIndividualRecruiter = async() => {
    try{
        const res = await axios.get(`http://localhost:5002/staff/${employeeId}`);
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

  const getAllJobRoles = async () => {
    try{
        const res = await axios.get("http://localhost:5002/designations");
        const result = res.data;
        if (!result.error) {
            console.log(result);
            setjobRoleArray(result);
          } else {
            console.log(result);
        }
    }catch(err){
        console.log(err);
    }
  };

  const getAllSkills = async () => {
      try{
          const res = await axios.get("http://localhost:5002/skills");
          const result = res.data;
          if (!result.error) {
            console.log(result);
            setSkillArray(result);
          } else {
            console.log(result);
        }
      }catch(err){
          console.log(err);
      }
  };

  const getOwnPostedjobs = async() => {
    try{
        const res = await axios.get(`http://localhost:5002/my-posted-jobs/${employeeId}`);
        const result = res.data;
        if (!result.error) {
          console.log(result);
          setPostedJobs(result);
        } else {
          console.log(result);
        }
    }catch(err){
      console.log(err);
    }
  }

  const getPostedjobs = async() => {
    try{
        const res = await axios.get(`http://localhost:5002/posted-jobs`);
        const result = res.data;
        if (!result.error) {
          console.log(result);
          setAllJobs(result);
        } else {
          console.log(result);
        }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(employeeId){
      getAnIndividualRecruiter();
      getAllJobRoles();
      getAllSkills();
      getOwnPostedjobs();
      getPostedjobs();
    }
  }, [employeeId]);

  useEffect(() => {
    if (jobPosted) {
      alert("Job has been posted successfully!")
      setCredentials(initialCredentials);
      setSelectedJobRoles([]);
      setOtherJobRole([]);
      setSelectedSkills([]);
      setAdditionalSkills([]);
      setOtherSkill([]);
      setJobPosted(false);
      getOwnPostedjobs();
      getPostedjobs();
    }
  }, [jobPosted]);

  const handleViewPosetedJobDetail = (id) => {
    setViewPostedJobStatus(preViewPostedJobStatus=>!preViewPostedJobStatus);
    const selectedPostedJob = postedJobs.find(postedJob=> postedJob.id === id);
    setSelectedPostedJobViewDetail(selectedPostedJob);
  }

  const handleViewJobDetail = (id) => {
    setViewJobStatus(preViewJobStatus=>!preViewJobStatus);
    const selectedJob = allJobs.find(job=> job.id === id);
    setSelectedJobViewDetail(selectedJob);
  }

  const handleJobRoleSearch = (e) => {
      const inputValue = e.target.value;
      setSearchJobRoleInput(inputValue);
      if(inputValue.length > 0){
          const jobRoles = jobRoleArray.filter((obj) => {
              return obj.designation.toLowerCase().includes(inputValue.toLowerCase());
          });
          if(jobRoles.length > 0){
              setFilteredJobRoles(jobRoles);
          }
      } else {
          setFilteredJobRoles([]);
      }
  };

  const handleJobRoleClick = (jobRole) => {
      setSelectedJobRoles([jobRole]);
      setSearchJobRoleInput("");
      setFilteredJobRoles([]);
  }
  
  const handleDeselectJobRole = (jobRole) => {
      setSelectedJobRoles(selectedJobRoles.filter(selectedJobRole => selectedJobRole !== jobRole));
      setOtherJobRole(otherJobRole.filter(other => other !== jobRole));
  }
  
  const handleManualJobRole = () => {
      setSearchJobRoleInput("");
      const foundObject = jobRoleArray.find(item => item.designation.toLowerCase() === newJobRole.toLowerCase());
      if (foundObject) {
        alert(`Job role "${newJobRole}" already in list, please search...`);
        setNewJobRole("");
      } else {
        setOtherJobRole([newJobRole]);
        setSelectedJobRoles([newJobRole]);
        setNewJobRole("");
      }
  }
  
  const handleChange = (event) => {
      const { name, value } = event.target;
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
      }));
  
      if (name === "year" || name === "month") {
          setSkillError("");
      }
  };
  
  const handleSkillSearch = (e) => {
      const inputValue = e.target.value;
      setSearchSkillInput(inputValue);
      if(inputValue.length > 0){
          const jobSkills = skillArray.filter((obj) => {
              return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
          });
          if(jobSkills.length > 0){
              setFilteredSkills(jobSkills);
          }
      } else {
          setFilteredSkills([]);
      }
  }
  
  const handleSkillClick = (skill) => {
      if(totalMonths > 0){
          if (selectedSkills.includes(skill)) {
              setSelectedSkills([...selectedSkills]);
              setSearchSkillInput("");
              setFilteredSkills([]);
          } else if(selectedSkills.length === maxSkillNum){
              alert(`You can select max of ${maxSkillNum} skills for a particular job role as mandatory, other than that it will add to additional skills`);
              if(additionalSkills.includes(skill)){
                setAdditionalSkills([...additionalSkills]);
                setSearchSkillInput("");
                setFilteredSkills([]);
              }else{
                setAdditionalSkills([...additionalSkills, skill]); 
                setSearchSkillInput("");
                setFilteredSkills([]);
              }
          } else if(selectedSkills.length < maxSkillNum){
              setSelectedSkills([...selectedSkills, skill]);
              setSearchSkillInput("");
              setFilteredSkills([]);
          }
      }else{
          setSkillError("Please enter the experience first...");
          setSearchSkillInput("");
          setFilteredSkills([]);
      }
  }
  
  
  const handleManualSkill = () => {
      if(totalMonths > 0){
          setSearchSkillInput("");
          if (selectedSkills.length === maxSkillNum){
          alert(`You can select max of ${maxSkillNum} skills for a particular job role as mandatory, other than that it will add to additional skills`);
          if(additionalSkills.includes(newSkill)){
              setAdditionalSkills([...additionalSkills]);
              setNewSkill("");
          }else{
              setAdditionalSkills([...additionalSkills, newSkill]);
              setOtherSkill([...otherSkill, newSkill]);
              setNewSkill("");
          }
          } else if(selectedSkills.length < maxSkillNum){
          const foundObject = skillArray.find(item => item.skill.toLowerCase() === newSkill.toLowerCase());
          if (foundObject) {
              alert(`Skill "${newSkill}" already in list, please search...`);
          } else {
              setOtherSkill([...otherSkill, newSkill]);
              setSelectedSkills([...selectedSkills, newSkill]);
          }
          setNewSkill("");
          }
      }else{
          setSkillError("Please enter the experience first...");
          setNewSkill("");
      }
  }
  
  
  const handleDeselect = (skill) => {
      setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
      setOtherSkill(otherSkill.filter(other => other !== skill));
      additionalSkills.length > 0 && setAdditionalSkills(additionalSkills.filter(additionalSkill => additionalSkill !== skill));
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const minSkillNum = totalMonths <= 24 ? 4 : totalMonths <= 48 ? 6 : totalMonths <= 96 ? 8 : 10;
      if (
        selectedJobRoles.length === 0 ||
        credentials.year === "" ||
        credentials.month === "" ||
        credentials.jobCategory === "" ||
        credentials.jobDescription === "" ||
        selectedSkills.length === 0
      ) {
        alert("Please fill in all required fields.");
        return;
      }
  
      if (selectedSkills.length < minSkillNum) {
        alert("Please select at least " + minSkillNum + " mandatory skills for a particular job role.");
        return;
      }
  
      const id = uuidv4();
  
      const updatedCredentials = {
        ...credentials,
        skills: selectedSkills,
        jobRole: selectedJobRoles,
        id: id,
        recruiterId:employeeId,
        clientId:"this job posted by company staff"
      };
      const updatedCredentialsWithAdditionalSkills = {
        ...updatedCredentials,
        additionalSkill:additionalSkills,
      }
      const jobDetails = additionalSkills.length > 0 ? updatedCredentialsWithAdditionalSkills : updatedCredentials;
      console.log(jobDetails, otherJobRole, otherSkill);
      jobPosting(jobDetails);
      otherSkill.length > 0 && postOtherSkills(otherSkill);
      otherJobRole.length > 0 && postOtherDesignation(otherJobRole);
  };

  return (
    <>
      {employeeId ? <>
        <Layout/>
        <div className='container-fluid' style={{display: 'flex'}}>
          <div style={{flex:5.5}}>
            <ul>
              <li><button onClick={()=>{
                setDashBoard(true);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(false);
              }}>Dash board</button></li>
              <li><button onClick={()=>{
                setDashBoard(false);
                setAllJobMode(true);
                setPostedJobMode(false);
                setJobPostingMode(false);
              }}>All Jobs</button></li>
              <li><button onClick={()=>{
                setDashBoard(false);
                setAllJobMode(false);
                setPostedJobMode(true);
                setJobPostingMode(false);
              }}>Posted Jobs</button></li>
              <li><button onClick={()=>{
                setDashBoard(false);
                setAllJobMode(false);
                setPostedJobMode(false);
                setJobPostingMode(true);
              }}>Job Posting</button></li>
            </ul>
          </div>
          <div style={{flex:6}}>
            {dashBoard && <>
            <h1>Dash Board</h1>
              {staff === "HR" ? <HRPage/> : staff === "Operator" ? <OperatorPage/> : staff === "Finance" ? <FinancePage/> : staff === "Customer support executive" ? <CustomerSupportExecutivePage/> : staff === "digitalmarketing team" ? <DigitalMarketingTeamPage/> : <RMGPage/>}
            </>}
            {allJobs.length > 0 &&
             <>
              {allJobMode  &&<>
                <h2>All Jobs</h2>
                <table className="table table-hover my-3">
                <thead>
                    <tr className='table-dark'>
                        <th scope="col">Job Role</th>
                    </tr>
                </thead>
                <tbody>
                {allJobs.map((Job)=>{
                    return (
                      <tr key={Job.id}>
                          <th scope="row" onClick={()=>handleViewJobDetail(Job.id)}>{Job.jobRole[0]}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
             </>}
             <br></br>
             {viewJobStatus && allJobs.length > 0 &&
                <>
                  <h4>Job Details</h4>
                  <div>Job Role: {selectedJobViewDetail.jobRole[0]}</div>
                  <div>Job Category: {selectedJobViewDetail.jobCategory}</div>
                  <div>Job Mandatory Skills: {selectedJobViewDetail.skills.join(', ')}</div>
                  {selectedJobViewDetail.additionalSkills.length > 0 &&
                    <div>Job Additional Skills: {selectedJobViewDetail.additionalSkills.join(', ')}</div>
                  }
                  <div>Job Description: {selectedJobViewDetail.jobDescription}</div>
                  <div>Needed Experience:{selectedJobViewDetail.year} years and {selectedJobViewDetail.month} months</div>
                </>
             }
              </>}
              {postedJobs.length > 0 &&
             <>
              
              {postedJobMode  &&<>
                <h2>Posted Jobs</h2>
                <table className="table table-hover my-3">
                <thead>
                    <tr className='table-dark'>
                        <th scope="col">Job Role</th>
                        {/* <th scope="col">No of applicants</th> */}
                    </tr>
                </thead>
                <tbody>
                {postedJobs.map((postedJob)=>{
                    // const numApplicants = appliedOfPostedJobs.filter(appliedOfPostedJob => appliedOfPostedJob.jobId === postedJob.id).length;
                    return (
                      <tr key={postedJob.id}>
                          <th scope="row" onClick={()=>handleViewPosetedJobDetail(postedJob.id)}>{postedJob.jobRole[0]}</th>
                          {/* <td>{numApplicants}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
             </>}
             <br></br>
             {viewPostedJobStatus && postedJobs.length > 0 &&
                <>
                  <h4>Job Details</h4>
                  <div>Job Role: {selectedPostedJobViewDetail.jobRole[0]}</div>
                  <div>Job Category: {selectedPostedJobViewDetail.jobCategory}</div>
                  <div>Job Mandatory Skills: {selectedPostedJobViewDetail.skills.join(', ')}</div>
                  {selectedPostedJobViewDetail.additionalSkills.length > 0 &&
                    <div>Job Additional Skills: {selectedPostedJobViewDetail.additionalSkills.join(', ')}</div>
                  }
                  <div>Job Description: {selectedPostedJobViewDetail.jobDescription}</div>
                  <div>Needed Experience:{selectedPostedJobViewDetail.year} years and {selectedPostedJobViewDetail.month} months</div>
                </>
             }
              </>}
              {jobPostingMode  &&<>
                <h2>Job Posting</h2>
              <form onSubmit={handleSubmit}>
               <div className="form-group">
                 <label 
                 htmlFor="jobRoleInput" 
                 className="form-label mt-4">
                   Job Role
                 </label>
                 {selectedJobRoles.map(selectJobRole => (
                     <span className="badge bg-success mx-2" 
                     key={selectJobRole}
                     onClick={()=>handleDeselectJobRole(selectJobRole)}
                     >{selectJobRole}</span>
                 ))}
                 <input 
                 type='text' 
                 name='searchJobRoleInput' 
                 id='searchJobRoleInput' 
                 className='form-control my-2' 
                 placeholder='Search job role...' 
                 value={searchJobRoleInput}
                 onChange={handleJobRoleSearch}
                 />
                 {filteredJobRoles.length > 0 &&
                     filteredJobRoles.map((filterJobRole)=>{
                         return <div key={filterJobRole._id} onClick={()=>handleJobRoleClick(filterJobRole.designation)}>{filterJobRole.designation}</div> 
                     })
                 }
                 <input
                 className="form-check-input"
                 type="checkbox"
                 checked={isCheckedJobRole}
                 onChange={()=>setIsCheckedJobRole(!isCheckedJobRole)}
                 />
                 <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                   If your searched job role not in the list, please enable the checkbox & type manually...
                 </label>
                 <input 
                 type='text' 
                 name='manualJobRoleInput' 
                 id='manualJobRoleInput' 
                 className='form-control my-2' 
                 placeholder='Enter job role...'
                 value={newJobRole}
                 onChange={(e)=>setNewJobRole(e.target.value)}
                 disabled = {!isCheckedJobRole}
                 />
                 <button 
                 type="button" 
                 className="btn btn-primary btn-sm"
                 onClick={handleManualJobRole}
                 disabled = {!isCheckedJobRole}
                 >add manually entered jobRole</button>
               </div>
               <div className="form-group">
                 <label 
                 htmlFor="experienceInput" 
                 className="form-label mt-4">
                 Total Experience 
                 </label>
                 <input 
                 type="number" 
                 className="form-control" 
                 id="yearInput"  
                 name="year" 
                 value={credentials.year}
                 onChange={handleChange}
                 placeholder="years in number"
                 />
                 <input 
                 type="number" 
                 className="form-control" 
                 id="monthInput"  
                 name="month" 
                 value={credentials.month}
                 onChange={handleChange}
                 placeholder="months in number"
                 />
               </div>
               <div className='form-group'>
                 <label 
                 htmlFor="mandatorySkillInput" 
                 className="form-label mt-4">
                   Mandatory Skills 
                 </label>
                 {selectedSkills.map(selectSkill => (
                   <span className="badge rounded-pill bg-info mx-2" 
                   key={selectSkill}
                   onClick={()=>handleDeselect(selectSkill)}
                   >{selectSkill}</span>
                 ))}
                 <br></br>
                 {additionalSkills.length > 0 &&
                   <label 
                   htmlFor="additionalSkillInput" 
                   className="form-label mt-4">
                     Additional Skills 
                   </label>
                 }
                 {additionalSkills.map(additionalSkill => (
                   <span className="badge rounded-pill bg-info mx-2" 
                   key={additionalSkill}
                   onClick={()=>handleDeselect(additionalSkill)}
                   >{additionalSkill}</span>
                 ))}
                 <input 
                 type='text' 
                 name='searchSkillInput' 
                 id='searchSkillInput' 
                 className='form-control my-2' 
                 placeholder='Search Skills' 
                 value={searchSkillInput}
                 onChange={handleSkillSearch}
                 />
                 {skillError && <p>{skillError}</p>}
                 {filteredSkills.length > 0 &&
                   filteredSkills.map((filterSkill)=>{
                     return <div key={filterSkill._id} onClick={()=>handleSkillClick(filterSkill.skill)}>{filterSkill.skill}</div> 
                   })
                 }
                 <input
                 className="form-check-input"
                 type="checkbox"
                 checked={isCheckedSkill}
                 onChange={()=>setIsCheckedSkill(!isCheckedSkill)}
                 />
                 <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                   If the searched skill for the particular job role not in the list, please enable the checkbox & type manually...
                 </label>
                 <input 
                 type='text' 
                 name='manualSkillInput' 
                 id='manualSkillInput' 
                 className='form-control my-2' 
                 placeholder='Enter the skills...'
                 value={newSkill}
                 onChange={(e)=>setNewSkill(e.target.value)}
                 disabled={!isCheckedSkill}
                 />
                 {skillError && <p>{skillError}</p>}
                 <button 
                 type="button" 
                 className="btn btn-primary btn-sm"
                 onClick={handleManualSkill}
                 disabled={!isCheckedSkill}
                 >add manually entered skill for a particular job role</button>
               </div>
               <div className="form-group">
                 <label 
                 htmlFor="jobCategory" 
                 className="form-label mt-4">
                   Job Category 
                 </label>
                 <select 
                 className="form-select" 
                 id="jobCategory"
                 name="jobCategory" 
                 value = {credentials.jobCategory}
                 onChange={handleChange}
                 required>
                   <option value="">Please select any one job category.</option>
                   <option value="full time">Full time</option>
                   <option value="part time">Part time</option>
                   <option value="remote">Remote</option>
                   <option value="freelancer">Freelancer</option>
                 </select>
               </div>
               <div className="form-group">
                 <label 
                 htmlFor="jobDescriptionInput" 
                 className="form-label mt-4">
                   Job Description
                 </label>
                 <textarea 
                 className="form-control" 
                 id="jobDescriptionTextarea" 
                 rows="3"
                 name='jobDescription'
                 value={credentials.jobDescription}
                 onChange={handleChange}
                 placeholder="Enter the job description"
                 required></textarea>
               </div>
               <input type='submit' value="Post" className='btn btn-primary my-3' />
             </form>
             </>}
          </div>
        </div>
          </>:<RecruiterLogin/>}
    </>
  )
}

export default RecruiterDashboard