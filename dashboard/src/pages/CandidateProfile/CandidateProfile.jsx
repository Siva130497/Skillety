import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import './CandidateProfile.css';
import './CandidateProfile-responsive.css';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Footer from '../../components/Footer';
import AuthContext from '../../context/AuthContext';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CandidateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const candidateToken = JSON.parse(localStorage.getItem('candidateToken'));
    const [candToken, setCandToken] = useState("");
    const { getProtectedData } = useContext(AuthContext);
    const [loginCandidate, setLoginCandidate] = useState();
    const [candidateImg, setCandidateImg] = useState();
    const [candidateImgUrl, setCandidateImgUrl] = useState("");
    const [candidateResumeUrl, setCandidateResumeUrl] = useState("");
    const [resume, setResume] = useState();

    const [skillArray, setSkillArray] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [searchSkillInput, setSearchSkillInput] = useState("");
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [skillError, setSkillError] = useState("");
    const [isCheckedSkill, setIsCheckedSkill] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [otherSkill, setOtherSkill] = useState([]);
    const [totalMonths, setTotalMonths] = useState();
    const [maxSkillNum, setMaxSkillNum] = useState();
    const [minSkillNum, setMinSkillNum] = useState();
    const [skillAlert, setSkillAlert] = useState("");

    const [educationArray, setEducationArray] = useState([]);
    const [searchEducationInput, setSearchEducationInput] = useState("");
    const [filteredEducation, setFilteredEducation] = useState([]);
    const [selectedEducation, setSelectedEducation] = useState([]);

    const [locationArray, setLocationArray] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [searchLocationInput, setSearchLocationInput] = useState("");

    const [filteredPreferedLocations, setFilteredPreferedLocations] = useState([]);
    const [selectedPreferedLocations, setSelectedPreferedLocations] = useState([]);
    const [searchPreferedLocationInput, setSearchPreferedLocationInput] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        profileHeadline: "",
        days: "",
        year: "",
        month: "",
        minSalary: "",
        maxSalary: "",
        currencyType: "₹",
    })

    const [loading, setLoading] = useState(true);

    const [contentloading, setContentLoading] = useState(true);

    const handleViewCV = (fileUrl) => {
        setCandidateResumeUrl(fileUrl);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        // setCandidateResumeUrl(null);
        setIsModalOpen(false);
      };

    // const [pageNotFound, setPageNotFound] = useState(false);

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

        setTotalMonths(parseInt(userInfo.year * 12) + parseInt(userInfo.month))
        console.log(totalMonths)

    }, [userInfo])

    useEffect(() => {
        if (totalMonths) {
            setSkillError("")
            console.log(totalMonths)
            setMaxSkillNum(totalMonths <= 24 ? 6 : totalMonths <= 48 ? 8 : totalMonths <= 96 ? 10 : 12)
            setMinSkillNum(totalMonths <= 24 ? 4 : totalMonths <= 48 ? 6 : totalMonths <= 96 ? 8 : 10)

            if (totalMonths <= 24) {
                setSkillAlert("You can select min of 4 & max of 6 skills")
            } else if (totalMonths <= 48) {
                setSkillAlert("You can select min of 6 & max of 8 skills")
            } else if (totalMonths <= 96) {
                setSkillAlert("You can select min of 8 & max of 10 skills")
            } else {
                setSkillAlert("You can select min of 10 & max of 12 skills")
            }
        }
    }, [totalMonths])

    const getAllSkills = async () => {
        try {
            const res = await axios.get("https://skillety-n6r1.onrender.com/skills");
            setSkillArray(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getAllEducation = async () => {
        try {
            const res = await axios.get("https://skillety-n6r1.onrender.com/educations", {
                headers: {
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

    const getAllLocations = async () => {
        try {
            const res = await axios.get("https://skillety-n6r1.onrender.com/locations", {
                headers: {
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

    //post new skill
    const postOtherSkills = async (skills) => {
        try {
            const res = await axios.post("https://skillety-n6r1.onrender.com/skills", skills, {
                headers: {

                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllSkills();
        getAllEducation();
        getAllLocations();
    }, [])

    useEffect(() => {
        setSelectedSkills(loginCandidate?.skills)
        setSelectedEducation(loginCandidate?.education)
        setSelectedLocations([loginCandidate?.location])
        setSelectedPreferedLocations(loginCandidate?.preferedlocations)
        setUserInfo({
            ...userInfo,
            firstName: loginCandidate?.firstName,
            lastName: loginCandidate?.lastName,
            profileHeadline: loginCandidate?.profileHeadline,
            month: loginCandidate?.month,
            year: loginCandidate?.year,
            days: loginCandidate?.days,
            currencyType: loginCandidate?.currencyType,
            minSalary: loginCandidate?.minSalary,
            maxSalary: loginCandidate?.maxSalary
        })

    }, [loginCandidate])

    useEffect(() => {
        // $(".profile--name-edit-btn").click(function () {
        //     var $nameEditSection = $(this).closest(".profile--name-edit-section");
        //     var $changeNameInput = $nameEditSection.find(".profile-name-edit-input-area");

        //     if ($changeNameInput.is(":visible")) {
        //         // Collapse the text area
        //         $changeNameInput.slideUp();
        //         $(this).removeClass("expanded");
        //         $(this).find("i").removeClass("bi-x").addClass("bi-pencil");
        //     } else {
        //         // Expand the text area
        //         $changeNameInput.slideDown();
        //         $(this).addClass("expanded");
        //         $(this).find("i").removeClass("bi-pencil").addClass("bi-x");
        //     }
        // });

        // $(".prof-more-det-edit-btn").on("click", function () {
        //     var $changeInputSection = $(this).closest(".prof-more-det-area");
        //     var $changeInputArea = $changeInputSection.find(".prof-more-det-input-area");

        //     // var type = $(this).data("type");
        //     if ($changeInputArea.is(":visible")) {
        //         $changeInputArea.slideUp();
        //         $(this).removeClass("expanded");
        //         $(this).find("i").removeClass("bi-x").addClass("bi-pencil");
        //         // $(this).text("Change " + type);
        //     } else {
        //         $changeInputArea.slideDown();
        //         $(this).addClass("expanded");
        //         $(this).find("i").removeClass("bi-pencil").addClass("bi-x");
        //         // $(this).text("Cancel");
        //     }
        // });

        // $(".profile-content-edit-btn").on("click", function () {
        //     var $changeInputSection = $(this).closest(".profile-content-card");
        //     var $changeInputArea = $changeInputSection.find(".profile-content-input-area");

        //     var type = $(this).data("type");
        //     if ($changeInputArea.is(":visible")) {
        //         $changeInputArea.slideUp();
        //         $(this).removeClass("expanded");
        //         $(this).text("Change " + type);
        //     } else {
        //         $changeInputArea.slideDown();
        //         $(this).addClass("expanded");
        //         $(this).text("Cancel");
        //     }
        // });


        function handleEditToggle() {
            var $changeInputSection = $(this).closest(".profile-content-card");
            var $changeInputArea = $changeInputSection.find(".profile-content-skill-input-area");

            var type = $(this).data("type");
            if ($changeInputArea.is(":visible")) {
                $changeInputArea.slideUp();
                $(this).removeClass("expanded");
                $(this).text("Change " + type);
            } else {
                $changeInputArea.slideDown();
                $(this).addClass("expanded");
                $(this).text("Cancel");
            }
        }

        $(".profile-content-more-inputs-edit-btn").on("click", function () {
            var $changeInputSection = $(this).closest(".more-inputs-area");
            var $changeInputArea = $changeInputSection.find(".profile-content-more-input-area");

            var type = $(this).data("type");
            if ($changeInputArea.is(":visible")) {
                $changeInputArea.slideUp();
                $(this).removeClass("expanded");
                $(this).text("Add " + type);
            } else {
                $changeInputArea.slideDown();
                $(this).addClass("expanded");
                $(this).text("Cancel");
            }
        });

        $(".personal-det-add-btn").on("click", function () {
            var $changeInputSection = $(this).closest(".personal-detail-section");
            var $changeInputArea = $changeInputSection.find(".personal-det-add-input-area");

            var type = $(this).data("type");
            if ($changeInputArea.is(":visible")) {
                $changeInputArea.slideUp();
                $(this).removeClass("expanded");
                $(this).text("Add " + type);
            } else {
                $changeInputArea.slideDown();
                $(this).addClass("expanded");
                $(this).text("Cancel");
            }
        });

        // Function to clear the file input and reset the button and text
        function clearFileInput() {
            $('#file_upload').val('');
            $('#file-chosen').text('No file chosen');
            $('.file-upload-btn').text('Upload resume');
            $('.file-upload-btn').css('background-color', '#FFF3D0');
            $('.file-upload-btn').css('color', '#714F36');
            $('#clear-file').hide();
            $('#save-file').hide();
        }

        $('#file_upload').on('change', function () {
            $('#file-chosen').text(this.files[0].name);

            if (this.files?.length > 0) {
                $('.file-upload-btn').text('Resume Uploaded');
                $('.file-upload-btn').css('background-color', '#714F36');
                $('.file-upload-btn').css('color', '#FFF');
                $('#clear-file').show();
                $('#save-file').show();
            } else {
                $('.file-upload-btn').text('Upload resume');
                $('.file-upload-btn').css('background-color', '#FFF3D0');
                $('.file-upload-btn').css('color', '#714F36');
            }
        });

        $('#clear-file').on('click', function () {
            clearFileInput();
        });

        // Open modal when the button is clicked
        $(".image-view-btn").on("click", function () {
            $("#imageModal").css("display", "flex");
            $("#modalImage").attr("src", $(".profile-det-image").attr("src"));
        });

        // Close modal when the close button is clicked
        $(".image-view-close").on("click", function () {
            $("#imageModal").css("display", "none");
        });

        // Close modal when clicking outside the modal content
        $(window).on("click", function (event) {
            if (event.target == $("#imageModal")[0]) {
                $("#imageModal").css("display", "none");
            }
        });

        // Function to handle scrolling to the target
        const handleScroll = (event) => {
            const target = $($(event.currentTarget).attr('href'));
            if (target?.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        };

        // Function to toggle visibility of the disabled input area for each group
        function toggleDisabledInputArea() {
            var isChecked = $(this).is(':checked');
            var disabledInputArea = $(this).closest('.change-setting-input-form-group').find('.disabled-input-area');

            if (isChecked) {
                disabledInputArea.slideDown();
            } else {
                disabledInputArea.slideUp();
            }
        }

        // Attach event listener to all checkboxes with the class 'toggleDisabledInput'
        $('.toggleDisabledInput').on('change', toggleDisabledInputArea);

        // Initial call to set the initial state based on the checkbox for each group
        $('.toggleDisabledInput').each(function () {
            toggleDisabledInputArea.call(this);
        });

        // Attach event listeners when the component mounts
        $('.pro-quick-link').on('click', handleScroll);

        $('.profile-skill-edit-btn').on('click', handleEditToggle);

        return () => {
            $('.pro-quick-link').off('click', handleScroll);
            $('.profile-skill-edit-btn').off('click', handleEditToggle);
            $('.toggleDisabledInput').off('change', toggleDisabledInputArea);
        };

    }, [loginCandidate]);

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

    // useEffect(() => {
    //     setCandidateToken(JSON.parse(localStorage.getItem('candidateToken')))
    // }, [candidateToken])

    useEffect(() => {
    
        const fetchData = async () => {
          try {
            const userData = await getProtectedData(candidateToken);
            console.log(userData);
            
            setCandToken(userData.userToken);
          } catch (error) {
            console.log(error)
            window.location.href = 'https://skillety-frontend-wcth.onrender.com/candidate-login'
          }
        };
  
        fetchData();
    },[candidateToken])  

    useEffect(() => {
        if (id && (candidateToken?candidateToken:candToken)) {

            setContentLoading(true);
            axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                .then(res => {
                    console.log(res.data)
                    setLoading(false);
                    setLoginCandidate(res.data)
                })
                .catch(err => {
                    console.log(err)
                    // setLoading(false);
                    // setPageNotFound(true);
                })

                .finally(() => {
                    setContentLoading(false);
                });


            axios.get(`https://skillety-n6r1.onrender.com/candidate-image/${id}`)
                .then(res => {
                    console.log(res.data)
                    setCandidateImg(res.data)
                })
                .catch(err => console.log(err))

                .finally(() => {
                    setContentLoading(false);
                });

            axios.get(`https://skillety-n6r1.onrender.com/candidate-resume/${id}`)
                .then(res => {
                    console.log(res.data)
                    setResume(res.data)
                })
                .catch(err => console.log(err))

                .finally(() => {
                    setContentLoading(false);
                });
        }
    }, [id, candidateToken, candToken])

    useEffect(() => {
        if (candidateImg) {
            setCandidateImgUrl(candidateImg.image.startsWith('https') ? candidateImg.image : `data:image/jpeg;base64,${candidateImg.image}`)
        }

    }, [candidateImg]);

    useEffect(() => {
        if (resume) {
            setCandidateResumeUrl(resume.file)
        }

    }, [resume]);

    useEffect(() => {
        if (resume) {
            // setCandidateResumeUrl(URL.createObjectURL(resume));
        }
    }, [resume]);

    const handleFirstNameUpdate = () => {
        const userData = {
            id: id,
            firstName: userInfo.firstName,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-candidate-first-name", userData, {
            headers: {
                Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("First Name Updated!")
                    setUserInfo(prevUserInfo => ({ ...prevUserInfo, firstName: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setLoginCandidate(res.data)
                        })
                        .catch(err => {
                            console.log(err)

                        })
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleLastNameUpdate = () => {
        const userData = {
            id: id,
            lastName: userInfo.lastName,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-candidate-last-name", userData, {
            headers: {
                Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Last name updated!")
                    setUserInfo(prevUserInfo => ({ ...prevUserInfo, lastName: "" }));


                    axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setLoginCandidate(res.data)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage();
            })
    }

    const handleLocationUpdate = () => {
        const userData = {
            id: id,
            location: selectedLocations[0],
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-candidate-location", userData, {
            headers: {
                Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Location has been updated")
                    setSelectedLocations([])

                    axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setLoginCandidate(res.data)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage();
            })
    }

    const handlePreferedLocationUpdate = () => {
        const userData = {
            id: id,
            preferedLocations: selectedPreferedLocations,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-candidate-prefered-location", userData, {
            headers: {
                Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Prefered location has been updated!")
                    setSelectedPreferedLocations([])

                    axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setLoginCandidate(res.data)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage();
            })
    }

    const handleResumeUpdate = () => {
        if (resume) {
            const formData = new FormData()
            formData.append('resume', resume);
            axios.patch(`https://skillety-n6r1.onrender.com/update-candidate-resume/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res);
                    showSuccessMessage("Resume updated!")
                    setResume(null);

                    axios.get(`https://skillety-n6r1.onrender.com/candidate-resume/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setResume(res.data)
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => {
                    console.log(err)
                    showErrorMessage();
                });
        } else {
            const formData = new FormData()
            formData.append('file', resume);
            formData.append('id', id)
            axios.post("https://skillety-n6r1.onrender.com/upload", formData, {
                headers: {
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res);
                    showSuccessMessage("resume updated")
                    setResume(null);

                    axios.get(`https://skillety-n6r1.onrender.com/candidate-resume/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setResume(res.data)
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => {
                    console.log(err)
                    showErrorMessage();
                });
        }
    }

    const handleSkillUpdate = () => {
        if (selectedSkills?.length < minSkillNum) {
            setSkillError(`Please select atleast ${minSkillNum} skills`)
        } else {
            const userData = {
                id: id,
                skill: selectedSkills,
            }
            axios.patch("https://skillety-n6r1.onrender.com/update-candidate-skill", userData, {
                headers: {
                    Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data)
                    if (!res.data.error) {
                        showSuccessMessage("Skills Updated")
                        setSelectedSkills([])

                        axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                            .then(res => {
                                console.log(res.data)
                                setLoginCandidate(res.data)
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))

            otherSkill?.length > 0 && postOtherSkills(otherSkill);

        }
    }

    const handleProfileHeadlineUpdate = () => {
        const userData = {
            id: id,
            profileHeadline: userInfo.profileHeadline,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-candidate-profileHeadline", userData, {
            headers: {
                Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Profile headline has been updated")
                    setUserInfo(prevUserInfo => ({ ...prevUserInfo, profileHeadline: "" }))

                    axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setLoginCandidate(res.data)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleDaysUpdate = () => {
        const userData = {
            id: id,
            days: userInfo.days,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-candidate-days", userData, {
            headers: {
                Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Availablity to join Updated!")
                    setUserInfo(prevUserInfo => ({ ...prevUserInfo, days: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setLoginCandidate(res.data)
                        })
                        .catch(err => {
                            console.log(err)

                        })
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleExperienceUpdate = () => {
        const userData = {
            id: id,
            year: userInfo.year,
            month: userInfo.month,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-candidate-experience", userData, {
            headers: {
                Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Experience Updated!")
                    setUserInfo(prevUserInfo => ({ ...prevUserInfo, month: "", year: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setLoginCandidate(res.data)
                        })
                        .catch(err => {
                            console.log(err)

                        })
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleSalaryUpdate = () => {
        const userData = {
            id: id,
            currencyType: userInfo.currencyType,
            minSalary: userInfo.minSalary,
            maxSalary: userInfo.maxSalary,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-candidate-salary", userData, {
            headers: {
                Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Expected Annual Salary Updated!")
                    setUserInfo(prevUserInfo => ({ ...prevUserInfo, currencyType: "", minSalary: "", maxSalary: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setLoginCandidate(res.data)
                        })
                        .catch(err => {
                            console.log(err)

                        })
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleEducationUpdate = () => {
        const userData = {
            id: id,
            education: selectedEducation,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-candidate-education", userData, {
            headers: {
                Authorization: `Bearer ${candidateToken?candidateToken:candToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Education has been updated")
                    setSelectedEducation([])

                    axios.get(`https://skillety-n6r1.onrender.com/candidate/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setLoginCandidate(res.data)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleSkillSearch = (e) => {
        const inputValue = e.target.value;
        setSearchSkillInput(inputValue);
        if (inputValue?.length > 0) {
            const candidateSkills = skillArray.filter((obj) => {
                return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (candidateSkills?.length > 0) {
                setFilteredSkills(candidateSkills);
            }
        } else {
            setFilteredSkills([]);
        }
    }

    const handleSkillClick = (skill) => {
        if (totalMonths > 0) {
            setSkillError("")
            if (selectedSkills.includes(skill)) {
                setSelectedSkills([...selectedSkills]);
                setSearchSkillInput("");
                setFilteredSkills([]);
            } else {
                selectedSkills?.length === maxSkillNum && setSkillError(`You can select max of ${maxSkillNum} skills`)
                setSearchSkillInput("");
                setFilteredSkills([]);
                if (selectedSkills?.length < maxSkillNum) {
                    setSelectedSkills([...selectedSkills, skill]);
                    setSearchSkillInput("");
                    setFilteredSkills([]);
                }
            }
        } else {
            setSkillError("Please enter the experience first...");
            setSearchSkillInput("");
            setFilteredSkills([]);
        }
    }

    const handleDeselect = (skill) => {
        setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
        setOtherSkill(otherSkill.filter(other => other !== skill));
    }

    const handleManualSkill = () => {
        if (totalMonths > 0) {
            setSkillError("")
            setSearchSkillInput("");
            if (selectedSkills?.length === maxSkillNum) {
                setSkillError(`You can select max of ${maxSkillNum} skills`);
                setNewSkill("");
            }
            if (selectedSkills?.length < maxSkillNum) {
                setSkillError("")
                const foundObject = skillArray.find(item => item.skill.toLowerCase() === newSkill.toLowerCase().trim());
                if (foundObject) {
                    setSkillError(`Skill "${newSkill}" already in list, please search...`);
                    setNewSkill("");
                } else {
                    setOtherSkill([...otherSkill, newSkill]);
                    setSelectedSkills([...selectedSkills, newSkill]);
                    setNewSkill("");
                }
            }
        } else {
            setSkillError("Please enter the experience first...");
            setNewSkill("");
        }

    }

    const handleEducationSearch = (e) => {
        const inputValue = e.target.value;
        setSearchEducationInput(inputValue);
        if (inputValue?.length > 0) {
            const educations = educationArray.filter((obj) => {
                return obj.education.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (educations?.length > 0) {
                setFilteredEducation(educations);
            }
        } else {
            setFilteredEducation([]);
        }
    };

    const handleEducationClick = (education) => {
        setSelectedEducation([...selectedEducation, education]);
        setSearchEducationInput("");
        setFilteredEducation([]);
    }

    const handleDeselectEducation = (education) => {
        setSelectedEducation(selectedEducation.filter(selectEducation => selectEducation !== education));
    }

    const handleDeselectLocation = (location) => {
        setSelectedLocations(selectedLocations.filter(selectedLocation => selectedLocation !== location));
    }

    const handleLocationSearch = (e) => {
        const inputValue = e.target.value;
        setSearchLocationInput(inputValue);
        if (inputValue?.length > 0) {
            const Locations = locationArray.filter((obj) => {
                return obj.location.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (Locations?.length > 0) {
                setFilteredLocations(Locations);
            }
        } else {
            setFilteredLocations([]);
        }
    }

    const handleLocationClick = (location) => {
        setSelectedLocations([location]);
        setSearchLocationInput("");
        setFilteredLocations([]);
    }

    const handleDeselectPreferedLocation = (location) => {
        setSelectedPreferedLocations(selectedPreferedLocations.filter(selectedLocation => selectedLocation !== location));
    }

    const handlePreferedLocationSearch = (e) => {
        const inputValue = e.target.value;
        setSearchPreferedLocationInput(inputValue);
        if (inputValue?.length > 0) {
            const Locations = locationArray.filter((obj) => {
                return obj.location.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (Locations?.length > 0) {
                setFilteredPreferedLocations(Locations);
            }
        } else {
            setFilteredPreferedLocations([]);
        }
    }

    const handlePreferedLocationClick = (location) => {
        if (!selectedPreferedLocations) {
            setSelectedPreferedLocations([location]);
            setSearchPreferedLocationInput("");
            setFilteredPreferedLocations([]);
        } else if (!selectedPreferedLocations.includes(location)) {
            setSelectedPreferedLocations([...selectedPreferedLocations, location]);
            setSearchPreferedLocationInput("");
            setFilteredPreferedLocations([]);
        }
    };

    /////////////
    const [isNameExpanded, setisNameExpanded] = useState(false);
    const handleNameChangeToggle = () => {
        setisNameExpanded((prev) => !prev);
    };

    const [isLocationExpanded, setisLocationExpanded] = useState(false);
    const handleLocationChangeToggle = () => {
        setisLocationExpanded((prev) => !prev);
    };

    const [isDaysExpanded, setisDaysExpanded] = useState(false);
    const handleDaysChangeToggle = () => {
        setisDaysExpanded((prev) => !prev);
    };

    const [isSkillExpanded, setisSkillExpanded] = useState(false);
    const handleSkillChangeToggle = () => {
        setisSkillExpanded((prev) => !prev);
    };

    const [isHeadlineExpanded, setisHeadlineExpanded] = useState(false);
    const handleHeadlineChangeToggle = () => {
        setisHeadlineExpanded((prev) => !prev);
    };

    const [isSalaryExpanded, setisSalaryExpanded] = useState(false);
    const handleSalaryChangeToggle = () => {
        setisSalaryExpanded((prev) => !prev);
    };
    /////////////

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <Layout />
                <div class="main-content">
                    {/* {loading && <div id="preloader" className='candidate'></div>} */}

                    <section class="section">
                        <div className="candidate-prrofile-section">
                            <div className="profile-head-area">
                                <div className='profile-head'>Profile details</div>
                            </div>
                            {contentloading ? (
                                <div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="profile-card">
                                                <div className="card-flex-area">
                                                    <div className="card-right-area">
                                                        <div className="profile-det-image-area">
                                                            <Skeleton circle={true} height={150} width={150} />
                                                        </div>

                                                        <div className="profile-det-area">
                                                            <div className="profile--name-edit-section">
                                                                <div className="profile--name-area">
                                                                    <Skeleton height={25} width={150} />
                                                                </div>
                                                            </div>
                                                            <div className="profile-update-status mt-3">
                                                                <Skeleton height={15} width={250} />
                                                            </div>
                                                            <div className="prof-page-divider"></div>
                                                            <div className="prof-more-det-section">
                                                                <div className="prof-more-det-left-area">
                                                                    <div className="prof-more-det-area">
                                                                        <div className="prof-more-det">
                                                                            <Skeleton height={20} width={20} />
                                                                            <Skeleton height={15} width={150} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="prof-more-det-area">
                                                                        <div className="prof-more-det">
                                                                            <Skeleton height={20} width={20} />
                                                                            <Skeleton height={15} width={150} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="prof-more-det-area">
                                                                        <div className="prof-more-det">
                                                                            <Skeleton height={20} width={20} />
                                                                            <Skeleton height={15} width={150} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="p-0 p-lg-5 p-md-3"></div>
                                                                <div className="prof-more-det-right-area">
                                                                    <div className="prof-more-det-area">
                                                                        <div className="prof-more-det">
                                                                            <Skeleton height={20} width={20} />
                                                                            <Skeleton height={15} width={150} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="prof-more-det-area">
                                                                        <div className="prof-more-det">
                                                                            <Skeleton height={20} width={20} />
                                                                            <Skeleton height={15} width={150} />
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

                                    <div className="row">
                                        <div className="col-12 col-xl-4 col-lg-4 col-md-4">
                                            <div className="profile-side-card">
                                                <div className="quick-link-head">
                                                    <Skeleton height={25} width={200} />
                                                </div>
                                                <div className="pro-quick-links-area">
                                                    <div className='pro-quick-link-content'>
                                                        <Skeleton height={15} width={150} />
                                                    </div>
                                                    <div className='pro-quick-link-content'>
                                                        <Skeleton height={15} width={150} />
                                                    </div>
                                                    <div className='pro-quick-link-content'>
                                                        <Skeleton height={15} width={150} />
                                                    </div>
                                                    <div className='pro-quick-link-content'>
                                                        <Skeleton height={15} width={150} />
                                                    </div>
                                                    <div className='pro-quick-link-content'>
                                                        <Skeleton height={15} width={150} />
                                                    </div>
                                                    <div className='pro-quick-link-content'>
                                                        <Skeleton height={15} width={150} />
                                                    </div>
                                                    <div className='pro-quick-link-content'>
                                                        <Skeleton height={15} width={150} />
                                                    </div>
                                                    <div className='pro-quick-link-content'>
                                                        <Skeleton height={15} width={150} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-xl-8 col-lg-8 col-md-8">
                                            <div className="profile-content-card">
                                                <div className="profile-content-top-area with-toggle">
                                                    <div className="profile-content-title">
                                                        <Skeleton height={25} width={150} />
                                                    </div>
                                                    <div className="profile-content-title">
                                                        <Skeleton height={20} width={100} />
                                                    </div>
                                                </div>
                                                <div className="p-t-35">
                                                    <Skeleton height={15} className="w-80" />
                                                </div>
                                            </div>

                                            <div className="profile-content-card">
                                                <div className="profile-content-top-area with-toggle">
                                                    <div className="profile-content-title">
                                                        <Skeleton height={25} width={150} />
                                                    </div>
                                                    <div className="profile-content-title">
                                                        <Skeleton height={20} width={100} />
                                                    </div>
                                                </div>
                                                <div className="p-t-35">
                                                    <Skeleton height={15} className="w-80" />
                                                </div>
                                            </div>

                                            <div className="profile-content-card">
                                                <div className="profile-content-top-area with-toggle">
                                                    <div className="profile-content-title">
                                                        <Skeleton height={25} width={150} />
                                                    </div>
                                                    <div className="profile-content-title">
                                                        <Skeleton height={20} width={100} />
                                                    </div>
                                                </div>
                                                <div className="p-t-35">
                                                    <Skeleton height={15} className="w-80" />
                                                </div>
                                            </div>

                                            <div className="profile-content-card">
                                                <div className="profile-content-top-area with-toggle">
                                                    <div className="profile-content-title">
                                                        <Skeleton height={25} width={150} />
                                                    </div>
                                                    <div className="profile-content-title">
                                                        <Skeleton height={20} width={100} />
                                                    </div>
                                                </div>
                                                <div className="p-t-35">
                                                    <Skeleton height={15} className="w-80" />
                                                </div>
                                            </div>

                                            <div className="profile-content-card">
                                                <div className="profile-content-top-area with-toggle">
                                                    <div className="profile-content-title">
                                                        <Skeleton height={25} width={150} />
                                                    </div>
                                                    <div className="profile-content-title">
                                                        <Skeleton height={20} width={100} />
                                                    </div>
                                                </div>
                                                <div className="p-t-35">
                                                    <Skeleton height={15} className="w-80" />
                                                </div>
                                            </div>

                                            <div className="profile-content-card">
                                                <div className="profile-content-top-area with-toggle">
                                                    <div className="profile-content-title">
                                                        <Skeleton height={25} width={150} />
                                                    </div>
                                                    <div className="profile-content-title">
                                                        <Skeleton height={20} width={100} />
                                                    </div>
                                                </div>
                                                <div className="p-t-35">
                                                    <Skeleton height={15} className="w-80" />
                                                </div>
                                            </div>

                                            <div className="profile-content-card">
                                                <div className="profile-content-top-area with-toggle">
                                                    <div className="profile-content-title">
                                                        <Skeleton height={25} width={150} />
                                                    </div>
                                                    <div className="profile-content-title">
                                                        <Skeleton height={20} width={100} />
                                                    </div>
                                                </div>
                                                <div className="p-t-35">
                                                    <Skeleton height={15} className="w-80" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {loginCandidate &&
                                        <div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="profile-card">
                                                        <div className="card-flex-area">
                                                            <div className="card-right-area">
                                                                <div className="profile-det-image-area">
                                                                    <div className="profile-det-image-container">
                                                                        {/* <button className='prof-img-btn'>
                                                        <i class="bi bi-pencil edit-icon"></i>
                                                    </button> */}
                                                                        <div className="image-view-area">
                                                                            <button className='image-view-btn'>
                                                                                <i class="bi bi-fullscreen img-view-icon"></i>
                                                                            </button>
                                                                        </div>
                                                                        <img src={candidateImgUrl ? candidateImgUrl : "../assets/img/talents-images/avatar.jpg"}
                                                                            className='profile-det-image'
                                                                            loading='lazy'
                                                                            alt="" />
                                                                    </div>
                                                                    <div id="imageModal" className="image-view-modal">
                                                                        <span className="image-view-close">
                                                                            <i class="bi bi-x"></i>
                                                                        </span>
                                                                        <img className="image-view-modal-content" id="modalImage" />
                                                                    </div>
                                                                </div>
                                                                <div className="profile-det-area">
                                                                    <div className="profile--name-edit-section">
                                                                        <div className="profile--name-area">
                                                                            <div className="profile--name text-capitalized">{loginCandidate?.firstName + " " + loginCandidate?.lastName}</div>
                                                                            <button className={`profile--name-edit-btn ${isNameExpanded ? 'expanded' : ''}`}
                                                                                onClick={handleNameChangeToggle}>
                                                                                <i class={`${isNameExpanded ? 'bi-x' : 'bi bi-pencil'} profile--name-edit-icon`}></i>
                                                                            </button>
                                                                        </div>
                                                                        <div className={`profile-name-edit-input-area ${isNameExpanded ? 'expanded-one' : ''}`}>
                                                                            <div className="row">
                                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                                    <input type="text" className="change-setting-input"
                                                                                        value={userInfo.firstName}
                                                                                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                                                                                        placeholder="Change Profile First Name" />
                                                                                    <button className="setting-update-btn" onClick={handleFirstNameUpdate} disabled={!userInfo.firstName}>Update</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className={`profile-name-edit-input-area ${isNameExpanded ? 'expanded-two' : ''}`}>
                                                                            <div className="row">
                                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                                    <input type="text"
                                                                                        className="change-setting-input"
                                                                                        value={userInfo.lastName}
                                                                                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                                                                                        placeholder="Change Profile Last Name" />
                                                                                    <button className="setting-update-btn" onClick={handleLastNameUpdate} disabled={!userInfo.lastName}>Update</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="profile-update-status">
                                                                        Profile Last Updated :&nbsp;
                                                                        <span>{`${new Date(loginCandidate?.updatedAt).getDate().toString().padStart(2, '0')}/${(new Date(loginCandidate?.updatedAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(loginCandidate?.updatedAt).getFullYear() % 100}`}</span>
                                                                    </div>
                                                                    <div className="prof-page-divider"></div>
                                                                    <div className="prof-more-det-section">
                                                                        <div className="prof-more-det-left-area">

                                                                            <div className="prof-more-det-area">
                                                                                <div className="prof-more-det">
                                                                                    <i class="bi bi-geo-alt"></i>
                                                                                    <div className="prof-more-det-title text-capitalized">{loginCandidate?.location}</div>
                                                                                    {/* <button className={`prof-more-det-edit-btn ${isLocationExpanded ? 'expanded' : ''}`}
                                                                                onClick={handleLocationChangeToggle}>
                                                                                <i class={`${isLocationExpanded ? 'bi-x' : 'bi bi-pencil'} profile--name-edit-icon`}></i>
                                                                            </button> */}
                                                                                </div>
                                                                                {/* <div className={`prof-more-det-input-area ${isLocationExpanded ? 'expanded' : ''}`}>
                                                                            <div className="row">
                                                                            {selectedLocations?.map(selectedLocation => (
                                                                                    <span className="job-post-form-badge tal-search"
                                                                                        key={selectedLocation}
                                                                                        onClick={() => handleDeselectLocation(selectedLocation)}
                                                                                    >{selectedLocation}
                                                                                    </span>
                                                                                ))}
                                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="change-setting-input more-det"
                                                                                        placeholder="Change Location"
                                                                                        value={searchLocationInput}
                                                                                        onChange={handleLocationSearch}
                                                                                        />
                                                                                    {filteredLocations.length > 0 &&
                                                                                        filteredLocations.map((filterLocation) => {
                                                                                            return <div className='search-result-data custom' key={filterLocation._id} onClick={() => handleLocationClick(filterLocation.location)}>
                                                                                                {filterLocation.location}
                                                                                            </div>
                                                                                        })
                                                                                    }
                                                                                    <button className="setting-update-btn more-det" onClick={handleLocationUpdate}>Update</button>
                                                                                </div>
                                                                            </div>
                                                                        </div> */}
                                                                            </div>

                                                                            <div className="prof-more-det-area">
                                                                                <div className="prof-more-det">
                                                                                    <i class="bi bi-briefcase"></i>
                                                                                    <div className="prof-more-det-title text-capitalized">{loginCandidate?.designation[0]}</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="prof-more-det-area">
                                                                                <div className="prof-more-det">
                                                                                    <i class="bi bi-file-earmark-text"></i>
                                                                                    <div className="prof-more-det-title">{loginCandidate?.days}</div>
                                                                                    <button className={`prof-more-det-edit-btn ${isDaysExpanded ? 'expanded' : ''}`}
                                                                                        onClick={handleDaysChangeToggle}>
                                                                                        <i class={`${isDaysExpanded ? 'bi-x' : 'bi bi-pencil'} profile--name-edit-icon`}></i>
                                                                                    </button>
                                                                                </div>
                                                                                <div className={`prof-more-det-input-area ${isDaysExpanded ? 'expanded' : ''}`}>
                                                                                    <div className="row">
                                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                                            <i class="bi bi-chevron-down toggle-icon"></i>
                                                                                            <select className='change-setting-input more-det select'
                                                                                                value={userInfo.days}
                                                                                                onChange={(e) => setUserInfo({ ...userInfo, days: e.target.value })}>
                                                                                                <option value="" disabled selected>-- Select availablity to join --</option>
                                                                                                <option value="0 to 7 days">0 to 7 days</option>
                                                                                                <option value="8 to 15 days">8 to 15 days</option>
                                                                                                <option value="16 to 30 days">16 to 30 days</option>
                                                                                                <option value="More than 30 days">More than 30 days</option>
                                                                                                <option value="Currently not serving notice period">Currently not serving notice period</option>
                                                                                            </select>
                                                                                            <button className="setting-update-btn more-det" onClick={handleDaysUpdate} disabled={!userInfo.days}>Update</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="prof-more-det-line"></div>

                                                                        <div className="prof-more-det-right-area">
                                                                            <div className="prof-more-det-area">
                                                                                <div className="prof-more-det">
                                                                                    <i class="bi bi-telephone"></i>
                                                                                    <div className="prof-more-det-title" onClick={() => window.location.href = `tel:${loginCandidate?.phone}`}>
                                                                                        <a className='prof-more-det-title link' href={`tel:${loginCandidate?.phone}`}>
                                                                                            {loginCandidate?.phone}
                                                                                        </a>
                                                                                    </div>
                                                                                    {/* <button className="prof-more-det-edit-btn" data-type="mobile number">Add mobile number</button> */}
                                                                                </div>
                                                                                {/* <div className="prof-more-det-input-area">
                                                                <div className="row">
                                                                    <div className="col-12 d-flex align-items-center gap-10">
                                                                        <input type="number" className="change-setting-input more-det" placeholder="Add mobile number" />
                                                                        <button className="setting-update-btn more-det">Add</button>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                                            </div>

                                                                            <div className="prof-more-det-area">
                                                                                <div className="prof-more-det">
                                                                                    <i class="bi bi-envelope"></i>
                                                                                    <div className="prof-more-det-title" onClick={() => window.location.href = `mailto:${loginCandidate?.email}`}>
                                                                                        <a className='prof-more-det-title link' href={`mailto:${loginCandidate?.email}`}>
                                                                                            {loginCandidate?.email}
                                                                                        </a>
                                                                                    </div>
                                                                                    {/* <button className="prof-more-det-edit-btn" data-type="your email">Add your email</button> */}
                                                                                </div>
                                                                                {/* <div className="prof-more-det-input-area">
                                                                <div className="row">
                                                                    <div className="col-12 d-flex align-items-center gap-10">
                                                                        <input type="email" className="change-setting-input more-det" placeholder="Add your email" />
                                                                        <button className="setting-update-btn more-det">Add</button>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="card-left-area">
                                            <div className="missing-det-content-section">
                                                <div className="missing-det-content-area">
                                                    <div className="missing-det-content">
                                                        <div className="missing-det-icon-area">
                                                            <i class="bi bi-check-circle"></i>
                                                        </div>
                                                        <div className="missing-det-text">Verify Mobile Number</div>
                                                        <button className='missing-det-add-btn'>Verify Mobile Number</button>
                                                    </div>
                                                    <div className="missing-det-percentage-area">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                            <path d="M4.35355 0.665978C4.15829 0.470716 3.84171 0.470716 3.64645 0.665978L0.464466 3.84796C0.269204 4.04322 0.269204 4.3598 0.464466 4.55507C0.659728 4.75033 0.976311 4.75033 1.17157 4.55507L4 1.72664L6.82843 4.55507C7.02369 4.75033 7.34027 4.75033 7.53553 4.55507C7.7308 4.3598 7.7308 4.04322 7.53553 3.84796L4.35355 0.665978ZM4.5 14.0195L4.5 1.01953L3.5 1.01953L3.5 14.0195L4.5 14.0195Z" fill="#2CAC21" />
                                                        </svg>
                                                        <span className='missing-det-percentage'>10%</span>
                                                    </div>
                                                </div>

                                                <div className="missing-det-content-area">
                                                    <div className="missing-det-content">
                                                        <div className="missing-det-icon-area">
                                                            <i class="bi bi-geo-alt"></i>
                                                        </div>
                                                        <div className="missing-det-text">Add preferred Location</div>
                                                        <button className='missing-det-add-btn'>Add preferred Location</button>
                                                    </div>
                                                    <div className="missing-det-percentage-area">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                            <path d="M4.35355 0.665978C4.15829 0.470716 3.84171 0.470716 3.64645 0.665978L0.464466 3.84796C0.269204 4.04322 0.269204 4.3598 0.464466 4.55507C0.659728 4.75033 0.976311 4.75033 1.17157 4.55507L4 1.72664L6.82843 4.55507C7.02369 4.75033 7.34027 4.75033 7.53553 4.55507C7.7308 4.3598 7.7308 4.04322 7.53553 3.84796L4.35355 0.665978ZM4.5 14.0195L4.5 1.01953L3.5 1.01953L3.5 14.0195L4.5 14.0195Z" fill="#2CAC21" />
                                                        </svg>
                                                        <span className='missing-det-percentage'>02%</span>
                                                    </div>
                                                </div>

                                                <div className="missing-det-content-area">
                                                    <div className="missing-det-content">
                                                        <div className="missing-det-icon-area">
                                                            <i class="bi bi-file-earmark-text"></i>
                                                        </div>
                                                        <div className="missing-det-text">Add Resume</div>
                                                        <button className='missing-det-add-btn'>Add Resume</button>
                                                    </div>
                                                    <div className="missing-det-percentage-area">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                            <path d="M4.35355 0.665978C4.15829 0.470716 3.84171 0.470716 3.64645 0.665978L0.464466 3.84796C0.269204 4.04322 0.269204 4.3598 0.464466 4.55507C0.659728 4.75033 0.976311 4.75033 1.17157 4.55507L4 1.72664L6.82843 4.55507C7.02369 4.75033 7.34027 4.75033 7.53553 4.55507C7.7308 4.3598 7.7308 4.04322 7.53553 3.84796L4.35355 0.665978ZM4.5 14.0195L4.5 1.01953L3.5 1.01953L3.5 14.0195L4.5 14.0195Z" fill="#2CAC21" />
                                                        </svg>
                                                        <span className='missing-det-percentage'>10%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="missing-det-btn-area">
                                                <button className='missing-det-btn'>Add missing details</button>
                                            </div>
                                        </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-xl-4 col-lg-4 col-md-4">
                                                    <div className="profile-side-card">
                                                        <div className="quick-link-head">Quick Links</div>
                                                        <div className="pro-quick-links-area">
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#Resume" className='pro-quick-link'>Resume
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                            {/* <div className='pro-quick-link-content'>
                                            <a href="#Resume_headline" className='pro-quick-link'>Resume Headline
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div> */}
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#Key_skills" className='pro-quick-link'>Key Skills
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#Profile_headline" className='pro-quick-link'>Profile Headline
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#Education" className='pro-quick-link'>Education
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#Location" className='pro-quick-link'>Location
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#Work_prefered_location" className='pro-quick-link'>Preferred Work Location
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#Expected_salary" className='pro-quick-link'>Expected Salary
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                            {/* <div className='pro-quick-link-content'>
                                            <a href="#It_skills" className='pro-quick-link'>IT Skills
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div> */}
                                                            {/* <div className='pro-quick-link-content'>
                                            <a href="#Project" className='pro-quick-link'>Project
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Profile_summary" className='pro-quick-link'>Profile Summary
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Accomplishment" className='pro-quick-link'>Accomplishment
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Career_profile" className='pro-quick-link'>Career Profile
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className='pro-quick-link-content'>
                                            <a href="#Personal_details" className='pro-quick-link'>Personal Details
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div> */}
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#View_Cv" className='pro-quick-link'>View or Download CV
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-xl-8 col-lg-8 col-md-8">
                                                    <div className="profile-content-card" id='Resume'>
                                                        <div className="profile-content-title">Resume</div>
                                                        {/* <div className="profile-content-sub-title">
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                    </div> */}
                                                        <div className="prof-page-file-upload-area">

                                                            {/* <iframe src={candidateResumeUrl ? candidateResumeUrl : ""} title="Event Image iframe" ></iframe> */}
                                                            <input type="file" id="file_upload" accept=".doc,.docx,.pdf,.rtf"
                                                                style={{ display: 'none' }}
                                                                onChange={e => setResume(e.target.files[0])}
                                                                required />
                                                            <label for="file_upload" className='prof-page-file-upload-label'>
                                                                <span className='file-upload-btn'>
                                                                    Update resume
                                                                </span>
                                                            </label>
                                                            {resume ? <span id="file-chosen">{resume.name}</span> : loginCandidate?.file ? <span id="file-chosen">{loginCandidate?.file}</span> : <span id="file-chosen">No file choosen..!</span>}
                                                            <button className="setting-update-btn more-det" onClick={handleResumeUpdate} disabled={!resume}>Update</button>
                                                            {/* <div className="file-upload-btn-area">
                                                <button id="clear-file" className='clear-file-btn'>
                                                    <i class="bi bi-x"></i>Clear File
                                                </button>
                                                <button id="save-file" className="save-file-btn" typeof='submit'>
                                                    <i class="bi bi-check2"></i>
                                                    Save
                                                </button>
                                            </div> */}

                                                        </div>
                                                    </div>

                                                    {/* <div className="profile-content-card" id='Resume_headline'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">Resume Headline</div>
                                        <button className="profile-content-edit-btn" data-type="Resume headline">Add Resume headline</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add Resume headline" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                                    <div className="profile-content-card" id='Key_skills'>
                                                        <div className="profile-content-top-area">
                                                            <div className="profile-content-title">Experience & Key Skills</div>
                                                            {loginCandidate?.skills ?
                                                                <button className="profile-skill-edit-btn"
                                                                    data-type='Experience & Key Skills'>
                                                                    Change Experience & Key Skills
                                                                </button>
                                                                :
                                                                <button className="profile-skill-edit-btn"
                                                                    data-type='Experience & Key Skills'>
                                                                    Add Experience & Key Skills
                                                                </button>
                                                            }
                                                        </div>
                                                        {loginCandidate?.skills ?
                                                            <div className="profile-content-area">
                                                                <div className='profile-content experince text-capitalized'>
                                                                    Experience&nbsp;:&nbsp;
                                                                    <span>{loginCandidate?.year} Year {loginCandidate?.month} Months</span>
                                                                </div>
                                                                <div className='profile-content experince  text-capitalized'>
                                                                    Skills&nbsp;:&nbsp;
                                                                    <span>{loginCandidate?.skills.join(", ")}</span>
                                                                </div>
                                                            </div> : null
                                                        }
                                                        <div className="profile-content-skill-input-area">
                                                            <hr />
                                                            <div className="row mb-3">
                                                                <div className="col-12">
                                                                    <div className='experince-head'>Total Experience</div>
                                                                </div>
                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                    <input type="number" className="change-setting-input text-center"
                                                                        placeholder="Years"
                                                                        value={userInfo.year}
                                                                        onChange={(e) => setUserInfo({ ...userInfo, year: e.target.value })}
                                                                    />
                                                                    -
                                                                    <input type="number" className="change-setting-input text-center"
                                                                        placeholder="Months"
                                                                        value={userInfo.month}
                                                                        onChange={(e) => setUserInfo({ ...userInfo, month: e.target.value })}
                                                                    />
                                                                    <button className="setting-update-btn"
                                                                        onClick={handleExperienceUpdate}
                                                                        disabled={!userInfo.year || !userInfo.month}
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className='job-post-form-badge-area'>
                                                                        {selectedSkills?.map(selectSkill => (
                                                                            <span className="job-post-form-badge tal-search"
                                                                                key={selectSkill}
                                                                                onClick={() => handleDeselect(selectSkill)}
                                                                            >{selectSkill}</span>
                                                                        ))}
                                                                    </div>
                                                                    <div className='d-flex align-items-center gap-10 position-relative'>
                                                                        <div className='w-100 position-relative'>
                                                                            <input type="search" className="change-setting-input"
                                                                                value={searchSkillInput}
                                                                                onChange={handleSkillSearch}
                                                                                placeholder="Search Skill"
                                                                            />
                                                                            <div className='search-result-data-area custom'>
                                                                                {filteredSkills?.length > 0 &&
                                                                                    filteredSkills.map((filterSkill) => {
                                                                                        return <div className='search-result-data custom' key={filterSkill._id} onClick={() => handleSkillClick(filterSkill.skill)}>{filterSkill.skill}</div>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>


                                                                        <button className="setting-update-btn"
                                                                            onClick={handleSkillUpdate}
                                                                            disabled={totalMonths ? (selectedSkills?.length < minSkillNum || selectedSkills?.length > maxSkillNum) : true}
                                                                        >
                                                                            {loginCandidate?.skills ? 'Update' : 'Add'}
                                                                        </button>
                                                                    </div>
                                                                    {skillError ?
                                                                        <small className='text-danger mt-3'>{skillError}</small>
                                                                        :
                                                                        <small className='text-danger'>{skillAlert}</small>
                                                                    }

                                                                    <div className='mt-3 change-setting-input-form-group'>
                                                                        <div className="job-post-form-chechbox-area">
                                                                            <label className="job-post-form-check-input view-disabled-input">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={isCheckedSkill}
                                                                                    onChange={() => setIsCheckedSkill(!isCheckedSkill)}
                                                                                    className="toggleDisabledInput"
                                                                                />
                                                                                <span className="job-post-form-checkmark"></span>
                                                                                If your searched skill not in the list, please enable the checkbox & type
                                                                            </label>
                                                                        </div>

                                                                        <div className="candidate-skill-note mt-3">
                                                                            <span>Note</span> : These will also be used as the tags for searching matching jobs for you. So enter all your key skills without fail.
                                                                        </div>

                                                                        <div className="disabled-input-area">
                                                                            <div className='d-flex align-items-center gap-10 position-relative mt-3'>
                                                                                <div className='w-100 position-relative'>
                                                                                    <input
                                                                                        type='text'
                                                                                        name='manualSkillInput'
                                                                                        id='manualSkillInput'
                                                                                        className='change-setting-input'
                                                                                        placeholder='Enter your skill'
                                                                                        value={newSkill}
                                                                                        onChange={(e) => setNewSkill(e.target.value)}
                                                                                        disabled={!isCheckedSkill}
                                                                                    />
                                                                                    {/* <label htmlFor="manualDesignationInput" className='cand--reg-form-label'>Enter your skill manually</label> */}
                                                                                </div>
                                                                                <button
                                                                                    type="button"
                                                                                    className="setting-update-btn"
                                                                                    onClick={handleManualSkill}
                                                                                    disabled={!isCheckedSkill}>
                                                                                    Add
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="profile-content-card" id='Profile_headline'>
                                                        <div className="profile-content-top-area">
                                                            <div className="profile-content-title">Profile Headline</div>
                                                            {loginCandidate?.profileHeadline ?
                                                                <button className={`profile-content-edit-btn ${isHeadlineExpanded ? 'expanded' : ''}`}
                                                                    onClick={handleHeadlineChangeToggle}>
                                                                    {isHeadlineExpanded ? 'Cancel' : 'Change Profile Headline'}
                                                                </button>
                                                                :
                                                                <button className={`profile-content-edit-btn ${isHeadlineExpanded ? 'expanded' : ''}`}
                                                                    onClick={handleHeadlineChangeToggle}>
                                                                    {isHeadlineExpanded ? 'Cancel' : 'Add Profile Headline'}
                                                                </button>
                                                            }
                                                        </div>
                                                        {loginCandidate?.profileHeadline ?
                                                            <div className="profile-content-area">
                                                                <div className='profile-content text-capitalized'>
                                                                    {loginCandidate?.profileHeadline}
                                                                </div>
                                                            </div> : null
                                                        }
                                                        <div className={`profile-content-input-area ${isHeadlineExpanded ? 'expanded' : ''}`}>
                                                            <div className="row">
                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                    <input type="text" className="change-setting-input"
                                                                        placeholder={`${loginCandidate?.profileHeadline ? 'Change' : 'Add'} profile headline`}
                                                                        value={userInfo.profileHeadline}
                                                                        onChange={(e) => setUserInfo({ ...userInfo, profileHeadline: e.target.value })} />
                                                                    <button className="setting-update-btn" onClick={handleProfileHeadlineUpdate}
                                                                        disabled={!userInfo.profileHeadline}>
                                                                        {loginCandidate?.profileHeadline ? 'Update' : 'Add'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="profile-content-card" id='Education'>
                                                        <div className="profile-content-top-area">
                                                            <div className="profile-content-title">Education</div>
                                                            {loginCandidate?.education ?
                                                                <button className="profile-skill-edit-btn"
                                                                    data-type='Education'>
                                                                    Change Education
                                                                </button>
                                                                :
                                                                <button className="profile-skill-edit-btn"
                                                                    data-type='Education'>
                                                                    Add Education
                                                                </button>
                                                            }
                                                        </div>
                                                        {loginCandidate?.education ?
                                                            <div className="profile-content-area">
                                                                <div className='profile-content'>
                                                                    {loginCandidate?.education.join(", ")}
                                                                </div>
                                                            </div> : null
                                                        }
                                                        <div className="profile-content-skill-input-area">
                                                            <hr />
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className='job-post-form-badge-area'>
                                                                        {selectedEducation?.map(selectEducation => (
                                                                            <span className="job-post-form-badge tal-search"
                                                                                key={selectEducation}
                                                                                onClick={() => handleDeselectEducation(selectEducation)}
                                                                            >{selectEducation}
                                                                            </span>
                                                                        ))}
                                                                    </div>

                                                                    <div className='d-flex align-items-center gap-10 position-relative'>
                                                                        <div className='w-100 position-relative'>
                                                                            <input type="search" className="change-setting-input"
                                                                                value={searchEducationInput}
                                                                                onChange={handleEducationSearch}
                                                                                placeholder={`${loginCandidate?.education ? 'Change' : 'Add'} education`} />

                                                                            <div className='search-result-data-area custom'>

                                                                                {filteredEducation?.length > 0 &&
                                                                                    filteredEducation.map((filterEducation) => {
                                                                                        return <div className='search-result-data custom' key={filterEducation._id} onClick={() => handleEducationClick(filterEducation.education)}>
                                                                                            {filterEducation.education}
                                                                                        </div>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <button className="setting-update-btn" onClick={handleEducationUpdate}
                                                                            disabled={selectedEducation?.length === 0}>
                                                                            {loginCandidate?.education ? 'Update' : 'Add'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="more-inputs-section">
                                        <div className="more-inputs-area">
                                            <div className="more-inputs-btn-area">
                                                <button className="profile-content-more-inputs-edit-btn" data-type="Education">Add Education</button>
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 col-xl-8 d-flex align-items-center gap-10">
                                                        <input type="text" className="change-setting-input" placeholder="Add Education" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="more-inputs-area">
                                            <div className="more-inputs-btn-area">
                                                <button className="profile-content-more-inputs-edit-btn" data-type="Education">Add Education</button>
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 col-xl-8 d-flex align-items-center gap-10">
                                                        <input type="text" className="change-setting-input" placeholder="Add Education" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="more-inputs-area">
                                            <div className="more-inputs-btn-area">
                                                <button className="profile-content-more-inputs-edit-btn" data-type="Education">Add Education</button>
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 col-xl-8 d-flex align-items-center gap-10">
                                                        <input type="text" className="change-setting-input" placeholder="Add Education" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                                    </div>

                                                    <div className="profile-content-card" id='Location'>
                                                        <div className="profile-content-top-area">
                                                            <div className="profile-content-title">Location</div>
                                                            {loginCandidate?.location ?
                                                                <button className="profile-skill-edit-btn"
                                                                    data-type='Location'>
                                                                    Change Location
                                                                </button>
                                                                :
                                                                <button className="profile-skill-edit-btn"
                                                                    data-type='Location'>
                                                                    Add Location
                                                                </button>
                                                            }
                                                        </div>
                                                        {loginCandidate?.location ?
                                                            <div className="profile-content-area">
                                                                <div className='profile-content'>
                                                                    {loginCandidate?.location}
                                                                </div>
                                                            </div> : null
                                                        }
                                                        <div className="profile-content-skill-input-area">
                                                            <hr />
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className='job-post-form-badge-area'>
                                                                        {selectedLocations?.map(selectLocation => (
                                                                            <span className="job-post-form-badge tal-search"
                                                                                key={selectLocation}
                                                                                onClick={() => handleDeselectLocation(selectLocation)}
                                                                            >{selectLocation}
                                                                            </span>
                                                                        ))}
                                                                    </div>

                                                                    <div className='d-flex align-items-center gap-10 position-relative'>
                                                                        <div className='w-100 position-relative'>
                                                                            <input type="search" className="change-setting-input"
                                                                                value={searchLocationInput}
                                                                                onChange={handleLocationSearch}
                                                                                placeholder="Search and select location" />

                                                                            <div className='search-result-data-area custom'>

                                                                                {filteredLocations?.length > 0 &&
                                                                                    filteredLocations.map((filterLocation) => {
                                                                                        return <div className='search-result-data custom' key={filterLocation._id} onClick={() => handleLocationClick(filterLocation.location)}>
                                                                                            {filterLocation.location}
                                                                                        </div>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <button className="setting-update-btn" onClick={handleLocationUpdate}
                                                                            disabled={selectedLocations?.length === 0}>
                                                                            {loginCandidate?.location ? 'Update' : 'Add'}
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                        <div className="profile-content-card" id='Work_prefered_location'>
                                            <div className="profile-content-top-area">
                                                <div className="profile-content-title">Preferred Work Location</div>
                                                {loginCandidate?.preferedlocations ?
                                                    <button className="profile-skill-edit-btn"
                                                        data-type='Location'>
                                                        Change Location
                                                    </button>
                                                    :
                                                    <button className="profile-skill-edit-btn"
                                                        data-type='Location'>
                                                        Add Location
                                                    </button>
                                                }
                                            </div>
                                            {loginCandidate?.preferedlocations ?
                                                <div className="profile-content-area">
                                                    <div className='profile-content'>
                                                        {loginCandidate?.preferedlocations.join(", ")}
                                                    </div>
                                                </div> : null
                                            }
                                            <div className="profile-content-skill-input-area">
                                                <hr />
                                                <div className="row">
                                                    <div className="col-12">
                                                    {selectedPreferedLocations && selectedPreferedLocations?.length > 0 && (
                                                        <div className='job-post-form-badge-area'>
                                                            {selectedPreferedLocations.map(selectLocation => (
                                                            <span
                                                                className="job-post-form-badge tal-search"
                                                                key={selectLocation}
                                                                onClick={() => handleDeselectPreferedLocation(selectLocation)}
                                                            >
                                                                {selectLocation}
                                                            </span>
                                                            ))}
                                                        </div>
                                                        )}
                                                        <div className='d-flex align-items-center gap-10 position-relative'>
                                                            <div className='w-100 position-relative'>
                                                                <input type="search" className="change-setting-input"
                                                                    value={searchPreferedLocationInput}
                                                                    onChange={handlePreferedLocationSearch}
                                                                    placeholder="Search and select prefered location" />

                                                                            <div className='search-result-data-area custom'>

                                                                                {filteredPreferedLocations?.length > 0 &&
                                                                                    filteredPreferedLocations?.map((filterLocation) => {
                                                                                        return <div className='search-result-data custom' key={filterLocation._id} onClick={() => handlePreferedLocationClick(filterLocation.location)}>
                                                                                            {filterLocation.location}
                                                                                        </div>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <button className="setting-update-btn" onClick={handlePreferedLocationUpdate}
                                                                            disabled={selectedPreferedLocations?.length === 0}
                                                                        >
                                                                            {loginCandidate?.preferedlocations ? 'Update' : 'Add'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                        <div className="profile-content-card" id='Expected_salary'>
                                            <div className="profile-content-top-area">
                                                <div className="profile-content-title">Expected Salary(Annual)</div>
                                                {(loginCandidate?.minSalary && loginCandidate?.maxSalary) ?
                                                    <button className={`profile-content-edit-btn ${isSalaryExpanded ? 'expanded' : ''}`}
                                                        onClick={handleSalaryChangeToggle}>
                                                        {isSalaryExpanded ? 'Cancel' : 'Change Salary'}
                                                    </button>
                                                    :
                                                    <button className={`profile-content-edit-btn ${isSalaryExpanded ? 'expanded' : ''}`}
                                                        onClick={handleSalaryChangeToggle}>
                                                        {isSalaryExpanded ? 'Cancel' : 'Add Salary'}
                                                    </button>
                                                }
                                            </div>
                                            {(loginCandidate?.minSalary && loginCandidate?.maxSalary) ?
                                                <div className="profile-content-area">
                                                    <div className='profile-content text-capitalized'>
                                                        {loginCandidate?.currencyType}{loginCandidate?.minSalary} - {loginCandidate?.currencyType}{loginCandidate?.maxSalary} Annual
                                                    </div>
                                                </div> : null
                                            }
                                            <div className={`profile-content-input-area ${isSalaryExpanded ? 'expanded' : ''}`}>
                                                <div className="row">
                                                    <div className="col-12 d-flex align-items-center gap-10">
                                                    <div className='w-50 position-relative mobile-select-area'>
                                                                        <select className='change-setting-input select'
                                                                            name="currencyType"
                                                                            value={userInfo.currencyType}
                                                                            onChange={(e) => setUserInfo({ ...userInfo, currencyType: e.target.value })}
                                                                        >
                                                                            <option value="₹" selected>₹</option>
                                                                            <option value="$">$</option>
                                                                        </select>
                                                                        <i className="bi bi-chevron-down toggle-icon"></i>
                                                                    </div>                                                        
                                                                    <input type="number" className="change-setting-input text-center"
                                                            placeholder="Min"
                                                            value={userInfo.minSalary}
                                                            onChange={(e) => setUserInfo({ ...userInfo, minSalary: e.target.value })}
                                                        />
                                                        -
                                                        <input type="number" className="change-setting-input text-center"
                                                            placeholder="Max"
                                                            value={userInfo.maxSalary}
                                                            onChange={(e) => setUserInfo({ ...userInfo, maxSalary: e.target.value })}
                                                        />
                                                        <button className="setting-update-btn" onClick={handleSalaryUpdate}
                                                        disabled={
                                                            userInfo.currencyType === '' ||
                                                            userInfo.minSalary === '' || 
                                                            userInfo.maxSalary === '' || 
                                                            parseFloat(userInfo.minSalary) > parseFloat(userInfo.maxSalary)}>
                                                            {loginCandidate?.profileHeadline ? 'Update' : 'Add'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                                    {/* <div className="profile-content-card" id='It_skills'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">IT Skills</div>
                                        <button className="profile-content-edit-btn" data-type="IT Skills">Add IT Skills</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add IT Skills" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Project'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">Project</div>
                                        <button className="profile-content-edit-btn" data-type="Project">Add Project</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add Project" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Profile_summary'>
                                    <div className="profile-content-top-area">
                                        <div className="profile-content-title">Profile summary</div>
                                        <button className="profile-content-edit-btn" data-type="Profile summary">Add Profile summary</button>
                                    </div>
                                    <div className="profile-content-area">
                                        <div className='profile-content'>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                        </div>
                                    </div>
                                    <div className="profile-content-input-area">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center gap-10">
                                                <input type="text" className="change-setting-input" placeholder="Add Profile summary" />
                                                <button className="setting-update-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Accomplishment'>
                                    <div className="profile-content-title">Accomplishment</div>

                                    <div className="more-inputs-section">
                                        <div className="more-inputs-area with-border">
                                            <div className="more-inputs-btn-area">
                                                <div className="more-inputs-text">Online Profile</div>
                                                <button className="profile-content-more-inputs-edit-btn" data-type="">Add</button>
                                            </div>
                                            <div className='profile-content mb-4'>
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 d-flex align-items-center gap-10 mb-4">
                                                        <input type="text" className="change-setting-input" placeholder="Add Online Profile" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="more-inputs-area with-border">
                                            <div className="more-inputs-btn-area">
                                                <div className="more-inputs-text">Online Profile</div>
                                                <button className="profile-content-more-inputs-edit-btn" data-type="">Add</button>
                                            </div>
                                            <div className='profile-content mb-4'>
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 d-flex align-items-center gap-10 mb-4">
                                                        <input type="text" className="change-setting-input" placeholder="Add Online Profile" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="more-inputs-area">
                                            <div className="more-inputs-btn-area">
                                                <div className="more-inputs-text">Online Profile</div>
                                                <button className="profile-content-more-inputs-edit-btn" data-type="">Add</button>
                                            </div>
                                            <div className='profile-content mb-4'>
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                            </div>
                                            <div className="profile-content-more-input-area">
                                                <div className="row">
                                                    <div className="col-12 d-flex align-items-center gap-10 mb-4">
                                                        <input type="text" className="change-setting-input" placeholder="Add Online Profile" />
                                                        <button className="setting-update-btn">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-content-card" id='Personal_details'>
                                    <div className="profile-content-title">Personal Details</div>
                                    <div className="row mt-4">
                                        <div className="col-12 col-xl-6 col-lg-6">
                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Personal</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='gender, marital status more info'>Add gender, marital status more info</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10 mb-4">
                                                            <input type="text" className="change-setting-input" placeholder="Add gender" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add marital status" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Date of birth</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Date of birth'>Add Date of birth</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="date" className="change-setting-input" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Category</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Category'>Add Category</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add Category" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-6 col-lg-6">
                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Career break</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Career break'>Add Career break</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add Career break" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Desired Job Type</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Desired Job Type'>Add Desired Job Type</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add Desired Job Type" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="personal-detail-section">
                                                <div className="more-inputs-text">Current industry</div>
                                                <button className='personal-det-add-btn mt-3 mb-4' data-type='Current industry'>Add Current industry</button>

                                                <div className="personal-det-add-input-area">
                                                    <div className="row">
                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                            <input type="text" className="change-setting-input" placeholder="Add Current industry" />
                                                            <button className="setting-update-btn">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                                    <div className="profile-action-btn-area" id='View_Cv'>
                                                        <button className='view-cv-btn' onClick={() => handleViewCV(candidateResumeUrl)}>
                                                            <i class="bi bi-eye-fill view-cv-icon"></i>
                                                            View CV
                                                        </button>

                                                        {/* {showViewer && (
                                        <object
                                        data={candidateResumeUrl}
                                        type="application/pdf"
                                        width="100%"
                                        height="500px"
                                        >
                                        </object>
                                    )} */}
                                                        <button className='download-cv-btn' onClick={() => {
                                                            window.open(candidateResumeUrl);
                                                        }}>
                                                            <i class="bi bi-download download-cv-icon"></i>
                                                            Download CV
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    </section>
                    {/* {pageNotFound && <div>
                <h1>404</h1>
                <p>Not Found</p>
                <small>The resource requested could not be found on this server!</small>
            </div>} */}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className={`doc-view-modal-content ${isModalOpen ? 'open' : ''}`}
                    overlayClassName={`doc-view-modal-overlay ${isModalOpen ? 'open' : ''}`}
                >
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

                    <button className="doc-view-close-button" onClick={closeModal}>
                        <i className='bi bi-x'></i>
                    </button>
                </Modal>
                <Footer />
            </div >
        </div >
    )
}

export default CandidateProfile