import React, { useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { v4 as uuidv4} from "uuid";
import Layout from '../../components/Layout';
import GoogleAuth from '../../components/GoogleAuth';


const CandidateRegister = () => {
    const [step, setStep] = useState(1);
    const {candidateReg, postOtherSkills, postOtherDesignation} = useContext(AuthContext);
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
        month:"",
        education: "",
        profileHeadline: "",
        college:"",
        checkbox: false,
    };
    const [credentials, setCredentials] = useState(initialCredentials);
    
    useEffect(()=>{
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            firstName:profile.family_name ? profile.family_name : "",
            lastName:profile.given_name ? profile.given_name : "",
            email:profile.email ? profile.email : "",
        }));
    },[profile]);

    const totalMonths = parseInt(credentials.year*12) + parseInt(credentials.month);
    const maxSkillNum = totalMonths <= 24 ? 6 : totalMonths <= 48 ? 8 : totalMonths <= 96 ? 10 : 12;
    
    const getAllSkills = async ()=>{
        try{
            const res = await axios.get("http://localhost:5002/skills");
            setSkillArray(res.data);
        }catch(err){
            console.log(err);
        }
    }

    const getAllDesignations = async ()=>{
        try{
            const res = await axios.get("http://localhost:5002/designations");
            setDesignationArray(res.data);
        }catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        getAllSkills();
        getAllDesignations();
    },[])
    
    
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
        if(inputValue.length > 0){
            const candidateSkills = skillArray.filter((obj) => {
                return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
            });
            if(candidateSkills.length > 0){
                setFilteredSkills(candidateSkills);
            }
        } else {
            setFilteredSkills([]);
        }
    }

    const handleDesignationSearch = (e) => {
        const inputValue = e.target.value;
        setSearchDesignationInput(inputValue);
        if(inputValue.length > 0){
            const candidateDesignation = designationArray.filter((obj) => {
                return obj.designation.toLowerCase().includes(inputValue.toLowerCase());
            });
            if(candidateDesignation.length > 0){
                setFilteredDesignation(candidateDesignation);
            }
        } else {
            setFilteredDesignation([]);
        }
    }
    
    const handleSkillClick = (skill) => {
        if(totalMonths > 0){
            if (selectedSkills.includes(skill)) {
                setSelectedSkills([...selectedSkills]);
                setSearchSkillInput("");
                setFilteredSkills([]);
            } else {
                    selectedSkills.length === maxSkillNum && alert(`You can select max of ${maxSkillNum} skills`)
                    setSearchSkillInput("");
                    setFilteredSkills([]);
                    if(selectedSkills.length < maxSkillNum){
                      setSelectedSkills([...selectedSkills, skill]);
                      setSearchSkillInput("");
                      setFilteredSkills([]);
                    } 
            }
        }else{
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
        if (selectedSkills.length === maxSkillNum){
          alert(`You can select max of ${maxSkillNum} skills`);
          setNewSkill("");
        }
        if(selectedSkills.length < maxSkillNum){
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
            confirmPassword:undefined,
            selectedDate: dateString,
            skills:selectedSkills,
            designation:selectedDesignations,
            id:id,
        };
        console.log(updatedCredentials);
        candidateReg(updatedCredentials);
        otherSkill.length > 0 && postOtherSkills(otherSkill);
        otherDesignation.length > 0 && postOtherDesignation(otherDesignation);
        axios.post('http://localhost:5002/upload', formData)
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
                            disabled={credentials.days === "0 to 7 days" && credentials.checkbox}
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
                    <div className="form-group">
                        <label 
                        htmlFor="passwordInput" 
                        className="form-label mt-4">
                            Password
                        </label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="passwordInput"  
                        name="password" 
                        value={credentials.password}
                        onChange={handleInputChange}
                        onPaste={(e)=>e.preventDefault()}
                        placeholder="Enter your password"
                        required/>
                    </div>
                    <div className="form-group">
                        <label 
                        htmlFor="confirmPasswordInput" 
                        className="form-label mt-4">
                            Confirm Password
                        </label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="confirmPasswordInput"  
                        name="confirmPassword" 
                        value={credentials.confirmPassword}
                        onChange={handleInputChange}
                        onPaste={(e)=>e.preventDefault()}
                        placeholder="Enter your confirm password"
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
                </div>
            )
        case 2:
            return (
                <div>
                        <div className="form-group">
                            <label 
                            htmlFor="designationInput" 
                            className="form-label mt-4">
                                Current Role/Designation
                            </label>
                            {selectedDesignations.map(selectDesignation => (
                                <span className="badge bg-success mx-2" 
                                key={selectDesignation}
                                onClick={()=>handleDeselectDesignation(selectDesignation)}
                                >{selectDesignation}</span>
                            ))}
                            <input 
                            type='text' 
                            name='searchDesignationInput' 
                            id='searchDesignationInput' 
                            className='form-control my-2' 
                            placeholder='Search designation...' 
                            value={searchDesignationInput}
                            onChange={handleDesignationSearch}
                            />
                            {filteredDesignation.length > 0 &&
                                filteredDesignation.map((filterDesignation)=>{
                                    return <div key={filterDesignation._id} onClick={()=>handleDesignationClick(filterDesignation.designation)}>{filterDesignation.designation}</div> 
                                })
                            }
                            <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isCheckedDesignation}
                            onChange={()=>setIsCheckedDesignation(!isCheckedDesignation)}
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
                            onChange={(e)=>setNewDesignation(e.target.value)}
                            disabled = {!isCheckedDesignation}
                            />
                            <button 
                            type="button" 
                            className="btn btn-primary btn-sm"
                            onClick={handleManualDesignation}
                            disabled = {!isCheckedDesignation}
                            >add manually entered designation</button>
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
                            </label>
                            {selectedSkills.map(selectSkill => (
                                <span className="badge rounded-pill bg-info mx-2" 
                                key={selectSkill}
                                onClick={()=>handleDeselect(selectSkill)}
                                >{selectSkill}</span>
                            ))}
                            <input 
                            type='text' 
                            name='searchSkillInput' 
                            id='searchSkillInput' 
                            className='form-control my-2' 
                            placeholder='Search Skills' 
                            value={searchSkillInput}
                            onChange={handleSkillSearch}
                            />
                            {skillError && <p>{skillError}</p>}
                            {filteredSkills.length > 0 &&
                                filteredSkills.map((filterSkill)=>{
                                    return <div key={filterSkill._id} onClick={()=>handleSkillClick(filterSkill.skill)}>{filterSkill.skill}</div> 
                                })
                            }
                            <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isCheckedSkill}
                            onChange={()=>setIsCheckedSkill(!isCheckedSkill)}
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
                            onChange={(e)=>setNewSkill(e.target.value)}
                            disabled={!isCheckedSkill}
                            />
                            <button 
                            type="button" 
                            className="btn btn-primary btn-sm"
                            onClick={handleManualSkill}
                            disabled={!isCheckedSkill}
                            >add manually entered skill</button>
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
                </div>
            )
        case 3:
            return (
                <div>
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
                </div>
            )
        default:
            return null;
        }
  };

  return (
    <div>
        <Layout newNavBarCandidateRegister = {true} />
        <div className='container-fluid'>
        <h3>Create your account</h3>
        <GoogleAuth setProfile={setProfile}/>
        <form onSubmit={handleSubmit}>
        {renderStep()}
        {step > 1 && (<button type="button" className="btn btn-outline-info mx-3" onClick={handleBack}>Back</button>)}
        {step < 3 && (<button type="button" className="btn btn-outline-info my-3" onClick={handleNext}>Next</button>)}
        {step === 3 && (<input type='submit' value="Register" className='btn btn-primary my-3' />)}
        </form>
        </div>
    </div>
  );
};

export default CandidateRegister;