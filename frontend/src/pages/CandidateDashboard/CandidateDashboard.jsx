import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import CandidateLogin from '../CandidateLogin/CandidateLogin';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';


const CandidateDashboard = () => {
  const [jobDetail, setJobDetail] = useState([]);
  const [filteredJob, setFilteredJob] = useState([]);
  const {employeeId, applyingjob, appliedJobStatus, setAppliedJobStatus} = useContext(AuthContext);
  const [jobView, setJobView] = useState(false);
  const [jobViewDetail, setJobViewDetail] = useState([]);
  const [appliedJobDetail, setAppliedJobDetail] = useState([]);
  
  
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


    useEffect(() => {
      if(employeeId){
        getSkillMatchJobDetail();
        getAppliedjobs();
      }
    },[employeeId])

    useEffect(()=>{
      if(appliedJobStatus){
        getAppliedjobs();
        setAppliedJobStatus(false);
      }
    },[appliedJobStatus])

    const handleChange = (e) => {
      const { value } = e.target;
      const jobResults = jobDetail.filter((job) => {
        if (value === "full time") {
          return job.jobCategory === value;
        } else if (value === "part time") {
          return job.jobCategory === value;
        } else if (value === "remote") {
          return job.jobCategory === value;
        } else if (value === "freelancer") {
          return job.jobCategory === value;
        }
      });
    
      setFilteredJob(jobResults);
    };
    
    const handleJobClick = (id) => {
      setJobView(prevJobView => !prevJobView);
      const selectedJob = filteredJob.find(job => job.jobId === id);
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
      const AppliedJob = filteredJob.find(job => job.jobId === id);
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
    
  return (
    <div>
        <Layout candidateHome={true}/>
        <div className='container-fluid'>
        <h1>Dash board</h1>
        <br></br>
        <h4>Job Category</h4> 
        <select 
        className="form-select" 
        onChange={handleChange}
        >
          <option value="">Select job category.</option>                    
          <option value="full time">Full time</option>
          <option value="part time">Part time</option>
          <option value="remote">Remote</option>
          <option value="freelancer">Freelancer</option>
        </select>
        <br></br>
        {filteredJob. length > 0 && 
          <table className="table table-hover my-3">
            <thead>
                <tr className='table-dark'>
                    <th scope="col">Job Role</th>
                    <th scope="col">Matched Percentage With Your Skills And Job Role Skills(%)</th>
                </tr>
            </thead>
            <tbody>
              {filteredJob.map((job)=>{
                return (
                  <tr key={job.jobId}>
                      <th scope="row" onClick={() => handleJobClick(job.jobId)}>{job.jobRole}</th>
                      <td>{job.percentage}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
        <br></br>
        {filteredJob.length > 0 && jobView && (
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
        <br></br>
        {appliedJobDetail.length > 0 &&
          <div>
            <br></br>
            <h4>Your Applied Jobs</h4>
            {appliedJobDetail.map((appliedJob)=>{
              return <div key={appliedJob.jobId}>{appliedJob.jobRole}</div>
            })}
          </div>
        }
        </div>
        <Footer/>
    </div>
    
  )
}

export default CandidateDashboard