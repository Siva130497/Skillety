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

const TalentsProfileSearch = () => {
    const [clientToken, setClientToken] = useState("");
    
    const {getProtectedData, getClientChoosenPlan, packageSelectionDetail} = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState([]);
    const [cvViews, setCvViews] = useState();
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [filteredSearchResults, setFilteredSearchResults]= useState([]);
    const [filteredSearchResultsMsg, setFilteredSearchResultsMsg] = useState("");
    const [searchResult, setSearchResult] = useState(false);
    const [viewedCandidate, setViewedCandidate] = useState([]);
    
    const [filters, setFilters] = useState({
        searchInput:"",
        minExperience:"",
        maxExperience:"",
        location:"",
    })

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
    }, [searchResult]);

    const getAllCandidateDetail = async () => {
        try{
            const response = await axios.get('http://localhost:5002/candidate-Detail', {
              headers: {
                  Accept: 'application/json'
              }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setCandidateDetail(result.reverse());
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
      };

    useEffect(()=>{
        getAllCandidateDetail();
      },[]);

    const getLoginClientDetail = async() => {
        try{
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
        }catch(err){
          console.log(err);
        }
      }

      const getViewedCandidates = async() => {
        try{
            const res = await axios.get(`http://localhost:5002/cv-views/${loginClientDetail.companyId}`, {
              headers: {
                  Authorization: `Bearer ${clientToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setViewedCandidate(result);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
        }
      }

      useEffect(() => {
            if(clientToken){
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

      useEffect(()=>{
        if(employeeId){
          getLoginClientDetail();
        }
      },[employeeId]);

      useEffect(() => {
        if(loginClientDetail.companyId){
          getViewedCandidates();
          const fetchData = async () => {
            try {
              
              await getClientChoosenPlan(loginClientDetail.companyId);
              
              if (packageSelectionDetail && packageSelectionDetail.cvViews) {
                setCvViews(packageSelectionDetail.cvViews);
              }
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchData();
        }
      }, [loginClientDetail]);
      

    const handleSkillSearch = () => {
        if(filters.searchInput || filters.location || (filters.minExperience && filters.maxExperience)){
            setFilteredSearchResultsMsg("")
            setSearchResult(true)
            const filteredResults = candidateDetail
                .filter(candidate => {
                if (filters.searchInput) { 
                    return ((candidate.skills
                    .map(skill => skill.toLowerCase()) 
                    .includes(filters.searchInput.toLowerCase())) || 
                    (candidate.designation[0].toLowerCase().includes(filters.searchInput.toLowerCase()))) 
                }
                return true;
                })
                .filter(candidate => {
                    if (filters.minExperience && filters.maxExperience) {
                        return (candidate.month >= filters.minExperience && candidate.month <= filters.     maxExperience) ||(candidate.year >= filters.minExperience && candidate.year <= filters.maxExperience)
                    }
                    return true;
                })
                .filter(candidate => {
                    if (filters.location) {
                        return candidate.location.toLowerCase() === filters.location.toLowerCase();
                    }
                    return true;
                })
            
            console.log(filteredResults)
            if(filteredResults.length > 0){
                setFilteredSearchResults(filteredResults);
            }else{
                setFilteredSearchResultsMsg("no such candidates found")
            }
        }else{
            alert("select atleast one filter")
        }
    };
      
        
        
      
      
      
    //   const handleSkillSearch = () => {
    //     setSearchResult(true);
    
    //     const searchResults = searchInput
    //       .split(/[,\s]+/) 
    //       .filter(result => result.trim());
      
    //     const filteredObjBySkills = candidateDetail.filter(candidate =>
    //       searchResults.some(searchResult => 
    //         candidate.skills.some(skill =>
    //           skill.toLowerCase().includes(searchResult.toLowerCase())
    //         )
    //       )
    //     );
    
    //     const filteredObjByDesignation = candidateDetail.filter(candidate =>
    //       searchResults.some(searchResult => 
    //         candidate.designation[0].toLowerCase().includes(searchResult.toLowerCase())
    //       )
    //     );

    //     const mergedResults = [...filteredObjBySkills, ...filteredObjByDesignation];

    //     const filteredObjByExperienceMonth = candidateDetail.filter(candidate =>
    //         candidate.month >= minExperienceMonth &&
    //         candidate.month <= maxExperienceMonth
    //     );

    //     const filteredObjByExperienceYear = candidateDetail.filter(candidate =>
    //         candidate.year >= minExperienceYear &&
    //         candidate.year <= maxExperienceYear
    //     );

        
    //     const filteredObjByLocation = candidateDetail.filter(candidate =>
    //         candidate.location.toLowerCase().includes(location.toLowerCase())
    //     );


        
    //     // if(mergedResults.length > 0){
    //     //     setFilteredSearchResults(mergedResults);
    //     // }else{

    //     //     setFilteredSearchResultsMsg("no such candidates found")
    //     // }
    //   }

      const viewCandidateDetail = (id) => {
        if(packageSelectionDetail){
            if(viewCandidateDetail.length > 0){
                const alreadyViewedCandidate = viewedCandidate.find(cand=>cand.candidateId === id)
                if(alreadyViewedCandidate){
                    navigate(`/talents/${id}`);
                }else{
                    if(viewedCandidate.length < cvViews){
                        const idData = {
                            candidateId:id,
                            companyId:loginClientDetail.companyId,
                        }
                        axios.post("http://localhost:5002/cv-views", idData, {
                            headers: {
                                Authorization: `Bearer ${clientToken}`,
                                Accept: 'application/json'
                            }
                        })
                        .then(response => {
                            const result = response.data;
                            console.log(result);
                            getViewedCandidates();
                            navigate(`/talents/${id}`);
                        })
                        .catch(error => {
                            console.error(error);
                        })
                    }else{
                        alert("you reached your max cv-views in your plan, upgrade your plan");
                    }
                }
            }else{
                const idData = {
                    candidateId:id,
                    companyId:loginClientDetail.companyId,
                  }
                  axios.post("http://localhost:5002/cv-views", idData, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                  })
                  .then(response => {
                    const result = response.data;
                    console.log(result);
                    getViewedCandidates();
                    navigate(`/talents/${id}`);
                  })
                  .catch(error => {
                    console.error(error);
                  })
            }
        }else{
            alert("buy a package plan to view cv detail")
        }
      }

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
                                        {/* <div className="breadcrumb--area-dark" data-aos="fade-down">
                                            <div className="breadcrumb--item-dark">
                                                <a href="/">Home</a>
                                            </div>
                                            <div className="breadcrumb--item-dark">
                                                <p>Search Talent</p>
                                            </div>
                                        </div> */}

                                        {/* Search page section start */}
                                        {!searchResult ? 
                                        <div className='talent--profile-search-page-section'>
                                            <div className="cli-tal-pro-search-container">
                                                <div className="row">
                                                    <div className="col-12 col-lg-12 col-xl-6 col-md-12">
                                                        <h4 className='cli-tal-pro-search-heading'>Search Page</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row row-border-custom">
                                                <div className="col-12 col-lg-8 col-xl-8 col-md-8 custom-right-border-col mt-4 mt-md-5">
                                                    <div className="cli-tal-pro-search-filter-area">
                                                        <div className="cli-tal-pro-search-filter-head-area">
                                                            <h6 className='cli-tal-pro-search-filter mb-0'>Filters</h6>
                                                            <img src="assets/img/talent-profile/filter.png" className='cli-tal-pro-filter-img' alt="" />
                                                        </div>
                                                        <div className="cli-tal-pro-search-filter-container">

                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-content">
                                                                    <div class="cli-tal-pro-search-filter-title-area">
                                                                        <div class='info-icon-area'>
                                                                            <h6 class='cli-tal-pro-search-filter-title'>Notice period / Availability to join</h6>
                                                                            <button class='info-icon-button'>
                                                                                <i class="ri-information-line info-icon"></i>
                                                                            </button>
                                                                            <div class="tooltip">This is the information about the notice period & availability to join.</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tal--search-options-area">
                                                                        <div className="tal--search-option-container">
                                                                            <input id="notice_period_1" className="tal--search-radio" type="radio" name="notice_period" />
                                                                            <div className="tal--search-tile">
                                                                                <label for="notice_period_1" className="tal--search-tile-label pe-2 ps-2">Any</label>
                                                                            </div>
                                                                        </div>

                                                                        <div className="tal--search-option-container">
                                                                            <input id="notice_period_2" className="tal--search-radio" type="radio" name="notice_period" />
                                                                            <div className="tal--search-tile">
                                                                                <label for="notice_period_2" className="tal--search-tile-label">0-07 days</label>
                                                                                <i class="bi bi-plus"></i>
                                                                            </div>
                                                                        </div>

                                                                        <div className="tal--search-option-container">
                                                                            <input id="notice_period_3" className="tal--search-radio" type="radio" name="notice_period" />
                                                                            <div className="tal--search-tile">
                                                                                <label for="notice_period_3" className="tal--search-tile-label">08 to 15 days</label>
                                                                                <i class="bi bi-plus"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tal--search-option-container">
                                                                            <input id="notice_period_4" className="tal--search-radio" type="radio" name="notice_period" />
                                                                            <div className="tal--search-tile">
                                                                                <label for="notice_period_4" className="tal--search-tile-label">16 to 30 days</label>
                                                                                <i class="bi bi-plus"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tal--search-option-container">
                                                                            <input id="notice_period_5" className="tal--search-radio" type="radio" name="notice_period" />
                                                                            <div className="tal--search-tile">
                                                                                <label for="notice_period_5" className="tal--search-tile-label">beyond 30 days</label>
                                                                                <i class="bi bi-plus"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tal--search-option-container">
                                                                            <input id="notice_period_6" className="tal--search-radio" type="radio" name="notice_period" />
                                                                            <div className="tal--search-tile">
                                                                                <label for="notice_period_6" className="tal--search-tile-label">Currently serving notice Period</label>
                                                                                <i class="bi bi-plus"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="cli-tal-pro-search-filter-content">
                                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                                        <h6 className='cli-tal-pro-search-filter-title'>Keywords</h6>
                                                                        {/* <div class="cl-toggle-switch">
                                                                            <label class="cl-switch">
                                                                                <input type="checkbox" className="toggleSwitch" />
                                                                                <span></span>
                                                                            </label>
                                                                            <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
                                                                        </div> */}
                                                                    </div>
                                                                    <div className="cli--tal-pro-filter-input-area">
                                                                        <input type="text" className='cli--tal-pro-filter-input' placeholder='Enter keywords like skills, designation' 
                                                                        value={filters.searchInput}
                                                                        onChange={(e)=>setFilters({...filters, searchInput:e.target.value})}
                                                                        />
                                                                        <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
                                                                    </div>

                                                                    <div className="cli--mark-keyword-area">
                                                                        <label className="cli--mark-keyword-check-input">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Mark all keywords as mandatory
                                                                        </label>

                                                                        <label className="cli--mark-keyword-check-input">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Search all keyword in entire resume
                                                                        </label>
                                                                    </div>
                                                                    <div id="containerSearch" className='multi-input-container'>
                                                                        <div className="cli--tal-search-add-input-area mt-3">
                                                                            <button className='cli--tal-search-keyword-add-input-button-search'>
                                                                                <i class="bi bi-plus add-input-icon"></i>
                                                                                Add Exclude Keywords
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div id="containerSearch2" className='multi-input-container'>
                                                                        <div className="cli--tal-search-add-input-area">
                                                                            <button className='cli--tal-search-skill-add-input-button-search'>
                                                                                <i class="bi bi-plus add-input-icon"></i>
                                                                                Add IT Skills
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="cli-tal-pro-search-filter-content">
                                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                                        <h6 className='cli-tal-pro-search-filter-title'>Experience</h6>
                                                                    </div>
                                                                    <div className="cli-tal-pro-exp-input-area search-page">
                                                                        <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Min Experience' value={filters.minExperience}
                                                                        onChange={(e)=>setFilters({...filters, minExperience:e.target.value})}/>
                                                                        <span className='cli-tal-pro-exp-input-text'>to</span>
                                                                        <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Max Experience' value={filters.maxExperience}
                                                                        onChange={(e)=>setFilters({...filters, maxExperience:e.target.value})}/>
                                                                        <span className='cli-tal-pro-exp-input-text'>months/years</span>
                                                                    </div>
                                                                </div>

                                                                <div className="cli-tal-pro-search-filter-content">
                                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                                        <h6 className='cli-tal-pro-search-filter-title'>Current location of candidate</h6>
                                                                    </div>
                                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                                        <input type="text" className='cli-tal-pro-search-filter-input location' placeholder='Add location' value={filters.location}
                                                                        onChange={(e)=>setFilters({...filters, location:e.target.value})}/>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area search-results">
                                                                        <label className="cli--mark-keyword-check-input">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Include candidate who prefer to relocate to above location
                                                                        </label>
                                                                        <div className='cli-change--location-area'>
                                                                            Change preferred location
                                                                        </div>
                                                                        <label className="cli--mark-keyword-check-input">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Exclude candidate  who have mentioned Anywhere in ...
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="cli-tal-pro-search-filter-content">
                                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                                        <h6 className='cli-tal-pro-search-filter-title'>Annual Salary</h6>
                                                                    </div>
                                                                    <div className="cli-tal-pro-exp-input-area search-page">
                                                                        <div className="cli--salary-inputs-area">
                                                                            <select name="" className='cli-tal-pro-select-input width-30' id="">
                                                                                <option value="" disabled>Select</option>
                                                                                <option value="1" selected>INR</option>
                                                                                <option value="2">LKR</option>
                                                                                <option value="3">USD</option>
                                                                                <option value="4">GBP</option>
                                                                            </select>
                                                                            <input type="number" className='cli-tal-pro-exp-input numeric-input width-70' placeholder='Min Salary in Lacs' />
                                                                        </div>
                                                                        <span className='cli-tal-pro-exp-input-text'>to</span>
                                                                        <input type="number" className='cli-tal-pro-exp-input text-center numeric-input width-45 search-page' placeholder='Max Salary in Lacs' />
                                                                        <span className='cli-tal-pro-exp-input-text'>lacs</span>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area">
                                                                        <label className="cli--mark-keyword-check-input">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Include candidate  who did not mention their current salary
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Employment Details</h6>
                                                                    {/* <i class="bi bi-chevron-down"></i> */}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-search-filter-form-group">
                                                                            <div className="cli-tal-search-filter-form-label-area">
                                                                                <label htmlFor="department_role" className='cli-tal-search-filter-form-label'>Department and Roles</label>
                                                                            </div>
                                                                            <div className="cli-tal-pro-search-filter-input-area">
                                                                                <input type="text" name='department_role' className='cli-tal-pro-search-filter-input' placeholder='Add Department/Role' />
                                                                            </div>
                                                                        </div>

                                                                        <div className="cli-tal-search-filter-form-group">
                                                                            <div className="cli-tal-search-filter-form-label-area">
                                                                                <label htmlFor="industry" className='cli-tal-search-filter-form-label'>Industry</label>
                                                                            </div>
                                                                            <div className="cli-tal-pro-search-filter-input-area">
                                                                                <input type="text" name='industry' className='cli-tal-pro-search-filter-input' placeholder='Add Industry' />
                                                                            </div>
                                                                        </div>

                                                                        <div className="cli-tal-search-filter-form-group">
                                                                            <div className="cli-tal-search-filter-form-label-area">
                                                                                <label htmlFor="company" className='cli-tal-search-filter-form-label'>Company</label>
                                                                                {/* <div class="cl-toggle-switch">
                                                                                    <label class="cl-switch">
                                                                                        <input type="checkbox" id="toggletoSwitch1" />
                                                                                        <span></span>
                                                                                    </label>
                                                                                    <h6 className='cl-toggle--switch-label' id="labelText1">Boolean Off</h6>
                                                                                </div> */}
                                                                            </div>
                                                                            <div className="cli-tal-pro-search-filter-input-area">
                                                                                <input type="text" name='company' className='cli-tal-pro-search-filter-input' placeholder='Add Company name' />
                                                                            </div>
                                                                            <div id="container" className='multi-input-container'>
                                                                                <div className="cli--tal-search-add-input-area mt-3">
                                                                                    <button className='cli--tal-search-add-input-button'>
                                                                                        <i class="bi bi-plus add-input-icon"></i>
                                                                                        Add Exclude Company
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="cli-tal-search-filter-form-group">
                                                                            <div className="cli-tal-search-filter-form-label-area">
                                                                                <label htmlFor="designation" className='cli-tal-search-filter-form-label'>Designation</label>
                                                                                {/* <div class="cl-toggle-switch">
                                                                                    <label class="cl-switch">
                                                                                        <input type="checkbox" id="toggletoSwitch2" />
                                                                                        <span></span>
                                                                                    </label>
                                                                                    <h6 className='cl-toggle--switch-label' id="labelText2">Boolean Off</h6>
                                                                                </div> */}
                                                                            </div>
                                                                            <div className="cli-tal-pro-search-filter-input-area">
                                                                                <input type="text" name='designation' className='cli-tal-pro-search-filter-input' placeholder='Add designation' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="cli-tal-pro-search-page-btn-area">
                                                                <div className="cli-tal-pro-search-page-days-selection-area">
                                                                    <div className='days-active'>Active In</div>
                                                                    <div class="custom-select">
                                                                        <div class="select-box">
                                                                            <span>Active In</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className='toggle-icon' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                                <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                            </svg>
                                                                        </div>
                                                                        <ul class="select-options">
                                                                            <li data-value="day_1">7 days</li>
                                                                            <li data-value="day_2">14 days</li>
                                                                            <li data-value="day_3">21 days</li>
                                                                            <li data-value="day_4">30 days</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                                <button className="cli-tal-pro-search-page-btn" onClick={handleSkillSearch}>
                                                                    Search Candidates
                                                                </button>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="col-12 col-lg-4 col-xl-4 col-md-4 custom-border-top-sm mt-4 mt-md-5">
                                                    <div className="cli-tal-pro-recent-search-section">
                                                        <div className="cli-tal-pro-recent-search-head-area">
                                                            <i class="ri-history-line"></i>
                                                            <h4 className='cli-tal-pro-recent-search-head mb-0'>Recent Searches </h4>
                                                        </div>
                                                        <div className="cli-tal-pro-recent-search-container">
                                                            <div className="cli-tal-pro-recent-search-area">
                                                                <div className="cli-tal-pro-recent-search-btn-area">
                                                                    <button className='cli-tal-pro-recent-search-btn'>Fill this search</button>
                                                                    <button className='cli-tal-pro-recent-search-btn'>Search profile</button>
                                                                </div>
                                                                <div className="cli-tal-pro-recent-search-tags">
                                                                    <span>azure, Azure Devops | .NET, MVC, C#, Angualr, sql, cloud, aws | 9-12 years | Bangalore/Bengaluru,....</span>
                                                                </div>
                                                            </div>

                                                            <div className="cli-tal-pro-recent-search-area">
                                                                <div className="cli-tal-pro-recent-search-btn-area">
                                                                    <button className='cli-tal-pro-recent-search-btn'>Fill this search</button>
                                                                    <button className='cli-tal-pro-recent-search-btn'>Search profile</button>
                                                                </div>
                                                                <div className="cli-tal-pro-recent-search-tags">
                                                                    <span>azure, Azure Devops | .NET, MVC, C#, Angualr, sql, cloud, aws | 9-12 years | Bangalore/Bengaluru,....</span>
                                                                </div>
                                                            </div>

                                                            <div className="cli-tal-pro-recent-search-area">
                                                                <div className="cli-tal-pro-recent-search-btn-area">
                                                                    <button className='cli-tal-pro-recent-search-btn'>Fill this search</button>
                                                                    <button className='cli-tal-pro-recent-search-btn'>Search profile</button>
                                                                </div>
                                                                <div className="cli-tal-pro-recent-search-tags">
                                                                    <span>azure, Azure Devops | .NET, MVC, C#, Angualr, sql, cloud, aws | 9-12 years | Bangalore/Bengaluru,....</span>
                                                                </div>
                                                            </div>

                                                            <div className="cli-tal-pro-recent-search-area">
                                                                <div className="cli-tal-pro-recent-search-btn-area">
                                                                    <button className='cli-tal-pro-recent-search-btn'>Fill this search</button>
                                                                    <button className='cli-tal-pro-recent-search-btn'>Search profile</button>
                                                                </div>
                                                                <div className="cli-tal-pro-recent-search-tags">
                                                                    <span>azure, Azure Devops | .NET, MVC, C#, Angualr, sql, cloud, aws | 9-12 years | Bangalore/Bengaluru,....</span>
                                                                </div>
                                                            </div>

                                                            <div className="cli-tal-pro-recent-search-area">
                                                                <div className="cli-tal-pro-recent-search-btn-area">
                                                                    <button className='cli-tal-pro-recent-search-btn'>Fill this search</button>
                                                                    <button className='cli-tal-pro-recent-search-btn'>Search profile</button>
                                                                </div>
                                                                <div className="cli-tal-pro-recent-search-tags">
                                                                    <span>azure, Azure Devops | .NET, MVC, C#, Angualr, sql, cloud, aws | 9-12 years | Bangalore/Bengaluru,....</span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="cli-tal-pro-recent-search-area">
                                                                <div className="cli-tal-pro-recent-search-btn-area">
                                                                    <button className='cli-tal-pro-recent-search-btn'>Fill this search</button>
                                                                    <button className='cli-tal-pro-recent-search-btn'>Search profile</button>
                                                                </div>
                                                                <div className="cli-tal-pro-recent-search-tags">
                                                                    <span>azure, Azure Devops | .NET, MVC, C#, Angualr, sql, cloud, aws | 9-12 years | Bangalore/Bengaluru,....</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> :
                                        // test

                                        
                                        <div className='talent--profile-search-results-section'>
                                            <div className="cli-tal-pro-search-container">
                                                <div className="row">
                                                    <div className="col-12 col-lg-12 col-xl-4 col-md-12">
                                                        <h4 className='cli-tal-pro-search-heading'>Search Result Page</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="pl--package-btn-sub previous back-to-search-btn pb-5" onClick={()=>setSearchResult(false)}>
                                                <div class="pl--package-arrow-area prev">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27 27" fill="none">
                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2"></path>
                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2"></path>
                                                        <path d="M1 26L25.1667 1" stroke="white" stroke-width="2"></path>
                                                    </svg>
                                                </div>
                                                <div class="pl--package-btn job">Back to Search
                                                </div>
                                            </button>
                                            <div className="row row-border-custom">
                                                <div className="col-12 col-lg-4 col-xl-4 col-md-4 custom-right-border-col ps-lg-0 ps-md-1 col-width-lg-30">
                                                    <div className="cli-tal-pro-search-filter-area">
                                                        <div className="cli-tal-pro-search-filter-head-area search-results">
                                                            <h6 className='cli-tal-pro-search-filter mb-0'>Filters</h6>
                                                            <img src="assets/img/talent-profile/filter.png" className='cli-tal-pro-filter-img' alt="" />
                                                        </div>
                                                        <div className="cli-tal-pro-search-filter-container mt-1">

                                                            {/* Notice period / Availability  to join */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <div class='info-icon-area'>
                                                                        <h6 className='cli--emploment-detail-head'>Notice period / Availability to join
                                                                            <button class='info-icon-button'>
                                                                                <i class="ri-information-line info-icon"></i>
                                                                            </button>
                                                                            <div class="tooltip">This is the information about the notice period & availability to join.</div>
                                                                        </h6>
                                                                    </div>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="tal--search-options-area">
                                                                            <div className="tal--search-option-container">
                                                                                <input id="notice_period_1" className="tal--search-radio" type="radio" name="notice_period" />
                                                                                <div className="tal--search-tile">
                                                                                    <label for="notice_period_1" className="tal--search-tile-label pe-2 ps-2">Any</label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="tal--search-option-container">
                                                                                <input id="notice_period_2" className="tal--search-radio" type="radio" name="notice_period" />
                                                                                <div className="tal--search-tile">
                                                                                    <label for="notice_period_2" className="tal--search-tile-label">0-07 days</label>
                                                                                    <i class="bi bi-plus"></i>
                                                                                </div>
                                                                            </div>

                                                                            <div className="tal--search-option-container">
                                                                                <input id="notice_period_3" className="tal--search-radio" type="radio" name="notice_period" />
                                                                                <div className="tal--search-tile">
                                                                                    <label for="notice_period_3" className="tal--search-tile-label">08 to 15 days</label>
                                                                                    <i class="bi bi-plus"></i>
                                                                                </div>
                                                                            </div>
                                                                            <div className="tal--search-option-container">
                                                                                <input id="notice_period_4" className="tal--search-radio" type="radio" name="notice_period" />
                                                                                <div className="tal--search-tile">
                                                                                    <label for="notice_period_4" className="tal--search-tile-label">16 to 30 days</label>
                                                                                    <i class="bi bi-plus"></i>
                                                                                </div>
                                                                            </div>
                                                                            <div className="tal--search-option-container">
                                                                                <input id="notice_period_5" className="tal--search-radio" type="radio" name="notice_period" />
                                                                                <div className="tal--search-tile">
                                                                                    <label for="notice_period_5" className="tal--search-tile-label">beyond 30 days</label>
                                                                                    <i class="bi bi-plus"></i>
                                                                                </div>
                                                                            </div>
                                                                            <div className="tal--search-option-container">
                                                                                <input id="notice_period_6" className="tal--search-radio" type="radio" name="notice_period" />
                                                                                <div className="tal--search-tile">
                                                                                    <label for="notice_period_6" className="tal--search-tile-label">Currently serving notice Period</label>
                                                                                    <i class="bi bi-plus"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Keywords */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Keywords</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        {/* <div class="cl-toggle-switch">
                                                                            <label class="cl-switch">
                                                                                <input type="checkbox" className="toggleSwitch" />
                                                                                <span></span>
                                                                            </label>
                                                                            <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
                                                                        </div> */}

                                                                        <div className="cli--tal-pro-filter-input-area">
                                                                            <input type="text" className='cli--tal-pro-filter-input' placeholder='Enter keywords like skills, designation' />
                                                                            <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
                                                                        </div>

                                                                        <div className="cli--mark-keyword-area">
                                                                            <label className="cli--mark-keyword-check-input">
                                                                                <input type="checkbox" />
                                                                                <span className="cli--mark-keyword-checkmark"></span>
                                                                                Mark all keywords as mandatory
                                                                            </label>
                                                                        </div>
                                                                        <div id="container1" className='multi-input-container'>
                                                                            <div className="cli--tal-search-add-input-area mt-3">
                                                                                <button className='cli--tal-search-keyword-add-input-button'>
                                                                                    <i class="bi bi-plus add-input-icon"></i>
                                                                                    Add Exclude Keywords
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div id="container2" className='multi-input-container'>
                                                                            <div className="cli--tal-search-add-input-area">
                                                                                <button className='cli--tal-search-skill-add-input-button'>
                                                                                    <i class="bi bi-plus add-input-icon"></i>
                                                                                    Add IT Skills
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Experience */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Experience</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-pro-exp-input-area search-results">
                                                                            <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Min Experience' />
                                                                            <span className='cli-tal-pro-exp-input-text'>to</span>
                                                                            <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Max Experience' />
                                                                            <span className='cli-tal-pro-exp-input-text'>years</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Location */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Location</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                            <input type="text" className='cli-tal-pro-search-filter-input' placeholder='Add location' />
                                                                        </div>
                                                                        <div className="cli--mark-keyword-area search-results">
                                                                            <label className="cli--mark-keyword-check-input">
                                                                                <input type="checkbox" />
                                                                                <span className="cli--mark-keyword-checkmark"></span>
                                                                                Include candidate who prefer to relocate to above location
                                                                            </label>
                                                                            <div className='cli-change--location-area'>
                                                                                Change preferred location
                                                                            </div>
                                                                            <label className="cli--mark-keyword-check-input">
                                                                                <input type="checkbox" />
                                                                                <span className="cli--mark-keyword-checkmark"></span>
                                                                                Exclude candidate  who have mentioned Anywhere in ...
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Salary (INR- Lacs ) */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Salary (INR- Lacs )</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-pro-exp-input-area search-results">
                                                                            <div className="cli--salary-inputs-area">
                                                                                <select name="" className='cli-tal-pro-select-input width-30' id="">
                                                                                    <option value="" disabled>Select</option>
                                                                                    <option value="1" selected>INR</option>
                                                                                    <option value="2">LKR</option>
                                                                                    <option value="3">USD</option>
                                                                                    <option value="4">GBP</option>
                                                                                </select>
                                                                                <input type="number" className='cli-tal-pro-exp-input numeric-input width-70' placeholder='Min Salary in Lacs' />
                                                                            </div>
                                                                            <span className='cli-tal-pro-exp-input-text'>to</span>
                                                                            <input type="number" className='cli-tal-pro-exp-input text-center numeric-input width-45 search-results' placeholder='Max Salary in Lacs' />
                                                                            <span className='cli-tal-pro-exp-input-text'>lacs</span>
                                                                        </div>
                                                                        <div className="cli--mark-keyword-area">
                                                                            <label className="cli--mark-keyword-check-input">
                                                                                <input type="checkbox" />
                                                                                <span className="cli--mark-keyword-checkmark"></span>
                                                                                Include candidate  who did not mention their current salary
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Department and Roles */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Department and Roles</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                            <input type="text" name='department_role' className='cli-tal-pro-search-filter-input' placeholder='Add Department/Role' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Industry */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Industry</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                            <input type="text" name='industry' className='cli-tal-pro-search-filter-input' placeholder='Add Industry' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Current Company */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Current Company</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        {/* <div class="cl-toggle-switch">
                                                                            <label class="cl-switch">
                                                                                <input type="checkbox" className="toggleSwitch" />
                                                                                <span></span>
                                                                            </label>
                                                                            <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
                                                                        </div> */}
                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                            <input type="text" name='company' className='cli-tal-pro-search-filter-input' placeholder='Add Company name' />
                                                                        </div>
                                                                        <div id="containerCompany" className='multi-input-container'>
                                                                            <div className="cli--tal-search-add-input-area mt-3">
                                                                                <button className='cli--tal-search-add-company-input-button'>
                                                                                    <i class="bi bi-plus add-input-icon"></i>
                                                                                    Add Exclude Company
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Current Designation */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Current Designation</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        {/* <div class="cl-toggle-switch">
                                                                            <label class="cl-switch">
                                                                                <input type="checkbox" className="toggleSwitch" />
                                                                                <span></span>
                                                                            </label>
                                                                            <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
                                                                        </div> */}
                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                            <input type="text" name='designation' className='cli-tal-pro-search-filter-input' placeholder='Add designation' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Work Details */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Work Details</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-search-filter-form-group search-results">
                                                                            <div className="cli-tal-search-filter-form-label-area">
                                                                                <label htmlFor="candidate_seek" className='cli-tal-search-filter-form-label'>Show candidate seeking</label>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-12 col-xl-6 col-lg-6 col-md-12 mb-md-4 mb-lg-0 mb-xl-0">
                                                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                                                        <select name="job_type" id="candidate_seek"
                                                                                            className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                            <option value="" disabled selected>Job type</option>
                                                                                            <option value="1">Job type 1</option>
                                                                                            <option value="2">Job type 2</option>
                                                                                            <option value="3">Job type 3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-12 col-xl-6 col-lg-6 col-md-12">
                                                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                                                        <select name="employee_type" id="candidate_seek"
                                                                                            className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                            <option value="" disabled selected>Employment type</option>
                                                                                            <option value="1">Employment type 1</option>
                                                                                            <option value="2">Employment type 2</option>
                                                                                            <option value="3">Employment type 3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="cli-tal-search-filter-form-group search-results">
                                                                            <div className="cli-tal-search-filter-form-label-area">
                                                                                <label htmlFor="work_permit" className='cli-tal-search-filter-form-label'>Work permit for</label>
                                                                            </div>
                                                                            <div className="cli-tal-pro-search-filter-input-area">
                                                                                <input type="text" className='cli-tal-pro-search-filter-input' placeholder='Choose Category' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Display Details */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Display Details</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-pro-search-filter-content">
                                                                            <div className="cli-tal-pro-search-filter-title-area">
                                                                                <h6 className='cli-tal-pro-search-filter-title'>Show</h6>
                                                                            </div>

                                                                            <div className="tal--search-options-area">
                                                                                <div className="tal--search-option-container">
                                                                                    <input id="all_candidate" className="tal--search-radio" type="radio" name="show" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="all_candidate" className="tal--search-tile-label">All candidates</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="tal--search-option-container">
                                                                                    <input id="new_reg" className="tal--search-radio" type="radio" name="show" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="new_reg" className="tal--search-tile-label">New Registrations</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="tal--search-option-container">
                                                                                    <input id="recent_activity" className="tal--search-radio" type="radio" name="show" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="recent_activity" className="tal--search-tile-label">Active Recently</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="cli-tal-pro-search-filter-content mb-0">
                                                                            <div className="cli-tal-pro-search-filter-title-area">
                                                                                <h6 className='cli-tal-pro-search-filter-title'>Show only candidates with </h6>
                                                                            </div>

                                                                            <div className="tal--search-options-area">
                                                                                <div className="tal--search-option-container">
                                                                                    <input id="ver_mobile" className="tal--search-radio" type="radio" name="show_cand" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="ver_mobile" className="tal--search-tile-label">Verified mobile number</label>
                                                                                        <i class="bi bi-plus"></i>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="tal--search-option-container">
                                                                                    <input id="ver_email" className="tal--search-radio" type="radio" name="show_cand" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="ver_email" className="tal--search-tile-label">Verified email ID </label>
                                                                                        <i class="bi bi-plus"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="tal--search-option-container">
                                                                                    <input id="att_resume" className="tal--search-radio" type="radio" name="show_cand" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="att_resume" className="tal--search-tile-label">Attached resume</label>
                                                                                        <i class="bi bi-plus"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Education Details */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Education Details</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-pro-search-filter-content">
                                                                            <div className="cli-tal-pro-search-filter-title-area">
                                                                                <h6 className='cli-tal-pro-search-filter-title'>UG Qualification</h6>
                                                                            </div>

                                                                            <div className="tal--search-options-area">
                                                                                <div className="tal--search-option-container">
                                                                                    <input id="any_ug" className="tal--search-radio" type="radio" name="ug_qualification" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="any_ug" className="tal--search-tile-label">Any UG Qualification</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="tal--search-option-container">
                                                                                    <input id="spc_ug" className="tal--search-radio" type="radio" name="ug_qualification" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="spc_ug" className="tal--search-tile-label">Specific UG Qualification</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="tal--search-option-container">
                                                                                    <input id="no_ug" className="tal--search-radio" type="radio" name="ug_qualification" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="no_ug" className="tal--search-tile-label">No UG Qualification</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="cli-tal-pro-search-filter-content mb-0">
                                                                            <div className="cli-tal-pro-search-filter-title-area">
                                                                                <h6 className='cli-tal-pro-search-filter-title'>PG Qualification</h6>
                                                                            </div>

                                                                            <div className="tal--search-options-area">
                                                                                <div className="tal--search-option-container">
                                                                                    <input id="any_pg" className="tal--search-radio" type="radio" name="pg_qualification" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="any_pg" className="tal--search-tile-label">Any PG Qualification</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="tal--search-option-container">
                                                                                    <input id="spc_pg" className="tal--search-radio" type="radio" name="pg_qualification" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="spc_pg" className="tal--search-tile-label">Specific PG Qualification</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="tal--search-option-container">
                                                                                    <input id="no_pg" className="tal--search-radio" type="radio" name="pg_qualification" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="no_pg" className="tal--search-tile-label">No PG Qualification</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div id="container3" className='multi-input-container'>
                                                                                <div className="cli--tal-search-add-input-area">
                                                                                    <button className='cli--tal-search-qualification-add-input-button'>
                                                                                        <i class="bi bi-plus add-input-icon"></i>
                                                                                        Add PPG/Doctorate Qualification
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Diversity and Additional Details */}
                                                            <div className="cli-tal-pro-search-filter-content-section">
                                                                <div className="cli-tal-pro-search-filter-toggle-area">
                                                                    <h6 className='cli--emploment-detail-head'>Diversity and Additional Details</h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                        <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                    </svg>
                                                                </div>
                                                                <div className="cli-tal-pro-search-filter-expand-area">
                                                                    <div className='expand-area-padding'>
                                                                        <div className="cli-tal-pro-search-filter-content mb-0">
                                                                            <div className="cli-tal-pro-search-filter-title-area">
                                                                                <h6 className='cli-tal-pro-search-filter-title'>Gender</h6>
                                                                            </div>

                                                                            <div className="tal--search-options-area">
                                                                                <div className="tal--search-option-container">
                                                                                    <input id="all_cand" className="tal--search-radio" type="radio" name="gender" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="all_cand" className="tal--search-tile-label">All candidates</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="tal--search-option-container">
                                                                                    <input id="male_cand" className="tal--search-radio" type="radio" name="gender" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="male_cand" className="tal--search-tile-label">Male Candidates</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="tal--search-option-container">
                                                                                    <input id="female_cand" className="tal--search-radio" type="radio" name="gender" />
                                                                                    <div className="tal--search-tile">
                                                                                        <label for="female_cand" className="tal--search-tile-label">Female candidates</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="clear--all_button-area">
                                                                <button className='tal--search-submit-btn'>Submit</button>
                                                                <button className='clear--all_button'>
                                                                    Clear all
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-lg-8 col-xl-8 col-md-8 pe-lg-0 pe-md-1 col-width-lg-70">
                                                    {/* <div className="tal--pro-search-result-image-area">
                                                    <img src="assets/img/jobs/filter-data-img.png" className='tal--pro-search-result-image' alt="" data-aos="fade"  />
                                                    <h6 className='tal--pro-search-result-title' data-aos="fade-up">Add Filter for the desired search</h6>
                                                </div> */}
                                                    <div className="cli--tal-pro-search-results-area">
                                                    {filteredSearchResultsMsg ?
                                                        <p>{filteredSearchResultsMsg}</p>:
                                                        filteredSearchResults.length > 0 ?
                                                        filteredSearchResults.map((candidate)=>{
                                                            const viewedCandidateForThisCandidate = loginClientDetail.companyId &&viewedCandidate.find(cand => cand.candidateId === candidate.id);
                                                            return(
                                                                <article className="talent--profile-card search" key={candidate.id} onClick={()=>viewCandidateDetail(candidate.id)}>
                                                                <div className="tal--pro-card-left-area search">
                                                                    <div className='card-split-line'></div>
                                                                    <div className="tal--pro-card-name-area">
                                                                        <label className="tal--pro-card-name-check-container">
                                                                            <input type="checkbox" checked={viewedCandidateForThisCandidate ? true : false} onChange={(e)=>e.preventDefault()}/>
                                                                            <div className="tal--pro-card-name-checkmark"></div>
                                                                        </label>
                                                                        <h6 className='tal--pro-card-name'>{candidate.firstName + ' ' + candidate.lastName}</h6>
                                                                    </div>
                                                                    <div className="tal--pro-card-tags search">
                                                                        <h6 className='tal--pro-card-exp'>
                                                                            Experience : {candidate.year > 0 ? candidate.year+ 'years' : "" + candidate.month > 0 ? candidate.month+ 'months' : ""}
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
                                                                            <img src="../assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
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
                                                        }) : null}
                                                        

                                                        {/* <article className="talent--profile-card search" data-aos="fade-left">
                                                            <div className="tal--pro-card-left-area search">
                                                                <div className='card-split-line'></div>
                                                                <div className="tal--pro-card-name-area">
                                                                    <label className="tal--pro-card-name-check-container">
                                                                        <input type="checkbox" />
                                                                        <div className="tal--pro-card-name-checkmark"></div>
                                                                    </label>
                                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                                </div>
                                                                <div className="tal--pro-card-tags search">
                                                                    <h6 className='tal--pro-card-exp'>
                                                                        Experience : 6 Yrs
                                                                    </h6>
                                                                    <h6 className='tal--pro-card-exp'>
                                                                        9.5 LPA
                                                                    </h6>
                                                                    <h6 className='tal--pro-card-location'>
                                                                        <i class="bx bxs-map"></i>
                                                                        <span>Hyderabad</span>
                                                                    </h6>
                                                                    <h6 className='tal--pro-card-role'>
                                                                        Frontend Developer
                                                                    </h6>
                                                                </div>
                                                                <div className="tal--pro-card-desc-area search">
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
                                                                            <p className='tal--pro-card-desc'>Bsc Delhi University 2019</p>
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
                                                                        <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
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

                                                        <article className="talent--profile-card search" data-aos="fade-left">
                                                            <div className="tal--pro-card-left-area search">
                                                                <div className='card-split-line'></div>
                                                                <div className="tal--pro-card-name-area">
                                                                    <label className="tal--pro-card-name-check-container">
                                                                        <input type="checkbox" />
                                                                        <div className="tal--pro-card-name-checkmark"></div>
                                                                    </label>
                                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                                </div>
                                                                <div className="tal--pro-card-tags search">
                                                                    <h6 className='tal--pro-card-exp'>
                                                                        Experience : 6 Yrs
                                                                    </h6>
                                                                    <h6 className='tal--pro-card-exp'>
                                                                        9.5 LPA
                                                                    </h6>
                                                                    <h6 className='tal--pro-card-location'>
                                                                        <i class="bx bxs-map"></i>
                                                                        <span>Hyderabad</span>
                                                                    </h6>
                                                                    <h6 className='tal--pro-card-role'>
                                                                        Frontend Developer
                                                                    </h6>
                                                                </div>
                                                                <div className="tal--pro-card-desc-area search">
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
                                                                            <p className='tal--pro-card-desc'>Bsc Delhi University 2019</p>
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
                                                                        <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
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

                                                        <article className="talent--profile-card search" data-aos="fade-left">
                                                            <div className="tal--pro-card-left-area search">
                                                                <div className='card-split-line'></div>
                                                                <div className="tal--pro-card-name-area">
                                                                    <label className="tal--pro-card-name-check-container">
                                                                        <input type="checkbox" />
                                                                        <div className="tal--pro-card-name-checkmark"></div>
                                                                    </label>
                                                                    <h6 className='tal--pro-card-name'>Adam Woods</h6>
                                                                </div>
                                                                <div className="tal--pro-card-tags search">
                                                                    <h6 className='tal--pro-card-exp'>
                                                                        Experience : 6 Yrs
                                                                    </h6>
                                                                    <h6 className='tal--pro-card-exp'>
                                                                        9.5 LPA
                                                                    </h6>
                                                                    <h6 className='tal--pro-card-location'>
                                                                        <i class="bx bxs-map"></i>
                                                                        <span>Hyderabad</span>
                                                                    </h6>
                                                                    <h6 className='tal--pro-card-role'>
                                                                        Frontend Developer
                                                                    </h6>
                                                                </div>
                                                                <div className="tal--pro-card-desc-area search">
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
                                                                            <p className='tal--pro-card-desc'>Bsc Delhi University 2019</p>
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
                                                                        <img src="assets/img/talents-images/profile-img.png" className='tal--pro-card-profile-img' alt="" />
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
                                                        </article> */}


                                                        <div className="tal--pro-paginate-btn-area" data-aos="fade-up">
                                                            <h6 className='tal--pro-total-result-text'>Total Items : <span>{filteredSearchResults.length}</span></h6>
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
                                        </div>}
                                        {/* Search results page section end */}
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
export default TalentsProfileSearch;