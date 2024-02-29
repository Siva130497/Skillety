import React, { useState, useContext } from "react";
import { useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import $ from "jquery";
import "./RecruiterLogin.css";
import "./RecruiterLogin-responsive.css";
import { useNavigate } from "react-router-dom";
import useTokenRedirect from "../../customhooks/useTokenRedirect";

const RecruiterLogin = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  useTokenRedirect();
  const { loginUser, errorMsg, setErrorMsg } = useContext(AuthContext);
  const [credentials, setcredentials] = useState({
    userId: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setcredentials({ ...credentials, [name]: value });
    setErrorMsg("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userType = "staff";
    const updatedCredentials = [credentials, userType];
    loginUser(updatedCredentials);
  };

  useEffect(() => {
    const preloader = $("#preloader");
    if (preloader.length) {
      setTimeout(function () {
        preloader.fadeOut("slow", function () {
          preloader.remove();
        });
      }, 500);
    }

    // $(document).ready(function () {
    //     // Function to toggle password visibility
    //     function togglePasswordVisibility(inputId, iconId) {
    //         var passwordInput = $('#' + inputId);
    //         var passwordIcon = $('#' + iconId);

    //         // Toggle password visibility
    //         if (passwordInput.attr('type') === 'password') {
    //             passwordInput.attr('type', 'text');
    //             passwordIcon.removeClass('bi-eye-slash').addClass('bi-eye');
    //         } else {
    //             passwordInput.attr('type', 'password');
    //             passwordIcon.removeClass('bi-eye').addClass('bi-eye-slash');
    //         }
    //     }

    //     // Toggle password visibility when the eye icons are clicked
    //     $('#togglePassword').click(function () {
    //         togglePasswordVisibility('password', 'togglePassword');
    //     });

    //     // Hide the eye icons when the password fields are empty
    //     $('input[type="password"]').on('input', function () {
    //         var inputId = $(this).attr('id');
    //         var iconId = 'toggle' + inputId.charAt(0).toUpperCase() + inputId.slice(1);

    //         if ($(this).val().trim() === '') {
    //             $('#' + iconId).hide();
    //         } else {
    //             $('#' + iconId).show();
    //         }
    //     });
    // });
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div id="preloader"></div>
      <div className="container-fluid">
        <div className="ats-cms-switch-area row">
          <div className="col-12">
            <div className="switches-container">
              <input
                type="radio"
                id="switchAts"
                name="switchRecruiter"
                value="ATS"
                onChange={() => navigate("/ats")}
              />
              <input
                type="radio"
                id="switchCms"
                name="switchRecruiter"
                value="CMS"
                checked
              />
              <label htmlFor="switchAts" className="scroll-to-top">
                ATS
              </label>
              <label htmlFor="switchCms" className="scroll-to-top">
                CMS
              </label>
              <div className="switch-wrapper">
                <div className="switch">
                  <div>ATS</div>
                  <div>CMS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 col-xl-9 col-md-8 col-lg-10 mx-auto ">
            <div className="card rec-login-card">
              <div className="login-card-head-area">
                <div className="login-card-logo-area">
                  <img
                    src="../assets/img/logo/skillety-logo.png"
                    className="login-card-logo"
                    alt=""
                  />
                  <div className="login-card-logo-name">Skillety</div>
                </div>
              </div>
              <div className="login-card-body-area">
                <div className="row flex-col-reverse">
                  <div className="col-12 col-md-12 col-lg-6 m-t-30 mt-lg-0">
                    <div className="login-form-area">
                      <div className="login-greeting">
                        Welcome
                        <span>Please enter your details.</span>
                      </div>
                      <div className="login-form">
                        <form onSubmit={handleSubmit}>
                          <div className="login-form-group">
                            <label htmlFor="email" className="login-form-label">
                              Email Address
                            </label>
                            <input
                              type="text"
                              id="email"
                              aria-describedby="email"
                              name="userId"
                              value={credentials.userId}
                              onChange={handleInputChange}
                              placeholder="example@example.com"
                              className="form-control login-form-input"
                              required
                            />
                          </div>

                          <div className="login-form-group">
                            <label
                              htmlFor="password"
                              className="login-form-label"
                            >
                              Password
                            </label>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              value={credentials.password}
                              onChange={handleInputChange}
                              placeholder="Enter your password"
                              className="form-control login-form-input password-input"
                              required
                            />
                            {credentials.password ? (
                              <i
                                className={`bi ${
                                  showPassword ? "bi-eye" : "bi-eye-slash"
                                } password-show-icon`}
                                onClick={handleTogglePassword}
                                id="togglePassword"
                              ></i>
                            ) : null}
                          </div>
                          {errorMsg ? (
                            <p className="log-error-msg">
                              {errorMsg && "!!!" + errorMsg}
                            </p>
                          ) : null}
                          <div className="login-form-btn-area">
                            <button
                              type="submit"
                              className="btn login-form-btn"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-6 login-card-image-area">
                    <img
                      src="../assets/img/login/login-img.webp"
                      className="login-card-image"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="main-footer no-sidebar">
        <div className="footer-left">
          <p className="footer-text">
            © {currentYear} - <a href="#">Skillety</a> Technologies Private
            Limited, All Rights Reserved.
          </p>
        </div>
        <div className="footer-right">
          <div className="footer-right-text-area">
            <p className="footer-right-text">Designed & Developed by</p>
            <a href="https://www.prodigit.in/" target="_blank">
              <img
                src="../assets/img/logo/prodigit-logo.png"
                className="footer-logo"
                alt=""
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecruiterLogin;
