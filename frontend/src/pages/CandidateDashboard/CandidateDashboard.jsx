import React, { useContext, useState } from 'react'
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';


const CandidateDashboard = () => {
  const [jobDetail, setJobDetail] = useState([]);
  const {employeeId, applyingjob} = useContext(AuthContext);
  const [jobView, setJobView] = useState(false);
  const [jobViewDetail, setJobViewDetail] = useState([]);
  const [appliedJobDetail, setAppliedJobDetail] = useState([]);
  const [dashBoard, setDashBoard] = useState(true);
  const [allJobMode, setAllJobMode] = useState(false);
  const [appliedJobMode, setAppliedJobMode] = useState(false);

  const [checkBoxfilters, setCheckBoxFilters] = useState([]);
  const [checkBoxFilteredJobs, setCheckBoxFilteredJobs] = useState([]);
  const [searchFilteredJobs, setSearchFilteredJobs] = useState([]);
  const [searchFilteredJobMsg, setSearchFilteredJobMsg] = useState("");
  const [prevSearchFilteredJobs, setPrevSearchFilteredJobs] = useState([]);
  const [checkBoxFilteredJobMsg, setCheckBoxFilteredJobMsg] = useState("");
  const [searchJobRoleInput, setSearchJobRoleInput] = useState("");
  
  
    const getSkillMatchJobDetail = async() => {
        try {
            const response = await axios.get(`http://localhost:5002/skill-match-job-Detail/${employeeId}`);
            const result = response.data;
      
            if (!result.error) {
              console.log(result);
              setJobDetail(result);
            } else {
              console.log(result);
            }
          } catch (error) {
            console.log(error);
          }
    };

    //get candidate applied jobs
    const getAppliedjobs = async() => {
      try{
          const res = await axios.get(`http://localhost:5002/my-applied-jobs/${employeeId}`);
          const result = res.data;
          if (!result.error) {
            console.log(result);
            setAppliedJobDetail(result);
          } else {
            console.log(result);
          }
      }catch(err){
        console.log(err);
      }
    }

    const handleJobClick = (id) => {
      setJobView(prevJobView => !prevJobView);
      const selectedJob = jobDetail.find(job => job.jobId === id);
      const alreadyAppliedJob = appliedJobDetail.find(appliedJob => appliedJob.jobId === id);
      if(alreadyAppliedJob){
        const updatedJob = { ...selectedJob, discardStatus: true };
        setJobViewDetail(updatedJob);
      }else{
        const updatedJob = { ...selectedJob, discardStatus: false };
        setJobViewDetail(updatedJob);
      }
    }
    
    const handleApply = (id) => {
      const AppliedJob = jobDetail.find(job => job.jobId === id);
      const alreadyAppliedJob = appliedJobDetail.find(appliedJob => appliedJob.jobId === AppliedJob.jobId)
      if (alreadyAppliedJob) {
        setAppliedJobDetail([...appliedJobDetail]);
      } else {
        const updatedJobViewDetail = {...jobViewDetail, discardStatus: true} 
        setJobViewDetail(updatedJobViewDetail);
        const newAppliedJob = {...AppliedJob, candidateId:employeeId}
        applyingjob(newAppliedJob);
      }
    }

    const handleDiscard = async(id) => {
      try {
        const response = await axios.delete(`http://localhost:5002/delete-job/${employeeId}/${id}`);
        alert("Job successfully deleted!");
        console.log(response.data);
        getAppliedjobs();
        const updatedJobViewDetail = {...jobViewDetail, discardStatus: false};  
        if(response.data.deletedCount === 1) {setJobViewDetail(updatedJobViewDetail);}
      } catch (error) {
        console.error(error);
      }
    }

    const handleJobSearch = () => {
      if(searchJobRoleInput){
        if(checkBoxFilteredJobs.length >0){
          const filteredJobs = checkBoxFilteredJobs.filter((job)=>job.jobRole.toLowerCase().includes(searchJobRoleInput.toLowerCase()));
          if(filteredJobs.length> 0){
            setSearchFilteredJobs(filteredJobs);
          }else{
            setSearchFilteredJobMsg("No such job found")
          }
        }else{
          if(!checkBoxFilteredJobMsg){
            const filteredJobs = jobDetail.filter((job)=>job.jobRole.toLowerCase().includes(searchJobRoleInput.toLowerCase()));
            if(filteredJobs.length> 0){
              setSearchFilteredJobs(filteredJobs);
            }else{
              setSearchFilteredJobMsg("No such job found")
            }
          }
        }
      }else{
        if(checkBoxFilteredJobs.length >0){
          setSearchFilteredJobs(checkBoxFilteredJobs);
        }
        setSearchFilteredJobs(jobDetail);
      }
    }
  
    const handleCheckboxChange = (category) => {
      const updatedFilters = checkBoxfilters.includes(category)
        ? checkBoxfilters.filter((filter) => filter !== category)
        : [...checkBoxfilters, category];
      setCheckBoxFilters(updatedFilters);
      if(updatedFilters.length > 0){
        if(searchFilteredJobs.length > 0){
          setSearchFilteredJobMsg("");
          setPrevSearchFilteredJobs(searchFilteredJobs)
          const filtered = searchFilteredJobs.filter((job) => updatedFilters.includes(job.jobCategory));
          if(filtered.length > 0){
            setSearchFilteredJobs(filtered);
          }else{
            setSearchFilteredJobMsg("No such job found");
          }
        }else{
          if(!searchFilteredJobMsg){
            const filtered = jobDetail.filter((job) => updatedFilters.includes(job.jobCategory));
            setCheckBoxFilteredJobMsg("");
            if(filtered.length > 0){
              setCheckBoxFilteredJobs(filtered);
            }else{
              setCheckBoxFilteredJobMsg("No such job found");
            }
          }
        }
      }else{
        if(searchFilteredJobs.length > 0){
          setSearchFilteredJobMsg("");
          setSearchFilteredJobs(prevSearchFilteredJobs);
        }else{
          setCheckBoxFilteredJobMsg("");
          setCheckBoxFilteredJobs(jobDetail);
        }
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
                    setAppliedJobMode(false);
                    setAllJobMode(false);
                  }}>Dash board</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    getSkillMatchJobDetail();
                    getAppliedjobs();
                    setDashBoard(false);
                    setAppliedJobMode(false);
                    setAllJobMode(true);
                  }}>All Jobs</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    getAppliedjobs();
                    setDashBoard(false);
                    setAppliedJobMode(true);
                    setAllJobMode(false);
                  }}>Applied Jobs</button></li>
                </ul>
              </div>
              <div style={{flex:10}}>
                {dashBoard && <div>
                <h1>Dash Board</h1>
                </div>}
                {allJobMode &&
                  <div>
                    <h2>All Jobs</h2>
                    <input 
                    type='search' 
                    name='searchJobRoleInput' 
                    id='searchJobRoleInput' 
                    className='form-control me-sm-2' 
                    placeholder='Search job role...' 
                    value={searchJobRoleInput}
                    onChange={(e)=>{
                      setSearchJobRoleInput(e.target.value);
                      setSearchFilteredJobs([]);
                      setSearchFilteredJobMsg("");
                    }}
                    />
                    <button className="btn btn-secondary my-2" type="submit" onClick={handleJobSearch}>Search</button>
                    <div class="form-check">
                        <input className="form-check-input" type="checkbox" checked={checkBoxfilters.includes('full time')}
                        onChange={() => handleCheckboxChange('full time')}/>
                        <label class="form-check-label" >
                          Full time
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" checked={checkBoxfilters.includes('part time')}
                        onChange={() => handleCheckboxChange('part time')}/>
                        <label class="form-check-label" >
                          Part time
                        </label>
                    </div>
                    <div class="form-check">
                        <input className="form-check-input" type="checkbox" checked={checkBoxfilters.includes('remote')}
                        onChange={() => handleCheckboxChange('remote')}/>
                        <label class="form-check-label" >
                          Remote
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" checked={checkBoxfilters.includes('freelancer')}
                        onChange={() => handleCheckboxChange('freelancer')}/>
                        <label class="form-check-label" >
                          Freelancer
                        </label>
                    </div>
                    <table className="table table-hover my-3">
                      <tbody>
                        {searchFilteredJobMsg ?
                        <p>{searchFilteredJobMsg}</p>:
                        searchFilteredJobs.length > 0 ?
                        searchFilteredJobs.map((job)=>{
                          return (
                            <tr key={job.jobId}>
                                <th scope="row" onClick={() => handleJobClick(job.jobId)}>{job.jobRole}</th>
                                <td>{job.percentage}%</td>
                            </tr>
                          );
                        }):
                        checkBoxFilteredJobMsg ?
                        <p>{checkBoxFilteredJobMsg}</p>:
                        checkBoxFilteredJobs.length > 0 ?
                        checkBoxFilteredJobs.map((job)=>{
                          return (
                            <tr key={job.jobId}>
                                <th scope="row" onClick={() => handleJobClick(job.jobId)}>{job.jobRole}</th>
                                <td>{job.percentage}%</td>
                            </tr>
                          );
                        }):
                        (!searchJobRoleInput && checkBoxfilters.length === 0) ?
                        jobDetail.map((job)=>{
                          return (
                            <tr key={job.jobId}>
                                <th scope="row" onClick={() => handleJobClick(job.jobId)}>{job.jobRole}</th>
                                <td>{job.percentage}%</td>
                            </tr>
                          );
                        }):null}
                      </tbody>
                    </table>
                    <br></br>
                    {jobView && !searchFilteredJobMsg && !checkBoxFilteredJobMsg && (
                      <div>
                        <h4>Job Details</h4>
                        <div>Job Role: {jobViewDetail.jobRole}</div>
                        <div>Mandatory Skills: {jobViewDetail.jobMandatorySkills.join(', ')}</div>
                        {jobViewDetail.jobAdditionalSkills.length > 0 &&
                          <div>Additional Skills: {jobViewDetail.jobAdditionalSkills.join(', ')}</div>
                        }
                        <div>Experience: {jobViewDetail.jobExperience}</div>
                        <div>Category: {jobViewDetail.jobCategory}</div>
                        <div>Description: {jobViewDetail.jobDescription}</div>
                        <div>Percentage matched with your skills: {jobViewDetail.percentage}%</div>
                        {!jobViewDetail.discardStatus && <button type="button" className="btn btn-outline-info my-2" onClick={()=>handleApply(jobViewDetail.jobId)}>Apply</button>}
                        {jobViewDetail.discardStatus && <button type="button" className="btn btn-outline-info my-2" onClick={()=>handleDiscard(jobViewDetail.jobId)}>Discard</button>}
                      </div>
                    )}
                  </div>
                }
                {appliedJobMode &&
                  <div>
                    {appliedJobDetail.length > 0 ? 
                      <div>
                        <h4>Your Applied Jobs</h4>
                        {appliedJobDetail.map((appliedJob)=>{
                          return <div key={appliedJob.jobId}>{appliedJob.jobRole}</div>
                        })}
                      </div>
                    :<p>still not applied for any jobs</p>}
                  </div>
                }
              </div>
        </div>
        <Footer/>
      </div>
  )
}

export default CandidateDashboard