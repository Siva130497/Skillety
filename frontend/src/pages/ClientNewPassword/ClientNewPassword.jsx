import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Layout from '../../components/Layout';

const ClientNewPassword = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newClient, setNewClient] = useState([]);
    const [status, setStatus] = useState(false);
    const [credentials, setCredentials] = useState({
        tempPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordError, setPasswordError] = useState('');

    const getAllClient = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/clientWithUrl-Detail`);
            const result = response.data;
            if (!result.error) {
                for (const client of result) {
                    if (client.id === id) {
                        setNewClient(client);
                        setStatus(true);
                    } else {
                        setStatus(false)
                    }
                }
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllClient();
    }, []);

    const finalClientDetail = async (userData) => {
        try {
            const response = await axios.post(`http://localhost:5002/finalRegister-Client`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                navigate("/client-login");
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.newPassword.length < 8) {
            alert("Password must be atleast 8 characters long");
            return;
        }
        if (credentials.newPassword === credentials.confirmPassword) {
            const { url, _id, ...updatedClient } = newClient;
            updatedClient.password = credentials.newPassword;
            updatedClient.userEnterTempPassword = credentials.tempPassword;
            console.log(updatedClient);
            finalClientDetail(updatedClient);
        } else {
            alert("new password doesn't match with confirm password");
            return;
        }
    };

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
        <div>
            <Layout ClientNewPassword={true} />
            {/* ///////////////// */}
            <div className='cli--signup-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="row custom-column-reverse">
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 client-forgot-area">
                                <div className="cli--signup-form-area forgot pt-lg-0">
                                    <div>
                                        <h5 className="cli--signup-title" data-aos="fade-left">New Password</h5>
                                        <form action="" className='cli--signup-form'>

                                            <div className='cli--signup-form-group' data-aos="fade-up">
                                                <i class="bi bi-eye-slash toggle-eye" id="togglePassword"></i>
                                                <input type="password" id='password' name="password" placeholder="Enter new password" className='cli--signup-form-input' required />
                                                <label htmlFor="password" className='cli--signup--form-label'>Enter New Password</label>
                                            </div>

                                            <div className='cli--signup-form-group' data-aos="fade-up">
                                                <i class="bi bi-eye-slash toggle-eye" id="toggleConfirmPassword"></i>
                                                <input type="password" id='confirmPassword' name="confirm_password" placeholder="Confirm the password" className='cli--signup-form-input' required />
                                                <label htmlFor="confirm_password" className='cli--signup--form-label'>Confirm Password</label>
                                            </div>

                                            <div className="cli--create-account-btn-area" data-aos="fade-up">
                                                <button type='submit' className='cli--create-account-btn'>Confirm</button>
                                            </div>

                                        </form>
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
                    </div>
                </div>
            </div>
            {/* /////////////////// */}

            <div className='container-fluid'>
                {status ?
                    <div>
                        <h3>Welcome {newClient.name} from {newClient.companyName}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label
                                    htmlFor="tempPasswordInput"
                                    className="form-label mt-4">
                                    Temporary Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="tempPasswordInput"
                                    name="tempPassword"
                                    value={credentials.tempPassword}
                                    onChange={handleInputChange}
                                    onPaste={(e) => e.preventDefault()}
                                    placeholder="Enter your given temporary password"
                                    required />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="newPasswordInput"
                                    className="form-label mt-4">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPasswordInput"
                                    name="newPassword"
                                    value={credentials.newPassword}
                                    onChange={handleInputChange}
                                    onPaste={(e) => e.preventDefault()}
                                    placeholder="Enter your new password"
                                    required />
                                {passwordError && <p>{passwordError}</p>}
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
                                    onPaste={(e) => e.preventDefault()}
                                    placeholder="Re-enter your new password"
                                    required />
                            </div>
                            <input type='submit' value="Submit" className='btn btn-primary my-3' />
                        </form>
                    </div>
                    : <div>
                        <h1>404</h1>
                        <p>Not Found</p>
                        <small>The resource requested could not be found on this server!</small>
                    </div>
                }
            </div>
        </div>
    );
};

export default ClientNewPassword;
