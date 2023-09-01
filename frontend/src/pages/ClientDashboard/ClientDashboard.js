import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientDashboard = () => {
  const [candidateDetail, setCandidateDetail] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [remainingDays, setRemainingDays] = useState(null);

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
        const dayDifference = obj.dayDifference - 10;
        setRemainingDays(dayDifference);
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
      <h2>Dash board</h2>
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
      <br/>
      {filteredCandidates.length > 0 && (
        <ul>
          {filteredCandidates.map(candidate => (
            <li key={candidate.id}>{candidate.firstName + candidate.lastName}-{remainingDays}days...</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientDashboard;
