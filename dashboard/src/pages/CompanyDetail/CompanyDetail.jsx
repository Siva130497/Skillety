import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import './CompanyDetail.css';
import './CompanyDetail-responsive.css';
import $ from 'jquery';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const CompanyDetail = () => {

    useEffect(() => {
        $(document).ready(function () {
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
                            <div className="admin-component-name">
                                Company Details
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 col-lg-4">
                                    <div className="company-main-info-container">
                                        <div className="card comp-det-card profile">
                                            <div className="com-det-logo-area">
                                                <img src="../assets/img/companies/company-1.png" className="com-det-logo" alt="" />
                                            </div>
                                            <div className="com-det-name">Company Name</div>
                                            <div className="com-type">
                                                IT Service Management Company
                                            </div>
                                        </div>

                                        <div className="card comp-det-card prof-det">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="com-main-detail-area mb-3">
                                                        <i class="bi bi-envelope-fill"></i>
                                                        <a className='com-det-main-content' href="mailto:email@gmail.com">email@gmail.com</a>
                                                    </div>
                                                    {/* <hr /> */}
                                                    <div className="com-main-detail-area mb-3">
                                                        <i class="bi bi-telephone-fill"></i>
                                                        <a className='com-det-main-content' href="tel:0123456789">0123456789</a>
                                                    </div>
                                                    {/* <hr /> */}
                                                    <div className="com-main-detail-area">
                                                        <i class="bi bi-geo-alt-fill"></i>
                                                        <a className='com-det-main-content' href="#" target='_blank'>Hydrabad, India.</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <div className="card comp-det-card p-4">
                                        <div className="row">
                                            <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                <div className="com-det-title">Headcount</div>
                                            </div>
                                            <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                <div className="com-det-content">05</div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                <div className="com-det-title">Vision</div>
                                            </div>
                                            <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                <div className="com-det-content">
                                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                <div className="com-det-title">Mission</div>
                                            </div>
                                            <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                <div className="com-det-content">
                                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                <div className="com-det-title">Description</div>
                                            </div>
                                            <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                <div className="com-det-content">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nemo in dolorem maiores pariatur, veritatis accusantium rerum optio distinctio quae quidem omnis quibusdam facilis obcaecati harum sequi fugit necessitatibus praesentium.
                                                </div>
                                                <div className="com-det-content mt-3">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nemo in dolorem maiores pariatur, veritatis accusantium rerum optio distinctio quae quidem omnis quibusdam facilis obcaecati harum sequi fugit necessitatibus praesentium.
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                <div className="com-det-title">Benefits</div>
                                            </div>
                                            <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                <div className="com-det-content">
                                                    <ul>
                                                        <li>Health Insurance</li>
                                                        <li>Sick Leave</li>
                                                        <li>Job Training</li>
                                                        <li>Work From Home</li>
                                                        <li>Maternity/Parental Leave</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default CompanyDetail