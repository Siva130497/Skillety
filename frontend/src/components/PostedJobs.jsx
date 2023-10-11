import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';


const PostedJobs = ({employeeId, staffToken, clientToken, companyId}) => {
    
    const [postedJobs, setPostedJobs] = useState([]);
    const [appliedOfPostedJobs, setAppliedOfPostedJobs] =useState([]);
    const [viewPostedJobStatus, setViewPostedJobStatus] = useState(false);
    const [selectedPostedJobViewDetail, setSelectedPostedJobViewDetail] = useState([]);
    const [checkBoxfilters, setCheckBoxFilters] = useState([]);
    const [checkBoxFilteredJobs, setCheckBoxFilteredJobs] = useState([]);
    const [searchFilteredJobs, setSearchFilteredJobs] = useState([]);
    const [searchFilteredJobMsg, setSearchFilteredJobMsg] = useState("");
    const [prevSearchFilteredJobs, setPrevSearchFilteredJobs] = useState([]);
    const [checkBoxFilteredJobMsg, setCheckBoxFilteredJobMsg] = useState("");
    const [searchJobRoleInput, setSearchJobRoleInput] = useState("");

    const getOwnPostedjobs = async() => {
        try{
            const res = await axios.get(`http://localhost:5002/my-posted-jobs/${employeeId ? employeeId : companyId}`, {
              headers: {
                  Authorization: `Bearer ${staffToken ? staffToken : clientToken}`,
                  Accept: 'application/json'
              }
            });
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
            const res = await axios.get(`http://localhost:5002/applied-jobs-of-posted/${employeeId ? employeeId : companyId}`, {
              headers: {
                  Authorization: `Bearer ${staffToken ? staffToken : clientToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setAppliedOfPostedJobs(result.reverse());
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
    },[]);

    const handleJobSearch = () => {
      if(searchJobRoleInput){
        if(checkBoxFilteredJobs.length >0){
          const filteredJobs = checkBoxFilteredJobs.filter((job)=>job.jobRole[0].toLowerCase().includes(searchJobRoleInput.toLowerCase()));
          if(filteredJobs.length> 0){
            setSearchFilteredJobs(filteredJobs);
          }else{
            setSearchFilteredJobMsg("No such job found")
          }
        }else{
          const filteredJobs = postedJobs.filter((job)=>job.jobRole[0].toLowerCase().includes(searchJobRoleInput.toLowerCase()));
          if(filteredJobs.length> 0){
            setSearchFilteredJobs(filteredJobs);
          }else{
            setSearchFilteredJobMsg("No such job found")
          }
        }
      }else{
        if(checkBoxFilteredJobs.length >0){
          setSearchFilteredJobs(checkBoxFilteredJobs);
        }
        setSearchFilteredJobs(postedJobs);
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
          const filtered = postedJobs.filter((job) => updatedFilters.includes(job.jobCategory));
          setCheckBoxFilteredJobMsg("");
          if(filtered.length > 0){
            setCheckBoxFilteredJobs(filtered);
          }else{
            setCheckBoxFilteredJobMsg("No such job found");
          }
        }
      }else{
        if(searchFilteredJobs.length > 0){
          setSearchFilteredJobMsg("");
          setSearchFilteredJobs(prevSearchFilteredJobs);
        }else{
          setCheckBoxFilteredJobMsg("");
          setCheckBoxFilteredJobs(postedJobs);
        }
      }
    };

    const handleViewPosetedJobDetail = (id) => {
        setViewPostedJobStatus(preViewPostedJobStatus=>!preViewPostedJobStatus);
        const selectedPostedJob = postedJobs.find(postedJob=> postedJob.id === id);
        setSelectedPostedJobViewDetail(selectedPostedJob);
    }

  return (
    <div>
    {postedJobs.length > 0 ? <div>
        <h2>Posted Jobs</h2>
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
        {/* <thead>
            <tr className='table-dark'>
                <th scope="col">Job Role</th>
                <th scope="col">No of applicants</th>
            </tr>
        </thead> */}
        <tbody>
        {searchFilteredJobMsg ?
                <p>{searchFilteredJobMsg}</p>:
                searchFilteredJobs.length > 0 ?
                searchFilteredJobs.map((postedJob)=>{
                  return (
                    <tr key={postedJob.id}>
                        <th scope="row" onClick={()=>handleViewPosetedJobDetail(postedJob.id)}>{postedJob.jobRole[0]}</th>
                    </tr>
                  );
                }):
                checkBoxFilteredJobMsg ?
                <p>{checkBoxFilteredJobMsg}</p>:
                checkBoxFilteredJobs.length > 0 ?
                checkBoxFilteredJobs.map((postedJob)=>{
                  return (
                    <tr key={postedJob.id}>
                        <th scope="row" onClick={()=>handleViewPosetedJobDetail(postedJob.id)}>{postedJob.jobRole[0]}</th>
                    </tr>
                  );
                }):
                !searchJobRoleInput ?
                postedJobs.map((postedJob)=>{
                    const numApplicants = appliedOfPostedJobs.filter(appliedOfPostedJob => appliedOfPostedJob.jobId === postedJob.id).length;
                    return (
                      <tr key={postedJob.id}>
                          <th scope="row" onClick={()=>handleViewPosetedJobDetail(postedJob.id)}>{postedJob.jobRole[0]}</th>
                          <td>{numApplicants}</td>
                      </tr>
                    );
                  }):null}
        </tbody>
      </table>
      <br></br>
     {viewPostedJobStatus && !searchFilteredJobMsg && !checkBoxFilteredJobMsg &&
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