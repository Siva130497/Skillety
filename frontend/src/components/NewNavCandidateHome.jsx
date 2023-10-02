import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

export const NewNavCandidateHome = () => {
    useEffect(() => {
        $(document).ready(function () {
            $('.scroll-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 100); // Adjust the speed (in milliseconds) as needed
            });
        });
    }, []);
    const navigate = useNavigate();

    return (
        <header id="header" className="fixed--top candidate">
            <div className="container-fluid d-flex align-items-center justify-content-between ps-0 custom-right-nav-padding">

                <div>
                    <div className='logo--area me-auto'>
                        <div className='logo--subarea'>
                            <a href="/candidate-home">
                                <img className='nav--logo' src="assets/img/logo/skillety-logo-sm.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="switches-container">
                    <input
                        type="radio"
                        id="switchTalent"
                        name="switchPlan"
                        value="Talent"
                        checked
                    />
                    <input
                        type="radio"
                        id="switchEmployer"
                        name="switchPlan"
                        value="Employer"
                        onChange={() => navigate("/")}
                    />
                    <label htmlFor="switchTalent" className='scroll-to-top'>Talent</label>
                    <label htmlFor="switchEmployer" className='scroll-to-top'>Employer</label>
                    <div className="switch-wrapper">
                        <div className="switch candidate">
                            <div>Talent</div>
                            <div>Employer</div>
                        </div>
                    </div>
                </div>

                <nav id="navbar" className="navbar candidate navbar-expand-lg">
                    <ul>
                        <li><div><a href="#" className="nav-link scrollto active">Home</a></div></li>
                        <li><a href="#" className="nav-link scrollto">About Us</a></li>
                        <li><a href="/job-detail" className="nav-link scrollto">Search Jobs</a></li>
                        {/* <li><a href="#" className="nav-link scrollto">Companies</a></li> */}
                        <li><a href="#" className="nav-link scrollto">Event</a></li>
                        <li><a href="/talent-contact-us" className="nav-link scrollto">Contact</a></li>
                        <li><a href="/candidate-login" className="nav-link scrollto login--btn"><i class='bx bx-log-in-circle login--icon me-2'></i>Login</a></li>
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle candidate"></i>
                </nav>

            </div>
        </header>
    )
}
