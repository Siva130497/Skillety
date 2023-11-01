import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './EventDetails.css';
import './EventDetails-responsive.css';
import { CandidateFooter } from '../../components/CandidateFooter';
import LayoutNew from '../../components/LayoutNew';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const CandidateTestimonialDetail = () => {
    const {id} = useParams();
    
    const {eventDetail, getEventDetail, getEventImg, eventImg} = useContext(AuthContext);
    const [event, setEvent] = useState([]);
    const [image, setImage] = useState("");
    const [status, setStatus] = useState(false);
    

    useEffect(() => {
        getEventDetail();
        getEventImg();
    }, []); 
    
    useEffect(() => {
        if (eventDetail.length > 0) {
            const foundEvent = eventDetail.find(eve => eve.id === id);
            if (foundEvent) {
                setEvent(foundEvent);
    
                const matchingImg = eventImg ? eventImg.find(img => img.id === foundEvent.id) : null;
    
                if (matchingImg) {
                    setImage(`https://skillety.onrender.com/images/${matchingImg.image}`);
                } else {
                    setImage("assets/img/events/event-img.jpg");
                }
    
                setStatus(true);
            } else {
                setStatus(false);
            }
        } else {
            setStatus(false);
        }
    }, [eventDetail, eventImg, id]);
    

    return (

        <div>
            {status ?
                <div>
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
                                            <img src={image} data-aos="fade" className='event--detail-img' alt="" />
                                        </div>
                                        <div className="event--detail-lable-area">
                                            <span className='event--detail-lable' data-aos="fade-left">Webinar</span>
                                        </div>
                                        <div className='event--detail-top-area'>
                                            <div className="event--detail-title-area" data-aos="fade-right">
                                                <h4 className='event--detail-title'>{event.title}</h4>
                                            </div>
                                            <div className="event--detail-sub-cont-area" data-aos="fade-left">
                                                <div className="event--detail-location-area">
                                                    <i className='bx bxs-map'></i>
                                                    <span className='event--detail-sub-cont'>{event.location}</span>
                                                </div>
                                                <div className='event--detail-sub-cont'>Date of the Event</div>
                                                <div className='event--detail-date'>{event.date}</div>
                                            </div>
                                        </div>
                                        <div className='event--detail-desc-area'>
                                            <p className='event--detail-desc' data-aos="fade">{event.description}</p>
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
                </div> :
                <div>
                    <h1>404</h1>
                    <p>Not Found</p>
                    <small>The resource requested could not be found on this server!</small>
                </div>
             }
        </div>
        
    )
}
export default CandidateTestimonialDetail;