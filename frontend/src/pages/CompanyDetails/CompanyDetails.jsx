import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './CompanyDetails.css';
import './CompanyDetails-responsive.css';
import { CandidateFooter } from '../../components/CandidateFooter';
import LayoutNew from '../../components/LayoutNew';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorPage from '../../404/404';

const CompanyDetails = () => {
    const { id } = useParams()
    const [jobs, setJobs] = useState([]);
    const [candidateToken, setCandidateToken] = useState("");
    const [companyDetail, setCompanyDetail] = useState();

    const [loading, setLoading] = useState(true);
    const [pageNotFound, setPageNotFound] = useState(false);

    useEffect(() => {
        setCandidateToken(JSON.parse(localStorage.getItem("candidateToken")))
    }, [candidateToken])

    useEffect(() => {
        axios.get(`https://skillety-n6r1.onrender.com/my-active-jobs/${id}`)
            .then((res => {
                console.log(res.data)
                setLoading(false);
                setJobs(res.data);
            }))
            .catch(err => {
                console.log(err)
                setLoading(false);
                setPageNotFound(true);
            })

        axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`)
            .then((res => {
                console.log(res.data)
                setCompanyDetail(res.data);
            }))
            .catch(err => {
                console.log(err)
            })

    }, [id])

    useEffect(() => {
        $(document).ready(function () {
            // Expand the first card initially
            var firstCard = $(".company--detail-vacancy-card:first");
            var firstDetailArea = firstCard.find(".company--detail-card-toggle-detail-area");
            var firstArrow = firstCard.find(".company--detail-card-toggle-arrow svg");

            firstDetailArea.addClass("expanded").css("max-height", "100%");
            firstArrow.addClass("expanded").css("transform", "rotate(90deg)");

            $(".company--detail-card-toggle-area").click(function () {
                var card = $(this).closest(".company--detail-vacancy-card");
                var detailArea = card.find(".company--detail-card-toggle-detail-area");
                var arrow = card.find(".company--detail-card-toggle-arrow svg");

                var expandedCards = $(".company--detail-vacancy-card .company--detail-card-toggle-detail-area.expanded");

                if (detailArea.hasClass("expanded")) {
                    detailArea.removeClass("expanded");
                    setTimeout(function () {
                        detailArea.css("max-height", "0");
                    }, 0); // Delay to allow the transition to finish (0.8 seconds)
                    arrow.css("transform", "rotate(0deg)");
                } else {
                    // Collapse all other cards and reset their arrows
                    expandedCards.removeClass("expanded").css("max-height", "0");
                    $(".company--detail-vacancy-card .company--detail-card-toggle-arrow svg").css("transform", "rotate(0deg)");

                    detailArea.addClass("expanded");
                    setTimeout(function () {
                        detailArea.css("max-height", detailArea.prop("scrollHeight") + "px");
                        arrow.css("transform", "rotate(90deg)");
                    }, 0); // Delay to allow the transition to finish (0.8 seconds)
                }
            });
        });

    }, [jobs]);

    useEffect(() => {
        const preloader = $('#preloader');
        if (preloader.length) {
            setTimeout(function () {
                preloader.fadeOut('slow', function () {
                    preloader.remove();
                });
            }, 500);
        }
    }, []);

    return (
        <div>
            {loading && <div id="preloader candidate"></div>}
            {jobs.length > 0 && <div>
                <LayoutNew />
                <div className='talents--section'>
                    <div className='container-fluid'>
                        <div className='container-fluid container-section'>
                            <div className="custom--container">
                                <div className="breadcrumb--area-dark" data-aos="fade-down">
                                    <div className="breadcrumb--item-dark">
                                        <a href="/">Home</a>
                                    </div>
                                    <div className="breadcrumb--item-dark">
                                        <a className='sub--bredcrumb-link' href="/company">Companies</a>
                                    </div>
                                    <div className="breadcrumb--item-dark">
                                        <p>Companies Job Details</p>
                                    </div>
                                </div>

                                <div className="job--detail-head-area">
                                    <h3 className='job--detail-head' data-aos="fade-up">Join OUR team</h3>
                                </div>

                                <div className="company--detail-section">
                                    <div className="company--detail-desc-area">
                                        <p className='company--detail-desc' data-aos="fade-left">{companyDetail?.longDescription}</p>
                                    </div>
                                    <div className="company--detail-vacancy-area">
                                        <h3 className='company--detail-vacancy-title' data-aos="fade-up">VACANCIES</h3>

                                        <div className="company--detail-vacancy-container">
                                            {jobs.map(job => {
                                                return (
                                                    <article className='company--detail-vacancy-card' data-aos="fade-left">
                                                        <div className="company--detail-vacancy-card-arrow-area">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                                                <path d="M3.61719 5.21432C9.8283 10.4699 25.9772 17.2543 40.8839 2.34766" stroke="#5C3B2E" stroke-width="2" />
                                                                <path d="M41.4488 1.79106C35.4429 7.27999 26.6513 22.43 39.5318 39.1186" stroke="#5C3B2E" stroke-width="2" />
                                                                <path d="M0.922852 44L42.4895 1" stroke="#5C3B2E" stroke-width="2" />
                                                            </svg>
                                                        </div>
                                                        <div className='row company--detail-card-toggle-area' title='Click to view/hide vacancy details...'>
                                                            <div className="col-12 col-lg-2 col-xl-2 col-md-2 col-sm-3 company--detail-card-toggle-arrow">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                                    <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                                    <path d="M22.1891 27.6655C22.5796 33.977 27.4558 46.6874 43.8366 47.0372" stroke="#5C3B2E" stroke-width="3" />
                                                                    <path d="M44.453 47.0562C38.1434 46.6373 24.9142 49.85 22.4749 66.0519" stroke="#5C3B2E" stroke-width="3" />
                                                                </svg>
                                                            </div>
                                                            <div className="col-12 col-lg-7 col-xl-7 col-md-7 col-sm-9 company--detail-card-role-area">
                                                                <h4 className='company--detail-card-role'>{job.jobRole[0]}</h4>
                                                            </div>
                                                            <div className="col-12 col-lg-3 col-xl-3 col-md-3 col-sm-9 offset-sm-3 offset-md-0 offset-lg-0 offset-xl-0 company--detail-card-role-count-area">
                                                                {/* <h5 className='company--detail-card-role-count'>
                                                        02 <span>Job roles</span>
                                                    </h5> */}
                                                            </div>
                                                        </div>
                                                        <div className="row company--detail-card-toggle-detail-area">
                                                            <div className="col-12 col-lg-10 col-xl-10 col-md-10 offset-lg-2 offset-xl-2 offset-md-2">
                                                                <div className="row company--detail-card-row-border company--detail-card-content-area">
                                                                    <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                                        <div className="company--detail-card-content">
                                                                            <h6 className='company--detail-card-content-title'>
                                                                                Location
                                                                            </h6>
                                                                            <p className='company--detail-card-content-desc'>
                                                                                {job.location.join(", ")}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                                        <div className="company--detail-card-content">
                                                                            <h6 className='company--detail-card-content-title'>
                                                                                Experience
                                                                            </h6>
                                                                            <p className='company--detail-card-content-desc'>
                                                                                {job.minExperience} - {job.maxExperience} years
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                                        <div className="company--detail-card-content">
                                                                            <h6 className='company--detail-card-content-title'>
                                                                                Required Skills
                                                                            </h6>
                                                                            <p className='company--detail-card-content-desc'>
                                                                                {job.skills.join(", ")}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="company--detail-card-desc-area">
                                                                    <p className='company--detail-card-desc'>
                                                                        {job.jobDescription}
                                                                    </p>
                                                                </div>
                                                                {/* <div className="company--detail-card-res-section">
                                                        <h4 className="company--detail-card-sub-head">
                                                            Responsibilities
                                                        </h4>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>1</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>2</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>3</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-per-qua-section">
                                                        <h4 className="company--detail-card-sub-head">
                                                            Personal Qualities :
                                                        </h4>
                                                        <div className="company--detail-card-per-qua-list">
                                                            <ul>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                            </ul>
                                                        </div>
                                                    </div> */}
                                                                <div className="company--detail-card-apply-btn-area">
                                                                    <a href={candidateToken ? `/job-detail/${job.id}` : "/candidate-login"} className='company--detail-card-apply-btn'>
                                                                        <div className='company--detail-card-apply-btn-sub'>
                                                                            Apply Now
                                                                        </div>
                                                                        <div className='company--detail-card-apply-btn-arrow'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                                                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                                                                <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                                                            </svg>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </article>
                                                )
                                            })}


                                            {/* <article className='company--detail-vacancy-card' data-aos="fade-left">
                                            <div className="company--detail-vacancy-card-arrow-area">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                                    <path d="M3.61719 5.21432C9.8283 10.4699 25.9772 17.2543 40.8839 2.34766" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M41.4488 1.79106C35.4429 7.27999 26.6513 22.43 39.5318 39.1186" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M0.922852 44L42.4895 1" stroke="#5C3B2E" stroke-width="2" />
                                                </svg>
                                            </div>
                                            <div className='row company--detail-card-toggle-area' title='Click to view/hide vacancy details...'>
                                                <div className="col-12 col-lg-2 col-xl-2 col-md-2 col-sm-3 company--detail-card-toggle-arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                        <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M22.1891 27.6655C22.5796 33.977 27.4558 46.6874 43.8366 47.0372" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M44.453 47.0562C38.1434 46.6373 24.9142 49.85 22.4749 66.0519" stroke="#5C3B2E" stroke-width="3" />
                                                    </svg>
                                                </div>
                                                <div className="col-12 col-lg-7 col-xl-7 col-md-7 col-sm-9 company--detail-card-role-area">
                                                    <h4 className='company--detail-card-role'>Manager</h4>
                                                </div>
                                                <div className="col-12 col-lg-3 col-xl-3 col-md-3 col-sm-9 offset-sm-3 offset-md-0 offset-lg-0 offset-xl-0 company--detail-card-role-count-area">
                                                    <h5 className='company--detail-card-role-count'>
                                                        01 <span>Job role</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="row company--detail-card-toggle-detail-area">
                                                <div className="col-12 col-lg-10 col-xl-10 col-md-10 offset-lg-2 offset-xl-2 offset-md-2">
                                                    <div className="row company--detail-card-row-border company--detail-card-content-area">
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                            <div className="company--detail-card-content">
                                                                <h6 className='company--detail-card-content-title'>
                                                                    Location
                                                                </h6>
                                                                <p className='company--detail-card-content-desc'>
                                                                    Remote
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                            <div className="company--detail-card-content">
                                                                <h6 className='company--detail-card-content-title'>
                                                                    Experience
                                                                </h6>
                                                                <p className='company--detail-card-content-desc'>
                                                                    5+ years
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                            <div className="company--detail-card-content">
                                                                <h6 className='company--detail-card-content-title'>
                                                                    Required Skills
                                                                </h6>
                                                                <p className='company--detail-card-content-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-desc-area">
                                                        <p className='company--detail-card-desc'>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                                        </p>
                                                    </div>
                                                    <div className="company--detail-card-res-section">
                                                        <h4 className="company--detail-card-sub-head">
                                                            Responsibilities
                                                        </h4>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>1</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>2</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>3</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-per-qua-section">
                                                        <h4 className="company--detail-card-sub-head">
                                                            Personal Qualities :
                                                        </h4>
                                                        <div className="company--detail-card-per-qua-list">
                                                            <ul>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-apply-btn-area">
                                                        <a href="#" className='company--detail-card-apply-btn'>
                                                            <div className='company--detail-card-apply-btn-sub'>
                                                                Apply Now
                                                            </div>
                                                            <div className='company--detail-card-apply-btn-arrow'>
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
                                        </article>

                                        <article className='company--detail-vacancy-card' data-aos="fade-left">
                                            <div className="company--detail-vacancy-card-arrow-area">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                                    <path d="M3.61719 5.21432C9.8283 10.4699 25.9772 17.2543 40.8839 2.34766" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M41.4488 1.79106C35.4429 7.27999 26.6513 22.43 39.5318 39.1186" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M0.922852 44L42.4895 1" stroke="#5C3B2E" stroke-width="2" />
                                                </svg>
                                            </div>
                                            <div className='row company--detail-card-toggle-area' title='Click to view/hide vacancy details...'>
                                                <div className="col-12 col-lg-2 col-xl-2 col-md-2 col-sm-3 company--detail-card-toggle-arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                        <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M22.1891 27.6655C22.5796 33.977 27.4558 46.6874 43.8366 47.0372" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M44.453 47.0562C38.1434 46.6373 24.9142 49.85 22.4749 66.0519" stroke="#5C3B2E" stroke-width="3" />
                                                    </svg>
                                                </div>
                                                <div className="col-12 col-lg-7 col-xl-7 col-md-7 col-sm-9 company--detail-card-role-area">
                                                    <h4 className='company--detail-card-role'>Graphic Designer</h4>
                                                </div>
                                                <div className="col-12 col-lg-3 col-xl-3 col-md-3 col-sm-9 offset-sm-3 offset-md-0 offset-lg-0 offset-xl-0 company--detail-card-role-count-area">
                                                    <h5 className='company--detail-card-role-count'>
                                                        01 <span>Job role</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="row company--detail-card-toggle-detail-area">
                                                <div className="col-12 col-lg-10 col-xl-10 col-md-10 offset-lg-2 offset-xl-2 offset-md-2">
                                                    <div className="row company--detail-card-row-border company--detail-card-content-area">
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                            <div className="company--detail-card-content">
                                                                <h6 className='company--detail-card-content-title'>
                                                                    Location
                                                                </h6>
                                                                <p className='company--detail-card-content-desc'>
                                                                    Remote
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                            <div className="company--detail-card-content">
                                                                <h6 className='company--detail-card-content-title'>
                                                                    Experience
                                                                </h6>
                                                                <p className='company--detail-card-content-desc'>
                                                                    5+ years
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                            <div className="company--detail-card-content">
                                                                <h6 className='company--detail-card-content-title'>
                                                                    Required Skills
                                                                </h6>
                                                                <p className='company--detail-card-content-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-desc-area">
                                                        <p className='company--detail-card-desc'>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                                        </p>
                                                    </div>
                                                    <div className="company--detail-card-res-section">
                                                        <h4 className="company--detail-card-sub-head">
                                                            Responsibilities
                                                        </h4>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>1</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>2</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>3</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-per-qua-section">
                                                        <h4 className="company--detail-card-sub-head">
                                                            Personal Qualities :
                                                        </h4>
                                                        <div className="company--detail-card-per-qua-list">
                                                            <ul>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-apply-btn-area">
                                                        <a href="#" className='company--detail-card-apply-btn'>
                                                            <div className='company--detail-card-apply-btn-sub'>
                                                                Apply Now
                                                            </div>
                                                            <div className='company--detail-card-apply-btn-arrow'>
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
                                        </article>

                                        <article className='company--detail-vacancy-card' data-aos="fade-left">
                                            <div className="company--detail-vacancy-card-arrow-area">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                                    <path d="M3.61719 5.21432C9.8283 10.4699 25.9772 17.2543 40.8839 2.34766" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M41.4488 1.79106C35.4429 7.27999 26.6513 22.43 39.5318 39.1186" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M0.922852 44L42.4895 1" stroke="#5C3B2E" stroke-width="2" />
                                                </svg>
                                            </div>
                                            <div className='row company--detail-card-toggle-area' title='Click to view/hide vacancy details...'>
                                                <div className="col-12 col-lg-2 col-xl-2 col-md-2 col-sm-3 company--detail-card-toggle-arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                        <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M22.1891 27.6655C22.5796 33.977 27.4558 46.6874 43.8366 47.0372" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M44.453 47.0562C38.1434 46.6373 24.9142 49.85 22.4749 66.0519" stroke="#5C3B2E" stroke-width="3" />
                                                    </svg>
                                                </div>
                                                <div className="col-12 col-lg-7 col-xl-7 col-md-7 col-sm-9 company--detail-card-role-area">
                                                    <h4 className='company--detail-card-role'>Sales Manager</h4>
                                                </div>
                                                <div className="col-12 col-lg-3 col-xl-3 col-md-3 col-sm-9 offset-sm-3 offset-md-0 offset-lg-0 offset-xl-0 company--detail-card-role-count-area">
                                                    <h5 className='company--detail-card-role-count'>
                                                        01 <span>Job role</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="row company--detail-card-toggle-detail-area">
                                                <div className="col-12 col-lg-10 col-xl-10 col-md-10 offset-lg-2 offset-xl-2 offset-md-2">
                                                    <div className="row company--detail-card-row-border company--detail-card-content-area">
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                            <div className="company--detail-card-content">
                                                                <h6 className='company--detail-card-content-title'>
                                                                    Location
                                                                </h6>
                                                                <p className='company--detail-card-content-desc'>
                                                                    Remote
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                            <div className="company--detail-card-content">
                                                                <h6 className='company--detail-card-content-title'>
                                                                    Experience
                                                                </h6>
                                                                <p className='company--detail-card-content-desc'>
                                                                    5+ years
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4">
                                                            <div className="company--detail-card-content">
                                                                <h6 className='company--detail-card-content-title'>
                                                                    Required Skills
                                                                </h6>
                                                                <p className='company--detail-card-content-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-desc-area">
                                                        <p className='company--detail-card-desc'>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                                        </p>
                                                    </div>
                                                    <div className="company--detail-card-res-section">
                                                        <h4 className="company--detail-card-sub-head">
                                                            Responsibilities
                                                        </h4>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>1</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>2</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="company--detail-card-res-area">
                                                            <div className='company--detail-card-res-number'>3</div>
                                                            <div className='company--detail-card-res-desc-area'>
                                                                <p className='company--detail-card-res-desc'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-per-qua-section">
                                                        <h4 className="company--detail-card-sub-head">
                                                            Personal Qualities :
                                                        </h4>
                                                        <div className="company--detail-card-per-qua-list">
                                                            <ul>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                                <li className='company--detail-card-per-qua-list-item'>Lorem Ipsum is simply dummy text</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="company--detail-card-apply-btn-area">
                                                        <a href="#" className='company--detail-card-apply-btn'>
                                                            <div className='company--detail-card-apply-btn-sub'>
                                                                Apply Now
                                                            </div>
                                                            <div className='company--detail-card-apply-btn-arrow'>
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
                                        </article> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CandidateFooter />
            </div >}
            {pageNotFound &&
                <ErrorPage/>
            }
        </div>
    )

}
export default CompanyDetails;