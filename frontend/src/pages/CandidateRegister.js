import React, { useState, useContext} from 'react';
import "../App.css";
import AuthContext from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { v4 as uuidv4} from "uuid";

const CandidateRegister = () => {
    const [step, setStep] = useState(1);
    const {candidateReg} = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [dateString, setDateString] = useState("");
    const [resume, setResume] = useState();
    const [skillError, setSkillError] = useState("");
    const initialCredentials = {
        days: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        designation: "",
        companyName: "",
        location: "",
        year: "", 
        education: "",
        profileHeadline: "",
    };
    const [credentials, setCredentials] = useState(initialCredentials);
    
    const skills = ['Skill 1', 'Skill 2', 'Skill 3', 'skill 4', 'skill 5', 'Skill 6', 'Skill 7', 'Skill 8', 'skill 9', 'skill 10', 'skill 11', 'skill 12', 'skill 13'];
    const totalMonths = parseInt(credentials.year*12) + parseInt(credentials.month);

    const handleDateChange = date => {
        setSelectedDate(date);

        if (date) {
            const dateString = date.toLocaleDateString('en-GB');
            setDateString(dateString);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
        if (name === "year" || name === "month") {
            setSkillError("");
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setResume(selectedFile);
    };
    
    const handleSkillClick = (skill) => {
        const maxSkillNum = totalMonths <= 24 ? 6 : totalMonths <= 48 ? 8 : totalMonths <= 96 ? 10 : 12;
        if(totalMonths > 0){
            if (selectedSkills.includes(skill)) {
                setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
              } else {
                    selectedSkills.length === maxSkillNum && alert(`You can select max of ${maxSkillNum} skills`)
                  if(selectedSkills.length < maxSkillNum){
                      setSelectedSkills([...selectedSkills, skill]);
                  } 
              }
        }else{
            setSkillError("Please enter the experience first...")
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
            selectedDate: dateString,
            skills:selectedSkills,
            id:id,
        };
        console.log(updatedCredentials);
        candidateReg(updatedCredentials);
        axios.post('http://localhost:5002/upload', formData)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };
    
    const handleNext = () => {
        let isValid = true;
        if (step === 1) {
          if (credentials.days === "" || selectedDate === null || credentials.firstName === "" || credentials.lastName === "" || credentials.phone === "" || credentials.email === "" || !resume) {
            isValid = false;
          }
        }
        if (step === 2) {
            const minSkillNum = totalMonths <= 24 ? 4 : totalMonths <= 48 ? 6 : totalMonths <= 96 ? 8 : 10;
          if (credentials.designation === "" || credentials.companyName === "" || credentials.location === "" || credentials.year === "" || credentials.month === "" || selectedSkills.length === 0 || credentials.education === "" || credentials.college === "" || selectedSkills.length < minSkillNum) {
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
                <>
                    <div className="form-group">
                        <label 
                        htmlFor="days" 
                        className="form-label mt-4">
                            In how many days can you Join? 
                        </label>
                        <select 
                        className="form-select" 
                        id="days"
                        name="days" 
                        value = {credentials.days}
                        onChange={handleInputChange}
                        required>
                            <option value="">Please select any one bucket.</option>
                            <option value="0 to 7 days">0 to 7 days</option>
                            <option value="8 to 15 days">8 to 15 days </option>
                            <option value="16 to 30 days">16 to 30 days</option>
                            <option value="More than 30 days">More than 30 days</option>
                        </select>
                    </div>
                    <div>
                        <label 
                            htmlFor="days" 
                            className="form-label mt-4">
                                What is your last working day?
                        </label>
                        <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy" 
                        />
                    </div>
                    <div className="form-group">
                        <label 
                        htmlFor="firstNameInput" 
                        className="form-label mt-4">
                            First Name
                        </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="firstNameInput"  
                        name="firstName" 
                        value={credentials.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        required/>
                    </div>
                    <div className="form-group">
                        <label 
                        htmlFor="lastNameInput" 
                        className="form-label mt-4">
                            Last Name
                        </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="lastNameInput"  
                        name="lastName" 
                        value={credentials.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        required/>
                    </div>
                    <div className="form-group">
                        <label 
                        htmlFor="phoneInput" 
                        className="form-label mt-4">
                        Mobile Number
                        </label>
                        <input 
                        type="number" 
                        className="form-control" 
                        id="phoneInput" 
                        name="phone" 
                        value = {credentials.phone} 
                        onChange = {handleInputChange} 
                        placeholder="+94 987654321"
                        required />
                    </div>
                    <div className="form-group">
                        <label 
                        htmlFor="emailInput" 
                        className="form-label mt-4">
                            Email ID
                        </label>
                        <input 
                        type="email" 
                        className="form-control" 
                        id="emailInput" 
                        aria-describedby="emailHelp" 
                        name="email" 
                        value={credentials.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        required/>
                    </div>
                    <div>
                        <label 
                        htmlFor="resume" 
                        className="form-label mt-4">
                            Upload your Resume/CV here: UPLOAD here <br />
                            (Either in .doc/.docx/.pdf format only.)
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            id="resume"
                            accept=".doc,.docx,.pdf"
                            onChange={handleFileChange}
                            required
                        />
                            {resume ? resume.name : 'No file chosen'}
                    </div> 
                </>
            )
        case 2:
            return (
                <>
                        <div className="form-group">
                            <label 
                            htmlFor="designationInput" 
                            className="form-label mt-4">
                                Current Role/Designation
                            </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="designationInput"  
                            name="designation" 
                            value={credentials.designation}
                            onChange={handleInputChange}
                            placeholder="Enter your current role/designation"
                            required/>
                        </div> 
                        <div className="form-group">
                            <label 
                            htmlFor="companyNameInput" 
                            className="form-label mt-4">
                                Current Company
                            </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="companyNameInput"  
                            name="companyName" 
                            value={credentials.companyName}
                            onChange={handleInputChange}
                            placeholder="Enter your current company"
                            required/>
                        </div>
                        <div className="form-group">
                            <label 
                            htmlFor="locationInput" 
                            className="form-label mt-4">
                                Current Location 
                            </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="locationInput"  
                            name="location" 
                            value={credentials.location}
                            onChange={handleInputChange}
                            placeholder="Enter your current location"
                            required/>
                        </div>
                        <div className="form-group">
                            <label 
                            htmlFor="experienceInput" 
                            className="form-label mt-4">
                                Total Experience 
                            </label>
                            <input 
                            type="number" 
                            className="form-control" 
                            id="yearInput"  
                            name="year" 
                            value={credentials.year}
                            onChange={handleInputChange}
                            placeholder="years in number"
                            />
                            <input 
                            type="number" 
                            className="form-control" 
                            id="monthInput"  
                            name="month" 
                            value={credentials.month}
                            onChange={handleInputChange}
                            placeholder="months in number"
                            />
                        </div>
                        <div className='form-group'>
                            <label 
                            htmlFor="skillInput" 
                            className="form-label mt-4">
                                Skills 
                            </label><br />
                            {skills.map(skill => (
                                <span
                                key={skill}
                                className={`skill-tag ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                                onClick={() => handleSkillClick(skill)}
                                >
                                {skill}
                                </span>
                            ))}
                            {skillError && <p>{skillError}</p>}
                        </div>
                        <div className="form-group">
                            <label 
                            htmlFor="education" 
                            className="form-label mt-4">
                                Highest Education
                            </label>
                            <select 
                            className="form-select" 
                            id="educationSelect"
                            name="education" 
                            value = {credentials.education}
                            onChange={handleInputChange}
                            required>
                                <option value="">Select your highest education</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label 
                            htmlFor="collegeInput" 
                            className="form-label mt-4">
                                Name of the College
                            </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="collegeInput"  
                            name="college" 
                            value={credentials.college}
                            onChange={handleInputChange}
                            placeholder="Enter your college name"
                            required/>
                        </div>
                </>
            )
        case 3:
            return (
                <>
                    <div className="form-group">
                        <label 
                        htmlFor="profileHeadlineTextarea" 
                        className="form-label mt-4">
                        Profile Headline
                        </label>
                        <textarea 
                        className="form-control" 
                        id="profileHeadlineTextarea" 
                        rows="3"
                        name='profileHeadline'
                        value={credentials.profileHeadline}
                        onChange={handleInputChange}
                        placeholder="Enter your profile headline"
                        required></textarea>
                    </div>
                </>
            )
        default:
            return null;
        }
  };

  return (
    <div>
        <h3>Create your account</h3>
        <form onSubmit={handleSubmit}>
        {renderStep()}
        {step > 1 && (<button type="button" className="btn btn-outline-info mx-3" onClick={handleBack}>Back</button>)}
        {step < 3 && (<button type="button" className="btn btn-outline-info my-3" onClick={handleNext}>Next</button>)}
        {step === 3 && (<input type='submit' value="Register" className='btn btn-primary my-3' />)}
        </form>
    </div>
  );
};

export default CandidateRegister;