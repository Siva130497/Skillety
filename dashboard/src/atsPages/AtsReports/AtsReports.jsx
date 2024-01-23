import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../atsComponents/ATSLayout';
import Footer from '../../components/Footer';
import './AtsReports.css';
import './AtsReports-responsive.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const AtsReports = () => {

    useEffect(() => {
    }, [])

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Reports
                            </div>

                            <div className="reports-section">
                                <ul className="nav nav-pills report-tabs" id="myTab3" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link report active" id="team-tab" data-toggle="tab" href="#Team" role="tab"
                                            aria-controls="team" aria-selected="true">Team</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link report" id="client-tab" data-toggle="tab" href="#Client" role="tab"
                                            aria-controls="client" aria-selected="false">Client</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link report" id="job-tab" data-toggle="tab" href="#Job" role="tab"
                                            aria-controls="job" aria-selected="false">Job</a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className="nav-link report" id="other-tab" data-toggle="tab" href="#Other" role="tab"
                                            aria-controls="other" aria-selected="false">Other</a>
                                    </li> */}
                                </ul>
                                <div className="card report-card">
                                    <div className="tab-content" id="myTabContent2">
                                        <div className="tab-pane fade show active" id="Team" role="tabpanel" aria-labelledby="team-tab">
                                            <div className="row">
                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/team-performance-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/statistic.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Team Performance Report <br />
                                                            <span className='report-tile-sub'>Monitor your team's productivity, identify bottlenecks, and help you make the right decisions.</span>
                                                        </span>
                                                    </a>
                                                </div>

                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/daily-submission-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/pie-chart.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Daily Submission Report <br />
                                                            <span className='report-tile-sub'>
                                                                Track the daily submission of your team to the hiring manager and clients.
                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>

                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/lead-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/shuttle.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Lead Report <br />
                                                            <span className='report-tile-sub'>
                                                                Track the performance of your sales team and get insight into overall sales development.
                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>

                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/candidate-source-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/man.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Candidate Source Report <br />
                                                            <span className='report-tile-sub'>
                                                                Measure the efficiency of different sourcing channels and helps you make better decisions.                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>

                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/turnaround-time-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/clock.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Turnaround Time Report <br />
                                                            <span className='report-tile-sub'>
                                                                Calculates the time in days for the first assignment of the candidate to the job by the recruiter and the first candidate submitted to the client or hiring manager.                                                                                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="Client" role="tabpanel" aria-labelledby="client-tab">
                                            <div className="row">
                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/client-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/boss.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Client Report <br />
                                                            <span className='report-tile-sub'>Review the overall performance delivered to different clients by the team with drill-down capability.</span>
                                                        </span>
                                                    </a>
                                                </div>

                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/interview-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/schedule.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Interview Report<br />
                                                            <span className='report-tile-sub'>
                                                                Review the interviews conducted and the outcome of the interviews.
                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>

                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/lead-conversion-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/shuttle.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Lead Conversion Report<br />
                                                            <span className='report-tile-sub'>
                                                                Track the time taken to convert prospects to clients by the sales team.
                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>

                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/candidate-placement-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/success.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Candidate Placement Report<br />
                                                            <span className='report-tile-sub'>
                                                                Track the candidate which was hired for different jobs and monitor the overall hiring success.
                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="Job" role="tabpanel" aria-labelledby="job-tab">
                                            <div className="row">
                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/job-success-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/bronze-medal.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Job Success Report<br />
                                                            <span className='report-tile-sub'>
                                                                Analyses the progress of each job and verifies the success ratio of hiring.
                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>

                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/job-duration-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/chronometer.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Job Duration Report<br />
                                                            <span className='report-tile-sub'>
                                                                Analyses the on-time hiring of candidates against the target date set for the jobs.
                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>

                                                <div className="col-12 col-lg-6 col-xl-6 col-xxl-4 col-md-6">
                                                    <a href="/job-report" className='report-tiles'>
                                                        <span className='report-tile-img-area'>
                                                            <img src="../assets/img/report/job-description.png" className='report-tile-img' alt="" />
                                                        </span>
                                                        <span>
                                                            Job Report<br />
                                                            <span className='report-tile-sub'>
                                                                Analyses the overall progress of jobs and drill-down capability helps you to analyse the performance of each team member at the job level.
                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="tab-pane fade" id="Other" role="tabpanel" aria-labelledby="other-tab">
                                            Test
                                        </div> */}
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

export default AtsReports