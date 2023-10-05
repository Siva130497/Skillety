import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios';


const AllCandidates = ({employeeId, staffToken, clientToken}) => {

  const [candidateDetail, setCandidateDetail] = useState([]);
  const [viewCandidateDetailStatus, setViewCandidateDetailStatus] = useState(false);
  const [selectedCandidateArray, setSelectedCandidateArray] = useState([]);
  const [appliedOfPostedJobs, setAppliedOfPostedJobs] =useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [filteredMsg, setFilteredMsg] = useState("")
  const [searchInput, setSearchInput] = useState("");
  const [filteredSearchResults, setFilteredSearchResults]= useState([]);
  const [filteredSearchResultsMsg, setFilteredSearchResultsMsg] = useState("");


  const getAllCandidateDetail = async () => {
    try{
        const response = await axios.get('http://localhost:5002/candidate-Detail', {
          headers: {
              Authorization: `Bearer ${staffToken ? staffToken : clientToken}`,
              Accept: 'application/json'
          }
        });
        const result = response.data;
        if (!result.error) {
            console.log(result);
            setCandidateDetail(result.reverse());
        } else {
            console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
  };

  const getAppliedOfPostedJobs = async() => {
    try{
        const res = await axios.get(`http://localhost:5002/applied-jobs-of-posted/${employeeId}`, {
          headers: {
              Authorization: `Bearer ${staffToken ? staffToken : clientToken}`,
              Accept: 'application/json'
          }
        });
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
    getAllCandidateDetail();
    getAppliedOfPostedJobs();
  },[]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    if(value === ""){
      
    }
    const filteredArray = candidateDetail.filter(obj => {
      setFilteredMsg("");
      if (obj.dayDifference !== undefined) {
        const dayDifference = obj.dayDifference - 8;
        if (value === "7") {
          return dayDifference > 0 && dayDifference <= 7;
        } else if (value === "15") {
          return dayDifference > 7 && dayDifference <= 15;
        } else if (value === "30") {
          return dayDifference > 15 && dayDifference <= 30;
        } else if (value === "moreThan30") {
          return dayDifference > 30;
        } else if (value === "imediateJoiner") {
          return dayDifference === 0;
        }
      } else {
        if (value === "imediateJoiner") {
          return true; 
        }
      }
      return false;
    });
    if(filteredArray.length >0){
      setFilteredCandidates(filteredArray);
    }else{
      setFilteredCandidates([]);
      setFilteredMsg("No candidates available")
    }
  };

  const handleApiCall = () => {
    const accessToken = 'CJT85DoAcFM22rKrrQdrGkdWvWNUY_Xf';
    const key = 'OSCfJPqV1E_PNd3mX0zL9NIg5vkjMTMs5XfQ';
    const encodedCredentials = btoa(`${accessToken}:${key}`);
  
    const interviewCandidateName = selectedCandidateArray.firstName + ' ' + selectedCandidateArray.lastName;
    const interviewCandidateEmail = selectedCandidateArray.email;
    const interviewCandidatePhoneNo = selectedCandidateArray.phone;
    
    const data = JSON.stringify({
      candidates: [
        {
          name: interviewCandidateName,
          email: interviewCandidateEmail,
          phoneNo: "0"+interviewCandidatePhoneNo,
        },
      ],
      hiringRoleId: 4427,
      roundName: "Hands-On",
    });

    const config = {
      method: "post",
      url: "/external-interviews/request",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
  
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const viewCandidateDetail = (id) => {
    setViewCandidateDetailStatus(preViewCandidateStatus => !preViewCandidateStatus);
    const selectedCandidate = candidateDetail.find(filteredCandidate => filteredCandidate.id === id);
    setSelectedCandidateArray(selectedCandidate);
  }

  const handleSkillSearch = () => {
    const searchResults = searchInput
      .split(/[,\s]+/) 
      .filter(result => result.trim());
  
    const filteredObjBySkills = candidateDetail.filter(candidate =>
      searchResults.some(searchResult => 
        candidate.skills.some(skill =>
          skill.toLowerCase().includes(searchResult.toLowerCase())
        )
      )
    );

    const filteredObjByDesignation = candidateDetail.filter(candidate =>
      searchResults.some(searchResult => 
        candidate.designation[0].toLowerCase().includes(searchResult.toLowerCase())
      )
    );

    const mergedResults = [...filteredObjBySkills, ...filteredObjByDesignation];
    if(mergedResults.length > 0){
        setFilteredSearchResults(mergedResults);
    }else{
        setFilteredSearchResultsMsg("no such candidates found")
    }
  }

  
  return (
    <div>
        <div>
                { candidateDetail.length > 0 ?
                  <div>
                  {/* <p>Total Candidates: <strong>{candidateDetail.length}</strong></p> */}
                  {/* <select 
                  className="form-select" 
                  onChange={handleInputChange}
                  >
                  <option value="">Select available candidates.</option>
                  <option value="imediateJoiner">Imediate joiners</option>
                  <option value="7">0 to 7 days</option>
                  <option value="15">8 to 15 days</option>
                  <option value="30">16 to 30 days</option>
                  <option value="moreThan30">More than 30 days</option>
                  </select> */}
                  {/* <div class="form-check">
                    <input className="form-check-input" type="checkbox" checked={checkBoxfilters.includes('imediateJoiner')}
                    onChange={() => handleCheckboxChange('imediateJoiner')}/>
                    <label class="form-check-label" >
                    Imediate joiners
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" checked={checkBoxfilters.includes('7')}
                    onChange={() => handleCheckboxChange('7')}/>
                    <label class="form-check-label" >
                    0 to 7 days
                    </label>
                  </div>
                  <div class="form-check">
                    <input className="form-check-input" type="checkbox" checked={checkBoxfilters.includes('15')}
                    onChange={() => handleCheckboxChange('15')}/>
                    <label class="form-check-label" >
                    8 to 15 days
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" checked={checkBoxfilters.includes('30')}
                    onChange={() => handleCheckboxChange('30')}/>
                    <label class="form-check-label" >
                    16 to 30 days
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" checked={checkBoxfilters.includes('30')}
                    onChange={() => handleCheckboxChange('30')}/>
                    <label class="form-check-label" >
                    More than 30 days
                    </label>
                  </div> */}
                  <input 
                  type='search' 
                  name='searchInput' 
                  id='searchInput' 
                  className='form-control me-sm-2' 
                  placeholder='Search skills/designations...' 
                  value={searchInput}
                  onChange={(e)=>{
                  setSearchInput(e.target.value);
                  setFilteredSearchResults([]);
                  setFilteredSearchResultsMsg("");
                  }}
                  />
                 <button className="btn btn-secondary my-2" type="submit" onClick={handleSkillSearch}>Search</button>
                    <div>
                      {filteredMsg ? <p>{filteredMsg}</p> : 
                      <div>
                      <table className="table table-hover my-3">
                      {/* <thead>
                      <tr className='table-dark'>
                          <th scope="col">Full Name</th>
                          <th scope="col">Applied Jobs</th>
                      </tr>
                      </thead> */}
                      <tbody>
                      {filteredSearchResultsMsg ?
                      <p>{filteredSearchResultsMsg}</p>:
                      filteredSearchResults.length > 0 ?
                       filteredSearchResults.map((candidate)=>{
                        return(
                            <tr key={candidate.id}>
                                <th scope="row" onClick={()=>viewCandidateDetail(candidate.id)}>{candidate.firstName + ' ' + candidate.lastName}</th>
                            </tr>
                        )
                       }) :
                       !searchInput ? candidateDetail.map((candidate) => {
                        const nameOfAppliedJobs = appliedOfPostedJobs
                        .filter((appliedOfPostedJob) => appliedOfPostedJob.candidateId === candidate.id)
                        .map((appliedOfPostedJob) => appliedOfPostedJob.jobRole[0]);
                        return (
                            <tr key={candidate.id}>
                                <th scope="row" onClick={()=>viewCandidateDetail(candidate.id)}>{candidate.firstName + ' ' + candidate.lastName}</th>
                                {nameOfAppliedJobs.length > 0 ? <td>{nameOfAppliedJobs.join(', ')}</td> : <td>still not applied for your posted jobs</td>}
                            </tr>
                        );
                      }) : null}
                      </tbody>
                      </table>
                    </div>
                    }
                    </div>
                  {/* {filteredCandidates.length > 0 &&
                    <div>
                      <table className="table table-hover my-3">
                      <thead>
                      <tr className='table-dark'>
                          <th scope="col">Full Name</th>
                          <th scope="col">Available in.. (Days)</th>
                      </tr>
                      </thead>
                      <tbody>
                      {filteredCandidates.map((candidate) => {
                        const dayDifference = candidate.dayDifference !== undefined
                            ? candidate.dayDifference - 8
                            : 0;
                        return (
                            <tr key={candidate.id}>
                                <th scope="row" onClick={()=>viewCandidateDetail(candidate.id)}>{candidate.firstName + ' ' + candidate.lastName}</th>
                                <td>{dayDifference}</td>
                            </tr>
                        );
                      })}
                      </tbody>
                    </table>
                    </div>
                  } */}
                  <br></br>
                  {viewCandidateDetailStatus &&
                    <div>
                      <h4>Candidate Details</h4>
                      <div>Full Name: {selectedCandidateArray.firstName + ' ' + selectedCandidateArray.lastName}</div>
                      <div>Email: {selectedCandidateArray.email}</div>
                      <div>Phone No: {selectedCandidateArray.phone}</div>
                      <div>Current Job Role: {selectedCandidateArray.designation[0]}</div>
                      <div>Skills: {selectedCandidateArray.skills.join(', ')}</div>
                      <div>Experience: {`${selectedCandidateArray.year} years and ${selectedCandidateArray.month} months`}</div>
                      <div>Current/Previous Working/Worked Company Name : {selectedCandidateArray.companyName}</div>
                      <div>College: {selectedCandidateArray.college}</div>
                      <div>Education: {selectedCandidateArray.education}</div>
                      <div>Location: {selectedCandidateArray.location}</div>
                      <div>About him/her: {selectedCandidateArray.profileHeadline}</div>
                      <div>Last Working Day: {selectedCandidateArray.selectedDate}</div>
                      <button type="button" className="btn btn-outline-info my-3" onClick={handleApiCall}>Send the candidate to interview</button>
                    </div>
                  }
                  </div>
                : <h3>No Candidate Yet</h3>}
              </div>
    </div>
  )
}

export default AllCandidates