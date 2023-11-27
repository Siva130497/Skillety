import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import './SettingsClient.css';
import './SettingsClient-responsive.css';
import $ from 'jquery';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const SettingsClient = () => {
    const [clientToken, setClientToken] = useState("");
    const { getProtectedData } = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState([]);
    const [clientImg, setClientImg] = useState();
    const [clientImgUrl, setClientImgUrl] = useState("");
    const [image, setImage] = useState();

    const [companyDetail, setCompanyDetail] = useState();
    const [selectedBenefits, setSelectedBenefits] = useState([]);

    const [userInfo, setUserInfo] = useState({
        email: "",
        phone: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    useEffect(() => {
        setUserInfo({
            ...userInfo,
            email: loginClientDetail?.email,
            phone: loginClientDetail?.phone,
        })
    }, [loginClientDetail])

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

    useEffect(() => {
        $(document).ready(function () {
            // $(".setting-change-btn").on("click", function () {
            //     var $changeInputArea = $(this).prev(".change-input-area");
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

            // $(".setting-change-btn").on("click", function () {
            //     var $changeInputArea = $(this).prev(".change-input-area");
            //     var type = $(this).data("type");
            //     if ($changeInputArea.is(":visible")) {
            //         $changeInputArea.css("max-height", 0);
            //         $(this).removeClass("expanded");
            //         $(this).text("Change " + type);
            //     } else {
            //         $changeInputArea.css("max-height", $changeInputArea[0].scrollHeight + "px");
            //         $(this).addClass("expanded");
            //         $(this).text("Cancel");
            //     }
            // });

            $(".setting-value.password").each(function () {
                var originalText = $(this).text();
                var maskedText = Array(originalText.length + 1).join('.');
                $(this).text(maskedText);

                // $(this).click(function() {
                //     if ($(this).text() === originalText) {
                //         $(this).text(maskedText);
                //     } else {
                //         $(this).text(originalText);
                //     }
                // });
            });

            $("#confirm-password").on("input", function () {
                var newPassword = $("#new-password").val();
                var confirmPassword = $(this).val();
                var errorMessage = $("#error-message");

                if (newPassword === confirmPassword) {
                    errorMessage.text("");
                } else {
                    errorMessage.text("Passwords do not match. Please check and try again.");
                }
            });

            $(".show-btn").click(function () {
                var passwordField = $(this).prev(".change-setting-input");
                var icon = $(this).find("i");

                if (passwordField.attr("type") === "password") {
                    passwordField.attr("type", "text");
                    icon.removeClass("bi-eye-slash").addClass("bi-eye");
                } else {
                    passwordField.attr("type", "password");
                    icon.removeClass("bi-eye").addClass("bi-eye-slash");
                }
            });

            // Trigger the file input when the image is clicked
            $(".upload-label").click(function (e) {
                e.preventDefault();
                $("#imageUpload").click();
            });

            // Handle the image selection and display
            $("#imageUpload").change(function () {
                var file = this.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function (e) {

                        $(".company-logo").attr("src", e.target.result);
                        $("#updateButton").show();
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Handle the "Update" button click event
            $("#updateButton").click(function () {
                alert("Update functionality goes here");
            });

            // $(".com-detail-edit-btn").click(function () {
            //     var $settingContent = $(this).closest(".setting-content");
            //     var $changeTextArea = $settingContent.find(".change-text-area");

            //     if ($changeTextArea.is(":visible")) {
            //         // Collapse the text area
            //         $changeTextArea.slideUp();
            //         $(this).removeClass("expanded");
            //         $(this).find("i").removeClass("bi-x").addClass("bi-pencil-fill");
            //     } else {
            //         // Expand the text area
            //         $changeTextArea.slideDown();
            //         $(this).addClass("expanded");
            //         $(this).find("i").removeClass("bi-pencil-fill").addClass("bi-x");
            //     }
            // });
        });

    }, [clientToken, loginClientDetail]);

    useEffect(() => {
        setClientToken(JSON.parse(localStorage.getItem('clientToken')))
    }, [clientToken])

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

    useEffect(() => {
        if (employeeId) {
            getLoginClientDetail();
        }
    }, [employeeId]);

    useEffect(() => {
        if (loginClientDetail.companyId) {
            axios.get(`http://localhost:5002/client-image/${loginClientDetail.companyId}`)
                .then(res => setClientImg(res.data))
                .catch(err => console.log(err))

                axios.get(`http://localhost:5002/company-detail/${loginClientDetail.companyId}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res=>{
                    console.log(res.data)
                    setCompanyDetail(res.data)
                    setSelectedBenefits(res.data.benefits)
                })
                .catch(err=>console.log(err))
        }
    }, [loginClientDetail.companyId]);

    useEffect(() => {
        if (clientImg) {
            setClientImgUrl(`http://localhost:5002/client_profile/${clientImg.image}`)
        }

    }, [clientImg]);

    useEffect(() => {
        if (image) {
            setClientImgUrl(URL.createObjectURL(image));
        }
    }, [image]);

    const handleEmailUpdate = () => {
        const userData = {
            id: loginClientDetail.id,
            email: userInfo.email,
        }
        axios.patch("http://localhost:5002/update-client-email", userData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("email updated")
                    setUserInfo(prevUserInfo => ({ ...prevUserInfo, email: "" }));
                    getLoginClientDetail();
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage();
            })
    }

    const handlePhoneUpdate = () => {
        const userData = {
            id: loginClientDetail.id,
            phone: userInfo.phone,
        }
        axios.patch("http://localhost:5002/update-client-phone", userData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("phone no updated")
                    setUserInfo(prevUserInfo => ({ ...prevUserInfo, phone: "" }));
                    getLoginClientDetail();
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage();
            })
    }

    const handlePasswordUpdate = () => {
        const userData = {
            id: loginClientDetail.id,
            currentPassword: userInfo.currentPassword,
            newPassword: userInfo.newPassword,
        }
        axios.patch("http://localhost:5002/update-client-password", userData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.error) {
                    showSuccessMessage("password updated")
                    setUserInfo(prevUserInfo => ({ ...prevUserInfo, currentPassword: "" , newPassword: "", confirmPassword: ""}));
                    getLoginClientDetail();
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMessage();
            })
    }


    const handlePhotoUpdate = () => {
        if (clientImg) {
            const formData = new FormData()
            formData.append('image', image);
            axios.patch(`http://localhost:5002/update-client-profile-image/${loginClientDetail.companyId}`, formData, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res);
                    showSuccessMessage("profile photo updated")
                    setImage(null);
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                    showErrorMessage()
                });
        } else {
            const formData = new FormData()
            formData.append('image', image);
            formData.append('id', loginClientDetail.companyId)
            axios.post("http://localhost:5002/upload-client-profile-image", formData, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res);
                    showSuccessMessage("profile photo updated")
                    setImage(null);
                    window.location.reload()
                })
                .catch(err =>{
                    console.log(err)
                    showErrorMessage()
                });
        }

    }

    /////////////
    const [isProfileImageExpanded, setIsProfileImageExpanded] = useState(false);
    const handleProfileImageToggle = () => {
        setIsProfileImageExpanded((prev) => !prev);
    };

    const [isEmailExpanded, setIsEmailExpanded] = useState(false);
    const handleEmailToggle = () => {
        setIsEmailExpanded((prev) => !prev);
    };

    const [isMobileExpanded, setIsMobileExpanded] = useState(false);
    const handleMobileToggle = () => {
        setIsMobileExpanded((prev) => !prev);
    };

    const [isPasswordExpanded, setIsPasswordExpanded] = useState(false);
    const handlePasswordToggle = () => {
        setIsPasswordExpanded((prev) => !prev);
    };

    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
    const handleDetailsToggle = () => {
        setIsDetailsExpanded((prev) => !prev);
    };

    const [isPerksExpanded, setIsPerksExpanded] = useState(false);
    const handlePerksToggle = () => {
        setIsPerksExpanded((prev) => !prev);
    };

    const [isWebsite1Expanded, setIsWebsite1Expanded] = useState(false);
    const handleWebsite1Toggle = () => {
        setIsWebsite1Expanded((prev) => !prev);
    };
    //////////

    return (
        <div>
            {clientToken && <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ClientLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="settings-section">
                            <div className="card settings-area">
                                <div className="card-header">
                                    <h4 className='setting-head'>Settings
                                        <i class="bi bi-gear-fill"></i></h4>
                                </div>
                                <div className="card-body">
                                    <ul className="nav nav-pills" id="myTab3" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="account-tab" data-toggle="tab" href="#Account" role="tab"
                                                aria-controls="account" aria-selected="true">Account</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="job-pref-tab" data-toggle="tab" href="#JobPref" role="tab"
                                                aria-controls="jobpref" aria-selected="false">Company Profile</a>
                                        </li>
                                        {/* <li className="nav-item">
                                            <a className="nav-link" id="notification-tab" data-toggle="tab" href="#Notification" role="tab"
                                                aria-controls="notification" aria-selected="false">Notifications</a>
                                        </li> */}
                                    </ul>
                                    <div className="tab-content settings-tab-content" id="myTabContent2">
                                        <div className="tab-pane fade show active" id="Account" role="tabpanel" aria-labelledby="account-tab">
                                            <div className="setting-content">
                                                <div className='setting-title'>Account Settings</div>
                                                <div className='setting-sub'>Change your company profile photo, email, mobile number or password</div>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Company Profile photo</div>
                                                <div className='image-upload-img-area'>
                                                    <img src={clientImgUrl ? clientImgUrl : "../assets/img/talents-images/avatar.jpg"} className='image-upload-img' alt="" />
                                                </div>
                                                <div className={`change-input-area ${isProfileImageExpanded ? 'expanded' : ''}`}>
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10 mt-4 mb-2">
                                                            <input type='file' className='change-setting-input file' onChange={e => setImage(e.target.files[0])} />
                                                            <button className='setting-update-btn' onClick={handlePhotoUpdate}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className={`setting-change-btn ${isProfileImageExpanded ? 'expanded' : ''}`} data-type="Profile Image" onClick={handleProfileImageToggle}>
                                                    {isProfileImageExpanded ? 'Cancel' : `Change Profile Image`}
                                                </button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Email Address</div>
                                                <div className='setting-value' onClick={()=> window.location.href = `mailto:${loginClientDetail.email}`}><a className='setting-value link' href={`mailto:${loginClientDetail.email}`}>{loginClientDetail.email}</a></div>
                                                <div className={`change-input-area ${isEmailExpanded ? 'expanded' : ''}`}>
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10 mt-4 mb-2">
                                                            <input type="email" className='change-setting-input' placeholder='Change Email'
                                                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                                                            <button className='setting-update-btn' onClick={handleEmailUpdate}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className={`setting-change-btn ${isEmailExpanded ? 'expanded' : ''}`} data-type="Email" onClick={handleEmailToggle}>
                                                    {isEmailExpanded ? 'Cancel' : `Change Email`}
                                                </button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Mobile Number</div>
                                                <div className='setting-value'onClick={()=>window.location.href = `tel:${loginClientDetail.phone}`}><a className='setting-value link' href={`tel:${loginClientDetail.phone}`}>{loginClientDetail.phone}</a></div>
                                                <div className={`change-input-area ${isMobileExpanded ? 'expanded' : ''}`}>
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10 mt-4 mb-2">
                                                            <input type="number" className='change-setting-input' placeholder='Change Mobile Number' onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
                                                            <button className='setting-update-btn' onClick={handlePhoneUpdate}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className={`setting-change-btn ${isMobileExpanded ? 'expanded' : ''}`} data-type="Mobile Number" onClick={handleMobileToggle}>
                                                    {isMobileExpanded ? 'Cancel' : `Change Mobile Number`}
                                                </button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Password</div>
                                                <div className='setting-value password'>Password</div>
                                                <div className={`change-input-area ${isPasswordExpanded ? 'multi-input-expanded' : ''}`}>
                                                    <div className="row mt-4">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6">
                                                            <input type="password" className='change-setting-input' placeholder='Current Password' onChange={(e) => setUserInfo({ ...userInfo, currentPassword: e.target.value })} />
                                                            <button class="show-btn">
                                                                <i class="bi bi-eye-slash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6">
                                                            <input type="password" className='change-setting-input' placeholder='New Password' id="new-password" onChange={(e) => setUserInfo({ ...userInfo, newPassword: e.target.value })} />
                                                            <button class="show-btn">
                                                                <i class="bi bi-eye-slash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6">
                                                            <input type="password" className='change-setting-input' placeholder='Confirm Password' id="confirm-password" onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })} />
                                                            <button class="show-btn">
                                                                <i class="bi bi-eye-slash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <small id="error-message" className='text-danger'></small><br />
                                                    <button className='setting-update-btn mt-2 mb-3' id="update-btn" onClick={handlePasswordUpdate}>Update</button>
                                                </div>
                                                <button className={`setting-change-btn ${isPasswordExpanded ? 'expanded' : ''}`} data-type="Password" onClick={handlePasswordToggle}>
                                                    {isPasswordExpanded ? 'Cancel' : `Change Password`}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="JobPref" role="tabpanel" aria-labelledby="job-pref-tab">
                                            <div className="setting-content">
                                                <div className="company-logo-name-area">
                                                    <div className="company-logo-area">
                                                        {/* <input type="file" id="imageUpload" accept="image/*" /> */}
                                                        <label htmlFor="imageUpload" className="upload-label mb-0">
                                                            <img src={clientImgUrl ? clientImgUrl : "../assets/img/talents-images/avatar.jpg"} className="company-logo" alt="Company Logo" />
                                                        </label>
                                                    </div>
                                                    <div className="company-name-area">
                                                        <div className="company-name">Company Logo</div>
                                                        <button id="updateButton">Update</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name d-flex align-items-center gap-10'>
                                                    Details of Company
                                                    {/* <button className={`com-detail-edit-btn ${isDetailsExpanded ? 'expanded' : ''}`} onClick={handleDetailsToggle}>
                                                        <i class={`bi ${isDetailsExpanded ? 'bi-x' : 'bi-pencil-fill'}`}></i>
                                                    </button> */}
                                                </div>
                                                <div className='setting-value pt-3'>
                                                    {companyDetail?.shortDescription}
                                                    <br />
                                                    {companyDetail?.longDescription}
                                                </div>

                                                {/* <div className={`change-text-area ${isDetailsExpanded ? 'expanded' : ''}`}>
                                                    <div className="row mt-4">
                                                        <div className="col-12">
                                                            <textarea rows={5} className='change-setting-input' placeholder='Change Company Detail'></textarea>
                                                            <button className='setting-update-btn mt-3'>Update</button>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Website</div>
                                                <div className='setting-value'><a href={companyDetail?.website}>{companyDetail?.website}</a></div>
                                                {/* <div className={`change-input-area ${isWebsite1Expanded ? 'expanded' : ''}`}>
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10 mt-4 mb-2">
                                                            <input type="email" className='change-setting-input' placeholder='Change Website' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className={`setting-change-btn ${isWebsite1Expanded ? 'expanded' : ''}`} data-type="Website" onClick={handleWebsite1Toggle}>
                                                    {isWebsite1Expanded ? 'Cancel' : `Change Website`}
                                                </button> */}
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name d-flex align-items-center gap-10'>
                                                    Perks to work with us
                                                    {/* <button className={`com-detail-edit-btn ${isPerksExpanded ? 'expanded' : ''}`} onClick={handlePerksToggle}>
                                                        <i class={`bi ${isPerksExpanded ? 'bi-x' : 'bi-pencil-fill'}`}></i>
                                                    </button> */}
                                                </div>
                                                {/* <div className='setting-value pt-3'>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                </div> */}
                                                <ul className='perks-content'>
                                                    {selectedBenefits.map(perk=>{
                                                        return(
                                                            <li className='perks-list-item'>{perk}</li>
                                                        )
                                                    })}
                                                    
                                                    {/* <li className='perks-list-item'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li>
                                                    <li className='perks-list-item'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li>
                                                    <li className='perks-list-item'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li>
                                                    <li className='perks-list-item'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li> */}
                                                </ul>

                                                {/* <div className={`change-text-area ${isPerksExpanded ? 'expanded' : ''}`}>
                                                    <div className="row mt-4">
                                                        <div className="col-12">
                                                            <textarea rows={5} className='change-setting-input' placeholder='Change Perks Details'></textarea>
                                                            <button className='setting-update-btn mt-3'>Update</button>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>

                                            {/* <div className="setting-content">
                                                <div className='setting-name'>Website</div>
                                                <div className='setting-value'>https/mindtree.com</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="email" className='change-setting-input' placeholder='Change Website' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Website">Change Website</button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Website</div>
                                                <div className='setting-value'>https/mindtree.com</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="email" className='change-setting-input' placeholder='Change Website' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Website">Change Website</button>
                                            </div>

                                            <div className="setting-content">
                                                <div className='setting-name'>Website</div>
                                                <div className='setting-value'>https/mindtree.com</div>
                                                <div className="change-input-area">
                                                    <div className="row">
                                                        <div className="col-12 col-xl-5 col-lg-5 col-md-6 d-flex align-items-center gap-10">
                                                            <input type="email" className='change-setting-input' placeholder='Change Website' />
                                                            <button className='setting-update-btn'>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="setting-change-btn" data-type="Website">Change Website</button>
                                            </div> */}

                                        </div>

                                        {/* <div className="tab-pane fade" id="Notification" role="tabpanel" aria-labelledby="notification-tab">
                                            
                                        </div> */}
                                    </div>
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

export default SettingsClient