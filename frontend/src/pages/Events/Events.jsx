import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './Events.css';
import './Events-responsive.css';
import { CandidateFooter } from '../../components/CandidateFooter';
import LayoutNew from '../../components/LayoutNew';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import EventPosting from '../../components/EventPosting';

const Events = ({staffToken}) => {
    const {eventDetail, getEventDetail, getEventImg, eventImg} = useContext(AuthContext);
    const [editingEventId, setEditingEventId] = useState("");
    
    useEffect(() => {
        getEventDetail();
        getEventImg();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://skillety.onrender.com/events/${id}`, {
            headers: {
                Authorization: `Bearer ${staffToken}`,
                Accept: 'application/json'
            }
          })
        .then(res=>{
                console.log(res.data);
                getEventDetail();
            }
          )
        .catch(err=>console.log(err));
        
        axios.delete(`https://skillety.onrender.com/event-image-delete/${id}`, {
            headers: {
                Authorization: `Bearer ${staffToken}`,
                Accept: 'application/json'
            }
          })
        .then(response => {
            console.log(response.data);
            getEventImg();
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleEdit = (id) => {
        console.log(id);
        setEditingEventId(id);
    }
    
    return (
        <>
            {editingEventId ? <EventPosting editingEventId={editingEventId} staffToken={staffToken}/> :
            <>
                {!staffToken && <LayoutNew events={true}/>}
                <>
                    <div className='container-fluid contact--section'>
                        <div className='container-fluid container-section'>
                            {!staffToken && <div className="about--bg candidate">
                                <div className="row">
                                    <div className="col-12 col-xl-8 col-lg-12 col-md-12 about--left-cover">
                                        <div className="breadcrumb--area candidate" data-aos="fade-down">
                                            <div className="breadcrumb--item">
                                                <a href="/candidate-home">Home</a>
                                            </div>
                                            <div className="breadcrumb--item">
                                                <p>Events</p>
                                            </div>
                                        </div>
                                        <div className="about--head candidate">
                                            <h2 data-aos="fade-left">Webinars, Job Fairs, Walk-in Interviews, etc.</h2>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xl-4 col-lg-6 offset-lg-6 offset-xl-0 col-md-12 about--right-cover">
                                        <div className="about--card-area">
                                            <div className="card about--card candidate" data-aos="fade-right">
                                                <div className="card--imgicon-area">
                                                    <h6 className='card--text candidate'>I am an immediate joiner</h6>
                                                    <img src="assets/img/home-images/clipboard-img.png" className='card--icon candidate' alt="" />
                                                </div>
                                                <div className="about--sub-des">
                                                    <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </p>
                                                </div>
                                                <a href='' className="arrow--icon-btn candidate">
                                                    <img src="assets/img/home-images/arrow-dark.png" className='arrow--icon' alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            <div className='con--where-section'>
                                {!staffToken && <div className="con--where-container">
                                    <div className="cand--event-para-section">
                                        <p className='cand--event-para' data-aos="fade">
                                            Welcome to the Skillety Events Hub, your gateway to a world of dynamic experiences. Our Events section is a vibrant tapestry of opportunities designed to enrich your personal and professional journey.
                                        </p>
                                        <p className='cand--event-para' data-aos="fade">
                                            Discover a diverse array of events, from insightful webinars that delve into cutting-edge trends to walk-in interviews that could be your gateway to a new career. Explore job fairs teeming with exciting prospects and network with industry leaders who inspire innovation.
                                        </p>
                                        <p className='cand--event-para' data-aos="fade">
                                            At Skillety, we believe in the transformative power of events. They're not just gatherings; they're invaluable platforms for learning, networking, and growth. Whether you're a job seeker looking for your next big opportunity or an industry expert seeking to expand your horizons, our events cater to all.
                                        </p>
                                        <p className='cand--event-para' data-aos="fade">
                                            Stay connected with our event calendar to be part of this vibrant community of knowledge seekers and opportunity creators. Join us in embracing the future, one event at a time. Welcome to Skillety Events - where possibilities unfold.
                                        </p>
                                    </div>
                                </div>}
                                {!staffToken && <div className="cand--event-login-card">
                                    <div className='company-demo-card'>
                                        <div className="company-demo-card-desc-area">
                                            <p className='company-demo-card-desc' data-aos="fade-left">Contact</p>
                                        </div>
                                        <div className="company-demo-card-bottom-area">
                                            <h3 className='company-demo-card-title' data-aos="fade-down">LET’S GET STARTED <br />
                                                WITH US. ONE CLICK AWAY</h3>

                                            <div className="company-demo-card-btn-area">
                                                <a href="/candidate-login" className='company-demo-card-btn' data-aos="fade-right">
                                                    <div className='company-demo-card-btn-sub'>
                                                        Login
                                                    </div>
                                                    <div className='company-demo-card-btn-arrow'>
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
                                </div>}
                                <div className="con--where-container">
                                {eventDetail.length > 0  && 
                                    <div className="cand--events-card-section">
                                        {Array.from({ length: Math.ceil(eventDetail.length / 3) }).map((_, index) => (
                                            <div className="row" key={index}>
                                                {/* {eventDetail.slice(index * 3, (index + 1) * 3).map((eve) => (
                                                    <div key={eve.id} className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-10 offset-sm-1 offset-md-0 offset-lg-0 offset-xl-0 cand--events-card-area" data-aos="fade-up">
                                                        <article className='cand--events-card'>
                                                            
                                                                    <div className="cand--events-card-img-area">
                                                                        <img src="assets/img/events/event-img.jpg" className='cand--events-card-img' alt="" />
                                                                    </div>
                                                                    <div className="cand--events-card-title-area">
                                                                        <h6 className='cand--events-card-title'>
                                                                            {eve.title}
                                                                        </h6>
                                                                    </div>
                                                                    <p className='cand--events-card-date'>{eve.date}</p>
                                                                    <a href={`/event-details/${eve.id}`} className="cand--events-card-bottom-area">
                                                                        <span className='cand--event-sys'>SAVE YOUR SPOT</span>
                                                                        <span className='cand--events-card-arrow-area'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                                                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                                                                <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                                                            </svg>
                                                                        </span>
                                                                    </a>
                                                                </article>
                                                    </div>
                                                ))} */}
                                                {eventDetail.slice(index * 3, (index + 1) * 3).map((eve) => {
                                                    const matchingImg = eventImg ? eventImg.find(img => img.id === eve.id) : null;
                                                    const imgSrc = matchingImg ? `https://skillety.onrender.com/images/${matchingImg.image}` : "assets/img/events/event-img.jpg";

                                                    return (
                                                        <div key={eve.id} className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-10 offset-sm-1 offset-md-0 offset-lg-0 offset-xl-0 cand--events-card-area" data-aos="fade-up">
                                                            <article className='cand--events-card'>
                                                                <div className="cand--events-card-img-area">
                                                                    <img src={imgSrc} className='cand--events-card-img' alt="" />
                                                                </div>
                                                                <div className="cand--events-card-title-area">
                                                                    <h6 className='cand--events-card-title'>
                                                                        {eve.title}
                                                                    </h6>
                                                                </div>
                                                                <p className='cand--events-card-date'>{eve.date}</p>
                                                                <a href={`/event-details/${eve.id}`} className="cand--events-card-bottom-area">
                                                                    <span className='cand--event-sys'>SAVE YOUR SPOT</span>
                                                                    <span className='cand--events-card-arrow-area'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                                            <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" strokeWidth="2" />
                                                                            <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" strokeWidth="2" />
                                                                            <path d="M1 26L25.1667 1" stroke="#714F36" strokeWidth="2" />
                                                                        </svg>
                                                                    </span>
                                                                </a>
                                                                {staffToken && 
                                                                    <div>
                                                                        <button type="button" className="btn btn-danger" onClick={()=>handleDelete(eve.id)}>Delete</button>
                                                                        <button type="button" className="btn btn-outline-info" onClick={()=>handleEdit(eve.id)}>Edit</button>
                                                                    </div>
                                                                    
                                                                }
                                                            </article>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                {!staffToken && <CandidateFooter />}
            </>
            }
        </>
        


    )
}
export default Events;