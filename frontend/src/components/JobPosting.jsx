import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";


const JobPosting = ({employeeId, staffToken, clientToken, companyId, role}) => {
  
    const [searchJobRoleInput, setSearchJobRoleInput] = useState("");
    const [searchSkillInput, setSearchSkillInput] = useState("");
    const [jobRoleArray, setjobRoleArray] = useState([])
    const [filteredJobRoles, setFilteredJobRoles] = useState([]);
    const [selectedJobRoles, setSelectedJobRoles] = useState([]);
    const [isCheckedJobRole, setIsCheckedJobRole] = useState(false);
    const [newJobRole, setNewJobRole] = useState("");
    const [otherJobRole, setOtherJobRole] = useState([]);

    const initialCredentials = {
        year: "",
        month: "",
        jobCategory: "",
        jobDescription: "",
      };
    
    const [credentials, setCredentials] = useState(initialCredentials);
    const [skillError, setSkillError] = useState("");
    const [skillArray, setSkillArray] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [isCheckedSkill, setIsCheckedSkill] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [otherSkill, setOtherSkill] = useState([]);
    const [additionalSkills, setAdditionalSkills] = useState([]);
    
    const totalMonths = parseInt(credentials.year * 12) + parseInt(credentials.month);
    const maxSkillNum = totalMonths <= 24 ? 6 : totalMonths <= 48 ? 8 : totalMonths <= 96 ? 10 : 12;
    
    const getAllJobRoles = async () => {
        try{
            const res = await axios.get("https://skillety-n6r1.onrender.com/designations", {
              headers: {
                  Authorization: `Bearer ${staffToken ? staffToken : clientToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setjobRoleArray(result);
              } else {
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
      };

    const getAllSkills = async () => {
        try{
            const res = await axios.get("https://skillety-n6r1.onrender.com/skills", {
              headers: {
                  Authorization: `Bearer ${staffToken ? staffToken : clientToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setSkillArray(result);
            } else {
              console.log(result);
          }
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getAllJobRoles();
        getAllSkills();
    },[]);

    //jobposting
    const jobPosting = async(jobdetail) => {
      try{
          const res = await axios.post("https://skillety-n6r1.onrender.com/job-detail", jobdetail, {
              headers: {
                  Authorization: `Bearer ${staffToken ? staffToken : clientToken}`,
                  Accept: 'application/json'
              }
            });
          const result = res.data;
          if (!result.error) {
              console.log(result);
              alert("Job has been posted successfully!")
              setCredentials(initialCredentials);
              setSelectedJobRoles([]);
              setOtherJobRole([]);
              setSelectedSkills([]);
              setAdditionalSkills([]);
              setOtherSkill([]);
          } else {
              console.log(result);
          }
      }catch(err){
          console.log(err);
      }
    }

    //post new skill
    const postOtherSkills = async(skills) => {
      try{
          const res = await axios.post("https://skillety-n6r1.onrender.com/skills", skills, {
            headers: {
                Authorization: `Bearer ${staffToken ? staffToken : clientToken}`,
                Accept: 'application/json'
            }
          });
          const result = res.data;
          if (!result.error) {
              console.log(result);
          } else {
              console.log(result);
          }
      }catch(err){
          console.log(err);
      }
  }

  //post new designation
  const postOtherDesignation = async(designation) => {
      try{
          const res = await axios.post("https://skillety-n6r1.onrender.com/designations", designation, {
            headers: {
                Authorization: `Bearer ${staffToken ? staffToken : clientToken}`,
                Accept: 'application/json'
            }
          });
          const result = res.data;
          if (!result.error) {
              console.log(result);
          } else {
              console.log(result);
          }
      }catch(err){
          console.log(err);
      }
  }

    const handleJobRoleSearch = (e) => {
        const inputValue = e.target.value;
        setSearchJobRoleInput(inputValue);
        if(inputValue.length > 0){
            const jobRoles = jobRoleArray.filter((obj) => {
                return obj.designation.toLowerCase().includes(inputValue.toLowerCase());
            });
            if(jobRoles.length > 0){
                setFilteredJobRoles(jobRoles);
            }
        } else {
            setFilteredJobRoles([]);
        }
    };
  
    const handleJobRoleClick = (jobRole) => {
        setSelectedJobRoles([jobRole]);
        setSearchJobRoleInput("");
        setFilteredJobRoles([]);
    }
    
    const handleDeselectJobRole = (jobRole) => {
        setSelectedJobRoles(selectedJobRoles.filter(selectedJobRole => selectedJobRole !== jobRole));
        setOtherJobRole(otherJobRole.filter(other => other !== jobRole));
    }
    
    const handleManualJobRole = () => {
        setSearchJobRoleInput("");
        const foundObject = jobRoleArray.find(item => item.designation.toLowerCase() === newJobRole.toLowerCase());
        if (foundObject) {
          alert(`Job role "${newJobRole}" already in list, please search...`);
          setNewJobRole("");
        } else {
          setOtherJobRole([newJobRole]);
          setSelectedJobRoles([newJobRole]);
          setNewJobRole("");
        }
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [name]: value,
        }));
    
        if (name === "year" || name === "month") {
            setSkillError("");
        }
    };
    
    const handleSkillSearch = (e) => {
        const inputValue = e.target.value;
        setSearchSkillInput(inputValue);
        if(inputValue.length > 0){
            const jobSkills = skillArray.filter((obj) => {
                return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
            });
            if(jobSkills.length > 0){
                setFilteredSkills(jobSkills);
            }
        } else {
            setFilteredSkills([]);
        }
    }
    
    const handleSkillClick = (skill) => {
        if(totalMonths > 0){
            if (selectedSkills.includes(skill)) {
                setSelectedSkills([...selectedSkills]);
                setSearchSkillInput("");
                setFilteredSkills([]);
            } else if(selectedSkills.length === maxSkillNum){
                alert(`You can select max of ${maxSkillNum} skills for a particular job role as mandatory, other than that it will add to additional skills`);
                if(additionalSkills.includes(skill)){
                  setAdditionalSkills([...additionalSkills]);
                  setSearchSkillInput("");
                  setFilteredSkills([]);
                }else{
                  setAdditionalSkills([...additionalSkills, skill]); 
                  setSearchSkillInput("");
                  setFilteredSkills([]);
                }
            } else if(selectedSkills.length < maxSkillNum){
                setSelectedSkills([...selectedSkills, skill]);
                setSearchSkillInput("");
                setFilteredSkills([]);
            }
        }else{
            setSkillError("Please enter the experience first...");
            setSearchSkillInput("");
            setFilteredSkills([]);
        }
    }
    
    
    const handleManualSkill = () => {
        if(totalMonths > 0){
            setSearchSkillInput("");
            if (selectedSkills.length === maxSkillNum){
            alert(`You can select max of ${maxSkillNum} skills for a particular job role as mandatory, other than that it will add to additional skills`);
            if(additionalSkills.includes(newSkill)){
                setAdditionalSkills([...additionalSkills]);
                setNewSkill("");
            }else{
                setAdditionalSkills([...additionalSkills, newSkill]);
                setOtherSkill([...otherSkill, newSkill]);
                setNewSkill("");
            }
            } else if(selectedSkills.length < maxSkillNum){
            const foundObject = skillArray.find(item => item.skill.toLowerCase() === newSkill.toLowerCase());
            if (foundObject) {
                alert(`Skill "${newSkill}" already in list, please search...`);
            } else {
                setOtherSkill([...otherSkill, newSkill]);
                setSelectedSkills([...selectedSkills, newSkill]);
            }
            setNewSkill("");
            }
        }else{
            setSkillError("Please enter the experience first...");
            setNewSkill("");
        }
    }
    
    
    const handleDeselect = (skill) => {
        setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
        setOtherSkill(otherSkill.filter(other => other !== skill));
        additionalSkills.length > 0 && setAdditionalSkills(additionalSkills.filter(additionalSkill => additionalSkill !== skill));
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        const minSkillNum = totalMonths <= 24 ? 4 : totalMonths <= 48 ? 6 : totalMonths <= 96 ? 8 : 10;
        if (
          selectedJobRoles.length === 0 ||
          credentials.year === "" ||
          credentials.month === "" ||
          credentials.jobCategory === "" ||
          credentials.jobDescription === "" ||
          selectedSkills.length === 0
        ) {
          alert("Please fill all the required fields.");
          return;
        }
    
        if (selectedSkills.length < minSkillNum) {
          alert("Please select at least " + minSkillNum + " mandatory skills for a particular job role.");
          return;
        }
    
        const id = uuidv4();
        const updatedCredentials = {
          ...credentials,
          skills: selectedSkills,
          jobRole: selectedJobRoles,
          id,
          role,
        };
        if(role === "Recruiter"){
          updatedCredentials.recruiterId = employeeId;
        }else if(role === "Client"){
          updatedCredentials.clientId = employeeId;
          updatedCredentials.companyId = companyId;
        }else{
          updatedCredentials.clientStaffId = employeeId;
          updatedCredentials.companyId = companyId;
        }
        const updatedCredentialsWithAdditionalSkills = {
          ...updatedCredentials,
          additionalSkill:additionalSkills,
        }
        const jobDetails = additionalSkills.length > 0 ? updatedCredentialsWithAdditionalSkills : updatedCredentials;
        console.log(jobDetails, otherJobRole, otherSkill);
        jobPosting(jobDetails);
        otherSkill.length > 0 && postOtherSkills(otherSkill);
        otherJobRole.length > 0 && postOtherDesignation(otherJobRole);
    };

  return (
    <div>
        <div>
              <h2>Job Posting</h2>
              <form onSubmit={handleSubmit}>
               <div className="form-group">
                 <label 
                 htmlFor="jobRoleInput" 
                 className="form-label mt-4">
                   Job Role
                 </label>
                 {selectedJobRoles.map(selectJobRole => (
                     <span className="badge bg-success mx-2" 
                     key={selectJobRole}
                     onClick={()=>handleDeselectJobRole(selectJobRole)}
                     >{selectJobRole}</span>
                 ))}
                 <input 
                 type='text' 
                 name='searchJobRoleInput' 
                 id='searchJobRoleInput' 
                 className='form-control my-2' 
                 placeholder='Search job role...' 
                 value={searchJobRoleInput}
                 onChange={handleJobRoleSearch}
                 />
                 {filteredJobRoles.length > 0 &&
                     filteredJobRoles.map((filterJobRole)=>{
                         return <div key={filterJobRole._id} onClick={()=>handleJobRoleClick(filterJobRole.designation)}>{filterJobRole.designation}</div> 
                     })
                 }
                 <input
                 className="form-check-input"
                 type="checkbox"
                 checked={isCheckedJobRole}
                 onChange={()=>setIsCheckedJobRole(!isCheckedJobRole)}
                 />
                 <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                   If your searched job role not in the list, please enable the checkbox & type manually...
                 </label>
                 <input 
                 type='text' 
                 name='manualJobRoleInput' 
                 id='manualJobRoleInput' 
                 className='form-control my-2' 
                 placeholder='Enter job role...'
                 value={newJobRole}
                 onChange={(e)=>setNewJobRole(e.target.value)}
                 disabled = {!isCheckedJobRole}
                 />
                 <button 
                 type="button" 
                 className="btn btn-primary btn-sm"
                 onClick={handleManualJobRole}
                 disabled = {!isCheckedJobRole}
                 >add manually entered jobRole</button>
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
                 onChange={handleChange}
                 placeholder="years in number"
                 />
                 <input 
                 type="number" 
                 className="form-control" 
                 id="monthInput"  
                 name="month" 
                 value={credentials.month}
                 onChange={handleChange}
                 placeholder="months in number"
                 />
               </div>
               <div className='form-group'>
                 <label 
                 htmlFor="mandatorySkillInput" 
                 className="form-label mt-4">
                   Mandatory Skills 
                 </label>
                 {selectedSkills.map(selectSkill => (
                   <span className="badge rounded-pill bg-info mx-2" 
                   key={selectSkill}
                   onClick={()=>handleDeselect(selectSkill)}
                   >{selectSkill}</span>
                 ))}
                 <br></br>
                 {additionalSkills.length > 0 &&
                   <label 
                   htmlFor="additionalSkillInput" 
                   className="form-label mt-4">
                     Additional Skills 
                   </label>
                 }
                 {additionalSkills.map(additionalSkill => (
                   <span className="badge rounded-pill bg-info mx-2" 
                   key={additionalSkill}
                   onClick={()=>handleDeselect(additionalSkill)}
                   >{additionalSkill}</span>
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
                   If the searched skill for the particular job role not in the list, please enable the checkbox & type manually...
                 </label>
                 <input 
                 type='text' 
                 name='manualSkillInput' 
                 id='manualSkillInput' 
                 className='form-control my-2' 
                 placeholder='Enter the skills...'
                 value={newSkill}
                 onChange={(e)=>setNewSkill(e.target.value)}
                 disabled={!isCheckedSkill}
                 />
                 {skillError && <p>{skillError}</p>}
                 <button 
                 type="button" 
                 className="btn btn-primary btn-sm"
                 onClick={handleManualSkill}
                 disabled={!isCheckedSkill}
                 >add manually entered skill for a particular job role</button>
               </div>
               <div className="form-group">
                 <label 
                 htmlFor="jobCategory" 
                 className="form-label mt-4">
                   Job Category 
                 </label>
                 <select 
                 className="form-select" 
                 id="jobCategory"
                 name="jobCategory" 
                 value = {credentials.jobCategory}
                 onChange={handleChange}
                 required>
                   <option value="">Please select any one job category.</option>
                   <option value="full time">Full time</option>
                   <option value="part time">Part time</option>
                   <option value="remote">Remote</option>
                   <option value="freelancer">Freelancer</option>
                 </select>
               </div>
               <div className="form-group">
                 <label 
                 htmlFor="jobDescriptionInput" 
                 className="form-label mt-4">
                   Job Description
                 </label>
                 <textarea 
                 className="form-control" 
                 id="jobDescriptionTextarea" 
                 rows="3"
                 name='jobDescription'
                 value={credentials.jobDescription}
                 onChange={handleChange}
                 placeholder="Enter the job description"
                 required></textarea>
               </div>
               <input type='submit' value="Post" className='btn btn-primary my-3' />
             </form>
             </div>
    </div>
  )
}

export default JobPosting