import React, { useState, useEffect, useRef } from 'react';
import ATSLayout from '../../../components/ATSLayout';
import Footer from '../../../components/Footer';
import '../CustomizeWebsite.css';

const EditEmployerHome = () => {

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
                                    <a href="/edit-employer-home" className='btn cus-web-nav-link active'><i class="bi bi-house-fill"></i>Home</a>
                                    <a href="/edit-employer-about" className='btn cus-web-nav-link'><i class="bi bi-person-vcard-fill"></i>About Us</a>
                                    <a href="/edit-employer-service" className='btn cus-web-nav-link'><i class="bi bi-gear-wide-connected"></i>Services</a>
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
                                                Welcome Banner
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
                                                About Us
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputAboutParagraph" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputAboutParagraph" placeholder="Enter paragraph here..."></textarea>
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
                                                <label for="inputServicesParagraph" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputServicesParagraph" placeholder="Enter paragraph here..."></textarea>
                                                </div>
                                            </div>
                                            <div className="cus-web-service-section">
                                                <h6>Service 1</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices1Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices1Title" placeholder="Enter service title here..." />
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices1Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices1Content" placeholder="Enter service content here..."></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cus-web-service-section">
                                                <h6>Service 2</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices2Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices2Title" placeholder="Enter service title here..." />
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices2Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices2Content" placeholder="Enter service content here..."></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cus-web-service-section">
                                                <h6>Service 3</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices3Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices3Title" placeholder="Enter service title here..." />
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices3Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices3Content" placeholder="Enter service content here..."></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cus-web-service-section">
                                                <h6>Service 4</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices4Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices4Title" placeholder="Enter service title here..." />
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices4Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices4Content" placeholder="Enter service content here..."></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cus-web-service-section">
                                                <h6>Service 5</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices5Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices5Title" placeholder="Enter service title here..." />
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices5Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices5Content" placeholder="Enter service content here..."></textarea>
                                                    </div>
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
                                            <div class="form-group row">
                                                <label for="milestone6" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 6</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone6" placeholder="Enter milestone title here..." />
                                                    <input type="text" class="form-control dash-form-input" id="milestone6" placeholder="Enter milestone count here..." />
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
                                                Clients
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputLogo" class="col-sm-3 col-form-label cus-web-form-lable">Client's Logos</label>
                                                <div class="col-sm-9">
                                                    <input type="file" multiple class="form-control dash-form-input" id="inputLogo" />
                                                    <div className='text-secondary mt-2'>Recommended Format - .png</div>
                                                    <div className='text-secondary mt-2'>Recommended Resolution - W x H : 300px x 180px</div>
                                                </div>
                                            </div>

                                            <div className="cus-web-clients-logo-section">
                                                <div className="row">
                                                    <div className="col-6 col-lg-2 col-md-4">
                                                        <div className="cus-web-clients-logo-area">
                                                            <div className="logo-area-cover">
                                                                <img src="./assets/img/clients/client-1.png" alt="" />
                                                            </div>
                                                            <button className='btn logo-dlt-btn'><i class="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 col-lg-2 col-md-4">
                                                        <div className="cus-web-clients-logo-area">
                                                            <div className="logo-area-cover">
                                                                <img src="./assets/img/clients/client-3.png" alt="" />
                                                            </div>
                                                            <button className='btn logo-dlt-btn'><i class="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 col-lg-2 col-md-4">
                                                        <div className="cus-web-clients-logo-area">
                                                            <div className="logo-area-cover">
                                                                <img src="./assets/img/clients/client-2.png" alt="" />
                                                            </div>
                                                            <button className='btn logo-dlt-btn'><i class="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 col-lg-2 col-md-4">
                                                        <div className="cus-web-clients-logo-area">
                                                            <div className="logo-area-cover">
                                                                <img src="./assets/img/clients/client-3.png" alt="" />
                                                            </div>
                                                            <button className='btn logo-dlt-btn'><i class="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 col-lg-2 col-md-4">
                                                        <div className="cus-web-clients-logo-area">
                                                            <div className="logo-area-cover">
                                                                <img src="./assets/img/clients/client-1.png" alt="" />
                                                            </div>
                                                            <button className='btn logo-dlt-btn'><i class="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 col-lg-2 col-md-4">
                                                        <div className="cus-web-clients-logo-area">
                                                            <div className="logo-area-cover">
                                                                <img src="./assets/img/clients/client-3.png" alt="" />
                                                            </div>
                                                            <button className='btn logo-dlt-btn'><i class="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 col-lg-2 col-md-4">
                                                        <div className="cus-web-clients-logo-area">
                                                            <div className="logo-area-cover">
                                                                <img src="./assets/img/clients/client-2.png" alt="" />
                                                            </div>
                                                            <button className='btn logo-dlt-btn'><i class="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-6 col-lg-2 col-md-4">
                                                        <div className="cus-web-clients-logo-area">
                                                            <div className="logo-area-cover">
                                                                <img src="./assets/img/clients/client-3.png" alt="" />
                                                            </div>
                                                            <button className='btn logo-dlt-btn'><i class="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>
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

export default EditEmployerHome
