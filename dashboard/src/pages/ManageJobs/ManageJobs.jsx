import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import './ManageJobs.css';
import './ManageJobs-responsive.css';
import $ from 'jquery';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const ManageJobs = () => {
    const [clientToken, setClientToken] = useState("");
    const { getProtectedData } = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState([]);

    // const uniqueJobIds = new Set();
    const [updatePostedJobs, setUpdatePostedJobs] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);
    const [selectedJobViewDetail, setSelectedPostedJobViewDetail] = useState();
    const [appliedOfPostedJobs, setAppliedOfPostedJobs] = useState([]);
    const [allStaff, setAllStaff] = useState([]);

    const [x, setX] = useState([0, 10]);

    const navigate = useNavigate();


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
        $(document).ready(function () {
        });

    }, []);

    useEffect(() => {
        setClientToken(JSON.parse(localStorage.getItem('clientToken')))
    }, [clientToken])

    useEffect(() => {
        if (clientToken) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(clientToken);
                    console.log(user);
                    setEmployeeId(user.id);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, [clientToken]);

    const getLoginClientDetail = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/client/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setLoginClientDetail(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (employeeId) {
            getLoginClientDetail();
        }
    }, [employeeId]);

    const getOwnPostedjobs = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/my-posted-jobs/${loginClientDetail.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setUpdatePostedJobs(prevPostedJobs => [...prevPostedJobs, ...result.reverse()]);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getOwnActivejobs = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/my-active-jobs/${loginClientDetail.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setUpdatePostedJobs(prevPostedJobs => [...prevPostedJobs, ...result.reverse()]);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getNonApprovaljobs = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/non-approval-jobs`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setUpdatePostedJobs(prevPostedJobs => [...prevPostedJobs, ...result.reverse()]);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    //   const updatePostedJobs = (newJobs) => {
    //     // Filter out duplicates based on job ID
    //     const uniqueNewJobs = newJobs.filter(job => !uniqueJobIds.has(job.id));

    //     // Add unique job IDs to the set
    //     newJobs.forEach(job => uniqueJobIds.add(job.id));

    //     // Concatenate the new data to the existing postedJobs array
    //     setPostedJobs(prevPostedJobs => [...prevPostedJobs, ...uniqueNewJobs]);
    //   }

    const getAppliedOfPostedJobs = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/applied-jobs-of-posted/${loginClientDetail.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAppliedOfPostedJobs(result.reverse());
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const allStaffFromCompany = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/all-staff/${loginClientDetail.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAllStaff(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getOwnPostedjobs();
        getNonApprovaljobs();
        getOwnActivejobs();
        getAppliedOfPostedJobs();
        allStaffFromCompany();
    }, [loginClientDetail]);

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
        setPostedJobs(newArray)
    }, [updatePostedJobs]);

    console.log(postedJobs)

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

                axios.delete(`https://skillety.onrender.com/delete-job/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
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

    const handleDeleteNonApprovalJob = (id) => {

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

                axios.delete(`https://skillety.onrender.com/delete-non-approval-job/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
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

                axios.delete(`https://skillety.onrender.com/delete-active-job/${id}`, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
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
                axios.post("https://skillety.onrender.com/job-activate", { id }, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
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
                                text: 'It will be displayed on the job portal from now on, but no matching candidates were found.',
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

                axios.post("https://skillety.onrender.com/job-deactivate", { id }, {
                    headers: {
                        Authorization: `Bearer ${clientToken}`,
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

    const handleViewJobDetail = (id) => {
        const selectedPostedJob = postedJobs.find(postedJob => postedJob.id === id);
        setSelectedPostedJobViewDetail(selectedPostedJob);
    }

    return (
        <div>
            {clientToken && <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ClientLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Manage Jobs
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className="table-responsive admin-lg-table-area">
                                            <table className="table table-striped table-hover admin-lg-table">
                                                <tr className='dash-table-row man-job'>
                                                    <th className='dash-table-head'>Job Title</th>
                                                    <th className='dash-table-head text-center'>DOC</th>
                                                    <th className='dash-table-head text-center'>Applicants</th>
                                                    <th className='dash-table-head text-center'>Posted by <br /> Who?</th>
                                                    <th className='dash-table-head text-center'>Status</th>
                                                    <th className='text-center'>Action</th>
                                                </tr>

                                                {/* table data */}
                                                {postedJobs.map((job) => {
                                                    const numApplicants = appliedOfPostedJobs.filter(appliedOfPostedJob => appliedOfPostedJob.jobId === job.id).length;
                                                    const staff = allStaff.find(obj => obj.id === (job.clientId || job.clientStaffId));
                                                    return (
                                                        <tr className='dash-table-row client' key={job.id}>
                                                            <td className='dash-table-data1 text-capitalized'>{job.jobRole[0]}</td>
                                                            <td className='dash-table-data1 text-center'>
                                                                {`${new Date(job.createdAt).getDate().toString().padStart(2, '0')}/${(new Date(job.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(job.createdAt).getFullYear() % 100}`}
                                                            </td>
                                                            <td className='dash-table-data1 text-center'>
                                                                {(job?.active) ? <button className='application-btn with-modal' onClick={() => numApplicants > 0 && navigate(`/applied-candidate/${job.id}`)}>
                                                                    <span>{numApplicants}</span>&nbsp;&nbsp;&nbsp;
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                    </svg>
                                                                </button> : <div className='text-approval'>This job still not shown <br /> on job portal</div>}
                                                            </td>
                                                            <td className='dash-table-data1 text-center text-capitalized'>
                                                                {staff ? staff.name : 'Unknown'}
                                                            </td>
                                                            <td className='text-center'>
                                                                {job?.pending ?
                                                                    <span className='man-job-status-btn theme-warning'>Approval Pending & InActive</span>
                                                                    : job?.active ?
                                                                        <span className='man-job-status-btn theme-success'>Approved & Active</span>
                                                                        :
                                                                        <span className='man-job-status-btn theme-info'>Approved & InActive</span>
                                                                }
                                                                {/* <span className='man-job-status-btn theme-info'>{job?.pending ? "Approval Pending & InActive" : job?.active ? "Approved & Active" : "Approved & InActive"}</span> */}
                                                            </td>

                                                            <td className='text-center'>
                                                                <div className="action-btn-area">
                                                                    <button className='job-edit-btn' title='Edit job details...' onClick={() => navigate(`/edit-job/${job.id}`)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                        </svg>
                                                                    </button>
                                                                    <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#invoiceModal" onClick={() => handleViewJobDetail(job.id)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                        </svg>
                                                                    </button>
                                                                    {(job?.pending) ?
                                                                        <button className='job-delete-btn' title='Delete job data...' onClick={() => handleDeleteNonApprovalJob(job.id)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                            </svg>
                                                                        </button> :
                                                                        (job?.active) ?
                                                                            <button className='job-delete-btn' title='Delete job data...' onClick={() => handleDeleteActiveJob(job.id)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                </svg>
                                                                            </button> :
                                                                            <button className='job-delete-btn' title='Delete job data...' onClick={() => handleDeleteJob(job.id)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                </svg>
                                                                            </button>}
                                                                    {(job?.pending) ?
                                                                        <button className='status-change-btn' title='Approval Pending' disabled>
                                                                            Activate
                                                                        </button> :
                                                                        (job?.active) ?
                                                                            <button className='status-change-btn deactive' title='Deactivate' onClick={() => handleDeActivate(job.id)}>
                                                                                Deactivate
                                                                            </button> :
                                                                            <button className='status-change-btn active' title='Activate' onClick={() => handleActivate(job.id)}>
                                                                                Activate
                                                                            </button>}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </table>
                                        </div>

                                        {/* <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View old jobs&nbsp;&nbsp;
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
                                                <div className='pag-page'>
                                                    <span className='current-page'>{Math.ceil(x[0] / 10) + 1}</span>&nbsp;/&nbsp;
                                                    <span className='total-page'>{Math.ceil(postedJobs.length / 10)}</span>
                                                </div>
                                                {(postedJobs.slice(x[0], x[1]).length === 10 && postedJobs.length > x[1]) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
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
                                                        <span className='cand-skill'>{skill}</span>
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
                                            <div className="view-det-sub-head">
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
                                            <div className="view-det-sub-head">{selectedJobViewDetail?.jobDescription}</div>
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
                                                        <span className='cand-skill'>{location}</span>
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
                                </div>
                            </div>
                            <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                <button type="button" className="btn close-modal-btn" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >}
        </div >
    )
}

export default ManageJobs