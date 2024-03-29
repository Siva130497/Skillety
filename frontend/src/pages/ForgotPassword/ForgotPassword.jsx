import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react'
import $ from 'jquery';
import './ForgotPassword.css';
import './Verification.css';
import './Verification-responsive.css';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

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

    const inputRefs = useRef([]);

    const [tempPasswordUserId, setTempPasswordUserId] = useState("");
    const [step, setStep] = useState(1);

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
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
    });
  }

    useEffect(() => {
    
        const candidateToken = JSON.parse(localStorage.getItem('candidateToken'));
        const clientToken = JSON.parse(localStorage.getItem('clientToken'));
        // const staffToken = JSON.parse(localStorage.getItem('staffToken'));
    
    
        if (clientToken) {
          navigate("/client-home");
         
        }else if (candidateToken){
          navigate("/")
          
        }
      }, [navigate]);

    const requestTemporaryPassword = async (userData) => {
        try {
            const response = await axios.post('https://skillety-n6r1.onrender.com/forgotpassword', userData, {
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
            showErrorMessage(error.response.data.error);
        }
    };

    const verify = async (userData) => {
        try {
            const response = await axios.post('https://skillety-n6r1.onrender.com/verification', userData, {
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
                showErrorMessage(result);
            }
        } catch (error) {
            console.log(error);
            showErrorMessage(error.response.data.error);
        }
    };

    const changePassword = async (userData) => {
        try {
            const response = await axios.patch(`https://skillety-n6r1.onrender.com/newpassword/${tempPasswordUserId}`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (result.message === "Password updated successfully") {
                console.log(result);
                await new Promise(() => {
                    Swal.fire({
                        title: '',
                        text: 'Your password has been reset',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        role === "Client" ? navigate("/client-login") : role === "Candidate" ? navigate("/candidate-login") : navigate("/admin-login")
                    });
                })
            } else {
                console.log(result);
            }
        } catch (error) {
            showErrorMessage(error.response.data.error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcredentials({ ...credentials, [name]: value });
    }

    // const handleChange = (e, index) => {
    //     const value = e.target.value;

    //     if (value.length === 1) {
    //         const updatedCode = credentials.verificationCode + value;

    //         if (updatedCode.length === 6) {
    //             setcredentials({ ...credentials, verificationCode: updatedCode });
    //         } else {
    //             setcredentials({ ...credentials, verificationCode: updatedCode });
    //         }
    //     }
    // };

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (value.length === 1 && index < 5) {
            setcredentials(prevCredentials => {
                const updatedCode = prevCredentials.verificationCode.slice(0, index) + value + prevCredentials.verificationCode.slice(index + 1);
                const newCredentials = { ...prevCredentials, verificationCode: updatedCode };
                inputRefs.current[index + 1].focus();
                return newCredentials;
            });
        } else if (value === '' && index > 0) {
            setcredentials(prevCredentials => {
                const updatedCode = prevCredentials.verificationCode.slice(0, index) + value + prevCredentials.verificationCode.slice(index + 1);
                const newCredentials = { ...prevCredentials, verificationCode: updatedCode };
                inputRefs.current[index - 1].focus();
                return newCredentials;
            });
        } else if (value === '' && index === 0) {
            setcredentials(prevCredentials => {
                const updatedCode = value + prevCredentials.verificationCode.slice(index + 1);
                const newCredentials = { ...prevCredentials, verificationCode: updatedCode };
                return newCredentials;
            });
        } else if (value.length === 1 && index === 5) {
            setcredentials(prevCredentials => {
                const updatedCode = prevCredentials.verificationCode.slice(0, index) + value;
                const newCredentials = { ...prevCredentials, verificationCode: updatedCode };
                return newCredentials;
            });
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
            id: tempPasswordUserId,
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
                showErrorMessage("confirm password doesn't match with your new password")
            }
        } else {
            showErrorMessage("Password must be 8 characters long")
        }
    }


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h5 className="cli--signup-title" data-aos="fade-left">Forgot your password</h5>
                        <h6 className='cli--signup-sub-title' data-aos="fade-right">Please enter the email address associated with your account and we'll send you an OTP to reset your password</h6>

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
                                            ref={el => inputRefs.current[i] = el}
                                        />
                                    ))}
                                </div>
                                <div className="verify-code-resend-area" data-aos="fade-up">
                                    <h6 className='verify-code-resend mb-0'>If you didn’t receive a code,&nbsp;</h6>
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
                                {credentials.password != "" &&
                                    <i class="bi bi-eye-slash show-pwd-icon" id="togglePassword" onClick={handleTogglePassword}></i>
                                }
                                <input type={showPassword ? "text" : "password"} id='password' name="password"
                                    value={credentials.password}
                                    onChange={handleInputChange} placeholder="Enter New Password" className='cli--signup-form-input' required />
                                <label htmlFor="email" className='cli--signup--form-label'>Enter New Password</label>
                            </div>
                            <div className='cli--signup-form-group' data-aos="fade-up">
                                {credentials.confirmPassword != "" &&
                                    <i class="bi bi-eye-slash show-pwd-icon" id="toggleConfirmPassword" onClick={handleToggleConfirmPassword}></i>
                                }
                                <input type={showConfirmPassword ? "text" : "password"} id='confirm_password' name="confirmPassword"
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
            <Layout forgotPassword={true} />
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
                                    {window.location.pathname === "/forgot-password/Client" ? (
                                        <img src="../assets/img/signup/signup-img.jpg" loading='lazy' data-aos="fade" data-aos-delay="300" className='cli--signup-img' alt="" />
                                    ) : (
                                        <img src="../assets/img/signup/candidate-login-img.jpeg" loading='lazy' data-aos="fade" data-aos-delay="300" className='cli--signup-img' alt="" />
                                    )
                                    }
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