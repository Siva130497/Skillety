import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './ClientLogin.css';
import './ClientLogin-responsive.css';
import AuthContext from '../../context/AuthContext';
import Layout from '../../components/Layout';
import useTokenRedirect from '../../customhooks/useTokenRedirect';



const ClientLogin = () => {
    useTokenRedirect();
    const { loginUser, errorMsg, setErrorMsg } = useContext(AuthContext);

    const [credentials, setcredentials] = useState({
        userId: "",
        password: "",
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcredentials({ ...credentials, [name]: value });
        setErrorMsg("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser([credentials, "login-Client"]);
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
            <Layout newNavBarClientLogin={true} />
            <div className='cli--signup-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        {/* <div className="custom--container"> */}
                        <div className="row custom-column-reverse">
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="cli--signup-form-area cli--login-form-area" data-aos="fade-up">
                                    {/* <h5 className="cli--signup-title" data-aos="fade-left">Welcome back</h5> */}

                                    <h6 className='cli--signup-sub-title'>Welcome back! Please enter your details</h6>

                                    {/* <div className="cli--login-with-google-btn-area">
                                        <a href="#" className='cli--login-with-google-btn'>
                                            <img src="assets/img/signup/google-icon.png" className='google-icon' alt="" />
                                            <span>Log in with Google</span>
                                        </a>
                                    </div> */}

                                    <form action="" className='cli--signup-form' onSubmit={handleSubmit}>

                                        <div className='cli--signup-form-group'>
                                            <input type="text" id='user_id' name="userId" placeholder="Enter your Email" className='cli--signup-form-input' value={credentials.userId} onChange={handleInputChange} />
                                            <label htmlFor="user_id" className='cli--signup--form-label'>Email</label>
                                        </div>


                                        <div className='cli--signup-form-group'>
                                            <i class="bi bi-eye-slash toggle-eye" id="togglePassword"></i>
                                            <input type="password" id='password' name="password" placeholder="Enter your password" className='cli--signup-form-input' value={credentials.password} onChange={handleInputChange} required
                                            // onPaste={(e)=>e.preventDefault()}
                                            />
                                            <label htmlFor="password" className='cli--signup--form-label'>Password</label>
                                        </div>

                                        {errorMsg ?
                                            <p className='log-error-msg'>{errorMsg && "!!!" + errorMsg}</p>
                                            : null
                                        }

                                        <div className="cli--login-forgot-remember-area">
                                            <div className="cli--login-remember-area">
                                                <label className="cli--login-remember-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="cli--login-remember-checkmark"></span>
                                                    Remember me
                                                </label>
                                            </div>
                                            <div className="cli--login-forgot-area">
                                                <a href="/forgot-password/Client" className='cli--login-forgot'>Forgot Password</a>
                                            </div>
                                        </div>

                                        <div className="cli--create-account-btn-area">
                                            <button type='submit' className='cli--create-account-btn'>Log In</button>
                                        </div>

                                    </form>
                                    <div className="cli--login-no-account-area">
                                        <span className='cli--login-no-account'>Don’t have an account?&nbsp;</span>
                                        <a href="/client-register" className='cli--login-no-account-signup'>Sign up</a>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="cli--signup-img-area">
                                    <img src="assets/img/signup/signup-img.webp" data-aos="fade" data-aos-delay="300" className='cli--signup-img cli--login-img' loading='lazy' alt="" />
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

export default ClientLogin;