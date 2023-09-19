import React from 'react'
import { useEffect } from 'react';
import $ from 'jquery';
import './Services.css'
import './Services-responsive.css'
import Layout from '../../components/Layout';

const Services = () => {
    useEffect(() => {

    }, []);

    return (
        <>
            <Layout/>
        <div className='container-fluid'>
            <div className='services--section'>
            <div className='container-fluid container-section'>
                <div className="about--bg service-bg">
                    <div className="row">
                        <div className="col-12 col-lg-8 col-md-12 about--left-cover">
                            <div className="breadcrumb--area">
                                <div className="breadcrumb--item">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item">
                                    <p>Services</p>
                                </div>
                            </div>
                            <div className="services--head">
                                <h2>Our primary mission is to provide our Clients  with ‘convenience’.</h2>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-12 about--right-cover">
                            <div className="about--card-area">
                                <div className="card about--card">
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
                                        <img src="assets/img/home-images/arrow-img.png" className='arrow--icon' alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ser--content-section">
                    <h3 className='ser--content-heading'>Sourcing</h3>
                    <div className="ser--detail-area">
                        <div className="row custom-border-bottom custom-border-top">
                            <div className="col-12 col-lg-7 col-md-12 custom-border-right ser--cont-img-area img--1">
                                <div className="ser--cont-sub-img-area">
                                    {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                </div>
                            </div>
                            <div className="col-12 col-lg-5 col-md-12 custom-padding-lr">
                                <div className="ser--cont-area-right">
                                    <p className='ser--cont-title'>
                                        Search for Immediate Joiner CVs from 3 buckets - 7 days, 15 days & 30 days joiners. Also Post Jobs and publish it on 172 partner job-boards & social media platforms, in just one click.
                                    </p>
                                    <div className='ser--cont-list-area'>
                                        <ul>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="ser--cont-btn-area">
                                        <a href="#" className='ser--cont-btn-sub'>
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
                    <h3 className='ser--content-heading'>SCREENING</h3>
                    <div className="ser--detail-area">
                        <div className="row custom-border-bottom custom-border-top custom-column-reverse">
                            <div className="col-12 col-lg-5 col-md-12 custom-padding-lr">
                                <div className="ser--cont-area-left">
                                    <p className='ser--cont-title'>
                                        Search for Immediate Joiner CVs from 3 buckets - 7 days, 15 days & 30 days joiners. Also Post Jobs and publish it on 172 partner job-boards & social media platforms, in just one click.
                                    </p>
                                    <div className='ser--cont-list-area'>
                                        <ul>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="ser--cont-btn-area">
                                        <a href="#" className='ser--cont-btn-sub'>
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
                            <div className="col-12 col-lg-7 col-md-12 custom-border-right ser--cont-img-area img--2">
                                <div className="ser--cont-sub-img-area">
                                    {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ser--content-section">
                    <h3 className='ser--content-heading'>Assessment</h3>
                    <div className="ser--detail-area">
                        <div className="row custom-border-bottom custom-border-top">
                            <div className="col-12 col-lg-7 col-md-12 custom-border-right ser--cont-img-area img--3">
                                <div className="ser--cont-sub-img-area">
                                    {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                </div>
                            </div>
                            <div className="col-12 col-lg-5 col-md-12 custom-padding-lr">
                                <div className="ser--cont-area-right">
                                    <p className='ser--cont-title'>
                                        Search for Immediate Joiner CVs from 3 buckets - 7 days, 15 days & 30 days joiners. Also Post Jobs and publish it on 172 partner job-boards & social media platforms, in just one click.
                                    </p>
                                    <div className='ser--cont-list-area'>
                                        <ul>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="ser--cont-btn-area">
                                        <a href="#" className='ser--cont-btn-sub'>
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
                    <h3 className='ser--content-heading'>INTERVIEW</h3>
                    <div className="ser--detail-area">
                        <div className="row custom-border-bottom custom-border-top custom-column-reverse">
                            <div className="col-12 col-lg-5 col-md-12 custom-padding-lr">
                                <div className="ser--cont-area-left">
                                    <p className='ser--cont-title'>
                                        Search for Immediate Joiner CVs from 3 buckets - 7 days, 15 days & 30 days joiners. Also Post Jobs and publish it on 172 partner job-boards & social media platforms, in just one click.
                                    </p>
                                    <div className='ser--cont-list-area'>
                                        <ul>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="ser--cont-btn-area">
                                        <a href="#" className='ser--cont-btn-sub'>
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
                            <div className="col-12 col-lg-7 col-md-12 custom-border-right ser--cont-img-area img--4">
                                <div className="ser--cont-sub-img-area">
                                    {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ser--content-section">
                    <h3 className='ser--content-heading'>VERIFICATION</h3>
                    <div className="ser--detail-area">
                        <div className="row custom-border-bottom custom-border-top">
                            <div className="col-12 col-lg-7 col-md-12 custom-border-right ser--cont-img-area img--5">
                                <div className="ser--cont-sub-img-area">
                                    {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                </div>
                            </div>
                            <div className="col-12 col-lg-5 col-md-12 custom-padding-lr">
                                <div className="ser--cont-area-right">
                                    <p className='ser--cont-title'>
                                        Search for Immediate Joiner CVs from 3 buckets - 7 days, 15 days & 30 days joiners. Also Post Jobs and publish it on 172 partner job-boards & social media platforms, in just one click.
                                    </p>
                                    <div className='ser--cont-list-area'>
                                        <ul>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                            <li className='ser--cont-list-item'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="ser--cont-btn-area">
                                        <a href="#" className='ser--cont-btn-sub'>
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

                <div className="ser--more-btn-area">
                    <a href="" className='ser--more-btn'>More...</a>
                </div>
            </div>
        </div>
        </div>
        </>
        
        
    )
}
export default Services;