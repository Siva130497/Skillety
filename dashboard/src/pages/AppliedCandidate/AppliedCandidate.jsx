import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './TalentsProfileSearch.css';
import './TalentsProfileSearch-responsive.css';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const AppliedCandidate = () => {
    const [clientToken, setClientToken] = useState("");
    const {id} = useParams();
    const {getProtectedData, getCandidateImg, candidateImg} = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState();
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [selectedJobs, setSelectedJobs] =useState([]);
    const [reqCands, setReqCands] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        setClientToken(JSON.parse(localStorage.getItem('clientToken')))
    },[clientToken])

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
        });
    }, []);

    const getAllCandidateDetail = async () => {
        try {
            const response = await axios.get('http://localhost:5002/candidate-Detail', {
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

    const getLoginClientDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:5002/client/${employeeId}`, {
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

    const getAppliedOfPostedJobs = async() => {
        try{
            const res = await axios.get(`http://localhost:5002/applied-jobs-of-posted/${loginClientDetail.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              const jobWithDiffCandId = result.filter(jobs=>jobs.jobId === id)
              console.log(jobWithDiffCandId)
              setSelectedJobs(jobWithDiffCandId);
            } else {
              console.log(result);
            }
        }catch(err){
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

    useEffect(()=>{
        if(loginClientDetail){
            
            getAppliedOfPostedJobs();
        }
        
    },[loginClientDetail])

    useEffect(() => {
        if (selectedJobs && selectedJobs.length > 0) { 
          const appliedCandIds = selectedJobs.map(job => job.candidateId);
          console.log(appliedCandIds)
          const appliedCands = candidateDetail.filter(cand => appliedCandIds.includes(cand.id));
          setReqCands(appliedCands);
        }
      }, [selectedJobs])

    
    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ClientLayout />
            
                <div class="main-content">
                    <section class="section">
                        <div className='cli--tal-pro-search-section pt-5'>
                            <div className='container-fluid container-section'>
                                <div className="custom--container tal--pro-search">
                                    
                                        <div className='talent--profile-search-results-section'>
                                            
                                            <div className="row row-border-custom">
                                                

                                                <div className="col-12 col-lg-8 col-xl-8 col-md-8 pe-lg-0 pe-md-1 col-width-lg-70">
                                                    
                                                    <div className="cli--tal-pro-search-results-area">
                                                        {reqCands.map((candidate) => {
                                                                    const matchingImg = candidateImg ? candidateImg.find(img => img.id === candidate.id) : null;
                                                                    const imgSrc = matchingImg ? `http://localhost:5002/candidate_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
                                                                    return (
                                                                        <article className="talent--profile-card search" key={candidate.id} onClick={()=>navigate(`/talents/${candidate.id}`)}>
                                                                            <div className="tal--pro-card-left-area search">
                                                                                <div className='card-split-line'></div>
                                                                                <div className="tal--pro-card-name-area">
                                                                                    {/* <label className="tal--pro-card-name-check-container">
                                                                                        <input type="checkbox" checked={viewedCandidateForThisCandidate ? true : false} onChange={(e) => e.preventDefault()} />
                                                                                        <div className="tal--pro-card-name-checkmark"></div>
                                                                                    </label> */}
                                                                                    <h6 className='tal--pro-card-name'>{candidate.firstName + ' ' + candidate.lastName}</h6>
                                                                                </div>
                                                                                <div className="tal--pro-card-tags search">
                                                                                    <h6 className='tal--pro-card-exp'>
                                                                                        Experience : {candidate.year > 0 ? candidate.year + 'years' : "" + candidate.month > 0 ? candidate.month + 'months' : ""}
                                                                                    </h6>
                                                                                    <h6 className='tal--pro-card-exp'>
                                                                                        9.5 LPA
                                                                                    </h6>
                                                                                    <h6 className='tal--pro-card-location'>
                                                                                        <i class="bx bxs-map"></i>
                                                                                        <span>{candidate.location}</span>
                                                                                    </h6>
                                                                                    <h6 className='tal--pro-card-role'>
                                                                                        {candidate.designation[0]}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="tal--pro-card-desc-area search">
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
                                                                                            <p className='tal--pro-card-desc'>{candidate.college}</p>
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
                                                                                            <p className='tal--pro-card-desc'>{candidate.skills.join(", ")}</p>
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
                                                                                <div className="tal--pro-card-bottom-btn-area search">
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

                                                                            <div className="tal--pro-card-right-area search">
                                                                                <div className="tal--pro-card-right-cover-area search">
                                                                                    <div className='tal--pro-card-profile-img-role-area search'>
                                                                                        <img src={imgSrc} alt="" />
                                                                                        <p className='tal--pro-card-role-name'>Frontend Developer (Css,html)</p>
                                                                                    </div>
                                                                                    <div className="tal--pro-card-contact-btn-area search">
                                                                                        <button className='tal--pro-card-contact-btn search'>View Phone Number</button>
                                                                                        <button className='tal--pro-card-contact-btn search'>
                                                                                            <img src="assets/img/talent-profile/call.png" alt="" />
                                                                                            Call Candidate
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className="tal--pro-card-ability-number-area">
                                                                                        <div className="tal--pro-card-ability-number-left">
                                                                                            <h6 className='tal--pro-card-ability search'>Skill matched</h6>
                                                                                            <h2 className='tal--pro-card-percentage search'>90%</h2>
                                                                                        </div>
                                                                                        <div className="tal--pro-card-ability-number-right">
                                                                                            <h6 className='tal--pro-card-ability search'>Can join in</h6>
                                                                                            <h2 className='tal--pro-card-days search'>07<span>days</span></h2>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="tal--pro-card-right-btn-area search">
                                                                                    <button className='tal--pro-card-right-btn search'>
                                                                                        <img src="assets/img/talent-profile/document.png" alt="" />
                                                                                    </button>
                                                                                    <button className='tal--pro-card-right-btn search'>
                                                                                        <img src="assets/img/talent-profile/arrow.png" alt="" />
                                                                                    </button>
                                                                                    <button className='tal--pro-card-right-btn search'>
                                                                                        <img src="assets/img/talent-profile/email.png" alt="" />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </article>
                                                                    )
                                                            }) }
                                                        <div className="tal--pro-paginate-btn-area" data-aos="fade-up">
                                                            <h6 className='tal--pro-total-result-text'>Total Items : <span>{reqCands.length}</span></h6>
                                                            <div className='tal--pro-slider-btn-sub'>
                                                                <button className="tal--pro-slider-btn">
                                                                    <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                                        <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                                                    </svg>
                                                                </button>
                                                                <button className="tal--pro-slider-btn">
                                                                    <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                                        <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    )
}
export default AppliedCandidate;