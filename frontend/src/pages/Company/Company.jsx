import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './Company.css';
import './Company-responsive.css';
import { CandidateFooter } from '../../components/CandidateFooter';
import LayoutNew from '../../components/LayoutNew';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios'
import { useState } from 'react';

const Company = () => {
    const [candidateToken, setcandidateToken] = useState("");
    const { getClientImg, clientImg } = useContext(AuthContext);
    const [allJobs, setAllJobs] = useState([]);
    const [allCompany, setAllCompany] = useState([])
    useEffect(() => {

    }, []);

    const getPostedjobs = async () => {
        try {
            const res = await axios.get(`https://skillety-n6r1.onrender.com/posted-jobs`, {
                headers: {
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAllJobs(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getClientImg();
        getPostedjobs();

        axios.get("https://skillety-n6r1.onrender.com/company-details")
            .then(res => {
                console.log(res.data);
                setAllCompany(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        setcandidateToken(JSON.parse(localStorage.getItem('candidateToken')))
    }, [candidateToken]);

    return (
        <div>
            <LayoutNew />
            <div className='container-fluid contact--section'>
                <div className='container-fluid container-section'>
                    <div className="about--bg candidate">
                        <div className="row">
                            <div className="col-12 col-xl-8 col-lg-12 col-md-12 about--left-cover">
                                <div className="breadcrumb--area candidate" data-aos="fade-down">
                                    <div className="breadcrumb--item">
                                        <a href="/">Home</a>
                                    </div>
                                    <div className="breadcrumb--item">
                                        <p>Companies</p>
                                    </div>
                                </div>
                                <div className="about--head candidate">
                                    <h2 data-aos="fade-left">Work for the best companies in the world</h2>
                                </div>
                            </div>
                            <div className="col-12 col-xl-4 col-lg-6 offset-lg-6 offset-xl-0 col-md-12 about--right-cover">
                                <div className="about--card-area">
                                    <div className="card about--card candidate" data-aos="fade-right">
                                        <div className="card--imgicon-area">
                                            <h6 className='card--text candidate'>I am an immediate joiner</h6>
                                            <img src="assets/img/home-images/clipboard-img.png" className='card--icon candidate' alt="" />
                                        </div>
                                        <div className="about--sub-des candidate">
                                            <p>
                                                You're just One Click away from the best opportunities.
                                            </p>
                                        </div>
                                        <a href='/candidate-login' className="arrow--icon-btn candidate">
                                            <img src="assets/img/home-images/arrow-dark.png" className='arrow--icon' alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='companies--section'>
                        <div className="con--where-container">
                            <h4 className='company--heading' data-aos="fade-up">Pick your dream <span>Company!!!</span></h4>

                            <div className="company--content-area">
                                {allCompany
                                    .filter(company => {
                                        const jobOpening = allJobs.filter(job => job.companyId === company.companyId).length;
                                        return allCompany.length > 0 && jobOpening > 0;
                                    })
                                    .sort((a, b) => {
                                        const jobOpeningA = allJobs.filter(job => job.companyId === a.companyId).length;
                                        const jobOpeningB = allJobs.filter(job => job.companyId === b.companyId).length;
                                        return jobOpeningB - jobOpeningA;
                                    })
                                    .slice(0, 15)
                                    .map(company => {
                                        const matchingImg = clientImg ? clientImg.find(img => img.id === company.companyId) : null;
                                        const imgSrc = matchingImg ? `data:image/jpeg;base64,${matchingImg.image}` : "../assets/img/talents-images/no-image1.png";
                                        const jobOpening = allJobs.filter(job => job.companyId === company.companyId).length;

                                        return (
                                            <div key={company.companyId} className="row company--content-row custom-row-border-top">
                                                <div className="col-12 col-xl-2 col-lg-2 col-sm-4 col-md-4 company--content-img-area">
                                                    <img src={imgSrc} data-aos="fade" className='company--content-img cand-home' loading='lazy' alt="" />
                                                </div>
                                                <div className="col-12 col-xl-3 col-lg-3 col-sm-4 col-md-4 company--content-jobs-area">
                                                    <div className='company--content-jobs' data-aos="zoom-out">{jobOpening}<span> Jobs Opening</span></div>
                                                    <div className='home-company-name mt-2' data-aos="zoom-out">{company.companyName}</div>
                                                </div>

                                                <div className="col-12 col-xl-3 col-lg-3 col-sm-4 col-md-4 company--content-jobs-area">
                                                    <div className='company--content-industry' data-aos="zoom-out">{company.industry}</div>
                                                </div>

                                                <div className="col-12 col-xl-4 col-lg-4 col-md-12 company--content-desc-area">
                                                    <p className='company--content-desc' data-aos="fade-right">{company.shortDescription}</p>
                                                    <div className='company--content-apply-btn-area' data-aos="fade-right">
                                                        <a href={`/company-info/${company.companyId}`} className='company--content-apply-btn'>
                                                            <div className='company--content-apply-btn-sub'>
                                                                Apply Now
                                                            </div>
                                                            <div className='company--content-apply-arrow'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15" fill="none">
                                                                    <path d="M2.10205 2.10666C4.02798 3.73629 9.03538 5.84 13.6576 1.21777" stroke="#5C3B2E" strokeWidth="2" />
                                                                    <path d="M13.8327 1.04564C11.9705 2.74763 9.24438 7.44531 13.2383 12.6201" stroke="#5C3B2E" strokeWidth="2" />
                                                                    <path d="M1.2666 14.1331L14.1555 0.799805" stroke="#5C3B2E" strokeWidth="2" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {!candidateToken &&
                            <div className="company-demo-card-area">
                                <div className='company-demo-card'>
                                    <div className="company-demo-card-desc-area">
                                        <p className='company-demo-card-desc' data-aos="fade-left">
                                            Fortune-500s to Multinational Corporations to Hypergrowth Start-ups across the world, from all industry sectors find their best Talent, right here on Skillety.
                                        </p>
                                    </div>
                                    <div className="company-demo-card-bottom-area">
                                        <h3 className='company-demo-card-title' data-aos="fade-down">LET'S GET YOU STARTED <br />
                                            WITH US, RIGHT NOW.</h3>

                                        <div className="company-demo-card-btn-area">
                                            <a href="/candidate-login" className='company-demo-card-btn' data-aos="fade-right">
                                                <div className='company-demo-card-btn-sub'>
                                                    Click here to login
                                                </div>
                                                <div className='company-demo-card-btn-arrow'>
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
                            </div>
                        }

                    </div>
                </div>
            </div>
            <CandidateFooter />
        </div>


    )
}
export default Company;