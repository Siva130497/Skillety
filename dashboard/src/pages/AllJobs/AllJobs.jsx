import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './AllJobs.css';
import './AllJobs-responsive.css';
import $ from 'jquery';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const AllJobs = () => {
    const { getProtectedData } = useContext(AuthContext);

    const [staffToken, setStaffToken] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [allJobs, setAllJobs] = useState([]);
    const [checkBoxfilters, setCheckBoxFilters] = useState([]);
    const [checkBoxFilteredJobs, setCheckBoxFilteredJobs] = useState([]);
    const [selectedJobViewDetail, setSelectedJobViewDetail] = useState();
    const [searchFilteredJobs, setSearchFilteredJobs] = useState([]);
    const [searchFilteredJobMsg, setSearchFilteredJobMsg] = useState("");
    const [prevSearchFilteredJobs, setPrevSearchFilteredJobs] = useState([]);
    const [checkBoxFilteredJobMsg, setCheckBoxFilteredJobMsg] = useState("");
    const [searchJobRoleInput, setSearchJobRoleInput] = useState("");

    const [candidateDetail, setCandidateDetail] = useState([]);
    const [assignedCandidates, setAssignedCandidates] = useState([]);
    const [searchCandidateByName, setSearchCandidateByName] = useState([]);
    const [searchCandidateByNameMsg, setSearchCandidateByNameMsg] = useState("");
    const [searchCandidateInput, setSearchCandidateInput] = useState("");

    const [x, setX] = useState([0, 10]);

    useEffect(() => {
        $(document).ready(function () {
        });

    }, []);

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        if (staffToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(staffToken);
                    console.log(userData);
                    setEmployeeId(userData.id);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
        }
    }, [staffToken]);

    const getPostedjobs = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/posted-jobs`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAllJobs(result.reverse());
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAllCandidateDetail = async () => {
        try {
            const response = await axios.get('https://skillety.onrender.com/candidate-Detail', {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setCandidateDetail(result);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAssignedCandidates = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/assigned-candidates`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAssignedCandidates(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (staffToken) {
            getPostedjobs();
            getAllCandidateDetail();
            getAssignedCandidates();
        }

    }, [staffToken])

    const getRecruiterNameWhoAssignedCandidate = async (id) => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/staff/${id}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                alert(`this candidate already assigned to this job by company saff ${result.name}`);
                setAssignedCandidates([...assignedCandidates]);
                setSearchCandidateInput("")
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const assigningCandidate = async (candidate) => {
        try {
            const res = await axios.post('https://skillety.onrender.com/candidate-assigning', candidate, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                alert("candidate assigned successfully!");
                getAssignedCandidates();
                setSearchCandidateInput("")
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleJobSearch = () => {
        if (searchJobRoleInput) {
            if (checkBoxFilteredJobs.length > 0) {
                const filteredJobs = checkBoxFilteredJobs.filter((job) => job.jobRole[0].toLowerCase().includes(searchJobRoleInput.toLowerCase()));
                if (filteredJobs.length > 0) {
                    setSearchFilteredJobs(filteredJobs);
                } else {
                    setSearchFilteredJobMsg("No such job found..!")
                }
            } else {
                if (!checkBoxFilteredJobMsg) {
                    const filteredJobs = allJobs.filter((job) => job.jobRole[0].toLowerCase().includes(searchJobRoleInput.toLowerCase()));
                    if (filteredJobs.length > 0) {
                        setSearchFilteredJobs(filteredJobs);
                    } else {
                        setSearchFilteredJobMsg("No such job found..!")
                    }
                }
            }
        } else {
            if (checkBoxFilteredJobs.length > 0) {
                setSearchFilteredJobs(checkBoxFilteredJobs);
            }
            setSearchFilteredJobs(allJobs);
        }
    }

    const handleCheckboxChange = (category) => {
        const updatedFilters = checkBoxfilters.includes(category)
            ? checkBoxfilters.filter((filter) => filter !== category)
            : [...checkBoxfilters, category];
        setCheckBoxFilters(updatedFilters);
        if (updatedFilters.length > 0) {
            if (searchFilteredJobs.length > 0) {
                setSearchFilteredJobMsg("");
                setPrevSearchFilteredJobs(searchFilteredJobs)
                const filtered = searchFilteredJobs.filter((job) => updatedFilters.includes(job.jobCategory));
                if (filtered.length > 0) {
                    setSearchFilteredJobs(filtered);
                } else {
                    setSearchFilteredJobMsg("No such job found");
                }
            } else {
                if (!searchFilteredJobMsg) {
                    const filtered = allJobs.filter((job) => updatedFilters.includes(job.jobCategory));
                    setCheckBoxFilteredJobMsg("");
                    if (filtered.length > 0) {
                        setCheckBoxFilteredJobs(filtered);
                    } else {
                        setCheckBoxFilteredJobMsg("No such job found");
                    }
                }
            }
        } else {
            if (searchFilteredJobs.length > 0) {
                setSearchFilteredJobMsg("");
                setSearchFilteredJobs(prevSearchFilteredJobs);
            } else {
                setCheckBoxFilteredJobMsg("");
                setCheckBoxFilteredJobs(allJobs);
            }
        }
    };

    const handleViewJobDetail = (id) => {
        const selectedJob = allJobs.find(job => job.id === id);
        setSelectedJobViewDetail(selectedJob);
    }

    const handleCandidateSearch = () => {
        const searchInput = searchCandidateInput.toLowerCase();
        const [searchFirstName, searchLastName] = searchInput.split(' ');

        const filteredCandidates = candidateDetail.filter(candidate => {
            const firstName = candidate.firstName.toLowerCase();
            const lastName = candidate.lastName.toLowerCase();

            if (searchLastName) {
                return (
                    (firstName.includes(searchFirstName) && lastName.includes(searchLastName)) ||
                    (firstName.includes(searchLastName) && lastName.includes(searchFirstName))
                );
            } else {
                return firstName.includes(searchFirstName) || lastName.includes(searchFirstName);
            }
        });
        if (filteredCandidates.length > 0) {
            setSearchCandidateByName(filteredCandidates);
        } else {
            setSearchCandidateByNameMsg("There is no candidate in this name..!")
        }
    }

    const handleAssigning = (id) => {
        const AssignedCandidate = candidateDetail.find(candidate => candidate.id === id);
        const alreadyAssignedCandidate = assignedCandidates
            .filter(assignCand => assignCand.id === AssignedCandidate.id)
            .find(cand => cand.jobId === selectedJobViewDetail.id);
        if (alreadyAssignedCandidate) {
            getRecruiterNameWhoAssignedCandidate(alreadyAssignedCandidate.recruiterId);
        } else {
            const newAssignedCandidate = { ...AssignedCandidate, recruiterId: employeeId, jobId: selectedJobViewDetail.id }
            assigningCandidate(newAssignedCandidate);
        }
    }

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                All Jobs
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className='admin-lg-table-area man-app'>

                                            <div className='man-app-title-area candidate'>
                                                <div>
                                                    <div className="man-app-title">
                                                        All Jobs Details
                                                    </div>
                                                    <div className="man-app-sub-title">
                                                        Total Jobs :&nbsp;
                                                        <span>{searchFilteredJobMsg ? "0" : searchFilteredJobs.length > 0 ? searchFilteredJobs.length : checkBoxFilteredJobMsg ? "0" : checkBoxFilteredJobs.length > 0 ? checkBoxFilteredJobs.length : (!searchJobRoleInput && checkBoxfilters.length === 0) ? allJobs.length : null}</span>
                                                    </div>
                                                </div>
                                                {allJobs.length > 0 && <div className="recruiter-search-input-area">
                                                    <input type="search" className='recruiter-search-input' placeholder='Search job role...'
                                                        value={searchJobRoleInput}
                                                        onChange={(e) => {
                                                            setSearchJobRoleInput(e.target.value);
                                                            setSearchFilteredJobs([]);
                                                            setSearchFilteredJobMsg("");
                                                        }}
                                                        onKeyPress={(event) => {
                                                            event.key === "Enter" && handleJobSearch();
                                                        }} />
                                                    <i className='bi bi-search search-icon'></i>
                                                    <button className='recruiter-search-btn' onClick={handleJobSearch}>Search</button>
                                                </div>}

                                            </div>
                                            {allJobs.length > 0 && <div className="rec-work-mode-area">
                                                <label className="recruite-form-check-input">
                                                    <input type="checkbox"
                                                        checked={checkBoxfilters.includes('full time')}
                                                        onChange={() => handleCheckboxChange('full time')} />
                                                    <span className="recruite-form-checkmark"></span>
                                                    Full Time
                                                </label>

                                                <label className="recruite-form-check-input">
                                                    <input type="checkbox"
                                                        checked={checkBoxfilters.includes('part time')}
                                                        onChange={() => handleCheckboxChange('part time')} />
                                                    <span className="recruite-form-checkmark"></span>
                                                    Part Time
                                                </label>

                                                <label className="recruite-form-check-input">
                                                    <input type="checkbox"
                                                        checked={checkBoxfilters.includes('contract')}
                                                        onChange={() => handleCheckboxChange('contract')} />
                                                    <span className="recruite-form-checkmark"></span>
                                                    Contract
                                                </label>

                                                <label className="recruite-form-check-input">
                                                    <input type="checkbox"
                                                        checked={checkBoxfilters.includes('freelancer')}
                                                        onChange={() => handleCheckboxChange('freelancer')} />
                                                    <span className="recruite-form-checkmark"></span>
                                                    Freelancer
                                                </label>
                                            </div>}

                                            {allJobs.length > 0 ?
                                                <div className="table-responsive table-scroll-area">
                                                    <table className="table table-striped table-hover admin-lg-table">
                                                        <tr className='dash-table-row man-app'>
                                                            <th className='dash-table-head'>No.</th>
                                                            <th className='dash-table-head'>Job Role</th>
                                                            <th className='dash-table-head'>Job Category</th>
                                                            <th className='text-center'>View</th>
                                                        </tr>

                                                        {/* table data */}
                                                        {searchFilteredJobMsg ?
                                                            <tr>
                                                                <td colSpan={4} className='text-secondary text-center'>
                                                                    {searchFilteredJobMsg}
                                                                </td>
                                                            </tr> :
                                                            searchFilteredJobs.length > 0 ?
                                                                searchFilteredJobs.slice(x[0], x[1]).map((Job, index) => {
                                                                    return (
                                                                        <tr className='dash-table-row client' key={Job.id}>
                                                                            <td className='dash-table-data1'>{index + 1}.</td>
                                                                            <td className='dash-table-data1 text-capitalized'>
                                                                                {Job?.jobRole[0]}
                                                                            </td>
                                                                            <td className='dash-table-data1 text-capitalized'>
                                                                                {Job?.jobCategory}
                                                                            </td>

                                                                            <td className='text-center'>
                                                                                <div className="action-btn-area">
                                                                                    <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#invoiceModal" onClick={() => handleViewJobDetail(Job.id)}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }) :
                                                                checkBoxFilteredJobMsg ?
                                                                    (
                                                                        <tr>
                                                                            <td colSpan={4} className='text-secondary text-center'>
                                                                                {checkBoxFilteredJobMsg}
                                                                            </td>
                                                                        </tr>
                                                                    ) :
                                                                    checkBoxFilteredJobs.length > 0 ?
                                                                        (checkBoxFilteredJobs.slice(x[0], x[1]).map((Job, index) => {
                                                                            return (
                                                                                <tr className='dash-table-row client' key={Job.id}>
                                                                                    <td className='dash-table-data1'>{index + 1}.</td>
                                                                                    <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.jobRole[0]}
                                                                                    </td>
                                                                                    <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.jobCategory}
                                                                                    </td>

                                                                                    <td className='text-center'>
                                                                                        <div className="action-btn-area">
                                                                                            <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#invoiceModal" onClick={() => handleViewJobDetail(Job.id)}>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                                </svg>
                                                                                            </button>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })) :
                                                                        (!searchJobRoleInput && checkBoxfilters.length === 0) ?
                                                                            (allJobs.slice(x[0], x[1]).map((Job, index) => {
                                                                                return (
                                                                                    <tr className='dash-table-row client' key={Job.id}>
                                                                                        <td className='dash-table-data1'>{index + 1}.</td>
                                                                                        <td className='dash-table-data1 text-capitalized'>
                                                                                            {Job?.jobRole[0]}
                                                                                        </td>
                                                                                        <td className='dash-table-data1 text-capitalized'>
                                                                                            {Job?.jobCategory}
                                                                                        </td>

                                                                                        <td className='text-center'>
                                                                                            <div className="action-btn-area">
                                                                                                <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#invoiceModal" onClick={() => handleViewJobDetail(Job.id)}>
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                                    </svg>
                                                                                                </button>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })) :
                                                                            null}
                                                    </table>
                                                </div> :
                                                <div className="no-data-created-area">
                                                    <div className='no-data-created'>
                                                        <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                        <div className='no-data-text'>No Jobs Created Yet..!</div>
                                                    </div>
                                                </div>
                                            }
                                        </div>

                                        {/* <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View More&nbsp;&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17157 0.464466C8.97631 0.269204 8.65973 0.269204 8.46447 0.464466C8.2692 0.659728 8.2692 0.976311 8.46447 1.17157L11.2929 4L8.46447 6.82843C8.2692 7.02369 8.2692 7.34027 8.46447 7.53553C8.65973 7.7308 8.97631 7.7308 9.17157 7.53553L12.3536 4.35355ZM0 4.5L12 4.5V3.5L0 3.5L0 4.5Z" fill="#0F75C5" />
                                                </svg>
                                            </a>
                                        </div> */}
                                        <div className="table-pagination-area pt-3">
                                            <div className="pagination-btn-area">
                                                {x[0] > 0 && <button className='pag-prev-btn' onClick={() => setX([x[0] - 10, x[1] - 10])}>
                                                    <i class="bi bi-chevron-left"></i>
                                                </button>}
                                                {(!searchFilteredJobMsg && !checkBoxFilteredJobMsg) && <div className='pag-page'>
                                                    <span className='current-page'>{Math.ceil(x[0] / 10) + 1}</span>&nbsp;/&nbsp;
                                                    <span className='total-page'>{searchFilteredJobs.length > 0 ? Math.ceil(searchFilteredJobs.length / 10) : checkBoxFilteredJobs.length > 0 ? Math.ceil(checkBoxFilteredJobs.length / 10) : Math.ceil(allJobs.length / 10)}</span>
                                                </div>}
                                                {(searchFilteredJobMsg ? !searchFilteredJobMsg : searchFilteredJobs.length > 0 ? (searchFilteredJobs.slice(x[0], x[1]).length === 10 && searchFilteredJobs.length > x[1]) : checkBoxFilteredJobMsg ? !checkBoxFilteredJobMsg : checkBoxFilteredJobs.length > 0 ? (checkBoxFilteredJobs.slice(x[0], x[1]).length === 10 && checkBoxFilteredJobs.length > x[1]) : (allJobs.slice(x[0], x[1]).length === 10 && allJobs.length > x[1])) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
                                                    <i class="bi bi-chevron-right"></i>
                                                </button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Invoice view modal here */}
                <div className="modal fade" id="invoiceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client" id="exampleModalLabel">
                                    Job Details_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-view-card candidate">
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Job Role</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedJobViewDetail?.jobRole[0]}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Job Category</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedJobViewDetail?.jobCategory}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Job Mandatory Skills</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="cand-skills-area">
                                                {selectedJobViewDetail?.skills.map(skill => {
                                                    return (
                                                        <span className='cand-skill text-capitalized'>{skill}</span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Needed Experience</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head text-capitalized">
                                                <span>{selectedJobViewDetail?.minExperience} - {selectedJobViewDetail?.maxExperience}</span>
                                                &nbsp;years&nbsp;
                                                {/* <span>6</span>
                                                &nbsp;months */}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Job Description</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedJobViewDetail?.jobDescription}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Salary Range</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head">{selectedJobViewDetail?.currencyType}{selectedJobViewDetail?.minSalary} - {selectedJobViewDetail?.currencyType}{selectedJobViewDetail?.maxSalary}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Department</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedJobViewDetail?.department}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Education</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedJobViewDetail?.education}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Industry</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedJobViewDetail?.industry}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Locations</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="cand-skills-area">
                                                {selectedJobViewDetail?.location.map(location => {
                                                    return (
                                                        <span className='cand-skill text-capitalized'>{location}</span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Role</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedJobViewDetail?.role}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Working Mode</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedJobViewDetail?.workMode}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4">
                                            <div className="view-det-head">Assigned Candidates to this job</div>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                                            <div className="cand-skills-area">
                                                {assignedCandidates
                                                    .filter(cand => cand.jobId === selectedJobViewDetail?.id).length > 0 ?
                                                    assignedCandidates
                                                        .filter(cand => cand.jobId === selectedJobViewDetail?.id)
                                                        .map((candidate, index, array) => {
                                                            return (
                                                                <span className='cand-skill' key={candidate.id}>{candidate.firstName + " " + candidate.lastName}
                                                                    {index !== array.length - 1 ? '' : ''}</span>
                                                            )
                                                        }) :
                                                    <p className='text-secondary'>No candidates assigned for this job..!</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="assign-cand-area">
                                                <div className='assign-cand-title'>Assign candidates for this job.</div>
                                                <div className="add-candidate-area">
                                                    <input
                                                        type='search'
                                                        name='searchCandidate'
                                                        id='searchCandidate'
                                                        className='form-control me-sm-2 search-candidate-input'
                                                        placeholder='Search candidate by name...'
                                                        value={searchCandidateInput}
                                                        onChange={(e) => {
                                                            setSearchCandidateInput(e.target.value);
                                                            setSearchCandidateByName([]);
                                                            setSearchCandidateByNameMsg("");
                                                        }}
                                                    />
                                                    <i className='bi bi-search search-icon'></i>
                                                    <button className="btn search-candidate-btn my-2" type="submit" onClick={handleCandidateSearch}>Search</button>
                                                </div>

                                                {searchCandidateInput &&
                                                    searchCandidateByName.length > 0 ?
                                                    <div className="table-responsive sm-table-area table-scroll-area mt-3">
                                                        <table className="table sm-table mb-0">
                                                            <tbody className='sm-table-body'>
                                                                <tr className='sm-table-head-row'>
                                                                    <th className='sm-table-head'>Full Name</th>
                                                                    <th className='sm-table-head text-center'>Assign Candidate</th>
                                                                </tr>
                                                                {searchCandidateByName.map(searchedCandidate => {
                                                                    return (
                                                                        <tr className='sm-table-data-row' key={searchedCandidate.id} >
                                                                            <td className='sm-table-data text-capitalized'>{searchedCandidate.firstName + " " + searchedCandidate.lastName}</td>
                                                                            <td className='sm-table-data text-center'>
                                                                                <button className='assign-btn' title='Assign this candidate to the job' onClick={() => handleAssigning(searchedCandidate.id)}>
                                                                                    Assign
                                                                                </button>
                                                                            </td>
                                                                        </tr>)
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    :
                                                    <div className='text-center text-secondary m-4 font-size-14'>{searchCandidateByNameMsg}</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                <button type="button" className="btn close-modal-btn" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div >
        </div >
    )
}

export default AllJobs