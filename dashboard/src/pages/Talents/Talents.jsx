import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from 'jquery';
import './Talents.css';
import './Talents-responsive.css';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import ErrorPage from '../../404/404'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
 
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import AuthContext from '../../context/AuthContext';

const Talents = () => {
    const { id } = useParams();
    const location = useLocation();
    const token = new URLSearchParams(window.location.search).get('token') || JSON.parse(localStorage.getItem('clientToken'));
    const [loginCandidate, setLoginCandidate] = useState();
    const [candidateImg, setCandidateImg] = useState();
    const [candidateImgUrl, setCandidateImgUrl] = useState("");
    const [candidateResumeUrl, setCandidateResumeUrl] = useState("");
    const [resume, setResume] = useState();
    const [loading, setLoading] = useState(true);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [skillMatchPercentage, setSkillMatchPercentage] = useState()
    const [skillMatch, setSkillMatch] = useState()
    const {sendinngBGVData} = useContext(AuthContext)

    // useEffect(() => {
    //     const preloader = $('#preloader');
    //     if (preloader.length) {
    //         setTimeout(function () {
    //             preloader.fadeOut('slow', function () {
    //                 preloader.remove();
    //             });
    //         }, 500);
    //     }
    // }, []); 

    useEffect(() => {
        if (token) {
          localStorage.setItem("clientToken", JSON.stringify(token));
        }
    
      }, [token])

    useEffect(() => {

        $(document).ready(function () {
            // let isBlurred = true;

            // $("#toggleBlur").click(function () {
            //     if (isBlurred) {
            //         $("#con_detail1, #con_detail2").removeClass("blurred");
            //         $(this).text("To Hide/Hire Talents");
            //     } else {
            //         $("#con_detail1, #con_detail2").addClass("blurred");
            //         $(this).text("To View/Hire Talents");
            //     }
            //     isBlurred = !isBlurred;
            // });

            // // for change the save tag text and color
            // $("#save-button").click(function (e) {
            //     e.preventDefault(); // Prevent the form from submitting

            //     // Toggle the class for the "bi-bookmark" icon
            //     var icon = $(this).find("i.bi");
            //     icon.toggleClass("bi-bookmark bi-bookmark-fill");

            //     // Change the text based on the class
            //     var text = $(this).find(".client-talent--profile-save-text");
            //     if (icon.hasClass("bi-bookmark-fill")) {
            //         text.text("Saved");
            //     } else {
            //         text.text("Save");
            //     }
            // });

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


    }, [id, loginCandidate]);

    useEffect(() => {
        const { percentage } = location.state || {};
        
        if (percentage) {
            setSkillMatchPercentage(percentage)
        }

    }, [id, location.state])

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        const percentage = searchParams.get('percentage');

        if (percentage) {
            console.log(id, percentage);
            setSkillMatch(percentage)
        }

    }, [id, location.search]);

    useEffect(() => {
        if (skillMatchPercentage) {

        }
    }, [setSkillMatchPercentage])

    useEffect(() => {
        if (id) {
            axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                .then(res => {
                    console.log(res.data)
                    setLoginCandidate(res.data)
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false);
                    setPageNotFound(true);
                })

            axios.get(`https://skillety-n6r1.onrender.com/candidate-image/${id}`)
                .then(res => setCandidateImg(res.data))
                .catch(err => console.log(err))

            axios.get(`https://skillety-n6r1.onrender.com/candidate-resume/${id}`)
                .then(res => setResume(res.data))
                .catch(err => console.log(err))
        }
    }, [id])


    useEffect(() => {
        if (candidateImg) {
            setCandidateImgUrl(candidateImg.image.startsWith('https') ? candidateImg.image : `data:image/jpeg;base64,${candidateImg.image}`)
        }

    }, [candidateImg]);

    useEffect(() => {
        if (loginCandidate) {
            setCandidateResumeUrl(loginCandidate.file)
        }

    }, [loginCandidate]);

    useEffect(() => {
        if (resume) {
            setCandidateResumeUrl(resume.file)
        }

    }, [resume]);


    const handleSendDetailToBGV = () => {
        const detail = {
            unique_id: uuidv4(),
            candidate_id: loginCandidate?.id,
            employee_id: location.state?.employeeId,
            client_id:"Skill2024",
            password:"RmFjdHN1aXRlQDEyMw==",
            bgv_form_data: 
            {
                firstname: loginCandidate?.firstName,
                lastname: loginCandidate?.lastName,
                primary_mobile: loginCandidate?.phone,
                cv_document : candidateResumeUrl,
                education_details: loginCandidate?.education.map((edu, index) => ({
                    [`education_details_${index + 1}`]: {
                        education_category: edu,
                        university: loginCandidate?.college
                    }
                })),
                personal_email_id: loginCandidate?.email,
                past_work_experience: {
                    past_work_experience_1: {
                        work_skills: loginCandidate?.skills.join(", "),
                        company: loginCandidate?.companyName,
                        title: loginCandidate?.designation[0],
                        to_date: loginCandidate?.selectedDate
                    }
                },
                contact_details: {
                    address: {
                        city: loginCandidate?.location,
                    },
                }
            }
        }
        console.log(detail);
        sendinngBGVData(detail);
    }

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
            {loading &&
                                <div className="dash-talent--profile-card-section">
                                    <div className="card change-status-card">
                                        <div className="card-change-status-title w-20">
                                            <Skeleton height={20} />
                                        </div>
                                        <div className="card-change-status-input-area">
                                            <div className='select-option-area position-relative w-100'>
                                                <Skeleton height={45} />
                                            </div>
                                            <Skeleton height={45} width={100} />
                                        </div>
                                    </div>

                                    <article className="talent--profile-card applied">
                                        <div className="tal--pro-card-left-area applied">
                                            <div className='card-split-line applied'></div>
                                            <div className="tal--pro-card-name-area">
                                                <Skeleton height={25} width={25} />
                                                <h6 className='tal--pro-card-name'>
                                                    <Skeleton height={20} width={150} />
                                                </h6>
                                            </div>
                                            <div className="tal--pro-card-tags applied">
                                                <h6 className='tal--pro-card-exp'>
                                                    <Skeleton height={10} width={100} />
                                                </h6>
                                                <h6 className='tal--pro-card-location'>
                                                    <Skeleton height={10} width={100} />
                                                </h6>
                                            </div>
                                            <div className="tal--pro-card-desc-area applied">
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={100} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={200} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={50} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={150} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'>
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} width={200} />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title font-weight-700'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc font-weight-700'><Skeleton height={10} width={100} /></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tal--pro-card-right-area applied">
                                            <div className="tal--pro-card-right-cover-area applied">
                                                <div className='tal--pro-card-profile-img-role-area'>
                                                    <Skeleton circle={true} height={90} width={90} />
                                                    <p className='tal--pro-card-role-name mb-0'><Skeleton height={10} width={100} /></p>
                                                </div>
                                                <div className="tal--pro-card-contact-btn-area">
                                                    <Skeleton height={40} width={100} />
                                                </div>
                                                <div className="tal--pro-card-ability-number-area applied">
                                                    <div className="tal--pro-card-ability-number-left applied">
                                                        <h6 className='tal--pro-card-ability'><Skeleton height={10} width={50} /></h6>
                                                        <h2 className='tal--pro-card-percentage custom'><Skeleton height={15} width={20} /></h2>
                                                    </div>
                                                    <div className="tal--pro-card-ability-number-right applied">
                                                        <h6 className='tal--pro-card-ability'><Skeleton height={10} width={50} /></h6>
                                                        <h2 className='tal--pro-card-days custom'><span><Skeleton height={15} width={70} /></span></h2>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </article>

                                    <article className="talent--profile-card applied">
                                        <div className="tal--pro-card-left-area applied">
                                            <div className='card-split-line applied'></div>
                                            <div className="tal--pro-card-name-area">
                                                <Skeleton height={25} width={25} />
                                                <h6 className='tal--pro-card-name'>
                                                    <Skeleton height={20} width={150} />
                                                </h6>
                                            </div>
                                            <div className="tal--pro-card-tags applied">
                                                <h6 className='tal--pro-card-exp'>
                                                    <Skeleton height={10} width={100} />
                                                </h6>
                                                <h6 className='tal--pro-card-location'>
                                                    <Skeleton height={10} width={100} />
                                                </h6>
                                            </div>
                                            <div className="tal--pro-card-desc-area applied">
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={100} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={200} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={50} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={150} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'>
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} width={200} />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title font-weight-700'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc font-weight-700'><Skeleton height={10} width={100} /></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tal--pro-card-right-area applied">
                                            <div className="tal--pro-card-right-cover-area applied">
                                                <div className='tal--pro-card-profile-img-role-area'>
                                                    <Skeleton circle={true} height={90} width={90} />
                                                    <p className='tal--pro-card-role-name mb-0'><Skeleton height={10} width={100} /></p>
                                                </div>
                                                <div className="tal--pro-card-contact-btn-area">
                                                    <Skeleton height={40} width={100} />
                                                </div>
                                                <div className="tal--pro-card-ability-number-area applied">
                                                    <div className="tal--pro-card-ability-number-left applied">
                                                        <h6 className='tal--pro-card-ability'><Skeleton height={10} width={50} /></h6>
                                                        <h2 className='tal--pro-card-percentage custom'><Skeleton height={15} width={20} /></h2>
                                                    </div>
                                                    <div className="tal--pro-card-ability-number-right applied">
                                                        <h6 className='tal--pro-card-ability'><Skeleton height={10} width={50} /></h6>
                                                        <h2 className='tal--pro-card-days custom'><span><Skeleton height={15} width={70} /></span></h2>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </article>
                                </div>
                            }
            {loginCandidate &&
                <div>
                    <div class="main-wrapper main-wrapper-1">
                        <div class="navbar-bg"></div>
                        <ClientLayout />

                        <div class="main-content">
                            <div className="my-app-section">
                                <section class="section">
                                    <div className="admin-component-name">
                                        Profile Detail
                                    </div>
                                    <div className='talents--section mobile'>
                                        <div className='container-fluid'>
                                            <div className='container-fluid container-section container-no-padding'>
                                                <div className="custom--container">
                                                    <div className="talent--profile-section">
                                                        <div className="talent--profile-container">
                                                            <div className="client-talent--profile-detail-area">
                                                                <div className='client-talent--profile-image-area'>
                                                                    <img src={candidateImgUrl ? candidateImgUrl : "../assets/img/talents-images/avatar.jpg"} className='client-talent--profile-image' alt="" />
                                                                </div>
                                                                <div className='client-talent--profile-content-area'>
                                                                    <h4 className='client-talent--profile-name'>{loginCandidate?.firstName + " " + loginCandidate?.lastName}</h4>
                                                                    <div className="client-talent--profile-tags-area">
                                                                        <div className='client-talent--profile-tag'>Experience : {loginCandidate?.year > 0 ? loginCandidate?.year + 'years' : "" + loginCandidate?.month > 0 ? loginCandidate?.month + 'months' : ""}</div>
                                                                        {/* <div className='client-talent--profile-tag'>9.5 LPA</div> */}
                                                                        <div className='client-talent--profile-tag'>
                                                                            <i class="bi bi-geo-alt-fill"></i>
                                                                            {loginCandidate?.location}
                                                                        </div>
                                                                        {/* <div className='client-talent--profile-tag'>{loginCandidate?.designation[0]}</div> */}
                                                                    </div>
                                                                    <div className="client-talent--profile-desc-area mt-4">
                                                                        <div className="row">
                                                                            <div className="col-12 col-sm-4">
                                                                                <div className='client-talent--profile-desc'>Previous :</div>
                                                                            </div>
                                                                            <div className="col-12 col-sm-8 mt-2 mt-sm-0">
                                                                                <div className='client-talent--profile-desc text-capitalized'>{loginCandidate?.designation[0] + " " + "at" + " " + loginCandidate?.companyName}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row m-t-35 mt-sm-3">
                                                                            <div className="col-12 col-sm-4">
                                                                                <div className='client-talent--profile-desc'>College :</div>
                                                                            </div>
                                                                            <div className="col-12 col-sm-8 mt-2 mt-sm-0">
                                                                                <div className='client-talent--profile-desc text-capitalized'>{loginCandidate?.college}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row m-t-35 mt-sm-3">
                                                                            <div className="col-12 col-sm-4">
                                                                                <div className='client-talent--profile-desc'>Phone Number :</div>
                                                                            </div>
                                                                            <div className="col-12 col-sm-8 mt-2 mt-sm-0">
                                                                                <div className='client-talent--profile-desc'>
                                                                                    <a href={`tel:${loginCandidate?.phone}`}
                                                                                        className='client-talent--profile-desc link is-link'>
                                                                                        {loginCandidate?.phone}
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row m-t-35 mt-sm-3">
                                                                            <div className="col-12 col-sm-4">
                                                                                <div className='client-talent--profile-desc'>Email :</div>
                                                                            </div>
                                                                            <div className="col-12 col-sm-8 mt-2 mt-sm-0">
                                                                                <div className='client-talent--profile-desc'>
                                                                                    <a href={`mailto:${loginCandidate?.email}`}
                                                                                        className='client-talent--profile-desc link is-link'>
                                                                                        {loginCandidate?.email}
                                                                                    </a>
                                                                                </div>
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
                                                                    {(skillMatchPercentage || skillMatch) ? <div className="client-talent--profile-ability-number-left talent">
                                                                        <h6 className='client-talent--profile-ability'>Skill or Keyword matched</h6>
                                                                        <h2 className='client-talent--profile-number'>{skillMatchPercentage || skillMatch}%</h2>
                                                                    </div> : <div className="client-talent--profile-ability-number-left talent">
                                                                        <h6 className='client-talent--profile-ability'>Skill  matched</h6>
                                                                        <h2 className='client-talent--profile-number'>0%</h2>
                                                                    </div>}
                                                                    <div className="hr-line mobile"></div>
                                                                    <div className="client-talent--profile-ability-number-right">
                                                                        <h6 className='client-talent--profile-ability'>Can join in</h6>
                                                                        <h2 className='client-talent--profile-days'>
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
                                                       
                                                            <button
                                                            onClick={handleSendDetailToBGV}>BGV</button>
                                                            <div class="client-talent--profile-detail-section">
                                                                <div class="client-talent--profile-detail-tab-area">
                                                                    <div class="client-talent--profile-detail-tab-btn-area">
                                                                        <a href="#profileDetail" class="client-talent--profile-detail-tab-btn">Profile Detail</a>
                                                                        <a href="#attachedCV" class="client-talent--profile-detail-tab-btn">Attached CV</a>

                                                                    </div>
                                                                    <div class="client-talent--profile-detail-tab-content-area">
                                                                        <div id="profileDetail" class="client-talent--profile-detail-tab-content">
                                                                            <div className="client-talent--profile-tab-desc-area">
                                                                                <p className='client-talent--profile-tab-desc text-capitalized'>{loginCandidate?.profileHeadline}</p>
                                                                            </div>
                                                                            <div className="client-talent--profile-tab-toggle-content-section">
                                                                                <div className="client-talent--profile-tab-toggle-content-area">
                                                                                    <div className="client-talent--profile-tab-toggle-area">
                                                                                        <h6 className='client-talent--profile-tab-toggle-head'>Keyskills</h6>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className='' width="13" height="8" viewBox="0 0 15 9" fill="none">
                                                                                            <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="client-talent--profile-tab-expand-area">
                                                                                        <div className="client-talent--profile-tab-expand-sub-area">
                                                                                            <div className="client-talent--profile-tab-key-tags-area">
                                                                                                {loginCandidate?.skills.map((skill) => {
                                                                                                    return (
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
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className='' width="13" height="8" viewBox="0 0 15 9" fill="none">
                                                                                            <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="client-talent--profile-tab-expand-area">
                                                                                        <div className="client-talent--profile-tab-expand-sub-area">
                                                                                            <p className="client-talent--profile-tab-expand-desc">
                                                                                                {loginCandidate?.workSummary}
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
                                                                                                        <div className='client-talent--profile-tab-expand-table-content'>{loginCandidate?.department}</div>
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
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className='' width="13" height="8" viewBox="0 0 15 9" fill="none">
                                                                                            <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="client-talent--profile-tab-expand-area">
                                                                                        <div className="client-talent--profile-tab-expand-sub-area">
                                                                                            <p className="client-talent--profile-tab-expand-desc">
                                                                                                {loginCandidate?.education.join(", ")}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="client-talent--profile-tab-toggle-content-area">
                                                                                    <div className="client-talent--profile-tab-toggle-area">
                                                                                        <h6 className='client-talent--profile-tab-toggle-head'>Certification</h6>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className='' width="13" height="8" viewBox="0 0 15 9" fill="none">
                                                                                            <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="client-talent--profile-tab-expand-area">
                                                                                        <div className="client-talent--profile-tab-expand-sub-area">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                {/* <div className="tal--pro-btn-area">
                                                            <div>
                                                                <div className="tal--pro-view-btn-area">
                                                                    <button  className='tal--pro-view-btn'>To View/Hire Talents</button>
                                                                </div>
                                                                <div className="tal--pro-choose-btn-area">
                                                                    <a href="/packages" className='ser--cont-btn-sub' >
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
                                                        </div> */}
                                                                            </div>
                                                                        </div>

                                                                        <div id="attachedCV" class="client-talent--profile-detail-tab-content">
                                                                            {resume?.file ? 
                                                                            <div className='tytu'>
                                                                            <div className='cv-file-name'>{resume?.file}</div>
                                                                            <div className="view-cv-toparea">
                                                                                <button className='download-cv-btn mt-3' onClick={() => {
                                                                                    window.open(candidateResumeUrl);
                                                                                }}>
                                                                                    <i class="bi bi-download download-cv-icon"></i>
                                                                                    Download CV
                                                                                </button>
                                                                            </div>
                                                                            {candidateResumeUrl && (
                                                                                        <DocViewer
                                                                                            documents={[
                                                                                                { uri: `data:application/pdf;base64,${candidateResumeUrl}` },
                                                                                                { uri: `data:application/msword;base64,${candidateResumeUrl}` }, // For DOC format
                                                                                                { uri: `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${candidateResumeUrl}` } // For DOCX format
                                                                                            ]}
                                                                                            renderers={DocViewerRenderers}
                                                                                            className='document'
                                                                                        />
                                                                            )}
                                                                            </div>
                                                                            :
                                                                            <div className='no-cv-uploaded-area'>
                                                                                <div className='no-cv-uploaded'>
                                                                                    <i className='bi bi-exclamation-circle mr-2'></i>
                                                                                    <span>No CV Uploaded..!</span>
                                                                                </div>
                                                                            </div>
                                                                            }
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
                                </section>
                            </div>
                        </div>
                        <Footer />
                    </div>


                </div>}
            {pageNotFound && <ErrorPage/>}
        </div>
    )
}
export default Talents;