import React, { useContext, useState } from "react";
import { useEffect } from "react";
import $ from "jquery";
import "./TalentsProfileSearch.css";
import "./TalentsProfileSearch-responsive.css";
import Layout from "../../components/Layout";
import { Footer } from "../../components/Footer";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const TalentsProfileSearch = () => {
  const location = useLocation();
  const [inCommingData, setInCommingData] = useState();

  const clientToken = JSON.parse(localStorage.getItem("clientToken"));
  const {
    getProtectedData,
    getClientChoosenPlan,
    packageSelectionDetail,
    getCandidateImg,
    candidateImg,
    loginId
  } = useContext(AuthContext);
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
  const [educationArray, setEducationArray] = useState([]);
  const [roleArray, setRoleArray] = useState([]);
  const [industryArray, setIndustryArray] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [filteredEducation, setFilteredEducation] = useState([]);
  const [filteredRole, setFilteredRole] = useState([]);
  const [filteredIndustry, setFilteredIndustry] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [selectedLocationResults, setSelectedLocationResults] = useState([]);
  const [selectedEducationResults, setselectedEducationResults] = useState([]);
  const [selectedRoleResults, setSelectedRoleResults] = useState([]);
  const [selectedIndustryResults, setSelectedIndustryResults] = useState([]);

  const [recentSearches, setRecentSearches] = useState([]);
  const [checkBoxfilters, setCheckBoxFilters] = useState([]);

  const [x, setX] = useState([0, 25]);

  const [filters, setFilters] = useState({
    searchInput: "",
    minExperienceYr: "",
    maxExperienceYr: "",
    minExperienceMonth: "",
    maxExperienceMonth: "",
    location: "",
    currencyType: "₹",
    minSalary: "",
    maxSalary: "",
    education: "",
    role: "",
    days: "",
    // industry: "",
    company: "",
    candidateType: "",
    activeIn: "",
    // gender: "",
  });

  console.log(filters);

  const navigate = useNavigate();

  useEffect(() => {
    // $(document).ready(function () {
    ////change the toggle text and color
    $(".toggleSwitch").change(function () {
      var $label = $(this)
        .closest(".cl-toggle-switch")
        .find(".cl-toggle--switch-label");
      if ($(this).is(":checked")) {
        $label.text("Boolean On").css("color", "#714F36");
      } else {
        $label.text("Boolean Off").css("color", "#B3B3B3");
      }
    });
    ////

    //// avoid "e" negative values for number input field
    $(".numeric-input").on("input", function () {
      var inputValue = $(this).val();

      // Remove any non-digit characters, "e", and leading minus sign
      inputValue = inputValue.replace(/[^0-9]/g, "");

      // Ensure that the input is not negative
      if (inputValue.length > 0 && inputValue.charAt(0) === "-") {
        inputValue = inputValue.slice(1);
      }

      // Set the cleaned value back in the input field
      $(this).val(inputValue);
    });
    ////

    ////for tooltip
    $(".info-icon-button").click(function () {
      // Toggle tooltip display on button click
      $(".tooltip").toggleClass("active");
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
        placeholder: "Add company name",
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
        placeholder: "Add company name",
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
    };
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
      var expandArea = $(this)
        .closest(".cli-tal-pro-search-filter-content-section")
        .find(".cli-tal-pro-search-filter-expand-area");

      if (expandArea.hasClass("opened")) {
        expandArea.slideUp();
        expandArea.removeClass("opened");
        $(this).removeClass("opened");
      } else {
        expandArea.slideDown();
        expandArea.addClass("opened");
        $(this).addClass("opened");
      }
    }
    ////

    ////for custom select option for days
    var defaultOption = $(".select-options li:first-child");
    $(".select-box span").text(defaultOption.text());

    $(".select-box").on("click", function () {
      var selectBox = $(this);
      var toggleIcon = selectBox.find(".toggle-icon");
      var selectOptions = selectBox.next(".select-options");

      selectOptions.slideToggle(300, function () {
        if (selectOptions.is(":visible")) {
          toggleIcon.css("transform", "rotateX(180deg)");
          selectBox.addClass("active");
        } else {
          toggleIcon.css("transform", "rotateX(0deg)");
          selectBox.removeClass("active");
        }
      });
    });

    $(".select-options li").on("click", function () {
      var selectedValue = $(this).data("value");
      $(".select-box span").text($(this).text());
      $(".select-options").slideUp();
      $(".select-box .toggle-icon").css("transform", "rotateX(0deg)");
      $(".select-box").removeClass("active");

      // You can do something with the selected value here
      console.log("Selected value: " + selectedValue);
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest(".custom-select").length) {
        $(".select-options").slideUp();
        $(".select-box .toggle-icon").css("transform", "rotateX(0deg)");
        $(".select-box").removeClass("active");
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
    $(".cli-tal-pro-search-filter-toggle-area").on("click", handleFilterToggle);
    $(".cli--tal-search-qualification-add-input-button").click(
      addEducationInputField
    );

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      $(".tal--pro-slider-btn").off("click");
      $(".cli-tal-pro-search-page-btn").off("click");
      $(".cli-tal-pro-search-filter-toggle-area").off(
        "click",
        handleFilterToggle
      );
      $(".cli--tal-search-qualification-add-input-button").off(
        "click",
        addEducationInputField
      );
    };
    // });
  }, [searchResult]);

  const handleMouseEnter = (event) => {
    const button = event.target;
    const profileCard = button.closest(".talent--profile-card");

    if (!profileCard.querySelector(".tal--checkbox").checked) {
      const newText = button.nextElementSibling.textContent;
      button.textContent = newText;
    }
  };

  const handleMouseLeave = (event) => {
    const button = event.target;
    const profileCard = button.closest(".talent--profile-card");

    if (!profileCard.querySelector(".tal--checkbox").checked) {
      const originalText = "View Profile"; // Replace with your original text
      button.textContent = originalText;
    }
  };

  const handleKeywordSearch = () => {
    if (inCommingData && candidateDetail.length > 0) {
      setX([0, 25]);
      setFilteredSearchResultsMsg("");
      console.log(selectedResults);
      setSearchResult(true);
      const filteredResults = candidateDetail.filter((candidate) => {
        if (selectedResults.length > 0) {
          return selectedResults.some(
            (result) =>
              candidate.skills.includes(result) ||
              candidate.designation.includes(result)
          );
        }
        return true;
      });
      console.log(filteredResults);
      if (filteredResults.length > 0) {
        setFilteredSearchResults(filteredResults);
        setInCommingData(null);
      } else {
        setFilteredSearchResultsMsg("No candidates found");
        setInCommingData(null);
      }
    }
  };

  useEffect(() => {
    const { keywords } = location.state || {};
    setInCommingData(keywords);
  }, [location.state]);

  useEffect(() => {
    if (inCommingData) {
      setSelectedResults(inCommingData);
    }
  }, [inCommingData]);

  useEffect(() => {
    handleKeywordSearch();
  }, [selectedResults, candidateDetail]);

  //for show success message for payment
  function showSuccessMessage(message) {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  }

  //for show error message for payment
  function showErrorMessage(message) {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  }

  const getAllSkills = async () => {
    try {
      const res = await axios.get("https://skillety-n6r1.onrender.com/skills", {
        headers: {
          Authorization: `Bearer ${clientToken}`,
          Accept: "application/json",
        },
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
      const res = await axios.get(
        "https://skillety-n6r1.onrender.com/designations",
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            Accept: "application/json",
          },
        }
      );
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
      const res = await axios.get(
        "https://skillety-n6r1.onrender.com/locations",
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            Accept: "application/json",
          },
        }
      );
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

  const getAllEducations = async () => {
    try {
      const res = await axios.get(
        "https://skillety-n6r1.onrender.com/educations",
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            Accept: "application/json",
          },
        }
      );
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

  const getAllRoles = async () => {
    try {
      const res = await axios.get("https://skillety-n6r1.onrender.com/roles", {
        headers: {
          Authorization: `Bearer ${clientToken}`,
          Accept: "application/json",
        },
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
      const res = await axios.get(
        "https://skillety-n6r1.onrender.com/industries",
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            Accept: "application/json",
          },
        }
      );
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
      const response = await axios.get(
        "https://skillety-n6r1.onrender.com/candidate-Detail",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
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
      const response = await axios.get(
        `https://skillety-n6r1.onrender.com/recent-search/${employeeId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
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
    getAllEducations();
    getAllRoles();
    getAllIndustries();
    getCandidateImg();
  }, []);

  const getLoginClientDetail = async () => {
    try {
      const res = await axios.get(
        `https://skillety-n6r1.onrender.com/client/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            Accept: "application/json",
          },
        }
      );
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
  };

  const getViewedCandidates = async () => {
    try {
      const res = await axios.get(
        `https://skillety-n6r1.onrender.com/cv-views/${loginClientDetail.companyId}`,
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            Accept: "application/json",
          },
        }
      );
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
  };

  useEffect(() => {
    if (clientToken) {
      const fetchData = async () => {
        try {
          const user = await getProtectedData(clientToken);
          console.log(user);
          setEmployeeId(user.id || user.uid);
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
      getAllRecentSearch();
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
  console.log(filters);

  const handleCheckboxChange = (category) => {
    console.log(category);
    const updatedFilters = checkBoxfilters.includes(category)
      ? checkBoxfilters.filter((filter) => filter !== category)
      : [...checkBoxfilters, category];
    setCheckBoxFilters(updatedFilters);
  };

  const isWithinDays = (dateString, days) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const difference = Math.abs(targetDate.getTime() - today.getTime());
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));
    console.log(daysDifference);
    return parseInt(daysDifference) <= parseInt(days);
  };

  const candidateTestDetail = [
    {
      name: "1",
      activeIn: "Sat Feb 03 2024 12:31:50 GMT+0530 (India Standard Time)",
    },
    {
      name: "2",
      activeIn: "Sat Jan 26 2024 12:31:50 GMT+0530 (India Standard Time)",
    },
  ];

  const handleSkillSearch = () => {
    if (
      checkBoxfilters.length > 0 ||
      selectedResults.length > 0 ||
      selectedLocationResults.length > 0 ||
      (filters.minExperienceYr
        // && filters.minExperienceMonth
      ) ||
      (filters.maxExperienceYr
        // && filters.maxExperienceMonth
      ) ||
      (filters.currencyType && (filters.minSalary || filters.maxSalary)) ||
      selectedEducationResults.length > 0 ||
      // || selectedRoleResults.length > 0
      // || filters.industry
      filters.company ||
      filters.candidateType ||
      // || filters.gender
      filters.activeIn
    ) {
      const recentSearch = {
        id: employeeId,
        ...(filters.days && { days: filters.days }),
        ...(selectedResults.length > 0 && { selectedResults }),
        ...(selectedLocationResults.length > 0 && { selectedLocationResults }),
        ...(filters.minExperienceYr && {
          minExperienceYr: filters.minExperienceYr,
        }),
        // ...(filters.minExperienceMonth && {
        //   minExperienceMonth: filters.minExperienceMonth,
        // }),
        ...(filters.maxExperienceYr && {
          maxExperienceYr: filters.maxExperienceYr,
        }),
        // ...(filters.maxExperienceMonth && {
        //   maxExperienceMonth: filters.maxExperienceMonth,
        // }),
        ...(filters.minSalary && { minSalary: filters.minSalary }),
        ...(filters.maxSalary && { maxSalary: filters.maxSalary }),
        ...(selectedEducationResults.length > 0 && {
          selectedEducationResults,
        }),
        ...(filters.company && { company: filters.company }),
        ...(filters.candidateType && { candidateType: filters.candidateType }),
      };

      setX([0, 25]);
      setFilteredSearchResultsMsg("");
      setSearchResult(true);

      //         const filteredResults = candidateDetail
      //                 .filter(candidate => {
      //                     if (checkBoxfilters.length > 0) {
      //                         const anyFilterPresent = checkBoxfilters.includes('Any');
      //                         if (anyFilterPresent) {
      //                             return true;
      //                         }
      //                         return checkBoxfilters.includes(candidate.days);
      //                     }
      //                     return true;
      //                 })
      //                 .filter(candidate => {
      //                     if (selectedResults.length > 0) {
      //                         return selectedResults.some(result =>
      //                             candidate.skills.includes(result) || candidate.designation.includes(result)
      //                         );
      //                     }
      //                     return true;
      //                 })
      //                 .filter(candidate => {
      //                     if ((filters.minExperienceYr && filters.minExperienceMonth) && (filters.maxExperienceYr && filters.maxExperienceMonth)) {
      //                         return ((candidate.year >= (filters.minExperienceYr) && (filters.maxExperienceYr)) && (candidate.month >= (filters.minExperienceMonth && filters.maxExperienceMonth)))
      //                     }
      //                     return true;
      //                 })
      //                 .filter(candidate => {
      //                     if ((filters.minExperienceYr && filters.minExperienceMonth) && !(filters.maxExperienceYr && filters.maxExperienceMonth)) {
      //                         return ((candidate.year >= filters.minExperienceYr) && (candidate.month >= filters.minExperienceMonth))
      //                     }
      //                     return true;
      //                 })
      //                 .filter(candidate => {
      //                     if ((filters.maxExperienceYr && filters.maxExperienceMonth) && !(filters.minExperienceYr && filters.minExperienceMonth)) {
      //                         return ((candidate.year >= filters.maxExperienceYr) && (candidate.month >= filters.maxExperienceMonth))
      //                     }
      //                     return true;
      //                 })
      //                 .filter(candidate => {
      //                     if (selectedLocationResults.length > 0) {

      //                         return (candidate?.preferedlocations.some(loc => selectedLocationResults.includes(loc)) || selectedLocationResults.includes(candidate.location))

      //                     }
      //                     return true;
      //                 })
      //                 // .filter(candidate => {
      //                 //     if (selectedLocationResults.length > 0 && typeof candidate.location  === "string") {
      //                 //         return selectedLocationResults.includes(candidate.location);
      //                 //     }
      //                 //     return true;
      //                 // })
      //                 .filter(candidate => {
      //                     if (filters.currencyType && filters.minSalary && filters.maxSalary) {
      //                         return (
      //                             (candidate?.currencyType === filters.currencyType) &&
      //                             (
      //                                 (
      //                                     parseInt(filters.minSalary)<= parseInt(candidate?.minSalary) <= parseInt(filters.maxSalary)
      //                                 ) ||
      //                                 (
      //                                     parseInt(filters.minSalary)<= parseInt(candidate?.maxSalary) <= parseInt(filters.maxSalary)
      //                                 ) ||
      //                                 (
      //                                     (parseInt(filters.minSalary)<= parseInt(candidate?.minSalary) <= parseInt(filters.maxSalary)) && (parseInt(filters.minSalary)<= parseInt(candidate?.maxSalary) <= parseInt(filters.maxSalary))
      //                                 )
      //                             )
      //                         )
      //                     }
      //                     return true;
      //                 })
      //                 .filter(candidate => {
      //                     if (filters.currencyType && filters.minSalary && !(filters.maxSalary)) {
      //                         return ((candidate?.currencyType === filters.currencyType) && (parseInt(candidate?.minSalary) <= parseInt(filters.minSalary)))
      //                     }
      //                     return true;
      //                 })
      //                 .filter(candidate => {
      //                     if (filters.currencyType && filters.maxSalary && !(filters.minSalary)) {
      //                         return ((candidate?.currencyType === filters.currencyType) && (parseInt(candidate.maxSalary) <= parseInt(filters.maxSalary)))
      //                     }
      //                     return true;
      //                 })
      //                 .filter(candidate => {
      //                     if (selectedEducationResults.length > 0 ) {

      //                         return candidate.education.some(edu => selectedEducationResults.includes(edu))

      //                     }
      //                     return true;
      //                 })
      //                 // .filter(candidate => {
      //                 //     if (selectedRoleResults.length > 0) {
      //                 //         return selectedRoleResults.some(result => result === candidate?.role);
      //                 //     }
      //                 //     return true;
      //                 // })
      //                 // .filter(candidate => {
      //                 //     if (selectedIndustryResults.length > 0) {
      //                 //         return selectedIndustryResults.filter(result =>
      //                 //             candidate.industry.includes(result)
      //                 //         );
      //                 //     }
      //                 //     return true;
      //                 // })
      //                 .filter(candidate => {
      //                     if (filters.company) {
      //                         return candidate.companyName.toLowerCase() === filters.company.toLowerCase()
      //                     }
      //                     return true;
      //                 })
      //                 // .filter(candidate => {
      //                 //     if (filters.gender) {
      //                 //         return candidate.gender === filters.gender
      //                 //     }
      //                 //     return true;
      //                 // })

      //                 if (filters.candidateType === "newRegistration") {
      //                     filteredResults
      //                         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      //                         .slice(0, 10)
      //                         .filter(candidate => {
      //                             if(filters.activeIn){
      //                                 console.log(candidate?.activeIn)
      //                                 return isWithinDays(candidate?.activeIn, filters.activeIn)
      //                             }
      //                             return true;
      //                         })
      //                 } else if (filters.candidateType === "allCandidates") {
      //                      filteredResults
      //                         .filter(candidate => {
      //                             if(filters.activeIn){
      //                                 console.log(candidate?.activeIn)
      //                                 return isWithinDays(candidate?.activeIn, filters.activeIn)
      //                             }
      //                             return true;
      //                         })
      //                 }

      //                 console.log(filteredResults)

      //             if (filteredResults.length > 0) {
      //                 setFilteredSearchResults(filteredResults);
      //                 axios.post("https://skillety-n6r1.onrender.com/recent-search", recentSearch)
      //                     .then(res => {
      //                         console.log(res.data)
      //                         getAllRecentSearch();
      //                     })
      //                     .catch(err => console.log(err))
      //             } else {
      //                 setFilteredSearchResultsMsg("no such candidates found")
      //             }

      const filteredResults = candidateDetail
        .filter((candidate) => {
          if (checkBoxfilters.length > 0) {
            const anyFilterPresent = checkBoxfilters.includes("Any");
            if (anyFilterPresent) {
              return true;
            }
            return checkBoxfilters.includes(candidate.days);
          }
          return true;
        })
        .filter((candidate) => {
          if (selectedResults.length > 0) {
            return selectedResults.some(
              (result) =>
                candidate.skills.includes(result) ||
                candidate.designation.includes(result)
            );
          }
          return true;
        })
        .filter((candidate) => {
          if (
            filters.minExperienceYr &&
            // filters.minExperienceMonth &&
            filters.maxExperienceYr
            // &&
            // filters.maxExperienceMonth
          ) {
            return (
              candidate.year >= filters.minExperienceYr &&
              candidate.year <= filters.maxExperienceYr
              // &&
              // candidate.month >= filters.minExperienceMonth &&
              // candidate.month <= filters.maxExperienceMonth
            );
          }
          return true;
        })
        .filter((candidate) => {
          if (
            filters.minExperienceYr
            //  &&
            // filters.minExperienceMonth 
            &&
            !filters.maxExperienceYr
            // &&
            // !filters.maxExperienceMonth
          ) {
            return (
              candidate.year >= filters.minExperienceYr
              // &&
              // candidate.month >= filters.minExperienceMonth
            );
          }
          return true;
        })
        .filter((candidate) => {
          if (
            !filters.minExperienceYr
            // &&
            // !filters.minExperienceMonth 
            &&
            filters.maxExperienceYr
            // &&
            // filters.maxExperienceMonth
          ) {
            return (
              candidate.year <= filters.maxExperienceYr
              //  &&
              // candidate.month <= filters.maxExperienceMonth
            );
          }
          return true;
        })
        .filter((candidate) => {
          if (selectedLocationResults.length > 0) {
            return (
              candidate?.preferedlocations.some((loc) =>
                selectedLocationResults.includes(loc)
              ) || selectedLocationResults.includes(candidate.location)
            );
          }
          return true;
        })
        .filter((candidate) => {
          if (filters.currencyType && filters.minSalary && filters.maxSalary) {
            return (
              candidate?.currencyType === filters.currencyType &&
              parseInt(candidate?.minSalary) >= parseInt(filters.minSalary) &&
              parseInt(candidate?.maxSalary) <= parseInt(filters.maxSalary)
            );
          }
          return true;
        })
        .filter((candidate) => {
          if (filters.currencyType && filters.minSalary && !filters.maxSalary) {
            return (
              candidate?.currencyType === filters.currencyType &&
              parseInt(candidate?.minSalary) <= parseInt(filters.minSalary)
            );
          }
          return true;
        })
        .filter((candidate) => {
          if (filters.currencyType && !filters.minSalary && filters.maxSalary) {
            return (
              candidate?.currencyType === filters.currencyType &&
              parseInt(candidate.maxSalary) <= parseInt(filters.maxSalary)
            );
          }
          return true;
        })
        .filter((candidate) => {
          if (selectedEducationResults.length > 0) {
            return candidate.education.some((edu) =>
              selectedEducationResults.includes(edu)
            );
          }
          return true;
        })
        .filter((candidate) => {
          if (filters.company) {
            return (
              candidate.companyName.toLowerCase() ===
              filters.company.toLowerCase()
            );
          }
          return true;
        });

      let finalFilteredResults = filteredResults;

      if (filters.candidateType === "newRegistration") {
        finalFilteredResults = filteredResults
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10)
          .filter((candidate) => {
            if (filters.activeIn) {
              console.log(candidate?.activeIn);
              return isWithinDays(candidate?.activeIn, filters.activeIn);
            }
            return true;
          });
      } else if (filters.candidateType === "allCandidates") {
        finalFilteredResults = filteredResults.filter((candidate) => {
          if (filters.activeIn) {
            console.log(candidate?.activeIn);
            return isWithinDays(candidate?.activeIn, filters.activeIn);
          }
          return true;
        });
      }

      finalFilteredResults = filteredResults.filter((candidate) => {
        if (filters.activeIn) {
          console.log(candidate?.activeIn);
          return isWithinDays(candidate?.activeIn, filters.activeIn);
        }
        return true;
      });

      console.log(finalFilteredResults);

      if (finalFilteredResults.length > 0) {
        setFilteredSearchResults(finalFilteredResults);
        if (employeeId) {
          axios
            .post(
              "https://skillety-n6r1.onrender.com/recent-search",
              recentSearch
            )
            .then((res) => {
              console.log(res.data);
              getAllRecentSearch();
            })
            .catch((err) => console.log(err));
        }
      } else {
        setFilteredSearchResultsMsg("No candidates found");
      }
    } else {
      showErrorMessage("Choose one filter.");
    }
  };

  const handleFill = (id) => {
    const selectedSearchResult = recentSearches.find(
      (search) => search._id === id
    );
    if (selectedSearchResult) {
      setFilters({
        ...filters,
        days: selectedSearchResult?.days,
        minExperienceYr: selectedSearchResult?.minExperienceYr,
        // minExperienceMonth: selectedSearchResult?.minExperienceMonth,
        maxExperienceYr: selectedSearchResult?.maxExperienceYr,
        // maxExperienceMonth: selectedSearchResult?.maxExperienceMonth,
        minSalary: selectedSearchResult?.minSalary,
        maxSalary: selectedSearchResult?.maxSalary,
        company: selectedSearchResult?.company,
        candidateType: selectedSearchResult?.candidateType,
        // gender: selectedSearchResult.gender
      });
      setSelectedResults(selectedSearchResult?.selectedResults);
      setSelectedLocationResults(selectedSearchResult?.selectedLocationResults);
      setselectedEducationResults(
        selectedSearchResult?.selectedEducationResults
      );
      // setSelectedRoleResults(selectedSearchResult.selectedRoleResults)
      // setSelectedIndustryResults(selectedSearchResult?.industry)
    }
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setFilters({ ...filters, searchInput: inputValue });

    if (inputValue.length > 0) {
      const skillsObj = skillArray.filter((obj) => {
        return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
      });

      const jobRolesObj = jobRoleArray.filter((obj) => {
        return obj.designation.toLowerCase().includes(inputValue.toLowerCase());
      });

      const skills = skillsObj.map((skill) => skill.skill);
      const jobRoles = jobRolesObj.map((jobRole) => jobRole.designation);

      function combineArraysUnique(arr1, arr2) {
        const combinedSet = new Set([...arr1, ...arr2]);
        return Array.from(combinedSet);
      }

      const combinedResults = combineArraysUnique(skills, jobRoles);

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
    console.log(clickResult);
    if (selectedResults.includes(clickResult)) {
      setSelectedResults([...selectedResults]);
      setFilters({ ...filters, searchInput: "" });
      setFilteredList([]);
    } else {
      setSelectedResults([...selectedResults, clickResult]);
      setFilters({ ...filters, searchInput: "" });
      setFilteredList([]);
    }
  };

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
    console.log(clickResult);
    if (selectedLocationResults.includes(clickResult)) {
      setSelectedLocationResults([...selectedLocationResults]);
      setFilters({ ...filters, location: "" });
      setFilteredLocation([]);
    } else {
      setSelectedLocationResults([...selectedLocationResults, clickResult]);
      setFilters({ ...filters, location: "" });
      setFilteredLocation([]);
    }
  };

  const handleEducationSearch = (e) => {
    const inputValue = e.target.value;
    setFilters({ ...filters, education: inputValue });

    if (inputValue.length > 0) {
      const educations = educationArray.filter((obj) => {
        return obj.education.toLowerCase().includes(inputValue.toLowerCase());
      });

      if (educations.length > 0) {
        setFilteredEducation(educations);
      } else {
        setFilteredEducation([]);
      }
    } else {
      setFilteredEducation([]);
    }
  };

  const handleFilteredEducationClick = (clickResult) => {
    console.log(clickResult);
    if (selectedEducationResults.includes(clickResult)) {
      setselectedEducationResults([...selectedEducationResults]);
      setFilters({ ...filters, education: "" });
      setFilteredEducation([]);
    } else {
      setselectedEducationResults([...selectedEducationResults, clickResult]);
      setFilters({ ...filters, education: "" });
      setFilteredEducation([]);
    }
  };

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
    console.log(clickResult);
    if (selectedRoleResults.includes(clickResult)) {
      setSelectedRoleResults([...selectedRoleResults]);
      setFilters({ ...filters, role: "" });
      setFilteredRole([]);
    } else {
      setSelectedRoleResults([...selectedRoleResults, clickResult]);
      setFilters({ ...filters, role: "" });
      setFilteredRole([]);
    }
  };

  const handleFilteredIndustryClick = (clickResult) => {
    console.log(clickResult);
    if (selectedIndustryResults.includes(clickResult)) {
      setSelectedIndustryResults([...selectedIndustryResults]);
      setFilters({ ...filters, industry: "" });
      setFilteredIndustry([]);
    } else {
      setSelectedIndustryResults([...selectedIndustryResults, clickResult]);
      setFilters({ ...filters, industry: "" });
      setFilteredIndustry([]);
    }
  };

  const handleDeselect = (result) => {
    setSelectedResults(
      selectedResults.filter((selected) => selected !== result)
    );
  };

  const handleDeselectEducation = (education) => {
    setselectedEducationResults(
      selectedEducationResults.filter(
        (selectedEducation) => selectedEducation !== education
      )
    );
  };

  const handleDeselectLocation = (location) => {
    setSelectedLocationResults(
      selectedLocationResults.filter(
        (selectedLocation) => selectedLocation !== location
      )
    );
  };

  const handleDeselectRole = (role) => {
    setSelectedRoleResults(
      selectedRoleResults.filter((selectedRole) => selectedRole !== role)
    );
  };

  const handleDeselectIndustry = (industry) => {
    setSelectedIndustryResults(
      selectedIndustryResults.filter(
        (selectedIndustry) => selectedIndustry !== industry
      )
    );
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

  // const viewCandidateDetail = async (id, percentage) => {
  //   try {
  //     const packageSelectionDetail = await getClientChoosenPlan(
  //       loginClientDetail.companyId
  //     );
  //     if (clientToken) {
  //       if (packageSelectionDetail) {
  //         if (viewedCandidate.length > 0) {
  //           const alreadyViewedCandidate = viewedCandidate.find(
  //             (cand) => cand.candidateId === id
  //           );
  //           if (alreadyViewedCandidate) {
  //             window.open(
  //               `https://skillety-dashboard-tk2y.onrender.com/talents/${id}?percentage=${percentage}`,
  //               "_blank"
  //             );
  //           } else {
  //             console.log(viewedCandidate.length);
  //             if (viewedCandidate.length < cvViews) {
  //               const idData = {
  //                 candidateId: id,
  //                 companyId: loginClientDetail.companyId,
  //               };
  //               const response = await axios.post(
  //                 "https://skillety-n6r1.onrender.com/cv-views",
  //                 idData,
  //                 {
  //                   headers: {
  //                     Authorization: `Bearer ${clientToken}`,
  //                     Accept: "application/json",
  //                   },
  //                 }
  //               );

  //               const result = response.data;
  //               console.log(result);
  //               getViewedCandidates();
  //               window.open(
  //                 `https://skillety-dashboard-tk2y.onrender.com/talents/${id}?percentage=${percentage}`,
  //                 "_blank"
  //               );
  //             } else {
  //               await new Promise(() => {
  //                 Swal.fire({
  //                   title: "Buy Package Plan",
  //                   text: "You reached your max cv-views in your plan, upgrade your plan",
  //                   icon: "info",
  //                   confirmButtonColor: "#3085d6",
  //                   confirmButtonText: "OK",
  //                 }).then(() => {
  //                   window.open(
  //                     `https://skillety-dashboard-tk2y.onrender.com/package-plans`,
  //                     "_blank"
  //                   );
  //                 });
  //               });
  //             }
  //           }
  //         } else {
  //           const idData = {
  //             candidateId: id,
  //             companyId: loginClientDetail.companyId,
  //           };
  //           const response = await axios.post(
  //             "https://skillety-n6r1.onrender.com/cv-views",
  //             idData,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${clientToken}`,
  //                 Accept: "application/json",
  //               },
  //             }
  //           );

  //           const result = response.data;
  //           console.log(result);
  //           getViewedCandidates();
  //           window.open(
  //             `https://skillety-dashboard-tk2y.onrender.com/talents/${id}?percentage=${percentage}`,
  //             "_blank"
  //           );
  //         }
  //       } else {
  //         await new Promise(() => {
  //           Swal.fire({
  //             title: "Buy Package Plan",
  //             text: "",
  //             icon: "info",
  //             confirmButtonColor: "#3085d6",
  //             confirmButtonText: "OK",
  //           }).then(() => {
  //             window.open(
  //               `https://skillety-dashboard-tk2y.onrender.com/package-plans`,
  //               "_blank"
  //             );
  //           });
  //         });
  //       }
  //     } else {
  //       navigate("/client-login");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const viewCandidateDetail = async (id, percentage) => {
    try {
      if (clientToken) {
        const response = await axios.post("https://skillety-n6r1.onrender.com/cv-views", {
          candidateId: id,
          companyId: loginClientDetail.companyId,
        }, {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            Accept: `application/json`
          }
        });

        if (response.data.message === "Candidate Viewed" || response.data.message === "The candidate detail already viewed!") {
          let url = `https://skillety-dashboard-tk2y.onrender.com/talents/${id}?token=${encodeURIComponent(clientToken)}&loginId=${loginId}`;
          if (!isNaN(percentage)) {
            url += `&percentage=${percentage}`;
          }

          window.open(url, "_blank");
        } else {
          Swal.fire({
            title: 'Error!',
            text: '',
            icon: 'info',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      } else {
        navigate("/client-login");
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.error === "Customized CV Views package expired!" || error.response.data.error === "No CV views remaining in the active package!" || error.response.data.error === "No active package found!") {
        Swal.fire({
          title: 'Buy Package Plan',
          text: error.response.data.error,
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate("/packages");
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: '',
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    }
  };


  return (
    <div>
      <Layout searchCV={true} />
      <div className="cli--tal-pro-search-section">
        <div className="container-fluid">
          <div className="container-fluid container-section">
            <div className="custom--container tal--pro-search">
              <div className="breadcrumb--area-dark" data-aos="fade-down">
                <div className="breadcrumb--item-dark">
                  <a href="/client-home">Home</a>
                </div>
                <div className="breadcrumb--item-dark">
                  <p>Search Talent</p>
                </div>
              </div>

              {/* Search page section start */}
              {!searchResult ? (
                <div className="talent--profile-search-page-section">
                  <div className="cli-tal-pro-search-container">
                    <div className="row">
                      <div className="col-12 col-lg-12 col-xl-6 col-md-12">
                        <h4 className="cli-tal-pro-search-heading">
                          Search Talent
                        </h4>
                      </div>
                      <p className="tal-head-desc">
                        Welcome to the Talent Search page at Skillety! Dive into
                        a realm where exceptional talent meets opportunity. Our
                        algorithms are tuned in a different way that it gives
                        you accuracy by match percentage and Notice Period
                        duration. Explore, discover, and connect with the talent
                        that transforms visions into realities. Your journey to
                        extraordinary possibilities begins here!{" "}
                      </p>
                    </div>
                  </div>
                  <div className="row row-border-custom">
                    <div className="col-12 col-lg-8 col-xl-8 col-md-8 custom-right-border-col mt-4 mt-md-5">
                      <div className="cli-tal-pro-search-filter-area">
                        <div className="cli-tal-pro-search-filter-head-area">
                          <h6 className="cli-tal-pro-search-filter mb-0">
                            Filters
                          </h6>
                          <img
                            src="assets/img/talent-profile/filter.png"
                            className="cli-tal-pro-filter-img"
                            alt=""
                          />
                        </div>
                        <div className="cli-tal-pro-search-filter-container">
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-content">
                              <div class="cli-tal-pro-search-filter-title-area">
                                <div class="info-icon-area">
                                  <h6 class="cli-tal-pro-search-filter-title">
                                    Notice period / Availability to join&nbsp;
                                  </h6>
                                  {/* <button class="info-icon-button">
                                    <i class="ri-information-line info-icon"></i>
                                  </button>
                                  <div class="tooltip">
                                    This is the information about the notice
                                    period & availability to join.
                                  </div> */}
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

                                <div className="education-type-option">
                                  <input
                                    type="checkbox"
                                    className="education-type-input"
                                    id="notice_period_1"
                                    name="notice_period"
                                    // value="any"
                                    // onChange={(e) => setFilters({ ...filters, days: e.target.value })}
                                    checked={checkBoxfilters.includes("Any")}
                                    onChange={() => handleCheckboxChange("Any")}
                                  />
                                  <label
                                    for="notice_period_1"
                                    className="education-type-label"
                                  >
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

                                <div className="education-type-option">
                                  <input
                                    type="checkbox"
                                    className="education-type-input"
                                    id="notice_period_2"
                                    // name="notice_period"
                                    // value="0-7"
                                    // onChange={(e) => setFilters({ ...filters, days: e.target.value })}
                                    checked={checkBoxfilters.includes(
                                      "0 to 7 days"
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange("0 to 7 days")
                                    }
                                  />
                                  <label
                                    for="notice_period_2"
                                    className="education-type-label"
                                  >
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

                                <div className="education-type-option">
                                  <input
                                    type="checkbox"
                                    className="education-type-input"
                                    id="notice_period_3"
                                    // name="notice_period"
                                    // value="8-15"
                                    // onChange={(e) => setFilters({ ...filters, days: e.target.value })}
                                    checked={checkBoxfilters.includes(
                                      "8 to 15 days"
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange("8 to 15 days")
                                    }
                                  />
                                  <label
                                    for="notice_period_3"
                                    className="education-type-label"
                                  >
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

                                <div className="education-type-option">
                                  <input
                                    type="checkbox"
                                    className="education-type-input"
                                    id="notice_period_4"
                                    // name="notice_period"
                                    // value="16-30"
                                    // onChange={(e) => setFilters({ ...filters, days: e.target.value })}
                                    checked={checkBoxfilters.includes(
                                      "16 to 30 days"
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange("16 to 30 days")
                                    }
                                  />
                                  <label
                                    for="notice_period_4"
                                    className="education-type-label"
                                  >
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

                                <div className="education-type-option">
                                  <input
                                    type="checkbox"
                                    className="education-type-input"
                                    id="notice_period_5"
                                    // name="notice_period"
                                    // value="beyond-30"
                                    // onChange={(e) => setFilters({ ...filters, days: e.target.value })}
                                    checked={checkBoxfilters.includes(
                                      "More than 30 days"
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange("More than 30 days")
                                    }
                                  />
                                  <label
                                    for="notice_period_5"
                                    className="education-type-label"
                                  >
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

                                <div className="education-type-option">
                                  <input
                                    type="checkbox"
                                    className="education-type-input"
                                    id="notice_period_6"
                                    // name="notice_period"
                                    // value="noticePeriod"
                                    // onChange={(e) => setFilters({ ...filters, days: e.target.value })}
                                    checked={checkBoxfilters.includes(
                                      "Currently not serving notice period"
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "Currently not serving notice period"
                                      )
                                    }
                                  />
                                  <label
                                    for="notice_period_6"
                                    className="education-type-label"
                                  >
                                    Currently serving notice Period
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="cli-tal-pro-search-filter-content">
                              <div className="cli-tal-pro-search-filter-title-area">
                                <h6 className="cli-tal-pro-search-filter-title">
                                  Keywords
                                </h6>
                                {/* <div class="cl-toggle-switch">
                                                                <label class="cl-switch">
                                                                    <input type="checkbox" className="toggleSwitch" />
                                                                    <span></span>
                                                                </label>
                                                                <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
                                                            </div> */}
                              </div>
                              {/* {selectedResults.length > 0 && (
                                <div className="cli--tal-pro-badge-area mb-4">
                                  {selectedResults.map((selectResult) => (
                                    <span
                                      className="tal-cand-reg-form-badge"
                                      key={selectResult}
                                      onClick={() =>
                                        handleDeselect(selectResult)
                                      }
                                    >
                                      {selectResult}
                                    </span>
                                  ))}
                                </div>
                              )} */}
                              <div className="cli--tal-pro-filter-input-area">

                                <div className="container_input_section">
                                  <div className="container_search_icon_area">
                                    <i className="bi bi-search"></i>
                                  </div>
                                  <div className="container-input-area3">

                                    {selectedResults.length > 0 && (
                                      <>
                                        {selectedResults.map((selectResult) => (
                                          <span className="form__badge2"
                                            key={selectResult}
                                          ><span>{selectResult}</span>
                                            <i className='bi bi-x' onClick={() => handleDeselect(selectResult)}></i>
                                          </span>
                                        ))}
                                      </>
                                    )}

                                    <div className='position-relative container__input_section'>
                                      <div className="container__input_with_label">
                                        <input type="search" className='container__input2'
                                          name='searchKeywordInput'
                                          id='searchKeywordInput'
                                          value={filters.searchInput}
                                          onChange={handleSearch} />
                                        <label htmlFor="searchKeywordInput" className={`container__input_label2 small-text ${filters.searchInput ? 'd-none' : ''}`}>Enter keywords like skills, designation</label>
                                      </div>

                                      <div className="tal-pro-search-result-data-area">
                                        {filteredList.length > 0 &&
                                          filteredList.map((filterResult, index) => (
                                            <div
                                              className="tal-pro-search-result-data"
                                              key={index}
                                              onClick={() =>
                                                handleFilteredClick(filterResult)
                                              }
                                            >
                                              {filterResult}
                                            </div>
                                          ))}
                                      </div>

                                    </div>
                                  </div>
                                </div>


                                {/* <input
                                  type="search"
                                  className="cli--tal-pro-filter-input"
                                  placeholder="Enter keywords like skills, designation"
                                  value={filters.searchInput}
                                  onChange={handleSearch}
                                />
                                <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
                                <div className="tal-pro-search-result-data-area">
                                  {filteredList.length > 0 &&
                                    filteredList.map((filterResult, index) => (
                                      <div
                                        className="tal-pro-search-result-data"
                                        key={index}
                                        onClick={() =>
                                          handleFilteredClick(filterResult)
                                        }
                                      >
                                        {filterResult}
                                      </div>
                                    ))}
                                </div> */}

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
                                <h6 className="cli-tal-pro-search-filter-title">
                                  Experience (Years)
                                </h6>
                              </div>
                              <div className="cli-tal-pro-exp-input-area search-page">
                                <div className="cli-tal-pro-exp-input-container">
                                  <select
                                    name=""
                                    className="cli-tal-pro-exp-input text-center numeric-input select"
                                    id=""
                                    value={filters.minExperienceYr}
                                    onChange={(e) =>
                                      setFilters({
                                        ...filters,
                                        minExperienceYr: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="" selected>
                                      Minimum experience
                                    </option>
                                    <option value="0">0</option>
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
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                    <option value="32">32</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                    <option value="35">35</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                    <option value="45">45</option>
                                    <option value="46">46</option>
                                    <option value="47">47</option>
                                    <option value="48">48</option>
                                    <option value="49">49</option>
                                    <option value="50">50</option>
                                  </select>
                                </div>

                                <div className="cli-tal-pro-exp-input-container">
                                  <select
                                    name=""
                                    className="cli-tal-pro-exp-input text-center numeric-input select"
                                    id=""
                                    value={filters.maxExperienceYr}
                                    onChange={(e) =>
                                      setFilters({
                                        ...filters,
                                        maxExperienceYr: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="" selected>
                                      Maximum Experience
                                    </option>
                                    <option value="0">0</option>
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
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                    <option value="32">32</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                    <option value="35">35</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                    <option value="45">45</option>
                                    <option value="46">46</option>
                                    <option value="47">47</option>
                                    <option value="48">48</option>
                                    <option value="49">49</option>
                                    <option value="50">50</option>
                                  </select>
                                </div>

                                {/* <span className="cli-tal-pro-exp-input-text">
                                  years
                                </span> */}
                                {/* <div className="cli-tal-pro-exp-input-container">
                                  <select
                                    name=""
                                    className="cli-tal-pro-exp-input text-center numeric-input select"
                                    id=""
                                    value={filters.minExperienceMonth}
                                    onChange={(e) =>
                                      setFilters({
                                        ...filters,
                                        minExperienceMonth: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="" selected>
                                      Min experience
                                    </option>
                                    <option value="0">0</option>
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
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                  </select>
                                </div>
                                <span className="cli-tal-pro-exp-input-text">
                                  months
                                </span> */}
                              </div>

                              {/* <div className="cli-tal-pro-exp-input-area search-page mt-3">
                                <div className="cli-tal-pro-exp-input-container">
                                  <select
                                    name=""
                                    className="cli-tal-pro-exp-input text-center numeric-input select"
                                    id=""
                                    value={filters.maxExperienceYr}
                                    onChange={(e) =>
                                      setFilters({
                                        ...filters,
                                        maxExperienceYr: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="" selected>
                                      Max Experience
                                    </option>
                                    <option value="0">0</option>
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
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>
                                  </select>
                                </div>

                                <span className="cli-tal-pro-exp-input-text">
                                  years
                                </span>
                                <div className="cli-tal-pro-exp-input-container">
                                  <select
                                    name=""
                                    className="cli-tal-pro-exp-input text-center numeric-input select"
                                    id=""
                                    value={filters.maxExperienceMonth}
                                    onChange={(e) =>
                                      setFilters({
                                        ...filters,
                                        maxExperienceMonth: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="" selected>
                                      Max Experience
                                    </option>
                                    <option value="0">0</option>
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
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                  </select>
                                </div>
                                <span className="cli-tal-pro-exp-input-text">
                                  months
                                </span>
                              </div> */}
                            </div>
                            <div className="cli-tal-pro-search-filter-content">
                              <div className="cli-tal-pro-search-filter-title-area">
                                <h6 className="cli-tal-pro-search-filter-title">
                                  Current or Preferred location of talent
                                </h6>
                              </div>
                              {/* {selectedLocationResults.length > 0 && (
                                <div className="cli--tal-pro-badge-area mb-4">
                                  {selectedLocationResults.map(
                                    (selectResult) => (
                                      <span
                                        className="tal-cand-reg-form-badge"
                                        key={selectResult}
                                        onClick={() =>
                                          handleDeselectLocation(selectResult)
                                        }
                                      >
                                        {selectResult}
                                      </span>
                                    )
                                  )}
                                </div>
                              )} */}


                              <div className="cli-tal-pro-search-filter-input-area location">
                                <div className="container_input_section">
                                  {/* <div className="container_search_icon_area">
                                    <i className="bi bi-search"></i>
                                  </div> */}
                                  <div className="container-input-area3 no-icon">

                                    {selectedLocationResults.length > 0 && (
                                      <>
                                        {selectedLocationResults.map((selectResult) => (
                                          <span className="form__badge2"
                                            key={selectResult}
                                          ><span>{selectResult}</span>
                                            <i className='bi bi-x' onClick={() =>
                                              handleDeselectLocation(selectResult)
                                            }></i>
                                          </span>
                                        ))}
                                      </>
                                    )}

                                    <div className='position-relative container__input_section'>
                                      <div className="container__input_with_label">
                                        <input type="search" className='container__input2'
                                          name='searcgLocationInput'
                                          id='searcgLocationInput'
                                          value={filters.location}
                                          onChange={handleLocationSearch} />
                                        <label htmlFor="searcgLocationInput" className={`container__input_label2 small-text ${filters.location ? 'd-none' : ''}`}>Search location</label>
                                      </div>

                                      <div className="tal-pro-search-result-data-area">
                                        {filteredLocation.length > 0 &&
                                          filteredLocation.map((filterResult) => (
                                            <div
                                              className="tal-pro-search-result-data"
                                              key={filterResult._id}
                                              onClick={() =>
                                                handleFilteredLocationClick(
                                                  filterResult.location
                                                )
                                              }
                                            >
                                              {filterResult.location}
                                            </div>
                                          ))}
                                      </div>

                                    </div>
                                  </div>
                                </div>

                                {/* <input
                                  type="search"
                                  className="cli-tal-pro-search-filter-input"
                                  placeholder="Search location"
                                  value={filters.location}
                                  onChange={handleLocationSearch}
                                />
                                <div className="tal-pro-search-result-data-area">
                                  {filteredLocation.length > 0 &&
                                    filteredLocation.map((filterResult) => (
                                      <div
                                        className="tal-pro-search-result-data"
                                        key={filterResult._id}
                                        onClick={() =>
                                          handleFilteredLocationClick(
                                            filterResult.location
                                          )
                                        }
                                      >
                                        {filterResult.location}
                                      </div>
                                    ))}
                                </div> */}

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
                                <h6 className="cli-tal-pro-search-filter-title">
                                  Annual Salary
                                </h6>
                              </div>
                              <div className="cli-tal-pro-exp-input-area search-page">
                                <div className="cli--salary-inputs-area">
                                  <select
                                    name=""
                                    className="cli-tal-pro-select-input width-30"
                                    id=""
                                    value={filters.currencyType}
                                    onChange={(e) =>
                                      setFilters({
                                        ...filters,
                                        currencyType: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="" disabled>
                                      Select
                                    </option>
                                    <option value="₹" selected>
                                      ₹
                                    </option>
                                    <option value="$">$</option>
                                    <option value="€">€</option>
                                  </select>
                                  <input
                                    type="text"
                                    className="cli-tal-pro-exp-input  width-70"
                                    placeholder="Min salary"
                                    value={filters.minSalary}
                                    onChange={(e) =>
                                      setFilters({
                                        ...filters,
                                        minSalary: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                {/* <span className="cli-tal-pro-exp-input-text">
                                  to
                                </span> */}
                                <input
                                  type="text"
                                  className="cli-tal-pro-exp-input text-center  width-45 search-page"
                                  placeholder="Max salary"
                                  value={filters.maxSalary}
                                  onChange={(e) =>
                                    setFilters({
                                      ...filters,
                                      maxSalary: e.target.value,
                                    })
                                  }
                                />
                                {/* <span className="cli-tal-pro-exp-input-text">
                                  laks
                                </span> */}
                              </div>
                              {/* <div className="cli--mark-keyword-area">
                                <label className="cli--mark-keyword-check-input">
                                  <input type="checkbox" />
                                  <span className="cli--mark-keyword-checkmark"></span>
                                  Include candidate who did not mention their
                                  current salary
                                </label>
                              </div> */}
                            </div>
                          </div>

                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Employment details
                              </h6>
                              {/* <i class="bi bi-chevron-down"></i> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-search-filter-form-group">
                                  <div className="cli-tal-search-filter-form-label-area">
                                    <label
                                      htmlFor="company"
                                      className="cli-tal-search-filter-form-label"
                                    >
                                      Company
                                    </label>
                                  </div>
                                  <div className="cli-tal-pro-search-filter-input-area">
                                    <input
                                      type="text"
                                      name="company"
                                      className="cli-tal-pro-search-filter-input"
                                      placeholder="Add company name"
                                      value={filters.company}
                                      onChange={(e) =>
                                        setFilters({
                                          ...filters,
                                          company: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Educational details
                              </h6>
                              {/* <i class="bi bi-chevron-down"></i> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-search-filter-form-group">
                                  <div className="cli-tal-search-filter-form-label-area">
                                    <label
                                      htmlFor="department"
                                      className="cli-tal-search-filter-form-label"
                                    >
                                      Educational details
                                    </label>
                                  </div>

                                  {/* {selectedEducationResults.length > 0 && (
                                    <div className="cli--tal-pro-badge-area mb-4">
                                      {selectedEducationResults.map(
                                        (selectResult) => (
                                          <span
                                            className="tal-cand-reg-form-badge"
                                            key={selectResult}
                                            onClick={() =>
                                              handleDeselectEducation(
                                                selectResult
                                              )
                                            }
                                          >
                                            {selectResult}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  )} */}

                                  <div className="cli-tal-pro-search-filter-input-area">

                                    <div className="container_input_section">
                                      {/* <div className="container_search_icon_area">
                                    <i className="bi bi-search"></i>
                                  </div> */}
                                      <div className="container-input-area3 no-icon">

                                        {selectedEducationResults.length > 0 && (
                                          <>
                                            {selectedEducationResults.map(
                                              (selectResult) => (
                                                <span className="form__badge2" key={selectResult}><span>{selectResult}</span>
                                                  <i className='bi bi-x' onClick={() => handleDeselectEducation(selectResult)}></i>
                                                </span>
                                              ))}
                                          </>
                                        )}

                                        <div className='position-relative container__input_section'>
                                          <div className="container__input_with_label">
                                            <input type="search" className='container__input2'
                                              name='department'
                                              id='department'
                                              value={filters.education}
                                              onChange={handleEducationSearch} />
                                            <label htmlFor="department" className={`container__input_label2 small-text ${filters.education ? 'd-none' : ''}`}>Enter educational details</label>
                                          </div>

                                          <div className="tal-pro-search-result-data-area">
                                            {filteredEducation.length > 0 &&
                                              filteredEducation.map(
                                                (filterResult) => (
                                                  <div
                                                    className="tal-pro-search-result-data"
                                                    key={filterResult._id}
                                                    onClick={() =>
                                                      handleFilteredEducationClick(
                                                        filterResult.education
                                                      )
                                                    }
                                                  >
                                                    {filterResult.education}
                                                  </div>
                                                )
                                              )}
                                          </div>

                                        </div>
                                      </div>
                                    </div>

                                    {/* <input
                                      type="search"
                                      name="department"
                                      className="cli-tal-pro-search-filter-input"
                                      placeholder="Enter educational details"
                                      value={filters.education}
                                      onChange={handleEducationSearch}
                                    />
                                    <div className="tal-pro-search-result-data-area">
                                      {filteredEducation.length > 0 &&
                                        filteredEducation.map(
                                          (filterResult) => (
                                            <div
                                              className="tal-pro-search-result-data"
                                              key={filterResult._id}
                                              onClick={() =>
                                                handleFilteredEducationClick(
                                                  filterResult.education
                                                )
                                              }
                                            >
                                              {filterResult.education}
                                            </div>
                                          )
                                        )}
                                    </div> */}

                                  </div>
                                </div>

                                {/* <div className="cli-tal-search-filter-form-group">
                                  <div className="cli-tal-search-filter-form-label-area">
                                    <label
                                      htmlFor="company"
                                      className="cli-tal-search-filter-form-label"
                                    >
                                      Company
                                    </label>
                                  </div>
                                  <div className="cli-tal-pro-search-filter-input-area">
                                    <input
                                      type="text"
                                      name="company"
                                      className="cli-tal-pro-search-filter-input"
                                      placeholder="Add company name"
                                      value={filters.company}
                                      onChange={(e) =>
                                        setFilters({
                                          ...filters,
                                          company: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </div>

                          {/* Work Details */}
                          {/* <div className="cli-tal-pro-search-filter-content-section">
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
                                                    </div> */}

                          {/* Display Details */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Display Details
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-search-filter-content">
                                  <div className="cli-tal-pro-search-filter-title-area">
                                    <h6 className="cli-tal-pro-search-filter-title">
                                      Show
                                    </h6>
                                  </div>

                                  <div className="tal--search-options-area">
                                    <div className="tal--search-option-container">
                                      <input
                                        id="all_candidate"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="show"
                                        value="allCandidates"
                                        onChange={(e) =>
                                          setFilters({
                                            ...filters,
                                            candidateType: e.target.value,
                                          })
                                        }
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="all_candidate"
                                          className="tal--search-tile-label"
                                        >
                                          All candidates
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="new_reg"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="show"
                                        value="newRegistration"
                                        onChange={(e) =>
                                          setFilters({
                                            ...filters,
                                            candidateType: e.target.value,
                                          })
                                        }
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="new_reg"
                                          className="tal--search-tile-label"
                                        >
                                          New registrations
                                        </label>
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
                          {/* <div className="cli-tal-pro-search-filter-content-section">
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

                                                                                    <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div>

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

                                                                                    <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div>

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

                                                                                    <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div>

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

                                                                                    <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div>

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

                                                                                    <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div>

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

                                                                                    <div className='tal-pro-search-result-data-area'>
                                                                                        <div className='tal-pro-search-result-data'>
                                                                                            Result 1
                                                                                        </div>
                                                                                    </div>

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
                                                    </div> */}

                          {/* Diversity and Additional Details */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Diversity and Additional Details
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-search-filter-content mb-0">
                                  <div className="cli-tal-pro-search-filter-title-area">
                                    <h6 className="cli-tal-pro-search-filter-title">
                                      Gender
                                    </h6>
                                  </div>

                                  <div className="tal--search-options-area">
                                    <div className="tal--search-option-container">
                                      <input
                                        id="all_cand"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="gender"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="all_cand"
                                          className="tal--search-tile-label"
                                        >
                                          All candidates
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="male_cand"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onChange={(e) =>
                                          setFilters({
                                            ...filters,
                                            gender: e.target.value,
                                          })
                                        }
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="male_cand"
                                          className="tal--search-tile-label"
                                        >
                                          Male Candidates
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="female_cand"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onChange={(e) =>
                                          setFilters({
                                            ...filters,
                                            gender: e.target.value,
                                          })
                                        }
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="female_cand"
                                          className="tal--search-tile-label"
                                        >
                                          Female Candidates
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="other_cand"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="gender"
                                        value="other"
                                        onChange={(e) =>
                                          setFilters({
                                            ...filters,
                                            gender: e.target.value,
                                          })
                                        }
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="other_cand"
                                          className="tal--search-tile-label"
                                        >
                                          Other Candidates
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="cli-tal-pro-search-page-btn-area">
                            <div className="cli-tal-pro-search-page-days-selection-area">
                              <div className="days-active">Active In</div>
                              <div class="custom-select">
                                <div class="select-box">
                                  <span>Active In</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="toggle-icon"
                                    width="15"
                                    height="9"
                                    viewBox="0 0 15 9"
                                    fill="none"
                                  >
                                    <path
                                      d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                      stroke="#714F36"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                    />
                                  </svg>
                                </div>
                                <ul class="select-options">
                                  <li
                                    data-value={7}
                                    onClick={(e) =>
                                      setFilters({
                                        ...filters,
                                        activeIn:
                                          e.target.getAttribute("data-value"),
                                      })
                                    }
                                  >
                                    7 days
                                  </li>
                                  <li
                                    data-value={14}
                                    onClick={(e) =>
                                      setFilters({
                                        ...filters,
                                        activeIn:
                                          e.target.getAttribute("data-value"),
                                      })
                                    }
                                  >
                                    14 days
                                  </li>
                                  <li
                                    data-value={21}
                                    onClick={(e) =>
                                      setFilters({
                                        ...filters,
                                        activeIn:
                                          e.target.getAttribute("data-value"),
                                      })
                                    }
                                  >
                                    21 days
                                  </li>
                                  <li
                                    data-value={30}
                                    onClick={(e) =>
                                      setFilters({
                                        ...filters,
                                        activeIn:
                                          e.target.getAttribute("data-value"),
                                      })
                                    }
                                  >
                                    30 days
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <button
                              className="cli-tal-pro-search-page-btn"
                              onClick={handleSkillSearch}
                            >
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
                          <h4 className="cli-tal-pro-recent-search-head mb-0">
                            Recent searches{" "}
                          </h4>
                        </div>

                        <div className="cli-tal-pro-recent-search-container">
                          {recentSearches.map((search) => {
                            if (
                              search?.selectedResults?.length > 0 ||
                              search?.selectedLocationResults?.length > 0 ||
                              search?.selectedEducationResults?.length > 0 ||
                              search?.company
                            ) {
                              return (
                                <div
                                  className="cli-tal-pro-recent-search-area"
                                  key={search._id}
                                >
                                  <div className="cli-tal-pro-recent-search-btn-area">
                                    <button
                                      className="cli-tal-pro-recent-search-btn"
                                      onClick={() => handleFill(search._id)}
                                    >
                                      Fill this search
                                    </button>
                                    {/* <button className='cli-tal-pro-recent-search-btn'>Search profile</button> */}
                                  </div>
                                  <div className="cli-tal-pro-recent-search-tags">
                                    <span>
                                      {search?.selectedResults?.length > 0 &&
                                        search?.selectedResults?.join(", ") +
                                        " "}
                                      {search?.selectedLocationResults?.length >
                                        0 &&
                                        search?.selectedLocationResults?.join(
                                          ", "
                                        ) + " "}
                                      {search?.selectedEducationResults
                                        ?.length > 0 &&
                                        search?.selectedEducationResults?.join(
                                          ", "
                                        ) + " "}
                                      {search?.company && search?.company}....
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return null;
                            }
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
                </div>
              ) : (
                // test

                <div className="talent--profile-search-results-section">
                  <div className="cli-tal-pro-search-container">
                    <div className="row">
                      <div className="col-12 col-lg-12 col-xl-12 col-md-12">
                        <h4 className="cli-tal-pro-search-heading">
                          Search Result Page
                        </h4>
                      </div>
                    </div>
                  </div>
                  <button
                    className='reg--form-btn-sub candidate back mb-5'
                    data-aos="fade-left"
                    onClick={() => setSearchResult(false)}
                  >
                    <div class="reg--form-arrow-area candidate back">
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                        <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                      </svg>
                    </div>
                    <div className='reg--form-btn candidate back'>Back to Search</div>
                  </button>
                  <div className="row row-border-custom">
                    <div className="col-12 col-lg-4 col-xl-3 col-md-4 custom-right-border-col ps-lg-0 ps-md-1 col-width-lg-30">
                      <div className="cli-tal-pro-search-filter-area">
                        <div className="cli-tal-pro-search-filter-head-area search-results">
                          <h6 className="cli-tal-pro-search-filter mb-0">
                            Filters
                          </h6>
                          <img
                            src="assets/img/talent-profile/filter.png"
                            className="cli-tal-pro-filter-img"
                            alt=""
                          />
                        </div>
                        <div className="cli-tal-pro-search-filter-container mt-1">
                          {/* Notice period / Availability  to join */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <div class="info-icon-area">
                                <h6 className="cli--emploment-detail-head">
                                  Notice period / Availability to join
                                  {/* <button class="info-icon-button">
                                    <i class="ri-information-line info-icon"></i>
                                  </button>
                                  <div class="tooltip">
                                    This is the information about the notice
                                    period & availability to join.
                                  </div> */}
                                </h6>
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="tal--search-options-area">
                                  <div className="tal--search-option-container">
                                    <input
                                      id="notice_period_1"
                                      className="tal--search-radio"
                                      type="radio"
                                      name="notice_period"
                                    />
                                    <div className="tal--search-tile">
                                      <label
                                        for="notice_period_1"
                                        className="tal--search-tile-label pe-2 ps-2"
                                      >
                                        Any
                                      </label>
                                    </div>
                                  </div>

                                  <div className="tal--search-option-container">
                                    <input
                                      id="notice_period_2"
                                      className="tal--search-radio"
                                      type="radio"
                                      name="notice_period"
                                    />
                                    <div className="tal--search-tile">
                                      <label
                                        for="notice_period_2"
                                        className="tal--search-tile-label"
                                      >
                                        0-07 days
                                      </label>
                                      <i class="bi bi-plus"></i>
                                    </div>
                                  </div>

                                  <div className="tal--search-option-container">
                                    <input
                                      id="notice_period_3"
                                      className="tal--search-radio"
                                      type="radio"
                                      name="notice_period"
                                    />
                                    <div className="tal--search-tile">
                                      <label
                                        for="notice_period_3"
                                        className="tal--search-tile-label"
                                      >
                                        08 to 15 days
                                      </label>
                                      <i class="bi bi-plus"></i>
                                    </div>
                                  </div>
                                  <div className="tal--search-option-container">
                                    <input
                                      id="notice_period_4"
                                      className="tal--search-radio"
                                      type="radio"
                                      name="notice_period"
                                    />
                                    <div className="tal--search-tile">
                                      <label
                                        for="notice_period_4"
                                        className="tal--search-tile-label"
                                      >
                                        16 to 30 days
                                      </label>
                                      <i class="bi bi-plus"></i>
                                    </div>
                                  </div>
                                  <div className="tal--search-option-container">
                                    <input
                                      id="notice_period_5"
                                      className="tal--search-radio"
                                      type="radio"
                                      name="notice_period"
                                    />
                                    <div className="tal--search-tile">
                                      <label
                                        for="notice_period_5"
                                        className="tal--search-tile-label"
                                      >
                                        beyond 30 days
                                      </label>
                                      <i class="bi bi-plus"></i>
                                    </div>
                                  </div>
                                  <div className="tal--search-option-container">
                                    <input
                                      id="notice_period_6"
                                      className="tal--search-radio"
                                      type="radio"
                                      name="notice_period"
                                    />
                                    <div className="tal--search-tile">
                                      <label
                                        for="notice_period_6"
                                        className="tal--search-tile-label"
                                      >
                                        Currently serving notice Period
                                      </label>
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
                              <h6 className="cli--emploment-detail-head">
                                Keywords
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                {/* <div class="cl-toggle-switch">
                                                                <label class="cl-switch">
                                                                    <input type="checkbox" className="toggleSwitch" />
                                                                    <span></span>
                                                                </label>
                                                                <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
                                                            </div> */}

                                <div className="cli--tal-pro-filter-input-area">
                                  <input
                                    type="text"
                                    className="cli--tal-pro-filter-input"
                                    placeholder="Enter keywords like skills, designation"
                                  />
                                  <i className="bi bi-search cli--tal-pro-filter-search-icon"></i>
                                </div>

                                <div className="cli--mark-keyword-area">
                                  <label className="cli--mark-keyword-check-input">
                                    <input type="checkbox" />
                                    <span className="cli--mark-keyword-checkmark"></span>
                                    Mark all keywords as mandatory
                                  </label>
                                </div>
                                {/* <div
                                  id="container1"
                                  className="multi-input-container"
                                >
                                  <div className="cli--tal-search-add-input-area mt-3">
                                    <button className="cli--tal-search-keyword-add-input-button">
                                      <i class="bi bi-plus add-input-icon"></i>
                                      Add Exclude Keywords
                                    </button>
                                  </div>
                                </div>
                                <div
                                  id="container2"
                                  className="multi-input-container"
                                >
                                  <div className="cli--tal-search-add-input-area">
                                    <button className="cli--tal-search-skill-add-input-button">
                                      <i class="bi bi-plus add-input-icon"></i>
                                      Add IT Skills
                                    </button>
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </div>

                          {/* Experience */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Experience
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-exp-input-area search-results">
                                  <input
                                    type="number"
                                    className="cli-tal-pro-exp-input text-center numeric-input"
                                    placeholder="Min experience"
                                  />
                                  <span className="cli-tal-pro-exp-input-text">
                                    to
                                  </span>
                                  <input
                                    type="number"
                                    className="cli-tal-pro-exp-input text-center numeric-input"
                                    placeholder="Max Experience"
                                  />
                                  <span className="cli-tal-pro-exp-input-text">
                                    years
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Location
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-search-filter-input-area">
                                  <input
                                    type="text"
                                    className="cli-tal-pro-search-filter-input"
                                    placeholder="Add location"
                                  />
                                </div>
                                {/* <div className="cli--mark-keyword-area search-results">
                                  <label className="cli--mark-keyword-check-input">
                                    <input type="checkbox" />
                                    <span className="cli--mark-keyword-checkmark"></span>
                                    Include candidate who prefer to relocate to
                                    above location
                                  </label>
                                  <div className="cli-change--location-area">
                                    Change preferred location
                                  </div>
                                  <label className="cli--mark-keyword-check-input">
                                    <input type="checkbox" />
                                    <span className="cli--mark-keyword-checkmark"></span>
                                    Exclude candidate who have mentioned
                                    Anywhere in ...
                                  </label>
                                </div> */}
                              </div>
                            </div>
                          </div>

                          {/* Salary (INR- Lacs ) */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Salary (INR- Lacs )
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-exp-input-area search-results">
                                  <div className="cli--salary-inputs-area">
                                    <select
                                      name=""
                                      className="cli-tal-pro-select-input width-30"
                                      id=""
                                    >
                                      <option value="" disabled>
                                        Select
                                      </option>
                                      <option value="1" selected>
                                        INR
                                      </option>
                                      <option value="2">LKR</option>
                                      <option value="3">USD</option>
                                      <option value="4">GBP</option>
                                    </select>
                                    <input
                                      type="number"
                                      className="cli-tal-pro-exp-input numeric-input width-70"
                                      placeholder="Min salary"
                                    />
                                  </div>
                                  <span className="cli-tal-pro-exp-input-text">
                                    to
                                  </span>
                                  <input
                                    type="number"
                                    className="cli-tal-pro-exp-input text-center numeric-input width-45 search-results"
                                    placeholder="Max salary"
                                  />
                                  {/* <span className="cli-tal-pro-exp-input-text">
                                    lacs
                                  </span> */}
                                </div>
                                {/* <div className="cli--mark-keyword-area">
                                  <label className="cli--mark-keyword-check-input">
                                    <input type="checkbox" />
                                    <span className="cli--mark-keyword-checkmark"></span>
                                    Include candidate who did not mention their
                                    current salary
                                  </label>
                                </div> */}
                              </div>
                            </div>
                          </div>

                          {/* Department and Roles */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Department and Roles
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-search-filter-input-area">
                                  <input
                                    type="text"
                                    name="department_role"
                                    className="cli-tal-pro-search-filter-input"
                                    placeholder="Add Department/Role"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Industry */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Industry
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-search-filter-input-area">
                                  <input
                                    type="text"
                                    name="industry"
                                    className="cli-tal-pro-search-filter-input"
                                    placeholder="Add Industry"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Current Company */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Current Company
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                {/* <div class="cl-toggle-switch">
                                                                <label class="cl-switch">
                                                                    <input type="checkbox" className="toggleSwitch" />
                                                                    <span></span>
                                                                </label>
                                                                <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
                                                            </div> */}
                                <div className="cli-tal-pro-search-filter-input-area">
                                  <input
                                    type="text"
                                    name="company"
                                    className="cli-tal-pro-search-filter-input"
                                    placeholder="Add company name"
                                  />
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
                              <h6 className="cli--emploment-detail-head">
                                Current Designation
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                {/* <div class="cl-toggle-switch">
                                                                <label class="cl-switch">
                                                                    <input type="checkbox" className="toggleSwitch" />
                                                                    <span></span>
                                                                </label>
                                                                <h6 className='cl-toggle--switch-label'>Boolean Off</h6>
                                                            </div> */}
                                <div className="cli-tal-pro-search-filter-input-area">
                                  <input
                                    type="text"
                                    name="designation"
                                    className="cli-tal-pro-search-filter-input"
                                    placeholder="Add designation"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Work Details */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Work Details
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-search-filter-form-group search-results">
                                  <div className="cli-tal-search-filter-form-label-area">
                                    <label
                                      htmlFor="candidate_seek"
                                      className="cli-tal-search-filter-form-label"
                                    >
                                      Show candidate seeking
                                    </label>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-xl-6 col-lg-6 col-md-12 mb-md-4 mb-lg-0 mb-xl-0">
                                      <div className="cli-tal-pro-search-filter-input-area">
                                        <select
                                          name="job_type"
                                          id="candidate_seek"
                                          className="cli-tal-pro-search-filter-input cand--seek-select"
                                        >
                                          <option value="" disabled selected>
                                            Job type
                                          </option>
                                          <option value="1">Job type 1</option>
                                          <option value="2">Job type 2</option>
                                          <option value="3">Job type 3</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-12 col-xl-6 col-lg-6 col-md-12">
                                      <div className="cli-tal-pro-search-filter-input-area">
                                        <select
                                          name="employee_type"
                                          id="candidate_seek"
                                          className="cli-tal-pro-search-filter-input cand--seek-select"
                                        >
                                          <option value="" disabled selected>
                                            Employment type
                                          </option>
                                          <option value="1">
                                            Employment type 1
                                          </option>
                                          <option value="2">
                                            Employment type 2
                                          </option>
                                          <option value="3">
                                            Employment type 3
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="cli-tal-search-filter-form-group search-results">
                                  <div className="cli-tal-search-filter-form-label-area">
                                    <label
                                      htmlFor="work_permit"
                                      className="cli-tal-search-filter-form-label"
                                    >
                                      Work permit for
                                    </label>
                                  </div>
                                  <div className="cli-tal-pro-search-filter-input-area">
                                    <input
                                      type="text"
                                      className="cli-tal-pro-search-filter-input"
                                      placeholder="Choose Category"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Display Details */}
                          <div className="cli-tal-pro-search-filter-content-section">
                            <div className="cli-tal-pro-search-filter-toggle-area">
                              <h6 className="cli--emploment-detail-head">
                                Display Details
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-search-filter-content">
                                  <div className="cli-tal-pro-search-filter-title-area">
                                    <h6 className="cli-tal-pro-search-filter-title">
                                      Show
                                    </h6>
                                  </div>

                                  <div className="tal--search-options-area">
                                    <div className="tal--search-option-container">
                                      <input
                                        id="all_candidate"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="show"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="all_candidate"
                                          className="tal--search-tile-label"
                                        >
                                          All candidates
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="new_reg"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="show"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="new_reg"
                                          className="tal--search-tile-label"
                                        >
                                          New registrations
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="recent_activity"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="show"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="recent_activity"
                                          className="tal--search-tile-label"
                                        >
                                          Active Recently
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="cli-tal-pro-search-filter-content mb-0">
                                  <div className="cli-tal-pro-search-filter-title-area">
                                    <h6 className="cli-tal-pro-search-filter-title">
                                      Show only candidates with{" "}
                                    </h6>
                                  </div>

                                  <div className="tal--search-options-area">
                                    <div className="tal--search-option-container">
                                      <input
                                        id="ver_mobile"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="show_cand"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="ver_mobile"
                                          className="tal--search-tile-label"
                                        >
                                          Verified mobile number
                                        </label>
                                        <i class="bi bi-plus"></i>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="ver_email"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="show_cand"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="ver_email"
                                          className="tal--search-tile-label"
                                        >
                                          Verified email ID{" "}
                                        </label>
                                        <i class="bi bi-plus"></i>
                                      </div>
                                    </div>
                                    <div className="tal--search-option-container">
                                      <input
                                        id="att_resume"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="show_cand"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="att_resume"
                                          className="tal--search-tile-label"
                                        >
                                          Attached resume
                                        </label>
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
                              <h6 className="cli--emploment-detail-head">
                                Education Details
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-search-filter-content">
                                  <div className="cli-tal-pro-search-filter-title-area">
                                    <h6 className="cli-tal-pro-search-filter-title">
                                      UG Qualification
                                    </h6>
                                  </div>

                                  <div className="tal--search-options-area">
                                    <div className="tal--search-option-container">
                                      <input
                                        id="any_ug"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="ug_qualification"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="any_ug"
                                          className="tal--search-tile-label"
                                        >
                                          Any UG Qualification
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="spc_ug"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="ug_qualification"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="spc_ug"
                                          className="tal--search-tile-label"
                                        >
                                          Specific UG Qualification
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="no_ug"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="ug_qualification"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="no_ug"
                                          className="tal--search-tile-label"
                                        >
                                          No UG Qualification
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="cli-tal-pro-search-filter-content mb-0">
                                  <div className="cli-tal-pro-search-filter-title-area">
                                    <h6 className="cli-tal-pro-search-filter-title">
                                      PG Qualification
                                    </h6>
                                  </div>

                                  <div className="tal--search-options-area">
                                    <div className="tal--search-option-container">
                                      <input
                                        id="any_pg"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="pg_qualification"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="any_pg"
                                          className="tal--search-tile-label"
                                        >
                                          Any PG Qualification
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="spc_pg"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="pg_qualification"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="spc_pg"
                                          className="tal--search-tile-label"
                                        >
                                          Specific PG Qualification
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="no_pg"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="pg_qualification"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="no_pg"
                                          className="tal--search-tile-label"
                                        >
                                          No PG Qualification
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    id="container3"
                                    className="multi-input-container"
                                  >
                                    <div className="cli--tal-search-add-input-area">
                                      <button className="cli--tal-search-qualification-add-input-button">
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
                              <h6 className="cli--emploment-detail-head">
                                Diversity and Additional Details
                              </h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                              >
                                <path
                                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                                  stroke="#714F36"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div className="cli-tal-pro-search-filter-expand-area">
                              <div className="expand-area-padding">
                                <div className="cli-tal-pro-search-filter-content mb-0">
                                  <div className="cli-tal-pro-search-filter-title-area">
                                    <h6 className="cli-tal-pro-search-filter-title">
                                      Gender
                                    </h6>
                                  </div>

                                  <div className="tal--search-options-area">
                                    <div className="tal--search-option-container">
                                      <input
                                        id="all_cand"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="gender"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="all_cand"
                                          className="tal--search-tile-label"
                                        >
                                          All candidates
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="male_cand"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="gender"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="male_cand"
                                          className="tal--search-tile-label"
                                        >
                                          Male Candidates
                                        </label>
                                      </div>
                                    </div>

                                    <div className="tal--search-option-container">
                                      <input
                                        id="female_cand"
                                        className="tal--search-radio"
                                        type="radio"
                                        name="gender"
                                      />
                                      <div className="tal--search-tile">
                                        <label
                                          for="female_cand"
                                          className="tal--search-tile-label"
                                        >
                                          Female candidates
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="clear--all_button-area">
                            <button className="tal--search-submit-btn">
                              Submit
                            </button>
                            <button className="clear--all_button" onClick={() => {window.location.reload()}}>
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
                        {filteredSearchResultsMsg ? (
                          <div className="no-data-created-area">
                            <div className="no-data-created">
                              <img
                                src="../assets/img/no-data/no-data-img.png"
                                className="no-data-img"
                                alt=""
                              />
                              <div className="no-data-text">
                                {filteredSearchResultsMsg}
                              </div>
                            </div>
                          </div>
                        ) : filteredSearchResults.length > 0 ? (
                          filteredSearchResults
                            .slice(x[0], x[1])
                            .map((candidate) => {
                              const viewedCandidateForThisCandidate =
                                loginClientDetail.companyId &&
                                viewedCandidate.find(
                                  (cand) => cand.candidateId === candidate.id
                                );
                              const matchingImg = candidateImg
                                ? candidateImg.find(
                                  (img) => img.id === candidate.id
                                )
                                : null;
                              const imgSrc = matchingImg
                                ? matchingImg.image.startsWith("https")
                                  ? matchingImg.image
                                  : `data:image/jpeg;base64,${matchingImg.image}`
                                : "assets/img/talents-images/avatar.jpg";

                              const calculateMatchPercentage = (
                                skills1,
                                skills2
                              ) => {
                                const matchingSkills = skills2.filter((skill) =>
                                  skills1.includes(skill)
                                );
                                return (
                                  (matchingSkills.length / skills1.length) * 100
                                );
                              };
                              const percentage = Math.round(
                                calculateMatchPercentage(selectedResults, [
                                  ...candidate.skills,
                                  ...candidate.designation,
                                ])
                              );
                              return (
                                <article
                                  className="talent--profile-card search"
                                  data-aos="fade-left"
                                  key={candidate.id}
                                >
                                  <div className="tal--pro-card-left-area search">
                                    <div className="card-split-line"></div>
                                    <div className="tal--pro-card-name-area">
                                      <label className="tal--pro-card-name-check-container">
                                        <input
                                          type="checkbox"
                                          class="tal--checkbox"
                                          checked={
                                            viewedCandidateForThisCandidate
                                              ? true
                                              : false
                                          }
                                          onChange={(e) => e.preventDefault()}
                                        />
                                        <div className="tal--pro-card-name-checkmark"></div>
                                      </label>
                                      <h6 className="tal--pro-card-name">
                                        {candidate.firstName +
                                          " " +
                                          candidate.lastName}
                                      </h6>
                                    </div>
                                    <div className="tal--pro-card-tags search">
                                      <h6 className="tal--pro-card-exp">
                                        Experience :{" "}
                                        {candidate.year +
                                          " years " +
                                          candidate.month +
                                          " months"}
                                      </h6>
                                      <h6 className="tal--pro-card-exp">
                                        salary :{" "}
                                        {candidate.minSalary +
                                          "-" +
                                          candidate.maxSalary}
                                      </h6>
                                      {/* <h6 className='tal--pro-card-exp'>
                                                                                9.5 LPA
                                                                            </h6> */}
                                      <h6 className="tal--pro-card-location">
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
                                          <h6 className="tal--pro-card-desc-title">
                                            Previous&nbsp;:
                                          </h6>
                                        </div>
                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                          <p className="tal--pro-card-desc text-capitalized">
                                            {candidate.designation[0] +
                                              " " +
                                              "at" +
                                              " " +
                                              candidate.companyName}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row tal--pro-card-desc-row">
                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                          <h6 className="tal--pro-card-desc-title">
                                            Education&nbsp;:
                                          </h6>
                                        </div>
                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                          <p className="tal--pro-card-desc text-capitalized">
                                            {candidate?.education?.join(", ")}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row tal--pro-card-desc-row">
                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                          <h6 className="tal--pro-card-desc-title">
                                            College&nbsp;:
                                          </h6>
                                        </div>
                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                          <p className="tal--pro-card-desc text-capitalized">
                                            {candidate.college}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row tal--pro-card-desc-row">
                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                          <h6 className="tal--pro-card-desc-title">
                                            KeySkill&nbsp;:
                                          </h6>
                                        </div>
                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                          <p className="tal--pro-card-desc text-capitalized">
                                            {candidate?.skills?.join(", ")}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row tal--pro-card-desc-row">
                                        <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                          <h6 className="tal--pro-card-desc-title">
                                            Profile headline&nbsp;:
                                          </h6>
                                        </div>
                                        <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                          <p className="tal--pro-card-desc text-capitalized">
                                            {candidate.profileHeadline}
                                          </p>
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
                                        <div className="tal--pro-card-profile-img-role-area search">
                                          <img
                                            src={imgSrc}
                                            className="tal--pro-card-profile-img"
                                            alt=""
                                          />
                                          <p className="tal--pro-card-role-name">
                                            {candidate.designation[0]}
                                          </p>
                                        </div>
                                        <div className="tal--pro-card-contact-btn-area search">
                                          <button
                                            className="tal--pro-card-contact-btn search"
                                            onClick={() =>
                                              viewCandidateDetail(
                                                candidate.id,
                                                percentage
                                              )
                                            }
                                          // onMouseEnter={handleMouseEnter}
                                          // onMouseLeave={handleMouseLeave}
                                          >
                                            View Profile
                                          </button>
                                          {/* <span className="profile-credits-title">
                                            &#129031; 01 Credit
                                          </span> */}
                                          {/* <button className='tal--pro-card-contact-btn search'>
                                                                                        <img src="assets/img/talent-profile/call.png" alt="" />
                                                                                        Call Candidate
                                                                                    </button> */}
                                        </div>
                                      </div>
                                      <div className="tal--pro-card-ability-number-area search-result">
                                        {selectedResults.length > 0 && (
                                          <div className="tal--pro-card-ability-number-left search-result">
                                            <h6 className="tal--pro-card-ability search">
                                              Keywords matched
                                            </h6>
                                            <h2 className="tal--pro-card-percentage search">
                                              {Math.round(percentage)}%
                                            </h2>
                                          </div>
                                        )}
                                        <div className="tal--pro-card-ability-number-right search-result">
                                          <h6 className="tal--pro-card-can-join">
                                            Can join in :{" "}
                                          </h6>
                                          <h2 className="tal--pro-card-join-days text-capitalized">
                                            {candidate.days}
                                            <span></span>
                                          </h2>
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
                              );
                            })
                        ) : null}

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

                        <div
                          className="tal--pro-paginate-btn-area"
                          data-aos="fade-up"
                        >
                          <h6 className="tal--pro-total-result-text">
                            No of applicants :{" "}
                            <span>
                              {filteredSearchResultsMsg
                                ? "0"
                                : filteredSearchResults.length}
                            </span>
                          </h6>
                          <div className="tal--pro-slider-btn-sub">
                            {x[0] > 0 && (
                              <button
                                className="tal--pro-slider-btn"
                                onClick={() => setX([x[0] - 25, x[1] - 25])}
                              >
                                <svg
                                  className="arrow-left"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 27 27"
                                  fill="none"
                                >
                                  <path
                                    d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                    stroke="#5C3B2E"
                                    stroke-width="2"
                                  />
                                  <path
                                    d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                    stroke="#5C3B2E"
                                    stroke-width="2"
                                  />
                                  <path
                                    d="M1 26L25.1667 1"
                                    stroke="#5C3B2E"
                                    stroke-width="2"
                                  />
                                </svg>
                              </button>
                            )}
                            {(filteredSearchResultsMsg
                              ? !filteredSearchResultsMsg
                              : filteredSearchResults.slice(x[0], x[1])
                                .length === 25 &&
                              filteredSearchResults.length > x[1]) && (
                                <button
                                  className="tal--pro-slider-btn"
                                  onClick={() => setX([x[0] + 25, x[1] + 25])}
                                >
                                  <svg
                                    className="arrow-right"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 27 27"
                                    fill="none"
                                  >
                                    <path
                                      d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                      stroke="#5C3B2E"
                                      stroke-width="2"
                                    />
                                    <path
                                      d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                      stroke="#5C3B2E"
                                      stroke-width="2"
                                    />
                                    <path
                                      d="M1 26L25.1667 1"
                                      stroke="#5C3B2E"
                                      stroke-width="2"
                                    />
                                  </svg>
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Search results page section end */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default TalentsProfileSearch;
