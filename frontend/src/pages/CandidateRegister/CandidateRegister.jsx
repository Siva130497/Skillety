import React, { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import $ from 'jquery';
import './CandidateRegister.css';
import './CandidateRegister-responsive.css';
import { CandidateFooter } from '../../components/CandidateFooter';
import LayoutNew from '../../components/LayoutNew';
import GoogleAuth from '../../components/GoogleAuth';


const CandidateRegister = () => {
    const [step, setStep] = useState(1);
    const { candidateReg, postOtherSkills, postOtherDesignation } = useContext(AuthContext);
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
        location: "",
        year: "",
        month: "",
        education: "",
        profileHeadline: "",
        college: "",
        checkbox: false,
    };
    const [credentials, setCredentials] = useState(initialCredentials);
    console.log(credentials);
    
    useEffect(() => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            firstName: profile.family_name ? profile.family_name : "",
            lastName: profile.given_name ? profile.given_name : "",
            email: profile.email ? profile.email : "",
        }));
    }, [profile]);

    const totalMonths = parseInt(credentials.year * 12) + parseInt(credentials.month);
    const maxSkillNum = totalMonths <= 24 ? 6 : totalMonths <= 48 ? 8 : totalMonths <= 96 ? 10 : 12;

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

    useEffect(() => {
        getAllSkills();
        getAllDesignations();

        $(document).ready(function () {
            $('#file_upload').on('change', function () {
                $('#file-chosen').text(this.files[0].name);
            });
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

        if (name === "year" || name === "month") {
            setSkillError("");
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
            if (selectedSkills.includes(skill)) {
                setSelectedSkills([...selectedSkills]);
                setSearchSkillInput("");
                setFilteredSkills([]);
            } else {
                selectedSkills.length === maxSkillNum && alert(`You can select max of ${maxSkillNum} skills`)
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
        setSearchSkillInput("");
        if (selectedSkills.length === maxSkillNum) {
            alert(`You can select max of ${maxSkillNum} skills`);
            setNewSkill("");
        }
        if (selectedSkills.length < maxSkillNum) {
            const foundObject = skillArray.find(item => item.skill.toLowerCase() === newSkill.toLowerCase());
            if (foundObject) {
                alert(`Skill "${newSkill}" already in list, please search...`);
                setNewSkill("");
            } else {
                setOtherSkill([...otherSkill, newSkill]);
                setSelectedSkills([...selectedSkills, newSkill]);
                setNewSkill("");
            }
        }
    }

    const handleManualDesignation = () => {
        setSearchDesignationInput("");
        const foundObject = designationArray.find(item => item.designation.toLowerCase() === newDesignation.toLowerCase());
        if (foundObject) {
            alert(`Designation "${newDesignation}" already in list, please search...`);
            setNewDesignation("");
        } else {
            setOtherDesignation([newDesignation]);
            setSelectedDesignations([newDesignation]);
            setNewDesignation("");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
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
            id: id,
        };
        console.log(updatedCredentials);
        candidateReg(updatedCredentials);
        otherSkill.length > 0 && postOtherSkills(otherSkill);
        otherDesignation.length > 0 && postOtherDesignation(otherDesignation);
        axios.post('https://skillety.onrender.com/upload', formData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const handleNext = () => {
        let isValid = true;
        if (step === 1) {
            if (credentials.days === "" || credentials.firstName === "" || credentials.lastName === "" || credentials.phone === "" || credentials.email === "" || credentials.password === "" || credentials.confirmPassword === "" || credentials.password !== credentials.confirmPassword || !resume || credentials.password.length < 8) {
                credentials.password !== credentials.confirmPassword && alert("Please check that both password and confirm password are same")
                credentials.password.length < 8 && alert("password must be atleast 8 characters long")
                isValid = false;
            }
        }
        if (step === 2) {
            const minSkillNum = totalMonths <= 24 ? 4 : totalMonths <= 48 ? 6 : totalMonths <= 96 ? 8 : 10;
            if (selectedDesignations.length === 0 || credentials.companyName === "" || credentials.location === "" || credentials.year === "" || credentials.month === "" || selectedSkills.length === 0 || credentials.education === "" || credentials.college === "" || selectedSkills.length < minSkillNum) {
                selectedSkills.length < minSkillNum && alert(`Please select atleast ${minSkillNum} skills`)
                isValid = false;
            }
        }
        if (step === 3) {
            if (credentials.profileHeadline === "") {
                isValid = false;
            }
        }
        if (isValid) {
            setStep(step + 1);
        } else {
            alert("Please complete all the required fields before proceeding.");
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
                        <GoogleAuth setProfile={setProfile}/>
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
                                        </div>
                                    </div>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={credentials.checkbox}
                                        onChange={handleInputChange}
                                        disabled={credentials.days !== "0 to 7 days"}
                                    />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                        Imediate joiner
                                    </label>
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
                                                disabled={credentials.days === "0 to 7 days" && credentials.checkbox}
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
                                        <label htmlFor="first_name" className='cand--reg-form-label'>First Name</label>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                    <div className='cand--reg-form-group'>
                                        <input type="text" id='last_name' name="lastName" 
                                        value={credentials.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your last name" className='cand--reg-form-input' required />
                                        <label htmlFor="last_name" className='cand--reg-form-label'>Last Name</label>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                    <div className='cand--reg-form-group'>
                                        <input type="number" id='mobile_number' name="phone"
                                        value={credentials.phone}
                                        onChange={handleInputChange} placeholder="Enter your mobile number" className='cand--reg-form-input' min="0" required />
                                        <label htmlFor="mobile_number" className='cand--reg-form-label'>Mobile Number</label>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                    <div className='cand--reg-form-group'>
                                        <input type="email" id='email_id' name="email"
                                        value={credentials.email}
                                        onChange={handleInputChange} placeholder="Enter your e-mail id" className='cand--reg-form-input' required />
                                        <label htmlFor="email_id" className='cand--reg-form-label'>Email ID</label>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                    <div className='cand--reg-form-group'>
                                        <input type="password" id='password' name="password"
                                        value={credentials.password}
                                        onChange={handleInputChange}
                                        onPaste={(e) => e.preventDefault()}
                                        placeholder="Enter your password" className='cand--reg-form-input' required />
                                        <label htmlFor="password" className='cand--reg-form-label'>Password</label>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                    <div className='cand--reg-form-group'>
                                        <input type="password" id='confirm_password' name="confirmPassword"
                                        value={credentials.confirmPassword}
                                        onChange={handleInputChange}
                                        onPaste={(e) => e.preventDefault()}
                                        placeholder="Enter your confirmPassword" className='cand--reg-form-input' required />
                                        <label htmlFor="confirm_password" className='cand--reg-form-label'>Confirm Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-file-upload-area">
                                            <input type="file" id="file_upload" accept=".doc,.docx,.pdf"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                            required />
                                            <label for="file_upload" className='cand--reg-file-upload-label'>
                                                <i class="bi bi-upload" onClick={()=>fileInputRef.current.click()}></i>
                                                Upload your Resume/CV here</label>
                                            <span id="file-chosen">{resume.length > 0 ? resume.name : 'No file chosen'}</span>
                                            <div className='file--upload-text'>Either in .doc/ docx/.pdf format only</div>
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
                                <div className="col-12 custom-padding-left-right">
                                    <div className='cand--reg-form-group'>
                                        <label htmlFor="designation" className='cand--reg-form-label'>Current Role/Designation</label>
                                        {selectedDesignations.map(selectDesignation => (
                                            <span className="badge bg-success mx-2"
                                                key={selectDesignation}
                                                onClick={() => handleDeselectDesignation(selectDesignation)}
                                            >{selectDesignation}</span>
                                        ))}
                                        <input type="text" name='searchDesignationInput'
                                        id='searchDesignationInput'
                                        placeholder='Search designation...'
                                        value={searchDesignationInput}
                                        onChange={handleDesignationSearch}className='cand--reg-form-input' />
                                        {filteredDesignation.length > 0 &&
                                            filteredDesignation.map((filterDesignation) => {
                                                return <div key={filterDesignation._id} onClick={() => handleDesignationClick(filterDesignation.designation)}>{filterDesignation.designation}</div>
                                            })
                                        }
                                        <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={isCheckedDesignation}
                                        onChange={() => setIsCheckedDesignation(!isCheckedDesignation)}
                                        />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                            If your searched designation not in the list, please enable the checkbox & type manually...
                                        </label>
                                        <input
                                            type='text'
                                            name='manualDesignationInput'
                                            id='manualDesignationInput'
                                            className='form-control my-2'
                                            placeholder='Enter your designation...'
                                            value={newDesignation}
                                            onChange={(e) => setNewDesignation(e.target.value)}
                                            disabled={!isCheckedDesignation}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={handleManualDesignation}
                                            disabled={!isCheckedDesignation}
                                        >add manually entered designation</button>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                    <div className='cand--reg-form-group custom'>
                                        <input type="text" id='company' name="companyName"
                                        value={credentials.companyName}
                                        onChange={handleInputChange} placeholder="Enter your current company" className='cand--reg-form-input' required />
                                        <label htmlFor="company" className='cand--reg-form-label'>Current Company</label>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                    <div className='cand--reg-form-group'>
                                        <input type="text" id='location' name="location"
                                        value={credentials.location}
                                        onChange={handleInputChange} placeholder="Enter your current location" className='cand--reg-form-input' required />
                                        <label htmlFor="location" className='cand--reg-form-label'>Current Loaction</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-exp-area">
                                            <label htmlFor="experience" className='cand--reg-form-label-custom'>Total Experience</label>
                                            <div className="cand--reg-exp-input-flex-area">
                                                <div className="cand--reg-exp-input-area">
                                                    <input type="number" id='years' name="year"
                                                    value={credentials.year}
                                                    onChange={handleInputChange} className='cand--reg-exp-input' min="0"/>
                                                    <label htmlFor="years" className='cand--reg-form-label-custom'>Years</label>
                                                </div>
                                                <div className="cand--reg-exp-input-area">
                                                    <input type="number" id='months' name="month"
                                                    value={credentials.month}
                                                    onChange={handleInputChange} className='cand--reg-exp-input' min="0"/>
                                                    <label htmlFor="months" className='cand--reg-form-label-custom'>Months</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-form-flex-grp">
                                            <label htmlFor="skills" className='cand--reg-form-label-custom'>Skills</label>
                                            {selectedSkills.map(selectSkill => (
                                                <span className="badge rounded-pill bg-info mx-2"
                                                    key={selectSkill}
                                                    onClick={() => handleDeselect(selectSkill)}
                                                >{selectSkill}</span>
                                            ))}
                                            <input type="text" id='skills' name='skills' 
                                            value={searchSkillInput}
                                            onChange={handleSkillSearch}
                                            className='cand--reg-flex-input' />
                                            {skillError && <p>{skillError}</p>}
                                            {filteredSkills.length > 0 &&
                                                filteredSkills.map((filterSkill) => {
                                                    return <div key={filterSkill._id} onClick={() => handleSkillClick(filterSkill.skill)}>{filterSkill.skill}</div>
                                                })
                                            }
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={isCheckedSkill}
                                                onChange={() => setIsCheckedSkill(!isCheckedSkill)}
                                            />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                                If your searched skill not in the list, please enable the checkbox & type manually...
                                            </label>
                                            <input
                                                type='text'
                                                name='manualSkillInput'
                                                id='manualSkillInput'
                                                className='form-control my-2'
                                                placeholder='Enter your skills...'
                                                value={newSkill}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                                disabled={!isCheckedSkill}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={handleManualSkill}
                                                disabled={!isCheckedSkill}
                                            >add manually entered skill</button>
                                        </div>
                                        <div className="cand--reg-skills-text">
                                            Note: These will also be used as the Tags for searching matching jobs for you. So enter all your key skills without fail.
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-form-flex-grp">
                                            <label htmlFor="education" className='cand--reg-form-label-custom'>Highest Education</label>
                                            {/* <input type="text" id='education' name='education' className='cand--reg-flex-input' /> */}
                                            <select
                                                className="form-select"
                                                id="educationSelect"
                                                name="education"
                                                value={credentials.education}
                                                onChange={handleInputChange}
                                                required>
                                                <option value="">Select your highest education</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className='cand--reg-form-group cand--reg-custom-padding'>
                                        <div className="cand--reg-form-flex-grp">
                                            <label htmlFor="college_name" className='cand--reg-form-label-custom'>Name of the College</label>
                                            <input type="text" id='college_name' name="college"
                                            value={credentials.college}
                                            onChange={handleInputChange} className='cand--reg-flex-input' />
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
                                        <label htmlFor="headline" className='cand--reg-form-label-custom'>Profile Headline</label>
                                        <textarea name='profileHeadline'
                                        value={credentials.profileHeadline}
                                        onChange={handleInputChange} id="headline" placeholder='(Example: I am a Best Employee Award winning embedded engineer with over 5 years  of experience in the software development domain, proficient in tools/skills like NXPT1020, C, RS422, VxWORKS, ST-True Studio, STM32F103C8, Embedded C, EEPROM, WIFI.)' className='cand--reg-lg-input'>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            default:
                return null;
        }
    };

    return (
        <div>
            <LayoutNew />
            <div className='client-register-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="custom--container">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/candidate-home">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Registration Form</p>
                                </div>
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
                                        <button type='submit' className='reg--form-btn-sub candidate register' data-aos="fade-down">
                                            <div className='reg--form-btn candidate'>
                                                Register
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <CandidateFooter />
        </div>
    );
};

export default CandidateRegister;