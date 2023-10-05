import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './EventDetails.css';
import './EventDetails-responsive.css';
import { CandidateFooter } from '../../components/CandidateFooter';
import LayoutNew from '../../components/LayoutNew';

const CandidateTestimonialDetail = () => {
    useEffect(() => {

    }, []);

    return (
        <>
            <LayoutNew />
            <div className='testimonial-detail-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="custom--container">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/candidate-home">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <a className='sub--bredcrumb-link' href="/events">Event</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Event Detail</p>
                                </div>
                            </div>

                            <div className="event--detail-content-section">
                                <div className="event--detail-img-area">
                                    <img src="assets/img/events/event-img.jpg" data-aos="fade" className='event--detail-img' alt="" />
                                </div>
                                <div className="event--detail-lable-area">
                                    <span className='event--detail-lable' data-aos="fade-left">Webinar</span>
                                </div>
                                <div className='event--detail-top-area'>
                                    <div className="event--detail-title-area" data-aos="fade-right">
                                        <h4 className='event--detail-title'>Transition your career with AI Advancement</h4>
                                    </div>
                                    <div className="event--detail-sub-cont-area" data-aos="fade-left">
                                        <div className="event--detail-location-area">
                                            <i className='bx bxs-map'></i>
                                            <span className='event--detail-sub-cont'>Remote</span>
                                        </div>
                                        <div className='event--detail-sub-cont'>Date of the Event</div>
                                        <div className='event--detail-date'>02-10-2023</div>
                                    </div>
                                </div>
                                <div className='event--detail-desc-area'>
                                    <p className='event--detail-desc' data-aos="fade">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                </div>
                                <div className='event--detail-btn-area'>
                                    <a href="#" className='ser--cont-btn-sub candidate' data-aos="fade-right">
                                        <div className='ser--cont-btn candidate pe-lg-5 ps-lg-5'>
                                            Book an event
                                        </div>
                                        <div className='ser--cont-arrow-area candidate'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                                <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tal--pro-slider-btn-area" data-aos="fade-up">
                        <div className='tal--pro-slider-btn-sub'>
                            <button className="tal--pro-slider-btn">
                                <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                    <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                </svg>
                            </button>
                            <button className="tal--pro-slider-btn">
                                <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                    <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <CandidateFooter />
        </>
    )
}
export default CandidateTestimonialDetail;