import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import $ from 'jquery';
import './ClientLogin.css';
import './ClientLogin-responsive.css';
import AuthContext from '../../context/AuthContext';
import ClientDashBoard from '../ClientDashboard/ClientDashboard';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const ClientLogin = () => {
    const { loginUser, dashBoard } = useContext(AuthContext)
    const [credentials, setcredentials] = useState({
        email: "",
        password: "",
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcredentials({ ...credentials, [name]: value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const userType = "login-Client"
        const updatedCredentials = [credentials, userType]
        loginUser(updatedCredentials);

    }
    useEffect(() => {
        $(document).ready(function () {
            // Function to toggle password visibility
            function togglePasswordVisibility(inputId, iconId) {
                var passwordInput = $('#' + inputId);
                var passwordIcon = $('#' + iconId);

                // Toggle password visibility
                if (passwordInput.attr('type') === 'password') {
                    passwordInput.attr('type', 'text');
                    passwordIcon.removeClass('bi-eye-slash').addClass('bi-eye');
                } else {
                    passwordInput.attr('type', 'password');
                    passwordIcon.removeClass('bi-eye').addClass('bi-eye-slash');
                }
            }

            // Toggle password visibility when the eye icons are clicked
            $('#togglePassword').click(function () {
                togglePasswordVisibility('password', 'togglePassword');
            });

            // Hide the eye icons when the password fields are empty
            $('input[type="password"]').on('input', function () {
                var inputId = $(this).attr('id');
                var iconId = 'toggle' + inputId.charAt(0).toUpperCase() + inputId.slice(1);

                if ($(this).val().trim() === '') {
                    $('#' + iconId).hide();
                } else {
                    $('#' + iconId).show();
                }
            });
        });
    }, []);

    return (
        <div>
            {/* <Layout newNavBarClientLogin = {true} />
            <div className='container-fluid'>
            {dashBoard ? <ClientDashBoard /> :
                <>
                    <h3>Login</h3>

                <form onSubmit={handleSubmit}>
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
                    htmlFor="passwordInput" 
                    className="form-label mt-4">
                        Password
                    </label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="passwordInput" 
                    name="password" 
                    value = {credentials.password} 
                    onChange = {handleInputChange} 
                    placeholder="Enter your password"
                    required />
                </div>
                <input type='submit' value="Login" className='btn btn-primary my-3' />
                <p>
                    Don't have an account ? <Link to = "/client-register">Create One</Link>
                </p>

                    </form>
                </>
            }
            </div> */}
            <Layout newNavBarClientLogin={true} />
            <div className='cli--signup-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        {/* <div className="custom--container"> */}
                        <div className="row custom-column-reverse">
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="cli--signup-form-area cli--login-form-area">
                                    <h5 className="cli--signup-title" data-aos="fade-left">Welcome back Jaden</h5>
                                    <h6 className='cli--signup-sub-title' data-aos="fade-right">Welcome back! Plz enter your details</h6>

                                    <div className="cli--login-with-google-btn-area">
                                        <a href="#" className='cli--login-with-google-btn' data-aos="fade-up">
                                            <img src="assets/img/signup/google-icon.png" className='google-icon' alt="" />
                                            <span>Log in with Google</span>
                                        </a>
                                    </div>

                                    <form action="" className='cli--signup-form'>
                                        <div className='cli--signup-form-group' data-aos="fade-up">
                                            <input type="text" id='user_id' name="user_id" placeholder="Enter your User ID" className='cli--signup-form-input' required />
                                            <label htmlFor="user_id" className='cli--signup--form-label'>User Id</label>
                                        </div>

                                        <div className='cli--signup-form-group' data-aos="fade-up">
                                            <i class="bi bi-eye-slash toggle-eye" id="togglePassword"></i>
                                            <input type="password" id='password' name="password" placeholder="Enter your password" className='cli--signup-form-input' required />
                                            <label htmlFor="password" className='cli--signup--form-label'>Password</label>
                                        </div>

                                        <div className="cli--login-forgot-remember-area">
                                            <div className="cli--login-remember-area" data-aos="fade-right">
                                                <label className="cli--login-remember-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="cli--login-remember-checkmark"></span>
                                                    Remember Details
                                                </label>
                                            </div>
                                            <div className="cli--login-forgot-area" data-aos="fade-left">
                                                <a href="" className='cli--login-forgot'>Forgot Password</a>
                                            </div>
                                        </div>

                                        <div className="cli--create-account-btn-area" data-aos="fade-up">
                                            <button type='submit' className='cli--create-account-btn'>Log In</button>
                                        </div>

                                    </form>
                                    <div className="cli--login-no-account-area" data-aos="fade-up">
                                        <span className='cli--login-no-account'>Don’t have an account?&nbsp;</span>
                                        <a href="/client-signup" className='cli--login-no-account-signup'>Sign up</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="cli--signup-img-area">
                                    <img src="assets/img/signup/signup-img.jpg" data-aos="fade" data-aos-delay="300" className='cli--signup-img cli--login-img' alt="" />
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
            <Footer noFooter={true} />
        </div>
    )
}

export default ClientLogin;