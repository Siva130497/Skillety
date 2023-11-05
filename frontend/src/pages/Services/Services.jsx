import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './Services.css';
import './Services-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const Services = () => {
    useEffect(() => {

    }, []);

    return (
        <div>
            <Layout service={true} />
            <div>
                <div className='container-fluid services--section'>
                    <div className='container-fluid container-section'>
                        <div className="about--bg service-bg">
                            <div className="row">
                                <div className="col-12 col-xl-8 col-lg-12 col-md-12 about--left-cover">
                                    <div className="breadcrumb--area" data-aos="fade-down">
                                        <div className="breadcrumb--item">
                                            <a href="/">Home</a>
                                        </div>
                                        <div className="breadcrumb--item">
                                            <p>Services</p>
                                        </div>
                                    </div>
                                    <div className="services--head">
                                        <h2 data-aos="fade-left">Our primary mission is to provide our Clients  with ‘convenience’.</h2>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-4 col-lg-6 offset-lg-6 offset-xl-0 col-md-12 about--right-cover">
                                    <div className="about--card-area">
                                        <div className="card about--card" data-aos="fade-right">
                                            <div className="card--imgicon-area">
                                                <h6 className='card--text'>I want to hire an immediate joiner</h6>
                                                <img src="assets/img/home-images/icon-1.png" className='card--icon' alt="" />
                                            </div>
                                            <div className="about--sub-des">
                                                <p>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                </p>
                                            </div>
                                            <a href='' className="arrow--icon-btn">
                                                <img src="assets/img/home-images/arrow-dark.png" className='arrow--icon' alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="service-par">
                            <p>What makes us unique is that - Skillety is the world's first Digital-RPO platform, offering a comprehensive suite of diverse hiring solutions, including Sourcing, Screening, Assessments, Interviews, Verification, and Onboarding, all thoughtfully integrated into a single platform. We are powered by our exclusive Job-board for Immediate Joiners – guys who can Join within 7 days or less, reducing the TAT for a new hire by an impressive 30-50%. Our pay-as-you-go model offers our clients with a simple billing and performance evaluation process, focused solely on end results. As an end-to-end recruitment powerhouse, Skillety is your ideal RPO partner, dedicated to optimizing your recruitment journey.
                            </p>
                        </div>

                        <div className="ser--content-section">
                            <h3 className='ser--content-heading' data-aos="fade-left">CV Sourcing</h3>
                            <div className="ser--detail-area">
                                <div className="row custom-border-bottom custom-border-top">
                                    <div className="col-12 col-lg-7 col-md-12 custom-border-right ser--cont-img-area img--1" data-aos="fade" data-aos-delay="200">
                                        <div className="ser--cont-sub-img-area">
                                            {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-5 col-md-12 custom-padding-lr">
                                        <div className="ser--cont-area-right">
                                            <p className='ser--cont-title' data-aos="fade">
                                                Search for Candidates with any skill and experience, from any sector and location through seamless filter options. Search for Immediate Joiner CVs from 3 buckets - 7 days, 15 days & 30 days joiners.
                                            </p>
                                            <div className='ser--cont-list-area'>
                                                <ul>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="ser--cont-btn-area">
                                                <a href="#" className='ser--cont-btn-sub' data-aos="fade-left">
                                                    <div className='ser--cont-btn'>
                                                        Request a demo
                                                    </div>
                                                    <div className='ser--cont-arrow-area'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                            <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                            <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                            <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ser--content-section">
                            <h3 className='ser--content-heading' data-aos="fade-left">JOB POSTING</h3>
                            <div className="ser--detail-area">
                                <div className="row custom-border-bottom custom-border-top custom-column-reverse">
                                    <div className="col-12 col-lg-5 col-md-12 custom-padding-lr custom-border-right">
                                        <div className="ser--cont-area-left">
                                            <p className='ser--cont-title' data-aos="fade">
                                                Post multiple Jobs easily and publish it on 172 partner job-boards & social media platforms, in just one click. CVs would flow in from all sides into your Dashboard and Inbox.
                                            </p>
                                            <div className='ser--cont-list-area'>
                                                <ul>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="ser--cont-btn-area">
                                                <a href="#" className='ser--cont-btn-sub' data-aos="fade-left">
                                                    <div className='ser--cont-btn'>
                                                        Request a demo
                                                    </div>
                                                    <div className='ser--cont-arrow-area'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                            <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                            <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                            <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-7 col-md-12 ser--cont-img-area img--2" data-aos="fade" data-aos-delay="200">
                                        <div className="ser--cont-sub-img-area">
                                            {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ser--content-section">
                            <h3 className='ser--content-heading' data-aos="fade-left">SKILL ASSESSMENT</h3>
                            <div className="ser--detail-area">
                                <div className="row custom-border-bottom custom-border-top">
                                    <div className="col-12 col-lg-7 col-md-12 custom-border-right ser--cont-img-area img--3" data-aos="fade" data-aos-delay="200">
                                        <div className="ser--cont-sub-img-area">
                                            {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-5 col-md-12 custom-padding-lr">
                                        <div className="ser--cont-area-right">
                                            <p className='ser--cont-title' data-aos="fade">
                                                Send Technical Assessment test links to multiple candidates, simultaneously. The Test Report comes with a comprehensive analysis of their aptitude, knowledge and proficiency.
                                            </p>
                                            <div className='ser--cont-list-area'>
                                                <ul>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="ser--cont-btn-area">
                                                <a href="#" className='ser--cont-btn-sub' data-aos="fade-left">
                                                    <div className='ser--cont-btn'>
                                                        Request a demo
                                                    </div>
                                                    <div className='ser--cont-arrow-area'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                            <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                            <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                            <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ser--content-section">
                            <h3 className='ser--content-heading' data-aos="fade-left">INTERVIEW-AS-A-SERVICE</h3>
                            <div className="ser--detail-area">
                                <div className="row custom-border-bottom custom-border-top custom-column-reverse">
                                    <div className="col-12 col-lg-5 col-md-12 custom-padding-lr custom-border-right">
                                        <div className="ser--cont-area-left">
                                            <p className='ser--cont-title' data-aos="fade">
                                                Get instant access to the Interview Outsourcing services of Skillety. Do thorough L1 Interviews with a coding round conducted by panels from FAANG companies. The Feedback comes as a comprehensive report along with the playback of the video interview.
                                            </p>
                                            <div className='ser--cont-list-area'>
                                                <ul>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="ser--cont-btn-area">
                                                <a href="#" className='ser--cont-btn-sub' data-aos="fade-left">
                                                    <div className='ser--cont-btn'>
                                                        Request a demo
                                                    </div>
                                                    <div className='ser--cont-arrow-area'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                            <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                            <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                            <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-7 col-md-12 ser--cont-img-area img--4" data-aos="fade" data-aos-delay="200">
                                        <div className="ser--cont-sub-img-area">
                                            {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ser--content-section">
                            <h3 className='ser--content-heading' data-aos="fade-left">ONBOARDING PROCESS</h3>
                            <div className="ser--detail-area">
                                <div className="row custom-border-bottom custom-border-top">
                                    <div className="col-12 col-lg-7 col-md-12 custom-border-right ser--cont-img-area img--5" data-aos="fade" data-aos-delay="200">
                                        <div className="ser--cont-sub-img-area">
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-5 col-md-12 custom-padding-lr">
                                        <div className="ser--cont-area-right">
                                            <p className='ser--cont-title' data-aos="fade">
                                                Covers the collection and re-evaluation of all necessary documents of an Employee who has joined. Basic information, Job Details, Work and Reporting details, Compensation & Benefits, Statutory documents, Educational Certificates, etc.
                                            </p>
                                            <div className='ser--cont-list-area'>
                                                <ul>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="ser--cont-btn-area">
                                                <a href="#" className='ser--cont-btn-sub' data-aos="fade-left">
                                                    <div className='ser--cont-btn'>
                                                        Request a demo
                                                    </div>
                                                    <div className='ser--cont-arrow-area'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                            <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                            <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                            <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ser--content-section">
                            <h3 className='ser--content-heading' data-aos="fade-left">BACKGROUND VERIFICATION</h3>
                            <div className="ser--detail-area">
                                <div className="row custom-border-bottom custom-border-top custom-column-reverse">
                                    <div className="col-12 col-lg-5 col-md-12 custom-padding-lr custom-border-right">
                                        <div className="ser--cont-area-left">
                                            <p className='ser--cont-title' data-aos="fade">
                                                Before releasing the Offer, do a quick sanity check if it's a fake profile or not, with our BGV-Lite services. Also do a detailed 360-degree Background Verification after the candidate joins – all from the Skillety platform.
                                            </p>
                                            <div className='ser--cont-list-area'>
                                                <ul>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="ser--cont-btn-area">
                                                <a href="#" className='ser--cont-btn-sub' data-aos="fade-left">
                                                    <div className='ser--cont-btn'>
                                                        Request a demo
                                                    </div>
                                                    <div className='ser--cont-arrow-area'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                            <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                            <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                            <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-7 col-md-12 ser--cont-img-area img--6" data-aos="fade" data-aos-delay="200">
                                        <div className="ser--cont-sub-img-area">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="ser--more-btn-area">
                            <a href="" className='ser--more-btn' data-aos="fade-up">More...</a>
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>


    )
}
export default Services;