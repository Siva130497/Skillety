import React, { useEffect } from 'react'
import axios from 'axios';

const CandidateDashboard = () => {
    const getAllJobDetail = async() => {
        try {
            const response = await axios.get('http://localhost:5002/job-Detail');
            const result = response.data;
      
            if (!result.error) {
              console.log(result);
            } else {
              console.log(result);
            }
          } catch (error) {
            console.log(error);
          }
    };

    useEffect(() => {
        getAllJobDetail();
    },[])
    
  return (
    <div>CandidateDashboard</div>
  )
}

export default CandidateDashboard