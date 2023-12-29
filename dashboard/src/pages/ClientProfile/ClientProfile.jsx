import React, { useState } from 'react';
import { useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';
import './ClientProfile.css';
import './ClientProfile-responsive.css';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Footer from '../../components/Footer';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ClientProfile = () => {
    const { id } = useParams();
    const [clientToken, setClientToken] = useState("");
    const [companyDetail, setCompanyDetail] = useState();
    const [clientImg, setClientImg] = useState();
    const [clientImgUrl, setClientImgUrl] = useState("");
    const [checkBox, setCheckBox] = useState(["Health Insurance", "Work From Home", "Sick Leave", "Maternity/Parental Leave", "Job Training"]);
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [awardList, setAwardlist] = useState([]);

    const [loading, setLoading] = useState(true);


    const [companyInfo, setCompanyInfo] = useState({
        companyName: "",
        industry: "",
        location: "",
        website: "",
        shortDescription: "",
        longDescription: "",
        mission: "",
        vision: "",
        manuallyAddedBenefit: "",
        awards: "",
    })

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
        setClientToken(JSON.parse(localStorage.getItem('clientToken')))
    }, [clientToken])

    useEffect(() => {
        if (id && clientToken) {

            setLoading(true);

            axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data)
                    setCompanyDetail(res.data)
                    setSelectedBenefits(res.data.benefits)
                    setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                    setAwardlist(res.data.awards)
                })
                .catch(err => console.log(err))

                .finally(() => {
                    setLoading(false);
                });

            axios.get(`https://skillety-n6r1.onrender.com/client-image/${id}`)
                .then(res => setClientImg(res.data))
                .catch(err => console.log(err))

                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id, clientToken])

    useEffect(() => {
        if (clientImg) {
            setClientImgUrl(`https://skillety-n6r1.onrender.com/client_profile/${clientImg.image}`)
        }

    }, [clientImg]);

    const handleCompanyNameUpdate = () => {
        const companyData = {
            id: id,
            companyName: companyInfo.companyName,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-company-name", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Company Name Updated")
                    setCompanyInfo(prevInfo => ({ ...prevInfo, companyName: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleIndustryUpdate = () => {
        const companyData = {
            id: id,
            industry: companyInfo.industry,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-company-industry", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Industry Updated")
                    setCompanyInfo(prevInfo => ({ ...prevInfo, industry: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleLocationUpdate = () => {
        const companyData = {
            id: id,
            location: companyInfo.location,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-company-location", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Location Updated")
                    setCompanyInfo(prevInfo => ({ ...prevInfo, location: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleShortDescriptionUpdate = () => {
        const companyData = {
            id: id,
            shortDescription: companyInfo.shortDescription,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-company-short-description", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Short Description Updated!")
                    setCompanyInfo(prevInfo => ({ ...prevInfo, shortDescription: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleLongDescriptionUpdate = () => {
        const companyData = {
            id: id,
            longDescription: companyInfo.longDescription,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-company-long-description", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Long Description Updated!")
                    setCompanyInfo(prevInfo => ({ ...prevInfo, longDescription: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleMissionUpdate = () => {
        const companyData = {
            id: id,
            mission: companyInfo.mission,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-company-mission", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Mission Updated!")
                    setCompanyInfo(prevInfo => ({ ...prevInfo, mission: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleVisionUpdate = () => {
        const companyData = {
            id: id,
            vision: companyInfo.vision,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-company-vision", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Vision Updated!")
                    setCompanyInfo(prevInfo => ({ ...prevInfo, vision: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleAwardUpdate = () => {
        setAwardlist(prev => [...prev, companyInfo.awards])

        const companyData = {
            id: id,
            awards: [...awardList, companyInfo.awards],
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-company-awards", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Awards Updated!")
                    setCompanyInfo(prevInfo => ({ ...prevInfo, awards: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })

    }

    const handleWebsiteUpdate = () => {
        const companyData = {
            id: id,
            website: companyInfo.website,
        }
        axios.patch("https://skillety-n6r1.onrender.com/update-company-website", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Website Updated!")
                    setCompanyInfo(prevInfo => ({ ...prevInfo, website: "" }));

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleCheckboxChange = (value) => {
        const updatedBenefits = [...selectedBenefits];

        if (updatedBenefits.includes(value)) {
            // If the value is already in the array, remove it
            updatedBenefits.splice(updatedBenefits.indexOf(value), 1);
        } else {
            // If the value is not in the array, add it
            updatedBenefits.push(value);
        }

        setSelectedBenefits(updatedBenefits);

        const companyData = {
            id: id,
            benefits: updatedBenefits,
        }

        axios.patch("https://skillety-n6r1.onrender.com/company-benefits", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("Benefits Updated!")

                    axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${clientToken}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            setCompanyDetail(res.data)
                            setSelectedBenefits(res.data.benefits)
                            setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                            setAwardlist(res.data.awards)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    };

    const handleAddManually = () => {
        if (companyInfo.manuallyAddedBenefit) {
            // const updatedCheckBox = [...checkBox, companyInfo.manuallyAddedBenefit]
            const updatedBenefits = [...selectedBenefits, companyInfo.manuallyAddedBenefit];
            //   setCheckBox(updatedCheckBox);
            //   setSelectedBenefits(updatedBenefits);
            setCompanyInfo(prev => ({ ...prev, manuallyAddedBenefit: "" }));

            const companyData = {
                id: id,
                benefits: updatedBenefits,
            }

            axios.patch("https://skillety-n6r1.onrender.com/company-benefits", companyData, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data)
                    if (!res.data.error) {
                        showSuccessMessage("Benefits Updated!")

                        axios.get(`https://skillety-n6r1.onrender.com/company-detail/${id}`, {
                            headers: {
                                Authorization: `Bearer ${clientToken}`,
                                Accept: 'application/json'
                            }
                        })
                            .then(res => {
                                console.log(res.data)
                                setCompanyDetail(res.data)
                                setSelectedBenefits(res.data.benefits)
                                setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                                setAwardlist(res.data.awards)
                            })
                            .catch(err => console.log(err))

                    }
                })
                .catch(err => {
                    console.log(err)
                    showErrorMessage()
                })

        }
    };

    useEffect(() => {
        // Function to handle scrolling to the target
        const handleScroll = (event) => {
            const target = $($(event.currentTarget).attr('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        };

        // Function to handle click on profile content top area
        const handleProfileContentClick = (event) => {
            // Toggle the content area
            $(event.currentTarget).siblings(".cli-profile-content-area").toggleClass("expanded");

            // Toggle the chevron icon
            const icon = $(event.currentTarget).find("i");
            icon.toggleClass("bi-chevron-down bi-chevron-up");
        };

        // Attach event listeners when the component mounts
        $('.pro-quick-link').on('click', handleScroll);
        $(".profile-content-top-area").on('click', handleProfileContentClick);

        // Set up initial state when the component mounts
        const firstTopArea = $(".profile-content-top-area:first");
        firstTopArea.siblings(".cli-profile-content-area").addClass("expanded");
        firstTopArea.find("i").toggleClass("bi-chevron-down bi-chevron-up");

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

        return () => {
            $('.pro-quick-link').off('click', handleScroll);
            $(".profile-content-top-area").off('click', handleProfileContentClick);
        };
    }, [id, clientToken, companyDetail, clientImg, clientImgUrl, checkBox, selectedBenefits, companyInfo, awardList]);

    /////////////
    const [isNameExpanded, setisNameExpanded] = useState(false);
    const handleNameChangeToggle = () => {
        setisNameExpanded((prev) => !prev);
    };

    const [isComTypeExpanded, setisComTypeExpanded] = useState(false);
    const handleComTypeChangeToggle = () => {
        setisComTypeExpanded((prev) => !prev);
    };

    const [isLocationExpanded, setisLocationExpanded] = useState(false);
    const handleLocationChangeToggle = () => {
        setisLocationExpanded((prev) => !prev);
    };

    const [isBenefitExpanded, setisBenefitExpanded] = useState(false);
    const handleBenefitChangeToggle = () => {
        setisBenefitExpanded((prev) => !prev);
    };

    const [isDetailExpanded, setisDetailExpanded] = useState(false);
    const handleDetailChangeToggle = () => {
        setisDetailExpanded((prev) => !prev);
    };
    //////////////

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ClientLayout />
                <div class="main-content">
                    <section class="section">
                        <div className="candidate-prrofile-section">
                            <div className="profile-head-area">
                                <div className='profile-head'>Profile Details</div>
                            </div>
                            {loading ? (
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
                                                    <Skeleton height={15} />
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
                                                    <Skeleton height={15} />
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
                                                    <Skeleton height={15} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {companyDetail &&
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
                                                                        <img src={clientImgUrl ? clientImgUrl : "../assets/img/talents-images/avatar.jpg"}
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
                                                                            <div className="profile--name text-capitalized">{companyDetail?.companyName}</div>
                                                                            <button
                                                                                className={`profile--name-edit-btn ${isNameExpanded ? 'expanded' : ''}`}
                                                                                onClick={handleNameChangeToggle}>
                                                                                <i class={`${isNameExpanded ? 'bi-x' : 'bi bi-pencil'} profile--name-edit-icon`}></i>
                                                                            </button>
                                                                        </div>
                                                                        <div className={`profile-name-edit-input-area ${isNameExpanded ? 'expanded' : ''}`}>
                                                                            <div className="row">
                                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                                    <input type="text" className="change-setting-input"
                                                                                        placeholder="Change Company Name"
                                                                                        value={companyInfo.companyName}
                                                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })} />
                                                                                    <button className="setting-update-btn" onClick={handleCompanyNameUpdate}>Update</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="profile-name-edit-input-area">
                                                            <div className="row">
                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                    <input type="text"
                                                                        className="change-setting-input"
                                                                        placeholder="Change Profile Last Name" />
                                                                    <button className="setting-update-btn">Update</button>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                                    </div>
                                                                    <div className="profile-update-status">
                                                                        Profile Last Updated :&nbsp;
                                                                        <span>{`${new Date(companyDetail?.updatedAt).getDate().toString().padStart(2, '0')}/${(new Date(companyDetail?.updatedAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(companyDetail?.updatedAt).getFullYear() % 100}`}</span>
                                                                    </div>
                                                                    <div className="prof-page-divider"></div>
                                                                    <div className="prof-more-det-section">
                                                                        <div className="prof-more-det-left-area">
                                                                            {companyDetail?.industry ?
                                                                                <div className="prof-more-det-area">
                                                                                    <div className="prof-more-det">
                                                                                        <i class="bi bi-building"></i>
                                                                                        <div className="prof-more-det-title text-capitalized">{companyDetail?.industry}</div>
                                                                                        <button
                                                                                            className={`prof-more-det-edit-btn ${isComTypeExpanded ? 'expanded' : ''}`}
                                                                                            onClick={handleComTypeChangeToggle}
                                                                                        >
                                                                                            <i class={`${isComTypeExpanded ? 'bi-x' : 'bi bi-pencil'} profile--name-edit-icon`}></i>
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className={`prof-more-det-input-area ${isComTypeExpanded ? 'expanded' : ''}`}>
                                                                                        <div className="row">
                                                                                            <div className="col-12 d-flex align-items-center gap-10">
                                                                                                <input type="text" className="change-setting-input more-det" placeholder="Change Company Type"
                                                                                                    value={companyInfo.industry}
                                                                                                    onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })} />
                                                                                                <button className="setting-update-btn more-det" onClick={handleIndustryUpdate}>Update</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div> :
                                                                                <div className="prof-more-det-area">
                                                                                    <div className="prof-more-det">
                                                                                        <i class="bi bi-building"></i>
                                                                                        <div className="prof-more-det-title text-capitalized">{companyDetail?.industry}</div>
                                                                                        <button
                                                                                            className={`prof-more-det-edit-btn ${isComTypeExpanded ? 'expanded' : ''}`}
                                                                                            onClick={handleComTypeChangeToggle}
                                                                                        >
                                                                                            <span className="add-detail">
                                                                                                {isComTypeExpanded ? 'Cancel' : 'Add Company Type'}
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className={`prof-more-det-input-area ${isComTypeExpanded ? 'expanded' : ''}`}>
                                                                                        <div className="row">
                                                                                            <div className="col-12 d-flex align-items-center gap-10">
                                                                                                <input type="text" className="change-setting-input more-det" placeholder="Add Company Type"
                                                                                                    value={companyInfo.industry}
                                                                                                    onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })} />
                                                                                                <button className="setting-update-btn more-det" onClick={handleIndustryUpdate}>Add</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }

                                                                            {companyDetail?.location ?
                                                                                <div className="prof-more-det-area">
                                                                                    <div className="prof-more-det">
                                                                                        <i class="bi bi-geo-alt"></i>
                                                                                        <div className="prof-more-det-title text-capitalized">{companyDetail?.location}</div>
                                                                                        <button
                                                                                            className={`prof-more-det-edit-btn ${isLocationExpanded ? 'expanded' : ''}`}
                                                                                            onClick={handleLocationChangeToggle}
                                                                                        >
                                                                                            <i class={`${isLocationExpanded ? 'bi-x' : 'bi bi-pencil'} profile--name-edit-icon`}></i>
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className={`prof-more-det-input-area ${isLocationExpanded ? 'expanded' : ''}`}>
                                                                                        <div className="row">
                                                                                            <div className="col-12 d-flex align-items-center gap-10">
                                                                                                <input type="text" className="change-setting-input more-det" placeholder="Change Location"
                                                                                                    value={companyInfo.location}
                                                                                                    onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })} />
                                                                                                <button className="setting-update-btn more-det" onClick={handleLocationUpdate}>Update</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div> :
                                                                                <div className="prof-more-det-area">
                                                                                    <div className="prof-more-det">
                                                                                        <i class="bi bi-geo-alt"></i>
                                                                                        <div className="prof-more-det-title text-capitalized">{companyDetail?.location}</div>
                                                                                        <button
                                                                                            className={`prof-more-det-edit-btn ${isLocationExpanded ? 'expanded' : ''}`}
                                                                                            onClick={handleLocationChangeToggle}
                                                                                        >
                                                                                            <span className="add-detail">
                                                                                                {isLocationExpanded ? 'Cancel' : 'Add Location'}
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className={`prof-more-det-input-area ${isLocationExpanded ? 'expanded' : ''}`}>
                                                                                        <div className="row">
                                                                                            <div className="col-12 d-flex align-items-center gap-10">
                                                                                                <input type="text" className="change-setting-input more-det" placeholder="Add Location"
                                                                                                    value={companyInfo.location}
                                                                                                    onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })} />
                                                                                                <button className="setting-update-btn more-det" onClick={handleLocationUpdate}>Add</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }

                                                                            {/* <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-briefcase"></i>
                                                                    <div className="prof-more-det-title"></div>
                                                                </div>
                                                            </div> */}

                                                                            {/* <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-file-earmark-text"></i>
                                                                    <div className="prof-more-det-title"></div>
                                                                    <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="text" className="change-setting-input more-det" placeholder="Add availability to join"
                                                                            />
                                                                            <button className="setting-update-btn more-det">Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                                        </div>

                                                                        <div className="prof-more-det-line"></div>

                                                                        <div className="prof-more-det-right-area">
                                                                            {/* <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-telephone"></i>
                                                                    <div className="prof-more-det-title">Phone</div>
                                                                </div>
                                                            </div> */}

                                                                            {/* <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-envelope"></i>
                                                                    <div className="prof-more-det-title">Email</div>
                                                                </div>
                                                            </div> */}

                                                                            <div className="prof-more-det-area">
                                                                                <div className="prof-more-det">
                                                                                    <i class="bi bi-telephone"></i>
                                                                                    <div className="prof-more-det-title"
                                                                                        onClick={() => window.location.href = `tel:${companyDetail?.phone}`}
                                                                                    >
                                                                                        <a className='prof-more-det-title link' href={`tel:${companyDetail?.phone}`}>
                                                                                            {companyDetail?.phone}
                                                                                        </a>
                                                                                    </div>
                                                                                    {/* <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button> */}
                                                                                </div>
                                                                                {/* <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="number" className="change-setting-input more-det" placeholder="Change Mobile Number" 
                                                                            value={companyInfo.phone}
                                                                            onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}/>
                                                                            <button className="setting-update-btn more-det" onClick={handlePhoneUpdate}>Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                                            </div>

                                                                            <div className="prof-more-det-area">
                                                                                <div className="prof-more-det">
                                                                                    <i class="bi bi-envelope"></i>
                                                                                    <div className="prof-more-det-title" onClick={() => window.location.href = `mailto:${companyDetail?.email}`}><a className='prof-more-det-title link' href={`mailto:${companyDetail?.email}`}>{companyDetail?.email}</a></div>
                                                                                    {/* <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button> */}
                                                                                </div>
                                                                                {/* <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="email" className="change-setting-input more-det" placeholder="Change Email Address"
                                                                            value={companyInfo.email}
                                                                            onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })} />
                                                                            <button className="setting-update-btn more-det" onClick={handleEmailUpdate}>Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
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
                                                        <div className="quick-link-head">Quick Links</div>
                                                        <div className="pro-quick-links-area">
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#About_Company" className='pro-quick-link'>About Company
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>

                                                            <div className='pro-quick-link-content'>
                                                                <a href="#Add_Benefits" className='pro-quick-link'>Add Benefits
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                            <div className='pro-quick-link-content'>
                                                                <a href="#Add_Awards" className='pro-quick-link'>Add Awards and Recognitions
                                                                    <i class="bi bi-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-xl-8 col-lg-8 col-md-8">
                                                    <div className="profile-content-card" id='About_Company'>
                                                        <div className="profile-content-top-area with-toggle">
                                                            <div className="profile-content-title">About Company</div>
                                                            <button className="profile-content-edit-btn">
                                                                <i class="bi bi-chevron-down toggle-icon"></i>
                                                            </button>
                                                        </div>
                                                        <div className="cli-profile-content-area">

                                                            <div className="cli-pro-detail-area m-b-40">
                                                                <div className="cli-pro-title">{companyDetail?.website ? "Change" : "Add"} Website</div>
                                                                <div className='profile-content mt-4'>
                                                                    <a href={`${companyDetail?.website}`}
                                                                        target='_blank'
                                                                        className='profile-content link is-link'>
                                                                        {companyDetail?.website}
                                                                    </a>
                                                                </div>
                                                                <div className="cli-pro-input-area">
                                                                    <input
                                                                        type="text"
                                                                        className='cli-pro-input'
                                                                        placeholder={`${companyDetail?.website ? 'Change' : 'Add'} website`}
                                                                        value={companyInfo.website}
                                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })} />
                                                                    <button className='cli-pro-add-btn' onClick={handleWebsiteUpdate}>{companyDetail?.website ? "Change" : "Add"}</button>
                                                                </div>
                                                            </div>

                                                            <div className="cli-pro-detail-area m-b-40">
                                                                <div className="cli-pro-title">{companyDetail?.shortDescription ? "Change" : "Add"} Short description</div>
                                                                <div className='profile-content mt-4'>
                                                                    {companyDetail?.shortDescription}
                                                                </div>
                                                                <div className="cli-pro-input-area">
                                                                    <textarea
                                                                        type="text"
                                                                        className='cli-pro-input'
                                                                        rows={1}
                                                                        placeholder={`${companyDetail?.shortDescription ? 'Change' : 'Add'} description`}
                                                                        value={companyInfo.shortDescription}
                                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, shortDescription: e.target.value })} />
                                                                    <button className='cli-pro-add-btn text-area' onClick={handleShortDescriptionUpdate}>{companyDetail?.shortDescription ? "Change" : "Add"}</button>
                                                                </div>
                                                            </div>

                                                            <div className="cli-pro-detail-area m-b-40">
                                                                <div className="cli-pro-title">{companyDetail?.longDescription ? "Change" : "Add"} Long description</div>
                                                                <div className='profile-content mt-4'>
                                                                    {companyDetail?.longDescription}
                                                                </div>
                                                                <div className="cli-pro-input-area">
                                                                    <textarea
                                                                        type="text"
                                                                        rows={1}
                                                                        className='cli-pro-input'
                                                                        placeholder={`${companyDetail?.longDescription ? 'Change' : 'Add'} description`}
                                                                        value={companyInfo.longDescription}
                                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, longDescription: e.target.value })} />
                                                                    <button className='cli-pro-add-btn text-area' onClick={handleLongDescriptionUpdate}>{companyDetail?.longDescription ? "Change" : "Add"}</button>
                                                                </div>
                                                            </div>

                                                            <div className="cli-pro-detail-area m-b-40">
                                                                <div className="cli-pro-title">Mission</div>
                                                                <div className='profile-content mt-4'>
                                                                    {companyDetail?.mission}
                                                                </div>
                                                                <div className="cli-pro-input-area">
                                                                    <textarea
                                                                        type="text"
                                                                        rows={1}
                                                                        className='cli-pro-input'
                                                                        placeholder={`${companyDetail?.mission ? 'Change' : 'Add'} Mission`}
                                                                        value={companyInfo.mission}
                                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, mission: e.target.value })} />
                                                                    <button className='cli-pro-add-btn text-area' onClick={handleMissionUpdate}>{companyDetail?.mission ? "Change" : "Add"}</button>
                                                                </div>
                                                            </div>

                                                            <div className="cli-pro-detail-area m-b-20">
                                                                <div className="cli-pro-title">Vision</div>
                                                                <div className='profile-content mt-4'>
                                                                    {companyDetail?.vision}
                                                                </div>
                                                                <div className="cli-pro-input-area">
                                                                    <textarea
                                                                        type="text"
                                                                        rows={1}
                                                                        className='cli-pro-input'
                                                                        placeholder={`${companyDetail?.vision ? 'Change' : 'Add'} Vision`}
                                                                        value={companyInfo.vision}
                                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, vision: e.target.value })} />
                                                                    <button className='cli-pro-add-btn text-area' onClick={handleVisionUpdate}>{companyDetail?.vision ? "Change" : "Add"}</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="profile-content-card" id='Add_Benefits'>
                                                        <div className="profile-content-top-area with-toggle">
                                                            <div className="profile-content-title">Add Benefits</div>
                                                            <button className="profile-content-edit-btn">
                                                                <i class="bi bi-chevron-down toggle-icon"></i>
                                                            </button>
                                                        </div>
                                                        <div className="cli-profile-content-area">
                                                            <div className="cli-pro-detail-area m-b-10">
                                                                <div className="cli-pro-checkbox-area">
                                                                    <div className="row">
                                                                        {checkBox.map(box => {
                                                                            return (
                                                                                <div className="col-12 col-md-6">
                                                                                    <label className="cli-pro-checkbox-input">
                                                                                        <input type="checkbox"
                                                                                            value={box}
                                                                                            checked={selectedBenefits.includes(box)}
                                                                                            onChange={() => handleCheckboxChange(box)} />
                                                                                        <span className="cli-pro-checkbox-checkmark"></span>
                                                                                        {box}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })}


                                                                        {/* <div className="col-12 col-md-6">
                                                            <label className="cli-pro-checkbox-input">
                                                                <input type="checkbox" />
                                                                <span className="cli-pro-checkbox-checkmark"></span>
                                                                Work From Home
                                                            </label>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="cli-pro-checkbox-input">
                                                                <input type="checkbox" />
                                                                <span className="cli-pro-checkbox-checkmark"></span>
                                                                Sick Leave
                                                            </label>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="cli-pro-checkbox-input">
                                                                <input type="checkbox" />
                                                                <span className="cli-pro-checkbox-checkmark"></span>
                                                                Maternity/Parental Leave
                                                            </label>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="cli-pro-checkbox-input">
                                                                <input type="checkbox" />
                                                                <span className="cli-pro-checkbox-checkmark"></span>
                                                                Job Training
                                                            </label>
                                                        </div> */}
                                                                    </div>
                                                                    <div className="add-more-input-field-area">
                                                                        <button className={`cli-pro-add-input-btn ${isBenefitExpanded ? 'expanded' : ''}`}
                                                                            onClick={handleBenefitChangeToggle}
                                                                        >
                                                                            {isBenefitExpanded ? 'Cancel' : 'Add More Benefits'}
                                                                        </button>
                                                                        <div className={`add-more-input-area ${isBenefitExpanded ? 'expanded' : ''}`}>
                                                                            <div className="row">
                                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                                    <input type="text" className="change-setting-input" placeholder="Add Benefit"
                                                                                        value={companyInfo.manuallyAddedBenefit}
                                                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, manuallyAddedBenefit: e.target.value })} />
                                                                                    <button className="setting-update-btn"
                                                                                        onClick={handleAddManually}>Add</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="profile-content-card" id='Add_Awards'>
                                                        <div className="profile-content-top-area with-toggle">
                                                            <div className="profile-content-title">Add Awards and Recognitions</div>
                                                            <button className="profile-content-edit-btn">
                                                                <i class="bi bi-chevron-down toggle-icon"></i>
                                                            </button>
                                                        </div>

                                                        <div className="cli-profile-content-area">
                                                            <div className="cli-pro-detail-area m-b-10">
                                                                {awardList.map(award => {
                                                                    return (
                                                                        <div className='profile-content mb-4'>
                                                                            {award}
                                                                        </div>
                                                                    )
                                                                })}
                                                                <div className="add-more-input-field-area">
                                                                    <button className={`cli-pro-add-input-btn ${isDetailExpanded ? 'expanded' : ''}`}
                                                                        onClick={handleDetailChangeToggle}
                                                                    >
                                                                        {isDetailExpanded ? 'Cancel' : 'Add Details'}
                                                                    </button>
                                                                    <div className={`add-more-input-area ${isDetailExpanded ? 'expanded' : ''}`}>
                                                                        <div className="row">
                                                                            <div className="col-12 d-flex align-items-center gap-10">
                                                                                <input type="text" className="change-setting-input" placeholder="Add Details"
                                                                                    value={companyInfo.awards}
                                                                                    onChange={(e) => setCompanyInfo({ ...companyInfo, awards: e.target.value })} />
                                                                                <button className="setting-update-btn" onClick={handleAwardUpdate}>Add</button>
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
                                    }
                                </div>
                            )}
                        </div>
                    </section>
                </div>
                <Footer />
            </div >
        </div >
    )
}

export default ClientProfile