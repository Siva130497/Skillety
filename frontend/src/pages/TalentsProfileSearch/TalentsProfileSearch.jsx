import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './TalentsProfileSearch.css';
import './TalentsProfileSearch-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const TalentsProfileSearch = () => {

    const location = useLocation();
    const [inCommingData, setInCommingData] = useState();

    const clientToken = JSON.parse(localStorage.getItem("clientToken"));
    const { getProtectedData, getClientChoosenPlan, packageSelectionDetail, getCandidateImg, candidateImg } = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState([]);
    const [cvViews, setCvViews] = useState();
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [filteredSearchResults, setFilteredSearchResults] = useState([]);
    const [filteredSearchResultsMsg, setFilteredSearchResultsMsg] = useState("");
    const [searchResult, setSearchResult] = useState(false);
    const [viewedCandidate, setViewedCandidate] = useState([]);

    const [skillArray, setSkillArray] = useState([]);
    const [jobRoleArray, setjobRoleArray] = useState([]);
    const [locationArray, setLocationArray] = useState([]);
    const [departmentArray, setDepartmentArray] = useState([]);
    const [roleArray, setRoleArray] = useState([]);
    const [industryArray, setIndustryArray] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [filteredLocation, setFilteredLocation] = useState([]);
    const [filteredDepartment, setFilteredDepartment] = useState([]);
    const [filteredRole, setFilteredRole] = useState([]);
    const [filteredIndustry, setFilteredIndustry] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [selectedLocationResults, setSelectedLocationResults] = useState([]);
    const [selectedDepartmentResults, setSelectedDepartmentResults] = useState([]);
    const [selectedRoleResults, setSelectedRoleResults] = useState([]);
    const [selectedIndustryResults, setSelectedIndustryResults] = useState([]);

    const [recentSearches, setRecentSearches] = useState([]);
    const [checkBoxfilters, setCheckBoxFilters] = useState([]);

    const [x, setX] = useState([0, 4]);

    const [filters, setFilters] = useState({
        searchInput: "",
        minExperienceYr: "",
        maxExperienceYr: "",
        minExperienceMonth: "",
        maxExperienceMonth: "",
        location: "",
        currencyType: "",
        minSalary: "",
        maxSalary: "",
        department: "",
        role: "",
        days: "",
        industry: "",
        company: "",
        candidateType: "",
        gender: "",
    })

    console.log(filters)

    const navigate = useNavigate();

    useEffect(() => {
        // $(document).ready(function () {
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
        $('.numeric-input').on('input', function () {
            var inputValue = $(this).val();

            // Remove any non-digit characters, "e", and leading minus sign
            inputValue = inputValue.replace(/[^0-9]/g, '');

            // Ensure that the input is not negative
            if (inputValue.length > 0 && inputValue.charAt(0) === '-') {
                inputValue = inputValue.slice(1);
            }

            // Set the cleaned value back in the input field
            $(this).val(inputValue);
        });
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
        const addEducationInputField = () => {
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
        }
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
        function handleFilterToggle() {
            var expandArea = $(this).closest('.cli-tal-pro-search-filter-content-section').find('.cli-tal-pro-search-filter-expand-area');

            if (expandArea.hasClass('opened')) {
                expandArea.slideUp();
                expandArea.removeClass('opened');
                $(this).removeClass('opened');
            } else {
                expandArea.slideDown();
                expandArea.addClass('opened');
                $(this).addClass('opened');
            }
        }
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

        //navigate to top while press buttons
        $(".tal--pro-slider-btn").on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        $(".cli-tal-pro-search-page-btn").on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        //// Attach Event
        $('.cli-tal-pro-search-filter-toggle-area').on('click', handleFilterToggle);
        $(".cli--tal-search-qualification-add-input-button").click(addEducationInputField);

        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            $(".tal--pro-slider-btn").off("click");
            $(".cli-tal-pro-search-page-btn").off("click");
            $('.cli-tal-pro-search-filter-toggle-area').off('click', handleFilterToggle);
            $(".cli--tal-search-qualification-add-input-button").off('click', addEducationInputField);
        };
        // });
    }, [searchResult]);

    const handleMouseEnter = (event) => {
        const button = event.target;
        const profileCard = button.closest('.talent--profile-card');

        if (!profileCard.querySelector('.tal--checkbox').checked) {
            const newText = button.nextElementSibling.textContent;
            button.textContent = newText;
        }
    };

    const handleMouseLeave = (event) => {
        const button = event.target;
        const profileCard = button.closest('.talent--profile-card');

        if (!profileCard.querySelector('.tal--checkbox').checked) {
            const originalText = "View Profile"; // Replace with your original text
            button.textContent = originalText;
        }
    };

    const handleKeywordSearch = () => {
        if (inCommingData && candidateDetail.length > 0) {
            setX([0, 4]);
            setFilteredSearchResultsMsg("")
            console.log(selectedResults)
            setSearchResult(true)
            const filteredResults = candidateDetail
                .filter(candidate => {
                    if (selectedResults.length > 0) {
                        return selectedResults.some(result =>
                            candidate.skills.includes(result) || candidate.designation.includes(result)
                        );
                    }
                    return true;
                })
            console.log(filteredResults)
            if (filteredResults.length > 0) {
                setFilteredSearchResults(filteredResults);
                setInCommingData(null)
            } else {
                setFilteredSearchResultsMsg("no such candidates found")
                setInCommingData(null)
            }
        }
    }

    useEffect(() => {
        const { keywords } = location.state || {};
        setInCommingData(keywords);

    }, [location.state])

    useEffect(() => {

        if (inCommingData) {
            setSelectedResults(inCommingData);
        }

    }, [inCommingData])

    useEffect(() => {
        handleKeywordSearch();
    }, [selectedResults, candidateDetail]);

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
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    const getAllSkills = async () => {
        try {
            const res = await axios.get("https://skillety.onrender.com/skills", {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
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
            const res = await axios.get("https://skillety.onrender.com/designations", {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
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
            const res = await axios.get("https://skillety.onrender.com/locations", {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
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

    const getAllDepartments = async () => {
        try {
            const res = await axios.get("https://skillety.onrender.com/departments", {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setDepartmentArray(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getAllRoles = async () => {
        try {
            const res = await axios.get("https://skillety.onrender.com/roles", {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setRoleArray(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getAllIndustries = async () => {
        try {
            const res = await axios.get("https://skillety.onrender.com/industries", {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setIndustryArray(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

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
                setCandidateDetail(result.reverse());
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllRecentSearch = async () => {
        try {
            const response = await axios.get('https://skillety.onrender.com/recent-search', {
                headers: {
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setRecentSearches(result.reverse().slice(0, 10));
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCandidateDetail();
        getAllJobRoles();
        getAllSkills();
        getAllLocations();
        getAllDepartments();
        getAllRoles();
        getAllIndustries();
        getCandidateImg();
        getAllRecentSearch();
    }, []);

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

    const getViewedCandidates = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/cv-views/${loginClientDetail.companyId}`, {
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
        if (loginClientDetail.companyId) {
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
    console.log(filters)

    const handleCheckboxChange = (category) => {
        console.log(category)
        const updatedFilters = checkBoxfilters.includes(category)
            ? checkBoxfilters.filter((filter) => filter !== category)
            : [...checkBoxfilters, category];
        setCheckBoxFilters(updatedFilters);
    };
console.log(checkBoxfilters)
    const handleSkillSearch = () => {
        if (checkBoxfilters.length>0 || selectedResults.length > 0 || selectedLocationResults.length > 0 || (filters.minExperienceYr && filters.minExperienceMonth) || (filters.maxExperienceYr && filters.maxExperienceMonth) || (filters.minSalary && filters.maxSalary) || selectedDepartmentResults.length > 0 || selectedRoleResults.length > 0 || filters.industry || filters.company || filters.candidateType || filters.gender) {

            const recentSearch = {
                days: filters.days,
                selectedResults: selectedResults,
                selectedLocationResults: selectedLocationResults,
                minExperienceYr: filters.minExperienceYr,
                minExperienceMonth: filters.minExperienceMonth,
                maxExperienceYr: filters.maxExperienceYr,
                maxExperienceMonth: filters.maxExperienceMonth,
                minSalary: filters.minSalary,
                maxSalary: filters.maxSalary,
                selectedDepartmentResults: selectedDepartmentResults,
                selectedRoleResults: selectedRoleResults,
                industry: selectedIndustryResults,
                company: filters.company,
                candidateType: filters.candidateType,
                gender: filters.gender,
            }
            setX([0, 4]);
            setFilteredSearchResultsMsg("")
            setSearchResult(true)
            if (filters.candidateType === "allCandidates") {
                setFilteredSearchResults(candidateDetail);
            } else if (filters.candidateType === "newRegistration") {
                const newRegistrationResults = candidateDetail.slice(0, 10);
                setFilteredSearchResults(newRegistrationResults);
            } else {
                const filteredResults = candidateDetail
                    // .filter(candidate => {
                    //     if (filters.days) {
                    //         if (filters.days === "0-7") {
                    //             return candidate.dayDifference >= 0 && candidate.dayDifference <= 7;
                    //         } else if (filters.days === "8-15") {
                    //             return candidate.dayDifference >= 8 && candidate.dayDifference <= 15;
                    //         } else if (filters.days === "16-30") {
                    //             return candidate.dayDifference >= 16 && candidate.dayDifference <= 30;
                    //         } else if (filters.days === "beyond-30") {
                    //             return candidate.dayDifference > 30;
                    //         } else if (filters.days === "noticePeriod") {
                    //             return candidate.checkbox;
                    //         } else {
                    //             return true;
                    //         }
                    //     }
                    //     return true;
                    // })
                    .filter(candidate => {
                        if (checkBoxfilters.length > 0) {
                            const anyFilterPresent = checkBoxfilters.includes('Any');
                            if (anyFilterPresent) {
                                return true;
                            }
                            return checkBoxfilters.includes(candidate.days);
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (selectedResults.length > 0) {
                            return selectedResults.some(result =>
                                candidate.skills.includes(result) || candidate.designation.includes(result)
                            );
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (filters.minExperienceYr && filters.minExperienceMonth) {
                            return (candidate.year >= filters.minExperienceYr && candidate.month >= filters.minExperienceMonth)
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (filters.maxExperienceYr && filters.maxExperienceMonth) {
                            return (candidate.month <= filters.maxExperienceYr && candidate.month <= filters.maxExperienceMonth)
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (selectedLocationResults.length > 0) {
                            return selectedLocationResults.filter(result =>
                                candidate.location.includes(result)
                            );
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (filters.currencyType) {
                            return candidate.currencyType === filters.currencyType
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (filters.minSalary && filters.maxSalary) {
                            return (candidate.minSalary >= filters.minSalary && candidate.maxSalary <= filters.maxSalary)
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (selectedDepartmentResults.length > 0) {
                            return selectedDepartmentResults.filter(result =>
                                candidate.department.includes(result)
                            );
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (selectedRoleResults.length > 0) {
                            return selectedRoleResults.filter(result =>
                                candidate.role.includes(result)
                            );
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (selectedIndustryResults.length > 0) {
                            return selectedIndustryResults.filter(result =>
                                candidate.industry.includes(result)
                            );
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (filters.company) {
                            return candidate.company.toLowerCase() === filters.company.toLowerCase()
                        }
                        return true;
                    })
                    .filter(candidate => {
                        if (filters.gender) {
                            return candidate.gender === filters.gender
                        }
                        return true;
                    })

                console.log(filteredResults)

                if (filteredResults.length > 0) {
                    setFilteredSearchResults(filteredResults);
                    axios.post("https://skillety.onrender.com/recent-search", recentSearch)
                        .then(res => {
                            console.log(res.data)
                            getAllRecentSearch();
                        })
                        .catch(err => console.log(err))
                } else {
                    setFilteredSearchResultsMsg("no such candidates found")
                }
            }
        } else {
            showErrorMessage("select atleast one filter")
        }
    };

    const handleFill = (id) => {
        const selectedSearchResult = recentSearches.find(search => search._id === id)
        if (selectedSearchResult) {
            setFilters({
                ...filters,
                days: selectedSearchResult.days,
                minExperienceYr: selectedSearchResult.minExperienceYr,
                minExperienceMonth: selectedSearchResult.minExperienceMonth,
                maxExperienceYr: selectedSearchResult.maxExperienceYr,
                maxExperienceMonth: selectedSearchResult.maxExperienceMonth,
                minSalary: selectedSearchResult.minSalary,
                maxSalary: selectedSearchResult.maxSalary,
                company: selectedSearchResult.company,
                candidateType: selectedSearchResult.candidateType,
                gender: selectedSearchResult.gender
            })
            setSelectedResults(selectedSearchResult.selectedResults)
            setSelectedLocationResults(selectedSearchResult.selectedLocationResults)
            setSelectedDepartmentResults(selectedSearchResult.selectedDepartmentResults)
            setSelectedRoleResults(selectedSearchResult.selectedRoleResults)
            setSelectedIndustryResults(selectedSearchResult?.industry)
        }

    }

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

    const handleLocationSearch = (e) => {
        const inputValue = e.target.value;
        setFilters({ ...filters, location: inputValue });

        if (inputValue.length > 0) {
            const locations = locationArray.filter((obj) => {
                return obj.location.toLowerCase().includes(inputValue.toLowerCase());
            });

            if (locations.length > 0) {
                setFilteredLocation(locations);
            } else {
                setFilteredLocation([]);
            }
        } else {
            setFilteredLocation([]);
        }
    };

    const handleFilteredLocationClick = (clickResult) => {
        console.log(clickResult)
        if (selectedLocationResults.includes(clickResult)) {
            setSelectedLocationResults([...selectedLocationResults]);
            setFilters({ ...filters, location: "" });
            setFilteredLocation([]);

        } else {
            setSelectedLocationResults([...selectedLocationResults, clickResult]);
            setFilters({ ...filters, location: "" });
            setFilteredLocation([]);
        }
    }

    const handleDepartmentSearch = (e) => {
        const inputValue = e.target.value;
        setFilters({ ...filters, department: inputValue });

        if (inputValue.length > 0) {
            const departments = departmentArray.filter((obj) => {
                return obj.department.toLowerCase().includes(inputValue.toLowerCase());
            });

            if (departments.length > 0) {
                setFilteredDepartment(departments);
            } else {
                setFilteredDepartment([]);
            }
        } else {
            setFilteredDepartment([]);
        }
    };

    const handleFilteredDepartmentClick = (clickResult) => {
        console.log(clickResult)
        if (selectedDepartmentResults.includes(clickResult)) {
            setSelectedDepartmentResults([...selectedDepartmentResults]);
            setFilters({ ...filters, department: "" });
            setFilteredDepartment([]);

        } else {
            setSelectedDepartmentResults([...selectedDepartmentResults, clickResult]);
            setFilters({ ...filters, department: "" });
            setFilteredDepartment([]);
        }
    }

    const handleRoleSearch = (e) => {
        const inputValue = e.target.value;
        setFilters({ ...filters, role: inputValue });

        if (inputValue.length > 0) {
            const roles = roleArray.filter((obj) => {
                return obj.role.toLowerCase().includes(inputValue.toLowerCase());
            });

            if (roles.length > 0) {
                setFilteredRole(roles);
            } else {
                setFilteredRole([]);
            }
        } else {
            setFilteredRole([]);
        }
    };

    const handleIndustrySearch = (e) => {
        const inputValue = e.target.value;
        setFilters({ ...filters, industry: inputValue });

        if (inputValue.length > 0) {
            const industries = industryArray.filter((obj) => {
                return obj.industry.toLowerCase().includes(inputValue.toLowerCase());
            });

            if (industries.length > 0) {
                setFilteredIndustry(industries);
            } else {
                setFilteredIndustry([]);
            }
        } else {
            setFilteredIndustry([]);
        }
    };

    const handleFilteredRoleClick = (clickResult) => {
        console.log(clickResult)
        if (selectedRoleResults.includes(clickResult)) {
            setSelectedRoleResults([...selectedRoleResults]);
            setFilters({ ...filters, role: "" });
            setFilteredRole([]);

        } else {
            setSelectedRoleResults([...selectedRoleResults, clickResult]);
            setFilters({ ...filters, role: "" });
            setFilteredRole([]);
        }
    }

    const handleFilteredIndustryClick = (clickResult) => {
        console.log(clickResult)
        if (selectedIndustryResults.includes(clickResult)) {
            setSelectedIndustryResults([...selectedIndustryResults]);
            setFilters({ ...filters, industry: "" });
            setFilteredIndustry([]);

        } else {
            setSelectedIndustryResults([...selectedIndustryResults, clickResult]);
            setFilters({ ...filters, industry: "" });
            setFilteredIndustry([]);
        }
    }


    const handleDeselect = (result) => {
        setSelectedResults(selectedResults.filter(selected => selected !== result));
    }

    const handleDeselectDepartment = (department) => {
        setSelectedDepartmentResults(selectedDepartmentResults.filter(selectedDepartment => selectedDepartment !== department));
    }

    const handleDeselectLocation = (location) => {
        setSelectedLocationResults(selectedLocationResults.filter(selectedLocation => selectedLocation !== location));
    }

    const handleDeselectRole = (role) => {
        setSelectedRoleResults(selectedRoleResults.filter(selectedRole => selectedRole !== role));
    }

    const handleDeselectIndustry = (industry) => {
        setSelectedIndustryResults(selectedIndustryResults.filter(selectedIndustry => selectedIndustry !== industry));
    }

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

    const viewCandidateDetail = async (id, percentage) => {
        try {
            const packageSelectionDetail = await getClientChoosenPlan(loginClientDetail.companyId);
            if (clientToken) {
                if (packageSelectionDetail) {
                    if (viewedCandidate.length > 0) {
                        const alreadyViewedCandidate = viewedCandidate.find(cand => cand.candidateId === id);
                        if (alreadyViewedCandidate) {
                            window.open(`https://skillety-dashboard.onrender.com/talents/${id}?percentage=${percentage}`, '_blank');

                        } else {
                            console.log(viewedCandidate.length)
                            if (viewedCandidate.length < cvViews) {
                                const idData = {
                                    candidateId: id,
                                    companyId: loginClientDetail.companyId,
                                };
                                const response = await axios.post("https://skillety.onrender.com/cv-views", idData, {
                                    headers: {
                                        Authorization: `Bearer ${clientToken}`,
                                        Accept: 'application/json'
                                    }
                                });

                                const result = response.data;
                                console.log(result);
                                getViewedCandidates();
                                window.open(`https://skillety-dashboard.onrender.com/talents/${id}?percentage=${percentage}`, '_blank');
                            } else {
                                await new Promise(() => {
                                    Swal.fire({
                                        title: 'Buy Package Plan',
                                        text: 'You reached your max cv-views in your plan, upgrade your plan',
                                        icon: 'info',
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'OK',
                                    }).then(() => {
                                        window.open(`https://skillety-dashboard.onrender.com/package-plans`, '_blank');
                                    });
                                });
                            }
                        }
                    } else {
                        const idData = {
                            candidateId: id,
                            companyId: loginClientDetail.companyId,
                        };
                        const response = await axios.post("https://skillety.onrender.com/cv-views", idData, {
                            headers: {
                                Authorization: `Bearer ${clientToken}`,
                                Accept: 'application/json'
                            }
                        });

                        const result = response.data;
                        console.log(result);
                        getViewedCandidates();
                        window.open(`https://skillety-dashboard.onrender.com/talents/${id}?percentage=${percentage}`, '_blank');

                    }
                } else {
                    await new Promise(() => {
                        Swal.fire({
                            title: 'Buy Package Plan',
                            text: '',
                            icon: 'info',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            window.open(`https://skillety-dashboard.onrender.com/package-plans`, '_blank');
                        });
                    });
                }
            } else {
                navigate("/client-login");
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <Layout searchCV={true} />
            <div className='cli--tal-pro-search-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="custom--container tal--pro-search">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Search Talent</p>
                                </div>
                            </div>

                            {/* Search page section start */}
                            {!searchResult ?
                                <div className='talent--profile-search-page-section'>
                                    <div className="cli-tal-pro-search-container">
                                        <div className="row">
                                            <div className="col-12 col-lg-12 col-xl-6 col-md-12">
                                                <h4 className='cli-tal-pro-search-heading'>Search Page</h4>
                                            </div>
                                            <p className='tal-head-desc'>Welcome to the Talent Search page at Skillety! Dive into a realm where exceptional talent meets opportunity. Our algorithms are tuned in a different way that it gives you accuracy by match percentage and Notice Period duration. Explore, discover, and connect with the talent that transforms visions into realities. Your journey to extraordinary possibilities begins here! </p>
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
                                                                {/* <div className="tal--search-option-container">
                                                                    <input id="notice_period_1" className="tal--search-radio" type="radio" name="notice_period"
                                                                        value="any"
                                                                        onChange={(e) => setFilters({ ...filters, days: e.target.value })} />
                                                                    <div className="tal--search-tile">
                                                                        <label for="notice_period_1" className="tal--search-tile-label pe-2 ps-2">Any</label>
                                                                    </div>
                                                                </div> */}

                                                                        <div className='education-type-option'>
                                                                            <input type="checkbox"
                                                                                className='education-type-input'
                                                                                id="notice_period_1"
                                                                                name="notice_period"
                                                                                // value="any"
                                                                                // onChange={(e) => setFilters({ ...filters, days: e.target.value })}
                                                                                checked={checkBoxfilters.includes('Any')}
                                                                                onChange={() => handleCheckboxChange('Any')} 
                                                                                />
                                                                            <label for="notice_period_1"
                                                                                className='education-type-label'>
                                                                                Any
                                                                            </label>
                                                                        </div>

                                                                {/* <div className="tal--search-option-container">
                                                                    <input id="notice_period_2" className="tal--search-radio" type="radio" name="notice_period"
                                                                        value="0-7"
                                                                        onChange={(e) => setFilters({ ...filters, days: e.target.value })} />
                                                                    <div className="tal--search-tile">
                                                                        <label for="notice_period_2" className="tal--search-tile-label">0-07 days</label>
                                                                        <i class="bi bi-plus"></i>
                                                                    </div>
                                                                </div> */}

                                                                        <div className='education-type-option'>
                                                                            <input type="checkbox"
                                                                                className='education-type-input'
                                                                                id="notice_period_2"
                                                                                // name="notice_period"
                                                                                // value="0-7"
                                                                                // onChange={(e) => setFilters({ ...filters, days: e.target.value })} 
                                                                                checked={checkBoxfilters.includes('0 to 7 days')}
                                                                                onChange={() => handleCheckboxChange('0 to 7 days')}
                                                                                />
                                                                            <label for="notice_period_2"
                                                                                className='education-type-label'>
                                                                                0-07 days
                                                                            </label>
                                                                        </div>

                                                                {/* <div className="tal--search-option-container">
                                                                    <input id="notice_period_3" className="tal--search-radio" type="radio" name="notice_period"
                                                                        value="8-15"
                                                                        onChange={(e) => setFilters({ ...filters, days: e.target.value })} />
                                                                    <div className="tal--search-tile">
                                                                        <label for="notice_period_3" className="tal--search-tile-label">08 to 15 days</label>
                                                                        <i class="bi bi-plus"></i>
                                                                    </div>
                                                                </div> */}

                                                                        <div className='education-type-option'>
                                                                            <input type="checkbox"
                                                                                className='education-type-input'
                                                                                id="notice_period_3"
                                                                                // name="notice_period"
                                                                                // value="8-15"
                                                                                // onChange={(e) => setFilters({ ...filters, days: e.target.value })} 
                                                                                checked={checkBoxfilters.includes('8 to 15 days')}
                                                                                onChange={() => handleCheckboxChange('8 to 15 days')}
                                                                                />
                                                                            <label for="notice_period_3"
                                                                                className='education-type-label'>
                                                                                08 to 15 days
                                                                            </label>
                                                                        </div>

                                                                {/* <div className="tal--search-option-container">
                                                                    <input id="notice_period_4" className="tal--search-radio" type="radio" name="notice_period"
                                                                        value="16-30"
                                                                        onChange={(e) => setFilters({ ...filters, days: e.target.value })} />
                                                                    <div className="tal--search-tile">
                                                                        <label for="notice_period_4" className="tal--search-tile-label">16 to 30 days</label>
                                                                        <i class="bi bi-plus"></i>
                                                                    </div>
                                                                </div> */}

                                                                        <div className='education-type-option'>
                                                                            <input type="checkbox"
                                                                                className='education-type-input'
                                                                                id="notice_period_4"
                                                                                // name="notice_period"
                                                                                // value="16-30"
                                                                                // onChange={(e) => setFilters({ ...filters, days: e.target.value })} 
                                                                                checked={checkBoxfilters.includes('16 to 30 days')}
                                                                                onChange={() => handleCheckboxChange('16 to 30 days')}
                                                                                />
                                                                            <label for="notice_period_4"
                                                                                className='education-type-label'>
                                                                                16 to 30 days
                                                                            </label>
                                                                        </div>

                                                                {/* <div className="tal--search-option-container">
                                                                    <input id="notice_period_5" className="tal--search-radio" type="radio" name="notice_period"
                                                                        value="beyond-30"
                                                                        onChange={(e) => setFilters({ ...filters, days: e.target.value })} />
                                                                    <div className="tal--search-tile">
                                                                        <label for="notice_period_5" className="tal--search-tile-label">beyond 30 days</label>
                                                                        <i class="bi bi-plus"></i>
                                                                    </div>
                                                                </div> */}

                                                                        <div className='education-type-option'>
                                                                            <input type="checkbox"
                                                                                className='education-type-input'
                                                                                id="notice_period_5"
                                                                                // name="notice_period"
                                                                                // value="beyond-30"
                                                                                // onChange={(e) => setFilters({ ...filters, days: e.target.value })}
                                                                                checked={checkBoxfilters.includes('More than 30 days')}
                                                                                onChange={() => handleCheckboxChange('More than 30 days')}/>
                                                                            <label for="notice_period_5"
                                                                                className='education-type-label'>
                                                                                Beyond 30 days
                                                                            </label>
                                                                        </div>

                                                                {/* <div className="tal--search-option-container">
                                                                    <input id="notice_period_6" className="tal--search-radio" type="radio" name="notice_period"
                                                                        value="noticePeriod"
                                                                        onChange={(e) => setFilters({ ...filters, days: e.target.value })} />
                                                                    <div className="tal--search-tile">
                                                                        <label for="notice_period_6" className="tal--search-tile-label">Currently serving notice Period</label>
                                                                        <i class="bi bi-plus"></i>
                                                                    </div>
                                                                </div> */}

                                                                        <div className='education-type-option'>
                                                                            <input type="checkbox"
                                                                                className='education-type-input'
                                                                                id="notice_period_6"
                                                                                // name="notice_period"
                                                                                // value="noticePeriod"
                                                                                // onChange={(e) => setFilters({ ...filters, days: e.target.value })} 
                                                                                checked={checkBoxfilters.includes('Currently not serving notice period')}
                                                                                onChange={() => handleCheckboxChange('Currently not serving notice period')}
                                                                                />
                                                                            <label for="notice_period_6"
                                                                                className='education-type-label'>
                                                                                Currently serving notice Period
                                                                            </label>
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
                                                            {selectedResults.length > 0 && (
                                                                <div className='cli--tal-pro-badge-area mb-4'>
                                                                    {selectedResults.map(selectResult => (
                                                                        <span className="tal-cand-reg-form-badge"
                                                                            key={selectResult}
                                                                            onClick={() => handleDeselect(selectResult)}
                                                                        >{selectResult}</span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            <div className="cli--tal-pro-filter-input-area">
                                                                <input type="search" className='cli--tal-pro-filter-input' placeholder='Enter keywords like skills, designation'
                                                                    value={filters.searchInput}
                                                                    onChange={handleSearch}
                                                                />
                                                                <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
                                                                <div className='tal-pro-search-result-data-area'>
                                                                    {filteredList.length > 0 &&
                                                                        filteredList.map((filterResult) => (
                                                                            <div
                                                                                className='tal-pro-search-result-data'
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

                                                                <label className="cli--mark-keyword-check-input">
                                                                    <input type="checkbox" />
                                                                    <span className="cli--mark-keyword-checkmark"></span>
                                                                    Search all keyword in entire resume
                                                                </label>
                                                            </div>
                                                            {/* <div id="containerSearch" className='multi-input-container'>
                                                                <div className="cli--tal-search-add-input-area mt-3">
                                                                    <button className='cli--tal-search-keyword-add-input-button-search'>
                                                                        <i class="bi bi-plus add-input-icon"></i>
                                                                        Add Exclude Keywords
                                                                    </button>
                                                                </div>
                                                            </div> */}
                                                            {/* <div id="containerSearch2" className='multi-input-container'>
                                                                <div className="cli--tal-search-add-input-area">
                                                                    <button className='cli--tal-search-skill-add-input-button-search'>
                                                                        <i class="bi bi-plus add-input-icon"></i>
                                                                        Add IT Skills
                                                                    </button>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                        <div className="cli-tal-pro-search-filter-content">
                                                            <div className="cli-tal-pro-search-filter-title-area">
                                                                <h6 className='cli-tal-pro-search-filter-title'>Experience</h6>
                                                            </div>
                                                            <div className="cli-tal-pro-exp-input-area search-page">
                                                                <div className='cli-tal-pro-exp-input-container'>
                                                                    {/* <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' 
                                                                    value={filters.minExperienceYr}
                                                                    placeholder='Min Experience Year'/> */}
                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                                                                            <div
                                                                                key={number}
                                                                                className='tal-pro-search-result-data'
                                                                                onClick={() => setFilters({ ...filters, minExperienceYr: number })}
                                                                            >
                                                                                {number}
                                                                            </div>
                                                                            ))}
                                                                        </div> */}
                                                                    <select name="" className='cli-tal-pro-exp-input text-center numeric-input select' id=""
                                                                        value={filters.minExperienceYr}
                                                                        onChange={(e) => setFilters({ ...filters, minExperienceYr: e.target.value })}
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
                                                                </div>

                                                                <span className='cli-tal-pro-exp-input-text'>years</span>
                                                                <div className='cli-tal-pro-exp-input-container'>
                                                                    {/* <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' 
                                                                    value={filters.maxExperienceYr}
                                                                    placeholder='Max Experience Year'/> */}
                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                                                                            <div
                                                                                key={number}
                                                                                className='tal-pro-search-result-data'
                                                                                onClick={() => setFilters({ ...filters, maxExperienceYr: number })}
                                                                            >
                                                                                {number}
                                                                            </div>
                                                                            ))}
                                                                        </div> */}
                                                                    <select name="" className='cli-tal-pro-exp-input text-center numeric-input select' id=""
                                                                        value={filters.minExperienceMonth}
                                                                        onChange={(e) => setFilters({ ...filters, minExperienceMonth: e.target.value })}
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
                                                                </div>
                                                                <span className='cli-tal-pro-exp-input-text'>months</span>
                                                            </div>

                                                            <div className="cli-tal-pro-exp-input-area search-page mt-3">
                                                                <div className='cli-tal-pro-exp-input-container'>
                                                                    {/* <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' 
                                                                    value={filters.minExperienceMonth}
                                                                    placeholder='Min Experience Month'/> */}
                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                                                                            <div
                                                                                key={number}
                                                                                className='tal-pro-search-result-data'
                                                                                onClick={() => setFilters({ ...filters, minExperienceMonth: number })}
                                                                            >
                                                                                {number}
                                                                            </div>
                                                                            ))}
                                                                        </div> */}
                                                                    <select name="" className='cli-tal-pro-exp-input text-center numeric-input select' id=""
                                                                        value={filters.maxExperienceYr}
                                                                        onChange={(e) => setFilters({ ...filters, maxExperienceYr: e.target.value })}
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
                                                                </div>

                                                                <span className='cli-tal-pro-exp-input-text'>years</span>
                                                                <div className='cli-tal-pro-exp-input-container'>
                                                                    {/* <input type="number" className='cli-tal-pro-exp-input text-center numeric-input' 
                                                                    value={filters.maxExperienceMonth}
                                                                    placeholder='Max Experience Month'/> */}
                                                                    <select name="" className='cli-tal-pro-exp-input text-center numeric-input select' id=""
                                                                        value={filters.maxExperienceMonth}
                                                                        onChange={(e) => setFilters({ ...filters, maxExperienceMonth: e.target.value })}
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
                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                                                                            <div
                                                                                key={number}
                                                                                className='tal-pro-search-result-data'
                                                                                onClick={() => setFilters({ ...filters, maxExperienceMonth: number })}
                                                                            >
                                                                                {number}
                                                                            </div>
                                                                            ))}
                                                                        </div> */}
                                                                </div>
                                                                <span className='cli-tal-pro-exp-input-text'>months</span>
                                                            </div>
                                                        </div>
                                                        <div className="cli-tal-pro-search-filter-content">
                                                            <div className="cli-tal-pro-search-filter-title-area">
                                                                <h6 className='cli-tal-pro-search-filter-title'>Current location of candidate</h6>
                                                            </div>
                                                            {selectedLocationResults.length > 0 && (
                                                                <div className='cli--tal-pro-badge-area mb-4'>
                                                                    {selectedLocationResults.map(selectResult => (
                                                                        <span className="tal-cand-reg-form-badge"
                                                                            key={selectResult}
                                                                            onClick={() => handleDeselectLocation(selectResult)}
                                                                        >{selectResult}</span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            <div className="cli-tal-pro-search-filter-input-area location">
                                                                <input type="search" className='cli-tal-pro-search-filter-input' placeholder='Add location' value={filters.location}
                                                                    onChange={handleLocationSearch} />
                                                                <div className='tal-pro-search-result-data-area'>
                                                                    {filteredLocation.length > 0 &&
                                                                        filteredLocation.map((filterResult) => (
                                                                            <div
                                                                                className='tal-pro-search-result-data'
                                                                                key={filterResult._id}
                                                                                onClick={() => handleFilteredLocationClick(filterResult.location)}
                                                                            >
                                                                                {filterResult.location}
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                            {/* <div className="cli--mark-keyword-area search-results">
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
                                                            </div> */}
                                                        </div>

                                                        <div className="cli-tal-pro-search-filter-content">
                                                            <div className="cli-tal-pro-search-filter-title-area">
                                                                <h6 className='cli-tal-pro-search-filter-title'>Annual Salary</h6>
                                                            </div>
                                                            <div className="cli-tal-pro-exp-input-area search-page">
                                                                <div className="cli--salary-inputs-area">
                                                                    <select name="" className='cli-tal-pro-select-input width-30' id=""
                                                                        value={filters.currencyType}
                                                                        onChange={(e) => setFilters({ ...filters, currencyType: e.target.value })}>
                                                                        <option value="" disabled>Select</option>
                                                                        <option value="₹" selected>₹</option>
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
                                                                        <label htmlFor="department" className='cli-tal-search-filter-form-label'>Department</label>
                                                                    </div>

                                                                    {selectedDepartmentResults.length > 0 && (
                                                                        <div className='cli--tal-pro-badge-area mb-4'>
                                                                            {selectedDepartmentResults.map(selectResult => (
                                                                                <span className="tal-cand-reg-form-badge"
                                                                                    key={selectResult}
                                                                                    onClick={() => handleDeselectDepartment(selectResult)}
                                                                                >{selectResult}</span>
                                                                            ))}
                                                                        </div>
                                                                    )}

                                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                                        <input type="search" name='department' className='cli-tal-pro-search-filter-input' placeholder='Add Department'
                                                                            value={filters.department}
                                                                            onChange={handleDepartmentSearch} />
                                                                        <div className='tal-pro-search-result-data-area'>
                                                                            {filteredDepartment.length > 0 &&
                                                                                filteredDepartment.map((filterResult) => (
                                                                                    <div
                                                                                        className='tal-pro-search-result-data'
                                                                                        key={filterResult._id}
                                                                                        onClick={() => handleFilteredDepartmentClick(filterResult.department)}
                                                                                    >
                                                                                        {filterResult.department}
                                                                                    </div>
                                                                                ))}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="cli-tal-search-filter-form-group">
                                                                    <div className="cli-tal-search-filter-form-label-area">
                                                                        <label htmlFor="role" className='cli-tal-search-filter-form-label'>Role</label>
                                                                    </div>
                                                                    {selectedRoleResults.length > 0 && (
                                                                        <div className='cli--tal-pro-badge-area mb-4'>
                                                                            {selectedRoleResults.map(selectResult => (
                                                                                <span className="tal-cand-reg-form-badge"
                                                                                    key={selectResult}
                                                                                    onClick={() => handleDeselectRole(selectResult)}
                                                                                >{selectResult}</span>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                                        <input type="search" name='role' className='cli-tal-pro-search-filter-input' placeholder='Add Role'
                                                                            value={filters.role}
                                                                            onChange={handleRoleSearch} />
                                                                        <div className='tal-pro-search-result-data-area'>
                                                                            {filteredRole.length > 0 &&
                                                                                filteredRole.map((filterResult) => (
                                                                                    <div
                                                                                        className='tal-pro-search-result-data'
                                                                                        key={filterResult._id}
                                                                                        onClick={() => handleFilteredRoleClick(filterResult.role)}
                                                                                    >
                                                                                        {filterResult.role}
                                                                                    </div>
                                                                                ))}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* <div className="cli-tal-search-filter-form-group">
                                                                    <div className="cli-tal-search-filter-form-label-area">
                                                                        <label htmlFor="industry" className='cli-tal-search-filter-form-label'>Industry</label>
                                                                    </div>

                                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                                        <input type="text" name='industry' className='cli-tal-pro-search-filter-input' placeholder='Add Industry'
                                                                            value={filters.industry}
                                                                            onChange={(e) => setFilters({ ...filters, industry: e.target.value })} />

                                                                    </div>
                                                                </div> */}

                                                                <div className="cli-tal-search-filter-form-group">
                                                                    <div className="cli-tal-search-filter-form-label-area">
                                                                        <label htmlFor="industry" className='cli-tal-search-filter-form-label'>Industry</label>
                                                                    </div>
                                                                    {selectedIndustryResults.length > 0 && (
                                                                        <div className='cli--tal-pro-badge-area mb-4'>
                                                                            {selectedIndustryResults.map(selectResult => (
                                                                                <span className="tal-cand-reg-form-badge"
                                                                                    key={selectResult}
                                                                                    onClick={() => handleDeselectIndustry(selectResult)}
                                                                                >{selectResult}</span>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                                        <input type="search" name='industry' className='cli-tal-pro-search-filter-input' placeholder='Add Industry'
                                                                            value={filters.industry}
                                                                            onChange={handleIndustrySearch} />
                                                                        <div className='tal-pro-search-result-data-area'>
                                                                            {filteredIndustry.length > 0 &&
                                                                                filteredIndustry.map((filterResult) => (
                                                                                    <div
                                                                                        className='tal-pro-search-result-data'
                                                                                        key={filterResult._id}
                                                                                        onClick={() => handleFilteredIndustryClick(filterResult.industry)}
                                                                                    >
                                                                                        {filterResult.industry}
                                                                                    </div>
                                                                                ))}
                                                                        </div>
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
                                                                    {/* <div className='cli--tal-pro-badge-area mb-4'>
                                                                        <span className="tal-cand-reg-form-badge">Badge 1</span>
                                                                        <span className="tal-cand-reg-form-badge">Badge 1</span>
                                                                        <span className="tal-cand-reg-form-badge">Badge 1</span>
                                                                        <span className="tal-cand-reg-form-badge">Badge 1</span>
                                                                    </div> */}
                                                                    <div className="cli-tal-pro-search-filter-input-area">
                                                                        <input type="text" name='company' className='cli-tal-pro-search-filter-input' placeholder='Add Company name'
                                                                            value={filters.company}
                                                                            onChange={(e) => setFilters({ ...filters, company: e.target.value })} />
                                                                        {/* <div className='tal-pro-search-result-data-area'>
                                                                            <div className='tal-pro-search-result-data'>Search Result 1</div>
                                                                            <div className='tal-pro-search-result-data'>Search Result 2</div>
                                                                            <div className='tal-pro-search-result-data'>Search Result 3</div>
                                                                            <div className='tal-pro-search-result-data'>Search Result 4</div>
                                                                            <div className='tal-pro-search-result-data'>Search Result 5</div>
                                                                            <div className='tal-pro-search-result-data'>Search Result 6</div>
                                                                            <div className='tal-pro-search-result-data'>Search Result 7</div>
                                                                            <div className='tal-pro-search-result-data'>Search Result 8</div>
                                                                        </div> */}
                                                                    </div>
                                                                    {/* <div id="container" className='multi-input-container'>
                                                                        <div className="cli--tal-search-add-input-area mt-3">
                                                                            <button className='cli--tal-search-add-input-button'>
                                                                                <i class="bi bi-plus add-input-icon"></i>
                                                                                Add Exclude Company
                                                                            </button>
                                                                        </div>
                                                                    </div> */}
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
                                                                            <input id="all_candidate" className="tal--search-radio" type="radio" name="show"
                                                                                value="allCandidates"
                                                                                onChange={(e) => setFilters({ ...filters, candidateType: e.target.value })} />
                                                                            <div className="tal--search-tile">
                                                                                <label for="all_candidate" className="tal--search-tile-label">All candidates</label>
                                                                            </div>
                                                                        </div>

                                                                        <div className="tal--search-option-container">
                                                                            <input id="new_reg" className="tal--search-radio" type="radio" name="show"
                                                                                value="newRegistration"
                                                                                onChange={(e) => setFilters({ ...filters, candidateType: e.target.value })} />
                                                                            <div className="tal--search-tile">
                                                                                <label for="new_reg" className="tal--search-tile-label">New Registrations</label>
                                                                            </div>
                                                                        </div>

                                                                        {/* <div className="tal--search-option-container">
                                                                            <input id="recent_activity" className="tal--search-radio" type="radio" name="show" />
                                                                            <div className="tal--search-tile">
                                                                                <label for="recent_activity" className="tal--search-tile-label">Active Recently</label>
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
                                                                </div>

                                                                {/* <div className="cli-tal-pro-search-filter-content mb-0">
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
                                                                </div> */}
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

                                                                    {/* <div className="tal--search-options-area">
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
                                                                    </div> */}

                                                                    <ul className="nav nav-pills tal-education-select-area pt-2 mb-3" id="pills-tab" role="tablist">
                                                                        <li className="nav-item" role="presentation">
                                                                            <button className="nav-link education-button" id="any-ug"
                                                                                data-bs-toggle="pill" data-bs-target="#any-ug-education"
                                                                                type="button" role="tab" aria-controls="any-ug-education" aria-selected="false">
                                                                                Any UG Qualification
                                                                            </button>
                                                                        </li>
                                                                        <li className="nav-item" role="presentation">
                                                                            <button className="nav-link education-button" id="specific-ug"
                                                                                data-bs-toggle="pill" data-bs-target="#specific-ug-education"
                                                                                type="button" role="tab" aria-controls="specific-ug-education" aria-selected="false">
                                                                                Specific UG Qualification
                                                                            </button>
                                                                        </li>
                                                                        <li className="nav-item" role="presentation">
                                                                            <button className="nav-link education-button" id="no-ug"
                                                                                data-bs-toggle="pill" data-bs-target="#no-ug-education"
                                                                                type="button" role="tab" aria-controls="no-ug-education" aria-selected="false">
                                                                                No UG Qualification
                                                                            </button>
                                                                        </li>
                                                                    </ul>

                                                                    <div className="tab-content education-tab-content" id="ug-education-tab">
                                                                        <div className="tab-pane fade" id="any-ug-education" role="tabpanel" aria-labelledby="any-ug">
                                                                            <div className="education-info">Any UG qualification
                                                                                <span> - Candidates with any UG qualification will appear in the result.</span>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Institute</h6>
                                                                                </div>

                                                                                <div className='cli--tal-pro-badge-area mb-4'>
                                                                                    <span className="tal-cand-reg-form-badge">
                                                                                        Badge 1
                                                                                    </span>
                                                                                </div>

                                                                                <div className="cli-tal-pro-search-filter-input-area">
                                                                                    <input type="search" className='cli-tal-pro-search-filter-input' placeholder='Select institute' />

                                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div> */}

                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Education Type</h6>
                                                                                </div>

                                                                                <div className="education-type-area">
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="full-time-any-ug"
                                                                                            name="education_type_any_ug" />
                                                                                        <label for="full-time-any-ug"
                                                                                            className='education-type-label'>
                                                                                            Full Time
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="part-time-any-ug"
                                                                                            name="education_type_any_ug" />
                                                                                        <label for="part-time-any-ug"
                                                                                            className='education-type-label'>
                                                                                            Part Time
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="correspondence-any-ug"
                                                                                            name="education_type_any_ug" />
                                                                                        <label for="correspondence-any-ug"
                                                                                            className='education-type-label'>
                                                                                            Correspondence
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Year of degree completion</h6>
                                                                                </div>

                                                                                <div className="row">
                                                                                    <div className="col-12 col-xxl-4 col-xl-6 col-lg-6 col-md-12 mb-md-4 mb-lg-0 mb-xl-0">
                                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                                            <select name="job_type" id="candidate_seek"
                                                                                                className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                                <option value="" disabled selected>From</option>
                                                                                                <option value="1">Option 1</option>
                                                                                                <option value="2">Option 2</option>
                                                                                                <option value="3">Option 3</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-12 col-xxl-4 col-xl-6 col-lg-6 col-md-12">
                                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                                            <select name="employee_type" id="candidate_seek"
                                                                                                className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                                <option value="" disabled selected>To</option>
                                                                                                <option value="1">Option 1</option>
                                                                                                <option value="2">Option 2</option>
                                                                                                <option value="3">Option 3</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="tab-pane fade" id="specific-ug-education" role="tabpanel" aria-labelledby="specific-ug">
                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Choose Course</h6>
                                                                                </div>

                                                                                <div className='cli--tal-pro-badge-area mb-4'>
                                                                                    <span className="tal-cand-reg-form-badge">
                                                                                        Badge 1
                                                                                    </span>
                                                                                </div>

                                                                                <div className="cli-tal-pro-search-filter-input-area">
                                                                                    <input type="search" className='cli-tal-pro-search-filter-input'
                                                                                        placeholder='Type to select UG course from list' />

                                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div> */}

                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Institute</h6>
                                                                                </div>

                                                                                <div className='cli--tal-pro-badge-area mb-4'>
                                                                                    <span className="tal-cand-reg-form-badge">
                                                                                        Badge 1
                                                                                    </span>
                                                                                </div>

                                                                                <div className="cli-tal-pro-search-filter-input-area">
                                                                                    <input type="search" className='cli-tal-pro-search-filter-input' placeholder='Select institute' />

                                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div> */}

                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Education Type</h6>
                                                                                </div>

                                                                                <div className="education-type-area">
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="full-time-sp-ug"
                                                                                            name="education_type_sp_ug" />
                                                                                        <label for="full-time-sp-ug"
                                                                                            className='education-type-label'>
                                                                                            Full Time
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="part-time-sp-ug"
                                                                                            name="education_type_sp_ug" />
                                                                                        <label for="part-time-sp-ug"
                                                                                            className='education-type-label'>
                                                                                            Part Time
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="correspondence-sp-ug"
                                                                                            name="education_type_sp_ug" />
                                                                                        <label for="correspondence-sp-ug"
                                                                                            className='education-type-label'>
                                                                                            Correspondence
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Year of degree completion</h6>
                                                                                </div>

                                                                                <div className="row">
                                                                                    <div className="col-12 col-xxl-4 col-xl-6 col-lg-6 col-md-12 mb-md-4 mb-lg-0 mb-xl-0">
                                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                                            <select name="job_type" id="candidate_seek"
                                                                                                className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                                <option value="" disabled selected>From</option>
                                                                                                <option value="1">Option 1</option>
                                                                                                <option value="2">Option 2</option>
                                                                                                <option value="3">Option 3</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-12 col-xxl-4 col-xl-6 col-lg-6 col-md-12">
                                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                                            <select name="employee_type" id="candidate_seek"
                                                                                                className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                                <option value="" disabled selected>To</option>
                                                                                                <option value="1">Option 1</option>
                                                                                                <option value="2">Option 2</option>
                                                                                                <option value="3">Option 3</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="tab-pane fade" id="no-ug-education" role="tabpanel" aria-labelledby="no-ug">
                                                                            <div className="education-info">No UG qualification
                                                                                <span> - Candidates who have only completed 10th or 12th but are not pursuing/ have pursued
                                                                                    graduation will appear in the result</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="cli-tal-pro-search-filter-content mb-0">
                                                                    <div className="cli-tal-pro-search-filter-title-area">
                                                                        <h6 className='cli-tal-pro-search-filter-title'>PG Qualification</h6>
                                                                    </div>

                                                                    {/* <div className="tal--search-options-area">
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
                                                                    </div> */}

                                                                    <ul className="nav nav-pills tal-education-select-area pt-2 mb-3" id="pills-tab" role="tablist">
                                                                        <li className="nav-item" role="presentation">
                                                                            <button className="nav-link education-button" id="any-pg"
                                                                                data-bs-toggle="pill" data-bs-target="#any-pg-education"
                                                                                type="button" role="tab" aria-controls="any-pg-education" aria-selected="false">
                                                                                Any PG Qualification
                                                                            </button>
                                                                        </li>
                                                                        <li className="nav-item" role="presentation">
                                                                            <button className="nav-link education-button" id="specific-pg"
                                                                                data-bs-toggle="pill" data-bs-target="#specific-pg-education"
                                                                                type="button" role="tab" aria-controls="specific-pg-education" aria-selected="false">
                                                                                Specific PG Qualification
                                                                            </button>
                                                                        </li>
                                                                        <li className="nav-item" role="presentation">
                                                                            <button className="nav-link education-button" id="no-pg"
                                                                                data-bs-toggle="pill" data-bs-target="#no-pg-education"
                                                                                type="button" role="tab" aria-controls="no-pg-education" aria-selected="false">
                                                                                No PG Qualification
                                                                            </button>
                                                                        </li>
                                                                    </ul>

                                                                    <div className="tab-content education-tab-content" id="pg-education-tab">
                                                                        <div className="tab-pane fade" id="any-pg-education" role="tabpanel" aria-labelledby="any-pg">
                                                                            <div className="education-info">Any PG qualification
                                                                                <span> - Candidates with any PG qualification will appear in the result.</span>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Institute</h6>
                                                                                </div>

                                                                                <div className='cli--tal-pro-badge-area mb-4'>
                                                                                    <span className="tal-cand-reg-form-badge">
                                                                                        Badge 1
                                                                                    </span>
                                                                                </div>

                                                                                <div className="cli-tal-pro-search-filter-input-area">
                                                                                    <input type="search" className='cli-tal-pro-search-filter-input' placeholder='Select institute' />

                                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div> */}

                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Education Type</h6>
                                                                                </div>

                                                                                <div className="education-type-area">
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="full-time-any-pg"
                                                                                            name="education_type_any_pg" />
                                                                                        <label for="full-time-any-pg"
                                                                                            className='education-type-label'>
                                                                                            Full Time
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="part-time-any-pg"
                                                                                            name="education_type_any_pg" />
                                                                                        <label for="part-time-any-pg"
                                                                                            className='education-type-label'>
                                                                                            Part Time
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="correspondence-any-pg"
                                                                                            name="education_type_any_pg" />
                                                                                        <label for="correspondence-any-pg"
                                                                                            className='education-type-label'>
                                                                                            Correspondence
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Year of degree completion</h6>
                                                                                </div>

                                                                                <div className="row">
                                                                                    <div className="col-12 col-xxl-4 col-xl-6 col-lg-6 col-md-12 mb-md-4 mb-lg-0 mb-xl-0">
                                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                                            <select name="job_type"
                                                                                                className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                                <option value="" disabled selected>From</option>
                                                                                                <option value="1">Option 1</option>
                                                                                                <option value="2">Option 2</option>
                                                                                                <option value="3">Option 3</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-12 col-xxl-4 col-xl-6 col-lg-6 col-md-12">
                                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                                            <select name="employee_type"
                                                                                                className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                                <option value="" disabled selected>To</option>
                                                                                                <option value="1">Option 1</option>
                                                                                                <option value="2">Option 2</option>
                                                                                                <option value="3">Option 3</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="tab-pane fade" id="specific-pg-education" role="tabpanel" aria-labelledby="specific-pg">
                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Choose Course</h6>
                                                                                </div>

                                                                                <div className='cli--tal-pro-badge-area mb-4'>
                                                                                    <span className="tal-cand-reg-form-badge">
                                                                                        Badge 1
                                                                                    </span>
                                                                                </div>

                                                                                <div className="cli-tal-pro-search-filter-input-area">
                                                                                    <input type="search" className='cli-tal-pro-search-filter-input'
                                                                                        placeholder='Type to select UG course from list' />

                                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div> */}

                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Institute</h6>
                                                                                </div>

                                                                                <div className='cli--tal-pro-badge-area mb-4'>
                                                                                    <span className="tal-cand-reg-form-badge">
                                                                                        Badge 1
                                                                                    </span>
                                                                                </div>

                                                                                <div className="cli-tal-pro-search-filter-input-area">
                                                                                    <input type="search" className='cli-tal-pro-search-filter-input' placeholder='Select institute' />

                                                                                    {/* <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div> */}

                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Education Type</h6>
                                                                                </div>

                                                                                <div className="education-type-area">
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="full-time-sp-pg"
                                                                                            name="education_type_sp_pg" />
                                                                                        <label for="full-time-sp-pg"
                                                                                            className='education-type-label'>
                                                                                            Full Time
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="part-time-sp-pg"
                                                                                            name="education_type_sp_pg" />
                                                                                        <label for="part-time-sp-pg"
                                                                                            className='education-type-label'>
                                                                                            Part Time
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='education-type-option'>
                                                                                        <input type="checkbox"
                                                                                            className='education-type-input'
                                                                                            id="correspondence-sp-pg"
                                                                                            name="education_type_sp_pg" />
                                                                                        <label for="correspondence-sp-pg"
                                                                                            className='education-type-label'>
                                                                                            Correspondence
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="cli-tal-pro-search-filter-content">
                                                                                <div className="cli-tal-pro-search-filter-title-area">
                                                                                    <h6 className='cli-tal-pro-search-filter-title'>Year of degree completion</h6>
                                                                                </div>

                                                                                <div className="row">
                                                                                    <div className="col-12 col-xxl-4 col-xl-6 col-lg-6 col-md-12 mb-md-4 mb-lg-0 mb-xl-0">
                                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                                            <select name="job_type"
                                                                                                className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                                <option value="" disabled selected>From</option>
                                                                                                <option value="1">Option 1</option>
                                                                                                <option value="2">Option 2</option>
                                                                                                <option value="3">Option 3</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-12 col-xxl-4 col-xl-6 col-lg-6 col-md-12">
                                                                                        <div className="cli-tal-pro-search-filter-input-area">
                                                                                            <select name="employee_type"
                                                                                                className='cli-tal-pro-search-filter-input cand--seek-select'>
                                                                                                <option value="" disabled selected>To</option>
                                                                                                <option value="1">Option 1</option>
                                                                                                <option value="2">Option 2</option>
                                                                                                <option value="3">Option 3</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="tab-pane fade" id="no-pg-education" role="tabpanel" aria-labelledby="no-pg">
                                                                            <div className="education-info">No PG qualification
                                                                                <span> - Candidates who have only completed 10th or 12th but are not pursuing/ have pursued
                                                                                    graduation will appear in the result</span>
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
                                                                        {/* <div className="tal--search-option-container">
                                                                            <input id="all_cand" className="tal--search-radio" type="radio" name="gender" />
                                                                            <div className="tal--search-tile">
                                                                                <label for="all_cand" className="tal--search-tile-label">All candidates</label>
                                                                            </div>
                                                                        </div> */}

                                                                        <div className="tal--search-option-container">
                                                                            <input id="male_cand" className="tal--search-radio" type="radio" name="gender"
                                                                                value="male"
                                                                                onChange={(e) => setFilters({ ...filters, gender: e.target.value })} />
                                                                            <div className="tal--search-tile">
                                                                                <label for="male_cand" className="tal--search-tile-label">Male Candidates</label>
                                                                            </div>
                                                                        </div>

                                                                        <div className="tal--search-option-container">
                                                                            <input id="female_cand" className="tal--search-radio" type="radio" name="gender"
                                                                                value="female"
                                                                                onChange={(e) => setFilters({ ...filters, gender: e.target.value })} />
                                                                            <div className="tal--search-tile">
                                                                                <label for="female_cand" className="tal--search-tile-label">Female candidates</label>
                                                                            </div>
                                                                        </div>
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
                                                    {recentSearches.map(search => {
                                                        return (
                                                            <div className="cli-tal-pro-recent-search-area" key={search._id}>
                                                                <div className="cli-tal-pro-recent-search-btn-area">
                                                                    <button className='cli-tal-pro-recent-search-btn' onClick={() => handleFill(search._id)}>Fill this search</button>
                                                                    {/* <button className='cli-tal-pro-recent-search-btn'>Search profile</button> */}
                                                                </div>
                                                                <div className="cli-tal-pro-recent-search-tags">
                                                                    <span>{search.selectedResults.join(", ")}|{search.selectedRoleResults.join(", ")}|{search.selectedLocationResults.join(", ")}|{search.selectedDepartmentResults.join(", ")}|{search.industry.join(", ")}....</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                    {/* <div className="cli-tal-pro-recent-search-area">
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
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                // test


                                <div className='talent--profile-search-results-section'>
                                    <div className="cli-tal-pro-search-container">
                                        <div className="row">
                                            <div className="col-12 col-lg-12 col-xl-12 col-md-12">
                                                <h4 className='cli-tal-pro-search-heading'>Search Result Page</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="pl--package-btn-sub previous back-to-search-btn mb-5" data-aos="fade-left" onClick={() => setSearchResult(false)}>
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
                                        <div className="col-12 col-lg-4 col-xl-3 col-md-4 custom-right-border-col ps-lg-0 ps-md-1 col-width-lg-30">
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
                                                                {/* <div id="containerCompany" className='multi-input-container'>
                                                                    <div className="cli--tal-search-add-input-area mt-3">
                                                                        <button className='cli--tal-search-add-company-input-button'>
                                                                            <i class="bi bi-plus add-input-icon"></i>
                                                                            Add Exclude Company
                                                                        </button>
                                                                    </div>
                                                                </div> */}
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

                                        <div className="col-12 col-lg-8 col-xl-9 col-md-8 pe-lg-0 pe-md-1 col-width-lg-70">
                                            {/* <div className="tal--pro-search-result-image-area">
                                        <img src="assets/img/jobs/filter-data-img.png" className='tal--pro-search-result-image' alt="" data-aos="fade"  />
                                        <h6 className='tal--pro-search-result-title' data-aos="fade-up">Add Filter for the desired search</h6>
                                    </div> */}
                                            <div className="cli--tal-pro-search-results-area">
                                                {filteredSearchResultsMsg ?
                                                    <p>{filteredSearchResultsMsg}</p> :
                                                    filteredSearchResults.length > 0 ?
                                                        filteredSearchResults.slice(x[0], x[1]).map((candidate) => {
                                                            const viewedCandidateForThisCandidate = loginClientDetail.companyId && viewedCandidate.find(cand => cand.candidateId === candidate.id);
                                                            const matchingImg = candidateImg ? candidateImg.find(img => img.id === candidate.id) : null;
                                                            const imgSrc = matchingImg ? `https://skillety.onrender.com/candidate_profile/${matchingImg.image}` : "assets/img/talents-images/avatar.jpg";

                                                            const calculateMatchPercentage = (skills1, skills2) => {
                                                                const matchingSkills = skills2.filter(skill => skills1.includes(skill));
                                                                return (matchingSkills.length / skills1.length) * 100;
                                                            }
                                                            const percentage = Math.round(calculateMatchPercentage(selectedResults, [...candidate.skills, ...candidate.designation]));
                                                            return (
                                                                <article className="talent--profile-card search" data-aos="fade-left" key={candidate.id}>
                                                                    <div className="tal--pro-card-left-area search">
                                                                        <div className='card-split-line'></div>
                                                                        <div className="tal--pro-card-name-area">
                                                                            <label className="tal--pro-card-name-check-container">
                                                                                <input type="checkbox" class="tal--checkbox" checked={viewedCandidateForThisCandidate ? true : false} onChange={(e) => e.preventDefault()} />
                                                                                <div className="tal--pro-card-name-checkmark"></div>
                                                                            </label>
                                                                            <h6 className='tal--pro-card-name'>{candidate.firstName + ' ' + candidate.lastName}</h6>
                                                                        </div>
                                                                        <div className="tal--pro-card-tags search">
                                                                            <h6 className='tal--pro-card-exp'>
                                                                                Experience : {candidate.year > 0 ? candidate.year + 'years' : "" + candidate.month > 0 ? candidate.month + 'months' : ""}
                                                                            </h6>
                                                                            {/* <h6 className='tal--pro-card-exp'>
                                                                                9.5 LPA
                                                                            </h6> */}
                                                                            <h6 className='tal--pro-card-location'>
                                                                                <i class="bx bxs-map"></i>
                                                                                <span>{candidate.location}</span>
                                                                            </h6>
                                                                            {/* <h6 className='tal--pro-card-role'>
                                                                                {candidate.designation[0]}
                                                                            </h6> */}
                                                                        </div>
                                                                        <div className="tal--pro-card-desc-area search">
                                                                            <div className="row tal--pro-card-desc-row">
                                                                                <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                                    <h6 className='tal--pro-card-desc-title'>Previous&nbsp;:</h6>
                                                                                </div>
                                                                                <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                                    <p className='tal--pro-card-desc text-capitalized'>{candidate.designation[0] + " " + "at" + " " + candidate.companyName}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row tal--pro-card-desc-row">
                                                                                <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                                    <h6 className='tal--pro-card-desc-title'>Education&nbsp;:</h6>
                                                                                </div>
                                                                                <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                                    <p className='tal--pro-card-desc text-capitalized'>{candidate.education}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row tal--pro-card-desc-row">
                                                                                <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                                    <h6 className='tal--pro-card-desc-title'>College&nbsp;:</h6>
                                                                                </div>
                                                                                <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                                    <p className='tal--pro-card-desc text-capitalized'>{candidate.college}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row tal--pro-card-desc-row">
                                                                                <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                                    <h6 className='tal--pro-card-desc-title'>KeySkill&nbsp;:</h6>
                                                                                </div>
                                                                                <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                                    <p className='tal--pro-card-desc text-capitalized'>{candidate.skills.join(", ")}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row tal--pro-card-desc-row">
                                                                                <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                                    <h6 className='tal--pro-card-desc-title'>Profile headline&nbsp;:</h6>
                                                                                </div>
                                                                                <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                                    <p className='tal--pro-card-desc text-capitalized'>{candidate.profileHeadline}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="tal--pro-card-bottom-btn-area search">
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

                                                                    <div className="tal--pro-card-right-area search">
                                                                        <div className="tal--pro-card-right-cover-area search">
                                                                            <div>
                                                                                <div className='tal--pro-card-profile-img-role-area search'>
                                                                                    <img src={imgSrc} className='tal--pro-card-profile-img' alt="" />
                                                                                    <p className='tal--pro-card-role-name'>{candidate.designation[0]}</p>
                                                                                </div>
                                                                                <div className="tal--pro-card-contact-btn-area search">
                                                                                    <button className='tal--pro-card-contact-btn search'
                                                                                        onClick={() => viewCandidateDetail(candidate.id, percentage)}
                                                                                        onMouseEnter={handleMouseEnter}
                                                                                        onMouseLeave={handleMouseLeave}>
                                                                                        View Profile
                                                                                    </button>
                                                                                    <span className="profile-credits-title">&#129031; 01 Credit</span>
                                                                                    {/* <button className='tal--pro-card-contact-btn search'>
                                                                                        <img src="assets/img/talent-profile/call.png" alt="" />
                                                                                        Call Candidate
                                                                                    </button> */}
                                                                                </div>
                                                                            </div>
                                                                            <div className="tal--pro-card-ability-number-area search-result">
                                                                                {selectedResults.length > 0 &&
                                                                                    <div className="tal--pro-card-ability-number-left search-result">
                                                                                        <h6 className='tal--pro-card-ability search'>Keywords matched</h6>
                                                                                        <h2 className='tal--pro-card-percentage search'>{Math.round(percentage)}%</h2>
                                                                                    </div>}
                                                                                <div className="tal--pro-card-ability-number-right search-result">
                                                                                    <h6 className='tal--pro-card-can-join'>Can join in</h6>
                                                                                    <h2 className='tal--pro-card-join-days'>{candidate.days}<span></span></h2>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        {/* <div className="tal--pro-card-right-btn-area search">
                                                                            <button className='tal--pro-card-right-btn search'>
                                                                                <img src="assets/img/talent-profile/document.png" alt="" />
                                                                            </button>
                                                                            <button className='tal--pro-card-right-btn search'>
                                                                                <img src="assets/img/talent-profile/arrow.png" alt="" />
                                                                            </button>
                                                                            <button className='tal--pro-card-right-btn search'>
                                                                                <img src="assets/img/talent-profile/email.png" alt="" />
                                                                            </button>
                                                                        </div> */}
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
                                                    <h6 className='tal--pro-total-result-text'>Total Items : <span>{filteredSearchResultsMsg ? "0" : filteredSearchResults.length}</span></h6>
                                                    <div className='tal--pro-slider-btn-sub'>
                                                        {x[0] > 0 && <button className="tal--pro-slider-btn" onClick={() => setX([x[0] - 4, x[1] - 4])}>
                                                            <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                                <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                                            </svg>
                                                        </button>}
                                                        {(filteredSearchResultsMsg ? !filteredSearchResultsMsg : (filteredSearchResults.slice(x[0], x[1]).length === 4 && filteredSearchResults.length > x[1])) && < button className="tal--pro-slider-btn" onClick={() => setX([x[0] + 4, x[1] + 4])}>
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
                            {/* Search results page section end */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default TalentsProfileSearch;