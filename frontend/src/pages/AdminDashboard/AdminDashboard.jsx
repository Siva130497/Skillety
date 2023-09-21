import React from 'react'
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import AdminLogin from '../AdminLogin/AdminLogin';
import Layout from '../../components/Layout';
import { v4 as uuidv4} from "uuid";
import axios from 'axios';

const AdminDashboard = () => {
  const {createRecruiter, setRecruiterCreatedStatus, recruiterCreatedStatus, employeeId} = useContext(AuthContext);

  const initialCredentials = {
    name:"",
    email:"",
    companyStaff:"",
  }
  const [credentials, setcredentials] = useState(initialCredentials);
  const [allRecruiters, setAllRecruiters] = useState([]);
  const [viewRecruiterDetailStatus, setViewRecruiterDetailStatus] = useState(false);
  const [selectedRecruiterViewDetail, setSelectedRecruiterViewDetail] = useState([]);
  
  const getAllRecruiters = async() => {
    try{
        const res = await axios.get(`http://localhost:5002/all-recruiters`);
        const result = res.data;
        if (!result.error) {
          console.log(result);
          setAllRecruiters(result);
        } else {
          console.log(result);
        }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if(employeeId){
      getAllRecruiters();
    }
  }, [employeeId]);

  useEffect(() => {
    if (recruiterCreatedStatus) {
      alert("New company staff has been created successfully!")
      setcredentials(initialCredentials);
      getAllRecruiters();
      setRecruiterCreatedStatus(false);
    }
  }, [recruiterCreatedStatus]);

  const handleViewRecruiterDetail = (id) => {
    setViewRecruiterDetailStatus(preViewRecruiterDetailStatus=>!preViewRecruiterDetailStatus);
    const selectedRecruiter = allRecruiters.find(recruiter=> recruiter.id === id);
    setSelectedRecruiterViewDetail(selectedRecruiter);
  }

  const handleRemove = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:5002/delete-recruiter/${id}`);
      alert("recruiter successfully removed from company!");
      console.log(response.data);
      getAllRecruiters();
    } catch (error) {
      console.error(error);
    }
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setcredentials({...credentials, [name]:value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = uuidv4();
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    const updatedCredentials = {
      ...credentials,
      id,
      password,
    };
    console.log(updatedCredentials);
    createRecruiter(updatedCredentials);
  }

  return (
    <>
      {employeeId ? <>
        <Layout/>
        <div className='container-fluid'>
          <h1>Dash board</h1>
          <br></br>
          {allRecruiters.length > 0 &&
             <>
              <h3>Created company staffs</h3>
              <table className="table table-hover my-3">
                <thead>
                    <tr className='table-dark'>
                        <th scope="col">Staff name</th>
                        <th scope="col">Staff type</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {allRecruiters.map((recruiter)=>{
                    return (
                      <tr key={recruiter.id}>
                          <th scope="row" onClick={()=>handleViewRecruiterDetail(recruiter.id)}>{recruiter.name}</th>
                          <td>{recruiter.companyStaff}</td>
                          <td><span className="badge rounded-pill bg-danger" onClick={()=>handleRemove(recruiter.id)}>Remove</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
             </>}
             <br></br>
             {viewRecruiterDetailStatus && allRecruiters.length > 0 &&
                <>
                  <h4>Company staff Details</h4>
                  <div>Staff name: {selectedRecruiterViewDetail.name}</div>
                  <div>Staff email: {selectedRecruiterViewDetail.email}</div>
                  <div>Staff type: {selectedRecruiterViewDetail.companyStaff}</div>
                </>
             }
          <br></br>
          <h4>Creating A Company Staff</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label 
              htmlFor="nameInput" 
              className="form-label mt-4">
                Staff Name
                </label>
                <input 
                type="text" 
                className="form-control" 
                id="textInput" 
                aria-describedby="staffName" 
                name="name" 
                value={credentials.name} 
                onChange = {handleInputChange} 
                placeholder="enter the staff name"
                required />
            </div>
            <div className="form-group">
              <label 
              htmlFor="emailInput" 
              className="form-label mt-4">
              Email address
              </label>
              <input 
              type="email" 
              className="form-control" 
              id="emailInput" 
              aria-describedby="emailHelp" 
              name="email" 
              value={credentials.email} 
              onChange = {handleInputChange} 
              placeholder="example@example.com"
              required />
            </div>
            <div className="form-group">
              <label 
              htmlFor="companyStaff" 
              className="form-label mt-4">
                Type of company staff
              </label>
              <select 
              className="form-select" 
              id="companyStaffSelect"
              name="companyStaff" 
              value = {credentials.companyStaff}
              onChange={handleInputChange}
              required>
                <option value="">Select type of company staff</option>
                <option value="HR">HR</option>
                <option value="Operator">Operator</option>
                <option value="Finance">Finance</option>
                <option value="Customer support executive">Customer support executive</option>
                <option value="digitalmarketing team">digitalmarketing team</option>
                <option value="RMG">RMG</option>
              </select>
            </div>
            <input type='submit' value="Create" className='btn btn-primary my-3' />
          </form>
        </div>
      </>:<AdminLogin/>}
    </>
  )
}

export default AdminDashboard