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
    const [postedJobs, setPostedJobs] = useState([]);
    const [appliedOfPostedJobs, setAppliedOfPostedJobs] = useState([]);
    const [allStaff, setAllStaff] = useState([]);

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
            const res = await axios.get(`http://localhost:5002/client/${employeeId}`, {
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
            const res = await axios.get(`http://localhost:5002/my-posted-jobs/${loginClientDetail.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setPostedJobs(result.reverse());
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAppliedOfPostedJobs = async () => {
        try {
            const res = await axios.get(`http://localhost:5002/applied-jobs-of-posted/${loginClientDetail.companyId}`, {
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
            const res = await axios.get(`http://localhost:5002/all-staff/${loginClientDetail.companyId}`, {
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
        getAppliedOfPostedJobs();
        allStaffFromCompany();
    }, [loginClientDetail]);

    const handleDeleteJob = (id) => {
        axios.delete(`http://localhost:5002/delete-job/${id}`, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data)
                showSuccessMessage("Job has been deleted!")
                getOwnPostedjobs();
            })
            .catch((err) => {
                console.log(err)
                showErrorMessage()
            })
    }

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
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
                                                    <th className='dash-table-head'>Total Jobs</th>
                                                    <th className='dash-table-head text-center'>DOA</th>
                                                    <th className='dash-table-head text-center'>No of total <br />Applicants</th>
                                                    <th className='dash-table-head text-center'>Posted by <br /> Who?</th>
                                                    <th className='dash-table-head text-center'>Status</th>
                                                    <th className='text-center'></th>
                                                </tr>

                                                {/* table data */}
                                                {postedJobs.map((job) => {
                                                    const numApplicants = appliedOfPostedJobs.filter(appliedOfPostedJob => appliedOfPostedJob.jobId === job.id).length;
                                                    const staff = allStaff.find(obj => obj.id === (job.clientId || job.clientStaffId));
                                                    return (
                                                        <tr className='dash-table-row client' key={job.id}>
                                                            <td className='dash-table-data1'>{job.jobRole[0]}</td>
                                                            <td className='dash-table-data1 text-center'>
                                                                {`${new Date(job.createdAt).getDate().toString().padStart(2, '0')}/${(new Date(job.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(job.createdAt).getFullYear() % 100}`}
                                                            </td>
                                                            <td className='dash-table-data1 text-center'>
                                                                <button className='application-btn with-modal' onClick={() => numApplicants > 0 && navigate(`/applied-candidate/${job.id}`)}>
                                                                    <span>{numApplicants}</span>&nbsp;&nbsp;&nbsp;
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                    </svg>
                                                                </button>
                                                            </td>
                                                            <td className='dash-table-data1 text-center'>
                                                                {staff ? staff.name : 'Unknown'}
                                                            </td>
                                                            <td className='text-center'>
                                                                <button className='man-job-status-btn theme-info'>Ongoing</button>
                                                            </td>
                                                            <td className='text-center'>
                                                                <button className='delete-btn' onClick={() => handleDeleteJob(job.id)}>
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                                <button className='edit-btn' onClick={() => navigate(`/edit-job/${job.id}`)}>
                                                                    <i class="bi bi-pencil-fill"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </table>
                                        </div>

                                        <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View old jobs&nbsp;&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17157 0.464466C8.97631 0.269204 8.65973 0.269204 8.46447 0.464466C8.2692 0.659728 8.2692 0.976311 8.46447 1.17157L11.2929 4L8.46447 6.82843C8.2692 7.02369 8.2692 7.34027 8.46447 7.53553C8.65973 7.7308 8.97631 7.7308 9.17157 7.53553L12.3536 4.35355ZM0 4.5L12 4.5V3.5L0 3.5L0 4.5Z" fill="#0F75C5" />
                                                </svg>
                                            </a>
                                        </div>
                                        <div className="table-pagination-area pt-3">
                                            <div className="pagination-btn-area">
                                                <button className='pag-prev-btn'>
                                                    <i class="bi bi-chevron-left"></i>
                                                </button>
                                                <div className='pag-page'>
                                                    <span className='current-page'>1</span>&nbsp;/&nbsp;
                                                    <span className='total-page'>7</span>
                                                </div>
                                                <button className='pag-next-btn'>
                                                    <i class="bi bi-chevron-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div >
        </div >
    )
}

export default ManageJobs