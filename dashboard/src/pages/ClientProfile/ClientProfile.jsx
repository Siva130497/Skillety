import React, { useState } from 'react';
import { useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';
import './ClientProfile.css';
import './ClientProfile-responsive.css';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Footer from '../../components/Footer';

const ClientProfile = () => {

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

                // var type = $(this).data("type");
                if ($changeInputArea.is(":visible")) {
                    $changeInputArea.slideUp();
                    $(this).removeClass("expanded");
                    $(this).find("i").removeClass("bi-x").addClass("bi-pencil");
                    // $(this).text("Change " + type);
                } else {
                    $changeInputArea.slideDown();
                    $(this).addClass("expanded");
                    $(this).find("i").removeClass("bi-pencil").addClass("bi-x");
                    // $(this).text("Cancel");
                }
            });

            $(".cli-pro-add-input-btn").on("click", function () {
                var $changeInputSection = $(this).closest(".add-more-input-field-area");
                var $changeInputArea = $changeInputSection.find(".add-more-input-area");

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

            $('.pro-quick-link').on('click', function (event) {
                var target = $($(this).attr('href'));
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 800);
                }
            });

            // Open modal when the button is clicked
            $(".image-view-btn").on("click", function () {
                $("#imageModal").css("display", "flex");
                $("#modalImage").attr("src", $(".profile-det-image").attr("src"));
            });

            // Close modal when the close button is clicked
            $(".image-view-close").on("click", function () {
                $("#imageModal").css("display", "none");
            });

            // Close modal when clicking outside the modal content
            $(window).on("click", function (event) {
                if (event.target == $("#imageModal")[0]) {
                    $("#imageModal").css("display", "none");
                }
            });


            //////
            // Initially toggle the first profile-content-area
            let firstTopArea = $(".profile-content-top-area:first");
            firstTopArea.siblings(".cli-profile-content-area").addClass("expanded");
            firstTopArea.find("i").toggleClass("bi-chevron-down bi-chevron-up");

            $(".profile-content-top-area").click(function () {
                // Toggle the content area
                $(this).siblings(".cli-profile-content-area").toggleClass("expanded");

                // Toggle the chevron icon
                let icon = $(this).find("i");
                icon.toggleClass("bi-chevron-down bi-chevron-up");
            });
        });

    }, []);

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage() {
        Swal.fire({
            title: 'Error!',
            text: "An error occured!",
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ClientLayout />
                <div class="main-content">
                    <section class="section">
                        <div className="candidate-prrofile-section">
                            <div className="profile-head-area">
                                <div className='profile-head'>Profile Details</div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="profile-card">
                                        <div className="card-flex-area">
                                            <div className="card-right-area">
                                                <div className="profile-det-image-area">
                                                    <div className="profile-det-image-container">
                                                        {/* <button className='prof-img-btn'>
                                                        <i class="bi bi-pencil edit-icon"></i>
                                                    </button> */}
                                                        <div className="image-view-area">
                                                            <button className='image-view-btn'>
                                                                <i class="bi bi-fullscreen img-view-icon"></i>
                                                            </button>
                                                        </div>
                                                        <img src="../assets/img/talents-images/avatar.jpg" className='profile-det-image' alt="" />
                                                    </div>
                                                    <div id="imageModal" className="image-view-modal">
                                                        <span className="image-view-close">
                                                            <i class="bi bi-x"></i>
                                                        </span>
                                                        <img className="image-view-modal-content" id="modalImage" />
                                                    </div>
                                                </div>
                                                <div className="profile-det-area">
                                                    <div className="profile--name-edit-section">
                                                        <div className="profile--name-area">
                                                            <div className="profile--name">Company Name</div>
                                                            <button className='profile--name-edit-btn'>
                                                                <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                            </button>
                                                        </div>
                                                        <div className="profile-name-edit-input-area">
                                                            <div className="row">
                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                    <input type="text" className="change-setting-input"
                                                                        placeholder="Change Company Name" />
                                                                    <button className="setting-update-btn">Update</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="profile-name-edit-input-area">
                                                            <div className="row">
                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                    <input type="text"
                                                                        className="change-setting-input"
                                                                        placeholder="Change Profile Last Name" />
                                                                    <button className="setting-update-btn">Update</button>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                    <div className="profile-update-status">
                                                        Profile Last Updated :&nbsp;
                                                        <span>11.12.2013</span>
                                                    </div>
                                                    <div className="prof-page-divider"></div>
                                                    <div className="prof-more-det-section">
                                                        <div className="prof-more-det-left-area">
                                                            <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-building"></i>
                                                                    <div className="prof-more-det-title">IT Service Management Company</div>
                                                                    <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="text" className="change-setting-input more-det" placeholder="Change Company Type" />
                                                                            <button className="setting-update-btn more-det">Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-geo-alt"></i>
                                                                    <div className="prof-more-det-title">Office Location</div>
                                                                    <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="text" className="change-setting-input more-det" placeholder="Change Location" />
                                                                            <button className="setting-update-btn more-det">Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-briefcase"></i>
                                                                    <div className="prof-more-det-title"></div>
                                                                </div>
                                                            </div> */}

                                                            {/* <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-file-earmark-text"></i>
                                                                    <div className="prof-more-det-title"></div>
                                                                    <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="text" className="change-setting-input more-det" placeholder="Add availability to join"
                                                                            />
                                                                            <button className="setting-update-btn more-det">Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                        </div>

                                                        <div className="prof-more-det-line"></div>

                                                        <div className="prof-more-det-right-area">
                                                            {/* <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-telephone"></i>
                                                                    <div className="prof-more-det-title">Phone</div>
                                                                </div>
                                                            </div> */}

                                                            {/* <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-envelope"></i>
                                                                    <div className="prof-more-det-title">Email</div>
                                                                </div>
                                                            </div> */}

                                                            <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-telephone"></i>
                                                                    <div className="prof-more-det-title">Mobile Number</div>
                                                                    <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="text" className="change-setting-input more-det" placeholder="Change Mobile Number" />
                                                                            <button className="setting-update-btn more-det">Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-envelope"></i>
                                                                    <div className="prof-more-det-title">Email Address</div>
                                                                    <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="email" className="change-setting-input more-det" placeholder="Change Email Address" />
                                                                            <button className="setting-update-btn more-det">Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                <a href="#About_Company" className='pro-quick-link'>About Company
                                                    <i class="bi bi-arrow-right"></i>
                                                </a>
                                            </div>

                                            <div className='pro-quick-link-content'>
                                                <a href="#Add_Benefits" className='pro-quick-link'>Add Benefits
                                                    <i class="bi bi-arrow-right"></i>
                                                </a>
                                            </div>
                                            <div className='pro-quick-link-content'>
                                                <a href="#Add_Awards" className='pro-quick-link'>Add Awards and Recognitions
                                                    <i class="bi bi-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-8 col-lg-8 col-md-8">

                                    <div className="profile-content-card" id='About_Company'>
                                        <div className="profile-content-top-area with-toggle">
                                            <div className="profile-content-title">About Company</div>
                                            <button className="profile-content-edit-btn">
                                                <i class="bi bi-chevron-down toggle-icon"></i>
                                            </button>
                                        </div>
                                        <div className="cli-profile-content-area">
                                            <div className="cli-pro-detail-area m-b-40">
                                                <div className="cli-pro-title">Add Short description</div>
                                                <div className='profile-content mt-4'>
                                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                                </div>
                                                <div className="cli-pro-input-area">
                                                    <input
                                                        type="text"
                                                        className='cli-pro-input'
                                                        placeholder='Add description' />
                                                    <button className='cli-pro-add-btn'>Add</button>
                                                </div>
                                            </div>

                                            <div className="cli-pro-detail-area m-b-40">
                                                <div className="cli-pro-title">Add Long description</div>
                                                <div className='profile-content mt-4'>
                                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                                </div>
                                                <div className="cli-pro-input-area">
                                                    <input
                                                        type="text"
                                                        className='cli-pro-input'
                                                        placeholder='Add description' />
                                                    <button className='cli-pro-add-btn'>Add</button>
                                                </div>
                                            </div>

                                            <div className="cli-pro-detail-area m-b-40">
                                                <div className="cli-pro-title">Mission</div>
                                                <div className='profile-content mt-4'>
                                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                                </div>
                                                <div className="cli-pro-input-area">
                                                    <input
                                                        type="text"
                                                        className='cli-pro-input'
                                                        placeholder='Add Mision' />
                                                    <button className='cli-pro-add-btn'>Add</button>
                                                </div>
                                            </div>

                                            <div className="cli-pro-detail-area m-b-20">
                                                <div className="cli-pro-title">Vision</div>
                                                <div className='profile-content mt-4'>
                                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                                </div>
                                                <div className="cli-pro-input-area">
                                                    <input
                                                        type="text"
                                                        className='cli-pro-input'
                                                        placeholder='Add Vision' />
                                                    <button className='cli-pro-add-btn'>Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="profile-content-card" id='Add_Benefits'>
                                        <div className="profile-content-top-area with-toggle">
                                            <div className="profile-content-title">Add Benefits</div>
                                            <button className="profile-content-edit-btn">
                                                <i class="bi bi-chevron-down toggle-icon"></i>
                                            </button>
                                        </div>
                                        <div className="cli-profile-content-area">
                                            <div className="cli-pro-detail-area m-b-10">
                                                <div className="cli-pro-checkbox-area">
                                                    <div className="row">
                                                        <div className="col-12 col-md-6">
                                                            <label className="cli-pro-checkbox-input">
                                                                <input type="checkbox" />
                                                                <span className="cli-pro-checkbox-checkmark"></span>
                                                                Health Insurance
                                                            </label>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="cli-pro-checkbox-input">
                                                                <input type="checkbox" />
                                                                <span className="cli-pro-checkbox-checkmark"></span>
                                                                Work From Home
                                                            </label>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="cli-pro-checkbox-input">
                                                                <input type="checkbox" />
                                                                <span className="cli-pro-checkbox-checkmark"></span>
                                                                Sick Leave
                                                            </label>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="cli-pro-checkbox-input">
                                                                <input type="checkbox" />
                                                                <span className="cli-pro-checkbox-checkmark"></span>
                                                                Maternity/Parental Leave
                                                            </label>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="cli-pro-checkbox-input">
                                                                <input type="checkbox" />
                                                                <span className="cli-pro-checkbox-checkmark"></span>
                                                                Job Training
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="add-more-input-field-area">
                                                        <button className='cli-pro-add-input-btn' data-type="More Benefits">
                                                            {/* <i class="bi bi-plus"></i> */}
                                                            Add More Benefits
                                                        </button>
                                                        <div className="add-more-input-area">
                                                            <div className="row">
                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                    <input type="text" className="change-setting-input" placeholder="Add Benefit" />
                                                                    <button className="setting-update-btn">Add</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="profile-content-card" id='Add_Awards'>
                                        <div className="profile-content-top-area with-toggle">
                                            <div className="profile-content-title">Add Awards and Recognitions</div>
                                            <button className="profile-content-edit-btn">
                                                <i class="bi bi-chevron-down toggle-icon"></i>
                                            </button>
                                        </div>
                                        <div className="cli-profile-content-area">
                                            <div className="cli-pro-detail-area m-b-10">
                                                <div className="add-more-input-field-area">
                                                    <button className='cli-pro-add-input-btn' data-type="More Details">
                                                        {/* <i class="bi bi-plus"></i> */}
                                                        Add Details
                                                    </button>
                                                    <div className="add-more-input-area">
                                                        <div className="row">
                                                            <div className="col-12 d-flex align-items-center gap-10">
                                                                <input type="text" className="change-setting-input" placeholder="Add Details" />
                                                                <button className="setting-update-btn">Add</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div >
        </div >
    )
}

export default ClientProfile