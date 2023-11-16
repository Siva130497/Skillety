import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './EventPosting.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventPosting = () => {
    //for show success message for payment
    function showSuccessMessage() {
        Swal.fire({
            title: 'Congratulations!',
            text: 'Event Posted Successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage() {
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
            $(".custom-file-input").on("change", function () {
                var fileName = $(this).val().split("\\").pop();
                $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
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
                                Event Posting
                            </div>
                            <div className="card post-job-card">
                                <div className="post-job-title">Post an Event </div>
                                {/* <div className="post-job-sub-title">Begin from scratch</div> */}

                                <div className="job-post-form-area">
                                    <form action="">
                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Event Title<span className='form-required'>*</span></label>
                                                    <input type="text" className='job-post-form-input'
                                                        name='eventTitle'
                                                        id='eventTitle'
                                                        placeholder='Enter the event title...' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Description</label>
                                                    <textarea rows="5" className='job-post-form-input'
                                                        name='eventDescription'
                                                        placeholder='Enter the event description...' id="event-description"
                                                        required></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12 col-md-6 col-xl-8">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Location<span className='form-required'>*</span></label>
                                                    <input type="text" className='job-post-form-input'
                                                        name='location'
                                                        id='location'
                                                        placeholder='Enter the event location...' />
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6 col-xl-4 m-t-35 mt-md-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Date<span className='form-required'>*</span></label>
                                                    {/* <input type="date" className='job-post-form-input'
                                                        name='eventTitle'
                                                        id='eventTitle'
                                                        placeholder='Enter the event title...' /> */}
                                                    <div>
                                                        <DatePicker
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText='dd/mm/yyyy'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Event Image</label>
                                                    <div className="custom-file ats">
                                                        <input type="file" className="custom-file-input ats" id="customFile" name="filename" />
                                                        <label className="custom-file-label ats" for="customFile">Choose file...</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="post-job-btn-area">
                                <button className='post-job-btn' onClick={showSuccessMessage}>Post</button>
                                <a href='#' className='post-job-btn yellow'>
                                    Posted Events
                                    <i class="bi bi-box-arrow-up-right ml-3"></i>
                                </a>
                            </div>
                        </div>
                    </section>
                </div >
                <Footer />
            </div >
        </div >
    )
}

export default EventPosting