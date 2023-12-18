import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './CreateCandidate.css';
import './CreateCandidate-responsive.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateCandidate = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        function toggleDisabledInputArea() {
            var isChecked = $(this).is(':checked');
            var disabledInputArea = $(this).closest('.job-post-form-group').find('.disabled-input-area');

            if (isChecked) {
                disabledInputArea.slideDown();
            } else {
                disabledInputArea.slideUp();
            }
        }

        $('.toggleDisabledInput').on('change', toggleDisabledInputArea);

        $('.toggleDisabledInput').each(function () {
            toggleDisabledInputArea.call(this);
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
                                Create Candidate
                            </div>
                            <div className="card post-job-card">
                                <div className="post-job-title">Create New Candidate </div>
                                {/* <div className="post-job-sub-title">Begin from scratch</div> */}


                                <div className="job-post-form-area p-t-40">
                                    <form action="">
                                        <div className="row m-b-20">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>In How many days can Join? Please select one bucket<span className='form-required'>*</span></label>
                                                    <div className="create-cand-radio-input-group">
                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_1" className="radio-button" type="radio" name="days" value="0 to 7 days" />
                                                            <div className="radio-tile">
                                                                <label for="day_option_1" className="radio-tile-label">0 to 7 days</label>
                                                            </div>
                                                        </div>

                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_2" className="radio-button" type="radio" name="days"
                                                                value="8 to 15 days"
                                                            />
                                                            <div className="radio-tile">
                                                                <label for="day_option_2" className="radio-tile-label">8 to 15 days</label>
                                                            </div>
                                                        </div>

                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_3" className="radio-button" type="radio" name="days"
                                                                value="16 to 30 days"
                                                            />
                                                            <div className="radio-tile">
                                                                <label for="day_option_3" className="radio-tile-label">16 to 30 days</label>
                                                            </div>
                                                        </div>

                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_4" className="radio-button" type="radio" name="days"
                                                                value="More than 30 days"
                                                            />
                                                            <div className="radio-tile">
                                                                <label for="day_option_4" className="radio-tile-label">More than 30 days</label>
                                                            </div>
                                                        </div>

                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_5" className="radio-button" type="radio" name="days"
                                                                value="Currently not serving notice period"
                                                            />
                                                            <div className="radio-tile">
                                                                <label for="day_option_4" className="radio-tile-label"> Currently not serving notice period</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='validation-msg pt-3'>This field is required.</div>

                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="imediate-switch">
                                                    <input type="checkbox" />
                                                    <span className="imediate-slider"></span>
                                                    <span className='imediate-switch-label'>Imediate Joiner</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12">
                                                <div className="job-post-form-group d-sm-flex align-items-sm-center gap-20">
                                                    <label htmlFor="" className='job-post-form-label mb-sm-0'>
                                                        What is your last working day
                                                        <span className='form-required'>*</span>
                                                    </label>
                                                    <div className='custom--width'>
                                                        <DatePicker
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText='dd/mm/yyyy'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="first_name" className='job-post-form-label'>First Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='first_name' name="firstName"
                                                        placeholder="Enter first name"
                                                        required />
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="last_name" className='job-post-form-label'>Last Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='last_name' name="lastName"
                                                        placeholder="Enter last name"
                                                        required />
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="mobile_number" className='job-post-form-label'>Mobile Number<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='mobile_number' name="mobileNumber"
                                                        placeholder="Enter mobile number"
                                                        required />
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="email_id" className='job-post-form-label'>Email ID<span className='form-required'>*</span></label>
                                                    <input type="email"
                                                        className='job-post-form-input'
                                                        id='email_id' name="email"
                                                        placeholder="Enter e-mail id"
                                                        required />
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="password" className='job-post-form-label'>Password<span className='form-required'>*</span></label>
                                                    <input type={showPassword ? 'text' : 'password'}
                                                        className='job-post-form-input'
                                                        id='password' name="password"
                                                        placeholder="Enter the password"
                                                        required />
                                                    <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} password-show-icon`}
                                                        onClick={handleTogglePassword}
                                                        id='togglePassword'>
                                                    </i>
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="confirm_password" className='job-post-form-label'>Confirm Password<span className='form-required'>*</span></label>
                                                    <input type={showConfirmPassword ? 'text' : 'password'}
                                                        className='job-post-form-input'
                                                        id='confirm_password' name="confirmPassword"
                                                        placeholder="Confirm the password"
                                                        required />
                                                    <i className={`bi ${showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'} password-show-icon`}
                                                        onClick={handleToggleConfirmPassword}
                                                        id='togglePassword'>
                                                    </i>
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12">
                                                <div className='job-post-form-group'>
                                                    <div className="cand--reg-file-upload-area">
                                                        <input type="file" id="file_upload" accept=".doc,.docx,.pdf,.rtf"
                                                            style={{ display: 'none' }}
                                                            required />
                                                        <label for="file_upload" className='cand--reg-file-upload-label'>
                                                            <i class="bi bi-upload"></i>
                                                            Upload the Resume/CV here&nbsp;<span className='is-form-required'>*</span></label>
                                                        <span id="file-chosen">No file chosen</span>
                                                        <div className='file--upload-text'>Either in .doc/ docx/.pdf format only</div>
                                                    </div>
                                                    <div className='validation-msg pt-3'>This field is required.</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6 m-b-35 mb-xl-0">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="" className='job-post-form-label'>Current Role/Designation<span className='form-required'>*</span></label>
                                                        {/* <i class="bi bi-chevron-down"></i> */}
                                                        <span className="job-post-form-badge"
                                                        >Sample
                                                        </span>
                                                    </div>

                                                    <input type="search" className='job-post-form-input'
                                                        name='searchJobRoleInput'
                                                        id='searchJobRoleInput'
                                                        placeholder='Enter the designation to search here' />

                                                    <div className='search-result-data-area'>
                                                        <div className='search-result-data'>
                                                            Sample
                                                        </div>
                                                    </div>

                                                    <div className='validation-msg pt-2'>This field is required.</div>

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
                                                            placeholder='Enter the designation manually...'
                                                        />
                                                        <button
                                                            type="button"
                                                            className="manually-add-btn with-mb">
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="company" className='job-post-form-label'>Current Company<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='company' name="company"
                                                        placeholder="Enter the current company"
                                                        required />
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6 m-b-35 mb-xl-0">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="location" className='job-post-form-label'>Current Location<span className='form-required'>*</span></label>

                                                        <span className="job-post-form-badge"
                                                        >Sample
                                                        </span>

                                                    </div>

                                                    <input type="search" className='job-post-form-input'
                                                        name='searchLocationInput'
                                                        id='searchLocationInput'
                                                        placeholder='Enter the location to search here' />

                                                    <div className='search-result-data-area'>
                                                        <div className='search-result-data'>
                                                            Sample
                                                        </div>
                                                    </div>

                                                    <div className='validation-msg pt-2'>This field is required.</div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <label htmlFor="work_experience" className='job-post-form-label'>Total experience<span className='form-required'>*</span></label>
                                                    </div>
                                                    <div className="col-12 col-xl-6 col-lg-6 col-md-6 mb-4 mb-md-0">
                                                        <div className="job-post-form-group without-label">
                                                            <input type="text" id='work_experience' className='job-post-form-input'
                                                                name="years"
                                                                placeholder="Years" />
                                                            <div className='validation-msg pt-2'>This field is required.</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-xl-6 col-lg-6 col-md-6">
                                                        <div className="job-post-form-group without-label">
                                                            <input type="text" id='work_experience' className='job-post-form-input'
                                                                name="months"
                                                                placeholder="Months" />
                                                            <div className='validation-msg pt-2'>This field is required.</div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-12">
                                                        <div className='validation-msg pt-2'>This field is required.</div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-lg-12 col-xl-12">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="skill" className='job-post-form-label'>Skills<span className='form-required'>*</span></label>

                                                        <span className="job-post-form-badge">
                                                            Sample
                                                        </span>
                                                    </div>

                                                    <input type="search" className='job-post-form-input'
                                                        name='searchSkillInput'
                                                        id='searchSkillInput'
                                                        placeholder='Enter the skill to search here' />

                                                    <div className='search-result-data-area'>
                                                        <div className='search-result-data'>
                                                            Sample
                                                        </div>
                                                    </div>

                                                    <div className='validation-msg pt-2'>This field is required.</div>

                                                    <div className="job-post-form-chechbox-area">
                                                        <label className="job-post-form-check-input view-disabled-input">
                                                            <input
                                                                type="checkbox"
                                                                className="toggleDisabledInput"
                                                            />
                                                            <span className="job-post-form-checkmark"></span>
                                                            If your searched skill not in the list, please enable the checkbox & type manually...
                                                        </label>
                                                    </div>

                                                    <div className="disabled-input-area">
                                                        <input
                                                            type='text'
                                                            name='manualSkillInput'
                                                            id='manualSkillInput'
                                                            className='job-post-form-input mt-4'
                                                            placeholder='Enter the skill manually...'
                                                        />
                                                        {/* {skillError && <p>{skillError}</p>} */}
                                                        <button
                                                            type="button"
                                                            className="manually-add-btn"
                                                        >Add manually entered skill</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6 m-b-35 mb-xl-0">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="education" className='job-post-form-label'>Highest Education<span className='form-required'>*</span></label>
                                                        {/* <i class="bi bi-chevron-down"></i> */}
                                                        <span className="job-post-form-badge"
                                                        >Sample
                                                        </span>
                                                    </div>

                                                    <input type="search" className='job-post-form-input'
                                                        name='searchEducationInput'
                                                        id='searchEducationInput'
                                                        placeholder='Enter a clear & specific education to get better responses' />

                                                    <div className='search-result-data-area'>
                                                        <div className='search-result-data'>
                                                            Sample
                                                        </div>
                                                    </div>

                                                    <div className='validation-msg pt-2'>This field is required.</div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="college_name" className='job-post-form-label'>Name of the College<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='college_name' name="collegeName"
                                                        placeholder="Enter the name of the college"
                                                        required />
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="profile_headline" className='job-post-form-label'>Profile Headline<span className='form-required'>*</span></label>
                                                    <textarea rows="5" className='job-post-form-input'
                                                        name="profileHeadline"
                                                        placeholder="(Example: I am a Best Employee Award winning embedded engineer with over 5 years  of experience in the software development domain, proficient in tools/skills like NXPT1020, C, RS422, VxWORKS, ST-True Studio, STM32F103C8, Embedded C, EEPROM, WIFI.)" id="profile_headline"
                                                        required></textarea>
                                                </div>
                                                <div className='validation-msg pt-1'>This field is required.</div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="post-job-btn-area">
                                <button className='post-job-btn'>Create</button>
                            </div>
                        </div>
                    </section>
                </div >
                <Footer />
            </div >
        </div >
    )

}

export default CreateCandidate