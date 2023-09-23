import React from 'react'
import { useEffect } from 'react';
import $ from 'jquery';
import './About.css'
import './About-responsive.css'
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const About = () => {
    useEffect(() => {
        // Function to animate the numbers
        function animateNumber(element, targetNumber) {
            let currentNumber = 0;
            const increment = Math.ceil(targetNumber / 100); // Increment step (adjust as needed)
            const animationDuration = 4000; // Animation duration in milliseconds (adjust as needed)

            const updateNumber = () => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    currentNumber = targetNumber;
                    clearInterval(interval);
                }
                element.textContent = `${(currentNumber / 1).toFixed()}+`; // Display as "X.XXM"
            };

            const interval = setInterval(updateNumber, animationDuration / 100);
        }

        // Function to handle the intersection observer callback
        function handleIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When the section is in view, start the animation for each number
                    const numbers = document.querySelectorAll('.ab-milestone-number');
                    numbers.forEach(numberElement => {
                        const targetNumber = parseInt(numberElement.getAttribute('data-target'));
                        animateNumber(numberElement, targetNumber);
                    });

                    // Unobserve the section after the animation starts to avoid unnecessary re-runs
                    observer.unobserve(entry.target);
                }
            });
        }

        // Create the Intersection Observer instance
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Adjust the threshold as needed (0.5 means 50% of the section is visible)
        });

        // Observe the section
        const section = document.querySelector('.about--milestone-card');
        observer.observe(section);
    }, []);

    return (
        <div>
            <Layout />
            <div>
                <div className='container-fluid about--section'>
                    <div className='container-fluid container-section'>
                        <div className="about--bg">
                            <div className="row">
                                <div className="col-12 col-lg-12 col-xl-8 col-md-12 about--left-cover">
                                    <div className="breadcrumb--area" data-aos="fade-down">
                                        <div className="breadcrumb--item">
                                            <a href="/">Home</a>
                                        </div>
                                        <div className="breadcrumb--item">
                                            <p>About Us</p>
                                        </div>
                                    </div>
                                    <div className="about--head">
                                        <h2 data-aos="fade-left">Skillety simply means
                                            “Skill at Will”. </h2>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 offset-lg-6 offset-xl-0 col-xl-4 col-md-12 about--right-cover">
                                    <div className="about--card-area" data-aos="fade-right">
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
                        <div className='about--desc-section'>
                            <p data-aos="fade-left">We are a gig-economy based crowdsourcing platform for Freelancers. We have an exclusive vault of Immediate Joiners - guys who can pick up an Offer and Join within 7 days or less. We have curated a group of Technical Interview experts for Clients who face shortage of internal Interview Panels. We help you to move away from the old and soiled hierarchical business structure, and evolve into a 21st Century on-demand, open talent, cross-functional team; with a skilled and passionate workforce who are more engaged, effective & productive. Welcome to Skillety – Your on-demand HR solutions partner.</p>
                        </div>

                        <div className="about--milestone-section">
                            <div className='about--headingarea'>
                                <h6 data-aos="fade-down">Milestone numbers</h6>
                                <h4 className='about--milestone-heading' data-aos="fade-up">Achieving <span>Milestones</span></h4>
                            </div>
                            <div className="about--milestone-cards-area">
                                <div className="row">
                                    <div className="col-12 col-lg-6 col-xl-4 col-md-6 ab--milestone-container">
                                        <article className='about--milestone-card' data-aos="zoom-out-right">
                                            <div className="ab--milestone-card-top">
                                                <div className="ab--milestone--arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                        <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#5C3B2E" stroke-width="3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ab--milestone-card-right">
                                                <h6 className='ab--milestone-title'>Total Registered Users</h6>
                                                <h2 className='ab-milestone-number' data-target="130">0</h2>
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 col-md-6 ab--milestone-container">
                                        <article className='about--milestone-card' data-aos="zoom-out-right">
                                            <div className="ab--milestone-card-top">
                                                <div className="ab--milestone--arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                        <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#5C3B2E" stroke-width="3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ab--milestone-card-right">
                                                <h6 className='ab--milestone-title'>New Registrations per day</h6>
                                                <h2 className='ab-milestone-number' data-target="200">0</h2>
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 col-md-6 ab--milestone-container">
                                        <article className='about--milestone-card' data-aos="zoom-out-right">
                                            <div className="ab--milestone-card-top">
                                                <div className="ab--milestone--arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                        <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#5C3B2E" stroke-width="3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ab--milestone-card-right">
                                                <h6 className='ab--milestone-title'>Total Clients</h6>
                                                <h2 className='ab-milestone-number' data-target="202">0</h2>
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 offset-xl-4 col-md-6 ab--milestone-container">
                                        <article className='about--milestone-card' data-aos="zoom-out-right">
                                            <div className="ab--milestone-card-top">
                                                <div className="ab--milestone--arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                        <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#5C3B2E" stroke-width="3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ab--milestone-card-right">
                                                <h6 className='ab--milestone-title'>Total Candidates placed</h6>
                                                <h2 className='ab-milestone-number' data-target="147">0</h2>
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 col-md-6 ab--milestone-container">
                                        <article className='about--milestone-card' data-aos="zoom-out-right">
                                            <div className="ab--milestone-card-top">
                                                <div className="ab--milestone--arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                        <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#5C3B2E" stroke-width="3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ab--milestone-card-right">
                                                <h6 className='ab--milestone-title'>Offer-to-Joining Conversion rate</h6>
                                                <h2 className='ab-milestone-number' data-target="347">0</h2>
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 offset-xl-8 col-md-6 ab--milestone-container">
                                        <article className='about--milestone-card' data-aos="zoom-out-right">
                                            <div className="ab--milestone-card-top">
                                                <div className="ab--milestone--arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                                                        <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#5C3B2E" stroke-width="3" />
                                                        <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#5C3B2E" stroke-width="3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ab--milestone-card-right">
                                                <h6 className='ab--milestone-title'>Placements per Year</h6>
                                                <h2 className='ab-milestone-number' data-target="540">0</h2>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid container-section about--weoffer-section">
                            <div className="about--weoffer-container">
                                <div className='ab-weoff--top-area'>
                                    <h4 className='ab-weoff---heading' data-aos="fade-up">We offer you 4 advantages, most of all.</h4>
                                    <div className='ab--weoff-btn-area'>
                                        <a href="#" className='ab--weoff-btn-area-sub' data-aos="fade-right">
                                            <div className='ab--weoff-btn'>Register Now
                                            </div>
                                            <div className='ab--weoff-btn-arrow-area'>
                                                {/* <img src="assets/img/home-images/arrow-dark.png" className='ab--weoff-btn-arrow' alt="" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                    <path d="M2.56641 3.44963C6.17752 6.50518 15.5664 10.4496 24.2331 1.78296" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M24.5618 1.46021C21.07 4.65145 15.9586 13.4596 23.4473 23.1623" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className='ab--weoff-card-area'>
                                    <article className='ab-weoff-card' data-aos="zoom-out-down">
                                        <div className="ab-weoff-card-arr-num-area">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="57" height="83" viewBox="0 0 57 83" fill="none">
                                                <path d="M2.07567 0V39.1595C1.54289 44.7537 3.67402 56.7413 13.2641 56.7413C22.8542 56.7413 32.7106 56.7413 36.4401 56.7413H47.6285" stroke="#5C3B2E" stroke-width="3" />
                                                <path d="M28.0222 33.0774C28.4891 40.6238 34.3193 55.821 53.905 56.2393" stroke="#5C3B2E" stroke-width="3" />
                                                <path d="M54.641 56.2617C47.0968 55.7608 31.2793 59.6021 28.3628 78.9739" stroke="#5C3B2E" stroke-width="3" />
                                            </svg>
                                            <h6 className='ab-weoff-card-num'>01</h6>
                                        </div>
                                        <div className="ab-we-off-card-des-area">
                                            <p className='ab-we-off-card-des'>Flexible staffing options which means that we provide you with skilled Freelancers, Part-timers & Contractors, for your technical & non-technical requirements, almost anytime.</p>
                                        </div>
                                    </article>
                                    <article className='ab-weoff-card' data-aos="zoom-out-down">
                                        <div className="ab-weoff-card-arr-num-area">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="57" height="83" viewBox="0 0 57 83" fill="none">
                                                <path d="M2.07567 0V39.1595C1.54289 44.7537 3.67402 56.7413 13.2641 56.7413C22.8542 56.7413 32.7106 56.7413 36.4401 56.7413H47.6285" stroke="#5C3B2E" stroke-width="3" />
                                                <path d="M28.0222 33.0774C28.4891 40.6238 34.3193 55.821 53.905 56.2393" stroke="#5C3B2E" stroke-width="3" />
                                                <path d="M54.641 56.2617C47.0968 55.7608 31.2793 59.6021 28.3628 78.9739" stroke="#5C3B2E" stroke-width="3" />
                                            </svg>
                                            <h6 className='ab-weoff-card-num'>02</h6>
                                        </div>
                                        <div className="ab-we-off-card-des-area">
                                            <p className='ab-we-off-card-des'>Extensive database of highly skilled & passionate professionals, carefully hand-picked from thousands who apply.</p>
                                        </div>
                                    </article>
                                    <article className='ab-weoff-card' data-aos="zoom-out-down">
                                        <div className="ab-weoff-card-arr-num-area">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="57" height="83" viewBox="0 0 57 83" fill="none">
                                                <path d="M2.07567 0V39.1595C1.54289 44.7537 3.67402 56.7413 13.2641 56.7413C22.8542 56.7413 32.7106 56.7413 36.4401 56.7413H47.6285" stroke="#5C3B2E" stroke-width="3" />
                                                <path d="M28.0222 33.0774C28.4891 40.6238 34.3193 55.821 53.905 56.2393" stroke="#5C3B2E" stroke-width="3" />
                                                <path d="M54.641 56.2617C47.0968 55.7608 31.2793 59.6021 28.3628 78.9739" stroke="#5C3B2E" stroke-width="3" />
                                            </svg>
                                            <h6 className='ab-weoff-card-num'>03</h6>
                                        </div>
                                        <div className="ab-we-off-card-des-area">
                                            <p className='ab-we-off-card-des'>Absolutely no direct-employment liabilities whatsoever, but still your milestones are achieved on time. Operations never stop.</p>
                                        </div>
                                    </article>
                                    <article className='ab-weoff-card' data-aos="zoom-out-down">
                                        <div className="ab-weoff-card-arr-num-area">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="57" height="83" viewBox="0 0 57 83" fill="none">
                                                <path d="M2.07567 0V39.1595C1.54289 44.7537 3.67402 56.7413 13.2641 56.7413C22.8542 56.7413 32.7106 56.7413 36.4401 56.7413H47.6285" stroke="#5C3B2E" stroke-width="3" />
                                                <path d="M28.0222 33.0774C28.4891 40.6238 34.3193 55.821 53.905 56.2393" stroke="#5C3B2E" stroke-width="3" />
                                                <path d="M54.641 56.2617C47.0968 55.7608 31.2793 59.6021 28.3628 78.9739" stroke="#5C3B2E" stroke-width="3" />
                                            </svg>
                                            <h6 className='ab-weoff-card-num'>04</h6>
                                        </div>
                                        <div className="ab-we-off-card-des-area">
                                            <p className='ab-we-off-card-des'>We cut your hiring costs down by 50%, straight. Sometimes, even more than that.</p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    )
}
export default About;