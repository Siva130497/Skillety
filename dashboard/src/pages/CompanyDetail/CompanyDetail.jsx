import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import './CompanyDetail.css';
import './CompanyDetail-responsive.css';
import $ from 'jquery';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

const CompanyDetail = () => {
    const { id } = useParams();
    const [companyDetail, setCompanyDetail] = useState();
    const [clientImg, setClientImg] = useState();
    const [clientImgUrl, setClientImgUrl] = useState("");
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [jobs, setJobs] = useState([]);

    const breakpoints = {
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 2.5,
        },
        1200: {
          slidesPerView: 2.7,
        },
        1400: {
          slidesPerView: 3.5,
        },
      };
    

    useEffect(() => {
        $(document).ready(function () {
        });

    }, []);

    useEffect(()=>{
        if(id){
            axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
            })
            .catch(err=>console.log(err))

            axios.get(`https://skillety.onrender.com/client-image/${id}`)
                .then(res => setClientImg(res.data))
                .catch(err => console.log(err))

            axios.get(`https://skillety.onrender.com/my-active-jobs/${id}`)
                .then((res => {
                    console.log(res.data)
                    setJobs(res.data);
                }))
                .catch(err => {
                    console.log(err)
                })
        }
    },[id])

    useEffect(() => {
        if (clientImg) {
            setClientImgUrl(`https://skillety.onrender.com/client_profile/${clientImg.image}`)
        }

    }, [clientImg]);

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <Layout />

                {companyDetail && <div class="main-content">
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
                                                <img src={clientImgUrl ? clientImgUrl : "../assets/img/talents-images/avatar.jpg"} className="com-det-logo" alt="" />
                                            </div>
                                            <div className="com-det-name">{companyDetail?.companyName}</div>
                                            <div className="com-type">
                                                {companyDetail?.industry}
                                            </div>
                                        </div>

                                        <div className="card comp-det-card prof-det">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="com-main-detail-area mb-3" onClick={()=> window.location.href = `mailto:${companyDetail?.email}`}>
                                                        <i class="bi bi-envelope-fill"></i>
                                                        <a className='com-det-main-content' href={`mailto:${companyDetail?.email}`}>{companyDetail?.email}</a>
                                                    </div>
                                                    {/* <hr /> */}
                                                    <div className="com-main-detail-area mb-3" onClick={()=>window.location.href = `tel:${companyDetail?.phone}`}>
                                                        <i class="bi bi-telephone-fill"></i>
                                                        <a className='com-det-main-content' href={`tel:${companyDetail?.phone}`}>{companyDetail?.phone}</a>
                                                    </div>
                                                    {/* <hr /> */}
                                                    <div className="com-main-detail-area">
                                                        <i class="bi bi-geo-alt-fill"></i>
                                                        <a className='com-det-main-content' href="#" target='_blank'>{companyDetail?.location}</a>
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
                                                <div className="com-det-content">{companyDetail?.count}</div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                <div className="com-det-title">Vision</div>
                                            </div>
                                            <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                <div className="com-det-content">
                                                    {companyDetail?.vision}
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
                                                    {companyDetail?.mission}
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
                                                    {companyDetail?.shortDescription}
                                                </div>
                                                <div className="com-det-content mt-3">
                                                    {companyDetail?.longDescription}
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
                                                        {selectedBenefits.map(benefit=>{
                                                            return(
                                                                <li>{benefit}</li>
                                                            )
                                                        })}
                                                        
                                                        {/* <li>Sick Leave</li>
                                                        <li>Job Training</li>
                                                        <li>Work From Home</li>
                                                        <li>Maternity/Parental Leave</li> */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="candidate--slider-area" data-aos="fade-left">
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={3.5}
                                    loop={false}
                                    speed={1500}
                                    navigation={{
                                    nextEl: '.swiper-button-next2',
                                    prevEl: '.swiper-button-prev2',
                                    }}
                                    grabCursor={true}
                                    breakpoints={breakpoints}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    autoplay={{
                                    delay: 5000,
                                    waitForTransition: true,
                                    // stopOnLastSlide: false,
                                    disableOnInteraction: false,
                                    }}

                                >
                                    {jobs.map((job) => {
                                    const matchingImg = clientImg ? clientImg.find(img => img.id === job.companyId) : null;
                                    const imgSrc = matchingImg ? `https://skillety.onrender.com/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
                                    return (
                                        <SwiperSlide key={job.id}>
                                        <article className='cand--job-card'>
                                            <div className="cand--job-card-role-area">
                                            <div className="cand--job-card-role-icon-area">
                                                <i class="bi bi-file-earmark-code-fill"></i>
                                            </div>
                                            <div className="cand--job-card-role">
                                                {job.jobRole[0]}
                                            </div>
                                            </div>
                                            <div className="cand--job-card-logo-loc-area row">
                                            <div className="col-6">
                                                <div className="cand--job-card-logo-area">
                                                <img src={imgSrc} className='cand--job-card-logo' alt="" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="cand--job-card-loc-area">
                                                <div className="cand--job-card-location">
                                                    <i class="bi bi-geo-alt-fill"></i>
                                                    {job.location}
                                                </div>
                                                <div className="cand--job-card-location mt-1">
                                                    <i class="bi bi-briefcase-fill job-icon"></i>
                                                    {job.jobCategory}
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="cand--job-card-desc-area">
                                            <p className='cand--job-card-desc'>
                                                {job.jobDescription}
                                            </p>
                                            <span className='slide-down-view'>
                                                <i class="bi bi-chevron-double-down me-2"></i>
                                                Scroll to view more...
                                            </span>
                                            </div>
                                            <a href={`/job-detail/${job.id}`} className="cand--job-card-bottom-area">
                                            <span className='cand--job-know-more'>KNOW MORE</span>
                                            <span className='cand--job-card-arrow-area'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                                <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                                </svg>
                                            </span>
                                            </a>
                                        </article>
                                        </SwiperSlide>
                                    )
                                    })}
                                </Swiper>

                            </div>
                        </div>
                    </section>
                </div>}

                <Footer />
            </div>
        </div>
    )
}

export default CompanyDetail