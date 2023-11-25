import React, { useContext, useState } from "react";
import { useEffect } from "react";
import $ from "jquery";
import "./CompanyInformation.css";
import "./CompanyInformation-responsive.css";
import { CandidateFooter } from "../../components/CandidateFooter";
import LayoutNew from "../../components/LayoutNew";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";


const CompanyInformation = () => {

    useEffect(() => {
        $(document).ready(function () { });
    }, []);

    return (
        <div>
            <div>
                <LayoutNew />

                <div className="talents--section">
                    <div className="container-fluid">
                        <div className="container-fluid container-section">
                            <div className="custom--container">

                                <div className="breadcrumb--area-dark" data-aos="fade-down">
                                    <div className="breadcrumb--item-dark">
                                        <a href="/candidate-home">Home</a>
                                    </div>
                                    <div className="breadcrumb--item-dark">
                                        <p>Company Information</p>
                                    </div>
                                </div>

                                <div className="job--detail-head-area">
                                    <h3 className="job--detail-head" data-aos="fade-left">
                                        Company Information
                                    </h3>
                                </div>
                                <div className="job--detail-content-section">
                                    <div className="company-info-container">
                                        <div className="row">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CandidateFooter />
            </div>
        </div>

    );
};

export default CompanyInformation;