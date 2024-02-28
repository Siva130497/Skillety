import React, { useState, useEffect, useRef } from 'react';
import ATSLayout from '../../../components/ATSLayout';
import Footer from '../../../components/Footer';
import '../CustomizeWebsite.css';

const EditEmployerServices = () => {

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className='customize-website-nav'>
                                <h6 className='customize-website-nav-title'>Employer</h6>
                                <div className='customize-website-nav-links'>
                                    <a href="/edit-employer-home" className='btn cus-web-nav-link'><i class="bi bi-house-fill"></i>Home</a>
                                    <a href="/edit-employer-about" className='btn cus-web-nav-link'><i class="bi bi-person-vcard-fill"></i>About Us</a>
                                    <a href="/edit-employer-service" className='btn cus-web-nav-link active'><i class="bi bi-gear-wide-connected"></i>Services</a>
                                    <a href="/edit-employer-contact" className='btn cus-web-nav-link'><i class="bi bi-telephone-fill"></i>Contact Us</a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-3">
                                    <div className='admin-lg-table-area man-app p-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                Banner
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputTitle" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputTitle" placeholder="Enter title here..." />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-5">
                                    <div className='admin-lg-table-area man-app p-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                Services
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputParagraph" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputParagraph" placeholder="Enter paragraph here..."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'>Save Changes</button>
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

export default EditEmployerServices
