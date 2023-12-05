import React, { useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './AllCompanyStaff.css';
import './AllCompanyStaff-responsive.css';
import $ from 'jquery';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AllCompanyStaff = () => {
    const [staffToken, setStaffToken] = useState("");
    const [allRecruiters, setAllRecruiters] = useState([]);
    const [selectedRecruiterViewDetail, setSelectedRecruiterViewDetail] = useState();
    const [loading, setLoading] = useState(true);
    const initialCredentials = {
        name: "",
        email: "",
        phone: "",
        companyStaff: "",
        password: "",
    }
    const [credentials, setcredentials] = useState(initialCredentials);
    const [showPassword, setShowPassword] = useState(false);



    const [x, setX] = useState([0, 10]);

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        $(document).ready(function () {
        });

    }, []);

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Congratulations!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    const getAllRecruiters = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://skillety.onrender.com/all-recruiters`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAllRecruiters(result);
            } else {
                console.log(result);
            }

            setLoading(false);
        } catch (err) {
            console.log(err);

            setLoading(false);
        }
    }

    useEffect(() => {
        if (staffToken) {
            getAllRecruiters();
        }

    }, [staffToken]);

    const handleViewRecruiterDetail = (id) => {
        const selectedRecruiter = allRecruiters.find(recruiter => recruiter.id === id);
        setSelectedRecruiterViewDetail(selectedRecruiter);
    }

    const handleRemove = (id) => {
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

                axios.delete(`https://skillety.onrender.com/delete-recruiter/${id}`, {
                    headers: {
                        Authorization: `Bearer ${staffToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        showSuccessMessage("recruiter successfully removed from company!");
                        getAllRecruiters();
                    })
                    .catch(err => {
                        console.log(err)
                        showErrorMessage();
                    })
            }
        });
    }

    const createRecruiter = async (userData) => {
        try {
            const response = await axios.post('https://skillety.onrender.com/recruiter-create', userData, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                showSuccessMessage("New company staff has been created successfully!")
                setcredentials(initialCredentials);
                getAllRecruiters();
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
            showErrorMessage(error.response.data.message);
        }
    };


    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcredentials({ ...credentials, [name]: value });
    }

    const handleGeneratePassword = () => {
        axios.get('https://skillety.onrender.com/random-password')
            .then(response => {
                setcredentials({ ...credentials, password: response.data });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = uuidv4();
        const updatedCredentials = {
            ...credentials,
            id,
        };
        console.log(updatedCredentials);
        createRecruiter(updatedCredentials);
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
                                Company Staffs
                            </div>

                            {/* <Skeleton height={40} width={200} />
                            <Skeleton count={3} />
                            <Skeleton circle={true} height={50} width={50} /> */}


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
                                                <div className='man-app-title-area custom-flex-area'>
                                                    <div>
                                                        <div className="man-app-title">
                                                            Company Staffs Details
                                                        </div>
                                                        <div className="man-app-sub-title">
                                                            Total Staffs :&nbsp;
                                                            <span>{allRecruiters.length}</span>
                                                        </div>
                                                    </div>
                                                    <div className="create-btn-area">
                                                        <button
                                                            className='btn creat-data-btn'
                                                            data-toggle="modal"
                                                            title='Create new staff...'
                                                            data-target="#staffCreateModal"
                                                        >
                                                            <i class="bi bi-person-plus-fill"></i>
                                                            <span>Create New</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                {allRecruiters.length === 0 ?
                                                    <div className="no-data-created-area">
                                                        <div className='no-data-created'>
                                                            <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                            <div className='no-data-text'>No Staff Created Yet..!</div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="table-responsive table-scroll-area">
                                                        <table className="table table-striped table-hover admin-lg-table">
                                                            <tr className='dash-table-row man-app'>
                                                                <th className='dash-table-head'>No.</th>
                                                                <th className='dash-table-head'>Full Name</th>
                                                                <th className='dash-table-head'>Email ID</th>
                                                                <th className='dash-table-head'>Staff Type</th>
                                                                <th className='dash-table-head text-center'>Action</th>
                                                            </tr>

                                                            {/* table data */}
                                                            {allRecruiters.slice(x[0], x[1]).map((recruiter, index) => {
                                                                return (
                                                                    <tr className='dash-table-row client' key={recruiter.id}>
                                                                        <td className='dash-table-data1'>{index + 1}.</td>
                                                                        <td className='dash-table-data1 text-capitalized'>
                                                                            {recruiter.name}
                                                                        </td>
                                                                        <td className='dash-table-data1'>
                                                                            <a href={`mailto:${recruiter.email}`}
                                                                                className='dash-table-data1 link is-link'>
                                                                                {recruiter.email}
                                                                            </a>
                                                                        </td>

                                                                        <td className='dash-table-data1'>
                                                                            {recruiter.companyStaff}
                                                                        </td>
                                                                        <td className='text-center'>
                                                                            <div className="action-btn-area">
                                                                                <button className='job-view-btn' data-toggle="modal" title='View staff details...' data-target="#staffViewModal" onClick={() => handleViewRecruiterDetail(recruiter.id)}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                                                                                        />
                                                                                    </svg>
                                                                                </button>

                                                                                <button className='job-delete-btn' data-toggle="modal" title='Delete staff data...' data-target="#contactMsgdeleteModal" onClick={() => handleRemove(recruiter.id)}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </table>
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
                                                    <div className='pag-page'>
                                                        <span className='current-page'>{Math.ceil(x[0] / 10) + 1}</span>&nbsp;/&nbsp;
                                                        <span className='total-page'>{Math.ceil(allRecruiters.length / 10)}</span>
                                                    </div>
                                                    {(allRecruiters.slice(x[0], x[1]).length === 10 && allRecruiters.length > x[1]) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
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

                {/* Comapny staff details view modal here */}
                <div className="modal fade" id="staffViewModal" tabindex="-1" role="dialog" aria-labelledby="staffViewModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client" id="staffViewModalLabel">
                                    Company Staff Details_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-view-card">
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Full Name</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{selectedRecruiterViewDetail?.name}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Mobile Number</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">
                                                <a href={`tel:${selectedRecruiterViewDetail?.phone}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {selectedRecruiterViewDetail?.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Email ID</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">
                                                <a href={`mailto:${selectedRecruiterViewDetail?.email}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {selectedRecruiterViewDetail?.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Staff Type</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{selectedRecruiterViewDetail?.companyStaff}</div>
                                        </div>
                                    </div>
                                    {/* <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Industry</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.industry}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Headcount</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">{aClient?.count}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">From where did you learn about Skillety?</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.text}</div>
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
                {/*  */}

                {/* Comapny staff details view modal here */}
                <div className="modal fade" id="staffCreateModal" tabindex="-1" role="dialog" aria-labelledby="staffCreateModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client" id="staffCreateModalLabel">
                                    Create new staff_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="card p-4 recruiter-view-card">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                                <div className="dash-form-group">
                                                    <label htmlFor="name" className='dash-form-label'>Staff Name<span className='form-required'>*</span></label>
                                                    <input
                                                        type="text"
                                                        id="staff_name"
                                                        aria-describedby="staffName"
                                                        name="name"
                                                        value={credentials.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the staff name"
                                                        className='form-control dash-form-input'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                                <div className="dash-form-group">
                                                    <label htmlFor="email" className='dash-form-label'>Email Address<span className='form-required'>*</span></label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        aria-describedby="email"
                                                        name="email"
                                                        value={credentials.email}
                                                        onChange={handleInputChange}
                                                        placeholder="example@example.com"
                                                        className='form-control dash-form-input'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                                <div className="dash-form-group">
                                                    <label htmlFor="phone" className='dash-form-label'>Phone No.<span className='form-required'>*</span></label>
                                                    <input
                                                        type="number"
                                                        id="phone"
                                                        aria-describedby="mobileNo"
                                                        name="phone"
                                                        value={credentials.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="0XXXX XXXX XXX"
                                                        className='form-control dash-form-input'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                                <div className="dash-form-group">
                                                    <label htmlFor="companyStaff" className='dash-form-label'>Staff Type<span className='form-required'>*</span></label>
                                                    <i class="bi bi-chevron-down toggle-icon"></i>
                                                    <select
                                                        id="companyStaff"
                                                        name="companyStaff"
                                                        value={credentials.companyStaff}
                                                        onChange={handleInputChange}
                                                        className='form-control dash-form-input select-input'
                                                        required>
                                                        <option value="" disabled selected>-- Select type of company staff --</option>
                                                        <option value="HR">HR</option>
                                                        <option value="Operator">Operator</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Customer support executive">Customer support executive</option>
                                                        <option value="digitalmarketing team">digitalmarketing team</option>
                                                        <option value="RMG">RMG</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                                <div className="dash-form-group">
                                                    <label htmlFor="password" className='dash-form-label'>Password<span className='form-required'>*</span></label>
                                                    <div className='row'>
                                                        <div className="col-12 col-sm-12 col-lg-6">
                                                            <input
                                                                type={showPassword ? 'text' : 'password'}
                                                                id="password"
                                                                aria-describedby="password"
                                                                name="password"
                                                                value={credentials.password}
                                                                onChange={handleInputChange}
                                                                placeholder="Company staff password"
                                                                className='form-control dash-form-input'
                                                                required
                                                            />
                                                            {/* {credentials.password ? */}
                                                            <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} password-view-icon`}
                                                                onClick={handleTogglePassword}
                                                                id='togglePassword'>
                                                            </i>
                                                            {/* : null} */}
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-lg-6 pl-lg-0 mt-3 mt-lg-0 generate-btn-area">
                                                            <button
                                                                type="button"
                                                                className="btn generate-btn"
                                                                title='Generate Password'
                                                                onClick={handleGeneratePassword}
                                                            >
                                                                Generate
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                    <button className="btn save-btn" type='submit'>
                                        Save
                                    </button>
                                    <button type="button" className="btn close-modal-btn" data-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*  */}

                <Footer />
            </div >
        </div >
    )
}

export default AllCompanyStaff