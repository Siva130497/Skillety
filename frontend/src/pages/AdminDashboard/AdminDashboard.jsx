import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { v4 as uuidv4} from "uuid";
import axios from 'axios';
import { Footer } from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const adminToken = JSON.parse(localStorage.getItem("adminToken"));
  const navigate = useNavigate();

  const initialCredentials = {
    name:"",
    email:"",
    phone:"",
    companyStaff:"",
    password:"",
  }
  const [credentials, setcredentials] = useState(initialCredentials);
  const [allRecruiters, setAllRecruiters] = useState([]);
  const [viewRecruiterDetailStatus, setViewRecruiterDetailStatus] = useState(false);
  const [selectedRecruiterViewDetail, setSelectedRecruiterViewDetail] = useState([]);

  const [dashBoard, setDashBoard] = useState(true);
  const [allCompanyStaffMode, setAllCompanyStaffMode] = useState(false);
  const [companyStaffCreatingMode, setCompanyStaffCreatingMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  
  const getProtectedData = async () => {
    try {
      const response = await axios.get('https://skillety.onrender.com/protected', {
        headers: {
            Authorization: `Bearer ${adminToken}`,
            Accept: 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getProtectedData();
        console.log(id);
      } catch (error) {
        navigate("/admin-login")
      }
    };

    fetchData();
  }, []);

  const getAllRecruiters = async() => {
    try{
        const res = await axios.get(`https://skillety.onrender.com/all-recruiters`, {
          headers: {
              Authorization: `Bearer ${adminToken}`,
              Accept: 'application/json'
          }
        });
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

  //recruiter create request
  const createRecruiter = async (userData) => {
    try {
        const response = await axios.post('https://skillety.onrender.com/recruiter-create', userData, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
                Accept: 'application/json'
            }
          });

        const result = response.data;

        if (!result.error) {
            console.log(result);
            alert("New company staff has been created successfully!")
            setcredentials(initialCredentials);
        } else {
            console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
  };


  const handleViewRecruiterDetail = (id) => {
    setViewRecruiterDetailStatus(preViewRecruiterDetailStatus=>!preViewRecruiterDetailStatus);
    const selectedRecruiter = allRecruiters.find(recruiter=> recruiter.id === id);
    setSelectedRecruiterViewDetail(selectedRecruiter);
  }

  const handleRemove = async(id) => {
    try {
      const response = await axios.delete(`https://skillety.onrender.com/delete-recruiter/${id}`, {
        headers: {
            Authorization: `Bearer ${adminToken}`,
            Accept: 'application/json'
        }
      });
      alert("recruiter successfully removed from company!");
      console.log(response);
      getAllRecruiters();
    } catch (error) {
      console.error(error);
    }
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setcredentials({...credentials, [name]:value});
  }

  const handleGeneratePassword = () => {
    axios.get('https://skillety.onrender.com/random-password')
      .then(response => {
        setcredentials({...credentials, password:response.data});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = uuidv4();
    const updatedCredentials = {
      ...credentials,
      id,
    };
    console.log(updatedCredentials);
    createRecruiter(updatedCredentials);
  }

  
    return (
      <div>
        {/* <Layout/> */}
        <div className='container-fluid' style={{display: 'flex'}}>
          <div style={{flex:2}}>
            <ul>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(true);
                setAllCompanyStaffMode(false);
                setCompanyStaffCreatingMode(false);
              }}>Dash board</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                getAllRecruiters();
                setDashBoard(false);
                setAllCompanyStaffMode(true);
                setCompanyStaffCreatingMode(false);
              }}>All Company Staffs</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                setDashBoard(false);
                setAllCompanyStaffMode(false);
                setCompanyStaffCreatingMode(true);
              }}>Company Staff Creating</button></li>
              <li style={{listStyleType:'none'}}><button onClick={()=>{
                localStorage.removeItem("adminToken");
                window.location.reload();
              }}>Logout</button></li>
            </ul>
          </div>
          <div style={{flex:10}}>
            {dashBoard && <div>
            <h1>Dash Board</h1>
            </div>}
            {allCompanyStaffMode &&
              <div>
                {allRecruiters.length > 0 ?
                  <div>
                  <h3>Created company staffs</h3>
                  <table className="table table-hover my-3">
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
                  <br></br>
                  {viewRecruiterDetailStatus &&
                      <div>
                        <h4>Company staff Details</h4>
                        <div>Staff name: {selectedRecruiterViewDetail.name}</div>
                        <div>Staff email: {selectedRecruiterViewDetail.email}</div>
                        <div>Staff type: {selectedRecruiterViewDetail.companyStaff}</div>
                      </div>
                  }
                  </div> : <p>No Company Staff Created Yet</p>}
              </div>
            }
            {companyStaffCreatingMode  &&
            <div>
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
                  htmlFor="phoneInput" 
                  className="form-label mt-4">
                  Phone no
                  </label>
                  <input 
                  type="number" 
                  className="form-control" 
                  id="phoneInput" 
                  aria-describedby="phone_no" 
                  name="phone" 
                  value={credentials.phone} 
                  onChange = {handleInputChange} 
                  placeholder="0987654321"
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
                <div className="form-group">
                  <label 
                  htmlFor="passwordInput" 
                  className="form-label mt-4">
                    Password
                    </label>
                    <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="form-control" 
                    id="passwordInput" 
                    aria-describedby="passwordInput" 
                    name="password" 
                    value={credentials.password} 
                    onChange = {handleInputChange} 
                    placeholder="company staff password"
                    required />
                    <span className="badge rounded-pill bg-info" onClick={()=>setShowPassword(!showPassword)}>
                      {showPassword ? 'hide the password' : 'see the password'}
                    </span>
                    <button type="button" className="btn btn-link" onClick={handleGeneratePassword}>Generate Password</button>
                </div>
                <input type='submit' value="Create" className='btn btn-primary my-3' />
              </form>
            </div>
            }
          </div>
        </div>
        <Footer/>
      </div>
    )
  
  
}

export default AdminDashboard