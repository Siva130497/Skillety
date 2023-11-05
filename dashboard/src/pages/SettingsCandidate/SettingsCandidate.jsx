import React from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import './SettingsCandidate.css';
import './SettingsCandidate-responsive.css';
import $ from 'jquery';

const SettingsCandidate = () => {

    useEffect(() => {
        $(document).ready(function () {
            $(".setting-change-btn").on("click", function () {
                var $changeInputArea = $(this).prev(".change-input-area");
                var type = $(this).data("type");
                if ($changeInputArea.is(":visible")) {
                    $changeInputArea.slideUp();
                    $(this).text("Change " + type);
                } else {
                    $changeInputArea.slideDown();
                    $(this).text("Cancel");
                }
            });

            $(".setting-value.password").each(function () {
                var originalText = $(this).text();
                var maskedText = Array(originalText.length + 1).join('.');
                $(this).text(maskedText);

                // $(this).click(function() {
                //     if ($(this).text() === originalText) {
                //         $(this).text(maskedText);
                //     } else {
                //         $(this).text(originalText);
                //     }
                // });
            });

            $("#confirm-password").on("input", function () {
                var newPassword = $("#new-password").val();
                var confirmPassword = $(this).val();
                var errorMessage = $("#error-message");

                if (newPassword === confirmPassword) {
                    errorMessage.text("");
                } else {
                    errorMessage.text("Passwords do not match. Please check and try again.");
                }
            });

            $(".show-btn").click(function () {
                var passwordField = $(this).prev(".change-setting-input");
                var icon = $(this).find("i");

                if (passwordField.attr("type") === "password") {
                    passwordField.attr("type", "text");
                    icon.removeClass("bi-eye-slash").addClass("bi-eye");
                } else {
                    passwordField.attr("type", "password");
                    icon.removeClass("bi-eye").addClass("bi-eye-slash");
                }
            });
        });

    }, []);

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <Layout />

                <div class="main-content">
                    <section class="section">
                        <div className="settings-section">
                            <div className="card settings-area">
                                <div className="card-header">
                                    <h4 className='setting-head'>Settings
                                        <i class="bi bi-gear-fill"></i></h4>
                                </div>
                                <div className="card-body">
                                    <ul className="nav nav-pills" id="myTab3" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="account-tab" data-toggle="tab" href="#Account" role="tab"
                                                aria-controls="account" aria-selected="true">Account</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="job-pref-tab" data-toggle="tab" href="#JobPref" role="tab"
                                                aria-controls="jobpref" aria-selected="false">Job Preferences</a>
                                        </li>
                                        {/* <li className="nav-item">
                                            <a className="nav-link" id="notification-tab" data-toggle="tab" href="#Notification" role="tab"
                                                aria-controls="notification" aria-selected="false">Notifications</a>
                                        </li> */}
                                    </ul>
                                    <div className="tab-content settings-tab-content" id="myTabContent2">
                                        <div className="tab-pane fade show active" id="Account" role="tabpanel" aria-labelledby="account-tab">
                                            <div className="setting-content">
                                                <div className='setting-title'>Account Settings</div>
                                                <div className='setting-sub'>Change your email, mobile number or password</div>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Email Address</div>
                                                <div className='setting-value'>Raquelharrisogwss@gmail,com</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="email" className='change-setting-input' placeholder='Change Email' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Email">Change Email</button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Mobile Number</div>
                                                <div className='setting-value'>+91 9087654321</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="number" className='change-setting-input' placeholder='Change Mobile Number' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Mobile Number">Change Mobile Number</button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Password</div>
                                                <div className='setting-value password'>Password</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6">
                                                            <input type="password" className='change-setting-input' placeholder='Current Password' />
                                                            <button class="show-btn">
                                                                <i class="bi bi-eye-slash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6">
                                                            <input type="password" className='change-setting-input' placeholder='New Password' id="new-password" />
                                                            <button class="show-btn">
                                                                <i class="bi bi-eye-slash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6">
                                                            <input type="password" className='change-setting-input' placeholder='Confirm Password' id="confirm-password" />
                                                            <button class="show-btn">
                                                                <i class="bi bi-eye-slash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <small id="error-message" className='text-danger'></small><br />
                                                    <button className='setting-update-btn mt-3' id="update-btn">Update</button>
                                                </div>
                                                <button className="setting-change-btn" data-type="Password">Change Password</button>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="JobPref" role="tabpanel" aria-labelledby="job-pref-tab">
                                            <div className="setting-content">
                                                <div className='setting-title'>Job Preferences</div>
                                                <div className='setting-sub'>Skillety would show the recommendation basis on your job preferences mentioned in your job profile. Editing it would also change your desired career profile.</div>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Preferred Work Location(Maximum 10)</div>
                                                <div className='setting-value'>Delhi, Mumbai, Chennai, Hyderabad</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-6 col-lg-6 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="text" className='change-setting-input' placeholder='Change Work Location' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Work Location">Change Work Location</button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Expected Salary(Annual)</div>
                                                <div className='setting-value'>
                                                    <span>5.5</span> - <span>6.8</span> LPA Annual
                                                </div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="number" className='change-setting-input text-center' placeholder='Min' />
                                                            <span>-</span>
                                                            <input type="number" className='change-setting-input text-center' placeholder='Max' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Amount">Change Amount</button>
                                            </div>

                                        </div>

                                        {/* <div className="tab-pane fade" id="Notification" role="tabpanel" aria-labelledby="notification-tab">
                                            
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default SettingsCandidate