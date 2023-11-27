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

const ClientProfile = () => {
    const { id } = useParams();
    const [clientToken, setClientToken] = useState("");
    const [companyDetail, setCompanyDetail] = useState();
    const [clientImg, setClientImg] = useState();
    const [clientImgUrl, setClientImgUrl] = useState("");
    const [checkBox, setCheckBox] = useState(["Health Insurance", "Work From Home", "Sick Leave", "Maternity/Parental Leave", "Job Training"]);
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [awardList, setAwardlist] = useState([]);
    

    const [companyInfo, setCompanyInfo] = useState({
        companyName:"",
        industry:"",
        location:"",
        website:"",
        shortDescription:"",
        longDescription:"",
        mission:"",
        vision:"",
        manuallyAddedBenefit:"",
        awards:"",
    })

    useEffect(() => {
        $(document).ready(function () {
            $(".profile--name-edit-btn").click(function () {
                var $nameEditSection = $(this).closest(".profile--name-edit-section");
                var $changeNameInput = $nameEditSection.find(".profile-name-edit-input-area");

                if ($changeNameInput.is(":visible")) {
                    // Collapse the text area
                    $changeNameInput.slideUp();
                    $(this).removeClass("expanded");
                    $(this).find("i").removeClass("bi-x").addClass("bi-pencil");
                } else {
                    // Expand the text area
                    $changeNameInput.slideDown();
                    $(this).addClass("expanded");
                    $(this).find("i").removeClass("bi-pencil").addClass("bi-x");
                }
            });

            $(".prof-more-det-edit-btn").on("click", function () {
                var $changeInputSection = $(this).closest(".prof-more-det-area");
                var $changeInputArea = $changeInputSection.find(".prof-more-det-input-area");

                // var type = $(this).data("type");
                if ($changeInputArea.is(":visible")) {
                    $changeInputArea.slideUp();
                    $(this).removeClass("expanded");
                    $(this).find("i").removeClass("bi-x").addClass("bi-pencil");
                    // $(this).text("Change " + type);
                } else {
                    $changeInputArea.slideDown();
                    $(this).addClass("expanded");
                    $(this).find("i").removeClass("bi-pencil").addClass("bi-x");
                    // $(this).text("Cancel");
                }
            });

            $(".cli-pro-add-input-btn").on("click", function () {
                var $changeInputSection = $(this).closest(".add-more-input-field-area");
                var $changeInputArea = $changeInputSection.find(".add-more-input-area");

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

            $('.pro-quick-link').on('click', function (event) {
                var target = $($(this).attr('href'));
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 800);
                }
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


            //////
            // Initially toggle the first profile-content-area
            let firstTopArea = $(".profile-content-top-area:first");
            firstTopArea.siblings(".cli-profile-content-area").addClass("expanded");
            firstTopArea.find("i").toggleClass("bi-chevron-down bi-chevron-up");

            $(".profile-content-top-area").click(function () {
                // Toggle the content area
                $(this).siblings(".cli-profile-content-area").toggleClass("expanded");

                // Toggle the chevron icon
                let icon = $(this).find("i");
                icon.toggleClass("bi-chevron-down bi-chevron-up");
            });
        });

    }, [id, clientToken, companyDetail, clientImg, clientImgUrl, checkBox, selectedBenefits, companyInfo, awardList]);

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

    useEffect(()=>{
        if(id && clientToken){
            axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            })
            .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setCheckBox(prevState => [...new Set([...prevState, ...res.data.benefits])]);
                setAwardlist(res.data.awards)
            })
            .catch(err=>console.log(err))

            axios.get(`https://skillety.onrender.com/client-image/${id}`)
                .then(res => setClientImg(res.data))
                .catch(err => console.log(err))
        }
    },[id, clientToken])

    console.log(checkBox)
    useEffect(() => {
        if (clientImg) {
            setClientImgUrl(`https://skillety.onrender.com/client_profile/${clientImg.image}`)
        }

    }, [clientImg]);

    const handleCompanyNameUpdate = () => {
        const companyData = {
            id: id,
            companyName: companyInfo.companyName,
        }
        axios.patch("https://skillety.onrender.com/update-company-name", companyData, {
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
                        
                axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setAwardlist(res.data.awards)
                })
                .catch(err=>console.log(err))
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
        axios.patch("https://skillety.onrender.com/update-company-industry", companyData, {
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
                        
                axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setAwardlist(res.data.awards)
                })
                .catch(err=>console.log(err))
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
        axios.patch("https://skillety.onrender.com/update-company-location", companyData, {
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
                        
                axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setAwardlist(res.data.awards)
                })
                .catch(err=>console.log(err))
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
        axios.patch("https://skillety.onrender.com/update-company-short-description", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            if (!res.data.error) {
                showSuccessMessage("Short Description Updated")
                setCompanyInfo(prevInfo => ({ ...prevInfo, shortDescription: "" }));
                        
                axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setAwardlist(res.data.awards)
                })
                .catch(err=>console.log(err))
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
        axios.patch("https://skillety.onrender.com/update-company-long-description", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            if (!res.data.error) {
                showSuccessMessage("Long Description Updated")
                setCompanyInfo(prevInfo => ({ ...prevInfo, longDescription: "" }));
                        
                axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setAwardlist(res.data.awards)
                })
                .catch(err=>console.log(err))
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
        axios.patch("https://skillety.onrender.com/update-company-mission", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            if (!res.data.error) {
                showSuccessMessage("Mission Updated")
                setCompanyInfo(prevInfo => ({ ...prevInfo, mission: "" }));
                        
                axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setAwardlist(res.data.awards)
                })
                .catch(err=>console.log(err))
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
        axios.patch("https://skillety.onrender.com/update-company-vision", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            if (!res.data.error) {
                showSuccessMessage("Vision Updated")
                setCompanyInfo(prevInfo => ({ ...prevInfo, vision: "" }));
                        
                axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setAwardlist(res.data.awards)
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err => {
            console.log(err)
            showErrorMessage()
        })
    }

    const handleAwardUpdate = () => {
        setAwardlist(prev=>[...prev, companyInfo.awards])

        const companyData = {
            id: id,
            awards: [...awardList, companyInfo.awards],
        }
        axios.patch("https://skillety.onrender.com/update-company-awards", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            if (!res.data.error) {
                showSuccessMessage("Awards Updated")
                setCompanyInfo(prevInfo => ({ ...prevInfo, awards: "" }));
                        
                axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setAwardlist(res.data.awards)
                })
                .catch(err=>console.log(err))
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
        axios.patch("https://skillety.onrender.com/update-company-website", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            if (!res.data.error) {
                showSuccessMessage("Website Updated")
                setCompanyInfo(prevInfo => ({ ...prevInfo, website: "" }));
                        
                axios.get(`https://skillety.onrender.com/company-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
                setAwardlist(res.data.awards)
                })
                .catch(err=>console.log(err))
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

        axios.patch("https://skillety.onrender.com/company-benefits", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
        .then(res=>{
            console.log(res.data)
            if (!res.data.error) {
                showSuccessMessage("Benefits Updated")
            }
        })
        .catch(err => {
            console.log(err)
            showErrorMessage()
        })
      };
    
      const handleAddManually = () => {
        if (companyInfo.manuallyAddedBenefit) {
            const updatedCheckBox = [...checkBox, companyInfo.manuallyAddedBenefit]
          const updatedBenefits = [...selectedBenefits, companyInfo.manuallyAddedBenefit];
          setCheckBox(updatedCheckBox);
          setSelectedBenefits(updatedBenefits);
          setCompanyInfo(prev=>({...prev, manuallyAddedBenefit:""}));

          const companyData = {
            id: id,
            benefits: updatedBenefits,
        }

          axios.patch("https://skillety.onrender.com/company-benefits", companyData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
        .then(res=>{
            console.log(res.data)
            if (!res.data.error) {
                showSuccessMessage("Benefits Updated")
            }
        })
        .catch(err => {
            console.log(err)
            showErrorMessage()
        })

        }
      };
    
    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ClientLayout />
                {companyDetail && <div class="main-content">
                    <section class="section">
                        <div className="candidate-prrofile-section">
                            <div className="profile-head-area">
                                <div className='profile-head'>Profile Details</div>
                            </div>
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
                                                        <img src={clientImgUrl ? clientImgUrl : "../assets/img/talents-images/avatar.jpg"} className='profile-det-image' alt="" />
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
                                                            <div className="profile--name">{companyDetail?.companyName}</div>
                                                            <button className='profile--name-edit-btn'>
                                                                <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                            </button>
                                                        </div>
                                                        <div className="profile-name-edit-input-area">
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
                                                            <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-building"></i>
                                                                    <div className="prof-more-det-title">{companyDetail?.industry}</div>
                                                                    <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="text" className="change-setting-input more-det" placeholder="Change Company Type" 
                                                                            value={companyInfo.industry}
                                                                            onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })}/>
                                                                            <button className="setting-update-btn more-det" onClick={handleIndustryUpdate}>Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="prof-more-det-area">
                                                                <div className="prof-more-det">
                                                                    <i class="bi bi-geo-alt"></i>
                                                                    <div className="prof-more-det-title">{companyDetail?.location}</div>
                                                                    <button className="prof-more-det-edit-btn">
                                                                        <i class="bi bi-pencil profile--name-edit-icon"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="prof-more-det-input-area">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex align-items-center gap-10">
                                                                            <input type="text" className="change-setting-input more-det" placeholder={companyDetail?.location ? "Change Location" : "Add Location"}
                                                                            value={companyInfo.location}
                                                                            onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })} />
                                                                            <button className="setting-update-btn more-det" onClick={handleLocationUpdate}>{companyDetail?.location ?"Update" : "Add"}</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

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
                                                                    <div className="prof-more-det-title" onClick={()=>window.location.href = `tel:${companyDetail?.phone}`}><a className='setting-value link' href={`tel:${companyDetail?.phone}`}>{companyDetail?.phone}</a></div>
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
                                                                    <div className="prof-more-det-title" onClick={()=> window.location.href = `mailto:${companyDetail?.email}`}><a className='setting-value link' href={`mailto:${companyDetail?.email}`}>{companyDetail?.email}</a></div>
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
                                                    {companyDetail?.website}
                                                </div>
                                                <div className="cli-pro-input-area">
                                                    <input
                                                        type="text"
                                                        className='cli-pro-input'
                                                        placeholder='Add description' 
                                                        value={companyInfo.website}
                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}/>
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
                                                        placeholder='Add description' 
                                                        value={companyInfo.shortDescription}
                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, shortDescription: e.target.value })}/>
                                                    <button className='cli-pro-add-btn' onClick={handleShortDescriptionUpdate}>{companyDetail?.shortDescription ? "Change" : "Add"}</button>
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
                                                        className='cli-pro-input'
                                                        placeholder='Add description'
                                                        value={companyInfo.longDescription}
                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, longDescription: e.target.value })} />
                                                    <button className='cli-pro-add-btn' onClick={handleLongDescriptionUpdate}>{companyDetail?.longDescription ? "Change" : "Add"}</button>
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
                                                        className='cli-pro-input'
                                                        placeholder='Add Mision'
                                                        value={companyInfo.mission}
                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, mission: e.target.value })} />
                                                    <button className='cli-pro-add-btn' onClick={handleMissionUpdate}>{companyDetail?.mission ? "Change" : "Add"}</button>
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
                                                        className='cli-pro-input'
                                                        placeholder='Add Vision'
                                                        value={companyInfo.vision}
                                                        onChange={(e) => setCompanyInfo({ ...companyInfo, vision: e.target.value })} />
                                                    <button className='cli-pro-add-btn' onClick={handleVisionUpdate}>{companyDetail?.vision ? "Change" : "Add"}</button>
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
                                                        {checkBox.map(box=>{
                                                            return(
                                                                <div className="col-12 col-md-6">
                                                                <label className="cli-pro-checkbox-input">
                                                                    <input type="checkbox" 
                                                                    value={box}
                                                                    checked={selectedBenefits.includes(box)}
                                                                    onChange={()=>handleCheckboxChange(box)}/>
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
                                                        <button className='cli-pro-add-input-btn' data-type="More Benefits">
                                                            {/* <i class="bi bi-plus"></i> */}
                                                            Add More Benefits
                                                        </button>
                                                        <div className="add-more-input-area">
                                                            <div className="row">
                                                                <div className="col-12 d-flex align-items-center gap-10">
                                                                    <input type="text" className="change-setting-input" placeholder="Add Benefit"
                                                                    value={companyInfo.manuallyAddedBenefit}
                                                                    onChange={(e) => setCompanyInfo({...companyInfo, manuallyAddedBenefit:e.target.value})} />
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
                                        {awardList.map(award=>{
                                            return(
                                                <div className='profile-content mt-4'>
                                                    {award}
                                                </div>
                                            )
                                        })}
                                        
                                        <div className="cli-profile-content-area">
                                            <div className="cli-pro-detail-area m-b-10">
                                                <div className="add-more-input-field-area">
                                                    <button className='cli-pro-add-input-btn' data-type="More Details">
                                                        {/* <i class="bi bi-plus"></i> */}
                                                        Add Details
                                                    </button>
                                                    <div className="add-more-input-area">
                                                        <div className="row">
                                                            <div className="col-12 d-flex align-items-center gap-10">
                                                                <input type="text" className="change-setting-input" placeholder="Add Details" 
                                                                value={companyInfo.awards}
                                                                onChange={(e) => setCompanyInfo({ ...companyInfo, awards: e.target.value })}/>
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
                    </section>
                </div>}
                <Footer />
            </div >
        </div >
    )
}

export default ClientProfile