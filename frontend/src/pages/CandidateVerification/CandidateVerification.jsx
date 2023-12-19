import axios from 'axios';
import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import './ForgotPassword.css';
import './Verification.css';
import './Verification-responsive.css';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const CandidateVerification = () => {
    let { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [newCandidate, setnewCandidate] = useState();

    const [credentials, setcredentials] = useState({
        tempPassword: "",
        password: "",
        confirmPassword: "",
    });
    const [step, setStep]= useState(2);
    const [loading, setLoading] = useState(true);
    const [pageNotFound, setPageNotFound] = useState(false);


    let updatedCredentials;

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Alert',
            text: message,
            icon: 'info',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    useEffect(() => {
        const preloader = $('#preloader');
    if (preloader.length) {
    setTimeout(function () {
        preloader.fadeOut('slow', function () {
        preloader.remove();
        });
    }, 500);
    }
    }, []);

    const getCandidate = async () => {
        try {
            const response = await axios.get(`https://skillety.onrender.com/CandidateWithUrl-Detail/${id}`);
            const result = response.data;
            if (!result.error) {
                setLoading(false)
                console.log(result);
                setnewCandidate(result);
            } else {
                console.log(result);
                showErrorMessage("It seems like you already registered using this temporary URL, or the URL is incorrect.")
                setLoading(false)
                setPageNotFound(true)
                
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if(id){
            getCandidate();
        }
    }, [id]);

    
    const verify = async (userData) => {
        try {
            const response = await axios.post('https://skillety.onrender.com/verify-temp-password', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (result.message === "temporary password match") {
                console.log(result);
                setStep(2);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const finalCandidateRegister = async (userData) => {
        try {
            const response = await axios.post(`https://skillety.onrender.com/finalRegister-Candidate`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (!result.message) {
                console.log(result);
                 await new Promise(() => {
                    Swal.fire({
                        title: 'User Registered',
                        text: "You've been succesfully registered with Skillety.",
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate("/candidate-login")
                    });
                });
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
            await new Promise(() => {
                Swal.fire({
                    title: 'It seems that the user is not registered. Please try again.',
                    text: '',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcredentials({ ...credentials, [name]: value });
    }

    const handleVerification = (event) => {
        event.preventDefault();
        updatedCredentials = {
            tempPassword: credentials.tempPassword,
            id:newCandidate.id
        };
        console.log(updatedCredentials);
        verify(updatedCredentials);
    }

    const handleRegister = (event) => {
        event.preventDefault();
        updatedCredentials = {
            password: credentials.password,
            id:newCandidate.id
        }
        console.log(updatedCredentials);
        if (credentials.password.length >= 8) {
            if (credentials.password === credentials.confirmPassword) {
                finalCandidateRegister(updatedCredentials);
            } else {
                showErrorMessage("The confirmed password does not match your new password.")
            }
        } else {
            showErrorMessage("Your password must be at least 8 characters long.")
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                        <div>
                                            <h5 className="cli--signup-title" data-aos="fade-left">Welcome {newCandidate?.firstName} from {newCandidate?.companyName}</h5>
                                            <h6 className='cli--signup-sub-title' data-aos="fade-right">Enter Temporary Password</h6>
                                            
                                            <form action="" className='cli--signup-form' onSubmit={handleVerification}>
                                                <div className='cli--signup-form-group' data-aos="fade-up">
                                                    <input type="password" id='temp_password' name="tempPassword"
                                                    value={credentials.tempPassword}
                                                    onChange={handleInputChange} placeholder="Enter temporary password" className='cli--signup-form-input' required />
                                                    <label htmlFor="temp_password"className='cli--signup--form-label'>Enter Temporary Password</label>
                                                </div>
    
                                                <div className="cli--create-account-btn-area" data-aos="fade-up">
                                                    <button type='submit' className='cli--create-account-btn' >Send</button>
                                                </div>
                                            </form>

                        </div>
                )
            case 2:
                return (
                            <div>
                                                <h5 className="cli--signup-title" data-aos="fade-left">Welcome {newCandidate?.firstName}</h5>
                                                <h6 className='cli--signup-sub-title' data-aos="fade-right">Enter New Password</h6>
                                                
                                                <form action="" className='cli--signup-form' onSubmit={handleRegister}>
                                                    <div className='cli--signup-form-group' data-aos="fade-up">
                                                        <input type="password" id='password' name="password"
                                                        value={credentials.password}
                                                        onChange={handleInputChange} placeholder="Enter New Password" className='cli--signup-form-input' required />
                                                        <label htmlFor="email" className='cli--signup--form-label'>Enter New Password</label>
                                                    </div>
                                                    <div className='cli--signup-form-group' data-aos="fade-up">
                                                        <input type="password" id='confirm_password' name="confirmPassword"
                                                        value={credentials.confirmPassword}
                                                        onChange={handleInputChange} placeholder="Confirm Password" className='cli--signup-form-input' required />
                                                        <label htmlFor="email" className='cli--signup--form-label'>Confirm Password</label>
                                                    </div>
        
                                                    <div className="cli--create-account-btn-area" data-aos="fade-up">
                                                        <button type='submit' className='cli--create-account-btn' >Confirm</button>
                                                    </div>
                                                </form>
    
                            </div>
                )
            default:
                return null;
        }
    };

    return (
        <div>
            {loading && <div id="preloader"></div>}
           
            {newCandidate &&<div>
                <Layout candVerification={true}/>
                <div className='cli--signup-section'>
                        <div className='container-fluid'>
                            <div className='container-fluid container-section'>
                                {/* <div className="custom--container"> */}
                                <div className="row custom-column-reverse">
                                    <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 Candidate-forgot-area">
                                        <div className="cli--signup-form-area forgot">
                                            {renderStep()}
                                        </div>
                                    </div>
                                    <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="cli--signup-img-area">
                                            <img src="../assets/img/signup/candidate-login-img.jpeg" loading='lazy' data-aos="fade" data-aos-delay="300" className='cli--signup-img' alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className='cli--copyright-area'>
                                        <i class="bi bi-c-circle me-2"></i>
                                        <span className='cli--copyright'>2023 - Skillety Technologies Private Limited, All Rights Reserved.</span>
                                </div>
                            </div>
                        </div>
                </div>
                </div> }
                {pageNotFound && <div>
                    <h1>404</h1>
                    <p>Not Found</p>
                    <small>The resource requested could not be found on this server!</small>
                </div>}
            
        </div>
        
        
    )
}

export default CandidateVerification