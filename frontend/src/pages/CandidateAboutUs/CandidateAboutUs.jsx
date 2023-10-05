import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './CandidateAboutUs.css';
import './CandidateAboutUs-responsive.css';
import { CandidateFooter } from '../../components/CandidateFooter';
import LayoutNew from '../../components/LayoutNew';

const CandidateAboutUs = () => {
    useEffect(() => {

    }, []);

    return (
        <div>
            <LayoutNew />
            <div>
                <div className='container-fluid contact--section'>
                    <div className='container-fluid container-section'>
                        <div className="about--bg candidate">
                            <div className="row">
                                <div className="col-12 col-xl-8 col-lg-12 col-md-12 about--left-cover">
                                    <div className="breadcrumb--area candidate" data-aos="fade-down">
                                        <div className="breadcrumb--item">
                                            <a href="/candidate-home">Home</a>
                                        </div>
                                        <div className="breadcrumb--item">
                                            <p>About us</p>
                                        </div>
                                    </div>
                                    <div className="about--head candidate">
                                        <h2 data-aos="fade-left">It’s Time to Make Skillety Work for You</h2>
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
                        </div>
                        <div className='con--where-section'>
                            <div className="con--where-container">
                                <div className="cand--ab-para-section">
                                    <p className='cand--ab-para' data-aos="fade-up">
                                        Skillety is an AI-driven job portal designed for people who want to find a job quickly. We have an exclusive vault for Immediate Joiners - those who can start working in 7, 15, or 30 days. If you're seeking a job that matches your skills and salary expectations, you're in the right spot. We're partners with over 140 top companies, offering you a choice of more than 2400 active jobs.
                                    </p>
                                </div>
                                <div className="cand--ab-para-section2" data-aos="fade-up">
                                    <p className='cand--ab-para'>
                                        Take control of your job search with our Self-Service Portal. You can edit your profile, apply for as many matching jobs as you want, check your application status, manage interviews, upload important documents, connect with the recruiter anytime and much more. Right now, we're welcoming over 850 new registrations every day, with a consistent growth rate of 15 to 20% each month. Our technology and teams are dedicated to providing speed and accuracy around the clock.
                                    </p>
                                </div>

                                <div className="cand--ab-vis-mis-section">
                                    <div className="row">
                                        <div className="col-12 col-lg-12 col-xl-4 col-sm-12 col-md-12 custom-align-center">
                                            <p className='cand--ab-vis-mis-para' data-aos="fade-right">
                                                Apply with us and get your L1-interview within 24 hours.
                                            </p>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-4 col-sm-12 col-md-12">
                                            <div className="cand--ab-vis-mis-card" data-aos="fade-down">
                                                <h6 className="cand--ab-vis-mis-head">
                                                    VISION
                                                </h6>
                                                <p className='cand--ab-vis-mis-desc'>
                                                    To free organisations from outdated recruitment practices, by harnessing the combined power of human wisdom & artificial intelligence and providing them with just-for-you & easy-to-use solutions.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-4 col-sm-12 col-md-12">
                                            <div className="cand--ab-vis-mis-card" data-aos="fade-up">
                                                <h6 className="cand--ab-vis-mis-head">
                                                    MISSION
                                                </h6>
                                                <p className='cand--ab-vis-mis-desc'>
                                                    With 'Client Appreciation' at the heart of our organisational culture, we are dedicated to consistently innovating and crafting unconventional solutions to ensure our clients' delight and satisfaction at all times.
                                                </p>
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


    )
}
export default CandidateAboutUs;