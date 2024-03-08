import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import $ from 'jquery';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import AuthContext from '../../context/AuthContext';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AllClientStaff = () => {
    const [clientToken, setclientToken] = useState("");
    const { getProtectedData } = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState();
    const [allClientStaffs, setAllClientStaffs] = useState([]);
    const [selectedClientStaffViewDetail, setSelectedClientStaffViewDetail] = useState();

    const [loading, setLoading] = useState(true);

    const initialCredentials = {
        name: "",
        email: "",
        phone: "",
    }
    const [credentials, setcredentials] = useState(initialCredentials);

    const [x, setX] = useState([0, 10]);

    useEffect(() => {
        setclientToken(JSON.parse(localStorage.getItem('clientToken')))
    }, [clientToken])

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



    const handleViewClientStaffDetail = (id) => {
        const selectedClientStaff = allClientStaffs.find(clientStaff => clientStaff.id === id);
        setSelectedClientStaffViewDetail(selectedClientStaff);
    }

    const createClientStaff = async (userData) => {
        try {
            const response = await axios.post(`https://skillety-n6r1.onrender.com/tempPass-Client-staff/${employeeId}`, userData, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });

            const result = response.data;

            if (!result.message) {
                console.log(result);
                if (result.emailSent) {
                    showSuccessMessage("New client staff has been created successfully!")
                    setcredentials(initialCredentials)
                    getAllClientStaffs();
                } else {
                    console.log('Email sending failed.');
                    showErrorMessage('Email sending failed.')
                }
            } else {
                console.log(result);
                showErrorMessage("you reached the limit of creating accounts, upgrade your plan")
                setcredentials(initialCredentials);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getLoginClientDetail = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/client/${employeeId}`, {
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

            setLoading(false);
        } catch (err) {
            console.log(err);

            setLoading(false);
        }
    }

    const getAllClientStaffs = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/all-client-staffs/${loginClientDetail?.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAllClientStaffs(result);
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
        if (clientToken) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const user = await getProtectedData(clientToken);
                    console.log(user);
                    setEmployeeId(user.id || user.uid);

                    setLoading(false);
                } catch (error) {
                    console.log(error)
                    window.location.href = 'https://skillety-frontend-wcth.onrender.com/client-login'
                    setLoading(false);
                }
            };

            fetchData();
        }

    }, [clientToken]);

    useEffect(() => {
        if (employeeId) {
            getLoginClientDetail();
        }
    }, [employeeId]);

    useEffect(() => {
        if (loginClientDetail) {
            getAllClientStaffs();
        }
    }, [loginClientDetail]);


    // const handleRemove = (id) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'You won\'t be able to revert this!',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {

    //             axios.delete(`https://skillety-n6r1.onrender.com/delete-recruiter/${id}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${clientToken}`,
    //                     Accept: 'application/json'
    //                 }
    //             })
    //                 .then(res => {
    //                     console.log(res.data)
    //                     showSuccessMessage("recruiter successfully removed from company!");
    //                     getallClientStaffs();
    //                 })
    //                 .catch(err => {
    //                     console.log(err)
    //                     showErrorMessage();
    //                 })
    //         }
    //     });
    // }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedCredentials = {
            ...credentials,
        };
        console.log(updatedCredentials);
        createClientStaff(updatedCredentials);
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
                                Company Staffs
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
                                                <div className='man-app-title-area custom-flex-area'>
                                                    <div>
                                                        <div className="man-app-title">
                                                            Company Staffs Details
                                                        </div>
                                                        <div className="man-app-sub-title">
                                                            Total Staffs :&nbsp;
                                                            <span>{allClientStaffs.length}</span>
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
                                                {allClientStaffs.length === 0 ?
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
                                                                {/* <th className='dash-table-head'>Staff Type</th> */}
                                                                <th className='dash-table-head text-left'>Action</th>
                                                            </tr>

                                                            {/* table data */}
                                                            {allClientStaffs.slice(x[0], x[1]).map((clientStaff, index) => {
                                                                return (
                                                                    <tr className='dash-table-row client' key={clientStaff.id}>
                                                                        <td className='dash-table-data1'>{index + 1}.</td>
                                                                        <td className='dash-table-data1 text-capitalized'>
                                                                            {clientStaff.name}
                                                                        </td>
                                                                        <td className='dash-table-data1'>
                                                                            <a href={`mailto:${clientStaff.email}`}
                                                                                className='dash-table-data1 link is-link'>
                                                                                {clientStaff.email}
                                                                            </a>
                                                                        </td>

                                                                        {/* <td className='dash-table-data1'>
                                                                        {recruiter.companyStaff}
                                                                    </td> */}
                                                                        <td className='text-left'>
                                                                            <div className="action-btn-area">
                                                                                <button className='job-view-btn' data-toggle="modal" title='View staff details...' data-target="#staffViewModal" onClick={() => handleViewClientStaffDetail(clientStaff.id)}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                                                                                        />
                                                                                    </svg>
                                                                                </button>

                                                                                {/* <button className='job-delete-btn' data-toggle="modal" title='Delete contact message data...' data-target="#contactMsgdeleteModal" onClick={() => handleRemove(recruiter.id)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                </svg>
                                                                            </button> */}
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
                                                        <span className='total-page'>{Math.ceil(allClientStaffs.length / 10)}</span>
                                                    </div>
                                                    {(allClientStaffs.slice(x[0], x[1]).length === 10 && allClientStaffs.length > x[1]) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
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
                                            <div className="view-det-sub-head text-capitalized">{selectedClientStaffViewDetail?.name}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Mobile Number</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">
                                                <a href={`tel:${selectedClientStaffViewDetail?.phone}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {selectedClientStaffViewDetail?.phone}
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
                                                <a href={`mailto:${selectedClientStaffViewDetail?.email}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {selectedClientStaffViewDetail?.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Staff Type</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{selectedRecruiterViewDetail?.companyStaff}</div>
                                        </div>
                                    </div> */}
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
                                                        placeholder="Enter Email ID"
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

export default AllClientStaff