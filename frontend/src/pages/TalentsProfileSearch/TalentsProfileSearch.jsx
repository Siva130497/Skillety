import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './TalentsProfileSearch.css';
import './TalentsProfileSearch-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const TalentsProfileSearch = () => {
    useEffect(() => {
        $(document).ready(function () {
            ////change the toggle text and color
            $('#toggletoSwitch').change(function () {
                if ($(this).is(':checked')) {
                    $('#labelText').text('Boolean On').css('color', '#714F36');
                } else {
                    $('#labelText').text('Boolean Off').css('color', '#B3B3B3');
                }
            });

            $('#toggletoSwitch1').change(function () {
                if ($(this).is(':checked')) {
                    $('#labelText1').text('Boolean On').css('color', '#714F36');
                } else {
                    $('#labelText1').text('Boolean Off').css('color', '#B3B3B3');
                }
            });

            $('#toggletoSwitch2').change(function () {
                if ($(this).is(':checked')) {
                    $('#labelText2').text('Boolean On').css('color', '#714F36');
                } else {
                    $('#labelText2').text('Boolean Off').css('color', '#B3B3B3');
                }
            });

            //// avoid "e" negative values for number input field
            $('.numeric-input').on('input', function () {
                var inputValue = $(this).val();

                // Remove any non-digit characters, "e", and leading minus sign
                inputValue = inputValue.replace(/[^0-9]/g, '');

                // Ensure that the input is not negative
                if (inputValue.length > 0 && inputValue.charAt(0) === '-') {
                    inputValue = inputValue.slice(1);
                }

                // Set the cleaned value back in the input field
                $(this).val(inputValue);
            });

            ////for tooltip
            $('.info-icon-button').click(function () {
                // Toggle tooltip display on button click
                $('.tooltip').toggleClass('active');
            });

            ///add multi input fields for company
            $(".cli--tal-search-add-input-button").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "company",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Add Company name",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#container").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });

            ///add multi input fields for search keyword
            $(".cli--tal-search-keyword-add-input-button").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "exclude_keyword",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Enter the keyword",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#container1").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });

            ///add multi input fields for search keyword
            $(".cli--tal-search-skill-add-input-button").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "exclude_skill",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Enter the skill",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#container2").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });

            ///add multi input fields for qualification
            $(".cli--tal-search-qualification-add-input-button").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "qualification",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Enter the PPG/Doctorate Qualification",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#container3").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });
        });
    }, []);


    return (
        <div>
            <Layout />
            <div className='cli--tal-pro-search-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="custom--container">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Search Talent</p>
                                </div>
                            </div>

                            <div className="cli-tal-pro-search-container">
                                <div className="row">
                                    <div className="col-12 col-lg-4 col-xl-4 col-md-12">
                                        <h4 className='cli-tal-pro-search-heading'>Search Candidates</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-border-custom">
                                <div className="col-12 col-lg-12 col-xl-4 col-md-12 custom-right-border-col">
                                    <div className="cli-tal-pro-search-filter-area">
                                        <h6 className='cli-tal-pro-search-filter'>
                                            Filters
                                            <img src="assets/img/talent-profile/filter.png" className='cli-tal-pro-filter-img' alt="" />
                                        </h6>
                                        <div className="cli-tal-pro-search-filter-container">

                                            <div className="cli-tal-pro-search-filter-content">
                                                <div class="cli-tal-pro-search-filter-title-area">
                                                    <div class='info-icon-area'>
                                                        <h6 class='cli-tal-pro-search-filter-title'>Notice period / Availability to join</h6>
                                                        <button class='info-icon-button'>
                                                            <i class="ri-information-line info-icon"></i>
                                                        </button>
                                                        <div class="tooltip">This is the information about the notice period & availability to join.</div>
                                                    </div>
                                                </div>
                                                <div className="tal--search-options-area">
                                                    <div className="tal--search-option-container">
                                                        <input id="notice_period_1" className="tal--search-radio" type="radio" name="notice_period" />
                                                        <div className="tal--search-tile">
                                                            <label for="notice_period_1" className="tal--search-tile-label pe-2 ps-2">Any</label>
                                                        </div>
                                                    </div>

                                                    <div className="tal--search-option-container">
                                                        <input id="notice_period_2" className="tal--search-radio" type="radio" name="notice_period" />
                                                        <div className="tal--search-tile">
                                                            <label for="notice_period_2" className="tal--search-tile-label">0-07 days</label>
                                                            <i class="bi bi-plus"></i>
                                                        </div>
                                                    </div>

                                                    <div className="tal--search-option-container">
                                                        <input id="notice_period_3" className="tal--search-radio" type="radio" name="notice_period" />
                                                        <div className="tal--search-tile">
                                                            <label for="notice_period_3" className="tal--search-tile-label">08 to 15 days</label>
                                                            <i class="bi bi-plus"></i>
                                                        </div>
                                                    </div>
                                                    <div className="tal--search-option-container">
                                                        <input id="notice_period_4" className="tal--search-radio" type="radio" name="notice_period" />
                                                        <div className="tal--search-tile">
                                                            <label for="notice_period_4" className="tal--search-tile-label">16 to 30 days</label>
                                                            <i class="bi bi-plus"></i>
                                                        </div>
                                                    </div>
                                                    <div className="tal--search-option-container">
                                                        <input id="notice_period_5" className="tal--search-radio" type="radio" name="notice_period" />
                                                        <div className="tal--search-tile">
                                                            <label for="notice_period_5" className="tal--search-tile-label">beyond 30 days</label>
                                                            <i class="bi bi-plus"></i>
                                                        </div>
                                                    </div>
                                                    <div className="tal--search-option-container">
                                                        <input id="notice_period_6" className="tal--search-radio" type="radio" name="notice_period" />
                                                        <div className="tal--search-tile">
                                                            <label for="notice_period_6" className="tal--search-tile-label">Currently serving notice Period</label>
                                                            <i class="bi bi-plus"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cli-tal-pro-search-filter-content">
                                                <div className="cli-tal-pro-search-filter-title-area">
                                                    <h6 className='cli-tal-pro-search-filter-title'>Keywords</h6>
                                                    <div class="cl-toggle-switch">
                                                        <label class="cl-switch">
                                                            <input type="checkbox" id="toggletoSwitch" />
                                                            <span></span>
                                                        </label>
                                                        <h6 className='cl-toggle--switch-label' id="labelText">Boolean Off</h6>
                                                    </div>
                                                </div>
                                                <div className="cli--tal-pro-filter-input-area">
                                                    <input type="text" className='cli--tal-pro-filter-input' placeholder='Enter keywords like skills, designation' />
                                                    <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
                                                </div>

                                                <div className="cli--mark-keyword-area">
                                                    <label className="cli--mark-keyword-check-input">
                                                        <input type="checkbox" />
                                                        <span className="cli--mark-keyword-checkmark"></span>
                                                        Mark all keywords as mandatory
                                                    </label>
                                                </div>
                                                <div id="container1" className='multi-input-container'>
                                                    <div className="cli--tal-search-add-input-area mt-3">
                                                        <button className='cli--tal-search-keyword-add-input-button'>
                                                            <i class="bi bi-plus add-input-icon"></i>
                                                            Add Exclude Keywords
                                                        </button>
                                                    </div>
                                                </div>
                                                <div id="container2" className='multi-input-container'>
                                                    <div className="cli--tal-search-add-input-area">
                                                        <button className='cli--tal-search-skill-add-input-button'>
                                                            <i class="bi bi-plus add-input-icon"></i>
                                                            Add IT Skills
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cli-tal-pro-search-filter-content">
                                                <div className="cli-tal-pro-search-filter-title-area">
                                                    <h6 className='cli-tal-pro-search-filter-title'>Experience</h6>
                                                </div>
                                                <div className="cli-tal-pro-exp-input-area">
                                                    <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Min Experience' />
                                                    <span className='cli-tal-pro-exp-input-text'>to</span>
                                                    <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Max Experience' />
                                                    <span className='cli-tal-pro-exp-input-text'>years</span>
                                                </div>
                                            </div>

                                            <div className="cli-tal-pro-search-filter-content">
                                                <div className="cli-tal-pro-search-filter-title-area">
                                                    <h6 className='cli-tal-pro-search-filter-title'>Current location of candidate</h6>
                                                </div>
                                                <div className="cli-tal-pro-search-filter-input-area">
                                                    <input type="text" className='cli-tal-pro-search-filter-input' placeholder='Add location' />
                                                </div>
                                                <div className="cli--mark-keyword-area">
                                                    <label className="cli--mark-keyword-check-input">
                                                        <input type="checkbox" />
                                                        <span className="cli--mark-keyword-checkmark"></span>
                                                        Include candidate who prefer to relocate to above location
                                                    </label>
                                                    <div className='cli-change--location-area'>
                                                        Change preferred location
                                                    </div>
                                                    <label className="cli--mark-keyword-check-input">
                                                        <input type="checkbox" />
                                                        <span className="cli--mark-keyword-checkmark"></span>
                                                        Exclude candidate  who have mentioned Anywhere in ...
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="cli-tal-pro-search-filter-content">
                                                <div className="cli-tal-pro-search-filter-title-area">
                                                    <h6 className='cli-tal-pro-search-filter-title'>Annual Salary</h6>
                                                </div>
                                                <div className="cli-tal-pro-exp-input-area">
                                                    <div className="cli--salary-inputs-area">
                                                        <select name="" className='cli-tal-pro-select-input width-30' id="">
                                                            <option value="" disabled>Select</option>
                                                            <option value="1" selected>INR</option>
                                                            <option value="2">LKR</option>
                                                            <option value="3">USD</option>
                                                            <option value="4">GBP</option>
                                                        </select>
                                                        <input type="number" className='cli-tal-pro-exp-input numeric-input width-70' placeholder='Min Salary in Lacs' />
                                                    </div>
                                                    <span className='cli-tal-pro-exp-input-text'>to</span>
                                                    <input type="number" className='cli-tal-pro-exp-input text-center numeric-input width-45' placeholder='Max Salary in Lacs' />
                                                    <span className='cli-tal-pro-exp-input-text'>lacs</span>
                                                </div>
                                                <div className="cli--mark-keyword-area">
                                                    <label className="cli--mark-keyword-check-input">
                                                        <input type="checkbox" />
                                                        <span className="cli--mark-keyword-checkmark"></span>
                                                        Include candidate  who did not mention their current salary
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="cli--emploment-detail-area">
                                                <h6 className='cli--emploment-detail-head'>Employment Details</h6>

                                                <div className="cli-tal-search-filter-form-group">
                                                    <div className="cli-tal-search-filter-form-label-area">
                                                        <label htmlFor="department_role" className='cli-tal-search-filter-form-label'>Department and Roles</label>
                                                    </div>
                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                        <input type="text" name='department_role' className='cli-tal-pro-search-filter-input' placeholder='Add Department/Role' />
                                                    </div>
                                                </div>

                                                <div className="cli-tal-search-filter-form-group">
                                                    <div className="cli-tal-search-filter-form-label-area">
                                                        <label htmlFor="industry" className='cli-tal-search-filter-form-label'>Industry</label>
                                                    </div>
                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                        <input type="text" name='industry' className='cli-tal-pro-search-filter-input' placeholder='Add Industry' />
                                                    </div>
                                                </div>

                                                <div className="cli-tal-search-filter-form-group">
                                                    <div className="cli-tal-search-filter-form-label-area">
                                                        <label htmlFor="company" className='cli-tal-search-filter-form-label'>Company</label>
                                                        <div class="cl-toggle-switch">
                                                            <label class="cl-switch">
                                                                <input type="checkbox" id="toggletoSwitch1" />
                                                                <span></span>
                                                            </label>
                                                            <h6 className='cl-toggle--switch-label' id="labelText1">Boolean Off</h6>
                                                        </div>
                                                    </div>
                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                        <input type="text" name='company' className='cli-tal-pro-search-filter-input' placeholder='Add Company name' />
                                                    </div>
                                                    <div id="container" className='multi-input-container'>
                                                        <div className="cli--tal-search-add-input-area mt-3">
                                                            <button className='cli--tal-search-add-input-button'>
                                                                <i class="bi bi-plus add-input-icon"></i>
                                                                Add Exclude Company
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="cli-tal-search-filter-form-group">
                                                    <div className="cli-tal-search-filter-form-label-area">
                                                        <label htmlFor="designation" className='cli-tal-search-filter-form-label'>Designation</label>
                                                        <div class="cl-toggle-switch">
                                                            <label class="cl-switch">
                                                                <input type="checkbox" id="toggletoSwitch2" />
                                                                <span></span>
                                                            </label>
                                                            <h6 className='cl-toggle--switch-label' id="labelText2">Boolean Off</h6>
                                                        </div>
                                                    </div>
                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                        <input type="text" name='designation' className='cli-tal-pro-search-filter-input' placeholder='Add designation' />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cli--emploment-detail-area">
                                                <h6 className='cli--emploment-detail-head'>Work Details</h6>


                                                <div className="cli-tal-search-filter-form-group">
                                                    <div className="cli-tal-search-filter-form-label-area">
                                                        <label htmlFor="candidate_seek" className='cli-tal-search-filter-form-label'>Show candidate seeking</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-xl-6 col-lg-6 col-md-6">
                                                            <div className="cli-tal-pro-search-filter-input-area">
                                                                <select name="job_type" id="candidate_seek"
                                                                    className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                    <option value="" disabled selected>Job type</option>
                                                                    <option value="1">Job type 1</option>
                                                                    <option value="2">Job type 1</option>
                                                                    <option value="3">Job type 1</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-xl-6 col-lg-6 col-md-6">
                                                            <div className="cli-tal-pro-search-filter-input-area">
                                                                <select name="employee_type" id="candidate_seek"
                                                                    className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                    <option value="" disabled selected>Employment type</option>
                                                                    <option value="1">Employment type 1</option>
                                                                    <option value="2">Employment type 2</option>
                                                                    <option value="3">Employment type 3</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="cli-tal-search-filter-form-group">
                                                    <div className="cli-tal-search-filter-form-label-area">
                                                        <label htmlFor="work_permit" className='cli-tal-search-filter-form-label'>Work permit for</label>
                                                    </div>
                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                        <input type="text" className='cli-tal-pro-search-filter-input' placeholder='Choose Category' />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cli--emploment-detail-area">
                                                <h6 className='cli--emploment-detail-head'>Display Details</h6>

                                                <div className="cli-tal-pro-search-filter-content">
                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                        <h6 className='cli-tal-pro-search-filter-title'>Show</h6>
                                                    </div>

                                                    <div className="tal--search-options-area">
                                                        <div className="tal--search-option-container">
                                                            <input id="all_candidate" className="tal--search-radio" type="radio" name="show" />
                                                            <div className="tal--search-tile">
                                                                <label for="all_candidate" className="tal--search-tile-label">All candidates</label>
                                                            </div>
                                                        </div>

                                                        <div className="tal--search-option-container">
                                                            <input id="new_reg" className="tal--search-radio" type="radio" name="show" />
                                                            <div className="tal--search-tile">
                                                                <label for="new_reg" className="tal--search-tile-label">New Registrations</label>
                                                            </div>
                                                        </div>

                                                        <div className="tal--search-option-container">
                                                            <input id="recent_activity" className="tal--search-radio" type="radio" name="show" />
                                                            <div className="tal--search-tile">
                                                                <label for="recent_activity" className="tal--search-tile-label">Active Recently</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="cli-tal-pro-search-filter-content">
                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                        <h6 className='cli-tal-pro-search-filter-title'>Show only candidates with </h6>
                                                    </div>

                                                    <div className="tal--search-options-area">
                                                        <div className="tal--search-option-container">
                                                            <input id="ver_mobile" className="tal--search-radio" type="radio" name="show_cand" />
                                                            <div className="tal--search-tile">
                                                                <label for="ver_mobile" className="tal--search-tile-label">Verified mobile number</label>
                                                                <i class="bi bi-plus"></i>
                                                            </div>
                                                        </div>

                                                        <div className="tal--search-option-container">
                                                            <input id="ver_email" className="tal--search-radio" type="radio" name="show_cand" />
                                                            <div className="tal--search-tile">
                                                                <label for="ver_email" className="tal--search-tile-label">Verified email ID </label>
                                                                <i class="bi bi-plus"></i>
                                                            </div>
                                                        </div>
                                                        <div className="tal--search-option-container">
                                                            <input id="att_resume" className="tal--search-radio" type="radio" name="show_cand" />
                                                            <div className="tal--search-tile">
                                                                <label for="att_resume" className="tal--search-tile-label">Attached resume</label>
                                                                <i class="bi bi-plus"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="cli--emploment-detail-area">
                                                <h6 className='cli--emploment-detail-head'>Education Details</h6>

                                                <div className="cli-tal-pro-search-filter-content">
                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                        <h6 className='cli-tal-pro-search-filter-title'>UG Qualification</h6>
                                                    </div>

                                                    <div className="tal--search-options-area">
                                                        <div className="tal--search-option-container">
                                                            <input id="any_ug" className="tal--search-radio" type="radio" name="ug_qualification" />
                                                            <div className="tal--search-tile">
                                                                <label for="any_ug" className="tal--search-tile-label">Any UG Qualification</label>
                                                            </div>
                                                        </div>

                                                        <div className="tal--search-option-container">
                                                            <input id="spc_ug" className="tal--search-radio" type="radio" name="ug_qualification" />
                                                            <div className="tal--search-tile">
                                                                <label for="spc_ug" className="tal--search-tile-label">Specific UG Qualification</label>
                                                            </div>
                                                        </div>

                                                        <div className="tal--search-option-container">
                                                            <input id="no_ug" className="tal--search-radio" type="radio" name="ug_qualification" />
                                                            <div className="tal--search-tile">
                                                                <label for="no_ug" className="tal--search-tile-label">No UG Qualification</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="cli-tal-pro-search-filter-content">
                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                        <h6 className='cli-tal-pro-search-filter-title'>PG Qualification</h6>
                                                    </div>

                                                    <div className="tal--search-options-area">
                                                        <div className="tal--search-option-container">
                                                            <input id="any_pg" className="tal--search-radio" type="radio" name="pg_qualification" />
                                                            <div className="tal--search-tile">
                                                                <label for="any_pg" className="tal--search-tile-label">Any PG Qualification</label>
                                                            </div>
                                                        </div>

                                                        <div className="tal--search-option-container">
                                                            <input id="spc_pg" className="tal--search-radio" type="radio" name="pg_qualification" />
                                                            <div className="tal--search-tile">
                                                                <label for="spc_pg" className="tal--search-tile-label">Specific PG Qualification</label>
                                                            </div>
                                                        </div>

                                                        <div className="tal--search-option-container">
                                                            <input id="no_pg" className="tal--search-radio" type="radio" name="pg_qualification" />
                                                            <div className="tal--search-tile">
                                                                <label for="no_pg" className="tal--search-tile-label">No PG Qualification</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="container3" className='multi-input-container'>
                                                        <div className="cli--tal-search-add-input-area">
                                                            <button className='cli--tal-search-qualification-add-input-button'>
                                                                <i class="bi bi-plus add-input-icon"></i>
                                                                Add PPG/Doctorate Qualification
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='h--line'></div>

                                            <div className="cli--emploment-detail-area">
                                                <h6 className='cli--emploment-detail-head'>Diversity and Additional Details</h6>

                                                <div className="cli-tal-pro-search-filter-content">
                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                        <h6 className='cli-tal-pro-search-filter-title'>Gender</h6>
                                                    </div>

                                                    <div className="tal--search-options-area">
                                                        <div className="tal--search-option-container">
                                                            <input id="all_cand" className="tal--search-radio" type="radio" name="gender" />
                                                            <div className="tal--search-tile">
                                                                <label for="all_cand" className="tal--search-tile-label">All candidates</label>
                                                            </div>
                                                        </div>

                                                        <div className="tal--search-option-container">
                                                            <input id="male_cand" className="tal--search-radio" type="radio" name="gender" />
                                                            <div className="tal--search-tile">
                                                                <label for="male_cand" className="tal--search-tile-label">Male Candidates</label>
                                                            </div>
                                                        </div>

                                                        <div className="tal--search-option-container">
                                                            <input id="female_cand" className="tal--search-radio" type="radio" name="gender" />
                                                            <div className="tal--search-tile">
                                                                <label for="female_cand" className="tal--search-tile-label">Female candidates</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="clear--all_button-area">
                                                <button className='clear--all_button'>
                                                    Clear all
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-12 col-xl-8 col-md-12">
                                    <div className="tal--pro-search-result-image-area">
                                        <img src="assets/img/jobs/filter-data-img.png" className='tal--pro-search-result-image' alt="" />
                                        <h6 className='tal--pro-search-result-title'>Add Filter for the desired search</h6>
                                    </div>
                                    {/* <div className="cli--tal-pro-search-results-area">
                                        <article className="talent--profile-card mb-4" data-aos="fade-left">
                                            <div className="row custom-col-reverse">
                                                <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                    <div className="tal--pro-card-tags">
                                                        <h6 className='tal--pro-card-rating'>
                                                            <i class="ri-star-fill"></i>
                                                            <span>4.9</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : 6 Yrs
                                                        </h6>
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bx bxs-map"></i>
                                                            <span>Hyderabad</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-role'>
                                                            Frontend Developer
                                                        </h6>
                                                    </div>
                                                    <div className="tal--pro-card-desc-area">
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                    <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                    <div className="tal--pro-card-ability-area">
                                                        <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                        <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                    </div>
                                                    <div className='tal--pro-card-number-area'>
                                                        <h2 className='tal--pro-card-percentage'>90%</h2>
                                                        <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                    </div>
                                                    <div className='tal--pro-card-know-btn-area'>
                                                        <a href="/talents" className='tal--pro-card-know-btn'>Know More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>

                                        <article className="talent--profile-card mb-4" data-aos="fade-left">
                                            <div className="row custom-col-reverse">
                                                <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                    <div className="tal--pro-card-tags">
                                                        <h6 className='tal--pro-card-rating'>
                                                            <i class="ri-star-fill"></i>
                                                            <span>4.9</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : 6 Yrs
                                                        </h6>
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bx bxs-map"></i>
                                                            <span>Hyderabad</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-role'>
                                                            Frontend Developer
                                                        </h6>
                                                    </div>
                                                    <div className="tal--pro-card-desc-area">
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                    <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                    <div className="tal--pro-card-ability-area">
                                                        <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                        <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                    </div>
                                                    <div className='tal--pro-card-number-area'>
                                                        <h2 className='tal--pro-card-percentage'>90%</h2>
                                                        <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                    </div>
                                                    <div className='tal--pro-card-know-btn-area'>
                                                        <a href="/talents" className='tal--pro-card-know-btn'>Know More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>

                                        <article className="talent--profile-card mb-4" data-aos="fade-left">
                                            <div className="row custom-col-reverse">
                                                <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                    <div className="tal--pro-card-tags">
                                                        <h6 className='tal--pro-card-rating'>
                                                            <i class="ri-star-fill"></i>
                                                            <span>4.9</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : 6 Yrs
                                                        </h6>
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bx bxs-map"></i>
                                                            <span>Hyderabad</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-role'>
                                                            Frontend Developer
                                                        </h6>
                                                    </div>
                                                    <div className="tal--pro-card-desc-area">
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                    <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                    <div className="tal--pro-card-ability-area">
                                                        <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                        <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                    </div>
                                                    <div className='tal--pro-card-number-area'>
                                                        <h2 className='tal--pro-card-percentage'>90%</h2>
                                                        <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                    </div>
                                                    <div className='tal--pro-card-know-btn-area'>
                                                        <a href="/talents" className='tal--pro-card-know-btn'>Know More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>

                                        <article className="talent--profile-card mb-4" data-aos="fade-left">
                                            <div className="row custom-col-reverse">
                                                <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                    <div className="tal--pro-card-tags">
                                                        <h6 className='tal--pro-card-rating'>
                                                            <i class="ri-star-fill"></i>
                                                            <span>4.9</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : 6 Yrs
                                                        </h6>
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bx bxs-map"></i>
                                                            <span>Hyderabad</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-role'>
                                                            Frontend Developer
                                                        </h6>
                                                    </div>
                                                    <div className="tal--pro-card-desc-area">
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                    <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                    <div className="tal--pro-card-ability-area">
                                                        <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                        <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                    </div>
                                                    <div className='tal--pro-card-number-area'>
                                                        <h2 className='tal--pro-card-percentage'>90%</h2>
                                                        <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                    </div>
                                                    <div className='tal--pro-card-know-btn-area'>
                                                        <a href="/talents" className='tal--pro-card-know-btn'>Know More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>

                                        <article className="talent--profile-card mb-4" data-aos="fade-left">
                                            <div className="row custom-col-reverse">
                                                <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                    <div className="tal--pro-card-tags">
                                                        <h6 className='tal--pro-card-rating'>
                                                            <i class="ri-star-fill"></i>
                                                            <span>4.9</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : 6 Yrs
                                                        </h6>
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bx bxs-map"></i>
                                                            <span>Hyderabad</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-role'>
                                                            Frontend Developer
                                                        </h6>
                                                    </div>
                                                    <div className="tal--pro-card-desc-area">
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                    <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                    <div className="tal--pro-card-ability-area">
                                                        <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                        <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                    </div>
                                                    <div className='tal--pro-card-number-area'>
                                                        <h2 className='tal--pro-card-percentage'>90%</h2>
                                                        <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                    </div>
                                                    <div className='tal--pro-card-know-btn-area'>
                                                        <a href="/talents" className='tal--pro-card-know-btn'>Know More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>

                                        <article className="talent--profile-card mb-4" data-aos="fade-left">
                                            <div className="row custom-col-reverse">
                                                <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                    <div className="tal--pro-card-tags">
                                                        <h6 className='tal--pro-card-rating'>
                                                            <i class="ri-star-fill"></i>
                                                            <span>4.9</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : 6 Yrs
                                                        </h6>
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bx bxs-map"></i>
                                                            <span>Hyderabad</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-role'>
                                                            Frontend Developer
                                                        </h6>
                                                    </div>
                                                    <div className="tal--pro-card-desc-area">
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                    <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                    <div className="tal--pro-card-ability-area">
                                                        <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                        <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                    </div>
                                                    <div className='tal--pro-card-number-area'>
                                                        <h2 className='tal--pro-card-percentage'>90%</h2>
                                                        <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                    </div>
                                                    <div className='tal--pro-card-know-btn-area'>
                                                        <a href="/talents" className='tal--pro-card-know-btn'>Know More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>

                                        <article className="talent--profile-card mb-4" data-aos="fade-left">
                                            <div className="row custom-col-reverse">
                                                <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                    <div className="tal--pro-card-tags">
                                                        <h6 className='tal--pro-card-rating'>
                                                            <i class="ri-star-fill"></i>
                                                            <span>4.9</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : 6 Yrs
                                                        </h6>
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bx bxs-map"></i>
                                                            <span>Hyderabad</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-role'>
                                                            Frontend Developer
                                                        </h6>
                                                    </div>
                                                    <div className="tal--pro-card-desc-area">
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                    <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                    <div className="tal--pro-card-ability-area">
                                                        <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                        <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                    </div>
                                                    <div className='tal--pro-card-number-area'>
                                                        <h2 className='tal--pro-card-percentage'>90%</h2>
                                                        <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                    </div>
                                                    <div className='tal--pro-card-know-btn-area'>
                                                        <a href="/talents" className='tal--pro-card-know-btn'>Know More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>

                                        <article className="talent--profile-card mb-4" data-aos="fade-left">
                                            <div className="row custom-col-reverse">
                                                <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                    <div className="tal--pro-card-tags">
                                                        <h6 className='tal--pro-card-rating'>
                                                            <i class="ri-star-fill"></i>
                                                            <span>4.9</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : 6 Yrs
                                                        </h6>
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bx bxs-map"></i>
                                                            <span>Hyderabad</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-role'>
                                                            Frontend Developer
                                                        </h6>
                                                    </div>
                                                    <div className="tal--pro-card-desc-area">
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                    <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                    <div className="tal--pro-card-ability-area">
                                                        <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                        <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                    </div>
                                                    <div className='tal--pro-card-number-area'>
                                                        <h2 className='tal--pro-card-percentage'>90%</h2>
                                                        <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                    </div>
                                                    <div className='tal--pro-card-know-btn-area'>
                                                        <a href="/talents" className='tal--pro-card-know-btn'>Know More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>

                                        <div className="tal--pro-paginate-btn-area" data-aos="fade-up">
                                            <h6 className='tal--pro-total-result-text'>Total Items : <span>08</span></h6>
                                            <div className='tal--pro-slider-btn-sub'>
                                                <button className="tal--pro-slider-btn">
                                                    <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                        <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                                    </svg>
                                                </button>
                                                <button className="tal--pro-slider-btn">
                                                    <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                        <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default TalentsProfileSearch;