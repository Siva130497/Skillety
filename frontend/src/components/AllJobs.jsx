import React, { useEffect , useState } from 'react';
import axios from 'axios';

const AllJobs = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [checkBoxfilters, setCheckBoxFilters] = useState([]);
    const [checkBoxFilteredJobs, setCheckBoxFilteredJobs] = useState([]);
    const [viewJobStatus, setViewJobStatus] = useState(false);
    const [selectedJobViewDetail, setSelectedJobViewDetail] = useState([]);
    const [searchFilteredJobs, setSearchFilteredJobs] = useState([]);
    const [searchFilteredJobMsg, setSearchFilteredJobMsg] = useState("");
    const [prevSearchFilteredJobs, setPrevSearchFilteredJobs] = useState([]);
    const [checkBoxFilteredJobMsg, setCheckBoxFilteredJobMsg] = useState("");
    const [searchJobRoleInput, setSearchJobRoleInput] = useState("");

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
        getPostedjobs();
      },[])

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
            const filteredJobs = allJobs.filter((job)=>job.jobRole[0].toLowerCase().includes(searchJobRoleInput.toLowerCase()));
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
          setSearchFilteredJobs(allJobs);
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
            const filtered = allJobs.filter((job) => updatedFilters.includes(job.jobCategory));
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
            setCheckBoxFilteredJobs(allJobs);
          }
        }
      };

      const handleViewJobDetail = (id) => {
        setViewJobStatus(preViewJobStatus=>!preViewJobStatus);
        const selectedJob = allJobs.reverse().find(job=> job.id === id);
        setSelectedJobViewDetail(selectedJob);
      }

  return (
    <div>
              {allJobs.length > 0 ? <div>
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
                {/* <p>Total Jobs: <strong>{ searchFilteredJobMsg ? searchFilteredJobs.length : searchFilteredJobs.length > 0 ? searchFilteredJobs.length : checkBoxFilteredJobMsg ? checkBoxFilteredJobs.length : checkBoxFilteredJobs.length > 0 ? checkBoxFilteredJobs.length : !searchJobRoleInput ? allJobs.length : null }</strong></p> */}
                <table className="table table-hover my-3">
                {/* {(searchFilteredJobs.length > 0 || !searchJobRoleInput) && <thead>
                    <tr className='table-dark'>
                        <th scope="col">Job Role</th>
                    </tr>
                </thead>} */}
                <tbody>
                {searchFilteredJobMsg ?
                <p>{searchFilteredJobMsg}</p>:
                searchFilteredJobs.length > 0 ?
                searchFilteredJobs.map((Job)=>{
                  return (
                    <tr key={Job.id}>
                        <th scope="row" onClick={()=>handleViewJobDetail(Job.id)}>{Job.jobRole[0]}</th>
                    </tr>
                  );
                }):
                checkBoxFilteredJobMsg ?
                <p>{checkBoxFilteredJobMsg}</p>:
                checkBoxFilteredJobs.length > 0 ?
                checkBoxFilteredJobs.map((Job)=>{
                  return (
                    <tr key={Job.id}>
                        <th scope="row" onClick={()=>handleViewJobDetail(Job.id)}>{Job.jobRole[0]}</th>
                    </tr>
                  );
                }):
                !searchJobRoleInput ?
                allJobs.reverse().map((Job)=>{
                    return (
                      <tr key={Job.id}>
                          <th scope="row" onClick={()=>handleViewJobDetail(Job.id)}>{Job.jobRole[0]}</th>
                      </tr>
                    );
                  }):null}
                </tbody>
              </table>

              <br></br>
             {viewJobStatus && !searchFilteredJobMsg && !checkBoxFilteredJobMsg &&
                <div>
                  <h4>Job Details</h4>
                  <div>Job Role: {selectedJobViewDetail.jobRole[0]}</div>
                  <div>Job Category: {selectedJobViewDetail.jobCategory}</div>
                  <div>Job Mandatory Skills: {selectedJobViewDetail.skills.join(', ')}</div>
                  {selectedJobViewDetail.additionalSkills.length > 0 &&
                    <div>Job Additional Skills: {selectedJobViewDetail.additionalSkills.join(', ')}</div>
                  }
                  <div>Job Description: {selectedJobViewDetail.jobDescription}</div>
                  <div>Needed Experience:{selectedJobViewDetail.year} years and {selectedJobViewDetail.month} months</div>
                </div>
             }
             </div> : <p>No jobs yet</p>}
              </div>
  )
}

export default AllJobs