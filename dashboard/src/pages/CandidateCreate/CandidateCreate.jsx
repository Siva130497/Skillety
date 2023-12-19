import React, { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import $ from 'jquery';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const CandidateCreate = () => {
    const [step, setStep] = useState(1);
    const [isAgreed, setIsAgreed] = useState(false);
    const { candidateReg, result } = useContext(AuthContext);
    const [skillArray, setSkillArray] = useState([]);
    const [designationArray, setDesignationArray] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedDesignations, setSelectedDesignations] = useState([]);
    const [dateString, setDateString] = useState("");
    const [resume, setResume] = useState([]);
    const [searchDesignationInput, setSearchDesignationInput] = useState("");
    const [searchSkillInput, setSearchSkillInput] = useState("");
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [filteredDesignation, setFilteredDesignation] = useState([]);
    const [skillError, setSkillError] = useState("");
    const [isCheckedDesignation, setIsCheckedDesignation] = useState(false);
    const [isCheckedSkill, setIsCheckedSkill] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [newDesignation, setNewDesignation] = useState("");
    const [otherSkill, setOtherSkill] = useState([]);
    const [otherDesignation, setOtherDesignation] = useState([]);
    const [profile, setProfile] = useState([]);
    const [totalMonths, setTotalMonths] = useState();
    const [maxSkillNum, setMaxSkillNum] = useState();
    const [minSkillNum, setMinSkillNum] = useState();

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);
    const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState(false);
    const [require, setRequire] = useState(false)
    const [skillAlert, setSkillAlert] = useState("");
    const [designationAlert, setDesignationAlert] = useState("");

    const fileInputRef = useRef(null);

    const initialCredentials = {
        days: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        year: "",
        month: "",
        profileHeadline: "",
        college: "",
        checkbox: false,
    };
    const [credentials, setCredentials] = useState(initialCredentials);
    const [locationArray, setLocationArray] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [searchLocationInput, setSearchLocationInput] = useState("");
    const [educationArray, setEducationArray] = useState([]);
    const [searchEducationInput, setSearchEducationInput] = useState("");
    const [filteredEducation, setFilteredEducation] = useState([]);
    const [selectedEducation, setSelectedEducation] = useState([]);

    const [spinStatus, setSpinStatus] = useState(false);

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
            title: 'Alert',
            text: message,
            icon: 'info',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    useEffect(()=>{
        if(result){
            setSpinStatus(false)
        }
    },[result])

    // useEffect(() => {
    //     setCredentials((prevCredentials) => ({
    //         ...prevCredentials,
    //         firstName: profile.family_name ? profile.family_name : "",
    //         lastName: profile.given_name ? profile.given_name : "",
    //         email: profile.email ? profile.email : "",
    //     }));
    // }, [profile]);

    useEffect(() => {
        if (credentials.year && credentials.month) {
            setTotalMonths(parseInt(credentials.year * 12) + parseInt(credentials.month))
        }
    }, [credentials])

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
            const res = await axios.get("https://skillety.onrender.com/skills");
            setSkillArray(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getAllDesignations = async () => {
        try {
            const res = await axios.get("https://skillety.onrender.com/designations");
            setDesignationArray(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getAllLocations = async () => {
        try {
            const res = await axios.get("https://skillety.onrender.com/locations", {
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

    const getAllEducation = async () => {
        try {
            const res = await axios.get("https://skillety.onrender.com/educations", {
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


    //post new skill
    const postOtherSkills = async (skills) => {
        try {
            const res = await axios.post("https://skillety.onrender.com/skills", skills, {
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

    //post new designation
    const postOtherDesignation = async (designation) => {
        try {
            const res = await axios.post("https://skillety.onrender.com/designations", designation, {
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
        getAllDesignations();
        getAllLocations();
        getAllEducation();

        $(document).ready(function () {
            $('#file_upload').on('change', function () {
                $('#file-chosen').text(this.files[0].name);
            });

        });
        $(".reg--form-btn-sub").click(function () {
            $("html, body").animate({ scrollTop: 0 }, 0);
        });
    }, [])


    const handleDateChange = date => {
        setSelectedDate(date);

        if (date) {
            const dateString = date.toLocaleDateString('en-GB');
            setDateString(dateString);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (name === "password") {
            if (value.length < 8) {
                setPasswordErrorMsg(true);
            } else {
                setPasswordErrorMsg(false);
            }
        }

        if (name === "confirmPassword") {
            if (value !== credentials.password) {
                setConfirmPasswordErrorMsg(true);
            } else {
                setConfirmPasswordErrorMsg(false);
            }
        }


        if (name === "confirmPassword") {
            if (value.length < 8) {
                setPasswordErrorMsg(true);
            } else {
                setPasswordErrorMsg(false);
            }
        }

        if (type === "checkbox") {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                checkbox: checked,
            }));
        } else {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value,
            }));
        }
    };


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setResume(selectedFile);
    };

    const handleSkillSearch = (e) => {
        const inputValue = e.target.value;
        setSearchSkillInput(inputValue);
        if (inputValue.length > 0) {
            const candidateSkills = skillArray.filter((obj) => {
                return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (candidateSkills.length > 0) {
                setFilteredSkills(candidateSkills);
            }
        } else {
            setFilteredSkills([]);
        }
    }

    const handleDesignationSearch = (e) => {
        setDesignationAlert("")
        const inputValue = e.target.value;
        setSearchDesignationInput(inputValue);
        if (inputValue.length > 0) {
            const candidateDesignation = designationArray.filter((obj) => {
                return obj.designation.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (candidateDesignation.length > 0) {
                setFilteredDesignation(candidateDesignation);
            }
        } else {
            setFilteredDesignation([]);
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
                selectedSkills.length === maxSkillNum && setSkillError(`You can select max of ${maxSkillNum} skills`)
                setSearchSkillInput("");
                setFilteredSkills([]);
                if (selectedSkills.length < maxSkillNum) {
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

    const handleDesignationClick = (designation) => {
        setSelectedDesignations([designation]);
        setSearchDesignationInput("");
        setFilteredDesignation([]);
    }

    const handleDeselect = (skill) => {
        setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
        setOtherSkill(otherSkill.filter(other => other !== skill));
    }

    const handleDeselectDesignation = (designation) => {
        setSelectedDesignations(selectedDesignations.filter(selectedDesignation => selectedDesignation !== designation));
        setOtherDesignation(otherDesignation.filter(other => other !== designation));
    }

    const handleManualSkill = () => {
        if (totalMonths > 0) {
            setSkillError("")
            setSearchSkillInput("");
            if (selectedSkills.length === maxSkillNum) {
                setSkillError(`You can select max of ${maxSkillNum} skills`);
                setNewSkill("");
            }
            if (selectedSkills.length < maxSkillNum) {
                setSkillError("")
                const foundObject = skillArray.find(item => item.skill.toLowerCase() === newSkill.toLowerCase());
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

    const handleManualDesignation = () => {
        setSearchDesignationInput("");
        const foundObject = designationArray.find(item => item.designation.toLowerCase() === newDesignation.toLowerCase());
        if (foundObject) {
            setDesignationAlert(`Designation "${newDesignation}" already in list, please search...`);
            setNewDesignation("");
        } else {
            setOtherDesignation([newDesignation]);
            setSelectedDesignations([newDesignation]);
            setNewDesignation("");
        }
    }

    const handleEducationSearch = (e) => {
        const inputValue = e.target.value;
        setSearchEducationInput(inputValue);
        if (inputValue.length > 0) {
            const educations = educationArray.filter((obj) => {
                return obj.education.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (educations.length > 0) {
                setFilteredEducation(educations);
            }
        } else {
            setFilteredEducation([]);
        }
    };

    const handleEducationClick = (education) => {
        setSelectedEducation([education]);
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
        if (inputValue.length > 0) {
            const Locations = locationArray.filter((obj) => {
                return obj.location.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (Locations.length > 0) {
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


    const handleSubmit = (event) => {
        event.preventDefault();
        setSpinStatus(true)
        if (credentials.profileHeadline) {
            
                const formData = new FormData();
                const id = uuidv4();
                formData.append('file', resume);
                formData.append('id', id);
                const updatedCredentials = {
                    ...credentials,
                    confirmPassword: undefined,
                    selectedDate: dateString,
                    skills: selectedSkills,
                    designation: selectedDesignations,
                    education: selectedEducation[0],
                    location: selectedLocations[0],
                    id: id,
                };
                console.log(updatedCredentials);
                candidateReg(updatedCredentials);
                otherSkill.length > 0 && postOtherSkills(otherSkill);
                otherDesignation.length > 0 && postOtherDesignation(otherDesignation);
                axios.post('https://skillety.onrender.com/upload', formData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            

        }

    };

    const handleNext = () => {
        let isValid = true;
        if (step === 1) {

            if (credentials.days === "" || credentials.firstName === "" || credentials.lastName === "" || credentials.phone === "" || credentials.email === "" || credentials.password === "" || credentials.confirmPassword === "" || credentials.password !== credentials.confirmPassword || resume.length === 0 || credentials.password.length < 8 || !(emailRegex.test(credentials.email))) {
                // if (credentials.password.length < 8) {
                //     return showErrorMessage("password must be atleast 8 characters long")
                // } else if (credentials.password !== credentials.confirmPassword) {
                //     return showErrorMessage("Please check that both password and confirm password are same")
                // } else if (!(emailRegex.test(credentials.email))) {
                //     return showErrorMessage("Please enter a valid email address")
                // }
                setRequire(true)
                isValid = false;
            }
        }
        if (step === 2) {
            if (selectedDesignations.length === 0 || credentials.companyName === "" || selectedLocations.length === 0 || credentials.year === "" || credentials.month === "" || selectedSkills.length === 0 || selectedEducation.length === 0 || credentials.college === "" || selectedSkills.length < minSkillNum) {
                if (selectedSkills.length < minSkillNum) {
                    return setSkillError(`Please select atleast ${minSkillNum} skills`)
                }
                setRequire(false)
                isValid = false;

            }
        }
        // if (step === 3) {
        //     if (credentials.profileHeadline === "") {
        //         setRequire(true);
        //     }
        // }
        if (isValid) {
            setStep(step + 1);
        }
    };


    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <div className="cli--reg-heading-area">
                            <h3 className='cli--reg-heading' data-aos="fade-left">Hi, Welcome to <span>SKILLETY!!!</span></h3>
                        </div>
                        
                        <div className="cand--reg-form-area" data-aos="fade-up">
                            <div className="row">
                                <div className="col-12">
                                    <div className="cand--reg-form-group cand--reg-custom-padding">
                                        <label htmlFor="days" className='cand--reg-form-label-custom'>In How many days can you Join? Please select one bucket</label>
                                        <div className="cand--reg-radio-input-group">
                                            <div className="cand--reg-input-container">
                                                <input id="day_option_1" className="radio-button" type="radio" name="days" value="0 to 7 days" onChange={handleInputChange} />
                                                <div className="radio-tile">
                                                    <label for="day_option_1" className="radio-tile-label">0 to 7 days</label>
                                                </div>
                                            </div>

                                            <div className="cand--reg-input-container">
                                                <input id="day_option_2" className="radio-button" type="radio" name="days"
                                                    value="8 to 15 days"
                                                    onChange={handleInputChange} />
                                                <div className="radio-tile">
                                                    <label for="day_option_2" className="radio-tile-label">8 to 15 days</label>
                                                </div>
                                            </div>

                                            <div className="cand--reg-input-container">
                                                <input id="day_option_3" className="radio-button" type="radio" name="days"
                                                    value="16 to 30 days"
                                                    onChange={handleInputChange} />
                                                <div className="radio-tile">
                                                    <label for="day_option_3" className="radio-tile-label">16 to 30 days</label>
                                                </div>
                                            </div>

                                            <div className="cand--reg-input-container">
                                                <input id="day_option_4" className="radio-button" type="radio" name="days"
                                                    value="More than 30 days"
                                                    onChange={handleInputChange} />
                                                <div className="radio-tile">
                                                    <label for="day_option_4" className="radio-tile-label">More than 30 days</label>
                                                </div>
                                            </div>

                                            <div className="cand--reg-input-container">
                                                <input id="day_option_5" className="radio-button" type="radio" name="days"
                                                    value="Currently not serving notice period"
                                                    onChange={handleInputChange} />
                                                <div className="radio-tile">
                                                    <label for="day_option_4" className="radio-tile-label"> Currently not serving notice period</label>
                                                </div>
                                            </div>
                                        </div>

                                        {require && <small className='text-danger text-capitalized'>{credentials.days === "" && "required"}</small>}

                                        <div className="form-check form-switch imediate-switch">
                                            <input
                                                className="form-check-input imediate-switch-input"
                                                type="checkbox"
                                                id='imediate_joiner'
                                                checked={credentials.checkbox}
                                                onChange={handleInputChange}
                                                disabled={credentials.days !== "0 to 7 days"}
                                            />
                                            <label className="imediate-switch-label" htmlFor="imediate_joiner">
                                                Imediate joiner
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                                    <div className="cand--reg-form-group can--reg-date">
                                        <label htmlFor="date" className='cand--reg-form-label-custom'>What is your last working day</label>
                                        <div className="cand--reg-input-group">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText='dd/mm/yyyy'
                                                disabled={(credentials.days === "0 to 7 days" && credentials.checkbox) || credentials.days === "Currently not serving notice period"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                    <div className='cand--reg-form-group custom'>
                                        <input type="text" id='first_name' name="firstName"
                                            value={credentials.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your first name" className='cand--reg-form-input' required />
                                        <label htmlFor="first_name" className='cand--reg-form-label'>First Name&nbsp;<span className='is-required'>*</span></label>
                                        {require && <small className='text-danger text-capitalized form-error-message'>{credentials.firstName === "" && "required"}</small>}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                    <div className='cand--reg-form-group'>
                                        <input type="text" id='last_name' 
                                        name="lastName"
                                            value={credentials.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your last name" className='cand--reg-form-input' required />
                                        <label htmlFor="last_name" className='cand--reg-form-label'>Last Name&nbsp;<span className='is-required'>*</span></label>
                                        {require && <small className='text-danger text-capitalized form-error-message'>{credentials.lastName === "" && "required"}</small>}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                    <div className='cand--reg-form-group'>
                                        <input type="number" id='mobile_number' 
                                        name="phone"
                                            value={credentials.phone}
                                            onChange={handleInputChange} placeholder="Enter your mobile number" className='cand--reg-form-input' min="0" required />
                                        <label htmlFor="mobile_number" className='cand--reg-form-label'>Mobile Number&nbsp;<span className='is-required'>*</span></label>
                                        {require && <small className='text-danger text-capitalized form-error-message'>{credentials.phone === "" && "required"}</small>}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                    <div className='cand--reg-form-group'>
                                        <input type="email" id='email_id' 
                                        name="email"
                                            value={credentials.email}
                                            onChange={handleInputChange} placeholder="Enter your e-mail id" className='cand--reg-form-input' required />
                                        <label htmlFor="email_id" className='cand--reg-form-label'>Email ID&nbsp;<span className='is-required'>*</span></label>

                                        <div className='text-capitalized form-error-message'>
                                            {require && <small className='text-danger'>{credentials.email === "" && "required"}</small>}&nbsp;
                                            {require && <small className='text-danger text-capitalized'>{!(emailRegex.test(credentials.email)) && "Enter valid email address"}</small>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                    <div className='cand--reg-form-group'>
                                        <input type="password" id='password' 
                                        name="password"
                                            value={credentials.password}
                                            onChange={handleInputChange}
                                            onPaste={(e) => e.preventDefault()}
                                            placeholder="Enter your password" className='cand--reg-form-input' required />
                                        <label htmlFor="password" className='cand--reg-form-label'>Password&nbsp;<span className='is-required'>*</span></label>
                                        {passwordErrorMsg && <small className='text-danger text-capitalized form-error-message'>password must be 8 characters long...</small>}
                                        {require && <small className='text-danger text-capitalized form-error-message'>{credentials.password === "" && "required"}</small>}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                    <div className='cand--reg-form-group'>
                                        <input type="password" id='confirm_password' name="confirmPassword"
                                            value={credentials.confirmPassword}
                                            onChange={handleInputChange}
                                            onPaste={(e) => e.preventDefault()}
                                            placeholder="Enter your confirmPassword" className='cand--reg-form-input' required />
                                        <label htmlFor="confirm_password" className='cand--reg-form-label'>Confirm Password&nbsp;<span className='is-required'>*</span></label>
                                        {confirmPasswordErrorMsg && <small className='text-danger text-capitalized form-error-message'>Password and Confirm Password must match...</small>}
                                        {require && <small className='text-danger text-capitalized form-error-message'>{credentials.confirmPassword === "" && "required"}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-file-upload-area">
                                            <input type="file" id="file_upload" 
                                            accept=".doc,.docx,.pdf,.rtf"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                required />
                                            <label for="file_upload" className='cand--reg-file-upload-label'>
                                                <i class="bi bi-upload" onClick={() => fileInputRef.current.click()}></i>
                                                Upload your Resume/CV here&nbsp;<span className='is-required'>*</span></label>
                                            <span id="file-chosen">{resume.length > 0 ? resume.name : 'No file chosen'}</span>
                                            <div className='file--upload-text'>Either in .doc/ docx/.pdf format only</div>
                                            {require && <small className='text-danger text-capitalized'>{resume.length === 0 && "required"}</small>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <div className="cli--reg-heading-area">
                            <h3 className='cli--reg-heading' data-aos="fade-left">Fill it and then press <span>NEXT!!!</span></h3>
                        </div>
                        <div className="cand--reg-form-area" data-aos="fade-up">
                            <div className="row">
                                <div className="col-12 col-lg-6 custom-padding-right2">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className='cand--reg-multi-input-form-group'>
                                            <input type="text" 
                                            name='searchDesignationInput'
                                                id='searchDesignationInput'
                                                placeholder='Search designation...'
                                                value={searchDesignationInput}
                                                onChange={handleDesignationSearch} className='cand--reg-form-input' />
                                            <label htmlFor="designation" className='cand--reg-form-label'>Current Role/Designation&nbsp;<span className='is-required'>*</span></label>
                                            <div className='search-result-data-area'>
                                                {filteredDesignation.length > 0 &&
                                                    filteredDesignation.map((filterDesignation) => {
                                                        return <div className='search-result-data' key={filterDesignation._id} onClick={() => handleDesignationClick(filterDesignation.designation)}>
                                                            {filterDesignation.designation}
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className='cand-reg-form-badge-area'>
                                            {selectedDesignations.map(selectDesignation => (
                                                <span className="cand-reg-form-badge"
                                                    key={selectDesignation}
                                                    onClick={() => handleDeselectDesignation(selectDesignation)}
                                                >{selectDesignation}</span>
                                            ))}
                                        </div>

                                        {!require && <small className='text-danger text-capitalized'>{selectedDesignations.length === 0 && "required"}</small>}
                                        <small className='text-danger'>{designationAlert}</small>

                                        <div className="can-reg-form-chechbox-area">
                                            <label className="can-reg-form-check-input">
                                                <input
                                                    type="checkbox"
                                                    checked={isCheckedDesignation}
                                                    onChange={() => setIsCheckedDesignation(!isCheckedDesignation)}
                                                />
                                                <span className="can-reg-form-checkmark"></span>
                                                If your searched designation not in the list, please enable the checkbox & type manually...
                                            </label>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 custom-padding-left2">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className='cand--reg-multi-input-form-group'>
                                            <input
                                                type='text'
                                                name='manualDesignationInput'
                                                id='manualDesignationInput'
                                                className='cand--reg-form-input'
                                                placeholder='Enter your designation...'
                                                value={newDesignation}
                                                onChange={(e) => setNewDesignation(e.target.value)}
                                                disabled={!isCheckedDesignation}
                                            />
                                            <label htmlFor="manualDesignationInput" className='cand--reg-form-label'>Enter your designation manually</label>
                                            <button
                                                type="button"
                                                className="multi-form-add-btn"
                                                onClick={handleManualDesignation}
                                                disabled={!isCheckedDesignation}
                                            >Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                    <div className='cand--reg-form-group custom'>
                                        <input type="text" id='company' 
                                        name="companyName"
                                            value={credentials.companyName}
                                            onChange={handleInputChange} placeholder="Enter your current company" className='cand--reg-form-input' required />
                                        <label htmlFor="company" className='cand--reg-form-label'>Current Company&nbsp;<span className='is-required'>*</span></label>
                                        {!require && <small className='text-danger text-capitalized form-error-message'>{credentials.companyName === "" && "required"}</small>}
                                    </div>
                                </div>

                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                    {/* <div className='cand--reg-form-group'>
                                        <input type="text" id='location' name="location"
                                            value={credentials.location}
                                            onChange={handleInputChange} placeholder="Enter your current location" className='cand--reg-form-input' required />
                                        <label htmlFor="location" className='cand--reg-form-label'>Current Loaction</label>
                                        <i class="bi bi-chevron-down"></i>
                                        {selectedLocations.map(selectLocation => (
                                            <span className="cand-reg-form-badge-area"
                                                key={selectLocation}
                                                onClick={() => handleDeselectLocation(selectLocation)}
                                            >{selectLocation}</span>
                                        ))}

                                        <input
                                            type='text'
                                            className='cand--reg-form-input'
                                            placeholder='Search locations'
                                            value={searchLocationInput}
                                            onChange={handleLocationSearch}
                                        />
                                        <div className='search-result-data-area'>
                                            {filteredLocations.length > 0 &&
                                                filteredLocations.map((filterLocation) => {
                                                    return <div className='search-result-data' key={filterLocation._id} onClick={() => handleLocationClick(filterLocation.location)}>
                                                        {filterLocation.location}
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div> */}
                                    <div className='cand--reg-form-group cand--reg-custom-padding form-no-padding'>
                                        <div className='cand--reg-multi-input-form-group'>
                                            <input type="text"
                                                placeholder='Search locations'
                                                value={searchLocationInput}
                                                onChange={handleLocationSearch} className='cand--reg-form-input' />
                                            <label htmlFor="location" className='cand--reg-form-label'>Current Loaction&nbsp;<span className='is-required'>*</span></label>
                                            <div className='search-result-data-area'>
                                                {filteredLocations.length > 0 &&
                                                    filteredLocations.map((filterLocation) => {
                                                        return <div className='search-result-data' key={filterLocation._id} onClick={() => handleLocationClick(filterLocation.location)}>
                                                            {filterLocation.location}
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className='cand-reg-form-badge-area'>
                                            {selectedLocations.map(selectLocation => (
                                                <span className="cand-reg-form-badge"
                                                    key={selectLocation}
                                                    onClick={() => handleDeselectLocation(selectLocation)}
                                                >{selectLocation}</span>
                                            ))}
                                        </div>
                                        {!require && <small className='text-danger text-capitalized form-error-message'>{selectedLocations.length === 0 && "required"}</small>}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-exp-area">
                                            <label htmlFor="experience" className='cand--reg-form-label-custom'>Total Experience</label>
                                            <div className="cand--reg-exp-input-flex-area">
                                                <div className="cand--reg-exp-input-area">
                                                    <input 
                                                    type="number" 
                                                    id='years' 
                                                    name="year"
                                                        value={credentials.year}
                                                        onChange={handleInputChange} className='cand--reg-exp-input' min="0" />
                                                    <label htmlFor="years" className='cand--reg-form-label-custom'>Years&nbsp;<span className='is-required'>*</span></label>
                                                    {!require && <small className='text-danger text-capitalized'>{credentials.year === "" && "required"}</small>}
                                                </div>
                                                <div className="cand--reg-exp-input-area">
                                                    <input 
                                                    type="number" 
                                                    id='months' 
                                                    name="month"
                                                        value={credentials.month}
                                                        onChange={handleInputChange} className='cand--reg-exp-input' min="0" />
                                                    <label htmlFor="months" className='cand--reg-form-label-custom'>Months&nbsp;<span className='is-required'>*</span></label>
                                                    {!require && <small className='text-danger text-capitalized'>{credentials.month === "" && "required"}</small>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-xl-8 custom-padding-right2">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-form-flex-grp">
                                            <label htmlFor="skills" className='cand--reg-form-label-custom'>Skills</label>
                                            <div className='cand--reg-multi-input-form-group'>
                                                <input type="text" id='skills' 
                                                name='skills'
                                                    value={searchSkillInput}
                                                    onChange={handleSkillSearch}
                                                    className='cand--reg-flex-input'
                                                    placeholder='Enter your skill name to search here' />
                                                {/* {skillError && <p className='skills-error-text'>{skillError}</p>} */}
                                                <small className='text-danger'>{skillAlert}</small>
                                                <div className='search-result-data-area'>
                                                    {filteredSkills.length > 0 &&
                                                        filteredSkills.map((filterSkill) => {
                                                            return <div className='search-result-data' key={filterSkill._id} onClick={() => handleSkillClick(filterSkill.skill)}>{filterSkill.skill}</div>
                                                        })
                                                    }
                                                </div>
                                                <div className='cand-reg-form-badge-area'>
                                                    {selectedSkills.map(selectSkill => (
                                                        <span className="cand-reg-form-badge"
                                                            key={selectSkill}
                                                            onClick={() => handleDeselect(selectSkill)}
                                                        >{selectSkill}</span>
                                                    ))}
                                                </div>
                                                {!require && <small className='text-danger text-capitalized'>{selectedSkills.length === 0 && "required"}</small>}
                                                <br />
                                                <small className='text-danger text-capitalized'>{skillError}</small>
                                            </div>
                                        </div>


                                        <div className="can-reg-form-chechbox-area">
                                            <label className="can-reg-form-check-input">
                                                <input
                                                    type="checkbox"
                                                    checked={isCheckedSkill}
                                                    onChange={() => setIsCheckedSkill(!isCheckedSkill)}
                                                />
                                                <span className="can-reg-form-checkmark"></span>
                                                If your searched skill not in the list, please enable the checkbox & type manually...
                                            </label>

                                        </div>
                                        <div className="cand--reg-skills-text">
                                            Note: These will also be used as the Tags for searching matching jobs for you. So enter all your key skills without fail.
                                        </div>

                                    </div>
                                </div>

                                <div className="col-12 col-xl-4 custom-padding-left2">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className='cand--reg-multi-input-form-group'>
                                            <input
                                                type='text'
                                                name='manualSkillInput'
                                                id='manualSkillInput'
                                                className='cand--reg-form-input'
                                                placeholder='Enter your skills...'
                                                value={newSkill}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                                disabled={!isCheckedSkill}
                                            />
                                            <label htmlFor="manualDesignationInput" className='cand--reg-form-label'>Enter your skill manually</label>
                                            <button
                                                type="button"
                                                className="multi-form-add-btn"
                                                onClick={handleManualSkill}
                                                disabled={!isCheckedSkill}
                                            >Add</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-form-flex-grp">
                                            <label htmlFor="education" className='cand--reg-form-label-custom'>Highest Education&nbsp;<span className='is-required'>*</span></label>
                                            {/* <input type="text" id='education' name='education' className='cand--reg-flex-input' /> */}
                                            {/* <select
                                                className="cand--reg-select-input"
                                                id="educationSelect"
                                                name="education"
                                                value={credentials.education}
                                                onChange={handleInputChange}
                                                required>
                                                <option value="" selected disabled>Select your highest education</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                            </select> */}
                                            {/* {selectedEducation.map(selectEducation => (
                                                <span className="job-post-form-badge"
                                                    key={selectEducation}
                                                    onClick={() => handleDeselectEducation(selectEducation)}
                                                >{selectEducation}
                                                </span>
                                            ))} */}

                                            {/* <input type="text" className='job-post-form-input'
                                                name='searchEducationInput'
                                                id='searchEducationInput'
                                                value={searchEducationInput}
                                                onChange={handleEducationSearch}
                                                placeholder='Enter a clear & specific education to get better responses' />

                                            <div className='search-result-data-area'>
                                                {filteredEducation.length > 0 &&
                                                    filteredEducation.map((filterEducation) => {
                                                        return <div className='search-result-data' key={filterEducation._id} onClick={() => handleEducationClick(filterEducation.education)}>
                                                            {filterEducation.education}
                                                        </div>
                                                    })
                                                }
                                            </div> */}

                                            <div className='cand--reg-multi-input-form-group'>
                                                <input type="text"
                                                    id='searchEducationInput'
                                                    name='searchEducationInput'
                                                    value={searchEducationInput}
                                                    onChange={handleEducationSearch}
                                                    className='cand--reg-flex-input'
                                                    placeholder='Enter a clear & specific education to get better responses' />
                                                <div className='search-result-data-area'>
                                                    {filteredEducation.length > 0 &&
                                                        filteredEducation.map((filterEducation) => {
                                                            return <div className='search-result-data' key={filterEducation._id} onClick={() => handleEducationClick(filterEducation.education)}>
                                                                {filterEducation.education}
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                                <div className='cand-reg-form-badge-area'>
                                                    {selectedEducation.map(selectEducation => (
                                                        <span className="cand-reg-form-badge"
                                                            key={selectEducation}
                                                            onClick={() => handleDeselectEducation(selectEducation)}
                                                        >{selectEducation}
                                                        </span>
                                                    ))}
                                                </div>
                                                {!require && <small className='text-danger text-capitalized'>{selectedEducation.length === 0 && "required"}</small>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-form-flex-grp">
                                            <label htmlFor="college_name" className='cand--reg-form-label-custom'>Name of the College&nbsp;<span className='is-required'>*</span></label>
                                            <div className='w-100'>
                                                <input type="text" id='college_name' name="college"
                                                placeholder='Enter the name of the college'
                                                    value={credentials.college}
                                                    onChange={handleInputChange} className='cand--reg-flex-input' />
                                                {!require && <small className='text-danger text-capitalized'>{credentials.college === "" && "required"}</small>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <div className="cli--reg-heading-area">
                            <h3 className='cli--reg-heading' data-aos="fade-left">Complete and press <span>SUBMIT!!!</span></h3>
                        </div>
                        <div className="cand--reg-form-area" data-aos="fade-up">
                            <div className="row">
                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <label htmlFor="headline" className='cand--reg-form-label-custom'>Profile Headline &nbsp;<span className='is-required'>*</span></label>
                                        <textarea name='profileHeadline'
                                            value={credentials.profileHeadline}
                                            onChange={handleInputChange} id="headline" placeholder='(Example: I am a Best Employee Award winning embedded engineer with over 5 years  of experience in the software development domain, proficient in tools/skills like NXPT1020, C, RS422, VxWORKS, ST-True Studio, STM32F103C8, Embedded C, EEPROM, WIFI.)' className='cand--reg-lg-input'>
                                        </textarea>
                                    {!require && <small className='text-danger text-capitalized'>{credentials.profileHeadline === "" && "required"}</small>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="cli--login-remember-area terms-condition" data-aos="fade-right">
                            <label className="cli--login-remember-checkbox">
                                <input
                                    type="checkbox"
                                    checked={isAgreed}
                                    onChange={() => {
                                        setIsAgreed(!isAgreed)
                                    }
                                    }
                                />
                                <span className="cli--login-remember-checkmark"></span>
                                <span>By clicking Agree & Join, you agree to the Skillety
                                    &nbsp;<a href="/terms-and-conditions" target='_blank'>User Agreement</a>,&nbsp;<a href="/privacy-policy" target='_blank'>Privacy Policy</a>
                                </span>
                            </label>
                        </div> */}
                    </div>
                )
            default:
                return null;
        }
    };

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Candidate Create
                            </div>

                            <form onSubmit={handleSubmit} className='cand--reg-form'>
                                {renderStep()}
                                <div className='cand--reg-btn-area'>
                                    {step > 1 && (
                                        <button type='button' onClick={handleBack} className='reg--form-btn-sub candidate back' data-aos="fade-down">
                                            <div className='reg--form-arrow-area candidate back'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                                    <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                                </svg>
                                            </div>
                                            <div className='reg--form-btn candidate back'>
                                                Back
                                            </div>
                                        </button>
                                    )}
                                    {step < 3 && (
                                        <button type='button' onClick={handleNext} className='reg--form-btn-sub candidate next' data-aos="fade-down">
                                            <div className='reg--form-btn candidate'>
                                                Next
                                            </div>
                                            <div className='reg--form-arrow-area candidate'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                                    <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                                </svg>
                                            </div>
                                        </button>
                                    )}
                                    {step === 3 && (
                                        <div>
                                            <button type='submit' className='reg--form-btn-sub candidate register' data-aos="fade-down" >
                                                <div className='reg--form-btn candidate' >
                                                    {spinStatus &&<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#FFF"></path>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                                    </svg>}
                                                    Register
                                                </div>
                                                <div className='reg--form-arrow-area candidate' >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                                        <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                            
                        </div>
                    </section>
                </div>
                <Footer />
            </div >
        </div >
    );
};

export default CandidateCreate;