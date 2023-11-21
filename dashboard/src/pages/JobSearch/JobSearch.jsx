import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './JobSearch.css';
import './JobSearch-responsive.css';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
// import { Slider } from "primereact/slider";
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const JobSearch = () => {
    const [candidateToken, setCandidateToken] = useState("");
    const {getClientImg, clientImg, getProtectedData} = useContext(AuthContext);
    const [candidateId, setCandidateId] = useState("");
    const [allJobs, setAllJobs] = useState([]);
    const [matchJobs, setMatchJobs] = useState([]);
    const [clients, setClients] = useState([])
    const [searchResult, setSearchResult] = useState(true);
    const [filteredSearchResults, setFilteredSearchResults]= useState([]);
    const [filteredSearchResultsMsg, setFilteredSearchResultsMsg] = useState("");
    const [checkBoxfilters, setCheckBoxFilters] = useState([]);
    const [checkBoxJobTitle, setCheckBoxJobTitle] = useState([]);
    const [checkBoxJobLocation, setCheckBoxJobLocation] = useState([]);
    const [checkBoxJobEducation, setCheckBoxJobEducation] = useState([]);

    const [skillArray, setSkillArray] = useState([]);
    const [jobRoleArray, setjobRoleArray] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);

    const [locationArray, setLocationArray] = useState([]);
    const [educationArray, setEducationArray] = useState([]);
   
    const [x, setX] = useState([0, 3]);

    const [filters, setFilters] = useState({
        searchInput:"",
        minExperience:"",
        maxExperience:"",
        location: "",
        currencyType: "",
        minSalary: "",
        maxSalary: "",
    })

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

            ////for view more checkboxes
            var buttons = $(".jobs-view-more-btn");
            buttons.each(function () {
                var button = $(this);
                var hiddenDivs = button.closest(".job-search-multi-check-area").find(".cli--mark-keyword-area.job:nth-child(n+5)");

                button.on("click", function () {
                    hiddenDivs.slideToggle(function () {
                        var buttonText = button.find("span");
                        if (hiddenDivs.is(":visible")) {
                            buttonText.text("View Less");
                        } else {
                            buttonText.text("View More");
                        }
                    });
                });
            });
        });
    }, [candidateToken, getClientImg, clientImg, getProtectedData, candidateId, allJobs, matchJobs, clients, searchResult, filteredSearchResults, filteredSearchResultsMsg, checkBoxfilters, checkBoxJobTitle, checkBoxJobLocation, checkBoxJobEducation, skillArray, jobRoleArray, filteredList, selectedResults, locationArray, educationArray, filters, x]); 

    console.log(filters) 

    const getAllSkills = async () => {
        try {
            const res = await axios.get("http://localhost:5002/skills", {
                headers: {
                    Authorization: `Bearer ${candidateToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setSkillArray(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getAllJobRoles = async () => {
        try {
            const res = await axios.get("http://localhost:5002/designations", {
                headers: {
                    Authorization: `Bearer ${candidateToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setjobRoleArray(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getAllLocations = async () => {
        try {
            const res = await axios.get("http://localhost:5002/locations", {
                headers: {
                    Authorization: `Bearer ${candidateToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setLocationArray(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getAllEducation = async () => {
        try {
          const res = await axios.get("http://localhost:5002/educations", {
            headers: {
              Authorization: `Bearer ${candidateToken}`,
              Accept: 'application/json'
            }
          });
          const result = res.data;
          if (!result.error) {
            console.log(result);
            setEducationArray(result);
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("candidateToken"))
        if(token){
            setCandidateToken(token)
        }
    },[])

    useEffect(() => {
        if(candidateToken){
            const fetchData = async () => {
                try {
                  const user = await getProtectedData(candidateToken);
                  console.log(user);
                  setCandidateId(user.id);
                  
                } catch (error) {
                  console.log(error);
                  
                }
            };
        
            fetchData();
            getAllSkills();
            getAllJobRoles();
            getAllLocations();
            getAllEducation();
        }
    }, [candidateToken]);

    const getPostedjobs = async() => {
        try{
            const res = await axios.get(`http://localhost:5002/posted-jobs`, {
              headers: {
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setAllJobs(result.reverse());
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
        }
      }

      const getSkillMatchJobDetail = async() => {
        try {
            const response = await axios.get(`http://localhost:5002/skill-match-job-Detail/${candidateId}`, {
              headers: {
                  Authorization: `Bearer ${candidateToken}`,
                  Accept: 'application/json'
              }
            });
            const result = response.data;
      
            if (!result.error) {
              console.log(result.reverse());
              setMatchJobs(result.reverse().filter(job => job.percentage > 0));
            } else {
              console.log(result);
            }
          } catch (error) {
            console.log(error);
          }
      };
      

      useEffect(()=>{
        getPostedjobs();
        getClientImg();

        axios.get("http://localhost:5002/clients")
            .then(res=>{
            console.log(res.data)
            setClients(res.data)
            })
            .catch(err=>console.log(err))
      },[])

      useEffect(()=>{
        if(candidateId){
          getSkillMatchJobDetail();
        }
      },[candidateId])

      const handleSkillSearch = () => {
        if(selectedResults.length > 0 || checkBoxfilters.length > 0 || (filters.maxExperience && filters.maxExperience) || checkBoxJobTitle.length > 0 || checkBoxJobLocation.length > 0 || (filters.minSalary && filters.maxSalary) || checkBoxJobEducation.length > 0){ 
            setX([0, 3]);
            setFilteredSearchResultsMsg("") 
            // setAllJobs([])
            // setMatchJobs([]) 
            // setSearchResult(true)
            const filteredResults = allJobs
                .filter(job => {
                    if (selectedResults.length > 0) {
                        return selectedResults.some(result =>
                            job.skills.includes(result) || job.jobRole.includes(result)
                        );
                    }
                    return true;
                })
                .filter(job => {
                    if (checkBoxfilters.length > 0) {
                        return checkBoxfilters.includes(job.jobCategory);
                    }
                    return true;
                })
                .filter(job => {
                    if (filters.minExperience && filters.maxExperience) {
                        return (job.minExperience
                            >= filters.minExperience && job.maxExperience <= filters.maxExperience)
                    }
                    return true;
                })
                .filter(job => {
                    if (checkBoxJobTitle.length > 0) {
                        return checkBoxJobTitle.includes(job.jobRole[0]);
                    }
                    return true;
                })
                .filter(job => {
                    if (checkBoxJobLocation.length > 0) {
                        return checkBoxJobLocation.some(result =>
                            job.location.includes(result)
                        );
                    }
                    return true;
                })
                .filter(job => {
                    if (filters.currencyType) {
                        return job.currencyType === filters.currencyType
                    }
                    return true;
                })
                .filter(job => {
                    if (filters.minSalary && filters.maxSalary) {
                        return (job.minSalary >= filters.minSalary && job.maxSalary <= filters.maxSalary)
                    }
                    return true;
                })
                .filter(job => {
                    if (checkBoxJobEducation.length > 0) {
                        return checkBoxJobEducation.includes(job.education);
                    }
                    return true;
                })
            
            console.log(filteredResults)
            if(filteredResults.length > 0){
                setFilteredSearchResults(filteredResults);
            }else{
                setFilteredSearchResultsMsg("no such jobs found")
            }
        }else{
            alert("select atleast one filter")
        }
    };

    const handleCheckboxChange = (category) => {
        const updatedFilters = checkBoxfilters.includes(category)
          ? checkBoxfilters.filter((filter) => filter !== category)
          : [...checkBoxfilters, category];
        setCheckBoxFilters(updatedFilters);
    };

    const handleCheckboxJobTitleChange = (category) => {
        const updatedFilters = checkBoxJobTitle.includes(category)
          ? checkBoxJobTitle.filter((filter) => filter !== category)
          : [...checkBoxJobTitle, category];
        setCheckBoxJobTitle(updatedFilters);
    };

    const handleCheckboxJobLocationChange = (category) => {
        const updatedFilters = checkBoxJobLocation.includes(category)
          ? checkBoxJobLocation.filter((filter) => filter !== category)
          : [...checkBoxJobLocation, category];
        setCheckBoxJobLocation(updatedFilters);
    };

    const handleCheckboxJobEducationChange = (category) => {
        const updatedFilters = checkBoxJobEducation.includes(category)
          ? checkBoxJobEducation.filter((filter) => filter !== category)
          : [...checkBoxJobEducation, category];
        setCheckBoxJobEducation(updatedFilters); 
    };
    
    const handleSearch = (e) => {
        const inputValue = e.target.value;
        setFilters({ ...filters, searchInput: inputValue });

        if (inputValue.length > 0) {
            const skills = skillArray.filter((obj) => {
                return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
            });

            const jobRoles = jobRoleArray.filter((obj) => {
                return obj.designation.toLowerCase().includes(inputValue.toLowerCase());
            });

            const combinedResults = [...skills, ...jobRoles];

            if (combinedResults.length > 0) {
                setFilteredList(combinedResults);
            } else {
                setFilteredList([]);
            }
        } else {
            setFilteredList([]);
        }
    };

    const handleFilteredClick = (clickResult) => {
        console.log(clickResult)
        if (selectedResults.includes(clickResult)) {
            setSelectedResults([...selectedResults]);
            setFilters({ ...filters, searchInput: "" });
            setFilteredList([]);

        } else {
            setSelectedResults([...selectedResults, clickResult]);
            setFilters({ ...filters, searchInput: "" });
            setFilteredList([]);
        }
    }

    const handleDeselect = (result) => {
        setSelectedResults(selectedResults.filter(selected => selected !== result));
    }


    return (
        // <div>
        //     <LayoutNew searchJob={true}/>
        //     <div className='cli--tal-pro-search-section'>
        //         <div className='container-fluid'>
        //             <div className='container-fluid container-section'>
        //                 <div className="custom--container tal--pro-search">
        //                     <div className="breadcrumb--area-dark" data-aos="fade-down">
        //                         <div className="breadcrumb--item-dark">
        //                             <a href="/">Home</a>
        //                         </div>
        //                         <div className="breadcrumb--item-dark">
        //                             <p>Search Jobs</p>
        //                         </div>
        //                     </div>

        //                     {!searchResult ? <div className='talent--profile-search-page-section'>
        //                         <div className="cli-tal-pro-search-container">
        //                             <div className="row">
        //                                 <div className="col-12 col-lg-12 col-xl-12 col-md-12">
        //                                     <h4 class="company--heading candidate" data-aos="fade-left">
        //                                         <span>Jobs</span> that need <br />
        //                                         <span>Immediate Joiners</span>
        //                                     </h4>

        //                                     <div className="job-search-content-lg">
        //                                         <p data-aos="fade">
        //                                             Welcome to Skillety's Jobs page, where your career aspirations meet exceptional opportunities. At Skillety, we understand that the job search can be challenging, which is why we've built more than just a job-board – we've created a career ecosystem designed with you in mind.
        //                                         </p>
        //                                     </div>
        //                                     <div className="job-search-content-md">
        //                                         <p data-aos="fade">
        //                                             What sets Skillety apart? Our exclusive vault of Immediate Joiners – individuals ready to step into their new roles within 7, 15, or 30 days. It means you can land your dream job and start making an impact faster than ever.
        //                                         </p>
        //                                         <p data-aos="fade">
        //                                             But our offerings go beyond quick placements. Skillety is a Digital-RPO platform, offering a comprehensive suite of hiring solutions, including Sourcing, Posting, Screening, Assessment, Interviews, Onboarding, and Verification, all seamlessly integrated into one platform. That means more clients - this is the favourite landing site for any company looking for Talent, propelling the possibility of your profile’s visibility multi fold. We bring innovation and efficiency to your job search journey.
        //                                         </p>
        //                                         <p data-aos="fade">
        //                                             With Skillety, you're not just searching for a job; you're embarking on a career-enhancing experience. Explore our listings, connect with top employers, and take the next step towards a brighter future.
        //                                         </p>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>

        //                         <p className='job-search-head'>Search For Jobs</p>

        //                         <div className="row row-border-custom job">
        //                             <div className="col-12 col-lg-4 col-xl-4 col-md-4 custom-right-border-col">
        //                                 <div className="cli-tal-pro-search-filter-area">
        //                                     <div className="cli-tal-pro-search-filter-head-area justify-content-center gap-3">
        //                                         <h6 className='cli-tal-pro-search-filter mb-0'>Filters</h6>
        //                                         <img src="assets/img/talent-profile/filter.png" className='cli-tal-pro-filter-img' alt="" />
        //                                     </div>
        //                                     <div className="cli-tal-pro-search-filter-container">

        //                                         <div className="cli-tal-pro-search-filter-content-section job">

        //                                             <div className="cli-tal-pro-search-filter-content">
        //                                                 <div className="cli-tal-pro-search-filter-title-area">
        //                                                     <h6 className='cli-tal-pro-search-filter-title'>Keywords</h6>
        //                                                     {/* <div class="cl-toggle-switch">
        //                                                         <label class="cl-switch">
        //                                                             <input type="checkbox" className="toggleSwitch" />
        //                                                             <span></span>
        //                                                         </label>
        //                                                         <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
        //                                                     </div> */}
        //                                                 </div>
        //                                                 <div className="cli--tal-pro-filter-input-area">
        //                                                     <input type="text" className='cli--tal-pro-filter-input' placeholder='Enter keywords like skills, designation' 
        //                                                     value={filters.searchInput}
        //                                                     onChange={(e)=>setFilters({...filters, searchInput:e.target.value})}/>
        //                                                     <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
        //                                                 </div>

        //                                                 <div className="cli--mark-keyword-area">
        //                                                     <label className="cli--mark-keyword-check-input">
        //                                                         <input type="checkbox" />
        //                                                         <span className="cli--mark-keyword-checkmark"></span>
        //                                                         Mark all keywords as mandatory
        //                                                     </label>
        //                                                 </div>
        //                                             </div>

        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Work mode</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="job-search-check-area">
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" checked={checkBoxfilters.includes('full time')}
        //                                                             onChange={() => handleCheckboxChange('full time')}/>
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Full time
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" checked={checkBoxfilters.includes('part time')}
        //                                                             onChange={() => handleCheckboxChange('part time')}/>
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Part time
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" checked={checkBoxfilters.includes('freelancer')}
        //                                                             onChange={() => handleCheckboxChange('freelancer')}/>
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             freelancer
        //                                                         </label>
        //                                                     </div>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Experience</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="cli-tal-pro-exp-input-area search-results">
        //                                                     <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Min Experience' value={filters.minExperience}
        //                                                     onChange={(e)=>setFilters({...filters, minExperience:e.target.value})}/>
        //                                                     <span className='cli-tal-pro-exp-input-text'>to</span>
        //                                                     <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Max Experience' value={filters.maxExperience}
        //                                                     onChange={(e)=>setFilters({...filters, maxExperience:e.target.value})}/>
        //                                                     <span className='cli-tal-pro-exp-input-text'>months/years</span>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Job Title</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="job-search-multi-check-area">
        //                                                     {allJobs.map((job)=>{
        //                                                         return <div                              className="cli--mark-keyword-area job">
        //                                                                 <label className="cli--mark-keyword-check-input jobs">
        //                                                                     <input type="checkbox" checked={checkBoxJobTitle.includes(job.jobRole[0])}
        //                                                                     onChange={() => handleCheckboxJobTitleChange(job.jobRole[0])}/>
        //                                                                     <span className="cli--mark-keyword-checkmark"></span>
        //                                                                     {job.jobRole[0]}
        //                                                                 </label>
        //                                                         </div>
        //                                                     })}
                                                            
        //                                                     {/* <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>


        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div> */}
        //                                                     <button className="jobs-view-more-btn">
        //                                                         <span>View more</span>
        //                                                     </button>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Location</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="job-search-multi-check-area">
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Hyderabad (87)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Hyderabad (87)
        //                                                         </label>
        //                                                     </div>


        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Hyderabad (87)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Hyderabad (87)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <button className="jobs-view-more-btn">
        //                                                         <span>View more</span>
        //                                                     </button>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Salary</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="cli-tal-pro-exp-input-area search-results">
        //                                                     <div className="cli--salary-inputs-area">
        //                                                         <select name="" className='cli-tal-pro-select-input width-30' id="">
        //                                                             <option value="" disabled>Select</option>
        //                                                             <option value="1" selected>INR</option>
        //                                                             <option value="2">LKR</option>
        //                                                             <option value="3">USD</option>
        //                                                             <option value="4">GBP</option>
        //                                                         </select>
        //                                                         <input type="number" className='cli-tal-pro-exp-input numeric-input width-70' placeholder='Min Salary in Lacs' />
        //                                                     </div>
        //                                                     <span className='cli-tal-pro-exp-input-text'>to</span>
        //                                                     <input type="number" className='cli-tal-pro-exp-input text-center numeric-input width-45 search-results' placeholder='Max Salary in Lacs' />
        //                                                     <span className='cli-tal-pro-exp-input-text'>lacs</span>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Education</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="job-search-multi-check-area">
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any postgraduate
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             M.tech
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             B.tech
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any graduate
        //                                                         </label>
        //                                                     </div>


        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any postgraduate
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             M.tech
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             B.tech
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any graduate
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any postgraduate
        //                                                         </label>
        //                                                     </div>
        //                                                     <button className="jobs-view-more-btn">
        //                                                         <span>View more</span>
        //                                                     </button>
        //                                                 </div>
        //                                             </div>
        //                                         </div>


        //                                         <div className="clear--all_button-area justify-content-end">
        //                                             {/* <button className='tal--search-submit-btn'>Submit</button> */}
        //                                             <button className='clear--all_button'>
        //                                                 Clear all
        //                                             </button>
        //                                             <button className="cli-tal-pro-search-page-btn" onClick={handleSkillSearch}>
        //                                                 Search Jobs
        //                                             </button>
        //                                         </div>
        //                                     </div>


        //                                 </div>
        //                             </div>

        //                             <div className="col-12 col-lg-8 col-xl-8 col-md-8 custom-border-top-sm">
        //                                 <div className="tal--pro-search-result-image-area">
        //                                     <img src="assets/img/jobs/filter-data-img-2.png" className='tal--pro-search-result-image' alt="" data-aos="fade" />
        //                                     <h6 className='tal--pro-search-result-title' data-aos="fade-up">Add Filter for the desired search</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div> :

        //                     <div className='talent--profile-search-results-section'>
        //                         <div className="cli-tal-pro-search-container">
        //                             <div className="row">
        //                                 <div className="col-12 col-lg-12 col-xl-12 col-md-12">
        //                                     <h4 class="company--heading candidate" data-aos="fade-left">
        //                                         <span>Jobs</span> that need <br />
        //                                         <span>Immediate Joiners</span>
        //                                     </h4>
        //                                 </div>
        //                             </div>
        //                         </div>

        //                         <button class="pl--package-btn-sub previous back-to-search-btn" data-aos="fade-left" onClick={()=>setSearchResult(false)}>
        //                             <div class="pl--package-arrow-area prev">
        //                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27 27" fill="none">
        //                                     <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2"></path>
        //                                     <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2"></path>
        //                                     <path d="M1 26L25.1667 1" stroke="white" stroke-width="2"></path>
        //                                 </svg>
        //                             </div>
        //                             <div class="pl--package-btn job">Back to Search
        //                             </div>
        //                         </button>

        //                         <p className='job-search-head'>Job Results</p>
        //                         <div className="row row-border-custom">
        //                             <div className="col-12 col-lg-4 col-xl-3 col-md-4 custom-right-border-col ps-lg-0 ps-md-1 col-width-lg-30">
        //                                 <div className="cli-tal-pro-search-filter-area">
        //                                     <div className="cli-tal-pro-search-filter-head-area search-results">
        //                                         <h6 className='cli-tal-pro-search-filter mb-0'>Filters</h6>
        //                                         <img src="assets/img/talent-profile/filter.png" className='cli-tal-pro-filter-img' alt="" />
        //                                     </div>
        //                                     <div className="cli-tal-pro-search-filter-container mt-1">

        //                                         <div className="cli-tal-pro-search-filter-content-section job">

        //                                             <div className="cli-tal-pro-search-filter-content">
        //                                                 <div className="cli-tal-pro-search-filter-title-area">
        //                                                     <h6 className='cli-tal-pro-search-filter-title'>Keywords</h6>
        //                                                     {/* <div class="cl-toggle-switch">
        //     <label class="cl-switch">
        //         <input type="checkbox" className="toggleSwitch" />
        //         <span></span>
        //     </label>
        //     <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
        // </div> */}
        //                                                 </div>
        //                                                 <div className="cli--tal-pro-filter-input-area">
        //                                                     <input type="text" className='cli--tal-pro-filter-input' placeholder='Enter keywords like skills, designation' />
        //                                                     <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
        //                                                 </div>

        //                                                 <div className="cli--mark-keyword-area">
        //                                                     <label className="cli--mark-keyword-check-input">
        //                                                         <input type="checkbox" />
        //                                                         <span className="cli--mark-keyword-checkmark"></span>
        //                                                         Mark all keywords as mandatory
        //                                                     </label>
        //                                                 </div>
        //                                             </div>

        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Work mode</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="job-search-check-area">
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Work from office
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Remote
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Hybrid
        //                                                         </label>
        //                                                     </div>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Experience</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="cli-tal-pro-exp-input-area search-results">
        //                                                     <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Min Experience' />
        //                                                     <span className='cli-tal-pro-exp-input-text'>to</span>
        //                                                     <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Max Experience' />
        //                                                     <span className='cli-tal-pro-exp-input-text'>years</span>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Job Title</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="job-search-multi-check-area">
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>


        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             UX,Design & Archie.........(82)
        //                                                         </label>
        //                                                     </div>
        //                                                     <button className="jobs-view-more-btn">
        //                                                         <span>View more</span>
        //                                                     </button>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Location</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="job-search-multi-check-area">
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Hyderabad (87)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Hyderabad (87)
        //                                                         </label>
        //                                                     </div>


        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Hyderabad (87)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Hyderabad (87)
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Delhi/NCR (76)
        //                                                         </label>
        //                                                     </div>
        //                                                     <button className="jobs-view-more-btn">
        //                                                         <span>View more</span>
        //                                                     </button>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Salary</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="cli-tal-pro-exp-input-area search-results">
        //                                                     <div className="cli--salary-inputs-area">
        //                                                         <select name="" className='cli-tal-pro-select-input width-30' id="">
        //                                                             <option value="" disabled>Select</option>
        //                                                             <option value="1" selected>INR</option>
        //                                                             <option value="2">LKR</option>
        //                                                             <option value="3">USD</option>
        //                                                             <option value="4">GBP</option>
        //                                                         </select>
        //                                                         <input type="number" className='cli-tal-pro-exp-input numeric-input width-70' placeholder='Min Salary in Lacs' />
        //                                                     </div>
        //                                                     <span className='cli-tal-pro-exp-input-text'>to</span>
        //                                                     <input type="number" className='cli-tal-pro-exp-input text-center numeric-input width-45 search-results' placeholder='Max Salary in Lacs' />
        //                                                     <span className='cli-tal-pro-exp-input-text'>lacs</span>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="cli-tal-pro-search-filter-content-section job">
        //                                             <div className="cli-tal-pro-search-filter-toggle-area job">
        //                                                 <h6 className='cli--emploment-detail-head job'>Education</h6>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
        //                                                     <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
        //                                                 </svg>
        //                                             </div>
        //                                             <div className="cli-tal-pro-search-filter-expand-area">
        //                                                 <div className="job-search-multi-check-area">
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any postgraduate
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             M.tech
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             B.tech
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any graduate
        //                                                         </label>
        //                                                     </div>


        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any postgraduate
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             M.tech
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             B.tech
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any graduate
        //                                                         </label>
        //                                                     </div>
        //                                                     <div className="cli--mark-keyword-area job">
        //                                                         <label className="cli--mark-keyword-check-input jobs">
        //                                                             <input type="checkbox" />
        //                                                             <span className="cli--mark-keyword-checkmark"></span>
        //                                                             Any postgraduate
        //                                                         </label>
        //                                                     </div>
        //                                                     <button className="jobs-view-more-btn">
        //                                                         <span>View more</span>
        //                                                     </button>
        //                                                 </div>
        //                                             </div>
        //                                         </div>

        //                                         <div className="clear--all_button-area">
        //                                             <button className='tal--search-submit-btn'>Submit</button>
        //                                             <button className='clear--all_button'>
        //                                                 Clear all
        //                                             </button>
        //                                         </div>

        //                                     </div>
        //                                 </div>
        //                             </div>

        //                             <div className="col-12 col-lg-8 col-xl-9 col-md-8 pe-lg-0 pe-md-1 col-width-lg-70">
        //                                 {/* <div className="tal--pro-search-result-image-area">
        //                                 <img src="assets/img/jobs/filter-data-img.png" className='tal--pro-search-result-image' alt="" data-aos="fade"  />
        //                                 <h6 className='tal--pro-search-result-title' data-aos="fade-up">Add Filter for the desired search</h6>
        //                             </div> */}
        //                                 <div className="cli--tal-pro-search-results-area">
        //                                 {filteredSearchResultsMsg ?
        //                                     <p>{filteredSearchResultsMsg}</p>:
        //                                     filteredSearchResults.length > 0 ?
        //                                     filteredSearchResults.map((job)=>{
        //                                         return(
        //                                             <article className='job--detail-card' data-aos="fade-left">
        //                                         <div className="job--detail-card-top-area job">
        //                                             <div>
        //                                                 <h5 className='job--detail-card-role'>{job.jobRole[0]}</h5>
        //                                                 <div className="job--detail-card-review-area">
        //                                                     <div className="job--detail-card-review">Happiest Minds</div>
        //                                                     <div className='job--detail-card-rating'>
        //                                                         <i class="ri-star-fill"></i>
        //                                                         <span>4.9</span>
        //                                                     </div>
        //                                                     <div className="job--detail-card-review-count">
        //                                                         879&nbsp;
        //                                                         <span>Reviews</span>
        //                                                     </div>
        //                                                 </div>

        //                                                 <div className="job--detail-card-location-area">
        //                                                     <div className="job--detail-card-experience">
        //                                                         <i class='bx bx-briefcase'></i>
        //                                                         <span>{job.year > 0 ? job.year+ 'years' : "" + job.month > 0 ? job.month+ 'months' : ""}</span>
        //                                                     </div>
        //                                                     <div className="job--detail-card-experience">
        //                                                         <i class='bx bx-rupee'></i>
        //                                                         <span>Not disclosed</span>
        //                                                     </div>
        //                                                     <div className="job--detail-card-experience">
        //                                                         <i class="bi bi-geo-alt-fill"></i>
        //                                                         <span>Hyderabad</span>
        //                                                     </div>
        //                                                 </div>
        //                                             </div>
        //                                             <div className="job--detail-card-img-area job">
        //                                                 <img src="assets/img/companies/company-1.png" className='job--detail-card-img' alt="" />
        //                                             </div>
        //                                         </div>
        //                                         <div className="job--detail-card-desc-area">
        //                                             <p className='job--detail-card-desc'>{job.jobDescription}</p>
        //                                         </div>
        //                                         <div className="job--detail-card-bottom-area">
        //                                             <div className='job--detail-card-tags-area'>
        //                                                 {job.skills.map((skill, index)=>{
        //                                                     return <div className="job--detail-card-tag" key={index}>{skill}</div>
        //                                                 })}
        //                                             </div>
        //                                             <div className="job--detail-card-know-more-btn-area">
        //                                                 <a href="#" className='job--detail-card-know-more-btn'>Know more</a>
        //                                             </div>
        //                                         </div>
        //                                             </article>
        //                                         )
        //                                     }) : null}
        //                                     <div className="tal--pro-paginate-btn-area" data-aos="fade-up">
        //                                         <h6 className='tal--pro-total-result-text'>Total Items : <span>{filteredSearchResults.length}</span></h6>
        //                                         <div className='tal--pro-slider-btn-sub'>
        //                                             <button className="tal--pro-slider-btn">
        //                                                 <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
        //                                                     <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
        //                                                     <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
        //                                                     <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
        //                                                 </svg>
        //                                             </button>
        //                                             <button className="tal--pro-slider-btn">
        //                                                 <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
        //                                                     <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
        //                                                     <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
        //                                                     <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
        //                                                 </svg>
        //                                             </button>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <CandidateFooter />
        // </div>
        <div>
            {candidateToken && <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <Layout />
            
                <div class="main-content">
                    <section class="section">
                        <div className='cli--tal-pro-search-section pt-3'>
                            <div className='container-fluid container-section'>
                                <div className="custom--container tal--pro-search">
                                    {/* <div className="breadcrumb--area-dark" data-aos="fade-down">
                                        <div className="breadcrumb--item-dark">
                                            <a href="/">Home</a>
                                        </div>
                                        <div className="breadcrumb--item-dark">
                                            <p>Search Jobs</p>
                                        </div>
                                    </div> */}

                                    {!searchResult ? <div className='talent--profile-search-page-section'>
                                        

                                        <p className='job-search-head'>Search For Jobs</p>

                                        <div className="row row-border-custom job">
                                            <div className="col-12 col-lg-4 col-xl-4 col-md-4 custom-right-border-col">
                                                <div className="cli-tal-pro-search-filter-area">
                                                    <div className="cli-tal-pro-search-filter-head-area justify-content-center gap-3">
                                                        <h6 className='cli-tal-pro-search-filter mb-0'>Filters</h6>
                                                        <img src="assets/img/talent-profile/filter.png" className='cli-tal-pro-filter-img' alt="" />
                                                    </div>
                                                    <div className="cli-tal-pro-search-filter-container">

                                                        <div className="cli-tal-pro-search-filter-content-section job">

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
                                                                    onChange={(e)=>setFilters({...filters, searchInput:e.target.value})}/>
                                                                    <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
                                                                </div>

                                                                <div className="cli--mark-keyword-area">
                                                                    <label className="cli--mark-keyword-check-input">
                                                                        <input type="checkbox" />
                                                                        <span className="cli--mark-keyword-checkmark"></span>
                                                                        Mark all keywords as mandatory
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Work mode</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                                <div className="job-search-check-area">
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" checked={checkBoxfilters.includes('full time')}
                                                                            onChange={() => handleCheckboxChange('full time')}/>
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Full time
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" checked={checkBoxfilters.includes('part time')}
                                                                            onChange={() => handleCheckboxChange('part time')}/>
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Part time
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" checked={checkBoxfilters.includes('contract')}
                                                                            onChange={() => handleCheckboxChange('contract')}/>
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Contract
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" checked={checkBoxfilters.includes('freelancer')}
                                                                            onChange={() => handleCheckboxChange('freelancer')}/>
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            freelancer
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Experience</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                                <div className="cli-tal-pro-exp-input-area search-results">
                                                                    <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Min Experience' value={filters.minExperience}
                                                                    onChange={(e)=>setFilters({...filters, minExperience:e.target.value})}/>
                                                                    <span className='cli-tal-pro-exp-input-text'>to</span>
                                                                    <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' placeholder='Max Experience' value={filters.maxExperience}
                                                                    onChange={(e)=>setFilters({...filters, maxExperience:e.target.value})}/>
                                                                    <span className='cli-tal-pro-exp-input-text'>months/years</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Job Title</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                                <div className="job-search-multi-check-area">
                                                                    {jobRoleArray.map((job)=>{
                                                                        return <div                              className="cli--mark-keyword-area job">
                                                                                <label className="cli--mark-keyword-check-input jobs">
                                                                                    <input type="checkbox" checked={checkBoxJobTitle.includes(job.jobRole[0])}
                                                                                    onChange={() => handleCheckboxJobTitleChange(job.jobRole[0])}/>
                                                                                    <span className="cli--mark-keyword-checkmark"></span>
                                                                                    {job.jobRole[0]}
                                                                                </label>
                                                                        </div>
                                                                    })}
                                                                    
                                                                    {/* <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>


                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div> */}
                                                                    <button className="jobs-view-more-btn">
                                                                        <span>View more</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Location</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                                <div className="job-search-multi-check-area">
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Delhi/NCR (76)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Hyderabad (87)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Delhi/NCR (76)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Hyderabad (87)
                                                                        </label>
                                                                    </div>


                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Delhi/NCR (76)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Hyderabad (87)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Delhi/NCR (76)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Hyderabad (87)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Delhi/NCR (76)
                                                                        </label>
                                                                    </div>
                                                                    <button className="jobs-view-more-btn">
                                                                        <span>View more</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Salary</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
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
                                                            </div>
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Education</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                                <div className="job-search-multi-check-area">
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Any postgraduate
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            M.tech
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            B.tech
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Any graduate
                                                                        </label>
                                                                    </div>


                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Any postgraduate
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            M.tech
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            B.tech
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Any graduate
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Any postgraduate
                                                                        </label>
                                                                    </div>
                                                                    <button className="jobs-view-more-btn">
                                                                        <span>View more</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="clear--all_button-area dash">
                                                            {/* <button className='tal--search-submit-btn'>Submit</button> */}
                                                            <button className='clear--all_button dash'>
                                                                Clear all
                                                            </button>
                                                            <button className="tal--search-submit-btn dash" onClick={handleSkillSearch}>
                                                                Search Jobs
                                                            </button>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            <div className="col-12 col-lg-8 col-xl-8 col-md-8 custom-border-top-sm">
                                                <div className="tal--pro-search-result-image-area">
                                                    <img src="assets/img/jobs/filter-data-img-2.png" className='tal--pro-search-result-image' alt="" data-aos="fade" />
                                                    <h6 className='tal--pro-search-result-title' data-aos="fade-up">Add Filter for the desired search</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div> :

                                    <div className='talent--profile-search-results-section pt-4'>
                                        {/* <div className="cli-tal-pro-search-container">
                                            <div className="row">
                                                <div className="col-12 col-lg-12 col-xl-12 col-md-12">
                                                    <h4 class="company--heading candidate" data-aos="fade-left">
                                                        <span>Jobs</span> that need <br />
                                                        <span>Immediate Joiners</span>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* <button class="pl--package-btn-sub previous back-to-search-btn"  onClick={()=>setSearchResult(false)}>
                                            <div class="pl--package-arrow-area prev">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27 27" fill="none"><path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2"></path><path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2"></path><path d="M1 26L25.1667 1" stroke="white" stroke-width="2"></path></svg>
                                            </div>
                                            <div class="pl--package-btn job">Back to Search
                                            </div>
                                        </button> */}
                                        

                                        <p className='job-search-head'>Job Results</p>
                                        <div className="row row-border-custom">
                                            <div className="col-12 col-lg-4 col-xl-4 col-md-4 custom-right-border-col ps-lg-0 ps-md-1 col-width-lg-30">
                                                <div className="cli-tal-pro-search-filter-area">
                                                    <div className="cli-tal-pro-search-filter-head-area search-results">
                                                        <h6 className='cli-tal-pro-search-filter mb-0'>Filters</h6>
                                                        <img src="assets/img/talent-profile/filter.png" className='cli-tal-pro-filter-img' alt="" />
                                                    </div>
                                                    <div className="cli-tal-pro-search-filter-container mt-1">

                                                        <div className="cli-tal-pro-search-filter-content-section job">

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
                                                                <div className='job-post-form-badge-area'>
                                                                        {selectedResults.map(selectResult => (
                                                                            <span className="job-post-form-badge tal-search"
                                                                                key={selectResult} 
                                                                                onClick={() => handleDeselect(selectResult)}
                                                                            >{selectResult}</span>
                                                                        ))}
                                                                    </div>
                                                                    <div className="cli--tal-pro-filter-input-area">
                                                                        <input type="text" className='cli--tal-pro-filter-input' placeholder='Enter keywords like skills, designation'
                                                                            value={filters.searchInput}
                                                                            onChange={handleSearch}
                                                                        />
                                                                        <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
                                                                        <div className='search-result-data-area'>
                                                                            {filteredList.length > 0 &&
                                                                                filteredList.map((filterResult) => (
                                                                                    <div
                                                                                        className='search-result-data'
                                                                                        key={filterResult._id}
                                                                                        onClick={() => handleFilteredClick(filterResult.designation || filterResult.skill)}
                                                                                    >
                                                                                        {filterResult.designation ? filterResult.designation : filterResult.skill}
                                                                                    </div>
                                                                                ))}
                                                                        </div>
                                                                    </div>

                                                                <div className="cli--mark-keyword-area">
                                                                    <label className="cli--mark-keyword-check-input">
                                                                        <input type="checkbox" />
                                                                        <span className="cli--mark-keyword-checkmark"></span>
                                                                        Mark all keywords as mandatory
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Work mode</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                                <div className="job-search-check-area">
                                                                <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" checked={checkBoxfilters.includes('full time')}
                                                                            onChange={() => handleCheckboxChange('full time')}/>
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Full time
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" checked={checkBoxfilters.includes('part time')}
                                                                            onChange={() => handleCheckboxChange('part time')}/>
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Part time
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" checked={checkBoxfilters.includes('contract')}
                                                                            onChange={() => handleCheckboxChange('contract')}/>
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            Contract
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" checked={checkBoxfilters.includes('freelancer')}
                                                                            onChange={() => handleCheckboxChange('freelancer')}/>
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            freelancer
                                                                        </label>
                                                                    </div> 
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Experience</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                            <div className="cli-tal-pro-exp-input-area search-results">
                                                            <select name="" className='cli-tal-pro-exp-input text-center numeric-input select' id=""
                                                                                value={filters.minExperience}
                                                                                onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })}
                                                                            >
                                                                                <option value="" selected >Min Experience</option>
                                                                                <option value="1">1</option>
                                                                                <option value="2">2</option>
                                                                                <option value="3">3</option>
                                                                                <option value="4">4</option>
                                                                                <option value="5">5</option>
                                                                                <option value="6">6</option>
                                                                                <option value="7">7</option>
                                                                                <option value="8">8</option>
                                                                                <option value="9">9</option>
                                                                                <option value="10">10</option>
                                                                            </select>
                                                                    <span className='cli-tal-pro-exp-input-text'>to</span>
                                                                    <select name="" className='cli-tal-pro-exp-input text-center numeric-input select' id=""
                                                                                value={filters.maxExperience}
                                                                                onChange={(e) => setFilters({ ...filters, maxExperience: e.target.value })}
                                                                            >
                                                                                <option value="" selected >Max Experience</option>
                                                                                <option value="1">1</option>
                                                                                <option value="2">2</option>
                                                                                <option value="3">3</option>
                                                                                <option value="4">4</option>
                                                                                <option value="5">5</option>
                                                                                <option value="6">6</option>
                                                                                <option value="7">7</option>
                                                                                <option value="8">8</option>
                                                                                <option value="9">9</option>
                                                                                <option value="10">10</option>
                                                                            </select>
                                                                    <span className='cli-tal-pro-exp-input-text'>years</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Job Title</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                            <div className="job-search-multi-check-area">
                                                                    {jobRoleArray.map((job)=>{ 
                                                                        return  <div                              className="cli--mark-keyword-area job">
                                                                                <label className="cli--mark-keyword-check-input jobs">
                                                                                    <input type="checkbox" checked={checkBoxJobTitle.includes(job.designation)}
                                                                                    onChange={() => handleCheckboxJobTitleChange(job.designation)}/>
                                                                                    <span className="cli--mark-keyword-checkmark"></span>
                                                                                    {job.designation}
                                                                                </label> 
                                                                        </div>
                                                                    })}
                                                                    
                                                                    {/* <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>


                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div>
                                                                    <div className="cli--mark-keyword-area job">
                                                                        <label className="cli--mark-keyword-check-input jobs">
                                                                            <input type="checkbox" />
                                                                            <span className="cli--mark-keyword-checkmark"></span>
                                                                            UX,Design & Archie.........(82)
                                                                        </label>
                                                                    </div> */}
                                                                    <button className="jobs-view-more-btn">
                                                                        <span>View more</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Location</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                            <div className="job-search-multi-check-area">
                                                                    {locationArray.map((loc)=>{ 
                                                                        return  <div                              className="cli--mark-keyword-area job">
                                                                                <label className="cli--mark-keyword-check-input jobs">
                                                                                    <input type="checkbox" checked={checkBoxJobLocation.includes(loc.location)}
                                                                                    onChange={() => handleCheckboxJobLocationChange(loc.location)}/>
                                                                                    <span className="cli--mark-keyword-checkmark"></span>
                                                                                    {loc.location}
                                                                                </label> 
                                                                        </div>
                                                                    })}
                                                                    <button className="jobs-view-more-btn">
                                                                        <span>View more</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Salary</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                                <div className="cli-tal-pro-exp-input-area search-results">
                                                                    <div className="cli--salary-inputs-area">
                                                                    <select name="" className='cli-tal-pro-select-input width-30' id=""
                                                                                value={filters.currencyType}
                                                                                onChange={(e) => setFilters({ ...filters, currencyType: e.target.value })}>
                                                                                <option value="" disabled>Select</option>
                                                                                <option value="₹" >₹</option>
                                                                                <option value="$">$</option>
                                                                            </select>
                                                                            <input type="number" className='cli-tal-pro-exp-input numeric-input width-70' placeholder='Min Salary in Laks'
                                                                                value={filters.minSalary}
                                                                                onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })} />
                                                                    </div>
                                                                    <span className='cli-tal-pro-exp-input-text'>to</span>
                                                                    <input type="number" className='cli-tal-pro-exp-input text-center numeric-input width-45 search-page' placeholder='Max Salary in Laks'
                                                                            value={filters.maxSalary}
                                                                            onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })} />
                                                                    <span className='cli-tal-pro-exp-input-text'>laks</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content-section job">
                                                            <div className="cli-tal-pro-search-filter-toggle-area job">
                                                                <h6 className='cli--emploment-detail-head job'>Education</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                                    <path d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1" stroke="#714F36" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="cli-tal-pro-search-filter-expand-area">
                                                            <div className="job-search-multi-check-area">
                                                                    {educationArray.map((edu)=>{ 
                                                                        return  <div                              className="cli--mark-keyword-area job">
                                                                                <label className="cli--mark-keyword-check-input jobs">
                                                                                    <input type="checkbox" checked={checkBoxJobEducation.includes(edu.education)}
                                                                                    onChange={() => handleCheckboxJobEducationChange(edu.education)}/>
                                                                                    <span className="cli--mark-keyword-checkmark"></span>
                                                                                    {edu.education}
                                                                                </label> 
                                                                        </div>
                                                                    })}
                                                                    <button className="jobs-view-more-btn">
                                                                        <span>View more</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="clear--all_button-area">
                                                            <button className='tal--search-submit-btn' onClick={handleSkillSearch}>Search Jobs</button>
                                                            <button className='clear--all_button' onClick={()=>window.location.reload()}>
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
                                                    (<p>{filteredSearchResultsMsg}</p>):
                                                    filteredSearchResults.length > 0 ?
                                                    (filteredSearchResults.slice(x[0], x[1]).map((job)=>{
                                                        const matchingImg = clientImg ? clientImg.find(img => img.id === job.companyId) : null;
                                                        const imgSrc = matchingImg ? `http://localhost:5002/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
                                                        const companyName = clients.find(cli=>cli.companyId === job.companyId)?.companyName

                                                        const calculateMatchPercentage = (skills1, skills2) => {
                                                            const matchingSkills = skills2.filter(skill => skills1.includes(skill));
                                                            return (matchingSkills.length / skills1.length) * 100;
                                                        }
                                                        const percentage = calculateMatchPercentage(selectedResults, [...job.skills, ...job.jobRole]);

                                                        return(
                                                        <article className='job--detail-card'>
                                                        <div className="job--detail-card-top-area job">
                                                            <div>
                                                                <h5 className='job--detail-card-role'>{job.jobRole[0]}</h5>
                                                                <div className="job--detail-card-review-area">
                                                                    <div className="job--detail-card-review">{companyName}</div>
                                                                    {/* <div className='job--detail-card-rating'>
                                                                        <i class="ri-star-fill"></i>
                                                                        <span>4.9</span>
                                                                    </div>
                                                                    <div className="job--detail-card-review-count">
                                                                        879&nbsp;
                                                                        <span>Reviews</span>
                                                                    </div> */}
                                                                </div>

                                                                <div className="job--detail-card-location-area">
                                                                    <div className="job--detail-card-experience">
                                                                        <i class='bx bx-briefcase'></i>
                                                                        <span>{job?.minExperience} - {job.maxExperience} years</span>
                                                                    </div>
                                                                    {/* <div className="job--detail-card-experience">
                                                                        <i class='bx bx-rupee'></i>
                                                                        <span>Not disclosed</span>
                                                                    </div> */}
                                                                    <div className="job--detail-card-experience">
                                                                        <i class="bi bi-geo-alt-fill"></i>
                                                                        <span>{job?.location.join(", ")}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="job--detail-card-img-area job">
                                                                <img src={imgSrc} className='job--detail-card-img' alt="" />
                                                            </div>
                                                            {selectedResults && 
                                                            <div className="tal--pro-card-ability-number-left">
                                                                <h6 className='tal--pro-card-ability search'>Keywords matched</h6>
                                                                <h2 className='tal--pro-card-percentage search'>{Math.round(percentage)}%</h2>
                                                            </div>}
                                                        </div>
                                                        <div className="job--detail-card-desc-area">
                                                            <p className='job--detail-card-desc'>{job.jobDescription}</p>
                                                        </div>
                                                        <div className="job--detail-card-bottom-area">
                                                            <div className='job--detail-card-tags-area'>
                                                                {job.skills.map((skill, index)=>{
                                                                    return <div className="job--detail-card-tag" key={index}>{skill}</div>
                                                                })}
                                                            </div>
                                                            <div className="job--detail-card-know-more-btn-area">
                                                                <a href={`/job-detail/${job.id}`} className='job--detail-card-know-more-btn'>Know more</a>
                                                            </div>
                                                        </div>
                                                            </article>
                                                        )
                                                    })) : matchJobs.length > 0 ? 
                                                    (matchJobs.slice(x[0], x[1]).map((job)=>{
                                                        const matchingImg = clientImg ? clientImg.find(img => img.id === job.companyId) : null;
                                                        const imgSrc = matchingImg ? `http://localhost:5002/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
                                                        const companyName = clients.find(cli=>cli.companyId === job.companyId)?.companyName
                                                        return(
                                                        <article className='job--detail-card'>
                                                        <div className="job--detail-card-top-area job">
                                                            <div>
                                                                <h5 className='job--detail-card-role'>{job.jobRole[0]}</h5>
                                                                <div className="job--detail-card-review-area">
                                                                    <div className="job--detail-card-review">{companyName}</div>
                                                                    {/* <div className='job--detail-card-rating'>
                                                                        <i class="ri-star-fill"></i>
                                                                        <span>4.9</span>
                                                                    </div>
                                                                    <div className="job--detail-card-review-count">
                                                                        879&nbsp;
                                                                        <span>Reviews</span>
                                                                    </div> */}
                                                                </div>

                                                                <div className="job--detail-card-location-area">
                                                                    <div className="job--detail-card-experience">
                                                                        <i class='bx bx-briefcase'></i>
                                                                        <span>{job?.jobExperience}</span>
                                                                    </div>
                                                                    {/* <div className="job--detail-card-experience">
                                                                        <i class='bx bx-rupee'></i>
                                                                        <span>Not disclosed</span>
                                                                    </div> */}
                                                                    <div className="job--detail-card-experience">
                                                                        <i class="bi bi-geo-alt-fill"></i>
                                                                        <span>{job?.jobLocation.join(", ")}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="job--detail-card-img-area job">
                                                                <img src={imgSrc} className='job--detail-card-img' alt="" />
                                                            </div>
                                                            <div className="tal--pro-card-ability-number-left">
                                                            <h6 className='tal--pro-card-ability search'>Skills matched</h6>
                                                            <h2 className='tal--pro-card-percentage search'>{job?.percentage}%</h2>
                                                        </div>
                                                        </div>
                                                        <div className="job--detail-card-desc-area">
                                                            <p className='job--detail-card-desc'>{job.jobDescription}</p>
                                                        </div>
                                                        <div className="job--detail-card-bottom-area">
                                                            <div className='job--detail-card-tags-area'>
                                                                {job.jobMandatorySkills.map((skill, index)=>{
                                                                    return <div className="job--detail-card-tag" key={index}>{skill}</div>
                                                                })}
                                                            </div>
                                                            <div className="job--detail-card-know-more-btn-area">
                                                                <a href={`/job-detail/${job.jobId}`} className='job--detail-card-know-more-btn'>Know more</a>
                                                            </div>
                                                        </div>
                                                            </article>
                                                        )
                                                    })) : <p>no match jobs found</p>}
                                                    <div className="tal--pro-paginate-btn-area" data-aos="fade-up">
                                                        <h6 className='tal--pro-total-result-text'>Total Items : <span>{filteredSearchResultsMsg ? "0" : filteredSearchResults.length > 0 ? filteredSearchResults.length :  matchJobs.length > 0 ? matchJobs.length : "0"}</span></h6>
                                                        <div className='tal--pro-slider-btn-sub'>
                                                        {x[0] > 0 && <button className="tal--pro-slider-btn" onClick={()=>setX([x[0] - 3, x[1] - 3])}>
                                                                <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                                    <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                                                </svg>
                                                            </button>}
                                                            {(filteredSearchResultsMsg ? !filteredSearchResultsMsg : filteredSearchResults.length > 0 ? (filteredSearchResults.slice(x[0], x[1]).length === 3 && filteredSearchResults.length > x[1]) : (matchJobs.slice(x[0], x[1]).length === 3 && matchJobs.length > x[1])) && < button className="tal--pro-slider-btn" onClick={()=>setX([x[0] + 3, x[1] + 3])}>
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
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>}
        </div>
    )
}
export default JobSearch;