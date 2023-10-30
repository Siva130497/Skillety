import axios from 'axios';
import React, { useState } from 'react'
import $ from 'jquery';
import './ForgotPassword.css';
import './Verification.css';
import './Verification-responsive.css';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';

const ForgotPassword = () => {
    let { role } = useParams();
    console.log(role);
    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({
        email: "",
        verificationCode: "",
        password: "",
        confirmPassword: "",
    });
    const [tempPasswordUserId, setTempPasswordUserId] = useState("");
    const [step, setStep]= useState(1);

    let updatedCredentials;

    const requestTemporaryPassword = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5002/forgotpassword', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                setTempPasswordUserId(result.userWithTempPass.id)
                setStep(2);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const verify = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5002/verification', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (result.message === "verification code match") {
                console.log(result);
                setStep(3);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const changePassword = async (userData) => {
        try {
            const response = await axios.patch(`http://localhost:5002/newpassword/${tempPasswordUserId}`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (result.message === "Password updated successfully") {
                console.log(result);
                role === "Client" ? navigate("/client-login") : role === "Candidate" ? navigate("/candidate-login") : navigate("/admin-login")
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcredentials({ ...credentials, [name]: value });
    }

    const handleChange = (e, index) => {
        const value = e.target.value;
    
        if (value.length === 1) {
          const updatedCode = credentials.verificationCode + value;
          
          if (updatedCode.length === 6) {
            setcredentials({...credentials, verificationCode: updatedCode });
          } else {
            setcredentials({...credentials, verificationCode: updatedCode });
          }
        }
      };

    const handleRequest = (event) => {
        event.preventDefault();
        updatedCredentials = {
            email: credentials.email,
        };
        console.log(updatedCredentials);
        requestTemporaryPassword(updatedCredentials);
    }

    const handleVerification = (event) => {
        event.preventDefault();
        updatedCredentials = {
            verificationCode: credentials.verificationCode,
            id:tempPasswordUserId,
        };
        console.log(updatedCredentials);
        verify(updatedCredentials);
    }

    const handleChangePassword = (event) => {
        event.preventDefault();
        updatedCredentials = {
            password: credentials.password,
            role,
        }
        console.log(updatedCredentials);
        if (credentials.password.length >= 8) {
            if (credentials.password === credentials.confirmPassword) {
                changePassword(updatedCredentials);
            } else {
                alert("confirm password doesn't match with your new password")
            }
        } else {
            alert("password must be 8 characters long")
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                        <div>
                                            <h5 className="cli--signup-title" data-aos="fade-left">Forgot your password</h5>
                                            <h6 className='cli--signup-sub-title' data-aos="fade-right">Welcome back! Plz enter your details</h6>
    
                                            <form action="" className='cli--signup-form' onSubmit={handleRequest}>
                                                <div className='cli--signup-form-group' data-aos="fade-up">
                                                    <input type="email" id='email' name="email"
                                                    value={credentials.email}
                                                    onChange={handleInputChange} placeholder="Enter Email" className='cli--signup-form-input' required />
                                                    <label htmlFor="email" className='cli--signup--form-label'>Enter Email</label>
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
                                                <h5 className="cli--signup-title" data-aos="fade-left">Verification</h5>
                                                <h6 className='cli--signup-sub-title' data-aos="fade-right">Enter Verification Code</h6>
        
                                                <form action="" className='cli--signup-form' onSubmit={handleVerification}>
                                                    <div className='cli--signup-form-group' data-aos="fade-up">
                                                        {/* <div className="verify--input-box-area" data-aos="fade-up">
                                                            <input type="number" className='cli--verify-input-box' />
                                                            <input type="number" className='cli--verify-input-box' />
                                                            <input type="number" className='cli--verify-input-box' />
                                                            <input type="number" className='cli--verify-input-box' />
                                                            <input type="number" className='cli--verify-input-box' />
                                                            <input type="number" className='cli--verify-input-box' />
                                                        </div> */}
                                                        <div className="verify--input-box-area" data-aos="fade-up">
                                                            {[...Array(6).keys()].map((i) => (
                                                                <input
                                                                key={i}
                                                                type="number"
                                                                className='cli--verify-input-box'
                                                                value={credentials.verificationCode[i] || ""}
                                                                onChange={(e) => handleChange(e, i)}
                                                                />
                                                            ))}
                                                            </div>
                                                        <div className="verify-code-resend-area" data-aos="fade-up">
                                                            <h6 className='verify-code-resend mb-0'>If you didn’t receive a code, </h6>
                                                            <button className='verify-code-resend-btn' onClick={handleRequest}>Resend</button>
                                                        </div>
                                                    </div>
        
        
                                                    <div className="cli--create-account-btn-area" data-aos="fade-up">
                                                        <button type='submit' className='cli--create-account-btn'>Send</button>
                                                    </div>
        
                                                </form>
                        </div>
                )
            case 3:
                return (
                            <div>
                                                <h5 className="cli--signup-title" data-aos="fade-left">New Password</h5>
                                                
                                                <form action="" className='cli--signup-form' onSubmit={handleChangePassword}>
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
        
        <>
            <Layout forgotPassword={true}/>
            <div className='cli--signup-section'>
                    <div className='container-fluid'>
                        <div className='container-fluid container-section'>
                            {/* <div className="custom--container"> */}
                            <div className="row custom-column-reverse">
                                <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 client-forgot-area">
                                    <div className="cli--signup-form-area forgot">
                                        {renderStep()}
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                    <div className="cli--signup-img-area">
                                        <img src="../assets/img/signup/signup-img.jpg" loading='lazy' data-aos="fade" data-aos-delay="300" className='cli--signup-img' alt="" />
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
        </>
        
    )
}

export default ForgotPassword