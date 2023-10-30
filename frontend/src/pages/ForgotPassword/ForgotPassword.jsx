import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import $ from 'jquery';
import './ForgotPassword.css';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';

const ForgotPassword = () => {
    let { role } = useParams();
    console.log(role);
    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({
        email: "",
        tempPassword: "",
        password: "",
        confirmPassword: "",
    });
    const [tempPasswordUserId, setTempPasswordUserId] = useState("");
    const [fieldOn, setFieldOn] = useState(false);

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
                setFieldOn(true);
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

    const handleRequest = () => {
        updatedCredentials = {
            email: credentials.email,
            role,
        };
        console.log(updatedCredentials);
        requestTemporaryPassword(updatedCredentials);
    }

    const handleChangePassword = () => {
        updatedCredentials = {
            tempPassword: credentials.tempPassword,
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

    return (
        <div>
            {/* <Layout forgotPassword={true}/> */}
            <div className='container-fluid'>
                <h3>Change Your Password</h3>

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
                        onChange={handleInputChange}
                        placeholder="example@example.com"
                        required />
                </div>

                {!fieldOn && <button type="button" className="btn btn-outline-info my-3" onClick={handleRequest}>Request for temporary password</button>}

                {fieldOn &&
                    <div>
                        <div className="form-group">
                            <label
                                htmlFor="temporaryPasswordInput"
                                className="form-label mt-4">
                                Temporary Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="temporaryPasswordInput"
                                name="tempPassword"
                                value={credentials.tempPassword}
                                onChange={handleInputChange}
                                placeholder="Enter the given temporary password"
                                onPaste={(e) => e.preventDefault()}
                                required />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="passwordInput"
                                className="form-label mt-4">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                placeholder="Enter your new password"
                                onPaste={(e) => e.preventDefault()}
                                required />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="confirmPasswordInput"
                                className="form-label mt-4">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPasswordInput"
                                name="confirmPassword"
                                value={credentials.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Re-enter your new password"
                                onPaste={(e) => e.preventDefault()}
                                required />
                        </div>
                        <button type="button" className="btn btn-outline-info my-3" onClick={() => window.location.reload()}>Re-request for temporary password</button>
                        <button type="button" className="btn btn-outline-info my-3" onClick={handleChangePassword}>Change my password</button>
                    </div>
                }

            </div>

            <Layout newNavBarClientRegister={true} />
            <div className='cli--signup-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        {/* <div className="custom--container"> */}
                        <div className="row custom-column-reverse">
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 client-forgot-area">
                                <div className="cli--signup-form-area forgot">
                                    <div>
                                        <h5 className="cli--signup-title" data-aos="fade-left">Forgot your password</h5>
                                        <h6 className='cli--signup-sub-title' data-aos="fade-right">Welcome back! Plz enter your details</h6>

                                        <form action="" className='cli--signup-form'>
                                            <div className='cli--signup-form-group' data-aos="fade-up">
                                                <input type="text" id='email' name="email" placeholder="Enter Email/ mobile Number" className='cli--signup-form-input' required />
                                                <label htmlFor="email" className='cli--signup--form-label'>Enter Email/ mobile Number</label>
                                            </div>

                                            <div className="cli--create-account-btn-area" data-aos="fade-up">
                                                <button type='submit' className='cli--create-account-btn'>Send</button>
                                            </div>

                                        </form>

                                        <div className="cli--login-no-account-area mt-5" data-aos="fade-up">
                                            <span className='cli--login-no-account'>Don’t have an account?&nbsp;</span>
                                            <a href="/client-signup" className='cli--login-no-account-signup'>Sign up</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="cli--signup-img-area">
                                    <img src="../assets/img/signup/signup-img.webp" loading='lazy' data-aos="fade" data-aos-delay="300" className='cli--signup-img' alt="" />
                                </div>
                            </div>
                        </div>

                        <div className='cli--copyright-area'>
                            <i class="bi bi-c-circle me-2"></i>
                            <span className='cli--copyright'>2023 - Skillety Technologies Private Limited, All Rights Reserved.</span>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword