// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { v4 as uuidv4} from "uuid";
import AuthContext from '../../context/AuthContext';
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ClientDashboard = () => {
  const [candidateDetail, setCandidateDetail] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [jobRoleArray, setjobRoleArray] = useState([])
  const [filteredJobRoles, setFilteredJobRoles] = useState([]);

  // const docs = [
  //   { uri: require("../../")}, 
  // ];

//   const getAllCandidateDetail = async () => {
//     try {
//       const response = await axios.get('http://localhost:5002/candidate-Detail');
//       const result = response.data;

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

  useEffect(() => {
    getAllCandidateDetail();
    // getAllJobRoles();
  }, []);

  const getAllJobRoles = async ()=>{
    try{
        const res = await axios.get("http://localhost:5002/designations");
        setjobRoleArray(res.data);
    }catch(err){
        console.log(err);
    }
  }

//   const handleInputChange = (event) => {
    
//     const { value } = event.target;
//     const filteredArray = candidateDetail.filter(obj => {
//       if (obj.dayDifference !== undefined) {
//         const dayDifference = obj.dayDifference - 8;
//         if (value === "7") {
//           return dayDifference > 0 && dayDifference <= 7;
//         } else if (value === "15") {
//           return dayDifference > 7 && dayDifference <= 15;
//         } else if (value === "30") {
//           return dayDifference > 15 && dayDifference <= 30;
//         } else if (value === "moreThan30") {
//           return dayDifference > 30;
//         } else if (value === "imediateJoiner") {
//           return dayDifference === 0;
//         }
//       } else {
//         if (value === "imediateJoiner") {
//           return true; 
//         }
//       }
//       return false;
//     });
  
//     setFilteredCandidates(filteredArray);
//   };
  

//   // const handleFileDownload = async () => {
//   //   const id = 'cd821158-f4ac-4a42-bf5f-b2ce6846bf77';
//   //   try {
//   //     const response = await axios.get(`http://localhost:5002/download/${id}`, {
//   //       responseType: 'arraybuffer', // Ensure response is treated as binary data
//   //     });
  
//   //     const result = response.data;
  
  //     if (!result.error) {
  //       const blob = new Blob([result], { type: 'application/pdf' });
  //       const url = window.URL.createObjectURL(blob);
  //     } else {
  //       console.log(result);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  

  const handleJobRoleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
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
  }

  return (
            <div>
                <h1>Dash Board</h1>
                <hr className="my-4" />
                
                {candidateDetail.length === 0 ? <h3>No Candidate Yet</h3> 
                :<>
                    <p>Total Candidates: <strong>{candidateDetail.length}</strong></p>
                    <select 
                      className="form-select" 
                      onChange={handleInputChange}
                    >
                      <option value="">Select available candidates.</option>
                      <option value="imediateJoiner">Imediate joiners</option>
                      <option value="7">0 to 7 days</option>
                      <option value="15">8 to 15 days</option>
                      <option value="30">16 to 30 days</option>
                      <option value="moreThan30">More than 30 days</option>
                    </select>
                    {filteredCandidates.length > 0 && 
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
                              return <tr key={candidate.id} >
                                          <th scope="row">{candidate.firstName + candidate.lastName}</th>
                                          <td>{dayDifference}</td>
                                      </tr>
                              })}
                      </tbody>
                  </table>
                    }
                </>     
                }
                {/* <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} /> */}
                {/* <button onClick={handleFileDownload}>Download File</button> */}
                <h3>Job Posting</h3>

                <div className="form-group">
                  <label 
                  htmlFor="jobRoleInput" 
                  className="form-label mt-4">
                    Job Role
                  </label>
                  {selectedDesignations.map(selectDesignation => (
                      <span className="badge bg-success mx-2" 
                                key={selectDesignation}
                                onClick={()=>handleDeselectDesignation(selectDesignation)}
                                >{selectDesignation}</span>
                            ))}
                  <input 
                  type='text' 
                  name='searchInput' 
                  id='searchInput' 
                  className='form-control my-2' 
                  placeholder='Search job role...' 
                  value={searchInput}
                  onChange={handleJobRoleSearch}
                  />
                            {filteredDesignation.length > 0 &&
                                filteredDesignation.map((filterDesignation)=>{
                                    return <div key={filterDesignation._id} onClick={()=>handleDesignationClick(filterDesignation.designation)}>{filterDesignation.designation}</div> 
                                })
                            }
                            <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isCheckedDesignation}
                            onChange={()=>setIsCheckedDesignation(!isCheckedDesignation)}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                If your searched designation not in the list, please enable the checkbox & type manually...
                            </label>
                            <input 
                             type='text' 
                            name='manualDesignationInput' 
                            id='manualDesignationInput' 
                            className='form-control my-2' 
                            placeholder='Enter your designation...'
                            value={newDesignation}
                            onChange={(e)=>setNewDesignation(e.target.value)}
                            disabled = {!isCheckedDesignation}
                            />
                            <button 
                            type="button" 
                            className="btn btn-primary btn-sm"
                            onClick={handleManualDesignation}
                            disabled = {!isCheckedDesignation}
                            >add manually entered designation</button>
                        </div>
            </div>
            
//   );
// }

// export default ClientDashboard;
