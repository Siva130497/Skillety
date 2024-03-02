import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import ATSLayout from '../../components/ATSLayout';

const JobEditingRecruiter = () => {
  const { id } = useParams();
  const [staffToken, setstaffToken] = useState("");

  const [searchJobRoleInput, setSearchJobRoleInput] = useState("");
  const [searchSkillInput, setSearchSkillInput] = useState("");
  const [jobRoleArray, setjobRoleArray] = useState([])
  const [filteredJobRoles, setFilteredJobRoles] = useState([]);
  const [selectedJobRoles, setSelectedJobRoles] = useState([]);
  const [isCheckedJobRole, setIsCheckedJobRole] = useState(false);
  const [newJobRole, setNewJobRole] = useState("");
  const [otherJobRole, setOtherJobRole] = useState([]);
  const [searchDepartmentInput, setSearchDepartmentInput] = useState("");
  const [departmentArray, setDepartmentArray] = useState([])
  const [filteredDepartment, setFilteredDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [locationArray, setLocationArray] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchLocationInput, setSearchLocationInput] = useState("");
  const [searchRoleInput, setSearchRoleInput] = useState("")
  const [roleArray, setRoleArray] = useState([])
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const initialCredentials = {
    minExperience: "",
    maxExperience: "",
    jobCategory: "",
    jobDescription: "",
    currencyType: "₹",
    minSalary: "",
    maxSalary: "",
    industry: "",
    education: "",
    workMode: "",
  };

  const [credentials, setCredentials] = useState(initialCredentials);
  const [skillArray, setSkillArray] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isCheckedSkill, setIsCheckedSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [otherSkill, setOtherSkill] = useState([]);
  const [job, setJob] = useState();


//   useEffect(() => {
//     const preloader = $('#preloader');
// if (preloader.length) {
//   setTimeout(function () {
//     preloader.fadeOut('slow', function () {
//       preloader.remove();
//     });
//   }, 500);
// }
// }, []);

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
    setstaffToken(JSON.parse(localStorage.getItem('staffToken')))
  }, [staffToken])

  useEffect(() => {
    if (id && staffToken) {
      axios.get(`https://skillety-n6r1.onrender.com/job/${id}`, {
        headers: {
          // Authorization: `Bearer ${staffToken}`,
          Accept: 'application/json'
        }
      })
        .then(res => {
          console.log(res.data)
          setJob(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [id, staffToken])

  console.log(job)

  useEffect(() => {
    if (job) {
      setSelectedJobRoles(job.jobRole)
      setSelectedSkills(job.skills)
      setSelectedDepartment(job.department)
      setSelectedRoles(job.role)
      setSelectedLocations(job.location)
      setCredentials({
        ...credentials,
        jobCategory: job.jobCategory,
        jobDescription: job.jobDescription,
        minExperience: job.minExperience,
        maxExperience: job.maxExperience,
        workMode: job.workMode,
        currencyType: job.currencyType,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        industry: job.industry,
        education: job.education,
      })
    }
  }, [job])

  const getAllJobRoles = async () => {
    try {
      const res = await axios.get("https://skillety-n6r1.onrender.com/designations", {
        headers: {
          Authorization: `Bearer ${staffToken}`,
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
    } catch (err) {
      console.log(err);
    }
  };

  const getAllSkills = async () => {
    try {
      const res = await axios.get("https://skillety-n6r1.onrender.com/skills", {
        headers: {
          Authorization: `Bearer ${staffToken}`,
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
    } catch (err) {
      console.log(err);
    }
  };

  const getAllDepartments = async () => {
    try {
      const res = await axios.get("https://skillety-n6r1.onrender.com/departments", {
        headers: {
          Authorization: `Bearer ${staffToken}`,
          Accept: 'application/json'
        }
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setDepartmentArray(result);
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
          Authorization: `Bearer ${staffToken}`,
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

  const getAllRoles = async () => {
    try {
      const res = await axios.get("https://skillety-n6r1.onrender.com/roles", {
        headers: {
          Authorization: `Bearer ${staffToken}`,
          Accept: 'application/json'
        }
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setRoleArray(result);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllJobRoles();
    getAllSkills();
    getAllDepartments();
    getAllLocations();
    getAllRoles();
  }, []);

  //jobupdating
  const jobUpdating = async (jobdetail) => {
    try {
      const res = await axios.patch(`https://skillety-n6r1.onrender.com/job-detail/${id}`, jobdetail, {
        headers: {
          Authorization: `Bearer ${staffToken}`,
          Accept: 'application/json'
        }
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        showSuccessMessage("Job has been updated successfully!")
        setCredentials(initialCredentials);
        setSelectedJobRoles([]);
        setSelectedDepartment([]);
        setSelectedLocations([]);
        setSelectedRoles([]);
        setOtherJobRole([]);
        setSelectedSkills([]);
        setOtherSkill([]);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
      showErrorMessage();
    }
  }

  //post new skill
  const postOtherSkills = async (skills) => {
    try {
      const res = await axios.post("https://skillety-n6r1.onrender.com/skills", skills, {
        headers: {
          Authorization: `Bearer ${staffToken}`,
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
          Authorization: `Bearer ${staffToken}`,
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

  const handleJobRoleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchJobRoleInput(inputValue);
    if (inputValue.length > 0) {
      const jobRoles = jobRoleArray.filter((obj) => {
        return obj.designation.toLowerCase().includes(inputValue.toLowerCase());
      });
      if (jobRoles.length > 0) {
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
  };

  const handleSkillSearch = (e) => {
    const inputValue = e.target.value;
    setSearchSkillInput(inputValue);
    if (inputValue.length > 0) {
      const jobSkills = skillArray.filter((obj) => {
        return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
      });
      if (jobSkills.length > 0) {
        setFilteredSkills(jobSkills);
      }
    } else {
      setFilteredSkills([]);
    }
  }

  const handleSkillClick = (skill) => {

    if (selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills]);
      setSearchSkillInput("");
      setFilteredSkills([]);

    } else {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchSkillInput("");
      setFilteredSkills([]);
    }
  }

  const handleManualSkill = () => {
    setSearchSkillInput("");
    const foundObject = skillArray.find(item => item.skill.toLowerCase() === newSkill.toLowerCase());
    if (foundObject) {
      alert(`Skill "${newSkill}" already in list, please search...`);
    } else {
      if (selectedSkills.includes(newSkill.toLowerCase())) {
        setSelectedSkills([...selectedSkills]);
        setNewSkill("");
      } else {
        setOtherSkill([...otherSkill, newSkill]);
        setSelectedSkills([...selectedSkills, newSkill]);
        setNewSkill("");
      }

    }
  }

  const handleDeselect = (skill) => {
    setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
    setOtherSkill(otherSkill.filter(other => other !== skill));
  }

  const handleDeselectDepartment = (department) => {
    setSelectedDepartment(selectedDepartment.filter(selectedDepartment => selectedDepartment !== department));
  }

  const handleDepartmentSearch = (e) => {
    const inputValue = e.target.value;
    setSearchDepartmentInput(inputValue);
    if (inputValue.length > 0) {
      const Department = departmentArray.filter((obj) => {
        return obj.department.toLowerCase().includes(inputValue.toLowerCase());
      });
      if (Department.length > 0) {
        setFilteredDepartment(Department);
      }
    } else {
      setFilteredDepartment([]);
    }
  };

  const handleDepartmentClick = (jobRole) => {
    setSelectedDepartment([jobRole]);
    setSearchDepartmentInput("");
    setFilteredDepartment([]);
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
    if (selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations]);
      setSearchLocationInput("");
      setFilteredLocations([]);
    } else if (selectedLocations.length === 3) {
      showErrorMessage(`You can select max of 3 locations`);

    } else if (selectedLocations.length < 3) {
      setSelectedLocations([...selectedLocations, location]);
      setSearchLocationInput("");
      setFilteredLocations([]);
    }
  }

  const handleDeselectRole = (role) => {
    setSelectedRoles(selectedRoles.filter(selectedRole => selectedRole !== role));
  }

  const handleRoleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchRoleInput(inputValue);
    if (inputValue.length > 0) {
      const roles = roleArray.filter((obj) => {
        return obj.role.toLowerCase().includes(inputValue.toLowerCase());
      });
      if (roles.length > 0) {
        setFilteredRoles(roles);
      }
    } else {
      setFilteredRoles([]);
    }
  };

  const handleRoleClick = (role) => {
    setSelectedRoles([role]);
    setSearchRoleInput("");
    setFilteredRoles([]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      selectedJobRoles.length === 0 ||
      credentials.minExperience === "" ||
      credentials.maxExperience === "" ||
      credentials.jobCategory === "" ||
      credentials.jobDescription === "" ||
      credentials.workMode === "" ||
      credentials.currencyType === "" ||
      credentials.minSalary === "" ||
      credentials.maxSalary === "" ||
      credentials.industry === "" ||
      credentials.education === "" ||
      selectedSkills.length === 0 ||
      selectedDepartment.length === 0 ||
      selectedLocations.length === 0
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    const updatedCredentials = {
      ...credentials,
      skills: selectedSkills,
      jobRole: selectedJobRoles,
      location: selectedLocations,
      department: selectedDepartment,
      role: selectedRoles,

    };

    console.log(updatedCredentials, otherJobRole, otherSkill);
    jobUpdating(updatedCredentials);
    otherSkill.length > 0 && postOtherSkills(otherSkill);
    otherJobRole.length > 0 && postOtherDesignation(otherJobRole);
  };

  useEffect(() => {
    $(document).ready(function () {
      $("#paste-button").click(function (event) {
        event.preventDefault();

        if (navigator.clipboard) {
          navigator.clipboard.readText().then(function (clipboardText) {
            $("#job-description").val(clipboardText);
          }).catch(function (err) {
            console.error('Failed to read clipboard text: ', err);
          });
        } else {
          console.log("Clipboard API not supported in this browser.");
        }
      });

      // Function to toggle visibility of the disabled input area for each group
      function toggleDisabledInputArea() {
        var isChecked = $(this).is(':checked');
        var disabledInputArea = $(this).closest('.job-post-form-group').find('.disabled-input-area');

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
    });
  }, [id, staffToken, job]);

  return (
    <div>
      {/* <div>
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
                onClick={() => handleDeselectJobRole(selectJobRole)}
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
              filteredJobRoles.map((filterJobRole) => {
                return <div key={filterJobRole._id} onClick={() => handleJobRoleClick(filterJobRole.designation)}>{filterJobRole.designation}</div>
              })
            }
            <input
              className="form-check-input"
              type="checkbox"
              checked={isCheckedJobRole}
              onChange={() => setIsCheckedJobRole(!isCheckedJobRole)}
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
              onChange={(e) => setNewJobRole(e.target.value)}
              disabled={!isCheckedJobRole}
            />
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleManualJobRole}
              disabled={!isCheckedJobRole}
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
                onClick={() => handleDeselect(selectSkill)}
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
                onClick={() => handleDeselect(additionalSkill)}
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
              If the searched skill for the particular job role not in the list, please enable the checkbox & type manually...
            </label>
            <input
              type='text'
              name='manualSkillInput'
              id='manualSkillInput'
              className='form-control my-2'
              placeholder='Enter the skills...'
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
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
              value={credentials.jobCategory}
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
      </div> */}
      {job && <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>
        <ATSLayout dashBoard={true} />

        <div class="main-content">
          <section class="section">
            <div className="post-job-section">
              <div className="admin-component-name">
                Post Job
              </div>
              <div className="card post-job-card">
                <div className="post-job-title">Post a Job </div>
                {/* <div className="post-job-sub-title">Begin from scratch</div> */}

                <div className="job-post-form-area">
                  <form action="">
                    <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">

                          <div className='job-post-form-label-with-badge'>
                            <label htmlFor="" className='job-post-form-label'>Job title / Designation<span className='form-required'>*</span></label>
                            {selectedJobRoles.map(selectJobRole => (
                              <span className="job-post-form-badge"
                                key={selectJobRole}
                                onClick={() => handleDeselectJobRole(selectJobRole)}
                              >{selectJobRole}</span>
                            ))}
                          </div>

                          <input type="search" className='job-post-form-input'
                            name='searchJobRoleInput'
                            id='searchJobRoleInput'
                            value={searchJobRoleInput}
                            onChange={handleJobRoleSearch}
                            placeholder='Enter a clear & specific title to get better responses' />

                          <div className='search-result-data-area'>
                            {filteredJobRoles.length > 0 &&
                              filteredJobRoles.map((filterJobRole) => {
                                return <div className='search-result-data' key={filterJobRole._id} onClick={() => handleJobRoleClick(filterJobRole.designation)}>{filterJobRole.designation}</div>
                              })
                            }
                          </div>

                          <div className="job-post-form-chechbox-area">
                            <label className="job-post-form-check-input view-disabled-input">
                              <input
                                type="checkbox"
                                checked={isCheckedJobRole}
                                onChange={() => setIsCheckedJobRole(!isCheckedJobRole)}
                                className="toggleDisabledInput"
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
                              placeholder='Enter job role...'
                              value={newJobRole}
                              onChange={(e) => setNewJobRole(e.target.value)}
                              disabled={!isCheckedJobRole}
                            />

                            <button
                              type="button"
                              className="manually-add-btn with-mb"
                              onClick={handleManualJobRole}
                              disabled={!isCheckedJobRole}
                            >Add manually entered jobRole</button>
                          </div>

                        </div>
                      </div>

                      <div className="col-12 col-xl-4 m-t-35 mt-xl-0">
                        <div className="job-post-form-group">
                          <label htmlFor="" className='job-post-form-label'>Employment Type<span className='form-required'>*</span></label>
                          <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'
                            id="jobCategory"
                            name="jobCategory"
                            value={credentials.jobCategory}
                            onChange={handleChange}
                            required>
                            <option value="">Please select any one job category.</option>
                            <option value="full time">Full Time, Permanent</option>
                            <option value="part time">Part Time, Permanent</option>
                            <option value="remote">Remote</option>
                            <option value="freelancer">Freelancer</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-12">
                        <div className="job-post-form-group">

                          <div className='job-post-form-label-with-badge'>
                            <label htmlFor="" className='job-post-form-label'>Mandatory Skills<span className='form-required'>*</span></label>
                            {selectedSkills.map(selectSkill => (
                              <span className="job-post-form-badge"
                                key={selectSkill}
                                onClick={() => handleDeselect(selectSkill)}
                              >{selectSkill}</span>
                            ))}
                          </div>

                          {/* <br></br>
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
                          ))} */}
                          <input type="search" className='job-post-form-input'
                            name='searchSkillInput'
                            id='searchSkillInput'
                            value={searchSkillInput}
                            onChange={handleSkillSearch}
                            placeholder='Add skills that are crucial for this job' />
                          {/* <div className='input-sub-text'>
                            <span>0/200</span>
                          </div> */}
                          {/* {skillError && <p>{skillError}</p>} */}

                          <div className='search-result-data-area'>
                            {filteredSkills.length > 0 &&
                              filteredSkills.map((filterSkill) => {
                                return <div className='search-result-data' key={filterSkill._id} onClick={() => handleSkillClick(filterSkill.skill)}>{filterSkill.skill}</div>
                              })
                            }
                          </div>

                          <div className="job-post-form-chechbox-area">
                            <label className="job-post-form-check-input view-disabled-input">
                              <input
                                type="checkbox"
                                checked={isCheckedSkill}
                                onChange={() => setIsCheckedSkill(!isCheckedSkill)}
                                className="toggleDisabledInput"
                              />
                              <span className="job-post-form-checkmark"></span>
                              If the searched skill for the particular job role not in the list, please enable the checkbox & type manually...
                            </label>
                          </div>

                          <div className="disabled-input-area">
                            <input
                              type='text'
                              name='manualSkillInput'
                              id='manualSkillInput'
                              className='job-post-form-input mt-4'
                              placeholder='Enter the skills...'
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
                            >Add manually entered skill for a particular job role
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">

                          <div className='job-post-form-label-with-badge'>
                            <label htmlFor="" className='job-post-form-label'>Department<span className='form-required'>*</span></label>
                            {/* <i class="bi bi-chevron-down"></i>
                            <select className='job-post-form-input select-input'
                              name="department" 
                              value = {credentials.department}
                              onChange={handleChange}>
                              <option value="" selected>Search and Select the best matching Option</option>
                              <option value="Option 1">Option 1</option>
                              <option value="Option 2">Option 2</option>
                            </select> */}
                            {selectedDepartment.map(selectDepartment => (
                              <span className="job-post-form-badge"
                                key={selectDepartment}
                                onClick={() => handleDeselectDepartment(selectDepartment)}
                              >{selectDepartment}</span>
                            ))}
                          </div>

                          <input
                            type='search'
                            className='job-post-form-input'
                            placeholder='Search department...'
                            value={searchDepartmentInput}
                            onChange={handleDepartmentSearch}
                          />

                          <div className='search-result-data-area'>
                            {filteredDepartment.length > 0 &&
                              filteredDepartment.map((filterDepartment) => {
                                return <div className='search-result-data' key={filterDepartment._id} onClick={() => handleDepartmentClick(filterDepartment.department)}>{filterDepartment.department}</div>
                              })
                            }
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">

                          <div className='job-post-form-label-with-badge'>
                            <label htmlFor="" className='job-post-form-label'>Role<span className='form-required'>*</span></label>
                            {selectedRoles.map(selectRole => (
                              <span className="job-post-form-badge"
                                key={selectRole}
                                onClick={() => handleDeselectRole(selectRole)}
                              >{selectRole}</span>
                            ))}
                          </div>

                          <input type="search" className='job-post-form-input'
                            name='searchRoleInput'
                            id='searchRoleInput'
                            value={searchRoleInput}
                            onChange={handleRoleSearch}
                            placeholder='Enter a clear & specific role to get better responses' />

                          <div className='search-result-data-area'>
                            {filteredRoles.length > 0 &&
                              filteredRoles.map((filterRole) => {
                                return <div className='search-result-data' key={filterRole._id} onClick={() => handleRoleClick(filterRole.role)}>{filterRole.role}</div>
                              })
                            }
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group with-sub-label">
                          <label htmlFor="" className='job-post-form-label mb-1'>Work mode<span className='form-required'>*</span></label>
                          <div className='job-post-form-sub-label'>Select where the candidate will be working from</div>
                          <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'
                            name="workMode"
                            value={credentials.workMode}
                            onChange={handleChange}>
                            <option value="" selected disabled>select the working mode</option>
                            <option value="In office" selected>In office</option>
                            <option value="In Home">In Home</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">
                          <div className='job-post-form-label-with-badge'>
                            <label htmlFor="" className='job-post-form-label'>Job location ( maximum 3 )<span className='form-required'>*</span></label>

                            {selectedLocations.map(selectLocation => (
                              <span className="job-post-form-badge"
                                key={selectLocation}
                                onClick={() => handleDeselectLocation(selectLocation)}
                              >{selectLocation}</span>
                            ))}
                          </div>

                          <input
                            type='search'
                            className='job-post-form-input'
                            placeholder='Search locations'
                            value={searchLocationInput}
                            onChange={handleLocationSearch}
                          />

                          <div className='search-result-data-area'>
                            {filteredLocations.length > 0 &&
                              filteredLocations.map((filterLocation) => {
                                return <div className='search-result-data' key={filterLocation._id} onClick={() => handleLocationClick(filterLocation.location)}>{filterLocation.location}</div>
                              })
                            }
                          </div>

                          <div className="job-post-form-chechbox-area">
                            <label className="job-post-form-check-input">
                              <input type="checkbox" />
                              <span className="job-post-form-checkmark"></span>
                              Include candidate willing to relocate to above location (s)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12">
                        <label htmlFor="" className='job-post-form-label'>Work experience (years)<span className='form-required'>*</span></label>
                      </div>
                      <div className="col-12 col-xl-4 col-lg-6 col-md-6 mb-4 mb-md-0">
                        <div className="job-post-form-group without-label">
                          {/* <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'>
                            <option value="" selected>Min</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                          </select> */}
                          <input type="text" className='job-post-form-input'
                            name="minExperience"
                            value={credentials.minExperience}
                            onChange={handleChange}
                            placeholder="Minimum experience" />
                        </div>
                      </div>

                      <div className="col-12 col-xl-4 col-lg-6 col-md-6">
                        <div className="job-post-form-group without-label">
                          {/* <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'>
                            <option value="" selected>Max</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                          </select> */}
                          <input type="text" className='job-post-form-input'
                            name="maxExperience"
                            value={credentials.maxExperience}
                            onChange={handleChange}
                            placeholder="Maximum experience" />
                        </div>
                      </div>
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12">
                        <label htmlFor="" className='job-post-form-label mb-1'>Annual Salary Range<span className='form-required'>*</span></label>
                        <div className='job-post-form-sub-label'>Enter the salary offered for this job</div>
                      </div>
                      <div className="col-4 col-xl-2 col-lg-2 col-md-2">
                        <div className="job-post-form-group without-label">
                          <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input text-center'
                            name="currencyType"
                            value={credentials.currencyType}
                            onChange={handleChange}>
                            <option value="₹" selected>₹</option>
                            <option value="$">$</option>
                            {/* <option value="">€</option>
                            <option value="">¥</option> */}
                          </select>
                        </div>
                      </div>

                      <div className="col-8 col-xl-3 col-lg-5 col-md-5 mb-4 mb-md-0">
                        <div className="job-post-form-group without-label">
                          {/* <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'>
                            <option value="" selected>Min</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                          </select> */}
                          <input type="text" className='job-post-form-input'
                            name="minSalary"
                            value={credentials.minSalary}
                            onChange={handleChange}
                            placeholder="Min salary" />
                        </div>
                      </div>

                      <div className="col-8 offset-4 offset-md-0 col-xl-3 col-lg-5 col-md-5">
                        <div className="job-post-form-group without-label">
                          {/* <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'>
                            <option value="" selected>Max</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                          </select> */}
                          <input type="text" className='job-post-form-input'
                            name="maxSalary"
                            value={credentials.maxSalary}
                            onChange={handleChange}
                            placeholder="Max salary" />
                        </div>
                      </div>
                      {/* <div className="col-12">
                        <div className="job-post-form-chechbox-area">
                          <label className="job-post-form-check-input">
                            <input type="checkbox" />
                            <span className="job-post-form-checkmark"></span>
                            Include candidate willing to relocate to above location (s)
                          </label>
                        </div>
                      </div> */}
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">
                          <label htmlFor="" className='job-post-form-label'>Company industry you are hiring from<span className='form-required'>*</span></label>
                          <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'
                            name="industry"
                            value={credentials.industry}
                            onChange={handleChange}>
                            <option value="" selected disabled>Select industry</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                            <option value="Manufacturing">Manufacturing</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">
                          <label htmlFor="" className='job-post-form-label'>Educational Qualification<span className='form-required'>*</span></label>
                          <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'
                            name="education"
                            value={credentials.education}
                            onChange={handleChange}>
                            <option value="" selected disabled>Select Educational Qualification</option>
                            <option value="High School Diploma">High School Diploma</option>
                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                            <option value="Master's Degree">Master's Degree</option>
                            <option value="Doctorate">Doctorate</option>
                            <option value="Professional Certification">Professional Certification</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">
                          <label htmlFor="" className='job-post-form-label'>Candidate industry<span className='form-required'>*</span></label>
                          <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'>
                            <option value="" selected>Select the industry you’re looking to hire from</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                          </select>
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">
                          <label htmlFor="" className='job-post-form-label'>Diversity hiring</label>
                          <div className="job-post-form-chechbox-area with-bg">
                            <label className="job-post-form-check-input">
                              <input type="checkbox" />
                              <span className="job-post-form-checkmark"></span>
                              Hire women candidates for thi job and promote diversity in the workplace
                            </label>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">
                          <label htmlFor="" className='job-post-form-label mb-1'>Job description</label>
                          <div className='job-post-form-sub-label'>Write a Job description or
                            <button className='paste-btn' id="paste-button">
                              Paste your JD
                            </button>
                          </div>
                          <textarea rows="5" className='job-post-form-input paste-input'
                            name='jobDescription'
                            value={credentials.jobDescription}
                            onChange={handleChange}
                            placeholder='' id="job-description"
                            required></textarea>
                        </div>
                      </div>
                    </div>

                    {/* <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <div className="job-post-form-group">
                          <label htmlFor="" className='job-post-form-label'>Do you have more than one vacancy for this job?</label>
                          <div className="job-post-radio-select-area">
                            <label className="job-post-radio-button">
                              <input type="radio" name="job-post-radio-option" value="Yes" />
                              <span className="job-post-radio"></span>
                              Yes
                            </label>

                            <label className="job-post-radio-button">
                              <input type="radio" name="job-post-radio-option" value="No" />
                              <span className="job-post-radio"></span>
                              No
                            </label>

                          </div>
                          <div className="job-post-form-chechbox-area mb-4">
                            <label className="job-post-form-check-input font-weight-600">
                              <input type="checkbox" />
                              <span className="job-post-form-checkmark"></span>
                              Request candidate for video profile
                            </label>
                          </div>
                          <div className="job-post-form-chechbox-area">
                            <label className="job-post-form-check-input font-weight-600">
                              <input type="checkbox" />
                              <span className="job-post-form-checkmark"></span>
                              Include walk-in details
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="job-post-page-divider"></div>

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-8">
                        <label htmlFor="" className='job-post-form-label mb-2'>Manage responses</label>
                        <div className="job-post-form-chechbox-area mb-4">
                          <label className="job-post-form-check-input">
                            <input type="checkbox" />
                            <span className="job-post-form-checkmark"></span>
                            Notify me about&nbsp;<span className='font-weight-600'>AI-recommended applicants through email</span>
                          </label>
                        </div>
                        <label htmlFor="" className='job-post-form-custom-label'>
                          On which email ids do you want to receive notifications of matching applies?
                        </label>
                        <div className="job-post-form-group without-label">
                          <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'>
                            <option value="" selected>Add Email Ids</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row m-b-35">
                      <div className="col-12 col-xl-4">
                        <label htmlFor="" className='job-post-form-custom-label'>
                          How Often should mails be sent ?
                        </label>
                        <div className="job-post-form-group without-label">
                          <i class="bi bi-chevron-down"></i>
                          <select className='job-post-form-input select-input'>
                            <option value="" selected>Select an option</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                          </select>
                        </div>
                      </div>
                    </div> */}

                  </form>
                </div>
              </div>
              <div className="post-job-btn-area">
                <button className='post-job-btn' onClick={handleSubmit}>Update a Job</button>
              </div>
            </div>
          </section>
        </div >
        <Footer />
      </div >}
    </div >
  )
}

export default JobEditingRecruiter