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
                                                <div className="dash-job-det-card-status">
                                                    Posted :&nbsp;<span>days ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
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