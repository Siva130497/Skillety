import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './AllCandidates.css';
import $ from 'jquery';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const AllCandidates = () => {
    const { getProtectedData } = useContext(AuthContext);
    const navigate = useNavigate();
    const [staffToken, setStaffToken] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [role, setRole] = useState("");
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [allCand, setAllCand] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState();
    const [appliedOfPostedJobs, setAppliedOfPostedJobs] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredSearchResults, setFilteredSearchResults] = useState([]);
    const [filteredSearchResultsMsg, setFilteredSearchResultsMsg] = useState("");


    const [x, setX] = useState([0, 10]);
    const [loading, setLoading] = useState(true);
    const [appliedJobForCandId, setAppliedJobForCandId] = useState([]);
    const [appliedJobLoading, setAppliedJobLoading] = useState(true);
    const [allEmployee, setAllEmployee] = useState([]);
    const [allCompany, setAllCompany] = useState([]);

    const [appliedJob, setAppliedJob] = useState([]);
    // const [appliedJobLoad, setAppliedJobLoad] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    const [selectedColumns, setSelectedColumns] = useState([]);
    let columns = ["Email ID", "Mobile Number", "Send an interview invitation", "Current Job Role", "Skills", "Experience", "Current/Previous Working/Worked Company Name", "College", "Education", "Location", "About him/her", "Last Working Day", "Available To Join In", "Applied jobs of your posted", "Applied jobs", "View CV", "Status"]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [candidateResumeUrl, setCandidateResumeUrl] = useState("");

    // const fetchAppliedJobs = async (candidateId) => {
    //     try {
    //       const res = await axios.get(`https://skillety-n6r1.onrender.com/my-applied-jobs/${candidateId}`, {
    //         headers: {
    //           Authorization: `Bearer ${staffToken}`,
    //           Accept: 'application/json'
    //         }
    //       });
    //       console.log(res.data);
    //     //   return(
    //     //     <td className='dash-table-data1 text-center'>
    //     //         {res.data?.length > 0 ?
    //     //             res.data?.map((appliedJob) => {
    //     //                 const postedBy = appliedJob.companyId
    //     //                     ? (allCompany.find(company => company.companyId === appliedJob.companyId)?.companyName)
    //     //                     : (allEmployee.find(employee => employee.id === appliedJob.recruiterId)?.name);
    //     //                     return (
    //     //                         <span className='cand-skill text-capitalized'><strong>{appliedJob.jobRole[0]}</strong><br/>Posted By:{postedBy}</span>
    //     //                         )
    //     //         }) :
    //     //             <p className='text-secondary'>Still not applied for any posted jobs</p>
    //     //         }
    //     //     </td>
    //     //   )
    //     } catch (err) {
    //       console.error(err);
    //     //   return(
    //     //     <p className='text-secondary'>Still not applied for any posted jobs</p>
    //     //   )
    //     }
    //   };

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

    const handleViewCV = (fileUrl) => {
        setCandidateResumeUrl(fileUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        // setCandidateResumeUrl(null);
        setIsModalOpen(false);
    };

    const handleCheckboxChange = (value) => {

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

        axios.post("https://skillety-n6r1.onrender.com/all-candidates-column", columnData, {
            headers: {
                Authorization: `Bearer ${staffToken}`,
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

    const handleDeleteCand = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete Candidate!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`https://skillety-n6r1.onrender.com/del-recruiter-cand/${id}`, {
                    headers: {
                        Authorization: `Bearer ${staffToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        console.log(res.data);
                        showSuccessMessage("Candidate has been deleted!");
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                        showErrorMessage();
                    });
            }

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
                    // setRole(userData.role);
                } catch (error) {
                    console.log(error)
                    navigate("/")
                }
            };

            fetchData();

            axios.get("https://skillety-n6r1.onrender.com/all-employee")
                .then(res => {
                    console.log(res.data);
                    setAllEmployee(res.data);
                })
                .catch(err => console.log(err))

            axios.get("https://skillety-n6r1.onrender.com/company-details")
                .then(res => {
                    console.log(res.data);
                    setAllCompany(res.data);
                })
                .catch(err => {
                    console.log(err);
                })

            axios.get("https://skillety-n6r1.onrender.com/applied-jobs")
                .then(res => {
                    console.log(res.data)
                    setAppliedJob(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [staffToken]);

    const getAnIndividualRecruiter = async () => {
        try {
            const res = await axios.get(`https://skillety-n6r1.onrender.com/staff/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setRole(result?.companyStaff || "Admin");

            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (employeeId) {
            // getAnIndividualRecruiter();
            getAllCandidateDetail();
            getAppliedOfPostedJobs();
            axios.get(`https://skillety-n6r1.onrender.com/all-candidates-column/${employeeId}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                        setSelectedColumns(res.data.column);

                    }

                })
                .catch(err => {
                    console.log(err)

                })
        }
    }, [employeeId])

    // useEffect(() => {
    //     if(role){
    //         // if (role === "Recruiter") {
    //         //     getAllRecruiterCandidateDetail();
    //         //     getAllCandidateDetail();
    //         // } else {
    //         //     getAllCandidateDetail();
    //         // }
    //         getAllRecruiterCandidateDetail();
    //     }
    // }, [role])

    const getAllCandidateDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://skillety-n6r1.onrender.com/candidate-Detail', {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setCandidateDetail(result.reverse());
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }


        } catch (error) {
            console.log(error);
            setLoading(false);

        }
    };

    const getAllRecruiterCandidateDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://skillety-n6r1.onrender.com/recruiter-candidate-Detail/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setCandidateDetail(result);
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }


        } catch (error) {
            console.log(error);

            setLoading(false);
        }
    };

    const getAppliedOfPostedJobs = async () => {
        try {
            const res = await axios.get(`https://skillety-n6r1.onrender.com/applied-jobs-of-posted/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAppliedOfPostedJobs(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleApiCall = (candData) => {
        const accessToken = 'CJT85DoAcFM22rKrrQdrGkdWvWNUY_Xf';
        const key = 'OSCfJPqV1E_PNd3mX0zL9NIg5vkjMTMs5XfQ';
        const encodedCredentials = btoa(`${accessToken}:${key}`);

        const interviewCandidateName = candData.firstName + ' ' + candData.lastName;
        const interviewCandidateEmail = candData.email;
        const interviewCandidatePhoneNo = candData.phone;

        const data = JSON.stringify({
            candidates: [
                {
                    name: interviewCandidateName,
                    email: interviewCandidateEmail,
                    phoneNo: "0" + interviewCandidatePhoneNo,
                },
            ],
            hiringRoleId: 4427,
            roundName: "Hands-On",
        });
        console.log(data)

        const config = {
            method: "post",
            url: "/external-interviews/request",
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSend = (id) => {
        const candData = candidateDetail.find(cand => cand.id === id)
        handleApiCall(candData)
    }

    const viewCandidateDetail = (id) => {
        setAppliedJobForCandId([]);
        setAppliedJobLoading(true);
        const Candidate = candidateDetail.find(filteredCandidate => filteredCandidate.id === id);
        setSelectedCandidate(Candidate);

        axios.get(`https://skillety-n6r1.onrender.com/my-applied-jobs/${id}`, {
            headers: {
                Authorization: `Bearer ${staffToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data);
                setAppliedJobLoading(false);
                setAppliedJobForCandId(res.data);
            })
            .catch(err => console.log(err));
    }

    const handleSkillSearch = () => {
        const searchResults = searchInput
            .split(/[,\s]+/)
            .filter(result => result.trim());

        const filteredObjBySkills = candidateDetail.filter(candidate =>
            searchResults.some(searchResult =>
                candidate.skills.some(skill =>
                    skill.toLowerCase().includes(searchResult.toLowerCase())
                )
            )
        );

        const filteredObjByDesignation = candidateDetail.filter(candidate =>
            searchResults.some(searchResult =>
                candidate.designation[0].toLowerCase().includes(searchResult.toLowerCase())
            )
        );

        const mergedResults = [...filteredObjBySkills, ...filteredObjByDesignation];
        if (mergedResults.length > 0) {
            setFilteredSearchResults(mergedResults);
        } else {
            setFilteredSearchResultsMsg("No candidates found")
        }
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
                            <div className='d-flex align-items-end justify-content-between pt-0 pt-sm-4'>
                                <div className="admin-component-name pt-0">
                                    Registered Candidates
                                </div>
                                {/* <div className="create-btn-area">
                                    <a
                                        href="/create-candidate"
                                        className='btn creat-data-btn'
                                        title='Create new candidate...'
                                    >
                                        <i class="bi bi-person-plus-fill"></i>
                                        <span>Create New</span>
                                    </a>
                                </div> */}
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
                                                            Registered Candidates Details
                                                        </div>
                                                        <div className="man-app-sub-title">
                                                            Total Candidates :&nbsp;
                                                            <span>{filteredSearchResultsMsg ? "0" : filteredSearchResults.length > 0 ? filteredSearchResults.length : !searchInput ? candidateDetail.length : null}</span>
                                                        </div>
                                                    </div>
                                                    {candidateDetail.length > 0 && <div className="recruiter-search-input-area">
                                                        <input type="search" className='recruiter-search-input' placeholder='Search skills/designations...'
                                                            value={searchInput}
                                                            onChange={(e) => {
                                                                setSearchInput(e.target.value);
                                                                setFilteredSearchResults([]);
                                                                setFilteredSearchResultsMsg("");
                                                            }}
                                                            onKeyPress={(event) => {
                                                                event.key === "Enter" && handleSkillSearch();
                                                            }} />
                                                        <i className='bi bi-search search-icon'></i>
                                                        <button className='recruiter-search-btn' onClick={handleSkillSearch}>Search</button>
                                                    </div>}
                                                </div>
                                                <div className='customize-table-layout-area mt-0 mb-3'>
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
                                                                    return (
                                                                        <div className="col-12 col-sm-6 col-lg-6 col-md-6">
                                                                            <label className={`layout-form-check-input ${selectedColumns && selectedColumns.length === 3 && !selectedColumns.includes(column) ? 'disabled' : ''}`}>
                                                                                <input type="checkbox"
                                                                                    disabled={selectedColumns && selectedColumns.length === 3 && !selectedColumns.includes(column)}
                                                                                    checked={selectedColumns?.includes(column)}
                                                                                    onChange={() => handleCheckboxChange(column)} />
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

                                                {candidateDetail.length > 0 ?
                                                    <div className="table-responsive table-scroll-area">
                                                        <table className="table table-striped table-hover admin-lg-table">
                                                            <tr className='dash-table-row candidate'>
                                                                <th className='dash-table-head'>No.</th>
                                                                <th className='dash-table-head'>Full Name</th>
                                                                {columns.map(column => {
                                                                    if (selectedColumns?.includes(column)) {
                                                                        return (
                                                                            <th className='dash-table-head'>{column}</th>
                                                                        )
                                                                    }
                                                                })}
                                                                <th className='dash-table-head text-left'>Action</th>
                                                            </tr>


                                                            {/* table data */}
                                                            {filteredSearchResultsMsg ?
                                                                <tr>
                                                                    <td colSpan={6} className='text-secondary text-center'>
                                                                        {filteredSearchResultsMsg}
                                                                    </td>
                                                                </tr> :
                                                                filteredSearchResults.length > 0 ?
                                                                    filteredSearchResults.slice(x[0], x[1]).map((candidate, index) => {

                                                                        const appJobs = appliedJob.filter(job => job.candidateId === candidate.id);

                                                                        // const registered = allCand.find(cand => cand.id === candidate.id);

                                                                        return (
                                                                            <tr className='dash-table-row client' key={candidate.id}>
                                                                                <td className='dash-table-data1'>{index + 1}.</td>
                                                                                <td className='dash-table-data1 text-capitalized'>
                                                                                    {candidate.firstName + ' ' + candidate.lastName}
                                                                                </td>
                                                                                {selectedColumns?.includes("Email ID") && <td className='dash-table-data1'>
                                                                                    <a href={`mailto:${candidate.email}`}
                                                                                        className='dash-table-data1 link is-link p-0'>
                                                                                        {candidate.email}
                                                                                    </a>
                                                                                </td>}

                                                                                {selectedColumns?.includes("Mobile Number") && <td className='dash-table-data1'>
                                                                                    <a href={`tel:${candidate.phone}`}
                                                                                        className='dash-table-data1 link is-link p-0'>
                                                                                        {candidate.phone}
                                                                                    </a>
                                                                                </td>}

                                                                                {selectedColumns?.includes("Send an interview invitation") && <td className='dash-table-data1 text-left'>
                                                                                    <button className='send-email-btn' onClick={() => handleSend(candidate.id)}>
                                                                                        <i class="bi bi-send-fill send-icon"></i>
                                                                                        Send
                                                                                    </button>
                                                                                </td>}

                                                                                {selectedColumns?.includes("Current Job Role") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.designation[0]}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Skills") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.skills.join(", ")}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Experience") && <td className='dash-table-data1 text-left'>
                                                                                    <span>{candidate?.year}</span>&nbsp;years and&nbsp;<span>{candidate?.month}</span>&nbsp;months
                                                                                </td>}

                                                                                {selectedColumns?.includes("Current/Previous Working/Worked Company Name") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.companyName}
                                                                                </td>}

                                                                                {selectedColumns?.includes("College") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.college}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Education") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.education.join(", ")}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Location") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.location}
                                                                                </td>}

                                                                                {selectedColumns?.includes("About him/her") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.profileHeadline}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Last Working Day") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.selectedDate}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Available To Join In") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.days}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Applied jobs of your posted") && <td className='dash-table-data1 text-left'>
                                                                                    {appliedOfPostedJobs
                                                                                        .filter((appliedOfPostedJob) => appliedOfPostedJob.candidateId === candidate?.id).length > 0 ?
                                                                                        appliedOfPostedJobs
                                                                                            .filter((appliedOfPostedJob) => appliedOfPostedJob.candidateId === candidate?.id)
                                                                                            .map((appliedOfPostedJob) => {
                                                                                                return (
                                                                                                    <span className='dash-table-data1 text-capitalized'>{appliedOfPostedJob.jobRole[0]}</span>
                                                                                                )
                                                                                            }) :
                                                                                        <span className='text-secondary'>Still not applied for your posted jobs</span>
                                                                                    }
                                                                                </td>}

                                                                                {selectedColumns?.includes("Applied jobs") && <td className='dash-table-data1 text-left'>
                                                                                    {appJobs
                                                                                        .length > 0 ?
                                                                                        appJobs
                                                                                            .map((appliedJob) => {
                                                                                                const postedBy = appliedJob.companyId
                                                                                                    ? (allCompany.find(company => company.companyId === appliedJob.companyId)?.companyName)
                                                                                                    : (allEmployee.find(employee => employee.id === appliedJob.recruiterId)?.name);
                                                                                                return (
                                                                                                    <div className='dash-table-data1 text-capitalized'><strong>{appliedJob.jobRole[0]}</strong><br />Posted By : {postedBy}</div>

                                                                                                )
                                                                                            }) :
                                                                                        <span className='text-secondary'>Still not applied for any posted jobs</span>}
                                                                                </td>
                                                                                }
                                                                                {selectedColumns?.includes("View CV") && <td className='text-left'>
                                                                                    <button className='application-btn with-modal' onClick={() => handleViewCV(candidate?.file)}>
                                                                                        <span></span>&nbsp;&nbsp;&nbsp;
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                                        </svg>
                                                                                    </button>
                                                                                </td>}
                                                                                {selectedColumns?.includes("Status") && <td className='text-left'>
                                                                                    <div className='table-select-input-area'>
                                                                                        <select className='table-select-input'>
                                                                                            <option selected disabled>Select one.</option>
                                                                                            <option >New CV Upload</option>
                                                                                            <option >Applied Online</option>
                                                                                            <option>Submitted to Client</option>
                                                                                            <option >Interviews in Process</option>
                                                                                            <option >Offered</option>
                                                                                            <option >Rejected</option>
                                                                                            <option >Joined</option>
                                                                                            <option >Invoiced</option>
                                                                                            <option >Payment Received</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </td>}
                                                                                <td className='text-left'>
                                                                                    <div className="action-btn-area">
                                                                                        <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#candidatesViewModal" onClick={() => viewCandidateDetail(candidate.id)}>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                            </svg>
                                                                                        </button>
                                                                                        {/* {(role === "Recruiter") && <button className='job-edit-btn' title='Edit candidate details...' onClick={() => navigate(`/create-candidate`, { state: { id: candidate.id } })}
                                                                                            disabled={registered}>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                            </svg>
                                                                                        </button>}
                                                                                        {(role === "Recruiter") && <button className='job-delete-btn' title='Delete candidate data...' onClick={() => handleDeleteCand(candidate.id)}
                                                                                            disabled={registered}
                                                                                        >
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                            </svg>
                                                                                        </button>} */}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }) :
                                                                    !searchInput ? candidateDetail.slice(x[0], x[1]).map((candidate, index) => {

                                                                        const appJobs = appliedJob.filter(job => job.candidateId === candidate.id)

                                                                        // const registered = allCand.find(cand => cand.id === candidate.id);

                                                                        return (
                                                                            <tr className='dash-table-row client' key={candidate.id}>
                                                                                <td className='dash-table-data1'>{index + 1}.</td>
                                                                                <td className='dash-table-data1 text-capitalized'>
                                                                                    {candidate.firstName + ' ' + candidate.lastName}
                                                                                </td>
                                                                                {selectedColumns?.includes("Email ID") && <td className='dash-table-data1'>
                                                                                    <a href={`mailto:${candidate.email}`}
                                                                                        className='dash-table-data1 link is-link p-0'>
                                                                                        {candidate.email}
                                                                                    </a>
                                                                                </td>}

                                                                                {selectedColumns?.includes("Mobile Number") && <td className='dash-table-data1'>
                                                                                    <a href={`tel:${candidate.phone}`}
                                                                                        className='dash-table-data1 link is-link p-0'>
                                                                                        {candidate.phone}
                                                                                    </a>
                                                                                </td>}

                                                                                {selectedColumns?.includes("Send an interview invitation") && <td className='dash-table-data1 text-left'>
                                                                                    <button className='send-email-btn' onClick={() => handleSend(candidate.id)}>
                                                                                        <i class="bi bi-send-fill send-icon"></i>
                                                                                        Send
                                                                                    </button>
                                                                                </td>}

                                                                                {selectedColumns?.includes("Current Job Role") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.designation[0]}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Skills") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.skills.join(", ")}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Experience") && <td className='dash-table-data1 text-left'>
                                                                                    <span>{candidate?.year}</span>&nbsp;years and&nbsp;<span>{candidate?.month}</span>&nbsp;months
                                                                                </td>}

                                                                                {selectedColumns?.includes("Current/Previous Working/Worked Company Name") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.companyName}
                                                                                </td>}

                                                                                {selectedColumns?.includes("College") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.college}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Education") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.education}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Location") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.location}
                                                                                </td>}

                                                                                {selectedColumns?.includes("About him/her") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.profileHeadline}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Last Working Day") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.selectedDate}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Available To Join In") && <td className='dash-table-data1 text-left'>
                                                                                    {candidate?.days}
                                                                                </td>}

                                                                                {selectedColumns?.includes("Applied jobs of your posted") && <td className='dash-table-data1 text-left'>
                                                                                    {appliedOfPostedJobs
                                                                                        .filter((appliedOfPostedJob) => appliedOfPostedJob.candidateId === candidate?.id).length > 0 ?
                                                                                        appliedOfPostedJobs
                                                                                            .filter((appliedOfPostedJob) => appliedOfPostedJob.candidateId === candidate?.id)
                                                                                            .map((appliedOfPostedJob) => {
                                                                                                return (
                                                                                                    <span className='dash-table-data1 text-capitalized'>{appliedOfPostedJob.jobRole[0]}</span>
                                                                                                )
                                                                                            }) :
                                                                                        <span className='text-secondary'>Still not applied for your posted jobs</span>
                                                                                    }
                                                                                </td>}

                                                                                {selectedColumns?.includes("Applied jobs") && <td className='dash-table-data1 text-left'>
                                                                                    {appJobs
                                                                                        .length > 0 ?
                                                                                        appJobs
                                                                                            .map((appliedJob) => {
                                                                                                const postedBy = appliedJob.companyId
                                                                                                    ? (allCompany.find(company => company.companyId === appliedJob.companyId)?.companyName)
                                                                                                    : (allEmployee.find(employee => employee.id === appliedJob.recruiterId)?.name);
                                                                                                return (
                                                                                                    <div className='dash-table-data1 text-capitalized'><strong>{appliedJob.jobRole[0]}</strong><br />Posted By : {postedBy}</div>

                                                                                                )
                                                                                            }) :
                                                                                        <span className='text-secondary'>Still not applied for any posted jobs</span>}
                                                                                </td>
                                                                                }
                                                                                {selectedColumns?.includes("View CV") && <td className='text-left'>
                                                                                    <button className='application-btn with-modal' onClick={() => handleViewCV(candidate?.file)}>
                                                                                        <span></span>&nbsp;&nbsp;&nbsp;
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                                        </svg>
                                                                                    </button>
                                                                                </td>}
                                                                                {selectedColumns?.includes("Status") && <td className='text-left'>
                                                                                    <div className='table-select-input-area'>
                                                                                        <select className='table-select-input'>
                                                                                            <option selected disabled>Select one.</option>
                                                                                            <option >New CV Upload</option>
                                                                                            <option >Applied Online</option>
                                                                                            <option>Submitted to Client</option>
                                                                                            <option >Interviews in Process</option>
                                                                                            <option >Offered</option>
                                                                                            <option >Rejected</option>
                                                                                            <option >Joined</option>
                                                                                            <option >Invoiced</option>
                                                                                            <option >Payment Received</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </td>}
                                                                                <td className='text-left'>
                                                                                    <div className="action-btn-area">
                                                                                        <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#candidatesViewModal" onClick={() => viewCandidateDetail(candidate.id)}>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                            </svg>
                                                                                        </button>
                                                                                        {/* {(role === "Recruiter") && <button className='job-edit-btn' title='Edit candidate details...' onClick={() => navigate(`/create-candidate`, { state: { id: candidate.id } })}
                                                                                            disabled={registered}>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                            </svg>
                                                                                        </button>}
                                                                                        {(role === "Recruiter") && <button className='job-delete-btn' title='Delete candidate data...' onClick={() => handleDeleteCand(candidate.id)}
                                                                                            disabled={registered}
                                                                                        >
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                            </svg>
                                                                                        </button>} */}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                        : null}
                                                        </table>
                                                    </div> :
                                                    <div className="no-data-created-area">
                                                        <div className='no-data-created'>
                                                            <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                            <div className='no-data-text'>No Candidates Created Yet..!</div>
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
                                                    {!filteredSearchResultsMsg && <div className='pag-page'>
                                                        <span className='current-page'>{Math.ceil(x[0] / 10) + 1}</span>&nbsp;/&nbsp;
                                                        <span className='total-page'>{filteredSearchResults.length > 0 ? Math.ceil(filteredSearchResults.length / 10) : Math.ceil(candidateDetail.length / 10)}</span>
                                                    </div>}
                                                    {(filteredSearchResultsMsg ? !filteredSearchResultsMsg : filteredSearchResults.length > 0 ? (filteredSearchResults.slice(x[0], x[1]).length === 10 && filteredSearchResults.length > x[1]) : (candidateDetail.slice(x[0], x[1]).length === 10 && candidateDetail.length > x[1])) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
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

                {/* Candidates details view modal here */}
                <div className="modal fade" id="candidatesViewModal" tabindex="-1" role="dialog" aria-labelledby="candidatesViewLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title candidate" id="candidatesViewLabel">
                                    Candidate Details_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-view-card candidate">
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Full Name</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.firstName + ' ' + selectedCandidate?.lastName}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Mobile Number</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <a href={`tel:${selectedCandidate?.phone}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {selectedCandidate?.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Email ID</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <a href={`mailto:${selectedCandidate?.email}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {selectedCandidate?.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Current Job Role</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.designation[0]}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Skills</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="cand-skills-area">
                                                {selectedCandidate?.skills.map(skill => {
                                                    return (
                                                        <span className='cand-skill text-capitalized'>{skill}</span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Experience</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <span>{selectedCandidate?.year}</span>&nbsp;years and&nbsp;<span>{selectedCandidate?.month}</span>&nbsp;months
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Current/Previous Working/Worked Company Name</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.companyName}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">College</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.college}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Education</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.education.join(", ")}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head text-capitalized">Location</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">{selectedCandidate?.location}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">About him/her</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.profileHeadline}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    {selectedCandidate?.selectedDate && <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Last Working Day</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">{selectedCandidate?.selectedDate}</div>
                                        </div>
                                    </div>}
                                    <hr />
                                    {selectedCandidate?.days && <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Available To Join In</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">{selectedCandidate?.days}</div>
                                        </div>
                                    </div>}
                                    {selectedCandidate?.days && <hr />}
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Applied jobs of your posted</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="cand-skills-area">
                                                {appliedOfPostedJobs
                                                    .filter((appliedOfPostedJob) => appliedOfPostedJob.candidateId === selectedCandidate?.id).length > 0 ?
                                                    appliedOfPostedJobs
                                                        .filter((appliedOfPostedJob) => appliedOfPostedJob.candidateId === selectedCandidate?.id)
                                                        .map((appliedOfPostedJob) => {
                                                            return (
                                                                <span className='cand-skill text-capitalized'>{appliedOfPostedJob.jobRole[0]}</span>
                                                            )
                                                        }) :
                                                    <p className='text-secondary'>Still not applied for your posted jobs</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Applied jobs</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="cand-skills-area">
                                                {appliedJobLoading ? <p>Loading...</p>
                                                    : <>
                                                        {appliedJobForCandId
                                                            .length > 0 ?
                                                            appliedJobForCandId
                                                                .map((appliedJob) => {
                                                                    const postedBy = appliedJob.companyId
                                                                        ? (allCompany.find(company => company.companyId === appliedJob.companyId)?.companyName)
                                                                        : (allEmployee.find(employee => employee.id === appliedJob.recruiterId)?.name);
                                                                    return (
                                                                        <span className='cand-skill text-capitalized'><strong>{appliedJob.jobRole[0]}</strong><br />Posted By:{postedBy}</span>

                                                                    )
                                                                }) :
                                                            <p className='text-secondary'>Still not applied for any posted jobs</p>
                                                        }</>}
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
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className={`doc-view-modal-content ${isModalOpen ? 'open' : ''}`}
                    overlayClassName={`doc-view-modal-overlay ${isModalOpen ? 'open' : ''}`}
                >
                    {candidateResumeUrl && (
                                <DocViewer
                                    documents={[
                                        { uri: `data:application/pdf;base64,${candidateResumeUrl}` },
                                        { uri: `data:application/msword;base64,${candidateResumeUrl}` }, // For DOC format
                                        { uri: `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${candidateResumeUrl}` } // For DOCX format
                                    ]}
                                    renderers={DocViewerRenderers}
                                    className='document'
                                />
                    )}

                    <button className="doc-view-close-button" onClick={closeModal}>
                        <i className='bi bi-x'></i>
                    </button>
                </Modal>
                <Footer />
            </div >
        </div >
    )
}

export default AllCandidates