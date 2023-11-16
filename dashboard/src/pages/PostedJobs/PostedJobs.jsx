import React from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './PostedJobs.css';
import $ from 'jquery';

const PostedJobs = () => {

    useEffect(() => {
        $(document).ready(function () {
        });

    }, []);

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Posted Jobs
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className='admin-lg-table-area man-app'>

                                            <div className='man-app-title-area candidate'>
                                                <div>
                                                    <div className="man-app-title">
                                                        Posted Jobs Details
                                                    </div>
                                                    <div className="man-app-sub-title">
                                                        Total Jobs :&nbsp;
                                                        <span>02</span>
                                                    </div>
                                                </div>
                                                <div className="recruiter-search-input-area">
                                                    <input type="text" className='recruiter-search-input' placeholder='Search job role...' />
                                                    <i className='bi bi-search search-icon'></i>
                                                    <button className='recruiter-search-btn'>Search</button>
                                                </div>

                                            </div>
                                            <div className="rec-work-mode-area">
                                                <label className="recruite-form-check-input">
                                                    <input type="checkbox" />
                                                    <span className="recruite-form-checkmark"></span>
                                                    Full Time
                                                </label>

                                                <label className="recruite-form-check-input">
                                                    <input type="checkbox" />
                                                    <span className="recruite-form-checkmark"></span>
                                                    Part Time
                                                </label>

                                                <label className="recruite-form-check-input">
                                                    <input type="checkbox" />
                                                    <span className="recruite-form-checkmark"></span>
                                                    Remote
                                                </label>

                                                <label className="recruite-form-check-input">
                                                    <input type="checkbox" />
                                                    <span className="recruite-form-checkmark"></span>
                                                    Freelancer
                                                </label>
                                            </div>

                                            <div className="table-responsive table-scroll-area">
                                                <table className="table table-striped table-hover admin-lg-table">
                                                    <tr className='dash-table-row man-app'>
                                                        <th className='dash-table-head'>No.</th>
                                                        <th className='dash-table-head'>Job Role</th>
                                                        <th className='dash-table-head'>Job Category</th>
                                                        <th className='text-center'>View</th>
                                                    </tr>

                                                    {/* table data */}
                                                    <tr className='dash-table-row client'>
                                                        <td className='dash-table-data1'>01.</td>
                                                        <td className='dash-table-data1'>
                                                            Mern Stack developer
                                                        </td>
                                                        <td className='dash-table-data1'>
                                                            Full Time
                                                        </td>

                                                        <td className='text-center'>
                                                            <button className='application-btn' data-toggle="modal" title='View Candidate Details...' data-target="#invoiceModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                                                                        fill='#0879bc' />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                </table>
                                            </div>
                                        </div>

                                        <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View More&nbsp;&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17157 0.464466C8.97631 0.269204 8.65973 0.269204 8.46447 0.464466C8.2692 0.659728 8.2692 0.976311 8.46447 1.17157L11.2929 4L8.46447 6.82843C8.2692 7.02369 8.2692 7.34027 8.46447 7.53553C8.65973 7.7308 8.97631 7.7308 9.17157 7.53553L12.3536 4.35355ZM0 4.5L12 4.5V3.5L0 3.5L0 4.5Z" fill="#0F75C5" />
                                                </svg>
                                            </a>
                                        </div>
                                        <div className="table-pagination-area pt-3">
                                            <div className="pagination-btn-area">
                                                <button className='pag-prev-btn'>
                                                    <i class="bi bi-chevron-left"></i>
                                                </button>
                                                <div className='pag-page'>
                                                    <span className='current-page'>1</span>&nbsp;/&nbsp;
                                                    <span className='total-page'>7</span>
                                                </div>
                                                <button className='pag-next-btn'>
                                                    <i class="bi bi-chevron-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Invoice view modal here */}
                <div className="modal fade" id="invoiceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title candidate" id="exampleModalLabel">
                                    Job Details_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-view-card candidate">
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Job Role</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">Mern Stack developer</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Job Category</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">Full time</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Job Mandatory Skills</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="cand-skills-area">
                                                <span className='cand-skill'>Javascript</span>
                                                <span className='cand-skill'>Mongodb</span>
                                                <span className='cand-skill'>Express Js</span>
                                                <span className='cand-skill'>React</span>
                                                <span className='cand-skill'>Node Js</span>
                                                <span className='cand-skill'>Git</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Needed Experience</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <span>0</span>
                                                &nbsp;years and&nbsp;
                                                <span>6</span>
                                                &nbsp;months
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Job Description</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">work as full stack developer for making dynamic web applications</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                <button type="button" className="btn close-modal-btn" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div >
        </div >
    )
}

export default PostedJobs