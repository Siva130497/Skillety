import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientDashboard = () => {
  const [candidateDetail, setCandidateDetail] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const getAllCandidateDetail = async () => {
    try {
      const response = await axios.get('http://localhost:5002/candidate-Detail');
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

  useEffect(() => {
    getAllCandidateDetail();
  }, []);

  const handleInputChange = (event) => {
    
    const { value } = event.target;
    const filteredArray = candidateDetail.filter(obj => {
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
  
    setFilteredCandidates(filteredArray);
  };
  

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
            </div>
  );
}

export default ClientDashboard;
