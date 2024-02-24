import React, { useContext, useState, useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BookedEvents = () => {

    const [loading, setLoading] = useState(true);

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className='d-flex align-items-end justify-content-between pt-4'>
                                <div className="admin-component-name pt-0">
                                    Booked Events
                                </div>
                            </div>

                            {!loading ? (
                                <div className="table-skeleton-area">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-data-skeleton-area">
                                                <div className="custom-flex-area">
                                                    <div>
                                                        <div className='pt-3'>
                                                            <Skeleton height={25} width={250} />
                                                        </div>
                                                        <div className='pt-3'>
                                                            <Skeleton height={15} width={120} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="table-responsive table-scroll-area mt-4 skeleton-table">
                                                    <div className="table skeleton-table table-striped table-hover admin-lg-table">
                                                        <tr className="skeleton-table-row">
                                                            <th className='w-5'>
                                                                <Skeleton height={18} width={30} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-20'>
                                                                <Skeleton height={18} width={80} />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Skeleton height={18} width={30} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={80} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Skeleton height={18} width={30} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={80} />
                                                            </td>
                                                        </tr>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="admin-lg-table-section">
                                            <div className='admin-lg-table-area man-app'>
                                                <div className='man-app-title-area candidate'>
                                                    <div>
                                                        <div className="man-app-title">
                                                            Booked Events
                                                        </div>
                                                        <div className="man-app-sub-title">
                                                            Total Booked Events :&nbsp;
                                                            <span>10</span>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                                    <div className="no-data-created-area">
                                                        <div className='no-data-created'>
                                                            <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                            <div className='no-data-text'>No Client Created Yet..!</div>
                                                        </div>
                                                    </div>


                                                    <div className="table-responsive table-scroll-area">
                                                        <table className="table table-striped table-hover admin-lg-table">
                                                            <tr className='dash-table-row man-app'>
                                                                <th className='dash-table-head'>No.</th>
                                                                <th className='dash-table-head'>Event</th>
                                                                <th className='dash-table-head'>Name</th>
                                                                <th className='dash-table-head'>Date</th>
                                                                <th className='dash-table-head text-center'>View</th>
                                                            </tr>

                                                            {/* table data */}
                                                            <tr className='dash-table-row client'>
                                                                <td className='dash-table-data1'>1.</td>
                                                                <td className='dash-table-data1 text-capitalized'>
                                                                    Launch Event
                                                                </td>
                                                                <td className='dash-table-data1 text-capitalized'>
                                                                    Test
                                                                </td>
                                                                <td className='dash-table-data1 text-capitalized'>
                                                                    11-04-2024
                                                                </td>
                                                                <td className='text-center'>
                                                                    <div className="action-btn-area">
                                                                        <button className='job-view-btn' title='View Event Booking Details...' data-toggle="modal" data-target="#eventBookingViewModal">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                            </div>

                                            {/* <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View More&nbsp;&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17157 0.464466C8.97631 0.269204 8.65973 0.269204 8.46447 0.464466C8.2692 0.659728 8.2692 0.976311 8.46447 1.17157L11.2929 4L8.46447 6.82843C8.2692 7.02369 8.2692 7.34027 8.46447 7.53553C8.65973 7.7308 8.97631 7.7308 9.17157 7.53553L12.3536 4.35355ZM0 4.5L12 4.5V3.5L0 3.5L0 4.5Z" fill="#0F75C5" />
                                                </svg>
                                            </a>
                                        </div> */}
                                            <div className="table-pagination-area pt-3">
                                                <div className="pagination-btn-area">
                                                    <button className='pag-prev-btn'>
                                                        <i class="bi bi-chevron-left"></i>
                                                    </button>
                                                    <div className='pag-page'>
                                                        <span className='current-page'>1</span>&nbsp;/&nbsp;
                                                        <span className='total-page'>1</span>
                                                    </div>
                                                    <button className='pag-next-btn'>
                                                        <i class="bi bi-chevron-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </section>
                </div>

                {/* Clients details view modal here */}
                <div className="modal fade" id="eventBookingViewModal" tabindex="-1" role="dialog" aria-labelledby="eventBookingViewModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client" id="eventBookingViewModalLabel">
                                    Booking Details_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-view-card">
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Event</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">Launch Event</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Date</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">11-04-2024</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Name</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">Test</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Phone Number</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <a href="##"
                                                    className='view-det-sub-head link is-link'>
                                                    000000000000
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Email ID</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <a href="##"
                                                    className='view-det-sub-head link is-link'>
                                                    test@gmail.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />                                    
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Note</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">Note</div>
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
                {/*  */}

                <Footer />
            </div >
        </div >
    )
}

export default BookedEvents