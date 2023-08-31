import React, { useEffect } from 'react'
import axios from 'axios';

const ClientDashboard = () => {
  const getAllCandidateDetail = async () => {
    try {
        const response = await axios.get('http://localhost:5002/candidate-Detail');

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

  useEffect(()=>{
      getAllCandidateDetail();
  },[]);

  return (
    <div>ClientDashboard</div>
  )
}

export default ClientDashboard