import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './CreateCandidate.css';
import './CreateCandidate-responsive.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '../../context/AuthContext';
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from 'react-router-dom';

const CreateCandidate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const [cand, setCand] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [staffToken, setStaffToken] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const { getProtectedData, candidateReg, candidateUpdate } = useContext(AuthContext);
    const [skillArray, setSkillArray] = useState([]);
    const [designationArray, setDesignationArray] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedDesignations, setSelectedDesignations] = useState([]);
    const [dateString, setDateString] = useState("");
    const [resume, setResume] = useState();
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

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        if (staffToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(staffToken);
                    console.log(userData);
                    setEmployeeId(userData.id || userData.uid);
                } catch (error) {
                    console.log(error)
                    navigate("/")
                }
            };

            fetchData();
        }
    }, [staffToken]);

    useEffect(() => {
        if (id && staffToken) {
          axios.get(`https://skillety-n6r1.onrender.com/CandidateWithUrl-Detail/${id}`, {
            headers: {
              // Authorization: `Bearer ${staffToken}`,
              Accept: 'application/json'
            }
          })
            .then(res => {
              console.log(res.data)
              setCand(res.data)
            })
            .catch(err => {
              console.log(err)
            })

            axios.get(`https://skillety-n6r1.onrender.com/candidate-resume/${id}`)
                .then(res => {
                    console.log(res.data)
                    setResume(res.data)
                })
                .catch(err => console.log(err))
        }
      }, [id, staffToken])
    
      useEffect(() => {
        if (cand) {
          setDateString(cand.selectedDate)
          setSelectedSkills(cand.skills)
          setSelectedDesignations(cand.designation)
          setSelectedEducation(cand.education)
          setSelectedLocations([cand.location])
          setCredentials({
            ...credentials,
            days: cand.days,
            firstName: cand.firstName,
            lastName: cand.lastName,
            phone: cand.phone,
            email: cand.email,
            companyName: cand.companyName,
            year: cand.year,
            month: cand.month,
            profileHeadline: cand.profileHeadline,
            college: cand.college,
            checkbox: cand.checkbox,
          })
        }
      }, [cand])

      console.log(credentials)

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
            const res = await axios.get("https://skillety-n6r1.onrender.com/skills");
            setSkillArray(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getAllDesignations = async () => {
        try {
            const res = await axios.get("https://skillety-n6r1.onrender.com/designations");
            setDesignationArray(res.data);
        } catch (err) {
            console.log(err);
        }
    }

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

    //post new designation
    const postOtherDesignation = async (designation) => {
        try {
            const res = await axios.post("https://skillety-n6r1.onrender.com/designations", designation, {
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

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        function toggleDisabledInputArea() {
            var isChecked = $(this).is(':checked');
            var disabledInputArea = $(this).closest('.job-post-form-group').find('.disabled-input-area');

            if (isChecked) {
                disabledInputArea.slideDown();
            } else {
                disabledInputArea.slideUp();
            }
        }

        $('.toggleDisabledInput').on('change', toggleDisabledInputArea);

        $('.toggleDisabledInput').each(function () {
            toggleDisabledInputArea.call(this);
        });

        getAllSkills();
        getAllDesignations();
        getAllLocations();
        getAllEducation();
    }, []);

    const handleDateChange = date => {
        setSelectedDate(date);

        if (date) {
            const dateString = date.toLocaleDateString('en-GB');
            setDateString(dateString);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        // if (name === "password") {
        //     if (value.length < 8) {
        //         setPasswordErrorMsg(true);
        //     } else {
        //         setPasswordErrorMsg(false);
        //     }
        // }

        // if (name === "confirmPassword") {
        //     if (value !== credentials.password) {
        //         setConfirmPasswordErrorMsg(true);
        //     } else {
        //         setConfirmPasswordErrorMsg(false);
        //     }
        // }


        // if (name === "confirmPassword") {
        //     if (value.length < 8) {
        //         setPasswordErrorMsg(true);
        //     } else {
        //         setPasswordErrorMsg(false);
        //     }
        // }

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
        
        if (credentials.days === "" || credentials.firstName === "" || credentials.lastName === "" || credentials.phone === "" || credentials.email === "" || !resume || !(emailRegex.test(credentials.email)) || selectedDesignations.length === 0 || credentials.companyName === "" || selectedLocations.length === 0 || credentials.year === "" || credentials.month === "" || selectedSkills.length === 0 || selectedEducation.length === 0 || credentials.college === "" || selectedSkills.length < minSkillNum || credentials.profileHeadline === "") {
            setRequire(true)
            if (selectedSkills.length < minSkillNum) {
                setSkillError(`Please select atleast ${minSkillNum} skills`)
            }
            
        }else{
            const formData = new FormData();
                const id = uuidv4();
                formData.append('file', resume);
                formData.append('id', id);
                const updatedCredentials = {
                    ...credentials,
                    selectedDate: dateString,
                    skills: selectedSkills,
                    designation: selectedDesignations,
                    education: selectedEducation,
                    location: selectedLocations[0],
                    id: id,
                    recruiterId:employeeId,
                };
                console.log(updatedCredentials);
                candidateReg(updatedCredentials);
                otherSkill.length > 0 && postOtherSkills(otherSkill);
                otherDesignation.length > 0 && postOtherDesignation(otherDesignation);
                axios.post('https://skillety-n6r1.onrender.com/upload', formData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
        }
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        
        if (credentials.days === "" || credentials.firstName === "" || credentials.lastName === "" || credentials.phone === "" || credentials.email === "" || !resume || !(emailRegex.test(credentials.email)) || selectedDesignations.length === 0 || credentials.companyName === "" || selectedLocations.length === 0 || credentials.year === "" || credentials.month === "" || selectedSkills.length === 0 || selectedEducation.length === 0 || credentials.college === "" || selectedSkills.length < minSkillNum || credentials.profileHeadline === "") {
            setRequire(true)
            if (selectedSkills.length < minSkillNum) {
                setSkillError(`Please select atleast ${minSkillNum} skills`)
            }
            
        }else{
            const formData = new FormData();
                formData.append('resume', resume);
                const updatedCredentials = {
                    ...credentials,
                    selectedDate: dateString,
                    skills: selectedSkills,
                    designation: selectedDesignations,
                    education: selectedEducation,
                    location: selectedLocations[0],
                };
                console.log(updatedCredentials);
                candidateUpdate([updatedCredentials, id]);
                otherSkill.length > 0 && postOtherSkills(otherSkill);
                otherDesignation.length > 0 && postOtherDesignation(otherDesignation);
                axios.patch(`https://skillety-n6r1.onrender.com/update-candidate-resume/${id}`, formData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
        }
    };


    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="post-job-section">
                            <div className="admin-component-name">
                                Create Candidate
                            </div>
                            <div className="card post-job-card">
                                <div className="post-job-title">Create New Candidate </div>
                                {/* <div className="post-job-sub-title">Begin from scratch</div> */}


                                <div className="job-post-form-area p-t-40">
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="row m-b-20">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>In How many days can Join? Please select one bucket<span className='form-required'>*</span></label>
                                                    <div className="create-cand-radio-input-group">
                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_1" className="radio-button" type="radio" name="days" value="0 to 7 days" onChange={handleInputChange} 
                                                            checked={(credentials.days === "0 to 7 days")}/>
                                                            <div className="radio-tile">
                                                                <label for="day_option_1" className="radio-tile-label">0 to 7 days</label>
                                                            </div>
                                                        </div>

                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_2" className="radio-button" type="radio" 
                                                            name="days"
                                                            value="8 to 15 days"
                                                            onChange={handleInputChange}
                                                            checked={(credentials.days === "8 to 15 days")}
                                                            />
                                                            <div className="radio-tile">
                                                                <label for="day_option_2" className="radio-tile-label">8 to 15 days</label>
                                                            </div>
                                                        </div>

                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_3" className="radio-button" type="radio" 
                                                            name="days"
                                                            value="16 to 30 days"
                                                            onChange={handleInputChange}
                                                            checked={(credentials.days === "16 to 30 days")}
                                                            
                                                            />
                                                            <div className="radio-tile">
                                                                <label for="day_option_3" className="radio-tile-label">16 to 30 days</label>
                                                            </div>
                                                        </div>

                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_4" className="radio-button" type="radio" 
                                                            name="days"
                                                            value="More than 30 days"
                                                            onChange={handleInputChange}
                                                            checked={(credentials.days === "More than 30 days")}
                                                            />
                                                            <div className="radio-tile">
                                                                <label for="day_option_4" className="radio-tile-label">More than 30 days</label>
                                                            </div>
                                                        </div>

                                                        <div className="create-cand-input-container">
                                                            <input id="day_option_5" className="radio-button" type="radio" 
                                                            name="days"
                                                            value="Currently not serving notice period"
                                                            onChange={handleInputChange}
                                                            checked={(credentials.days === "Currently not serving notice period")}
                                                            />
                                                            <div className="radio-tile">
                                                                <label for="day_option_4" className="radio-tile-label"> Currently not serving notice period</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {require && <small className='text-danger text-capitalized'>{credentials.days === "" && "required"}</small>}

                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="imediate-switch">
                                                    <input 
                                                    type="checkbox"
                                                    id='imediate_joiner'
                                                    checked={credentials.checkbox}
                                                    onChange={handleInputChange}
                                                    disabled={credentials.days !== "0 to 7 days"} 
                                                    />
                                                    <span className="imediate-slider"></span>
                                                    <span className='imediate-switch-label'>Imediate Joiner</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12">
                                                <div className="job-post-form-group d-sm-flex align-items-sm-center gap-20">
                                                    <label htmlFor="" className='job-post-form-label mb-sm-0'>
                                                        What is your last working day
                                                        <span className='form-required'>*</span>
                                                    </label>
                                                    <div className='custom--width'>
                                                        <DatePicker
                                                            selected={selectedDate}
                                                            onChange={handleDateChange}
                                                            value={dateString}
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText='dd/mm/yyyy'
                                                            disabled={(credentials.days === "0 to 7 days" && credentials.checkbox) || credentials.days === "Currently not serving notice period"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="first_name" className='job-post-form-label'>First Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='first_name' 
                                                        name="firstName"
                                                        value={credentials.firstName}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your first name"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.firstName === "" && "required"}</small>}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="last_name" className='job-post-form-label'>Last Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='last_name' 
                                                        name="lastName"
                                                        value={credentials.lastName}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your last name"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.lastName === "" && "required"}</small>}
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="mobile_number" className='job-post-form-label'>Mobile Number<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='mobile_number' 
                                                        name="phone"
                                                        value={credentials.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter mobile number"
                                                        min="0"
                                                        required />
                                                </div>
                                                {/* <div className='validation-msg pt-2'>This field is required.</div> */}
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.phone === "" && "required"}</small>}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="email_id" className='job-post-form-label'>Email ID<span className='form-required'>*</span></label>
                                                    <input type="email"
                                                        className='job-post-form-input'
                                                        id='email_id' 
                                                        name="email"
                                                        value={credentials.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter e-mail id"
                                                        required />
                                                </div>
                                                <div className='text-capitalized form-error-message'>
                                                    {require && <small className='text-danger'>{credentials.email === "" && "required"}</small>}&nbsp;
                                                     <small className='text-danger text-capitalized'>{(credentials.email && !(emailRegex.test(credentials.email))) && "Enter valid email address"}</small>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="password" className='job-post-form-label'>Password<span className='form-required'>*</span></label>
                                                    <input type={showPassword ? 'text' : 'password'}
                                                        className='job-post-form-input'
                                                        id='password' name="password"
                                                        placeholder="Enter the password"
                                                        required />
                                                    <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} password-show-icon`}
                                                        onClick={handleTogglePassword}
                                                        id='togglePassword'>
                                                    </i>
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="confirm_password" className='job-post-form-label'>Confirm Password<span className='form-required'>*</span></label>
                                                    <input type={showConfirmPassword ? 'text' : 'password'}
                                                        className='job-post-form-input'
                                                        id='confirm_password' name="confirmPassword"
                                                        placeholder="Confirm the password"
                                                        required />
                                                    <i className={`bi ${showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'} password-show-icon`}
                                                        onClick={handleToggleConfirmPassword}
                                                        id='togglePassword'>
                                                    </i>
                                                </div>
                                                <div className='validation-msg pt-2'>This field is required.</div>
                                            </div>
                                        </div> */}

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12">
                                                <div className='job-post-form-group'>
                                                    <div className="cand--reg-file-upload-area">
                                                        <input type="file" id="file_upload" 
                                                        accept=".doc,.docx,.pdf,.rtf"
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                            required />
                                                        <label for="file_upload" className='cand--reg-file-upload-label'>
                                                            <i class="bi bi-upload" onClick={() => fileInputRef.current.click()}></i>
                                                            {resume?"Update":"Upload"} the Resume/CV here&nbsp;<span className='is-form-required'>*</span></label>
                                                        <span id="file-chosen">{resume ? (resume.name||resume.file) : 'No file chosen'}</span>
                                                        <div className='file--upload-text'>Either in .doc/ docx/.pdf format only</div>
                                                    </div>
                                                    {require && <small className='text-danger text-capitalized'>{!resume && "required"}</small>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6 m-b-35 mb-xl-0">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="" className='job-post-form-label'>Current Role/Designation<span className='form-required'>*</span></label>
                                                        {/* <i class="bi bi-chevron-down"></i> */}
                                                        {selectedDesignations.map(selectDesignation => (
                                                            <span className="job-post-form-badge"
                                                                key={selectDesignation}
                                                                onClick={() => handleDeselectDesignation(selectDesignation)}
                                                            >{selectDesignation}</span>
                                                        ))}
                                                    </div>

                                                    <input type="search" className='job-post-form-input'
                                                        name='searchDesignationInput'
                                                        id='searchDesignationInput'
                                                        value={searchDesignationInput}
                                                        onChange={handleDesignationSearch}
                                                        placeholder='Enter the designation to search here' />

                                                    <div className='search-result-data-area'>
                                                        {filteredDesignation.length > 0 &&
                                                        filteredDesignation.map((filterDesignation) => {
                                                            return <div className='search-result-data' key={filterDesignation._id} onClick={() => handleDesignationClick(filterDesignation.designation)}>
                                                                {filterDesignation.designation}
                                                            </div>
                                                        })
                                                        }
                                                    </div>

                                                    {require && <small className='text-danger text-capitalized'>{selectedDesignations.length === 0 && "required"}</small>}
                                                    <small className='text-danger'>{designationAlert}</small>

                                                    <div className="job-post-form-chechbox-area">
                                                        <label className="job-post-form-check-input view-disabled-input">
                                                            <input
                                                                type="checkbox"
                                                                className="toggleDisabledInput"
                                                                checked={isCheckedDesignation}
                                                                onChange={() => setIsCheckedDesignation(!isCheckedDesignation)}
                                                            />
                                                            <span className="job-post-form-checkmark"></span>
                                                            If your searched job role not in the list, please enable the checkbox & type manually...
                                                        </label>
                                                    </div>

                                                    <div className="disabled-input-area">
                                                        <input
                                                            type='text'
                                                            name='manualJobRoleInput'
                                                            id='manualJobRoleInput'
                                                            className='job-post-form-input mt-4'
                                                            placeholder='Enter the designation manually...'
                                                            value={newDesignation}
                                                            onChange={(e) => setNewDesignation(e.target.value)}
                                                            disabled={!isCheckedDesignation}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="manually-add-btn with-mb"
                                                            onClick={handleManualDesignation}
                                                            disabled={!isCheckedDesignation}>
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="company" className='job-post-form-label'>Current Company<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='company' 
                                                        name="companyName"
                                                        value={credentials.companyName}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the current company"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.companyName === "" && "required"}</small>}
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6 m-b-35 mb-xl-0">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="location" className='job-post-form-label'>Current Location<span className='form-required'>*</span></label>
                                                        {selectedLocations.map(selectLocation => (
                                                            <span className="job-post-form-badge"
                                                                key={selectLocation}
                                                                onClick={() => handleDeselectLocation(selectLocation)}
                                                            >{selectLocation}</span>
                                                        ))}
                                                    </div>

                                                    <input type="search" className='job-post-form-input'
                                                        name='searchLocationInput'
                                                        id='searchLocationInput'
                                                        placeholder='Enter the location to search here' 
                                                        value={searchLocationInput}
                                                        onChange={handleLocationSearch}/>

                                                    <div className='search-result-data-area'>
                                                        {filteredLocations.length > 0 &&
                                                        filteredLocations.map((filterLocation) => {
                                                            return <div className='search-result-data' key={filterLocation._id} onClick={() => handleLocationClick(filterLocation.location)}>
                                                                {filterLocation.location}
                                                            </div>
                                                        })
                                                        }
                                                    </div>

                                                    {require && <small className='text-danger text-capitalized form-error-message'>{selectedLocations.length === 0 && "required"}</small>}
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <label htmlFor="work_experience" className='job-post-form-label'>Total experience<span className='form-required'>*</span></label>
                                                    </div>
                                                    <div className="col-12 col-xl-6 col-lg-6 col-md-6 mb-4 mb-md-0">
                                                        <div className="job-post-form-group without-label">
                                                            <input 
                                                            type="number" 
                                                            id='years' 
                                                            name="year"
                                                                value={credentials.year}
                                                                onChange={handleInputChange} 
                                                            className='job-post-form-input'
                                                            placeholder="Years" 
                                                            min="0"/>
                                                            {require && <small className='text-danger text-capitalized'>{credentials.year === "" && "required"}</small>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-xl-6 col-lg-6 col-md-6">
                                                        <div className="job-post-form-group without-label">
                                                            <input  
                                                            className='job-post-form-input'
                                                            placeholder="Months"
                                                            type="number" 
                                                            id='months' 
                                                            name="month"
                                                            value={credentials.month}
                                                            onChange={handleInputChange}
                                                            min="0"
                                                            />
                                                            {require && <small className='text-danger text-capitalized'>{credentials.month === "" && "required"}</small>}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-12">
                                                        <div className='validation-msg pt-2'>This field is required.</div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-lg-12 col-xl-12">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="skill" className='job-post-form-label'>Skills<span className='form-required'>*</span></label>
                                                        {selectedSkills.map(selectSkill => (
                                                            <span className="job-post-form-badge"
                                                                key={selectSkill}
                                                                onClick={() => handleDeselect(selectSkill)}
                                                            >{selectSkill}</span>
                                                        ))}
                                                    </div>

                                                    <input type="search" className='job-post-form-input'
                                                        name='skills'
                                                        value={searchSkillInput}
                                                        onChange={handleSkillSearch}
                                                        id='searchSkillInput'
                                                        placeholder='Enter the skill to search here' />
                                                    <small className='text-danger'>{skillAlert}</small>
                                                    <div className='search-result-data-area'>
                                                        {filteredSkills.length > 0 &&
                                                            filteredSkills.map((filterSkill) => {
                                                                return <div className='search-result-data' key={filterSkill._id} onClick={() => handleSkillClick(filterSkill.skill)}>{filterSkill.skill}</div>
                                                            })
                                                        }
                                                    </div>

                                                    {require && <small className='text-danger text-capitalized'>{selectedSkills.length === 0 && "required"}</small>}
                                                    <br />
                                                    <small className='text-danger text-capitalized'>{skillError}</small>

                                                    <div className="job-post-form-chechbox-area">
                                                        <label className="job-post-form-check-input view-disabled-input">
                                                            <input
                                                                type="checkbox"
                                                                className="toggleDisabledInput"
                                                                checked={isCheckedSkill}
                                                                onChange={() => setIsCheckedSkill(!isCheckedSkill)}
                                                            />
                                                            <span className="job-post-form-checkmark"></span>
                                                            If your searched skill not in the list, please enable the checkbox & type manually...
                                                        </label>
                                                    </div>

                                                    <div className="disabled-input-area">
                                                        <input
                                                            type='text'
                                                            name='manualSkillInput'
                                                            id='manualSkillInput'
                                                            className='job-post-form-input mt-4'
                                                            placeholder='Enter the skill manually...'
                                                            value={newSkill}
                                                            onChange={(e) => setNewSkill(e.target.value)}
                                                            disabled={!isCheckedSkill}
                                                        />
                                                        {/* {skillError && <p>{skillError}</p>} */}
                                                        <button
                                                            type="button"
                                                            className="manually-add-btn"
                                                            onClick={handleManualSkill}
                                                            disabled={!isCheckedSkill}
                                                        >Add manually entered skill</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6 m-b-35 mb-xl-0">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="education" className='job-post-form-label'>Highest Education<span className='form-required'>*</span></label>
                                                        {/* <i class="bi bi-chevron-down"></i> */}
                                                        {selectedEducation.map(selectEducation => (
                                                            <span className="job-post-form-badge"
                                                                key={selectEducation}
                                                                onClick={() => handleDeselectEducation(selectEducation)}
                                                            >{selectEducation}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <input type="search" className='job-post-form-input'
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
                                                    </div>

                                                    {require && <small className='text-danger text-capitalized'>{selectedEducation.length === 0 && "required"}</small>}
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="college_name" className='job-post-form-label'>Name of the College<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='college_name' name="college"
                                                        value={credentials.college}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the name of the college"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized'>{credentials.college === "" && "required"}</small>}
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="profile_headline" className='job-post-form-label'>Profile Headline<span className='form-required'>*</span></label>
                                                    <textarea rows="5" className='job-post-form-input'
                                                        name='profileHeadline'
                                                        value={credentials.profileHeadline}
                                                        onChange={handleInputChange}
                                                        placeholder="(Example: I am a Best Employee Award winning embedded engineer with over 5 years  of experience in the software development domain, proficient in tools/skills like NXPT1020, C, RS422, VxWORKS, ST-True Studio, STM32F103C8, Embedded C, EEPROM, WIFI.)" id="profile_headline"
                                                        required></textarea>
                                                </div>
                                                {require && <small className='text-danger text-capitalized'>{credentials.profileHeadline === "" && "required"}</small>}
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="post-job-btn-area">
                                {id?<button className='post-job-btn' onClick={handleUpdate}>Update</button>:<button className='post-job-btn' onClick={handleSubmit}>Create</button>}
                            </div>
                        </div>
                    </section>
                </div >
                <Footer />
            </div >
        </div >
    )

}

export default CreateCandidate