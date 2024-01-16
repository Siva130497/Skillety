import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from 'jquery';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import AuthContext from '../../context/AuthContext';

const TalentsAts = () => {
    const { id } = useParams();
    const location = useLocation();
    const { getProtectedData } = useContext(AuthContext);
    const { percentage } = location.state || {};
    const { jobId } = location.state || {};
    const [loginCandidate, setLoginCandidate] = useState();
    const [candidateImg, setCandidateImg] = useState();
    const [candidateImgUrl, setCandidateImgUrl] = useState("");
    const [candidateResumeUrl, setCandidateResumeUrl] = useState("");
    const [resume, setResume] = useState();
    const [loading, setLoading] = useState(true);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [skillMatchPercentage, setSkillMatchPercentage] = useState()
    const [skillMatch, setSkillMatch] = useState()
    const [staffToken, setStaffToken] = useState("");
    const [alreadySelect, setAlreadySelect] = useState();
    const [atsAccess, setAtsAccess] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [activeATSJobs, setActiveATSJobs] = useState([]);
    const [assignedJobsForCand, setAssignedJobsForCand] = useState([]);
    const [activeATSJobsForCand, setActiveATSJobsForCand] = useState([]);
    const [availableActiveATSJobs, setAvailableActiveATSJobs] = useState(false);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage() {
        Swal.fire({
            title: 'Error!',
            text: "An error occured!",
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }


    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        if (staffToken) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(staffToken);
                    console.log(user);
                    setAtsAccess(user.role);
                    setEmployeeId(user.id);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, [staffToken]);

    useEffect(() => {
        const preloader = $('#preloader');
        if (preloader.length) {
            setTimeout(function () {
                preloader.fadeOut('slow', function () {
                    preloader.remove();
                });
            }, 500);
        }
    }, []);

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

    // useEffect(() => {
    //     const { percentage } = location.state || {};

    //     if (percentage) {
    //         setSkillMatchPercentage(percentage)
    //     }

    // }, [id, location.state])

    const getATSActiveJobs = async () => {
        try {
            const res = await axios.get(`https://skillety-n6r1.onrender.com/ats-active-jobs/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setActiveATSJobs(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAllAssignedJobsForCandId = async () => {
        try {
            const res = await axios.get(`http://localhost:5002/assigned-jobs-cand/${id}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAssignedJobsForCand(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterData(term);
    };

    const filterData = (term) => {
        const filteredArray = activeATSJobsForCand.filter((item) => {
            const lowerCaseTerm = term.toLowerCase();
            return Object.values(item)
                .map((value) => (value || '').toString().toLowerCase())
                .some((value) => value.includes(lowerCaseTerm));
        });
        setFilteredData(filteredArray);
    };

    const handleCheckboxChange = (jobId) => {

        const isSelected = selectedJobs.includes(jobId);

        setSelectedJobs((prevSelected) =>
            isSelected
                ? prevSelected.filter((id) => id !== jobId)
                : [...prevSelected, jobId]
        );
    };

    const handleAssigningJobsToCandidate = () => {
        const assigningDetail = {
            candidateId: id,
            jobIdArray: selectedJobs
        }

        axios.post("http://localhost:5002/create-assign-candidate-job", assigningDetail, {
            headers: {
                Authorization: `Bearer ${staffToken}`,
                Accept: 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data)
                showSuccessMessage("Selected Jobs Assigned to Candidate");
                return getAllAssignedJobsForCandId();
            })
            .then(() => {
                const updatedActiveATSJobs = [...activeATSJobs];

                updatedActiveATSJobs.map((job) => {
                    const isJobAssigned = assignedJobsForCand.some(
                        (assignedJob) => assignedJob.jobId === job.id
                    );

                    if (isJobAssigned) {
                        job.assigned = true;
                    }
                });

                setActiveATSJobsForCand(updatedActiveATSJobs);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const deAssigning = (job_id) => {
        axios.delete(`http://localhost:5002/deassign-candidate/${id}/${job_id}`, {
            headers: {
                Authorization: `Bearer ${staffToken}`,
                Accept: 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data);
                showSuccessMessage("Candidate de-assign from this job")
                return getAllAssignedJobsForCandId();
            })
            .then(() => {
                const updatedActiveATSJobs = [...activeATSJobs];

                updatedActiveATSJobs.map((job) => {
                    const isJobAssigned = assignedJobsForCand.some(
                        (assignedJob) => assignedJob.jobId === job.id
                    );

                    if (isJobAssigned) {
                        job.assigned = true;
                    }
                });

                setActiveATSJobsForCand(updatedActiveATSJobs);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (!jobId && id && employeeId) {
            getATSActiveJobs();
            getAllAssignedJobsForCandId();
        }
    }, [!jobId, id, employeeId]);

    useEffect(() => {
        if (availableActiveATSJobs) {
            const updatedActiveATSJobs = [...activeATSJobs];

            updatedActiveATSJobs.map((job) => {
                const isJobAssigned = assignedJobsForCand.some(
                    (assignedJob) => assignedJob.jobId === job.id
                );

                if (isJobAssigned) {
                    job.assigned = true;
                }
            });

            setActiveATSJobsForCand(updatedActiveATSJobs.reverse());
            setFilteredData(updatedActiveATSJobs.reverse());
        }
    }, [availableActiveATSJobs]);

    const getSelectedJobs = async () => {
        try {
            const res = await axios.get(`https://skillety-n6r1.onrender.com/selected-jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAlreadySelect(result.find(job => job.jobId === jobId));

            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const selectngTheCandidate = async (candidateSelectDetail) => {
        try {
            const res = await axios.post('https://skillety-n6r1.onrender.com/create-selected-candidate', candidateSelectDetail, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                showSuccessMessage("Successfully Selected.")
                getSelectedJobs()

            }
        } catch (err) {
            console.log(err);
            showErrorMessage()
        }
    }

    const deSelectingCandidate = async () => {
        try {
            const response = await axios.delete(`https://skillety-n6r1.onrender.com/deselect-candidate/${id}/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            console.log(response);

            showSuccessMessage("Candidate Deselected..!")
            getSelectedJobs();


        } catch (error) {
            console.error(error);
            showErrorMessage()
        }
    }

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        const percentage = searchParams.get('percentage');

        if (percentage) {
            console.log(id, percentage);
            setSkillMatch(percentage)
        }

    }, [id, location.search]);

    useEffect(() => {
        if (id && staffToken && jobId) {
            getSelectedJobs();
        }
    }, [id, staffToken, jobId])

    const handleSelect = () => {
        if (!alreadySelect) {
            Swal.fire({
                title: 'Are you sure?',
                text: '',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Select the Candidate!'
            }).then((result) => {
                if (result.isConfirmed) {

                    selectngTheCandidate({ jobId, candidateId: id });

                }

            });

        }
    }

    const handleDeSelect = () => {
        if (alreadySelect) {
            Swal.fire({
                title: 'Are you sure?',
                text: '',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Deselect!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deSelectingCandidate();

                }

            });

        }
    }

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
            setCandidateImgUrl(`https://skillety-n6r1.onrender.com/candidate_profile/${candidateImg.image}`)
        }

    }, [candidateImg]);

    useEffect(() => {
        if (loginCandidate) {
            setCandidateResumeUrl(`https://skillety-n6r1.onrender.com/files/${loginCandidate.file}`)
        }

    }, [loginCandidate]);

    useEffect(() => {
        if (resume) {
            setCandidateResumeUrl(`https://skillety-n6r1.onrender.com/files/${resume.file}`)
        }

    }, [resume]);



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
            {loading && <div id="preloader"></div>}
            {loginCandidate &&
                <div>
                    <div class="main-wrapper main-wrapper-1">
                        <div class="navbar-bg"></div>
                        <ATSLayout />

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
                                                                    {(percentage || skillMatch) ? <div className="client-talent--profile-ability-number-left talent">
                                                                        <h6 className='client-talent--profile-ability'>Skill or Keyword matched</h6>
                                                                        <h2 className='client-talent--profile-number'>{percentage ? percentage + "%" : skillMatch + "%"}</h2>
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

                                                            <div class="client-talent--profile-detail-section">
                                                                <div class="client-talent--profile-detail-tab-area">
                                                                    <div class="client-talent--profile-detail-tab-btn-area">
                                                                        <a href="#profileDetail" class="client-talent--profile-detail-tab-btn">Profile Detail</a>
                                                                        <a href="#attachedCV" class="client-talent--profile-detail-tab-btn">Attached CV</a>
                                                                        <a href="#assignJob" class="client-talent--profile-detail-tab-btn">Assign Job(s)</a>
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
                                                                                            {loginCandidate?.workSummary ?
                                                                                                <p className="client-talent--profile-tab-expand-desc">
                                                                                                    {loginCandidate?.workSummary}
                                                                                                </p> :
                                                                                                <span className='text-secondary'>---------</span>
                                                                                            }
                                                                                            <div className="client-talent--profile-tab-expand-table-area">
                                                                                                <div className="row">
                                                                                                    <div className="col-md-2">
                                                                                                        <div className='client-talent--profile-tab-expand-table-title'>College</div>
                                                                                                    </div>
                                                                                                    <div className="col-md-10">
                                                                                                        {loginCandidate?.college ?
                                                                                                            <div className='client-talent--profile-tab-expand-table-content'>
                                                                                                                {loginCandidate?.college}
                                                                                                            </div> :
                                                                                                            <span className='text-secondary'>---------</span>
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="row mt-3">
                                                                                                    <div className="col-md-2">
                                                                                                        <div className='client-talent--profile-tab-expand-table-title'>Department</div>
                                                                                                    </div>
                                                                                                    <div className="col-md-10">
                                                                                                        {loginCandidate?.department ?
                                                                                                            <div className='client-talent--profile-tab-expand-table-content'>
                                                                                                                {loginCandidate?.department}
                                                                                                            </div> :
                                                                                                            <span className='text-secondary'>---------</span>
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="row mt-3">
                                                                                                    <div className="col-md-2">
                                                                                                        <div className='client-talent--profile-tab-expand-table-title'>Role</div>
                                                                                                    </div>
                                                                                                    <div className="col-md-10">
                                                                                                        {loginCandidate?.designation[0] ?
                                                                                                            <div className='client-talent--profile-tab-expand-table-content'>
                                                                                                                {loginCandidate?.designation[0]}
                                                                                                            </div> :
                                                                                                            <span className='text-secondary'>---------</span>
                                                                                                        }
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
                                                                                            {loginCandidate?.education ?
                                                                                                <p className="client-talent--profile-tab-expand-desc">
                                                                                                    {loginCandidate?.education.join(", ")}
                                                                                                </p> :
                                                                                                <span className='text-secondary'>---------</span>
                                                                                            }
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
                                                                                <>
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
                                                                                            documents={[{ uri: candidateResumeUrl }]}
                                                                                            renderers={DocViewerRenderers}
                                                                                            className='cv-view-area'
                                                                                        />
                                                                                    )}
                                                                                </>
                                                                                :
                                                                                <div className='no-cv-uploaded-area'>
                                                                                    <div className='no-cv-uploaded'>
                                                                                        <i className='bi bi-exclamation-circle mr-2'></i>
                                                                                        <span>No CV Uploaded..!</span>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>

                                                                        <div id="assignJob" class="client-talent--profile-detail-tab-content">
                                                                            <div className="row">
                                                                                <div className="col-12">
                                                                                    <div className="admin-lg-table-section pt-0">
                                                                                        <div className='admin-lg-table-area man-app'>

                                                                                            <div className='man-app-title-area candidate'>
                                                                                                <div>
                                                                                                    <div className="man-app-title ats">
                                                                                                        Assign this candidate to the job(s).
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="recruiter-search-input-area">
                                                                                                    <input type="search" className='recruiter-search-input' placeholder='Search Job...' />
                                                                                                    <i className='bi bi-search search-icon'></i>
                                                                                                    <button className='recruiter-search-btn'>Search</button>
                                                                                                </div>
                                                                                                <div className='customize-table-layout-area ats'>
                                                                                                    <div className="customize-table-layout-top">
                                                                                                        <div className='customize-table-layout-head'>Assign the job(s) to this candidate</div>
                                                                                                        <button className='customize-table-layout-btn ats' type='button'>
                                                                                                            Assign
                                                                                                            <i class="bi bi-person-check-fill"></i>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="table-responsive table-scroll-area">
                                                                                                <table className="table table-striped table-hover admin-lg-table">
                                                                                                    <tr className='dash-table-row man-app'>
                                                                                                        <th className='dash-table-head'>No.</th>
                                                                                                        <th className='dash-table-head text-center'>Select</th>
                                                                                                        <th className='dash-table-head'>Job Title</th>
                                                                                                        <th className='dash-table-head text-center'>Status</th>
                                                                                                        <th className='dash-table-head text-center'>Dismiss</th>
                                                                                                        <th className='dash-table-head text-center'>View</th>
                                                                                                    </tr>

                                                                                                    {/* table data */}
                                                                                                    <tr className='dash-table-row client'>
                                                                                                        <td className='dash-table-data1'>01.</td>
                                                                                                        <td className='dash-table-data1 text-center'>
                                                                                                            <label className="layout-form-check-input justify-content-center">
                                                                                                                <input type="checkbox" />
                                                                                                                <span className="layout-form-checkmark mr-0"></span>
                                                                                                            </label>
                                                                                                        </td>
                                                                                                        <td className='dash-table-data1 text-capitalized'>
                                                                                                            Job Title
                                                                                                        </td>
                                                                                                        <td className='dash-table-data1 text-center'>
                                                                                                            <span className='text-success p-0'>
                                                                                                                <i class="bi bi-check-circle mr-2"></i>
                                                                                                                Assigned.
                                                                                                            </span>
                                                                                                            {/* <span className='text-warning p-0'>
                                                                                                                <i class="bi bi-exclamation-circle mr-2"></i>
                                                                                                                Not Assigned.
                                                                                                            </span> */}
                                                                                                        </td>
                                                                                                        <td className='dash-table-data1 text-center'>
                                                                                                            <button className='dismiss-btn'>
                                                                                                                Dismiss
                                                                                                            </button>
                                                                                                        </td>
                                                                                                        <td className='text-center'>
                                                                                                            <div className="action-btn-area">
                                                                                                                <button className='job-view-btn' data-toggle="modal" title='View Job Details...' data-target="#jobViewModal">
                                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                                                    </svg>
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        </td>

                                                                                                    </tr>
                                                                                                </table>
                                                                                            </div>

                                                                                            {/* No data found */}
                                                                                            <div className="no-data-created-area">
                                                                                                <div className='no-data-created'>
                                                                                                    <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                                                                    <div className='no-data-text'>No Jobs Found..!</div>
                                                                                                </div>
                                                                                            </div>
                                                                                            {/*  */}

                                                                                        </div>

                                                                                        {/* for pagination */}
                                                                                        <div className="table-pagination-area pt-3">
                                                                                            <div className="pagination-btn-area">
                                                                                                <button className='pag-prev-btn'>
                                                                                                    <i class="bi bi-chevron-left"></i>
                                                                                                </button>
                                                                                                <div className='pag-page'>
                                                                                                    <span className='current-page'>1</span>&nbsp;/&nbsp;
                                                                                                    <span className='total-page'>2</span>
                                                                                                </div>
                                                                                                <button className='pag-next-btn'>
                                                                                                    <i class="bi bi-chevron-right"></i>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        {/*  */}

                                                                                    </div>
                                                                                </div>
                                                                            </div>

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

                                    {(atsAccess === "Manager" && jobId) && <div className="job--apply-area">
                                        {alreadySelect ?
                                            // <button className='pl--package-btn-sub buy-now m-t-40'
                                            //     onClick={handleDeSelect}>
                                            //     <div className='pl--package-btn buy-now candidate'>
                                            //         In-Share
                                            //     </div>
                                            // </button>
                                            <button className='share-profile-button m-t-40'
                                                onClick={handleDeSelect}>
                                                In-Share
                                            </button>
                                            :
                                            // <button className='pl--package-btn-sub buy-now m-t-40'
                                            //     onClick={handleSelect}>
                                            //     <div className='pl--package-btn buy-now candidate'>
                                            //         Share the Candidate to ATS
                                            //     </div>
                                            //     <div className='pl--package-arrow-area buy-now candidate'>
                                            //         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 27 27" fill="none">
                                            //             <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                            //             <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                            //             <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                            //         </svg>
                                            //     </div>
                                            // </button>
                                            <button className='share-profile-button m-t-40'
                                                onClick={handleSelect}>
                                                <i class="bi bi-share mr-3"></i>
                                                Share the Candidate to ATS
                                            </button>
                                        }
                                    </div>}

                                </section>
                            </div>
                        </div>

                        {/* Job view modal here */}
                        <div className="modal fade" id="jobViewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content recruiter-view-modal">
                                    <div className="modal-header recruiter-view-modal-header">
                                        <h5 className="modal-title recruiter-view-modal-title client" id="exampleModalLabel">
                                            Job Details_
                                        </h5>
                                        <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                        </a>
                                    </div>
                                    <div className="modal-body">
                                        <div className="card p-4 recruiter-view-card candidate">
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Job Role</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head text-capitalized">Data</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Job Category</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head text-capitalized">Data</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Job Mandatory Skills</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="cand-skills-area">
                                                        <span className='cand-skill text-capitalized'>Data</span>
                                                        <span className='cand-skill text-capitalized'>Data</span>
                                                        <span className='cand-skill text-capitalized'>Data</span>
                                                        <span className='cand-skill text-capitalized'>Data</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Needed Experience</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head text-capitalized">
                                                        <span>Data - Data</span>
                                                        &nbsp;years&nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Job Description</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head text-capitalized">Data</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Salary Range</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head">Data - Data</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Department</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head text-capitalized">Data</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Education</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head text-capitalized">Data</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Industry</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head text-capitalized">Data</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Locations</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="cand-skills-area">
                                                        <span className='cand-skill text-capitalized'>Data</span>
                                                        <span className='cand-skill text-capitalized'>Data</span>
                                                        <span className='cand-skill text-capitalized'>Data</span>
                                                        <span className='cand-skill text-capitalized'>Data</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Role</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head text-capitalized">Data</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                                    <div className="view-det-head">Working Mode</div>
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                                    <div className="view-det-sub-head text-capitalized">Data</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                        <button type="button" className="btn close-modal-btn" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </div>


                </div>}
            {pageNotFound && <div>
                <h1>404</h1>
                <p>Not Found</p>
                <small>The resource requested could not be found on this server!</small>
            </div>}
        </div>
    )
}
export default TalentsAts;