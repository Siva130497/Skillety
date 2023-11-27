import React from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from 'jquery';
import './JobDetail.css';
import './JobDetail-responsive.css';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

const JobDetail = () => {
    const {id} = useParams();

    const [job, setJob] = useState();
    const [allJobs, setAllJobs] = useState([]);

    const getPostedjobs = async() => {
        try{
            const res = await axios.get(`https://skillety.onrender.com/posted-jobs`, {
              headers: {
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setAllJobs(result.reverse());
              const jobDetail = result.find(job=>job.id === id)
              setJob(jobDetail);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
        }
      }

    useEffect(()=>{
        getPostedjobs();
    },[])
      console.log(job)

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
            slidesPerView: 1,
        },
        1200: {
            slidesPerView: 1.65,
        },
    };
    
    return (
        <div>
            {job ? 
                <div>
                    
                    <div className='talents--section'>
                        <div className='container-fluid'>
                            <div className='container-fluid container-section'>
                                <div className="custom--container">
                                    <div className="breadcrumb--area-dark" data-aos="fade-down">
                                        <div className="breadcrumb--item-dark">
                                            <a href="/candidate-home">Home</a>
                                        </div>
                                        <div className="breadcrumb--item-dark">
                                            <a className='sub--bredcrumb-link' href="/job-detail">Jobs</a>
                                        </div>
                                        <div className="breadcrumb--item-dark">
                                            <p>Job Details</p>
                                        </div>
                                    </div>

                                    <div className="job--detail-head-area">
                                        <h3 className='job--detail-head' data-aos="fade-left">JOB DETAILs</h3>
                                    </div>

                                    <div className="job--detail-content-section">
                                        <div className="row custom-border-top1 custom-border-bottom1">
                                            <div className="col-12 col-xl-4 col-lg-5 col-md-12 col-border-right">
                                                <div className="row full-height custom-border-bottom3">
                                                    <div className="col-12 col-lg-12 col-xl-12 col-md-6 custom-border-bottom2 custom-col-border-right job--detail-img-area">
                                                        <div className='col-border-bottom-for-mobile'>
                                                            <img src="../assets/img/jobs/job-logo-img.png" className='job--detail-img' alt="" data-aos="fade" data-aos-delay="200" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-12 col-xl-12 col-md-6 job--detail-days-area">
                                                        <h5 className='job--detail-can-join' data-aos="fade-down">Can Join in </h5>
                                                        <h2 className='job--detail-days' data-aos="fade-up">07<span>days</span></h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-xl-8 col-lg-7 col-md-12 job--detail-content-area">
                                                <div className='col-border-bottom-for-mobile'>
                                                    <a href='#' className='tal--profile-role' data-aos="fade-down">
                                                        <i class="bi bi-file-earmark-code-fill"></i>
                                                        <span>{job.jobRole[0]}</span>
                                                    </a>
                                                    <div className="job--detail-location-area" data-aos="fade">
                                                        <div>
                                                            <i class="bx bxs-map job--detail-location-icon"></i>
                                                            <span className='job--detail-location'>{job.location}</span>
                                                        </div>
                                                        <div className='job--detail-experience'>Experience :&nbsp;<span>{job.year > 0 ? job.year+ 'years' : "" + job.month > 0 ? job.month+ 'months' : ""}</span></div>
                                                    </div>
                                                    <div className='job--detail-job-type' data-aos="fade">Job type :&nbsp;<span>{job.jobCategory}</span></div>

                                                    <div className="job--detail-desc-area">
                                                        <p className='job--detail-desc' data-aos="fade">{job.jobDescription}</p>
                                                    </div>
                                                    <div className="job--detail-skills-area">
                                                        <h6 className='job--detail-skill-title' data-aos="fade">Skills Required :</h6>
                                                        <div className='job--detail-skills-list'>
                                                            <ul>
                                                                {job.skills.map((skill)=>{
                                                                    return(
                                                                        <li className='job--detail-skills-list-item' data-aos="fade-left">{skill}</li>
                                                                    )
                                                                })}
                                                                
                                                                {/* <li className='job--detail-skills-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text</li>
                                                                <li className='job--detail-skills-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text</li>
                                                                <li className='job--detail-skills-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text</li>
                                                                <li className='job--detail-skills-list-item' data-aos="fade-left">Lorem Ipsum is simply dummy text</li> */}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="job--detail-desc-area2">
                                                        <p className='job--detail-desc' data-aos="fade">{job.jobDescription}</p>
                                                    </div>

                                                    <div className="job--detail-apply-btn-area">
                                                        <a href="#" className='ser--cont-btn-sub candidate' data-aos="fade-left">
                                                            <div className='ser--cont-btn candidate'>
                                                                Apply for this Job
                                                            </div>
                                                            <div className='ser--cont-arrow-area candidate'>
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="custom--container1">
                            <div className="job--detail-more-section">
                                <div className="job--detail-head-area">
                                    <h3 className='job--detail-head' data-aos="fade-up">More job like this</h3>
                                </div>
                                <div className="job--detail-more-slider-area">
                                    <Swiper
                                        modules={[Navigation, Autoplay]}
                                        spaceBetween={35}
                                        slidesPerView={1.5}
                                        loop={true}
                                        speed={1500}
                                        navigation={{
                                            nextEl: '.swiper-button-next3',
                                            prevEl: '.swiper-button-prev3',
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
                                        {allJobs.map((job)=>{
                                            return(
                                                <SwiperSlide>
                                                    <article className='job--detail-card' data-aos="fade-left">
                                                        <div className="job--detail-card-top-area">
                                                            <div>
                                                                <h5 className='job--detail-card-role'>{job.jobRole[0]}</h5>
                                                                <div className="job--detail-card-review-area">
                                                                    <div className="job--detail-card-review">{job.companyName}</div>
                                                                    <div className='job--detail-card-rating'>
                                                                        <i class="ri-star-fill"></i>
                                                                        <span>4.9</span>
                                                                    </div>
                                                                    <div className="job--detail-card-review-count">
                                                                        879&nbsp;
                                                                        <span>Reviews</span>
                                                                    </div>
                                                                </div>

                                                                <div className="job--detail-card-location-area">
                                                                    <div className="job--detail-card-experience">
                                                                        <i class='bx bx-briefcase'></i>
                                                                        <span>{job.year > 0 ? job.year+ 'years' : "" + job.month > 0 ? job.month+ 'months' : ""}</span>
                                                                    </div>
                                                                    <div className="job--detail-card-experience">
                                                                        <i class='bx bx-rupee'></i>
                                                                        <span>Not disclosed</span>
                                                                    </div>
                                                                    <div className="job--detail-card-experience">
                                                                        <i class="bi bi-geo-alt-fill"></i>
                                                                        <span>{job.location}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="job--detail-card-img-area">
                                                                <img src="../assets/img/companies/company-1.png" className='job--detail-card-img' alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="job--detail-card-desc-area">
                                                            <p className='job--detail-card-desc'>{job.jobDescription} </p>
                                                        </div>
                                                        <div className="job--detail-card-bottom-area">
                                                            <div className='job--detail-card-tags-area'>
                                                                {job.skills.map((skill, index)=>{
                                                                    return(
                                                                        <div className="job--detail-card-tag" key={index}>{skill}</div>
                                                                    )
                                                                })}
                                                                
                                                                {/* <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                                <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                                <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                                <div className="job--detail-card-tag">UX,Design & Archietect</div> */}
                                                            </div>
                                                            <div className="job--detail-card-know-more-btn-area">
                                                                <a href={`/job-detail/${job.id}`} className='job--detail-card-know-more-btn'>Know more</a>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </SwiperSlide>
                                            )
                                        })}
                                        

                                        {/* <SwiperSlide>
                                            <article className='job--detail-card' data-aos="fade-left">
                                                <div className="job--detail-card-top-area">
                                                    <div>
                                                        <h5 className='job--detail-card-role'>UX Designer</h5>
                                                        <div className="job--detail-card-review-area">
                                                            <div className="job--detail-card-review">Happiest Minds</div>
                                                            <div className='job--detail-card-rating'>
                                                                <i class="ri-star-fill"></i>
                                                                <span>4.9</span>
                                                            </div>
                                                            <div className="job--detail-card-review-count">
                                                                879&nbsp;
                                                                <span>Reviews</span>
                                                            </div>
                                                        </div>

                                                        <div className="job--detail-card-location-area">
                                                            <div className="job--detail-card-experience">
                                                                <i class='bx bx-briefcase'></i>
                                                                <span>0-4 Yrs</span>
                                                            </div>
                                                            <div className="job--detail-card-experience">
                                                                <i class='bx bx-rupee'></i>
                                                                <span>Not disclosed</span>
                                                            </div>
                                                            <div className="job--detail-card-experience">
                                                                <i class="bi bi-geo-alt-fill"></i>
                                                                <span>Hyderabad</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="job--detail-card-img-area">
                                                        <img src="assets/img/companies/company-2.png" className='job--detail-card-img' alt="" />
                                                    </div>
                                                </div>
                                                <div className="job--detail-card-desc-area">
                                                    <p className='job--detail-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                                                    <p className='job--detail-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                                                </div>
                                                <div className="job--detail-card-bottom-area">
                                                    <div className='job--detail-card-tags-area'>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                    </div>
                                                    <div className="job--detail-card-know-more-btn-area">
                                                        <a href="#" className='job--detail-card-know-more-btn'>Know more</a>
                                                    </div>
                                                </div>
                                            </article>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <article className='job--detail-card' data-aos="fade-left">
                                                <div className="job--detail-card-top-area">
                                                    <div>
                                                        <h5 className='job--detail-card-role'>UX Designer</h5>
                                                        <div className="job--detail-card-review-area">
                                                            <div className="job--detail-card-review">Happiest Minds</div>
                                                            <div className='job--detail-card-rating'>
                                                                <i class="ri-star-fill"></i>
                                                                <span>4.9</span>
                                                            </div>
                                                            <div className="job--detail-card-review-count">
                                                                879&nbsp;
                                                                <span>Reviews</span>
                                                            </div>
                                                        </div>

                                                        <div className="job--detail-card-location-area">
                                                            <div className="job--detail-card-experience">
                                                                <i class='bx bx-briefcase'></i>
                                                                <span>0-4 Yrs</span>
                                                            </div>
                                                            <div className="job--detail-card-experience">
                                                                <i class='bx bx-rupee'></i>
                                                                <span>Not disclosed</span>
                                                            </div>
                                                            <div className="job--detail-card-experience">
                                                                <i class="bi bi-geo-alt-fill"></i>
                                                                <span>Hyderabad</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="job--detail-card-img-area">
                                                        <img src="assets/img/companies/company-3.png" className='job--detail-card-img' alt="" />
                                                    </div>
                                                </div>
                                                <div className="job--detail-card-desc-area">
                                                    <p className='job--detail-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                                                    <p className='job--detail-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                                                </div>
                                                <div className="job--detail-card-bottom-area">
                                                    <div className='job--detail-card-tags-area'>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                    </div>
                                                    <div className="job--detail-card-know-more-btn-area">
                                                        <a href="#" className='job--detail-card-know-more-btn'>Know more</a>
                                                    </div>
                                                </div>
                                            </article>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <article className='job--detail-card' data-aos="fade-left">
                                                <div className="job--detail-card-top-area">
                                                    <div>
                                                        <h5 className='job--detail-card-role'>UX Designer</h5>
                                                        <div className="job--detail-card-review-area">
                                                            <div className="job--detail-card-review">Happiest Minds</div>
                                                            <div className='job--detail-card-rating'>
                                                                <i class="ri-star-fill"></i>
                                                                <span>4.9</span>
                                                            </div>
                                                            <div className="job--detail-card-review-count">
                                                                879&nbsp;
                                                                <span>Reviews</span>
                                                            </div>
                                                        </div>

                                                        <div className="job--detail-card-location-area">
                                                            <div className="job--detail-card-experience">
                                                                <i class='bx bx-briefcase'></i>
                                                                <span>0-4 Yrs</span>
                                                            </div>
                                                            <div className="job--detail-card-experience">
                                                                <i class='bx bx-rupee'></i>
                                                                <span>Not disclosed</span>
                                                            </div>
                                                            <div className="job--detail-card-experience">
                                                                <i class="bi bi-geo-alt-fill"></i>
                                                                <span>Hyderabad</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="job--detail-card-img-area">
                                                        <img src="assets/img/companies/company-4.png" className='job--detail-card-img' alt="" />
                                                    </div>
                                                </div>
                                                <div className="job--detail-card-desc-area">
                                                    <p className='job--detail-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                                                    <p className='job--detail-card-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                                                </div>
                                                <div className="job--detail-card-bottom-area">
                                                    <div className='job--detail-card-tags-area'>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                        <div className="job--detail-card-tag">UX,Design & Archietect</div>
                                                    </div>
                                                    <div className="job--detail-card-know-more-btn-area">
                                                        <a href="#" className='job--detail-card-know-more-btn'>Know more</a>
                                                    </div>
                                                </div>
                                            </article>
                                        </SwiperSlide> */}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="tal--pro-slider-btn-area" data-aos="fade-up">
                            <div className='tal--pro-slider-btn-sub'>
                                <button className="tal--pro-slider-btn swiper-button-prev3">
                                    <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                        <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                    </svg>
                                </button>
                                <button className="tal--pro-slider-btn swiper-button-next3">
                                    <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                        <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div >
                    
                </div > : 
                <div>
                    <h1>404</h1>
                    <p>Not Found</p>
                    <small>The resource requested could not be found on this server!</small>
                </div>
            }
        </div>
        
    )

}
export default JobDetail;