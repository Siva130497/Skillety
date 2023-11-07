import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './JobDetails.css';
import './JobDetails-responsive.css';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

const JobDetails = () => {

    useEffect(() => {
        $(document).ready(function () {
        });
    }, []);

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <Layout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Job Details
                            </div>
                            <div className="dash-job-det-section">
                                <div className='dash-job-det-head'>Opening for UX Designer in Mindtree</div>
                                <div className="dash-job-det-card-area">
                                    <article className='dash-job-det-card'>
                                        <div className="dash-job-det-card-header">
                                            <div className="dash-job-det-card-header-lft">
                                                <div className="dash-job-det-card-role">UX Designer</div>
                                                <div className="dash-job-det-card-com-area">
                                                    <div className="dash-job-det-card-com">Happiest Minds</div>
                                                    <div className="dash-job-det-card-det-area">
                                                        <div className="dash-job-det-card-det">
                                                            <i class="bi bi-briefcase-fill"></i>
                                                            <span>0-4 Yrs</span>
                                                        </div>
                                                        <div className="dash-job-det-card-det">
                                                            <span>Not disclosed</span>
                                                        </div>
                                                        <div className="dash-job-det-card-det">
                                                            <i class="bi bi-geo-alt-fill"></i>
                                                            <span>Hyderabad</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dash-job-det-card-header-rgt">
                                                <div className="dash-job-det-card-img-area">
                                                    <img src="assets/img/companies/company-1.png" className='dash-job-det-card-img' alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dash-job-det-card-body">
                                            <div className="dash-job-det-card-tags-area">
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                                <div className="dash-job-det-card-tag">UX,Design & Archietect</div>
                                            </div>
                                            <div className="dash-job-det-card-more-job-btn-area">
                                                <a href="#" className='dash-job-det-card-more-job-btn'>Search more job like this</a>
                                            </div>
                                        </div>
                                        <div className="dash-job-det-card-footer">
                                            <div className="dash-job-det-card-status-area">
                                                <div className="dash-job-det-card-status with-border-padding">
                                                    Posted :&nbsp;<span>5 days ago</span>
                                                </div>
                                                <div className="dash-job-det-card-status with-border-padding">
                                                    Opening :&nbsp;<span>02</span>
                                                </div>
                                                <div className="dash-job-det-card-status">
                                                    Applicants :&nbsp;<span>624</span>
                                                </div>
                                            </div>
                                            <div className="dash-job-det-card-btn-area">
                                                <label className="dash-job-det-favourite">
                                                    <input type="checkbox" />
                                                    <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                                                        <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z">
                                                        </path>
                                                    </svg>
                                                </label>
                                                <button type='button' className="dash-job-det-card-apply-btn">Apply</button>
                                            </div>
                                        </div>
                                    </article>
                                </div>

                                <div className="dash-job-det-content-area">
                                    <div className="job-match-score-area">
                                        <div className="job-match-score-head">Job match score</div>
                                        <div className="job-match-score-selection-area">
                                            <div className="job-match-score-radio-select-area">
                                                <label className="job-match-score-radio-button">
                                                    <input type="radio" name="job-match-score-radio-option" value="Early_Applicant" />
                                                    <span className="job-match-score-radio"></span>
                                                    Early Applicant
                                                </label>

                                                <label className="job-match-score-radio-button">
                                                    <input type="radio" name="job-match-score-radio-option" value="Keyskills" />
                                                    <span className="job-match-score-radio"></span>
                                                    Keyskills
                                                </label>

                                                <label className="job-match-score-radio-button">
                                                    <input type="radio" name="job-match-score-radio-option" value="Location" />
                                                    <span className="job-match-score-radio"></span>
                                                    Location
                                                </label>

                                                <label className="job-match-score-radio-button">
                                                    <input type="radio" name="job-match-score-radio-option" value="Work_Experience" />
                                                    <span className="job-match-score-radio"></span>
                                                    Work Experience
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dash-job-desc-section">
                                        <div className="dash-job-desc-area">
                                            <div className="dash-job-desc-head">Job Description</div>
                                            <p className='dash-job-desc'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                            </p>
                                        </div>

                                        <div className="dash-job-desc-area">
                                            <div className="dash-job-desc-head">QUALIFICATION</div>
                                        </div>

                                        <div className="dash-job-desc-area">
                                            <div className="dash-job-desc-head">Education</div>
                                            <p className='dash-job-desc'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                            </p>
                                        </div>

                                        <div className="dash-job-desc-area">
                                            <div className="dash-job-desc-head">Prior Experience</div>
                                            <p className='dash-job-desc'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                            </p>
                                        </div>

                                        <div className="dash-job-desc-area">
                                            <div className="dash-job-desc-head">Prior Experience</div>
                                            <ul className='mt-2'>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="dash-job-desc-area">
                                            <div className="dash-job-desc-head">Work you’ll do</div>
                                            <ul className='mt-2'>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                                <li className='dash-job-desc-list-item'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="dash-job-det-info-section">
                                        <div className="dash-job-det-info-area">
                                            <div className="dash-job-det-info">
                                                Location :&nbsp;
                                                <span>Pan India</span>
                                            </div>
                                        </div>
                                        <div className="dash-job-det-info-area">
                                            <div className="dash-job-det-info">
                                                Role :&nbsp;
                                                <span>UX Designer</span>
                                            </div>
                                        </div>
                                        <div className="dash-job-det-info-area">
                                            <div className="dash-job-det-info">
                                                Industry Type :&nbsp;
                                                <span>IT Service & Consulting</span>
                                            </div>
                                        </div>
                                        <div className="dash-job-det-info-area">
                                            <div className="dash-job-det-info">
                                                Department :&nbsp;
                                                <span>Designing</span>
                                            </div>
                                        </div>
                                        <div className="dash-job-det-info-area">
                                            <div className="dash-job-det-info">
                                                Employment Type :&nbsp;
                                                <span>Fulll time, Permanent</span>
                                            </div>
                                        </div>
                                        <div className="dash-job-det-info-area">
                                            <div className="dash-job-det-info">
                                                Role Category :&nbsp;
                                                <span>Other Consulting</span>
                                            </div>
                                        </div>
                                        <div className="dash-job-det-info-area">
                                            <div className="dash-job-det-info">
                                                Education :&nbsp;
                                                <div className='mt-3'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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

export default JobDetails