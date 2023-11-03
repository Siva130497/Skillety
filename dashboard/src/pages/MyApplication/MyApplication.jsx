import React from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import './MyApplication.css';
import './MyApplication-responsive.css';
import $ from 'jquery';

const MyApplication = () => {

    useEffect(() => {
        $(document).ready(function () {
            //for dashboard summary view
            $('.hidden-row').hide();

            $('.dash-num-count-more-btn').click(function () {
                $('.hidden-row').slideToggle('slow');
                $(this).hide();
            });

            //for tooltip
            $('[data-toggle="tooltip"]').tooltip();
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
                            <div className="top-nav-area">
                                <div className="current-page-name-area">
                                    <h4 className='current-page-name'>My Application</h4>
                                </div>

                                <div className="admin-search-area">
                                    <form action="">
                                        <div className="admin-search-input-area">
                                            <input type="text" placeholder='Search for Job/title/Keywords'
                                                className='admin-search-input' />
                                            <i class="bi bi-search"></i>
                                            <button className='dash-filter-btn'>
                                                <i class="bi bi-sliders"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="dash-num-count-section">
                                <div className="row">
                                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                        <div className="dash-num-count-area">
                                            <p className='dash-num-title'>Jobs Applied</p>
                                            <h4 className='dash-num-count'>14</h4>
                                        </div>
                                    </div>

                                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                        <div className="dash-num-count-area">
                                            <p className='dash-num-title'>Upcoming Interviews</p>
                                            <h4 className='dash-num-count'>04</h4>
                                        </div>
                                    </div>

                                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                        <div className="dash-num-count-area">
                                            <p className='dash-num-title'>New matched Jobs</p>
                                            <h4 className='dash-num-count'>08</h4>
                                        </div>
                                    </div>

                                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                        <div className="dash-num-count-area">
                                            <p className='dash-num-title'>New Notification</p>
                                            <h4 className='dash-num-count'>28</h4>
                                        </div>
                                    </div>
                                </div>

                                <button className="dash-num-count-more-btn" id="showHiddenRow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="8" viewBox="0 0 30 8" fill="none">
                                        <circle cx="4" cy="4" r="4" fill="#714F36" />
                                        <circle cx="15" cy="4" r="4" fill="#714F36" />
                                        <circle cx="26" cy="4" r="4" fill="#714F36" />
                                    </svg>
                                </button>

                                <div className='hidden-row'>
                                    <div className="through-line"></div>
                                    <div className="row">
                                        <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                            <div className="dash-num-count-area">
                                                <p className='dash-num-title'>Jobs Applied</p>
                                                <h4 className='dash-num-count'>14</h4>
                                            </div>
                                        </div>

                                        <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                            <div className="dash-num-count-area">
                                                <p className='dash-num-title'>Upcoming Interviews</p>
                                                <h4 className='dash-num-count'>04</h4>
                                            </div>
                                        </div>

                                        <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                            <div className="dash-num-count-area">
                                                <p className='dash-num-title'>New matched Jobs</p>
                                                <h4 className='dash-num-count'>08</h4>
                                            </div>
                                        </div>

                                        <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                            <div className="dash-num-count-area">
                                                <p className='dash-num-title'>New Notification</p>
                                                <h4 className='dash-num-count'>28</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="admin-component-name">
                                My Applications
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className="table-responsive admin-lg-table-area">
                                            <table className="table table-striped table-hover admin-lg-table">
                                                <tr className='dash-table-row head-row'>
                                                    <th className='dash-table-head'>COMPANY</th>
                                                    <th className='dash-table-head'>JOB TITLE</th>
                                                    <th className='dash-table-head'>APPLIED ON</th>
                                                    <th className='dash-table-head text-center'>APPLICATION STATUS</th>
                                                    <th className='dash-table-head text-center'>REVIEW <br /> APPLICATION</th>
                                                </tr>

                                                {/* table data */}
                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>Mindtree</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>Victous</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>Blueseas</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>PayPal</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>Microsoft</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>Google</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>Reddit</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>Apple</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>HP</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>Amazon</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>TATA</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className='dash-table-row custom'>
                                                    <td className='dash-table-data1'>Accenture</td>
                                                    <td className='dash-table-data1'>
                                                        UI/UX Designer Job &nbsp;&nbsp;
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M7.96815 3.39453H2C1.44771 3.39453 1 3.84225 1 4.39453V11.9951C1 12.5474 1.44772 12.9951 2 12.9951H10.8006C11.3529 12.9951 11.8006 12.5474 11.8006 11.9951V8.34966" stroke="#1394DF" stroke-linecap="round" />
                                                                <path d="M4.91191 9.40359C4.71604 9.59825 4.71507 9.91483 4.90972 10.1107C5.10438 10.3066 5.42096 10.3075 5.61683 10.1129L4.91191 9.40359ZM14.5778 1.0006C14.5786 0.724458 14.3555 0.49991 14.0793 0.499058L9.57935 0.485168C9.3032 0.484316 9.07866 0.707482 9.0778 0.983623C9.07695 1.25976 9.30012 1.48431 9.57626 1.48516L13.5762 1.49751L13.5639 5.49749C13.563 5.77363 13.7862 5.99818 14.0623 5.99903C14.3385 5.99988 14.563 5.77672 14.5639 5.50058L14.5778 1.0006ZM5.61683 10.1129L14.4302 1.3537L13.7253 0.644412L4.91191 9.40359L5.61683 10.1129Z" fill="#1394DF" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                    <td className='dash-table-data1'>03 Aug’ 23</td>
                                                    <td className='text-center application-status-data'>
                                                        <div className="application-status-area">
                                                            <div className="app-status-line"></div>

                                                            {/* for Screening */}
                                                            <div className="app-status-point point1 finished"></div>

                                                            {/* for Interview */}
                                                            <div className="app-status-point point2 active"></div>

                                                            {/* for Offer */}
                                                            <div className="app-status-point point3"></div>

                                                            {/* for Joining */}
                                                            <div className="app-status-point point4"></div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button className='application-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
                                                                    fill='#0879bc' />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>


                                            </table>
                                        </div>

                                        <div className="table-pagination-area">
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
                                        <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View old applications&nbsp;&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17157 0.464466C8.97631 0.269204 8.65973 0.269204 8.46447 0.464466C8.2692 0.659728 8.2692 0.976311 8.46447 1.17157L11.2929 4L8.46447 6.82843C8.2692 7.02369 8.2692 7.34027 8.46447 7.53553C8.65973 7.7308 8.97631 7.7308 9.17157 7.53553L12.3536 4.35355ZM0 4.5L12 4.5V3.5L0 3.5L0 4.5Z" fill="#0F75C5" />
                                                </svg>
                                            </a>
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

export default MyApplication