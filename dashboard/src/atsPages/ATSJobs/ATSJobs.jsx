import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../atsComponents/ATSLayout';
import Footer from '../../components/Footer';
import $ from 'jquery';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AllJobs = () => {
    const navigate = useNavigate();
    const { getProtectedData } = useContext(AuthContext);
    const location = useLocation();
    const { jobs } = location.state || {};
    const [atsToken, setatsToken] = useState("");
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

    const [updatePostedJobs, setUpdatePostedJobs] = useState([]);
    const [allCompany, setAllCompany] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState([]);
    const [assignedCandidates, setAssignedCandidates] = useState([]);

    const [x, setX] = useState([0, 10]);
    const [loading, setLoading] = useState(true);

    const [isExpanded, setIsExpanded] = useState(false);

    const [selectedColumns, setSelectedColumns] = useState([]);
    let columns = ["Job Category", "Company", "Status", "Boost", "Job Mandatory Skills", "Needed Experience", "Job Description", "Salary Range", "Department", "Education", "Industry", "Locations", "Role", "Working Mode", "Assigned Applicants"]

    const handleColumnChange = (value) => {

        const updatedColumns = selectedColumns ? [...selectedColumns] : [];

        if (updatedColumns.includes(value)) {
            updatedColumns.splice(updatedColumns.indexOf(value), 1);
        } else {
            updatedColumns.length < 3 && updatedColumns.push(value);
        }

        setSelectedColumns(updatedColumns);

        const columnData = {
            id: employeeId,
            column: updatedColumns,
        };

        axios.post("https://skillety-n6r1.onrender.com/ats-jobs-column", columnData, {
            headers: {
                Authorization: `Bearer ${atsToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }


    const getAllClientDetails = async () => {
        try {

            const response = await axios.get(`https://skillety-n6r1.onrender.com/offline-client-Details`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setAllCompany(result);

            } else {
                console.log(result);

            }

        } catch (err) {
            console.log(err);

        }
    }

    const getAllSelectedCandidateDetails = async () => {
        try {

            const response = await axios.get(`https://skillety-n6r1.onrender.com/all-selected-candidates`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setSelectedCandidate(result);

            } else {
                console.log(result);

            }

        } catch (err) {
            console.log(err);

        }
    }

    const getAllAssignedCandidateDetails = async () => {
        try {

            const response = await axios.get(`https://skillety-n6r1.onrender.com/all-assigned-candidates`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
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
        $(document).ready(function () {
        });

    }, []);

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
        setatsToken(JSON.parse(localStorage.getItem('atsToken')))
    }, [atsToken])

    useEffect(() => {
        if (atsToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(atsToken);
                    console.log(userData);
                    setEmployeeId(userData.id || userData.uid);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
            getAllClientDetails();
            getAllSelectedCandidateDetails();
            getAllAssignedCandidateDetails();
        }
    }, [atsToken]);

    useEffect(() => {
        if (employeeId) {
            axios.get(`https://skillety-n6r1.onrender.com/ats-jobs-column/${employeeId}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                        setSelectedColumns(res.data.column);

                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false);
                })
            if (jobs) {
                setAllJobs(jobs);
            } else {
                getATSActiveJobs();
                getATSInactiveJobs();
            }
        }
    }, [employeeId])

    const getATSActiveJobs = async () => {
        try {
            // setLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/ats-active-jobs/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                const updatedJobsWithActive = result.map(job => ({ ...job, active: true }));

                setUpdatePostedJobs(prevPostedJobs => [...prevPostedJobs, ...updatedJobsWithActive]);
            } else {
                console.log(result);
            }

            // setLoading(false);
        } catch (err) {
            console.log(err);

            // setLoading(false);
        }
    }

    const getATSInactiveJobs = async () => {
        try {
            // setLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/my-posted-jobs/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setUpdatePostedJobs(prevPostedJobs => [...prevPostedJobs, ...result]);
            } else {
                console.log(result);
            }

            // setLoading(false);
        } catch (err) {
            console.log(err);

            // setLoading(false);
        }
    }

    useEffect(() => {
        const uniqueIds = {};
        const newArray = updatePostedJobs.filter(obj => {
            // Check if the ID is already in the uniqueIds object
            if (!uniqueIds[obj.id]) {
                // If not, mark it as seen and include it in the new array
                uniqueIds[obj.id] = true;
                return true;
            }
            // If the ID is already in the uniqueIds object, filter it out
            return false;
        });
        setAllJobs(newArray)
        // setLoading(newArray.length === 0);
    }, [updatePostedJobs]);


    const handleJobSearch = () => {
        if (searchJobRoleInput) {
            if (checkBoxFilteredJobs.length > 0) {
                const filteredJobs = checkBoxFilteredJobs.filter((job) => job.jobRole[0].toLowerCase().includes(searchJobRoleInput.toLowerCase()));
                if (filteredJobs.length > 0) {
                    setSearchFilteredJobs(filteredJobs);
                } else {
                    setSearchFilteredJobMsg("No jobs found")
                }
            } else {
                if (!checkBoxFilteredJobMsg) {
                    const filteredJobs = allJobs.filter((job) => job.jobRole[0].toLowerCase().includes(searchJobRoleInput.toLowerCase()));
                    if (filteredJobs.length > 0) {
                        setSearchFilteredJobs(filteredJobs);
                    } else {
                        setSearchFilteredJobMsg("No jobs found")
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
                    setSearchFilteredJobMsg("No jobs found");
                }
            } else {
                if (!searchFilteredJobMsg) {
                    const filtered = allJobs.filter((job) => updatedFilters.includes(job.jobCategory));
                    setCheckBoxFilteredJobMsg("");
                    if (filtered.length > 0) {
                        setCheckBoxFilteredJobs(filtered);
                    } else {
                        setCheckBoxFilteredJobMsg("No jobs found");
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

    const handleBoostJob = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Boost Job!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`https://skillety-n6r1.onrender.com/boost/${id}`, {
                    headers: {
                        // Authorization: `Bearer ${atsToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        console.log(res.data);
                        showSuccessMessage("Job has been boosted!");
                        getATSActiveJobs();
                    })
                    .catch((err) => {
                        console.log(err);
                        showErrorMessage();
                    });
            }
        });
    };

    const handleDeleteJob = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`https://skillety-n6r1.onrender.com/delete-job/${id}`, {
                    headers: {
                        Authorization: `Bearer ${atsToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        console.log(res.data);
                        showSuccessMessage("Job has been deleted!");
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                        showErrorMessage();
                    });
            }

        });
    }

    const handleDeleteActiveJob = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`https://skillety-n6r1.onrender.com/delete-active-job/${id}`, {
                    headers: {
                        Authorization: `Bearer ${atsToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        console.log(res.data);
                        showSuccessMessage("Job has been deleted!");
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                        showErrorMessage();
                    });
            }

        });
    }

    const handleActivate = (id) => {
        console.log(id);

        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, activate it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("https://skillety-n6r1.onrender.com/job-activate", { id }, {
                    headers: {
                        Authorization: `Bearer ${atsToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.message === "Job alerts sent successfully!") {
                            Swal.fire({
                                title: 'Job has been activated!',
                                text: 'It will be displayed on the job portal from now on. Job alerts have also been sent to skill-matched candidates.',
                                icon: 'success',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            })
                        } else if (res.data.message === "No candidates with matching skill percentage found.") {
                            Swal.fire({
                                title: 'Job has been activated!',
                                text: 'From now on, it will appear on the job portal.',
                                icon: 'success',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            })
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        showErrorMessage();
                    });
            }
        });
    };

    const handleDeActivate = (id) => {
        console.log(id)

        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deactivate it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post("https://skillety-n6r1.onrender.com/job-deactivate", { id }, {
                    headers: {
                        Authorization: `Bearer ${atsToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        showSuccessMessage("job has been deactivate!, it will not displayed on job portal here onwards..");
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err)
                        showErrorMessage()
                    })
            }

        });
    }

    const handlelayoutToggle = () => {
        setIsExpanded(prevState => !prevState);
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
                                All Jobs
                            </div>

                            {loading ? (
                                <div className="table-skeleton-area">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-data-skeleton-area">
                                                <div className="custom-flex-area">
                                                    <div>
                                                        <div className='pt-3'>
                                                            <Skeleton height={25} width={250} />
                                                        </div>
                                                        <div className='pt-3'>
                                                            <Skeleton height={15} width={120} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="table-responsive table-scroll-area mt-4 skeleton-table">
                                                    <div className="table skeleton-table table-striped table-hover admin-lg-table">
                                                        <tr className="skeleton-table-row">
                                                            <th className='w-5'>
                                                                <Skeleton height={18} width={30} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-20'>
                                                                <Skeleton height={18} width={80} />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Skeleton height={18} width={30} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={80} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Skeleton height={18} width={30} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={80} />
                                                            </td>
                                                        </tr>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
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

                                                <div className='customize-table-layout-area mb-3'>
                                                    <div className="customize-table-layout-top">
                                                        <div className='customize-table-layout-head'>Customize Table Layout</div>
                                                        <button className='customize-table-layout-btn' type='button' onClick={handlelayoutToggle}>
                                                            Customize
                                                            <i class="bi bi-pencil-square"></i>
                                                        </button>
                                                    </div>
                                                    <div className={`customize-table-layout-content ${isExpanded ? 'opened' : ''}`}>
                                                        <div className='p-2'>
                                                            <div className='row'>
                                                                {columns.map(column => {
                                                                    // if (column === "Status" && jobs) {
                                                                    //     return null;
                                                                    // }
                                                                    return (
                                                                        <div className="col-12 col-sm-6 col-lg-6 col-xl-4 col-md-6">
                                                                            <label className={`layout-form-check-input ${selectedColumns && selectedColumns.length === 3 && !selectedColumns.includes(column) ? 'disabled' : ''}`}>
                                                                                <input type="checkbox"
                                                                                    disabled={selectedColumns && selectedColumns.length === 3 && !selectedColumns.includes(column)}
                                                                                    checked={selectedColumns?.includes(column)}
                                                                                    onChange={() => handleColumnChange(column)} />
                                                                                <span className="layout-form-checkmark"></span>
                                                                                {column}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            <hr />
                                                            <div className='customize-table-layout-note'>
                                                                *Note: You can add a maximum of 3 column fields
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {allJobs.length > 0 ?
                                                    <div className="table-responsive table-scroll-area">
                                                        <table className="table table-striped table-hover admin-lg-table">
                                                            <tr className='dash-table-row man-app'>
                                                                <th className='dash-table-head'>No.</th>
                                                                <th className='dash-table-head'>Job Role</th>
                                                                {columns.map(column => {
                                                                    if (selectedColumns.includes(column)) {
                                                                        return (
                                                                            <th key={column} className='dash-table-head'>{column}</th>
                                                                        );
                                                                    }
                                                                })}
                                                                <th className='dash-table-head text-left'>Action</th>
                                                            </tr>

                                                            {/* table data */}
                                                            {searchFilteredJobMsg ?
                                                                <tr>
                                                                    <td colSpan={4} className='text-secondary text-center'>
                                                                        {searchFilteredJobMsg}
                                                                    </td>
                                                                </tr> :
                                                                searchFilteredJobs.length > 0 ?
                                                                    searchFilteredJobs.slice(x[0], x[1])
                                                                        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                                                                        .map((Job, index) => {
                                                                            const companyName = allCompany.find(company => company.clientId === Job.clientId)?.companyName;

                                                                            const companyLogo = allCompany.find(company => company.clientId === Job.clientId)?.clientLogo;

                                                                            const selectedCandidatesForJob = selectedCandidate.filter(cand => cand.jobId === Job.id);

                                                                            const assignedCandidatesForJob = assignedCandidates.filter(cand => cand.jobId === Job.id);

                                                                            const uniqueCandidateIds = [...selectedCandidatesForJob.map(cand=>cand.candidateId)];


                                                                                        const combinedCands = [
                                                                                        ...selectedCandidatesForJob,
                                                                                        ...assignedCandidatesForJob.filter(cand => {
                                                                                            if (!uniqueCandidateIds.includes(cand.candidateId)) {
                                                                                            
                                                                                            return true;
                                                                                            }
                                                                                            return false;
                                                                                        }),
                                                                                        ];

                                                                            return (
                                                                                <tr className='dash-table-row client' key={Job.id}>
                                                                                    <td className='dash-table-data1'>{index + 1}.</td>
                                                                                    <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.jobRole[0]}
                                                                                    </td>
                                                                                    {selectedColumns?.includes("Job Category") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.jobCategory}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Company") && <td className='dash-table-data1 text-left text-capitalized'>
                                                                                        <img src={companyLogo} className='dash-table-avatar-img' alt="" />
                                                                                        {companyName}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Status") && <td className='text-left'>
                                                                                        {Job?.active ?
                                                                                            <span className='man-job-status-btn theme-success'>Active</span>
                                                                                            :
                                                                                            <span className='man-job-status-btn theme-info'> InActive</span>
                                                                                        }
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Boost") && <td className='text-left'>
                                                                                        {/* Boost Job Button */}
                                                                                        <button
                                                                                            className='btn btn-boost-job'
                                                                                            onClick={() => handleBoostJob(Job.id)}
                                                                                            disabled={!Job?.active}
                                                                                        >
                                                                                            <i class="bi bi-rocket-takeoff mr-2"></i>
                                                                                            Boost Job
                                                                                        </button>
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Job Mandatory Skills") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.skills.join(", ")}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Needed Experience") && <td className='dash-table-data1 text-capitalized'>
                                                                                        <span>{Job?.minExperience} - {Job?.maxExperience}</span>
                                                                                        &nbsp;years&nbsp;
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Job Description") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.jobDescription}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Salary Range") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.currencyType}{Job?.minSalary} - {Job?.currencyType}{Job?.maxSalary}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Department") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.department}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Education") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.education ? Job?.education : "---------"}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Industry") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.industry}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Locations") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.location.join(", ")}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Role") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.role}
                                                                                    </td>}
                                                                                    {selectedColumns?.includes("Working Mode") && <td className='dash-table-data1 text-capitalized'>
                                                                                        {Job?.workMode}
                                                                                    </td>}
                                                                                    {/* {selectedColumns?.includes("Selected Applicants") && <td className='dash-table-data1 text-left'>
                                                                                        <button className='application-btn with-modal' onClick={() => selectedCandidatesForJob.length > 0 && navigate(`/applied-candidate-ats/${Job.id}`, { state: { selectedCandidatesForJob } })}>
                                                                                            <span>{selectedCandidatesForJob.length}</span>&nbsp;&nbsp;&nbsp;
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                                            </svg>
                                                                                        </button>
                                                                                    </td>} */}
                                                                                    {selectedColumns?.includes("Assigned Applicants") && <td className='dash-table-data1 text-left'>
                                                                                        <button className='application-btn with-modal' onClick={() => combinedCands.length > 0 && navigate(`/applied-candidate-ats/${Job.id}`, { state: { combinedCands } })}>
                                                                                            <span>{combinedCands.length}</span>&nbsp;&nbsp;&nbsp;
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                                            </svg>
                                                                                        </button>
                                                                                    </td>}
                                                                                    <td className='text-left'>
                                                                                        <div className="action-btn-area">
                                                                                            <button className='job-view-btn' data-toggle="modal" title='View Job Details...' data-target="#invoiceModal" onClick={() => handleViewJobDetail(Job.id)}>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                                </svg>
                                                                                            </button>
                                                                                            <button className='job-edit-btn' title='Edit job details...' onClick={() => navigate(`/job-posting-ats`, { state: { job: Job } })}>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                                </svg>
                                                                                            </button>
                                                                                            {
                                                                                                (Job?.active) ?
                                                                                                    <button className='job-delete-btn' title='Delete job data...' onClick={() => handleDeleteActiveJob(Job.id)}>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                                        </svg>
                                                                                                    </button> :
                                                                                                    <button className='job-delete-btn' title='Delete job data...' onClick={() => handleDeleteJob(Job.id)}>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                                        </svg>
                                                                                                    </button>}
                                                                                            {
                                                                                                (Job?.active) ?
                                                                                                    <button className='status-change-btn deactive' title='Deactivate' onClick={() => handleDeActivate(Job.id)}>
                                                                                                        Deactivate
                                                                                                    </button> :
                                                                                                    <button className='status-change-btn active' title='Activate' onClick={() => handleActivate(Job.id)}>
                                                                                                        Activate
                                                                                                    </button>}
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
                                                                            (checkBoxFilteredJobs.slice(x[0], x[1])
                                                                                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                                                                                .map((Job, index) => {
                                                                                    const companyName = allCompany.find(company => company.clientId === Job.clientId)?.companyName;

                                                                                    const companyLogo = allCompany.find(company => company.clientId === Job.clientId)?.clientLogo;

                                                                                    const selectedCandidatesForJob = selectedCandidate.filter(cand => cand.jobId === Job.id);

                                                                                    const assignedCandidatesForJob = assignedCandidates.filter(cand => cand.jobId === Job.id)

                                                                                    const uniqueCandidateIds = [...selectedCandidatesForJob.map(cand=>cand.candidateId)];


                                                                                        const combinedCands = [
                                                                                        ...selectedCandidatesForJob,
                                                                                        ...assignedCandidatesForJob.filter(cand => {
                                                                                            if (!uniqueCandidateIds.includes(cand.candidateId)) {
                                                                                            
                                                                                            return true;
                                                                                            }
                                                                                            return false;
                                                                                        }),
                                                                                        ];
                                                                                    return (
                                                                                        <tr className='dash-table-row client' key={Job.id}>
                                                                                            <td className='dash-table-data1'>{index + 1}.</td>
                                                                                            <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.jobRole[0]}
                                                                                            </td>
                                                                                            {selectedColumns?.includes("Job Category") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.jobCategory}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Company") && <td className='dash-table-data1 text-left text-capitalized'>
                                                                                                <img src={companyLogo} className='dash-table-avatar-img' alt="" />
                                                                                                {companyName}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Status") && <td className='text-left'>
                                                                                                {Job?.active ?
                                                                                                    <span className='man-job-status-btn theme-success'>Active</span>
                                                                                                    :
                                                                                                    <span className='man-job-status-btn theme-info'> InActive</span>
                                                                                                }
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Boost") && <td className='text-left'>
                                                                                                {/* Boost Job Button */}
                                                                                                <button
                                                                                                    className='btn btn-boost-job'
                                                                                                    onClick={() => handleBoostJob(Job.id)}
                                                                                                    disabled={!Job?.active}
                                                                                                >
                                                                                                    <i class="bi bi-rocket-takeoff mr-2"></i>
                                                                                                    Boost Job
                                                                                                </button>
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Job Mandatory Skills") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.skills.join(", ")}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Needed Experience") && <td className='dash-table-data1 text-capitalized'>
                                                                                                <span>{Job?.minExperience} - {Job?.maxExperience}</span>
                                                                                                &nbsp;years&nbsp;
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Job Description") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.jobDescription}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Salary Range") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.currencyType}{Job?.minSalary} - {Job?.currencyType}{Job?.maxSalary}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Department") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.department}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Education") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.education ? Job?.education : "---------"}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Industry") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.industry}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Locations") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.location.join(", ")}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Role") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.role}
                                                                                            </td>}
                                                                                            {selectedColumns?.includes("Working Mode") && <td className='dash-table-data1 text-capitalized'>
                                                                                                {Job?.workMode}
                                                                                            </td>}
                                                                                            {/* {selectedColumns?.includes("Selected Applicants") && <td className='dash-table-data1 text-left'>
                                                                                                <button className='application-btn with-modal' onClick={() => selectedCandidatesForJob.length > 0 && navigate(`/applied-candidate-ats/${Job.id}`, { state: { selectedCandidatesForJob } })}>
                                                                                                    <span>{selectedCandidatesForJob.length}</span>&nbsp;&nbsp;&nbsp;
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                                                    </svg>
                                                                                                </button>
                                                                                            </td>} */}
                                                                                            {selectedColumns?.includes("Assigned Applicants") && <td className='dash-table-data1 text-left'>
                                                                                                <button className='application-btn with-modal' onClick={() => combinedCands.length > 0 && navigate(`/applied-candidate-ats/${Job.id}`, { state: { combinedCands } })}>
                                                                                                    <span>{combinedCands.length}</span>&nbsp;&nbsp;&nbsp;
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                                                    </svg>
                                                                                                </button>
                                                                                            </td>}
                                                                                            <td className='text-left'>
                                                                                                <div className="action-btn-area">
                                                                                                    <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#invoiceModal" onClick={() => handleViewJobDetail(Job.id)}>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                                        </svg>
                                                                                                    </button>
                                                                                                    <button className='job-edit-btn' title='Edit job details...' onClick={() => navigate(`/job-posting-ats`, { state: { job: Job } })}>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                                        </svg>
                                                                                                    </button>
                                                                                                    {
                                                                                                        (Job?.active) ?
                                                                                                            <button className='job-delete-btn' title='Delete job data...' onClick={() => handleDeleteActiveJob(Job.id)}>
                                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                                                </svg>
                                                                                                            </button> :
                                                                                                            <button className='job-delete-btn' title='Delete job data...' onClick={() => handleDeleteJob(Job.id)}>
                                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                                                </svg>
                                                                                                            </button>}
                                                                                                    {
                                                                                                        (Job?.active) ?
                                                                                                            <button className='status-change-btn deactive' title='Deactivate' onClick={() => handleDeActivate(Job.id)}>
                                                                                                                Deactivate
                                                                                                            </button> :
                                                                                                            <button className='status-change-btn active' title='Activate' onClick={() => handleActivate(Job.id)}>
                                                                                                                Activate
                                                                                                            </button>}
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    );
                                                                                })) :

                                                                            (!searchJobRoleInput && checkBoxfilters.length === 0) ?

                                                                                (allJobs.slice(x[0], x[1])
                                                                                    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                                                                                    .map((Job, index) => {
                                                                                        const companyName = allCompany.find(company => company.clientId === Job.clientId)?.companyName;

                                                                                        const companyLogo = allCompany.find(company => company.clientId === Job.clientId)?.clientLogo;

                                                                                        const selectedCandidatesForJob = selectedCandidate.filter(cand => cand.jobId === Job.id);

                                                                                        const assignedCandidatesForJob = assignedCandidates.filter(cand => cand.jobId === Job.id)

                                                                                        const uniqueCandidateIds = [...selectedCandidatesForJob.map(cand=>cand.candidateId)];


                                                                                        const combinedCands = [
                                                                                        ...selectedCandidatesForJob,
                                                                                        ...assignedCandidatesForJob.filter(cand => {
                                                                                            if (!uniqueCandidateIds.includes(cand.candidateId)) {
                                                                                            
                                                                                            return true;
                                                                                            }
                                                                                            return false;
                                                                                        }),
                                                                                        ];

                                                                                        return (
                                                                                            <tr className='dash-table-row client' key={Job.id}>
                                                                                                <td className='dash-table-data1'>{index + 1}.</td>
                                                                                                <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.jobRole[0]}
                                                                                                </td>
                                                                                                {selectedColumns?.includes("Job Category") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.jobCategory}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Company") && <td className='dash-table-data1 text-left text-capitalized'>
                                                                                                    <img src={companyLogo} className='dash-table-avatar-img' alt="" />
                                                                                                    {companyName}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Status") && <td className='text-left'>
                                                                                                    {Job?.active ?
                                                                                                        <span className='man-job-status-btn theme-success'>Active</span>
                                                                                                        :
                                                                                                        <span className='man-job-status-btn theme-info'> InActive</span>
                                                                                                    }
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Boost") && <td className='text-left'>
                                                                                                    {/* Boost Job Button */}
                                                                                                    <button
                                                                                                        className='btn btn-boost-job'
                                                                                                        onClick={() => handleBoostJob(Job.id)}
                                                                                                        disabled={!Job?.active}
                                                                                                    >
                                                                                                        <i class="bi bi-rocket-takeoff mr-2"></i>
                                                                                                        Boost Job
                                                                                                    </button>
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Job Mandatory Skills") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.skills.join(", ")}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Needed Experience") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    <span>{Job?.minExperience} - {Job?.maxExperience}</span>
                                                                                                    &nbsp;years&nbsp;
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Job Description") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.jobDescription}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Salary Range") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.currencyType}{Job?.minSalary} - {Job?.currencyType}{Job?.maxSalary}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Department") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.department}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Education") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.education ? Job?.education : "---------"}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Industry") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.industry}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Locations") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.location.join(", ")}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Role") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.role}
                                                                                                </td>}
                                                                                                {selectedColumns?.includes("Working Mode") && <td className='dash-table-data1 text-capitalized'>
                                                                                                    {Job?.workMode}
                                                                                                </td>}
                                                                                                {/* {selectedColumns?.includes("Selected Applicants") && <td className='dash-table-data1 text-left'>
                                                                                                    <button className='application-btn with-modal' onClick={() => selectedCandidatesForJob.length > 0 && navigate(`/applied-candidate-ats/${Job.id}`, { state: { selectedCandidatesForJob } })}>
                                                                                                        <span>{selectedCandidatesForJob.length}</span>&nbsp;&nbsp;&nbsp;
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                                                        </svg>
                                                                                                    </button>
                                                                                                </td>} */}
                                                                                                {selectedColumns?.includes("Assigned Applicants") && <td className='dash-table-data1 text-left'>
                                                                                                    <button className='application-btn with-modal' onClick={() => combinedCands.length > 0 && navigate(`/applied-candidate-ats/${Job.id}`, { state: { combinedCands } })}>
                                                                                                        <span>{combinedCands.length}</span>&nbsp;&nbsp;&nbsp;
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                                                        </svg>
                                                                                                    </button>
                                                                                                </td>}
                                                                                                <td className='text-left'>
                                                                                                    <div className="action-btn-area">
                                                                                                        <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#invoiceModal" onClick={() => handleViewJobDetail(Job.id)}>
                                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                                            </svg>
                                                                                                        </button>
                                                                                                        <button className='job-edit-btn' title='Edit job details...' onClick={() => navigate(`/job-posting-ats`, { state: { job: Job } })}>
                                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                                            </svg>
                                                                                                        </button>
                                                                                                        {
                                                                                                            (Job?.active) ?
                                                                                                                <button className='job-delete-btn' title='Delete job data...' onClick={() => handleDeleteActiveJob(Job.id)}>
                                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                                                    </svg>
                                                                                                                </button> :
                                                                                                                <button className='job-delete-btn' title='Delete job data...' onClick={() => handleDeleteJob(Job.id)}>
                                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                                                    </svg>
                                                                                                                </button>}
                                                                                                        {
                                                                                                            (Job?.active) ?
                                                                                                                <button className='status-change-btn deactive' title='Deactivate' onClick={() => handleDeActivate(Job.id)}>
                                                                                                                    Deactivate
                                                                                                                </button> :
                                                                                                                <button className='status-change-btn active' title='Activate' onClick={() => handleActivate(Job.id)}>
                                                                                                                    Activate
                                                                                                                </button>}
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
                            )}

                        </div>
                    </section>
                </div>

                {/* Job view modal here */}
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
                                    {/* <hr />
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
                                                        onKeyPress={(event) => {
                                                            event.key === "Enter" && handleCandidateSearch();
                                                        }}
                                                    />
                                                    <i className='bi bi-search search-icon'></i>
                                                    <button className="btn search-candidate-btn my-2" type="submit" onClick={handleCandidateSearch}
                                                    >Search</button>
                                                </div>

                                                {!searchCandidateInput &&
                                                    filteredSkillMatchCandidates.length > 0 ?
                                                    <div className="table-responsive sm-table-area table-scroll-area mt-3">
                                                        <table className="table sm-table mb-0">
                                                            <tbody className='sm-table-body'>
                                                                <tr className='sm-table-head-row'>
                                                                    <th className='sm-table-head'>Suggested Candidate Full Name</th>
                                                                    <th className='sm-table-head text-center'>Skill Percentage</th>
                                                                    <th className='sm-table-head text-center'>Assign Candidate</th>
                                                                </tr>
                                                                {filteredSkillMatchCandidates
                                                                .slice(0,10)
                                                                .sort((a, b) => b.percentage - a.percentage)
                                                                .map(searchedCandidate => {
                                                                    return (
                                                                        <tr className='sm-table-data-row' key={searchedCandidate.id} >
                                                                            <td className='sm-table-data text-capitalized'>{searchedCandidate.firstName + " " + searchedCandidate.lastName}</td>
                                                                            <td className='sm-table-data text-center'>
                                                                            {Math.round(calculateSkillPercentage(searchedCandidate.skills))}%
                                                                            </td>
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
                                    </div> */}
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