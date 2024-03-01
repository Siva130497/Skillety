import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from 'react';
import $, { event } from 'jquery';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import './CandidateLogin.css';

import AuthContext from '../../context/AuthContext';
import Layout from '../../components/Layout';
import useTokenRedirect from '../../customhooks/useTokenRedirect';
import axios from 'axios';

const CandidateLogin = () => {
    useTokenRedirect();
    const navigate = useNavigate();
    const { loginUser, errorMsg, setErrorMsg } = useContext(AuthContext)
    
    const [user, setUser] = useState(null || JSON.parse(localStorage.getItem('auth')));
    const [token, setToken] = useState("")
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
        const userType = "login-Candidate"
        const updatedCredentials = [credentials, userType]
        loginUser(updatedCredentials);

    }
    const handleGoogle =  async(event) => {
        setErrorMsg("")
        const provider = new GoogleAuthProvider();
        try {
            const userCred = await signInWithPopup(auth, provider);
            // Code to execute after successful sign-in
            // console.log(userCred);

            if(userCred){
                // setUser(userCred.user)
                userCred.user.getIdToken()
                    .then(token => {
                        const googleLoginUserCredentials = {
                        firstName: userCred.user.displayName.split(" ")[0],
                        lastName: userCred.user.displayName.split(" ")[1],
                        email: userCred.user.email,
                        phone: userCred.user.phoneNumber ? userCred.user.phoneNumber : 0,
                        photoURL: userCred.user.photoURL,
                        id: userCred.user.uid,
                        };

                        axios.post("https://skillety-n6r1.onrender.com/cand-reg-by-google", googleLoginUserCredentials, {
                        headers: {
                            Authorization: `Bearer ${token}`, 
                            Accept: 'application/json'
                        }
                        })
                        .then(response => {
                            console.log(response.data);
                            // window.open(`https://skillety-dashboard-tk2y.onrender.com/firebase:${token}`, '_blank');
                            navigate(-1);
                        })
                        .catch(error => {
                            console.log(error);
                            setErrorMsg(error.response.data.message)
                        });
                    })
                    .catch(error => {
                        console.log(error)
                        setErrorMsg(error.response.data.message)
                    });

                           
            }
        } catch (error) {
            // Handle any errors that occur during sign-in
            console.error("Error signing in with Google:", error);
            setErrorMsg("Error signing in with Google");
        }
      
    }
    
    useEffect(() => {
        auth.signOut()
        .then(() => {
          console.log('User logged out successfully');
          // Perform any additional actions after logout if needed
      })
      .catch((error) => {
          console.error('Error logging out:', error);
          // Handle logout error if needed
      });
      }, []);


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
            <Layout newNavBarCandidateLogin={true} />
            <div className='cli--signup-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        {/* <div className="custom--container"> */}
                        <div className="row custom-column-reverse">
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="cli--signup-form-area cli--login-form-area" data-aos="fade-up">
                                    {/* <h5 className="cli--signup-title" data-aos="fade-left">Welcome back Jaden</h5> */}
                                    <h6 className='cli--signup-sub-title'>Welcome back! Please enter your details</h6>

                                    
                                            <div className="cli--login-with-google-btn-area"
                                            onClick={handleGoogle}>
                                                <a href="#" className='cli--login-with-google-btn'>
                                                    <img src="assets/img/signup/google-icon.png" className='google-icon' alt="" />
                                                    <span>Log in with Google</span>
                                                </a>
                                            </div>
                                    

                                    {/* <form onSubmit={handleSubmit}>
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
                        onPaste={(e)=>e.preventDefault()}
                        required />
                        <div className="cli--login-forgot-area" data-aos="fade-left">
                            <a href="/forgot-password/Candidate" className='cli--login-forgot'>Forgot Password</a>
                        </div>
                    </div>
                    <input type='submit' value="Login" className='btn btn-primary my-3' />
                    <p>
                        Don't have an account ? <Link to = "/candiate-register">Create One</Link>
                    </p>

                    </form> */}

                                    <form action="" className='cli--signup-form' onSubmit={handleSubmit}>

                                        <div className='cli--signup-form-group'>
                                            <input type="text" id='user_id' name="userId" placeholder="Enter your User ID" className='cli--signup-form-input' value={credentials.userId} onChange={handleInputChange} required />
                                            <label htmlFor="user_id" className='cli--signup--form-label'>User Id</label>
                                        </div>

                                        <div className='cli--signup-form-group'>
                                            <i class="bi bi-eye-slash toggle-eye" id="togglePassword"></i>
                                            <input type="password" id='password' name="password" placeholder="Enter your password" className='cli--signup-form-input' value={credentials.password} onChange={handleInputChange} onPaste={(e) => e.preventDefault()} required />
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
                                                    Remember Details
                                                </label>
                                            </div>
                                            <div className="cli--login-forgot-area">
                                                <a href="/forgot-password/Candidate" className='cli--login-forgot'>Forgot Password</a>
                                            </div>
                                        </div>

                                        <div className="cli--create-account-btn-area">
                                            <button type='submit' className='cli--create-account-btn candidate'>Log In</button>
                                        </div>

                                    </form>

                                    <div className="cli--login-no-account-area">
                                        <span className='cli--login-no-account'>Don’t have an account?&nbsp;</span>
                                        <a href="/candiate-register" className='cli--login-no-account-signup'>Sign up</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="cli--signup-img-area">
                                    <img src="assets/img/signup/candidate-login-img.jpeg" data-aos="fade" data-aos-delay="300" className='cli--signup-img cli--login-img' loading='lazy' alt="" />
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

export default CandidateLogin;