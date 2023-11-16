import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './PostingJob.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const PostingJob = () => {
    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Congratulations!',
            text: 'Job Posted Successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: 'An Error occured!',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    useEffect(() => {
        $(document).ready(function () {
            $("#paste-button").click(function (event) {
                event.preventDefault();

                if (navigator.clipboard) {
                    navigator.clipboard.readText().then(function (clipboardText) {
                        $("#job-description").val(clipboardText);
                    }).catch(function (err) {
                        console.error('Failed to read clipboard text: ', err);
                    });
                } else {
                    console.log("Clipboard API not supported in this browser.");
                }
            });

            // Function to toggle visibility of the disabled input area for each group
            function toggleDisabledInputArea() {
                var isChecked = $(this).is(':checked');
                var disabledInputArea = $(this).closest('.job-post-form-group').find('.disabled-input-area');

                if (isChecked) {
                    disabledInputArea.slideDown();
                } else {
                    disabledInputArea.slideUp();
                }
            }

            // Attach event listener to all checkboxes with the class 'toggleDisabledInput'
            $('.toggleDisabledInput').on('change', toggleDisabledInputArea);

            // Initial call to set the initial state based on the checkbox for each group
            $('.toggleDisabledInput').each(function () {
                toggleDisabledInputArea.call(this);
            });
        });
    }, []);

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="post-job-section">
                            <div className="admin-component-name">
                                Job Posting
                            </div>
                            <div className="card post-job-card">
                                <div className="post-job-title">Post a Job </div>
                                {/* <div className="post-job-sub-title">Begin from scratch</div> */}

                                <div className="job-post-form-area">
                                    <form action="">
                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="" className='job-post-form-label'>Job Role<span className='form-required'>*</span></label>
                                                        {/* <i class="bi bi-chevron-down"></i> */}

                                                        <span className="job-post-form-badge">
                                                            Sample Tag
                                                        </span>

                                                    </div>

                                                    <input type="text" className='job-post-form-input'
                                                        name='searchJobRoleInput'
                                                        id='searchJobRoleInput'
                                                        placeholder='Search job role...' />

                                                    <div className='search-result-data-area'>
                                                        <div className='search-result-data'>
                                                            Sample Search Result Data
                                                        </div>
                                                    </div>

                                                    <div className="job-post-form-chechbox-area">
                                                        <label className="job-post-form-check-input view-disabled-input">
                                                            <input
                                                                type="checkbox"
                                                                className="toggleDisabledInput"
                                                            />
                                                            <span className="job-post-form-checkmark"></span>
                                                            If your searched job role not in the list, please enable the checkbox & type manually...
                                                        </label>
                                                    </div>

                                                    <div className="disabled-input-area">
                                                        <input
                                                            type='text'
                                                            name='manualJobRoleInput'
                                                            id='manualJobRoleInput'
                                                            className='job-post-form-input mt-4'
                                                            placeholder='Enter job role...'
                                                        />
                                                        <button
                                                            type="button"
                                                            className="manually-add-btn with-mb">
                                                            Add manually entered jobRole
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12">
                                                <label htmlFor="" className='job-post-form-label'>Total Experience<span className='form-required'>*</span></label>
                                            </div>
                                            <div className="col-12 col-xl-4 col-lg-6 col-md-6 mb-4 mb-md-0">
                                                <div className="job-post-form-group without-label">
                                                    <input type="number" className='job-post-form-input'
                                                        name="ExperianceYears"
                                                        placeholder="Years" />
                                                </div>
                                            </div>
                                            <div className="col-12 col-xl-4 col-lg-6 col-md-6">
                                                <div className="job-post-form-group without-label">
                                                    <input type="number" className='job-post-form-input'
                                                        name="ExperianceMonths"
                                                        placeholder="Months" />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="" className='job-post-form-label'>Mandatory Skills<span className='form-required'>*</span></label>

                                                        <span className="job-post-form-badge">
                                                            Sample Tag
                                                        </span>

                                                    </div>

                                                    <input type="text" className='job-post-form-input'
                                                        name='searchSkillInput'
                                                        id='searchSkillInput'
                                                        placeholder='Search skills...' />

                                                    <div className='search-result-data-area'>
                                                        <div className='search-result-data'>
                                                            Sample Search Result Data
                                                        </div>
                                                    </div>

                                                    <div className="job-post-form-chechbox-area">
                                                        <label className="job-post-form-check-input view-disabled-input">
                                                            <input
                                                                type="checkbox"
                                                                className="toggleDisabledInput"
                                                            />
                                                            <span className="job-post-form-checkmark"></span>
                                                            If the searched skill for the particular job role not in the list, please enable the checkbox & type manually...
                                                        </label>
                                                    </div>

                                                    <div className="disabled-input-area">
                                                        <input
                                                            type='text'
                                                            name='manualSkillInput'
                                                            id='manualSkillInput'
                                                            className='job-post-form-input mt-4'
                                                            placeholder='Enter the skills...'
                                                        />
                                                        <button
                                                            type="button"
                                                            className="manually-add-btn"
                                                        >Add manually entered skill for a particular job role</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-8">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Job Category<span className='form-required'>*</span></label>
                                                    <i class="bi bi-chevron-down"></i>
                                                    <select className='job-post-form-input select-input'
                                                        id="jobCategory"
                                                        name="jobCategory"
                                                        required>
                                                        <option value="" selected disabled>Please select any one job category.</option>
                                                        <option value="full time">Full Time</option>
                                                        <option value="part time">Part Time</option>
                                                        <option value="remote">Remote</option>
                                                        <option value="freelancer">Freelancer</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-8">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label mb-1'>Job description</label>
                                                    <div className='job-post-form-sub-label'>Write a Job description or
                                                        <button className='paste-btn' id="paste-button">
                                                            Paste your JD
                                                        </button>
                                                    </div>
                                                    <textarea rows="5" className='job-post-form-input paste-input'
                                                        name='jobDescription'
                                                        placeholder='Enter the job description' id="job-description"
                                                        required></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="post-job-btn-area">
                                <button className='post-job-btn' onClick={showSuccessMessage}>Post a Job</button>
                            </div>
                        </div>
                    </section>
                </div >
                <Footer />
            </div >
        </div >
    )
}

export default PostingJob