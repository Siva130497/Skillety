import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import ATSLayout from '../../atsComponents/ATSLayout';
import Footer from '../../components/Footer';
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '../../context/AuthContext';
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from 'react-router-dom';

const OfflineCandidateCreate = () => {

    const initialCredentials = {
        firstName: "",
        lastName: "",
        mobileNumber: 0,
        emailId: "",
    };
    const [credentials, setCredentials] = useState(initialCredentials);

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [require, setRequire] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const { cand } = location.state || {};
    const { getProtectedData } = useContext(AuthContext);
    const [atsToken, setatsToken] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Congratulations!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value,
            }));
        
    };

    useEffect(() => {
        if (cand) {
            console.log(cand)

          setCredentials({
            ...credentials,
            firstName: cand.firstName,
            lastName: cand.lastName,
            mobileNumber: cand.mobileNumber,
            emailId: cand.emailId,
          })
        }
      }, [cand])

    useEffect(() => {
        setatsToken(JSON.parse(localStorage.getItem('atsToken')))
    }, [atsToken])

    useEffect(() => {
        if (atsToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(atsToken);
                    console.log(userData);
                    setEmployeeId(userData.id);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
        }
    }, [atsToken]);

    const registerUser = async (userData) => {
        try {
            const response = await axios.post('https://skillety-n6r1.onrender.com/offline-cand-reg', userData, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                  }
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                await new Promise(() => {
                    Swal.fire({
                        title: 'Invite link has been sent via email!',
                        text: 'Candidate has been created Successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate("/all-offline-candidates")
                    });
                });
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
            showErrorMessage(error.response.data.message);
        }
    };

    const updateClient = async (userData) => {
        try {
            const response = await axios.patch(`https://skillety-n6r1.onrender.com/update-exiesting-offline-cand/${cand.candId}`, userData, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                  }
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                await new Promise(() => {
                    Swal.fire({
                        title: 'Updated & Invited link sent via email!',
                        text: '',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate("/all-offline-candidates")
                    });
                });
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
            showErrorMessage(error.response.data.message);
            
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (credentials.firstName === "" || credentials.lastName === "" || credentials.mobileNumber === 0 || !(emailRegex.test(credentials.emailId))) {
            setRequire(true)
        }else{
                const candId = uuidv4();

                const updatedCredentials = {
                    ...credentials,
                    managerId:employeeId,
                    candId,
                };
                console.log(updatedCredentials);
                registerUser(updatedCredentials);
        }
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        
        if (credentials.firstName === "" || credentials.lastName === "" || credentials.mobileNumber === 0 || !(emailRegex.test(credentials.emailId))) {
            setRequire(true)
        }else{
                const updatedCredentials = {
                    ...credentials,
                };
                console.log(updatedCredentials);
                updateClient(updatedCredentials);

        }
    };

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="post-job-section">
                            <div className="admin-component-name">
                                {cand ? "Update" : "Create"} Candidate
                            </div>
                            <div className="card post-job-card">
                                <div className="post-job-title">{cand ? "Update" : "Create New"} Candidate </div>
                                {/* <div className="post-job-sub-title">Begin from scratch</div> */}


                                <div className="job-post-form-area p-t-40">
                                    <form action="">

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="first_name" className='job-post-form-label'>First Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='first_name'
                                                        name="firstName"
                                                        placeholder="Enter first name"
                                                        value={credentials.firstName}
                                                        onChange={handleInputChange}
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.firstName === "" && "required"}</small>}
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="last_name" className='job-post-form-label'>Last Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='last_name'
                                                        name="lastName"
                                                        placeholder="Enter last name"
                                                        value={credentials.lastName}
                                                        onChange={handleInputChange}
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.lastName === "" && "required"}</small>}
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="mobile_number" className='job-post-form-label'>Mobile Number<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='mobile_number'
                                                        name="mobileNumber"
                                                        placeholder="Enter mobile number"
                                                        min="0"
                                                        value={credentials.mobileNumber}
                                                        onChange={handleInputChange}
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.mobileNumber === 0 && "required"}</small>}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="email_id" className='job-post-form-label'>Email ID<span className='form-required'>*</span></label>
                                                    <input type="email"
                                                        className='job-post-form-input'
                                                        id='email_id'
                                                        name="emailId"
                                                        placeholder="Enter e-mail id"
                                                        value={credentials.emailId}
                                                        onChange={handleInputChange}
                                                        required />
                                                </div>
                                                <div className='text-capitalized form-error-message'>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.emailId === "" && "required"}</small>}
                                                <small className='text-danger text-capitalized'>{(credentials.emailId && !(emailRegex.test(credentials.emailId))) && "Enter valid email address"}</small>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="post-job-btn-area">
                                <button className='post-job-btn'
                                onClick={cand ? handleUpdate : handleSubmit}>{cand ? "Re-Send the Update info" : "Send"} Invite Link</button>
                            </div>
                        </div>
                    </section>
                </div >
                <Footer />
            </div >
        </div >
    )

}

export default OfflineCandidateCreate