import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const PostedJobs = () => {
    const {employeeId} = useContext(AuthContext);
    const [postedJobs, setPostedJobs] = useState([]);
    const [appliedOfPostedJobs, setAppliedOfPostedJobs] =useState([]);
    const [viewPostedJobStatus, setViewPostedJobStatus] = useState(false);
    const [selectedPostedJobViewDetail, setSelectedPostedJobViewDetail] = useState([]);

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

      const getAppliedOfPostedJobs = async() => {
        try{
            const res = await axios.get(`http://localhost:5002/applied-jobs-of-posted/${employeeId}`);
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setAppliedOfPostedJobs(result);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
        }
      }

    useEffect(()=>{
        getOwnPostedjobs();
        getAppliedOfPostedJobs();
    },[])

    const handleViewPosetedJobDetail = (id) => {
        setViewPostedJobStatus(preViewPostedJobStatus=>!preViewPostedJobStatus);
        const selectedPostedJob = postedJobs.find(postedJob=> postedJob.id === id);
        setSelectedPostedJobViewDetail(selectedPostedJob);
    }

  return (
    <div>
    {postedJobs.length > 0 ? <div>
        <h2>Posted Jobs</h2>
        <table className="table table-hover my-3">
        <thead>
            <tr className='table-dark'>
                <th scope="col">Job Role</th>
                <th scope="col">No of applicants</th>
            </tr>
        </thead>
        <tbody>
        {postedJobs.map((postedJob)=>{
            const numApplicants = appliedOfPostedJobs.filter(appliedOfPostedJob => appliedOfPostedJob.jobId === postedJob.id).length;
            return (
              <tr key={postedJob.id}>
                  <th scope="row" onClick={()=>handleViewPosetedJobDetail(postedJob.id)}>{postedJob.jobRole[0]}</th>
                  <td>{numApplicants}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
     {viewPostedJobStatus &&
        <div>
          <h4>Job Details</h4>
          <div>Job Role: {selectedPostedJobViewDetail.jobRole[0]}</div>
          <div>Job Category: {selectedPostedJobViewDetail.jobCategory}</div>
          <div>Job Mandatory Skills: {selectedPostedJobViewDetail.skills.join(', ')}</div>
          {selectedPostedJobViewDetail.additionalSkills.length > 0 &&
            <div>Job Additional Skills: {selectedPostedJobViewDetail.additionalSkills.join(', ')}</div>
          }
          <div>Job Description: {selectedPostedJobViewDetail.jobDescription}</div>
          <div>Needed Experience:{selectedPostedJobViewDetail.year} years and {selectedPostedJobViewDetail.month} months</div>
        </div>
     }
     </div> : <p>No jobs posted yet</p>}
     </div>
  )
}

export default PostedJobs