import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from 'jquery';
import './Talents.css';
import './Talents-responsive.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const Talents = () => {
    const {id} = useParams();
    const [loginCandidate, setLoginCandidate] = useState();
    const [candidateImg, setCandidateImg] = useState();
    const [candidateImgUrl, setCandidateImgUrl] = useState("");
    const [candidateResumeUrl, setCandidateResumeUrl] = useState("");
    const [resume, setResume] = useState();

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

            // for change the save tag text and color
            $("#save-button").click(function (e) {
                e.preventDefault(); // Prevent the form from submitting

                // Toggle the class for the "bi-bookmark" icon
                var icon = $(this).find("i.bi");
                icon.toggleClass("bi-bookmark bi-bookmark-fill");

                // Change the text based on the class
                var text = $(this).find(".client-talent--profile-save-text");
                if (icon.hasClass("bi-bookmark-fill")) {
                    text.text("Saved");
                } else {
                    text.text("Save");
                }
            });

            // for profile tab switch
            $(".client-talent--profile-detail-tab-btn:first").addClass("active");
            $(".client-talent--profile-detail-tab-content:first").addClass("active");

            $(".client-talent--profile-detail-tab-btn").click(function (e) {
                e.preventDefault(); // Prevent the default behavior (scrolling to the top)

                var targetTab = $(this).attr("href");

                $(".client-talent--profile-detail-tab-btn").removeClass("active");
                $(".client-talent--profile-detail-tab-content").removeClass("active");

                $(this).addClass("active");
                $(targetTab).addClass("active");
            });

            // for profile toggle to expand
            $('.client-talent--profile-tab-toggle-area').click(function () {
                var expandArea = $(this).closest('.client-talent--profile-tab-toggle-content-area').find('.client-talent--profile-tab-expand-area');

                if (expandArea.hasClass('opened')) {
                    expandArea.removeClass('opened');
                    $(this).removeClass('opened');
                } else {
                    expandArea.addClass('opened');
                    $(this).addClass('opened');
                }
            });

            $(".cli--talent-tag-by-btn").click(function () {
                // Remove the 'active' class from all buttons and content divs
                $(".cli--talent-tag-by-btn, .cli--talent-tag-by-btn-content-area > div").removeClass("active");

                // Add the 'active' class to the clicked button
                $(this).addClass("active");

                // Determine which content div to show based on the button's class
                var contentToShow = $(this).hasClass("view-skill") ? ".cli--talent-tag-by-btn-content-for-it-skill" : ".cli--talent-tag-by-btn-content-for-also-know";

                // Add the 'active' class to the corresponding content div
                $(contentToShow).addClass("active");
            });
        });


    }, []);

      useEffect(()=>{
        if(id){
            axios.get(`http://localhost:5002/candidate/${id}`)
            .then(res=>{
                console.log(res.data)
                setLoginCandidate(res.data)
            })
            .catch(err=>console.log(err))

            axios.get(`http://localhost:5002/candidate-image/${id}`)
              .then(res=>setCandidateImg(res.data))
              .catch(err=>console.log(err))

            axios.get(`http://localhost:5002/candidate-resume/${id}`)
              .then(res=>setResume(res.data))
              .catch(err=>console.log(err))
        }
    },[id])


    useEffect(() => {
        if(candidateImg){
          setCandidateImgUrl(`http://localhost:5002/candidate_profile/${candidateImg.image}`)
        }
        
      }, [candidateImg]);

      useEffect(() => {
        if(loginCandidate){
          setCandidateResumeUrl(`http://localhost:5002/files/${loginCandidate.file}`)
        }
        
      }, [loginCandidate]);

      
    
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
            slidesPerView: 1.5,
        },
    };

    return (
        <div>
            {loginCandidate ? <div>
            
            <div className='talents--section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="custom--container">
                            {/* <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <a className='sub--bredcrumb-link' href="/talent-profile-search">Talents profile</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Talents profile Details</p>
                                </div>
                            </div> */}

                            <div className="talent--profile-section">
                                <div className="talent--profile-container">
                                    <div className="client-talent--profile-detail-area">
                                        <img src={candidateImgUrl ? candidateImgUrl : "../assets/img/talents-images/avatar.jpg"}  className='client-talent--profile-image' alt="" />
                                        <div className='client-talent--profile-content-area'>
                                            <h4 className='client-talent--profile-name'>{loginCandidate?.firstName+ " " +loginCandidate?.lastName}</h4>
                                            <div className="client-talent--profile-tags-area">
                                                <div className='client-talent--profile-tag'>Experience : {loginCandidate?.year > 0 ? loginCandidate?.year+ 'years' : "" + loginCandidate?.month > 0 ? loginCandidate?.month+ 'months' : ""}</div>
                                                <div className='client-talent--profile-tag'>9.5 LPA</div>
                                                <div className='client-talent--profile-tag'>
                                                    <i class="bx bxs-map"></i>
                                                    {loginCandidate?.location}
                                                </div>
                                                <div className='client-talent--profile-tag'>{loginCandidate?.designation[0]}</div>
                                            </div>
                                            <div className="client-talent--profile-desc-area mt-4">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <div className='client-talent--profile-desc'>Previous</div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className='client-talent--profile-desc'>Junior Frontend Developer at Cognizant</div>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-4">
                                                        <div className='client-talent--profile-desc'>Preferred Location</div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className='client-talent--profile-desc'>Hyderabad, Kolkata, Chennai</div>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-4">
                                                        <div className='client-talent--profile-desc'>Phone Number</div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className='client-talent--profile-desc'>{loginCandidate?.phone}</div>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-4">
                                                        <div className='client-talent--profile-desc'>Email</div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className='client-talent--profile-desc'>{loginCandidate?.email}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="client-talent--profile-contact-btn-area">
                                                <button className='client-talent--profile-contact-btn'>View Phone Number</button>
                                                <button className='client-talent--profile-contact-btn'>
                                                    <img src="assets/img/talent-profile/call-w.png" alt="" />
                                                    Call Candidate
                                                </button>
                                                <button className='client-talent--profile-email-btn'>Verified Email and Call </button>
                                            </div>

                                            <div className="client-talent--profile-contact-email-area">
                                                <img src="assets/img/talent-profile/email-b.png" alt="" />
                                                <div className='client-talent--profile-contact-email'>{candidateDetail.email}</div>
                                            </div> */}
                                        </div>
                                        <div className="client-talent--profile-ability-number-area">
                                            <div className="client-talent--profile-ability-number-left">
                                                <h6 className='client-talent--profile-ability'>Skill matched</h6>
                                                <h2 className='client-talent--profile-number'>90%</h2>
                                            </div>
                                            <div className="client-talent--profile-ability-number-right">
                                                <h6 className='client-talent--profile-ability'>Can join in</h6>
                                                <h2 className='client-talent--profile-number'>
                                                <span>{loginCandidate?.days}</span>
                                                </h2>
                                            </div>
                                        </div>
                                        {/* <div className="client-talent--profile-save-btn-area">
                                            <form method="" action="">
                                                <input type="hidden" name="" value={"add"} />
                                                <input type="hidden" name="action" value={"remove"} />
                                                <button type="submit" className='client-talent--profile-save-btn' id="save-button">
                                                    <i class="bi bi-bookmark"></i>
                                                    <div className="client-talent--profile-save-text">Save</div>
                                                </button>
                                            </form>
                                        </div> */}
                                    </div>

                                    {/* <div className="client-talent--profile-days-tracking-area">
                                        <div className="client-talent--profile-days-track-line-area">
                                            <div className="client-talent--profile-days-track-point-area point-1">
                                                <div className="client-talent--profile-days-track-point"></div>
                                                <div className="client-talent--profile-days-track-point-text">2018</div>
                                            </div>
                                            <div className="client-talent--profile-days-track-point-area point-2">
                                                <div className="client-talent--profile-days-track-point"></div>
                                                <div className="client-talent--profile-days-track-point-text">May ‘17</div>
                                            </div>
                                            <div className="client-talent--profile-days-track-point-area point-3">
                                                <div className="client-talent--profile-days-track-point"></div>
                                                <div className="client-talent--profile-days-track-point-text">Nov 22</div>
                                            </div>
                                            <div className="client-talent--profile-days-track-point-area point-4">
                                                <div className="client-talent--profile-days-track-point"></div>
                                                <div className="client-talent--profile-days-track-point-text">Jan 23</div>
                                            </div>
                                            <div className="client-talent--profile-days-track-point-area point-5">
                                                <div className="client-talent--profile-days-track-point"></div>
                                                <div className="client-talent--profile-days-track-point-text">July 23</div>
                                            </div>
                                            <div className="client-talent--profile-days-track-point-area point-6">
                                                <div className="client-talent--profile-days-track-point"></div>
                                                <div className="client-talent--profile-days-track-point-text">till date</div>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div class="client-talent--profile-detail-section">
                                        <div class="client-talent--profile-detail-tab-area">
                                            <div class="client-talent--profile-detail-tab-btn-area">
                                                <a href="#profileDetail" class="client-talent--profile-detail-tab-btn">Profile Detail</a>
                                                <a href="#attachedCV" class="client-talent--profile-detail-tab-btn">Attached CV</a>
                                                
                                            </div>
                                            <div class="client-talent--profile-detail-tab-content-area">
                                                <div id="profileDetail" class="client-talent--profile-detail-tab-content">
                                                    <div className="client-talent--profile-tab-desc-area">
                                                        <p className='client-talent--profile-tab-desc'>{loginCandidate?.profileHeadline}</p>
                                                    </div>
                                                    <div className="client-talent--profile-tab-toggle-content-section">
                                                        <div className="client-talent--profile-tab-toggle-content-area">
                                                            <div className="client-talent--profile-tab-toggle-area">
                                                                <h6 className='client-talent--profile-tab-toggle-head'>Keyskills</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="client-talent--profile-tab-expand-area">
                                                                <div className="client-talent--profile-tab-expand-sub-area">
                                                                    <div className="client-talent--profile-tab-key-tags-area">
                                                                        {loginCandidate?.skills.map((skill)=>{
                                                                            return(
                                                                                <div className='client-talent--profile-tab-key-tag'>{skill}</div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="client-talent--profile-tab-toggle-content-area">
                                                            <div className="client-talent--profile-tab-toggle-area">
                                                                <h6 className='client-talent--profile-tab-toggle-head'>Work Summary</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="client-talent--profile-tab-expand-area">
                                                                <div className="client-talent--profile-tab-expand-sub-area">
                                                                    <p className="client-talent--profile-tab-expand-desc">
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                                                                    </p>
                                                                    <div className="client-talent--profile-tab-expand-table-area">
                                                                        <div className="row">
                                                                            <div className="col-md-2">
                                                                                <div className='client-talent--profile-tab-expand-table-title'>College</div>
                                                                            </div>
                                                                            <div className="col-md-10">
                                                                                <div className='client-talent--profile-tab-expand-table-content'>{loginCandidate?.college}</div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row mt-3">
                                                                            <div className="col-md-2">
                                                                                <div className='client-talent--profile-tab-expand-table-title'>Department</div>
                                                                            </div>
                                                                            <div className="col-md-10">
                                                                                <div className='client-talent--profile-tab-expand-table-content'>Junior Frontend Developer at Cognizant</div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row mt-3">
                                                                            <div className="col-md-2">
                                                                                <div className='client-talent--profile-tab-expand-table-title'>Role</div>
                                                                            </div>
                                                                            <div className="col-md-10">
                                                                                <div className='client-talent--profile-tab-expand-table-content'>{loginCandidate?.designation[0]}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* <div className="client-talent--profile-tab-toggle-content-area">
                                                            <div className="client-talent--profile-tab-toggle-area">
                                                                <h6 className='client-talent--profile-tab-toggle-head'>Work Experience</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="client-talent--profile-tab-expand-area">
                                                                <div className="client-talent--profile-tab-expand-sub-area">
                                                                {candidateDetail.year > 0 ? candidateDetail.year+ 'years' : "" + candidateDetail.month > 0 ? candidateDetail.month+ 'months' : ""}
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                        <div className="client-talent--profile-tab-toggle-content-area">
                                                            <div className="client-talent--profile-tab-toggle-area">
                                                                <h6 className='client-talent--profile-tab-toggle-head'>Education</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="client-talent--profile-tab-expand-area">
                                                                <div className="client-talent--profile-tab-expand-sub-area">
                                                                    {loginCandidate?.education}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="client-talent--profile-tab-toggle-content-area">
                                                            <div className="client-talent--profile-tab-toggle-area">
                                                                <h6 className='client-talent--profile-tab-toggle-head'>Certification</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="client-talent--profile-tab-expand-area">
                                                                <div className="client-talent--profile-tab-expand-sub-area">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tal--pro-btn-area">
                                                            <div>
                                                                <div className="tal--pro-view-btn-area">
                                                                    <button data-aos="fade-right" className='tal--pro-view-btn'>To View/Hire Talents</button>
                                                                </div>
                                                                <div className="tal--pro-choose-btn-area">
                                                                    <a href="/packages" className='ser--cont-btn-sub' data-aos="fade-right">
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

                                                <div id="attachedCV" class="client-talent--profile-detail-tab-content">
                                                    Content-2 for Attached CV
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
                {/* <div className="custom--container1">
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
                                {allCandDetail.map((cand)=>{
                                    return(
                                        <SwiperSlide>
                                            <article className="talent--profile-card" data-aos="fade-left">
                                                <div className="tal--pro-card-left-area">
                                                    <div className='card-split-line'></div>
                                                    <div className="tal--pro-card-name-area">
                                                        <label className="tal--pro-card-name-check-container">
                                                            <input type="checkbox" />
                                                            <div className="tal--pro-card-name-checkmark"></div>
                                                        </label>
                                                        <h6 className='tal--pro-card-name'>{cand.firstName+ " " +cand.lastName}</h6>
                                                    </div>
                                                    <div className="tal--pro-card-tags">
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : {cand.year > 0 ? cand.year+ 'years' : "" + cand.month > 0 ? cand.month+ 'months' : ""}
                                                        </h6>
                                                        <h6 className='tal--pro-card-exp'>
                                                            9.5 LPA
                                                        </h6>
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bx bxs-map"></i>
                                                            <span>{cand.location}</span>
                                                        </h6>
                                                        <h6 className='tal--pro-card-role'>
                                                            {cand.designation[0]}
                                                        </h6>
                                                    </div>
                                                    <div className="tal--pro-card-desc-area">
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Previous&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Junior Frontend Developer at Cognizant</p>
                                                            </div>
                                                        </div>
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Education&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>{cand.education}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Preferred Location&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Hyderabad, Kolkata, Chennai</p>
                                                            </div>
                                                        </div>
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>KeySkill&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                                                            </div>
                                                        </div>
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>May also Know&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tal--pro-card-bottom-btn-area">
                                                        <button className='tal--pro-card-bottom-btn'>
                                                            <span>897 </span>Similar Profile
                                                        </button>
                                                        <span className='horizon--ln'>|</span>
                                                        <button className='tal--pro-card-bottom-btn'>Comment</button>
                                                        <span className='horizon--ln'>|</span>
                                                        <button className='tal--pro-card-bottom-btn'>
                                                            <i class="bi bi-bookmark"></i>Save
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="tal--pro-card-right-area">
                                                    <div className="tal--pro-card-right-cover-area">
                                                        <div className='tal--pro-card-profile-img-role-area'>
                                                            <img src="../assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
                                                            <p className='tal--pro-card-role-name'>Frontend Developer (Css,html)</p>
                                                        </div>
                                                        <div className="tal--pro-card-contact-btn-area">
                                                            <button className='tal--pro-card-contact-btn'>View Phone Number</button>
                                                            <button className='tal--pro-card-contact-btn'>
                                                                <img src="../assets/img/talent-profile/call.png" alt="" />
                                                                Call Candidate
                                                            </button>
                                                        </div>
                                                        <div className="tal--pro-card-ability-number-area">
                                                            <div className="tal--pro-card-ability-number-left">
                                                                <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                                <h2 className='tal--pro-card-percentage'>90%</h2>
                                                            </div>
                                                            <div className="tal--pro-card-ability-number-right">
                                                                <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                                <h2 className='tal--pro-card-days'>07<span>days</span></h2>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="tal--pro-card-right-btn-area">
                                                        <button className='tal--pro-card-right-btn'>
                                                            <img src="assets/img/talent-profile/document.png" alt="" />
                                                        </button>
                                                        <button className='tal--pro-card-right-btn'>
                                                            <img src="assets/img/talent-profile/arrow.png" alt="" />
                                                        </button>
                                                        <button className='tal--pro-card-right-btn'>
                                                            <img src="assets/img/talent-profile/email.png" alt="" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </article>
                                        </SwiperSlide>
                                    )
                                })}
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
                </div> */}
            </div>
            
            </div> : 
            <div>
            <h1>404</h1>
            <p>Not Found</p>
            <small>The resource requested could not be found on this server!</small>
        </div>}
        </div>
    )
}
export default Talents;