import React, { useEffect , useState } from 'react';
import axios from 'axios';

const AllJobs = ({staffToken, employeeId}) => {
    const [allJobs, setAllJobs] = useState([]);
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [assignedCandidates, setAssignedCandidates] = useState([]);
    const [searchCandidateByName, setSearchCandidateByName] = useState([]);
    const [searchCandidateByNameMsg, setSearchCandidateByNameMsg] = useState("");
    const [checkBoxfilters, setCheckBoxFilters] = useState([]);
    const [checkBoxFilteredJobs, setCheckBoxFilteredJobs] = useState([]);
    const [viewJobStatus, setViewJobStatus] = useState(false);
    const [selectedJobViewDetail, setSelectedJobViewDetail] = useState([]);
    const [searchFilteredJobs, setSearchFilteredJobs] = useState([]);
    const [searchFilteredJobMsg, setSearchFilteredJobMsg] = useState("");
    const [prevSearchFilteredJobs, setPrevSearchFilteredJobs] = useState([]);
    const [checkBoxFilteredJobMsg, setCheckBoxFilteredJobMsg] = useState("");
    const [searchJobRoleInput, setSearchJobRoleInput] = useState("");
    const [searchCandidateInput, setSearchCandidateInput] = useState("");

    const getPostedjobs = async() => {
        try{
            const res = await axios.get(`https://skillety-n6r1.onrender.com/posted-jobs`, {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            });
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

      const getAllCandidateDetail = async () => {
        try{
            const response = await axios.get('https://skillety-n6r1.onrender.com/candidate-Detail', {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setCandidateDetail(result);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
      };
    
      const getAssignedCandidates = async() => {
        try{
            const res = await axios.get(`https://skillety-n6r1.onrender.com/assigned-candidates`, {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setAssignedCandidates(result);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
        }
      }

      useEffect(()=>{
        getPostedjobs();
        getAllCandidateDetail();
        getAssignedCandidates();
      },[])

      const getRecruiterNameWhoAssignedCandidate = async(id) => {
        try{
            const res = await axios.get(`https://skillety-n6r1.onrender.com/staff/${id}`, {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              alert(`this candidate already assigned to this job by company saff ${result.name}`);
              setAssignedCandidates([...assignedCandidates]);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
        }
      }

      const assigningCandidate = async(candidate) => {
        try{
            const res = await axios.post('https://skillety-n6r1.onrender.com/candidate-assigning', candidate, {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if(!result.error){
                console.log(result);
                alert("candidate assigned successfully!");
            }else {
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
      }

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
            if(!checkBoxFilteredJobMsg){
              const filteredJobs = allJobs.filter((job)=>job.jobRole[0].toLowerCase().includes(searchJobRoleInput.toLowerCase()));
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
            if(!searchFilteredJobMsg){
              const filtered = allJobs.filter((job) => updatedFilters.includes(job.jobCategory));
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
            setCheckBoxFilteredJobs(allJobs);
          }
        }
      };

      const handleViewJobDetail = (id) => {
        setViewJobStatus(preViewJobStatus=>!preViewJobStatus);
        const selectedJob = allJobs.find(job=> job.id === id);
        setSelectedJobViewDetail(selectedJob);
      }
      
      const handleCandidateSearch = () => {
        const searchInput = searchCandidateInput.toLowerCase();
        const [searchFirstName, searchLastName] = searchInput.split(' ');
      
        const filteredCandidates = candidateDetail.filter(candidate => {
          const firstName = candidate.firstName.toLowerCase();
          const lastName = candidate.lastName.toLowerCase();
      
          if (searchLastName) {
            return (
              (firstName.includes(searchFirstName) && lastName.includes(searchLastName)) ||
              (firstName.includes(searchLastName) && lastName.includes(searchFirstName))
            );
          } else {
            return firstName.includes(searchFirstName) || lastName.includes(searchFirstName);
          }
        });
        if(filteredCandidates.length > 0){
          setSearchCandidateByName(filteredCandidates);
        }else{
          setSearchCandidateByNameMsg("no such candidate by this name")
        }
      }

      const handleAssigning = (id) => {
        const AssignedCandidate = candidateDetail.find(candidate => candidate.id === id);
        const alreadyAssignedCandidate = assignedCandidates
          .filter(assignCand => assignCand.id === AssignedCandidate.id)
          .find(cand => cand.jobId === selectedJobViewDetail.id);
        if (alreadyAssignedCandidate) {
          getRecruiterNameWhoAssignedCandidate(alreadyAssignedCandidate.recruiterId);
        } else {
          const newAssignedCandidate = {...AssignedCandidate, recruiterId:employeeId, jobId:selectedJobViewDetail.id}
          assigningCandidate(newAssignedCandidate);
        }
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
                <table className="table table-hover my-3">
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
                (!searchJobRoleInput && checkBoxfilters.length === 0) ?
                allJobs.map((Job)=>{
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
                  <div>
                    Assigned Candidates to this job:
                    {assignedCandidates
                      .filter(cand => cand.jobId === selectedJobViewDetail.id)
                      .map((candidate, index, array) => (
                        <span key={candidate.id}>
                          {candidate.firstName + " " + candidate.lastName}
                          {index !== array.length - 1 ? ',' : ''}
                        </span>
                      ))}
                  </div>
                  <input 
                  type='search' 
                  name='searchCandidate' 
                  id='searchCandidate' 
                  className='form-control me-sm-2' 
                  placeholder='Search candidate by name...' 
                  value={searchCandidateInput}
                  onChange={(e)=>{
                    setSearchCandidateInput(e.target.value);
                    setSearchCandidateByName([]);
                    setSearchCandidateByNameMsg("");
                  }}
                 />
                  <button className="btn btn-secondary my-2" type="submit" onClick={handleCandidateSearch}>Search</button>
                  {searchCandidateInput &&
                    <table className="table table-hover my-3">
                      {searchCandidateByName.length > 0  ?
                        <tbody>
                          {searchCandidateByName.map(searchedCandidate => {
                            return (
                              <tr key={searchedCandidate.id} >
                                <th>{searchedCandidate.firstName + " " + searchedCandidate.lastName}</th>
                                <td><span className="badge rounded-pill bg-info" onClick={()=>handleAssigning(searchedCandidate.id)}>Assigned the candidate to the job</span></td>
                              </tr>)
                          })}
                        </tbody> :
                        <div>{searchCandidateByNameMsg}</div>
                      }
                    </table>
                  }
                </div>
             }
             </div> : <p>No jobs yet</p>}
              </div>
  )
}

export default AllJobs