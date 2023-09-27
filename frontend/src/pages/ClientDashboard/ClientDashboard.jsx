import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import AllCandidates from '../../components/AllCandidates';
import PostedJobs from '../../components/PostedJobs';
import JobPosting from '../../components/JobPosting';


const ClientDashboard = () => {
  
    const [dashBoard, setDashBoard] = useState(true);
    const [allCandidateMode, setAllCandidateMode] = useState(false);
    const [postedJobMode, setPostedJobMode] = useState(false);
    const [jobPostingMode, setJobPostingMode] = useState(false);

    return (
        <div>
            <Layout />
            <div className='container-fluid' style={{display: 'flex'}}>
              <div style={{flex:2}}>
                <ul>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(true);
                    setAllCandidateMode(false);
                    setPostedJobMode(false);
                    setJobPostingMode(false);
                  }}>Dash board</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(false);
                    setAllCandidateMode(true);
                    setPostedJobMode(false);
                    setJobPostingMode(false);
                  }}>All Candidates</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(false);
                    setAllCandidateMode(false);
                    setPostedJobMode(true);
                    setJobPostingMode(false);
                  }}>Posted Jobs</button></li>
                  <li style={{listStyleType:'none'}}><button onClick={()=>{
                    setDashBoard(false);
                    setAllCandidateMode(false);
                    setPostedJobMode(false);
                    setJobPostingMode(true);
                  }}>Job Posting</button></li>
                </ul>
              </div>
              <div style={{flex:10}}>
                {dashBoard && <div>
                <h1>Dash Board</h1>
                </div>}
                {allCandidateMode && <AllCandidates/>
                }
                {postedJobMode > 0 && <PostedJobs/>
                }
                {jobPostingMode  && <JobPosting/>}
              </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ClientDashboard;

