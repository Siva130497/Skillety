import React from 'react';
import { useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import './ManageApplication.css';
import './ManageApplication-responsive.css';
import $ from 'jquery';

const ManageApplication = () => {

    useEffect(() => {
        $(document).ready(function () {
        });

    }, []);

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ClientLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Application
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className="table-responsive admin-lg-table-area man-app">
                                            <div className='man-app-title-area'>
                                                <div className="man-app-title">
                                                    Job Name : <span>UI/UX Designer</span>
                                                </div>
                                                <div className="man-app-sub-title">
                                                    Date Posted : <span>20th July 2023</span>
                                                </div>
                                            </div>
                                            <table className="table table-striped table-hover admin-lg-table">
                                                <tr className='dash-table-row man-app'>
                                                    <th className='dash-table-head text-center'>Application Id</th>
                                                    <th className='dash-table-head text-center'>Name of the Candidates</th>
                                                    <th className='dash-table-head text-center'>Date Applied</th>
                                                    <th className='dash-table-head text-center'>Location</th>
                                                    <th className='dash-table-head text-center'>Status</th>
                                                    <th className='text-center'>View CV</th>
                                                </tr>

                                                {/* table data */}
                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-info'>Ongoing</button>
                                                        {/* <button className='man-job-status-btn theme-warning'>Resumed</button><br /> */}
                                                        {/* <button className='man-job-status-btn theme-success'>Completed</button><br /> */}
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-warning'>Resumed</button>
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-success'>Completed</button>
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-info'>Ongoing</button>
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-warning'>Resumed</button>
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-success'>Completed</button>
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

                                        <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View old applications&nbsp;&nbsp;
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

                            <div className="row mt-3">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className="table-responsive admin-lg-table-area man-app">
                                            <div className='man-app-title-area'>
                                                <div className="man-app-title">
                                                    Job Name : <span>Frontend Developer</span>
                                                </div>
                                                <div className="man-app-sub-title">
                                                    Date Posted : <span>20th July 2023</span>
                                                </div>
                                            </div>
                                            <table className="table table-striped table-hover admin-lg-table">
                                                <tr className='dash-table-row man-app'>
                                                    <th className='dash-table-head text-center'>Application Id</th>
                                                    <th className='dash-table-head text-center'>Name of the Candidates</th>
                                                    <th className='dash-table-head text-center'>Date Applied</th>
                                                    <th className='dash-table-head text-center'>Location</th>
                                                    <th className='dash-table-head text-center'>Status</th>
                                                    <th className='text-center'>View CV</th>
                                                </tr>

                                                {/* table data */}
                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-info'>Ongoing</button>
                                                        {/* <button className='man-job-status-btn theme-warning'>Resumed</button><br /> */}
                                                        {/* <button className='man-job-status-btn theme-success'>Completed</button><br /> */}
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-warning'>Resumed</button>
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-success'>Completed</button>
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-info'>Ongoing</button>
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-warning'>Resumed</button>
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

                                                <tr className='dash-table-row client'>
                                                    <td className='dash-table-data1 text-center'>258</td>
                                                    <td className='dash-table-data1 text-center'>
                                                        Ankit Dubey
                                                    </td>
                                                    <td className='dash-table-data1 text-center'>
                                                        03 Aug’ 23
                                                    </td>

                                                    <td className='dash-table-data1 text-center'>
                                                        Lorem Ipsum
                                                    </td>

                                                    <td className='text-center'>
                                                        <button className='man-job-status-btn theme-success'>Completed</button>
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

                                        <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View old applications&nbsp;&nbsp;
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

                <Footer />
            </div >
        </div >
    )
}

export default ManageApplication