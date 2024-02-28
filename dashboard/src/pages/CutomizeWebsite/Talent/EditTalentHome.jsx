import React, { useState, useEffect, useRef } from 'react';
import ATSLayout from '../../../components/ATSLayout';
import Footer from '../../../components/Footer';
import '../CustomizeWebsite.css';

const EditTalentHome = () => {

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className='customize-website-nav'>
                                <h6 className='customize-website-nav-title'>Talent</h6>
                                <div className='customize-website-nav-links'>
                                    <a href="/edit-talent-home" className='btn cus-web-nav-link active'><i class="bi bi-house-fill"></i>Home</a>
                                    <a href="/edit-talent-about" className='btn cus-web-nav-link'><i class="bi bi-person-vcard-fill"></i>About Us</a>
                                    <a href="/edit-talent-contact" className='btn cus-web-nav-link'><i class="bi bi-telephone-fill"></i>Contact Us</a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-3">
                                    <div className='admin-lg-table-area man-app p-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                Welcome Banner
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputLogo" class="col-sm-3 col-form-label cus-web-form-lable">Logo</label>
                                                <div class="col-sm-9 logo-input-container">
                                                    <div>
                                                        <input type="file" class="form-control dash-form-input" id="inputLogo" />
                                                        <div className='text-secondary mt-2'>Recommended Format - .png</div>
                                                        <div className='text-secondary mt-2'>Recommended Resolution - W x H : 500px x 500px</div>
                                                    </div>
                                                    <div className='cus-web-logo-container'>
                                                        <img src="./assets/img/logo/skillety-logo.png" alt="" />
                                                        <button className='btn text-danger img-delete-button'><i class="bi bi-trash"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputTitle" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputTitle" placeholder="Enter title here..." />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputSubTitle" class="col-sm-3 col-form-label cus-web-form-lable">Sub Title</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputSubTitle" placeholder="Enter sub title here..." />
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
                                                Milestone Numbers
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputParagraph" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputParagraph" placeholder="Enter milestone paragraph here..."></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone1" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 1</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone1" placeholder="Enter milestone title here..." />
                                                    <input type="text" class="form-control dash-form-input" id="milestone1" placeholder="Enter milestone count here..." />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone2" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 2</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone2" placeholder="Enter milestone title here..." />
                                                    <input type="text" class="form-control dash-form-input" id="milestone2" placeholder="Enter milestone count here..." />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone3" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 3</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone3" placeholder="Enter milestone title here..." />
                                                    <input type="text" class="form-control dash-form-input" id="milestone3" placeholder="Enter milestone count here..." />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone4" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 4</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone4" placeholder="Enter milestone title here..." />
                                                    <input type="text" class="form-control dash-form-input" id="milestone4" placeholder="Enter milestone count here..." />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone5" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 5</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone5" placeholder="Enter milestone title here..." />
                                                    <input type="text" class="form-control dash-form-input" id="milestone5" placeholder="Enter milestone count here..." />
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

export default EditTalentHome
