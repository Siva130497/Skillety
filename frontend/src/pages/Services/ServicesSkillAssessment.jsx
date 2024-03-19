import React from 'react';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import './Services.css';
import './Services-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';

const ServicesSkillAssessment = () => {
    const [clientToken, setClientToken] = useState("");

    const [talentJobPostContent, setTalentJobPostContent] = useState([]);

    useEffect(()=>{
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_60,content_63,content_36,content_37")
        .then(res=>{
          console.log(res.data);
          setTalentJobPostContent(res.data);
        }).catch(err=>console.log(err));
      },[])


    useEffect(() => {
        setClientToken(JSON.parse(localStorage.getItem("clientToken")))
    }, [clientToken])

    return (
        <div>
            <Layout service={true} />
            <div>
                <div className='container-fluid services--section'>
                    <div className='container-fluid container-section'>
                        <div className="about--bg service-bg">
                            <div className="row">
                                <div className="col-12 col-xl-8 col-lg-12 col-md-12 about--left-cover">
                                    <div className="breadcrumb--area" data-aos="fade-down">
                                        <div className="breadcrumb--item">
                                            <a href="/client-home">Home</a>
                                        </div>
                                        <div className="breadcrumb--item">
                                            <p>Services</p>
                                        </div>
                                        <div className="breadcrumb--item">
                                            <p>
                                            {talentJobPostContent.find(content=>content.id === "content_3")?.content ||
                                                "Skill Assessment"}
                                                </p>
                                        </div>
                                    </div>
                                    <div className="services--head">
                                        <h2 data-aos="fade-left">
                                        {talentJobPostContent.find(content=>content.id === "content_60")?.content ||
                                                "Our primary mission is to provide our Clients  with ‘convenience’."}
                                            </h2>
                                    </div>
                                </div>

                                {!clientToken &&
                                    <div className="col-12 col-xl-4 col-lg-6 offset-lg-6 offset-xl-0 col-md-12 about--right-cover">
                                        <div className="about--card-area">
                                            <div className="card about--card" data-aos="fade-right">
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

                        <div className="service-par">
                            <p>
                            {talentJobPostContent.find(content=>content.id === "content_63")?.content ||
                                                "Skillety stands out as a Job Portal for Immediate Joiners, featuring a comprehensive suite of hiring solutions – CV Sourcing, Job Postings, Assessments, L1-Interviews, and Background Verification, seamlessly integrated into one platform. This consolidation cuts the TAT for new hires by an impressive 30-50%. Our pay-as-you-go model ensures straightforward billing and performance evaluation, prioritising end-results. As your end-to-end recruitment powerhouse, Skillety is the ultimate Digital-RPO partner committed to optimising your recruitment journey with precision and efficiency."}
                            </p>
                        </div>

                        <div className="ser--content-section">
                            <h3 className='ser--content-heading' data-aos="fade-left">
                            {talentJobPostContent.find(content=>content.id === "content_36")?.content ||
                                                "SKILL ASSESSMENT"}
                                </h3>
                            <div className="ser--detail-area">
                                <div className="row custom-border-bottom custom-border-top">
                                    <div className="col-12 col-lg-7 col-md-12 custom-border-right ser--cont-img-area img--3" data-aos="fade" data-aos-delay="200">
                                        <div className="ser--cont-sub-img-area">
                                            {/* <img src="assets/img/service-images/service-img1.png" className='ser--cont-img' alt="" /> */}
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-5 col-md-12 custom-padding-lr">
                                        <div className="ser--cont-area-right">
                                            <p className='ser--cont-title' data-aos="fade">
                                            {talentJobPostContent.find(content=>content.id === "content_37")?.content ||
                                                "Send Technical Assessment test links to multiple candidates, simultaneously. The Test Report comes with a comprehensive analysis of their aptitude, knowledge and proficiency."}
                                            </p>
                                            {/* <div className='ser--cont-list-area'>
                                                <ul>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                    <li className='ser--cont-list-item' data-aos="fade-left">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </li>
                                                </ul>
                                            </div> */}
                                            {/* <div className="ser--cont-btn-area">
                                                <a href="#" className='ser--cont-btn-sub' data-aos="fade-left">
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
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="ser--more-btn-area">
                            <a href="" className='ser--more-btn' data-aos="fade-up">More...</a>
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>


    )
}
export default ServicesSkillAssessment;