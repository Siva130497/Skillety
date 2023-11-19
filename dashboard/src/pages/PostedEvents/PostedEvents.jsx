import React from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './PostedEvents.css';
import $ from 'jquery';

const PostedEvents = () => {

    useEffect(() => {
        $(document).ready(function () {
            // Open modal when the button is clicked
            $(".event-image-view-btn").on("click", function () {
                $("#imageModal").css("display", "flex");
                $("#modalImage").attr("src", $(".event-image").attr("src"));
            });

            // Close modal when the close button is clicked
            $(".image-view-close").on("click", function () {
                $("#imageModal").css("display", "none");
            });

            // Close modal when clicking outside the modal content
            $(window).on("click", function (event) {
                if (event.target == $("#imageModal")[0]) {
                    $("#imageModal").css("display", "none");
                }
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
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Posted Events
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className='admin-lg-table-area man-app'>

                                            <div className='man-app-title-area candidate'>
                                                <div>
                                                    <div className="man-app-title">
                                                        Posted Events Details
                                                    </div>
                                                    <div className="man-app-sub-title">
                                                        Total Events :&nbsp;
                                                        <span>02</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="table-responsive table-scroll-area">
                                                <table className="table table-striped table-hover admin-lg-table">
                                                    <tr className='dash-table-row man-app'>
                                                        <th className='dash-table-head'>No.</th>
                                                        <th className='dash-table-head'>Event Title</th>
                                                        <th className='dash-table-head'>Date</th>
                                                        <th className='text-center'>Action</th>
                                                    </tr>

                                                    {/* table data */}
                                                    <tr className='dash-table-row client'>
                                                        <td className='dash-table-data1'>01.</td>
                                                        <td className='dash-table-data1'>
                                                            Google Pixel 20 Launch
                                                        </td>
                                                        <td className='dash-table-data1'>
                                                            1999.12.26
                                                        </td>

                                                        <td className='text-center'>
                                                            <div className="action-btn-area">
                                                                <a href='#' className='job-edit-btn' title='Edit event details...'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                    </svg>
                                                                </a>

                                                                <button className='job-view-btn' data-toggle="modal" title='View event details...' data-target="#eventviewModal">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                                                                        />
                                                                    </svg>
                                                                </button>

                                                                <button className='job-delete-btn' data-toggle="modal" title='Delete event data...' data-target="#eventdeleteModal">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
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

                {/* Event view modal here */}
                <div className="modal fade" id="eventviewModal" tabindex="-1" role="dialog" aria-labelledby="eventViewLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client" id="eventViewLabel">
                                    Event Details_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-view-card candidate">
                                    <div className="event-image-area">
                                        <div className="event-image-sub-area">
                                            <div className="event-image-view-area">
                                                <button className='event-image-view-btn' title='Click to view full size image...'>
                                                    <i class="bi bi-fullscreen img-view-icon"></i>
                                                </button>
                                            </div>
                                            <img src="../assets/img/events/event-img.jpg" className='event-image' alt="" />
                                        </div>
                                        <div id="imageModal" className="image-view-modal">
                                            <span className="image-view-close">
                                                <i class="bi bi-x"></i>
                                            </span>
                                            <img className="image-view-modal-content" id="modalImage" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Event Title</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head">Google Pixel 20 Launch</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Location</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head">Vannarpannai</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Date</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head">1999.12.26</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Description</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
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

                {/* Event delete modal here */}
                <div className="modal fade" id="eventdeleteModal" tabindex="-1" role="dialog" aria-labelledby="eventDeleteLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content recruiter-delete-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title delete" id="eventDeleteLabel">
                                    Warning..!
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-delete-card">
                                    <div className="recruiter-delete-data-area">
                                        <img src="../assets/img/no-data/warning.png" className='recruiter-delete-img' alt="" />
                                        <div className='recruiter-delete-text'>
                                        Are you sure you want to delete this event's data?<br />
                                            <b>You can't undo..!</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                <button type="button" className="btn modal-btn danger">Yes</button>
                                <button type="button" className="btn modal-btn success" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div >
        </div >
    )
}

export default PostedEvents