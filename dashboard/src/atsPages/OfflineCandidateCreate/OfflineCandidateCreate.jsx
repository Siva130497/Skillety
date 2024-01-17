import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import ATSLayout from '../../atsComponents/ATSLayout';
import Footer from '../../components/Footer';
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '../../context/AuthContext';
import { v4 as uuidv4 } from "uuid";
import { useLocation } from 'react-router-dom';

const OfflineCandidateCreate = () => {

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

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="first_name" className='job-post-form-label'>First Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='first_name'
                                                        name="firstName"
                                                        placeholder="Enter first name"
                                                        required />
                                                </div>
                                                <small className='text-danger text-capitalized form-error-message'>This field is required.</small>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="last_name" className='job-post-form-label'>Last Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='last_name'
                                                        name="lastName"
                                                        placeholder="Enter last name"
                                                        required />
                                                </div>
                                                <small className='text-danger text-capitalized form-error-message'>This field is required.</small>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="mobile_number" className='job-post-form-label'>Mobile Number<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='mobile_number'
                                                        name="phone"
                                                        placeholder="Enter mobile number"
                                                        min="0"
                                                        required />
                                                </div>
                                                <small className='text-danger text-capitalized form-error-message'>This field is required.</small>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="email_id" className='job-post-form-label'>Email ID<span className='form-required'>*</span></label>
                                                    <input type="email"
                                                        className='job-post-form-input'
                                                        id='email_id'
                                                        name="email"
                                                        placeholder="Enter e-mail id"
                                                        required />
                                                </div>
                                                <div className='text-capitalized form-error-message'>
                                                    <small className='text-danger text-capitalized'>This field is required.</small>
                                                </div>
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

export default OfflineCandidateCreate