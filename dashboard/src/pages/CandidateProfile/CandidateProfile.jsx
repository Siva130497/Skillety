import React from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import './CandidateProfile.css';
import './CandidateProfile-responsive.css';
import $ from 'jquery';

const CandidateProfile = () => {

    useEffect(() => {
        $(document).ready(function () {
            $(".profile--name-edit-btn").click(function () {
                var $nameEditSection = $(this).closest(".profile--name-edit-section");
                var $changeNameInput = $nameEditSection.find(".profile-name-edit-input-area");

                if ($changeNameInput.is(":visible")) {
                    // Collapse the text area
                    $changeNameInput.slideUp();
                    $(this).removeClass("expanded");
                    $(this).find("i").removeClass("bi-x").addClass("bi-pencil");
                } else {
                    // Expand the text area
                    $changeNameInput.slideDown();
                    $(this).addClass("expanded");
                    $(this).find("i").removeClass("bi-pencil").addClass("bi-x");
                }
            });

            $(".prof-more-det-edit-btn").on("click", function () {
                var $changeInputSection = $(this).closest(".prof-more-det-area");
                var $changeInputArea = $changeInputSection.find(".prof-more-det-input-area");

                var type = $(this).data("type");
                if ($changeInputArea.is(":visible")) {
                    $changeInputArea.slideUp();
                    $(this).removeClass("expanded");
                    $(this).text("Add " + type);
                } else {
                    $changeInputArea.slideDown();
                    $(this).addClass("expanded");
                    $(this).text("Cancel");
                }
            });

            $(".profile-content-edit-btn").on("click", function () {
                var $changeInputSection = $(this).closest(".profile-content-card");
                var $changeInputArea = $changeInputSection.find(".profile-content-input-area");

                var type = $(this).data("type");
                if ($changeInputArea.is(":visible")) {
                    $changeInputArea.slideUp();
                    $(this).removeClass("expanded");
                    $(this).text("Add " + type);
                } else {
                    $changeInputArea.slideDown();
                    $(this).addClass("expanded");
                    $(this).text("Cancel");
                }
            });

            $(".profile-content-more-inputs-edit-btn").on("click", function () {
                var $changeInputSection = $(this).closest(".more-inputs-area");
                var $changeInputArea = $changeInputSection.find(".profile-content-more-input-area");

                var type = $(this).data("type");
                if ($changeInputArea.is(":visible")) {
                    $changeInputArea.slideUp();
                    $(this).removeClass("expanded");
                    $(this).text("Add " + type);
                } else {
                    $changeInputArea.slideDown();
                    $(this).addClass("expanded");
                    $(this).text("Cancel");
                }
            });

            $(".personal-det-add-btn").on("click", function () {
                var $changeInputSection = $(this).closest(".personal-detail-section");
                var $changeInputArea = $changeInputSection.find(".personal-det-add-input-area");

                var type = $(this).data("type");
                if ($changeInputArea.is(":visible")) {
                    $changeInputArea.slideUp();
                    $(this).removeClass("expanded");
                    $(this).text("Add " + type);
                } else {
                    $changeInputArea.slideDown();
                    $(this).addClass("expanded");
                    $(this).text("Cancel");
                }
            });

            // Function to clear the file input and reset the button and text
            function clearFileInput() {
                $('#file_upload').val('');
                $('#file-chosen').text('No file chosen');
                $('.file-upload-btn').text('Upload resume');
                $('.file-upload-btn').css('background-color', '#FFF3D0');
                $('.file-upload-btn').css('color', '#714F36');
                $('#clear-file').hide();
                $('#save-file').hide();
            }

            $('#file_upload').on('change', function () {
                $('#file-chosen').text(this.files[0].name);

                if (this.files.length > 0) {
                    $('.file-upload-btn').text('Resume Uploaded');
                    $('.file-upload-btn').css('background-color', '#714F36');
                    $('.file-upload-btn').css('color', '#FFF');
                    $('#clear-file').show();
                    $('#save-file').show();
                } else {
                    $('.file-upload-btn').text('Upload resume');
                    $('.file-upload-btn').css('background-color', '#FFF3D0');
                    $('.file-upload-btn').css('color', '#714F36');
                }
            });

            $('#clear-file').on('click', function () {
                clearFileInput();
            });

            $('.pro-quick-link').on('click', function (event) {
                var target = $($(this).attr('href'));
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 20
                    }, 800);
                }
            });
        });

    }, []);

    return (
        <div>
            {/* <div class="main-wrapper main-wrapper-1"> */}
            {/* <div class="navbar-bg"></div> */}

            {/* <div class="main-content"> */}
            <div className="container-fluid">
                <section class="section">
                    <div className="candidate-prrofile-section">
                        <div className="profile-head-area">
                            <div className='profile-head'>Profile details</div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="profile-card">
                                    <div className="card-flex-area">
                                        <div className="card-right-area">
                                            <div className="profile-det-image-area">
                                                <div className="profile-det-image-container">
                                                    <button className='prof-img-btn'>
                                                        <i class="bi bi-pencil edit-icon"></i>
                                                    </button>
                                                    <div className="image-view-area">
                                                        <button className='image-view-btn'>
                                                            <i class="bi bi-fullscreen img-view-icon"></i>
                                                        </button>
                                                    </div>
                                                    <img src="assets/img/layout/user-img.png" className='profile-det-image' alt="" />
                                                </div>
                                            </div>
                                            <div className="profile-det-area">
                                                <div className="profile--name-edit-section">
                                                    <div className="profile--name-area">
                                                        <div className="profile--name">Raquel Harrison</div>
                                                        <button className='profile--name-edit-btn'>
                                                            <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                        </button>
                                                    </div>
                                                    <div className="profile-name-edit-input-area">
                                                        <div className="row">
                                                            <div className="col-12 d-flex align-items-center gap-10">
                                                                <input type="text" className="change-setting-input" placeholder="Change Profile Name" />
                                                                <button className="setting-update-btn">Update</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="profile-update-status">
                                                    Profile Last Updated :&nbsp;
                                                    <span>08 Sept 2023</span>
                                                </div>
                                                <div className="prof-page-divider"></div>
                                                <div className="prof-more-det-section">
                                                    <div className="prof-more-det-left-area">
                                                        <div className="prof-more-det-area">
                                                            <div className="prof-more-det">
                                                                <i class="bi bi-geo-alt"></i>
                                                                {/* <div className="prof-more-det-title">Location</div> */}
                                                                <button className="prof-more-det-edit-btn" data-type="location">Add location</button>
                                                            </div>
                                                            <div className="prof-more-det-input-area">
                                                                <div className="row">
                                                                    <div className="col-12 d-flex align-items-center gap-10">
                                                                        <input type="text" className="change-setting-input more-det" placeholder="Add Location" />
                                                                        <button className="setting-update-btn more-det">Add</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="prof-more-det-area">
                                                            <div className="prof-more-det">
                                                                <i class="bi bi-briefcase"></i>
                                                                <div className="prof-more-det-title">Fresher</div>
                                                            </div>
                                                        </div>

                                                        <div className="prof-more-det-area">
                                                            <div className="prof-more-det">
                                                                <i class="bi bi-file-earmark-text"></i>
                                                                {/* <div className="prof-more-det-title">Availability to join</div> */}
                                                                <button className="prof-more-det-edit-btn" data-type="availability to join">Add availability to join</button>
                                                            </div>
                                                            <div className="prof-more-det-input-area">
                                                                <div className="row">
                                                                    <div className="col-12 d-flex align-items-center gap-10">
                                                                        <input type="text" className="change-setting-input more-det" placeholder="Add availability to join" />
                                                                        <button className="setting-update-btn more-det">Add</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="prof-more-det-line"></div>

                                                    <div className="prof-more-det-right-area">
                                                        <div className="prof-more-det-area">
                                                            <div className="prof-more-det">
                                                                <i class="bi bi-telephone"></i>
                                                                {/* <div className="prof-more-det-title">Mobile Number</div> */}
                                                                <button className="prof-more-det-edit-btn" data-type="mobile number">Add mobile number</button>
                                                            </div>
                                                            <div className="prof-more-det-input-area">
                                                                <div className="row">
                                                                    <div className="col-12 d-flex align-items-center gap-10">
                                                                        <input type="number" className="change-setting-input more-det" placeholder="Add mobile number" />
                                                                        <button className="setting-update-btn more-det">Add</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="prof-more-det-area">
                                                            <div className="prof-more-det">
                                                                <i class="bi bi-envelope"></i>
                                                                {/* <div className="prof-more-det-title">Email Address</div> */}
                                                                <button className="prof-more-det-edit-btn" data-type="your email">Add your email</button>
                                                            </div>
                                                            <div className="prof-more-det-input-area">
                                                                <div className="row">
                                                                    <div className="col-12 d-flex align-items-center gap-10">
                                                                        <input type="email" className="change-setting-input more-det" placeholder="Add your email" />
                                                                        <button className="setting-update-btn more-det">Add</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-left-area">
                                            <div className="missing-det-content-section">
                                                <div className="missing-det-content-area">
                                                    <div className="missing-det-content">
                                                        <div className="missing-det-icon-area">
                                                            <i class="bi bi-check-circle"></i>
                                                        </div>
                                                        {/* <div className="missing-det-text">Verify Mobile Number</div> */}
                                                        <button className='missing-det-add-btn'>Verify Mobile Number</button>
                                                    </div>
                                                    <div className="missing-det-percentage-area">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                            <path d="M4.35355 0.665978C4.15829 0.470716 3.84171 0.470716 3.64645 0.665978L0.464466 3.84796C0.269204 4.04322 0.269204 4.3598 0.464466 4.55507C0.659728 4.75033 0.976311 4.75033 1.17157 4.55507L4 1.72664L6.82843 4.55507C7.02369 4.75033 7.34027 4.75033 7.53553 4.55507C7.7308 4.3598 7.7308 4.04322 7.53553 3.84796L4.35355 0.665978ZM4.5 14.0195L4.5 1.01953L3.5 1.01953L3.5 14.0195L4.5 14.0195Z" fill="#2CAC21" />
                                                        </svg>
                                                        <span className='missing-det-percentage'>10%</span>
                                                    </div>
                                                </div>

                                                <div className="missing-det-content-area">
                                                    <div className="missing-det-content">
                                                        <div className="missing-det-icon-area">
                                                            <i class="bi bi-geo-alt"></i>
                                                        </div>
                                                        {/* <div className="missing-det-text">Add preferred Location</div> */}
                                                        <button className='missing-det-add-btn'>Add preferred Location</button>
                                                    </div>
                                                    <div className="missing-det-percentage-area">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                            <path d="M4.35355 0.665978C4.15829 0.470716 3.84171 0.470716 3.64645 0.665978L0.464466 3.84796C0.269204 4.04322 0.269204 4.3598 0.464466 4.55507C0.659728 4.75033 0.976311 4.75033 1.17157 4.55507L4 1.72664L6.82843 4.55507C7.02369 4.75033 7.34027 4.75033 7.53553 4.55507C7.7308 4.3598 7.7308 4.04322 7.53553 3.84796L4.35355 0.665978ZM4.5 14.0195L4.5 1.01953L3.5 1.01953L3.5 14.0195L4.5 14.0195Z" fill="#2CAC21" />
                                                        </svg>
                                                        <span className='missing-det-percentage'>02%</span>
                                                    </div>
                                                </div>

                                                <div className="missing-det-content-area">
                                                    <div className="missing-det-content">
                                                        <div className="missing-det-icon-area">
                                                            <i class="bi bi-file-earmark-text"></i>
                                                        </div>
                                                        {/* <div className="missing-det-text">Add Resume</div> */}
                                                        <button className='missing-det-add-btn'>Add Resume</button>
                                                    </div>
                                                    <div className="missing-det-percentage-area">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                            <path d="M4.35355 0.665978C4.15829 0.470716 3.84171 0.470716 3.64645 0.665978L0.464466 3.84796C0.269204 4.04322 0.269204 4.3598 0.464466 4.55507C0.659728 4.75033 0.976311 4.75033 1.17157 4.55507L4 1.72664L6.82843 4.55507C7.02369 4.75033 7.34027 4.75033 7.53553 4.55507C7.7308 4.3598 7.7308 4.04322 7.53553 3.84796L4.35355 0.665978ZM4.5 14.0195L4.5 1.01953L3.5 1.01953L3.5 14.0195L4.5 14.0195Z" fill="#2CAC21" />
                                                        </svg>
                                                        <span className='missing-det-percentage'>10%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="missing-det-btn-area">
                                                <button className='missing-det-btn'>Add missing details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-xl-4 col-lg-4 col-md-4">
                                <div className="profile-side-card">
                                    <div className="quick-link-head">Quick Links</div>
                                    <div className="pro-quick-links-area">
                                        <div className='pro-quick-link-content'>
                                            <a href="#Resume" className='pro-quick-link'>Resume
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Resume_headline" className='pro-quick-link'>Resume Headline
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Key_skills" className='pro-quick-link'>Key Skills
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Employment" className='pro-quick-link'>Employment
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Education" className='pro-quick-link'>Education
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#It_skills" className='pro-quick-link'>IT Skills
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Project" className='pro-quick-link'>Project
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Profile_summary" className='pro-quick-link'>Profile Summary
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Accomplishment" className='pro-quick-link'>Accomplishment
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Career_profile" className='pro-quick-link'>Career Profile
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Personal_details" className='pro-quick-link'>Personal Details
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#View_Cv" className='pro-quick-link'>View or Download CV
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-8 col-lg-8 col-md-8">
                                <div className="profile-content-card" id='Resume'>
                                    <div className="profile-content-title">Resume</div>
                                    <div className="profile-content-sub-title">
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                    </div>
                                    <div className="prof-page-file-upload-area">
                                        <form action="">
                                            <input type="file" id="file_upload" accept=".doc,.docx,.pdf"
                                                style={{ display: 'none' }}
                                                required />
                                            <label for="file_upload" className='prof-page-file-upload-label'>
                                                <span className='file-upload-btn'>
                                                    Upload resume
                                                </span>
                                            </label>
                                            <span id="file-chosen">No file chosen</span>
                                            <div className="file-upload-btn-area">
                                                <button id="clear-file" className='clear-file-btn'>
                                                    <i class="bi bi-x"></i>Clear File
                                                </button>
                                                <button id="save-file" className="save-file-btn" typeof='submit'>
                                                    <i class="bi bi-check2"></i>
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Resume_headline'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">Resume Headline</div>
                                        <button className="profile-content-edit-btn" data-type="Resume headline">Add Resume headline</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add Resume headline" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Key_skills'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">Key Skills</div>
                                        <button className="profile-content-edit-btn" data-type="key skill">Add key skill</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add key skill" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Employment'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">Employment</div>
                                        <button className="profile-content-edit-btn" data-type="Employment">Add Employment</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add Employment" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Education'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">Education</div>
                                        <button className="profile-content-edit-btn" data-type="Education">Add Education</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add Education" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="more-inputs-section">
                                        <div className="more-inputs-area">
                                            <div className="more-inputs-btn-area">
                                                <button className="profile-content-more-inputs-edit-btn" data-type="Education">Add Education</button>
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 col-xl-8 d-flex align-items-center gap-10">
                                                        <input type="text" className="change-setting-input" placeholder="Add Education" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="more-inputs-area">
                                            <div className="more-inputs-btn-area">
                                                <button className="profile-content-more-inputs-edit-btn" data-type="Education">Add Education</button>
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 col-xl-8 d-flex align-items-center gap-10">
                                                        <input type="text" className="change-setting-input" placeholder="Add Education" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="more-inputs-area">
                                            <div className="more-inputs-btn-area">
                                                <button className="profile-content-more-inputs-edit-btn" data-type="Education">Add Education</button>
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 col-xl-8 d-flex align-items-center gap-10">
                                                        <input type="text" className="change-setting-input" placeholder="Add Education" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='It_skills'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">IT Skills</div>
                                        <button className="profile-content-edit-btn" data-type="IT Skills">Add IT Skills</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add IT Skills" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Project'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">Project</div>
                                        <button className="profile-content-edit-btn" data-type="Project">Add Project</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add Project" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Profile_summary'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">Profile summary</div>
                                        <button className="profile-content-edit-btn" data-type="Profile summary">Add Profile summary</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add Profile summary" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Accomplishment'>
                                    <div className="profile-content-title">Accomplishment</div>

                                    <div className="more-inputs-section">
                                        <div className="more-inputs-area with-border">
                                            <div className="more-inputs-btn-area">
                                                <div className="more-inputs-text">Online Profile</div>
                                                <button className="profile-content-more-inputs-edit-btn" data-type="">Add</button>
                                            </div>
                                            <div className='profile-content mb-4'>
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 d-flex align-items-center gap-10 mb-4">
                                                        <input type="text" className="change-setting-input" placeholder="Add Online Profile" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="more-inputs-area with-border">
                                            <div className="more-inputs-btn-area">
                                                <div className="more-inputs-text">Online Profile</div>
                                                <button className="profile-content-more-inputs-edit-btn" data-type="">Add</button>
                                            </div>
                                            <div className='profile-content mb-4'>
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 d-flex align-items-center gap-10 mb-4">
                                                        <input type="text" className="change-setting-input" placeholder="Add Online Profile" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="more-inputs-area">
                                            <div className="more-inputs-btn-area">
                                                <div className="more-inputs-text">Online Profile</div>
                                                <button className="profile-content-more-inputs-edit-btn" data-type="">Add</button>
                                            </div>
                                            <div className='profile-content mb-4'>
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 d-flex align-items-center gap-10 mb-4">
                                                        <input type="text" className="change-setting-input" placeholder="Add Online Profile" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Personal_details'>
                                    <div className="profile-content-title">Personal Details</div>
                                    <div className="row mt-4">
                                        <div className="col-12 col-xl-6 col-lg-6">
                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Personal</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='gender, marital status more info'>Add gender, marital status more info</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10 mb-4">
                                                            <input type="text" className="change-setting-input" placeholder="Add gender" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add marital status" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Date of birth</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Date of birth'>Add Date of birth</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="date" className="change-setting-input" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Category</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Category'>Add Category</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add Category" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-6 col-lg-6">
                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Career break</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Career break'>Add Career break</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add Career break" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Desired Job Type</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Desired Job Type'>Add Desired Job Type</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add Desired Job Type" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Current industry</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Current industry'>Add Current industry</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add Current industry" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-action-btn-area" id='View_Cv'>
                                    <button className='view-cv-btn'>
                                        <i class="bi bi-eye-fill view-cv-icon"></i>
                                        View CV
                                    </button>
                                    <button className='download-cv-btn'>
                                        <i class="bi bi-download download-cv-icon"></i>
                                        Download CV
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* </div> */}

            <footer className="main-footer no-sidebar">
                <div className="footer-left">
                    <p className='footer-text'>
                        © 2023 - <a href="#">Skillety</a> Technologies Private Limited, All Rights Reserved.
                    </p>
                </div>
                <div className="footer-right">
                    <div className='footer-right-text-area'>
                        <p className='footer-right-text'>Designed & Developed by</p>
                        <a href="https://www.prodigit.in/" target='_blank'>
                            <img src="assets/img/logo/prodigit-logo.png" className='footer-logo' alt="" />
                        </a>
                    </div>
                </div>
            </footer>
            {/* </div > */}
        </div >
    )
}

export default CandidateProfile