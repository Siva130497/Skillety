import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './RPO.css';
import './RPO-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const RPO = () => {
    useEffect(() => {

    }, []);

    return (
        <>
            <Layout/>
            <div className='container-fluid rpo--section'>
                <div className='container-fluid container-section'>
                    <div className="about--bg">
                        <div className="row">
                            <div className="col-12 col-xl-8 col-lg-12 col-md-12 about--left-cover">
                                <div className="breadcrumb--area" data-aos="fade-down">
                                    <div className="breadcrumb--item">
                                        <a href="/">Home</a>
                                    </div>
                                    <div className="breadcrumb--item">
                                        <p>RPO</p>
                                    </div>
                                </div>
                                <div className="rpo--head">
                                    <h2 data-aos="fade-left">We enhance client recruitment through comprehensive end-to-end outsourcing</h2>
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

                    <div className="rpo--enter-bg">
                        <div className="rpo--enter-heading">
                            <h3 data-aos="fade-up">ENTERPRISE</h3>
                        </div>
                        <div className="rpo--enter-desc">
                            <p data-aos="fade-down">From requisition to onboarding, Skillety offers recruitment expertise and scalability while being completely aligned with our clients’ culture. Enterprise RPO is a comprehensive, customizable, and scalable recruitment solution, rooted on an exclusivity contract from our clients.</p>
                        </div>
                        <div className="rpo--enter-list-area">
                            <ul>
                                <li className='rpo--enter-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--enter-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--enter-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--enter-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                            </ul>
                        </div>
                        <div className="rpo--enter-btn-area">
                            <a href="#" className='rpo--enter-btn-sub' data-aos="fade-down">
                                <div className='rpo--enter-btn'>
                                    Request a demo
                                </div>
                                <div className='rpo--enter-arrow-area'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                        <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="rpo--pro-bg">
                        <div className="rpo--enter-heading">
                            <h3 data-aos="fade-up">PROJECT</h3>
                        </div>
                        <div className="rpo--enter-desc">
                            <p data-aos="fade-down">Project RPO is the way to go for companies that have a specific talent acquisition project like recruiting a new team for a new product line, or a new project, or a new facility. Our clients engage our Project RPO services for a talent acquisition need with defined goals within a specific scope and timeline.</p>
                        </div>
                        <div className="rpo--pro-list-area">
                            <ul>
                                <li className='rpo--pro-list-item' data-aos="fade-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--pro-list-item' data-aos="fade-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--pro-list-item' data-aos="fade-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--pro-list-item' data-aos="fade-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                            </ul>
                        </div>
                        <div className="rpo--pro-btn-area">
                            <a href="#" className='rpo--pro-btn-sub' data-aos="fade-down">
                                <div className='rpo--pro-btn'>
                                    Request a demo
                                </div>
                                <div className='rpo--pro-area'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                        <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="rpo--enter-bg">
                        <div className="rpo--enter-heading">
                            <h3 data-aos="fade-up">CONTINGENT</h3>
                        </div>
                        <div className="rpo--enter-desc">
                            <p data-aos="fade-down">Contingent RPO works as an extension of the talent acquisition department and supplies contract staffing solutions using recruiters dedicated to our clients. Our recruiters build a unique talent pipeline of contract labour for our clients based on their specific hiring goals.</p>
                        </div>
                        <div className="rpo--enter-list-area">
                            <ul>
                                <li className='rpo--enter-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--enter-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--enter-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--enter-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                            </ul>
                        </div>
                        <div className="rpo--enter-btn-area">
                            <a href="#" className='rpo--enter-btn-sub' data-aos="fade-down">
                                <div className='rpo--enter-btn'>
                                    Request a demo
                                </div>
                                <div className='rpo--enter-arrow-area'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                        <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="rpo--pro-bg">
                        <div className="rpo--enter-heading">
                            <h3 data-aos="fade-up">RPO-LITE</h3>
                        </div>
                        <div className="rpo--enter-desc">
                            <p data-aos="fade-down">This is specifically designed for companies who would want to test run the RPO model first, and then decide. We take up hiring requirements from one or few projects on exclusivity, and close them in record time, first. The results will determine whether you want to upgrade to an Enterprise RPO (or not), based on solid proof.</p>
                        </div>
                        <div className="rpo--pro-list-area">
                            <ul>
                                <li className='rpo--pro-list-item' data-aos="fade-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--pro-list-item' data-aos="fade-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--pro-list-item' data-aos="fade-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                <li className='rpo--pro-list-item' data-aos="fade-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                            </ul>
                        </div>
                        <div className="rpo--pro-btn-area">
                            <a href="#" className='rpo--pro-btn-sub' data-aos="fade-down">
                                <div className='rpo--pro-btn'>
                                    Request a demo
                                </div>
                                <div className='rpo--pro-area'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                        <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* <div className="rpo--more-btn-area">
                        <a href="" className='rpo--more-btn' data-aos="fade-up">More...</a>
                    </div> */}

                </div>
            </div>
            <Footer/>
        </>


    )
}
export default RPO;