import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './ClientSignup.css';
import './ClientSignup-responsive.css';
import Layout from '../../components/Layout';

const ClientSignup = () => {
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

            $('#toggleConfirmPassword').click(function () {
                togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
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
        <>
            <Layout newNavBarClientRegister={true} />
            <div className='cli--signup-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        {/* <div className="custom--container"> */}
                            <div className="row custom-column-reverse">
                                <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                    <div className="cli--signup-form-area">
                                        <h5 className="cli--signup-title" data-aos="fade-left">Create an Account</h5>
                                        <h6 className='cli--signup-sub-title' data-aos="fade-right">Let’s get started</h6>

                                        <form action="" className='cli--signup-form'>
                                            <div className='cli--signup-form-group' data-aos="fade-up">
                                                <input type="text" id='name' name="name" placeholder="Enter you name" className='cli--signup-form-input' required />
                                                <label htmlFor="name" className='cli--signup--form-label'>Name</label>
                                            </div>

                                            <div className='cli--signup-form-group' data-aos="fade-up">
                                                <input type="email" id='email' name="email" placeholder="Enter you email" className='cli--signup-form-input' required />
                                                <label htmlFor="email" className='cli--signup--form-label'>Email</label>
                                            </div>

                                            <div className='cli--signup-form-group' data-aos="fade-up">
                                                <i class="bi bi-eye-slash toggle-eye" id="togglePassword"></i>
                                                <input type="password" id='password' name="password" placeholder="Enter the password" className='cli--signup-form-input' required />
                                                <label htmlFor="password" className='cli--signup--form-label'>Password</label>
                                            </div>

                                            <div className='cli--signup-form-group' data-aos="fade-up">
                                                <i class="bi bi-eye-slash toggle-eye" id="toggleConfirmPassword"></i>
                                                <input type="password" id='confirmPassword' name="confirm_password" placeholder="Confirm the password" className='cli--signup-form-input' required />
                                                <label htmlFor="confirm_password" className='cli--signup--form-label'>Confirm Password</label>
                                            </div>

                                            <div className="cli--create-account-btn-area" data-aos="fade-up">
                                                <button type='submit' className='cli--create-account-btn'>Create an account</button>
                                            </div>

                                        </form>
                                        <div className="cli--signup-mobile-btn-area" data-aos="fade-up">
                                            <button className='cli--signup-mobile-btn'>Sign up with Mobile Number</button>
                                        </div>

                                        <div className="cli--log-google-btn-area" data-aos="fade-up">
                                            <a href="#" className='cli--log-google-btn'>
                                                Login with
                                                <img src="assets/img/signup/google-icon.png" className='google-icon' alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                    <div className="cli--signup-img-area">
                                        <img src="assets/img/signup/signup-img.webp" loading='lazy' data-aos="fade" data-aos-delay="300" className='cli--signup-img' alt="" />
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
        </>

    )
}
export default ClientSignup;