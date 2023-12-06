import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './AppliedCandidate.css';
import './AppliedCandidate-responsive.css';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const AppliedCandidate = () => {
    const [clientToken, setClientToken] = useState("");
    const { id } = useParams();
    const { getProtectedData, getCandidateImg, candidateImg } = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState();
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [reqCands, setReqCands] = useState([]);
    const [job, setJob] = useState();

    const [x, setX] = useState([0, 4]);

    const navigate = useNavigate();

    // const [loading, setLoading] = useState(true);
    // const [pageNotFound, setPageNotFound] = useState(false);

    // useEffect(() => {
    //     const preloader = $('#preloader');
    // if (preloader.length) {
    // setTimeout(function () {
    //     preloader.fadeOut('slow', function () {
    //     preloader.remove();
    //     });
    // }, 500);
    // }
    // }, []);

    useEffect(() => {
        setClientToken(JSON.parse(localStorage.getItem('clientToken')))
    }, [clientToken])

    useEffect(() => {
        $(document).ready(function () {
            ////change the toggle text and color
            $('.toggleSwitch').change(function () {
                var $label = $(this).closest('.cl-toggle-switch').find('.cl-toggle--switch-label');
                if ($(this).is(':checked')) {
                    $label.text('Boolean On').css('color', '#714F36');
                } else {
                    $label.text('Boolean Off').css('color', '#B3B3B3');
                }
            });
            ////

            //// avoid "e" negative values for number input field
            // $('.numeric-input').on('input', function () {
            //     var inputValue = $(this).val();

            //     // Remove any non-digit characters, "e", and leading minus sign
            //     inputValue = inputValue.replace(/[^0-9]/g, '');

            //     // Ensure that the input is not negative
            //     if (inputValue.length > 0 && inputValue.charAt(0) === '-') {
            //         inputValue = inputValue.slice(1);
            //     }

            //     // Set the cleaned value back in the input field
            //     $(this).val(inputValue);
            // });
            ////

            ////for tooltip
            $('.info-icon-button').click(function () {
                // Toggle tooltip display on button click
                $('.tooltip').toggleClass('active');
            });
            ////

            ///add multi input fields for company
            $(".cli--tal-search-add-input-button").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "company",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Add Company name",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#container").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });

            $(".cli--tal-search-add-company-input-button").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "company",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Add Company name",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#containerCompany").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });
            ////

            ///add multi input fields for search keyword
            $(".cli--tal-search-keyword-add-input-button").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "exclude_keyword",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Enter the keyword",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#container1").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });
            ////

            ///add multi input fields for search keyword
            $(".cli--tal-search-skill-add-input-button").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "exclude_skill",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Enter the skill",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#container2").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });
            ////

            ///add multi input fields for qualification
            $(".cli--tal-search-qualification-add-input-button").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "qualification",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Enter the PPG/Doctorate Qualification",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#container3").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });
            ////

            ///add multi input fields for keyword in search page
            $(".cli--tal-search-keyword-add-input-button-search").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "qualification",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Enter the PPG/Doctorate Qualification",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#containerSearch").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });
            ////

            ///add multi input fields for skills in search page
            $(".cli--tal-search-skill-add-input-button-search").click(function () {
                // Create a new input area
                var newInputArea = $("<div>", {
                    class: "cli-tal-pro-search-filter-multi-input-area",
                });

                // Create an input element
                var inputElement = $("<input>", {
                    type: "text",
                    name: "qualification",
                    class: "cli-tal-pro-search-filter-input",
                    placeholder: "Enter the PPG/Doctorate Qualification",
                });

                // Create a close button
                var closeButton = $("<i>", {
                    class: "bi bi-x cli-input-close-icon",
                });

                // Add the input and close button to the new input area
                newInputArea.append(inputElement);
                newInputArea.append(closeButton);

                // Append the new input area to the container
                $("#containerSearch2").append(newInputArea);

                // Use a timeout to trigger the transition after the element is added
                setTimeout(function () {
                    newInputArea.addClass("active");
                }, 10);

                // Handle the close button click event
                closeButton.click(function () {
                    // Remove the class to trigger the transition
                    newInputArea.removeClass("active");

                    // Remove the input area after the transition ends
                    setTimeout(function () {
                        newInputArea.remove();
                    }, 300); // Adjust the time to match your transition duration
                });
            });
            ////

            ///for search filter toggle
            $('.cli-tal-pro-search-filter-toggle-area').click(function () {
                var expandArea = $(this).closest('.cli-tal-pro-search-filter-content-section').find('.cli-tal-pro-search-filter-expand-area');

                if (expandArea.hasClass('opened')) {
                    expandArea.removeClass('opened');
                    $(this).removeClass('opened');
                } else {
                    expandArea.addClass('opened');
                    $(this).addClass('opened');
                }
            });
            ////

            ////for custom select option for days
            var defaultOption = $('.select-options li:first-child');
            $('.select-box span').text(defaultOption.text());

            $('.select-box').on('click', function () {
                var selectBox = $(this);
                var toggleIcon = selectBox.find('.toggle-icon');
                var selectOptions = selectBox.next('.select-options');

                selectOptions.slideToggle(300, function () {
                    if (selectOptions.is(':visible')) {
                        toggleIcon.css('transform', 'rotateX(180deg)');
                        selectBox.addClass('active');
                    } else {
                        toggleIcon.css('transform', 'rotateX(0deg)');
                        selectBox.removeClass('active');
                    }
                });
            });

            $('.select-options li').on('click', function () {
                var selectedValue = $(this).data('value');
                $('.select-box span').text($(this).text());
                $('.select-options').slideUp();
                $('.select-box .toggle-icon').css('transform', 'rotateX(0deg)');
                $('.select-box').removeClass('active');

                // You can do something with the selected value here
                console.log('Selected value: ' + selectedValue);
            });

            $(document).on('click', function (e) {
                if (!$(e.target).closest('.custom-select').length) {
                    $('.select-options').slideUp();
                    $('.select-box .toggle-icon').css('transform', 'rotateX(0deg)');
                    $('.select-box').removeClass('active');
                }
            });

            ////

            // $('.talent--profile-card .tal--pro-card-contact-btn').hover(
            //     function () {
            //         // Check if the checkbox is not checked
            //         if (!$(this).closest('.talent--profile-card').find('.tal--checkbox').prop('checked')) {
            //             // On hover in
            //             var newText = $(this).next('.profile-credits-title').text();
            //             $(this).text(newText);
            //         }
            //     },
            //     function () {
            //         // Check if the checkbox is not checked
            //         if (!$(this).closest('.talent--profile-card').find('.tal--checkbox').prop('checked')) {
            //             // On hover out
            //             var originalText = "View Profile"; // Replace with your original text
            //             $(this).text(originalText);
            //         }
            //     }
            // );

        });
    }, [selectedJobs]);

    const getAllCandidateDetail = async () => {
        try {
            const response = await axios.get('https://skillety.onrender.com/candidate-Detail', {
                headers: {
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setCandidateDetail(result);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCandidateDetail();
        getCandidateImg();
    }, []);

    useEffect(() => {
        if (id) {
            axios.get(`https://skillety.onrender.com/job/${id}`, {
                headers: {
                    // Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data)
                    setJob(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [id])

    const getLoginClientDetail = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/client/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setLoginClientDetail(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAppliedOfPostedJobs = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/applied-jobs-of-posted/${loginClientDetail.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                const jobWithDiffCandId = result.filter(jobs => jobs.jobId === id)
                console.log(jobWithDiffCandId)
                setSelectedJobs(jobWithDiffCandId);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (clientToken) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(clientToken);
                    console.log(user);
                    setEmployeeId(user.id);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, [clientToken]);

    useEffect(() => {
        if (employeeId) {
            getLoginClientDetail();
        }
    }, [employeeId]);

    useEffect(() => {
        if (loginClientDetail) {

            getAppliedOfPostedJobs();
        }

    }, [loginClientDetail])

    useEffect(() => {
        if (selectedJobs && selectedJobs.length > 0) {
            const appliedCandIds = selectedJobs.map(job => job.candidateId);
            console.log(appliedCandIds)
            const appliedCands = candidateDetail.filter(cand => appliedCandIds.includes(cand.id));
            if (appliedCands) {
                // setLoading(false);
                setReqCands(appliedCands);
            } else {
                // setLoading(false);
                // setPageNotFound(true);
            }

        }
    }, [selectedJobs])


    return (
        <div>
            {/* {loading && <div>Loading...</div>} */}
            {reqCands.length > 0 && <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ClientLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Applicants
                            </div>

                            <div className="dash-talent--profile-card-section">
                                {reqCands.map((candidate) => {
                                    const matchingImg = candidateImg ? candidateImg.find(img => img.id === candidate.id) : null;
                                    const imgSrc = matchingImg ? `https://skillety.onrender.com/candidate_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";

                                    const calculateMatchPercentage = (skills1, skills2) => {
                                        const matchingSkills = skills2.filter(skill => skills1.includes(skill));
                                        return (matchingSkills.length / skills1.length) * 100;
                                    }
                                    const percentage = Math.round(calculateMatchPercentage(job?.skills, candidate.skills));

                                    return (
                                        <article className="talent--profile-card applied" key={candidate.id}>
                                            <div className="tal--pro-card-left-area applied">
                                                <div className='card-split-line applied'></div>
                                                <div className="tal--pro-card-name-area">
                                                    {/* <label className="tal--pro-card-name-check-container">
                                                        <input type="checkbox" class="tal--checkbox" />
                                                        <div className="tal--pro-card-name-checkmark"></div>
                                                    </label> */}
                                                    <h6 className='tal--pro-card-name'>{candidate.firstName + ' ' + candidate.lastName}</h6>
                                                </div>
                                                <div className="tal--pro-card-tags applied">
                                                    <h6 className='tal--pro-card-exp'>
                                                        Experience : {candidate.year > 0 ? candidate.year + 'years' : "" + candidate.month > 0 ? candidate.month + 'months' : ""}
                                                    </h6>
                                                    {/* <h6 className='tal--pro-card-exp'>
                                                        9.5 LPA
                                                    </h6> */}
                                                    <h6 className='tal--pro-card-location'>
                                                        <i class="bi bi-geo-alt-fill"></i>
                                                        <span>{candidate.location}</span>
                                                    </h6>
                                                    {/* <h6 className='tal--pro-card-role'>
                                                        {candidate.designation[0]}
                                                    </h6> */}
                                                </div>
                                                <div className="tal--pro-card-desc-area applied">
                                                    <div className="row tal--pro-card-desc-row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Previous&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>{candidate.designation[0] + " " + "at" + " " + candidate.companyName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row tal--pro-card-desc-row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Education&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>{candidate.education}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row tal--pro-card-desc-row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>College&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>{candidate.college}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row tal--pro-card-desc-row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>KeySkill&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>{candidate.skills.join(", ")}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row tal--pro-card-desc-row">
                                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                            <h6 className='tal--pro-card-desc-title'>Profile headline&nbsp;:</h6>
                                                        </div>
                                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                            <p className='tal--pro-card-desc'>{candidate.profileHeadline}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="tal--pro-card-bottom-btn-area">
                                                    <button className='tal--pro-card-bottom-btn'>
                                                        <span>897 </span>Similar Profile
                                                    </button>
                                                    <span className='horizon--ln'>|</span>
                                                    <button className='tal--pro-card-bottom-btn'>Comment</button>
                                                    <span className='horizon--ln'>|</span>
                                                    <button className='tal--pro-card-bottom-btn'>
                                                        <i class="bi bi-bookmark"></i>Save
                                                    </button>
                                                </div> */}
                                            </div>

                                            <div className="tal--pro-card-right-area applied">
                                                <div className="tal--pro-card-right-cover-area applied">
                                                    <div className='tal--pro-card-profile-img-role-area'>
                                                        <img src={imgSrc} className='tal--pro-card-profile-img applied' alt="" />
                                                        <p className='tal--pro-card-role-name mb-0'>{candidate.designation[0]}</p>
                                                    </div>
                                                    <div className="tal--pro-card-contact-btn-area">
                                                        <button className='tal--pro-card-contact-btn' onClick={() => navigate(`/talents/${candidate.id}`, { state: { percentage } })}>View Profile</button>
                                                        {/* <span className="profile-credits-title">&#129031; 01 Credit</span> */}

                                                        {/* <div className="profile-credits-area">
                                                            <div className="profile-credits-title">Credits</div>
                                                            <div className="profile-credits">01</div>
                                                        </div> */}
                                                        {/* <button className='tal--pro-card-contact-btn'>
                                                            <img src="../assets/img/talent-profile/call.png" alt="" />
                                                            Call Candidate
                                                        </button> */}
                                                    </div>
                                                    <div className="tal--pro-card-ability-number-area applied">
                                                        <div className="tal--pro-card-ability-number-left applied">
                                                            <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                            <h2 className='tal--pro-card-percentage custom'>{percentage}%</h2>
                                                        </div>
                                                        <div className="tal--pro-card-ability-number-right applied">
                                                            <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                            <h2 className='tal--pro-card-days custom'><span>{candidate.days}</span></h2>
                                                        </div>
                                                    </div>

                                                </div>
                                                {/* <div className="tal--pro-card-right-btn-area">
                                                    <button className='tal--pro-card-right-btn'>
                                                        <img src="../assets/img/talent-profile/document.png" alt="" />
                                                    </button>
                                                    <button className='tal--pro-card-right-btn'>
                                                        <img src="../assets/img/talent-profile/arrow.png" alt="" />
                                                    </button>
                                                    <button className='tal--pro-card-right-btn'>
                                                        <img src="../assets/img/talent-profile/email.png" alt="" />
                                                    </button>
                                                </div> */}
                                            </div>
                                        </article>
                                    )
                                })}

                                <div className="tal--pro-paginate-btn-area" >
                                    <h6 className='tal--pro-total-result-text'>Total Items : <span>{reqCands.length}</span></h6>
                                    <div className='tal--pro-slider-btn-sub'>
                                        {x[0] > 0 && <button className="tal--pro-slider-btn" onClick={() => setX([x[0] - 4, x[1] - 4])}>
                                            <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                            </svg>
                                        </button>}
                                        {((reqCands.slice(x[0], x[1]).length === 4 && reqCands.length > x[1])) && < button className="tal--pro-slider-btn" onClick={() => setX([x[0] + 4, x[1] + 4])}>
                                            <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                            </svg>
                                        </button>}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>}
            {/* {pageNotFound && <div>
                    <h1>404</h1>
                    <p>Not Found</p>
                    <small>The resource requested could not be found on this server!</small>
                </div>} */}
        </div>
    )
}
export default AppliedCandidate;