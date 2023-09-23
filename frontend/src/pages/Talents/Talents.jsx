import React from 'react'
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from 'jquery';
import './Talents.css'
import './Talents-responsive.css'
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const Talents = () => {
    useEffect(() => {

        $(document).ready(function () {
            let isBlurred = true;

            $("#toggleBlur").click(function () {
                if (isBlurred) {
                    $("#con_detail1, #con_detail2").removeClass("blurred");
                    $(this).text("To Hide/Hire Talents");
                } else {
                    $("#con_detail1, #con_detail2").addClass("blurred");
                    $(this).text("To View/Hire Talents");
                }
                isBlurred = !isBlurred;
            });
        });


    }, []);

    const breakpoints = {
        320: {
            slidesPerView: 1,
        },
        480: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 1,
        },
        991: {
            slidesPerView: 1.5,
        },
    };

    return (
        <div>
            <Layout candidateHome={true}/>
            <div className='talents--section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="custom--container">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <a className='sub--bredcrumb-link' href="/talents">Talents profile</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Talents profile Details</p>
                                </div>
                            </div>

                            <div className="talent--profile-section">
                                <div className="row custom-border-top1 custom-border-bottom1">
                                    <div className="col-12 col-lg-6 col-md-12 talent--profile-img-container" data-aos="fade" data-aos-delay="200">
                                    </div>
                                    <div className="col-12 col-lg-6 col-md-12 talent--profile-content-container">
                                        <div className="tal--profile-content-area">
                                            <h4 className='tal--profile-title' data-aos="fade-left">Raquel Harrison</h4>
                                            <a href='#' className='tal--profile-role' data-aos="fade-right">
                                                <i class="bi bi-file-earmark-code-fill"></i>
                                                <span>Frontend Developer</span>
                                            </a>
                                            <div className="tal--pro-status-area" data-aos="fade-right">
                                                <div className="row">
                                                    <div className="col-6 col-md-5">
                                                        <i class="ri-star-fill tal--pro-rate-icon"></i>
                                                        <span className='tal--pro-rating'>4.5</span>
                                                    </div>
                                                    <div className="col-6 col-md-7">
                                                        <h6 className='tal--pro-experince'>Experience : <span>5 Yrs</span></h6>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-6 col-md-5">
                                                        <i class="bx bxs-map tal--pro-location-icon"></i>
                                                        <span className='tal--pro-location'>Hyderabad</span>
                                                    </div>
                                                    <div className="col-6 col-md-7">
                                                        <h6 className='tal--pro-join'>Immediate Joiner</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tal--pro-skill-area" data-aos="fade-up">
                                                <h4 className="tal--pro-skill">Skills matched</h4>
                                                <h2 className="tal--pro-skill-per">90%</h2>
                                            </div>
                                            <div className="tal--pro-desc-area" data-aos="fade-left">
                                                <p className='tal--pro-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                <p className='tal--pro-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                <p className='tal--pro-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                <p className='tal--pro-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                            </div>
                                            <div className="tal--pro-contact-area">
                                                <h4 className='tal--pro-contact-title' data-aos="fade-right">Contact</h4>
                                                <div className="row">
                                                    <div className="col-12 col-lg-7" data-aos="fade-left">
                                                        <div className="row">
                                                            <div className="col-5 col-lg-5 col-md-3">
                                                                <h5 className="tal--pro-contact-detail-title">Mobile No:</h5>
                                                            </div>
                                                            <div className="col-7 col-lg-7 col-md-9">
                                                                <h5 id='con_detail1' className="tal--pro-contact-detail blurred">+9100000000</h5>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-5 col-lg-5 col-md-3">
                                                                <h5 className="tal--pro-contact-detail-title">Email Id:</h5>
                                                            </div>
                                                            <div className="col-7 col-lg-7 col-md-9">
                                                                <h5 id='con_detail2' className="tal--pro-contact-detail blurred">test@demoin.com</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="tal--pro-btn-area">
                                            <div className="tal--pro-view-btn-area">
                                                <button id='toggleBlur' data-aos="fade-right" className='tal--pro-view-btn'>To View/Hire Talents</button>
                                            </div>
                                            <div className="tal--pro-choose-btn-area">
                                                <a href="#" className='ser--cont-btn-sub' data-aos="fade-right">
                                                    <div className='ser--cont-btn'>
                                                        Choose a plan
                                                    </div>
                                                    <div className='ser--cont-arrow-area'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                            <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                            <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                            <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="custom--container1">
                    <div className="talent--more-profile-section">
                        <h3 className='talent--more-profile-title' data-aos="fade-up">More Profile for Frontend Developer</h3>
                        <div className="talent--more-profile-slider-area">
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={35}
                                slidesPerView={1.5}
                                loop={true}
                                speed={1500}
                                navigation={{
                                    nextEl: '.swiper-button-next1',
                                    prevEl: '.swiper-button-prev1',
                                }}
                                grabCursor={true}
                                breakpoints={breakpoints}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                autoplay={{
                                    delay: 5000,
                                    waitForTransition: true,
                                    stopOnLastSlide: false,
                                    disableOnInteraction: false,
                                }}

                            >
                                <SwiperSlide>
                                    <article className="talent--profile-card" data-aos="fade-left">
                                        <div className="row custom-col-reverse">
                                            <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                <div className="tal--pro-card-tags">
                                                    <h6 className='tal--pro-card-rating'>
                                                        <i class="ri-star-fill"></i>
                                                        <span>4.9</span>
                                                    </h6>
                                                    <h6 className='tal--pro-card-exp'>
                                                        Experience : 6 Yrs
                                                    </h6>
                                                    <h6 className='tal--pro-card-location'>
                                                        <i class="bx bxs-map"></i>
                                                        <span>Hyderabad</span>
                                                    </h6>
                                                    <h6 className='tal--pro-card-role'>
                                                        Frontend Developer
                                                    </h6>
                                                </div>
                                                <div className="tal--pro-card-desc-area">
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                <div className="tal--pro-card-ability-area">
                                                    <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                    <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                </div>
                                                <div className='tal--pro-card-number-area'>
                                                    <h2 className='tal--pro-card-percentage'>90%</h2>
                                                    <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                </div>
                                                <div className='tal--pro-card-know-btn-area'>
                                                    <a href="" className='tal--pro-card-know-btn'>Know More</a>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <article className="talent--profile-card" data-aos="fade-left">
                                        <div className="row custom-col-reverse">
                                            <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                <div className="tal--pro-card-tags">
                                                    <h6 className='tal--pro-card-rating'>
                                                        <i class="ri-star-fill"></i>
                                                        <span>4.9</span>
                                                    </h6>
                                                    <h6 className='tal--pro-card-exp'>
                                                        Experience : 6 Yrs
                                                    </h6>
                                                    <h6 className='tal--pro-card-location'>
                                                        <i class="bx bxs-map"></i>
                                                        <span>Hyderabad</span>
                                                    </h6>
                                                    <h6 className='tal--pro-card-role'>
                                                        Frontend Developer
                                                    </h6>
                                                </div>
                                                <div className="tal--pro-card-desc-area">
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                <div className="tal--pro-card-ability-area">
                                                    <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                    <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                </div>
                                                <div className='tal--pro-card-number-area'>
                                                    <h2 className='tal--pro-card-percentage'>90%</h2>
                                                    <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                </div>
                                                <div className='tal--pro-card-know-btn-area'>
                                                    <a href="" className='tal--pro-card-know-btn'>Know More</a>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <article className="talent--profile-card" data-aos="fade-left">
                                        <div className="row custom-col-reverse">
                                            <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                <div className="tal--pro-card-tags">
                                                    <h6 className='tal--pro-card-rating'>
                                                        <i class="ri-star-fill"></i>
                                                        <span>4.9</span>
                                                    </h6>
                                                    <h6 className='tal--pro-card-exp'>
                                                        Experience : 6 Yrs
                                                    </h6>
                                                    <h6 className='tal--pro-card-location'>
                                                        <i class="bx bxs-map"></i>
                                                        <span>Hyderabad</span>
                                                    </h6>
                                                    <h6 className='tal--pro-card-role'>
                                                        Frontend Developer
                                                    </h6>
                                                </div>
                                                <div className="tal--pro-card-desc-area">
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                <div className="tal--pro-card-ability-area">
                                                    <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                    <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                </div>
                                                <div className='tal--pro-card-number-area'>
                                                    <h2 className='tal--pro-card-percentage'>90%</h2>
                                                    <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                </div>
                                                <div className='tal--pro-card-know-btn-area'>
                                                    <a href="" className='tal--pro-card-know-btn'>Know More</a>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <article className="talent--profile-card" data-aos="fade-left">
                                        <div className="row custom-col-reverse">
                                            <div className="col-12 col-lg-9 col-md-8 tal--pro-card-left-area">
                                                <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                <div className="tal--pro-card-tags">
                                                    <h6 className='tal--pro-card-rating'>
                                                        <i class="ri-star-fill"></i>
                                                        <span>4.9</span>
                                                    </h6>
                                                    <h6 className='tal--pro-card-exp'>
                                                        Experience : 6 Yrs
                                                    </h6>
                                                    <h6 className='tal--pro-card-location'>
                                                        <i class="bx bxs-map"></i>
                                                        <span>Hyderabad</span>
                                                    </h6>
                                                    <h6 className='tal--pro-card-role'>
                                                        Frontend Developer
                                                    </h6>
                                                </div>
                                                <div className="tal--pro-card-desc-area">
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Lorem Ipsum&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-3 col-md-4 tal--pro-card-right-area">
                                                <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                <div className="tal--pro-card-ability-area">
                                                    <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                    <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                </div>
                                                <div className='tal--pro-card-number-area'>
                                                    <h2 className='tal--pro-card-percentage'>90%</h2>
                                                    <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                </div>
                                                <div className='tal--pro-card-know-btn-area'>
                                                    <a href="" className='tal--pro-card-know-btn'>Know More</a>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                    </div>
                </div>
                <div className="tal--pro-slider-btn-area" data-aos="fade-up">
                    <div className='tal--pro-slider-btn-sub'>
                        <button className="tal--pro-slider-btn swiper-button-prev1">
                            <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                            </svg>
                        </button>
                        <button className="tal--pro-slider-btn swiper-button-next1">
                            <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Talents;