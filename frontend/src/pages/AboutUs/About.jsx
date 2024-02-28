import React from 'react';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import './About.css';
import './About-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';

const About = () => {
    const [clientToken, setClientToken] = useState("");
    const [talentAboutContent, setTalentAboutContent] = useState([]);

    useEffect(()=>{
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_53,content_54,content_42,content_43,content_44,content_45,content_46,content_47,content_48,content_49,content_50,content_51,content_52,content_67,content_55,content_56,content_57,content_58,content_59")
        .then(res=>{
          console.log(res.data);
          setTalentAboutContent(res.data);
        }).catch(err=>console.log(err));
      },[])

    useEffect(() => {
        setClientToken(JSON.parse(localStorage.getItem("clientToken")))
    }, [clientToken])

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
            <Layout aboutUs={true} />
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
                                        <h2 data-aos="fade-left">
                                        {talentAboutContent.find(content=>content.id === "content_53")?.content ||
                                            `Skillety simply means
                                            “Skill at Will”.`} </h2>
                                    </div>
                                </div>
                                {!clientToken &&
                                    <div className="col-12 col-lg-6 offset-lg-6 offset-xl-0 col-xl-4 col-md-12 about--right-cover">
                                        <div className="about--card-area" data-aos="fade-right">
                                            <div className="card about--card">
                                                <div className="card--imgicon-area">
                                                    <h6 className='card--text'>I want to hire an immediate joiner</h6>
                                                    <img src="assets/img/home-images/icon-1.png" className='card--icon' alt="" />
                                                </div>
                                                <div className="about--sub-des">
                                                    <p>
                                                        I need someone to start working right away, without any delay or waiting period.
                                                    </p>
                                                </div>
                                                <a href='/client-login' className="arrow--icon-btn">
                                                    <img src="assets/img/home-images/arrow-dark.png" className='arrow--icon' alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='about--desc-section'>
                            {/* <p data-aos="fade-left">We are a gig-economy based crowdsourcing platform for Freelancers. We have an exclusive vault of Immediate Joiners - guys who can pick up an Offer and Join within 7 days or less. We have curated a group of Technical Interview experts for Clients who face shortage of internal Interview Panels. We help you to move away from the old and soiled hierarchical business structure, and evolve into a 21st Century on-demand, open talent, cross-functional team; with a skilled and passionate workforce who are more engaged, effective & productive. Welcome to Skillety – Your on-demand HR solutions partner.</p> */}
                            <p data-aos="fade-left">
                            {talentAboutContent.find(content=>content.id === "content_54")?.content ||
                                "Welcome to Skillety, the global job portal engineered to redefine recruitment dynamics. With a dedicated focus on Immediate Joiners—individuals capable of starting within 7, 15, or 30 days—Skillety offers a comprehensive suite of cutting-edge hiring solutions. From CV sourcing and job postings to online assessments, L1 interviews, and background verification, our platform seamlessly consolidates these vital processes into one accessible hub. Backed by AI prowess, Skillety boasts integration with 172 partner job boards and social media platforms worldwide. This strategic alliance facilitates optimal visibility for job postings, utilizing inward aggregation to convert clicks into applications. At Skillety, we understand that talent acquisition is a dynamic endeavor that demands both speed and precision. Join us in revolutionizing recruitment, as we connect top-tier talent with unparalleled opportunities, driving success and growth for businesses and professionals alike. Welcome to the future of hiring. Welcome to Skillety."}</p>
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
                                                <h6 className='ab--milestone-title'>
                                                {talentAboutContent.find(content=>content.id === "content_42")?.content ||
                                                    "Total Registered Users"}</h6>
                                                <h2 className='ab-milestone-number' data-target=
                                                {talentAboutContent.find(content=>content.id === "content_43")?.content ||
                                                "210"}>0</h2>
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
                                                <h6 className='ab--milestone-title'>
                                                {talentAboutContent.find(content=>content.id === "content_44")?.content ||
                                                    "New Registrations per day"}</h6>
                                                <h2 className='ab-milestone-number' data-target=
                                                {talentAboutContent.find(content=>content.id === "content_45")?.content ||
                                                "450"}>0</h2>
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
                                                <h6 className='ab--milestone-title'>
                                                {talentAboutContent.find(content=>content.id === "content_46")?.content ||
                                                    "Total Clients"}</h6>
                                                <h2 className='ab-milestone-number' data-target=
                                                {talentAboutContent.find(content=>content.id === "content_47")?.content ||
                                                "202"}>0</h2>
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
                                                <h6 className='ab--milestone-title'>
                                                {talentAboutContent.find(content=>content.id === "content_48")?.content ||
                                                    "Total Candidates placed"}</h6>
                                                <h2 className='ab-milestone-number' data-target=
                                                {talentAboutContent.find(content=>content.id === "content_49")?.content ||
                                                "147"}>0</h2>
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
                                                <h6 className='ab--milestone-title'>
                                                {talentAboutContent.find(content=>content.id === "content_50")?.content ||
                                                    "Offer-to-Joining Conversion rate"}</h6>
                                                <h2 className='ab-milestone-number' data-target=
                                                {talentAboutContent.find(content=>content.id === "content_51")?.content ||
                                                "347"}>0</h2>
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
                                                <h6 className='ab--milestone-title'>
                                                {talentAboutContent.find(content=>content.id === "content_52")?.content ||
                                                    "Placements per Year"}</h6>
                                                <h2 className='ab-milestone-number' data-target=
                                                {talentAboutContent.find(content=>content.id === "content_67")?.content ||
                                                "540"}>0</h2>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid container-section about--weoffer-section">
                            <div className="about--weoffer-container">
                                <div className='ab-weoff--top-area'>
                                    <h4 className='ab-weoff---heading' data-aos="fade-up">
                                    {talentAboutContent.find(content=>content.id === "content_55")?.content ||
                                        "We offer you 4 advantages, most of all."}</h4>
                                    {!clientToken &&
                                        <div className='ab--weoff-btn-area'>
                                            <a href="/client-register" className='ab--weoff-btn-area-sub' data-aos="fade-right">
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
                                    }
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
                                            <p className='ab-we-off-card-des'>
                                            {talentAboutContent.find(content=>content.id === "content_56")?.content ||
                                                "India's first ever Global Job Portal. All sectors and regions covered across India, US, UK & EUR."}</p>
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
                                            <p className='ab-we-off-card-des'>
                                            {talentAboutContent.find(content=>content.id === "content_57")?.content ||
                                                "Special focus on Immediate Joiners - guys who can join within 7/15/30 days."}</p>
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
                                            <p className='ab-we-off-card-des'>
                                            {talentAboutContent.find(content=>content.id === "content_58")?.content ||
                                                "Offering diverse hiring solutions like CV Sourcing, Job Posting, Online Assessments, Interview Outsourcing and Background Verification."}</p>
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
                                            <p className='ab-we-off-card-des'>
                                                {talentAboutContent.find(content=>content.id === "content_59")?.content ||
                                                "AI-powered platform which is API integrated with 172 partner Job sites and Social Media sites, maximising job post visibility and applications."}</p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
export default About;