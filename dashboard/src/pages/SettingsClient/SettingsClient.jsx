import React from 'react';
import { useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import './SettingsClient.css';
import './SettingsClient-responsive.css';
import $ from 'jquery';

const SettingsClient = () => {

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

            // Trigger the file input when the image is clicked
            $(".upload-label").click(function (e) {
                e.preventDefault();
                $("#imageUpload").click();
            });

            // Handle the image selection and display
            $("#imageUpload").change(function () {
                var file = this.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function (e) {

                        $(".company-logo").attr("src", e.target.result);
                        $("#updateButton").show();
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Handle the "Update" button click event
            $("#updateButton").click(function () {
                alert("Update functionality goes here");
            });

            $(".com-detail-edit-btn").click(function () {
                var $settingContent = $(this).closest(".setting-content");
                var $changeTextArea = $settingContent.find(".change-text-area");

                if ($changeTextArea.is(":visible")) {
                    // Collapse the text area
                    $changeTextArea.slideUp();
                    $(this).removeClass("expanded");
                    $(this).find("i").removeClass("bi-x").addClass("bi-pencil-fill");
                } else {
                    // Expand the text area
                    $changeTextArea.slideDown();
                    $(this).addClass("expanded");
                    $(this).find("i").removeClass("bi-pencil-fill").addClass("bi-x");
                }
            });
        });

    }, []);

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ClientLayout />

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
                                                aria-controls="jobpref" aria-selected="false">Company Profile</a>
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
                                                        <div className="col-12 col-xl-4 col-lg-4 col-md-6 d-flex align-items-center gap-10">
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
                                                        <div className="col-12 col-xl-4 col-lg-4 col-md-6 d-flex align-items-center gap-10">
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
                                                        <div className="col-12 col-xl-4 col-lg-4 col-md-6">
                                                            <input type="password" className='change-setting-input' placeholder='Current Password' />
                                                            <button class="show-btn">
                                                                <i class="bi bi-eye-slash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-12 col-xl-4 col-lg-4 col-md-6">
                                                            <input type="password" className='change-setting-input' placeholder='New Password' id="new-password" />
                                                            <button class="show-btn">
                                                                <i class="bi bi-eye-slash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-12 col-xl-4 col-lg-4 col-md-6">
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
                                                <div className="company-logo-name-area">
                                                    <div className="company-logo-area">
                                                        <input type="file" id="imageUpload" accept="image/*" />
                                                        <label htmlFor="imageUpload" className="upload-label mb-0">
                                                            <img src="assets/img/layout/company-img.png" className="company-logo" alt="Company Logo" />
                                                        </label>
                                                    </div>
                                                    <div className="company-name-area">
                                                        <div className="company-name">Company Logo</div>
                                                        <button id="updateButton">Update</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name d-flex align-items-center gap-10'>
                                                    Details of Company
                                                    <button className='com-detail-edit-btn'>
                                                        <i class="bi bi-pencil-fill"></i>
                                                    </button>
                                                </div>
                                                <div className='setting-value pt-3'>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                    <br />
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                </div>

                                                <div className="change-text-area">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <textarea rows={5} className='change-setting-input' placeholder='Change Company Detail'></textarea>
                                                            <button className='setting-update-btn mt-3'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Website</div>
                                                <div className='setting-value'>https/mindtree.com</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-4 col-lg-4 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="email" className='change-setting-input' placeholder='Change Website' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Website">Change Website</button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name d-flex align-items-center gap-10'>
                                                    Perks to work with us
                                                    <button className='com-detail-edit-btn'>
                                                        <i class="bi bi-pencil-fill"></i>
                                                    </button>
                                                </div>
                                                <div className='setting-value pt-3'>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                </div>
                                                <ul className='perks-content'>
                                                    <li className='perks-list-item'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li>
                                                    <li className='perks-list-item'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li>
                                                    <li className='perks-list-item'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li>
                                                    <li className='perks-list-item'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li>
                                                    <li className='perks-list-item'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li>
                                                </ul>

                                                <div className="change-text-area">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <textarea rows={5} className='change-setting-input' placeholder='Change Perks Details'></textarea>
                                                            <button className='setting-update-btn mt-3'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Website</div>
                                                <div className='setting-value'>https/mindtree.com</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-4 col-lg-4 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="email" className='change-setting-input' placeholder='Change Website' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Website">Change Website</button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Website</div>
                                                <div className='setting-value'>https/mindtree.com</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-4 col-lg-4 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="email" className='change-setting-input' placeholder='Change Website' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Website">Change Website</button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Website</div>
                                                <div className='setting-value'>https/mindtree.com</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-4 col-lg-4 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="email" className='change-setting-input' placeholder='Change Website' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Website">Change Website</button>
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

export default SettingsClient