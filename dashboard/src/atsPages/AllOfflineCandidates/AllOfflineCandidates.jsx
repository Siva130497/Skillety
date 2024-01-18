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

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


const AllOfflineCandidates = () => {
    const navigate = useNavigate();
    const { getProtectedData } = useContext(AuthContext);
    const [atsToken, setatsToken] = useState("");
    const [candDetail, setCandDetail] = useState([]);
    const [aCand, setACand] = useState();

    const [x, setX] = useState([0, 10]);
    const [loading, setLoading] = useState(true);
    const [employeeId, setEmployeeId] = useState("");

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterData(term);
    };

    const filterData = (term) => {
        const filteredArray = candDetail.filter((item) => {
            const lowerCaseTerm = term.toLowerCase();
            return Object.values(item)
                .map((value) => (value || '').toString().toLowerCase())
                .some((value) => value.includes(lowerCaseTerm));
        });
        setFilteredData(filteredArray);
    };

    useEffect(() => {
        setatsToken(JSON.parse(localStorage.getItem('atsToken')))
    }, [atsToken])

    useEffect(() => {
        if (atsToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(atsToken);
                    console.log(userData);
                    setEmployeeId(userData.id);
                    
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
            getAllCandDetails();
            
        }
    }, [atsToken]);

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
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    const getAllCandDetails = async () => {
        try {

            const response = await axios.get(`https://skillety-n6r1.onrender.com/offline-cand-Details`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setCandDetail(result.reverse());
                setFilteredData(result.reverse());
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleCard = (id) => {
        const candidate = filteredData.find(cand => cand.candId === id)
        setACand(candidate);
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

                axios.delete(`https://skillety-n6r1.onrender.com/delete-exiesting-offline-cand/${id}`, {
                    headers: {
                        Authorization: `Bearer ${atsToken}`,
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
    };

    // const handleSendEmail = (data) => {

    // }

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className='d-flex align-items-end justify-content-between pt-4'>
                                <div className="admin-component-name pt-0">
                                    All Candidates
                                </div>
                                <div className="create-btn-area">
                                    <a
                                        href="/offline-candidate-create"
                                        className='btn creat-data-btn'
                                        title='Create new candidate...'
                                    >
                                        <i class="bi bi-person-plus-fill"></i>
                                        <span>Create New</span>
                                    </a>
                                </div>
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
                                                            All Candidates Details
                                                        </div>
                                                        <div className="man-app-sub-title">
                                                            Total Candidates :&nbsp;
                                                            <span>{filteredData.length}</span>
                                                        </div>
                                                    </div>
                                                    <div className="recruiter-search-input-area">
                                                        <input type="search" className='recruiter-search-input' placeholder='Search candidates...' 
                                                        value={searchTerm}
                                                        onChange={handleInputChange}/>
                                                        <i className='bi bi-search search-icon'></i>
                                                        <button className='recruiter-search-btn'>Search</button>
                                                    </div>
                                                </div>

                                                {filteredData.length === 0 ?
                                                    <div className="no-data-created-area">
                                                        <div className='no-data-created'>
                                                            <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                            <div className='no-data-text'>No Candidate Created Yet..!</div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="table-responsive table-scroll-area">
                                                        <table className="table table-striped table-hover admin-lg-table">
                                                            <tr className='dash-table-row candidate'>
                                                                <th className='dash-table-head'>No.</th>
                                                                <th className='dash-table-head'>Full Name</th>
                                                                <th className='dash-table-head'>Email</th>
                                                                <th className='dash-table-head'>Mobile</th>
                                                                {/* <th className='dash-table-head'>Send Email</th> */}

                                                                <th className='dash-table-head text-center'>View</th>
                                                            </tr>


                                                            {/* table data */}

                                                            {/* <tr>
                                                                <td colSpan={6} className='text-secondary text-center'>
                                                                    Search Results Not Found!
                                                                </td>
                                                            </tr> */}
                                                            {filteredData.slice(x[0], x[1]).map((cand, index) =>    {

                                                                // const candDeatil = {
                                                                //     firstName: cand?.firstName,
                                                                //     lastName: cand?.lastName,
                                                                //     emailId: cand?.emailId,
                                                                //     mobileNumber: cand?.mobileNumber
                                                                // }

                                                                return (
                                                                <tr className='dash-table-row client'>
                                                                    <td className='dash-table-data1'>{index+1}.</td>
                                                                    <td className='dash-table-data1 text-capitalized'>
                                                                        {cand?.firstName} {cand?.lastName}
                                                                    </td>
                                                                    <td className='dash-table-data1'>
                                                                        <a href={`mailto:email`}
                                                                            className='dash-table-data1 link is-link p-0'>
                                                                            {cand?.emailId}
                                                                        </a>
                                                                    </td>

                                                                    <td className='dash-table-data1'>
                                                                        <a href={`tel:0000000`}
                                                                            className='dash-table-data1 link is-link p-0'>
                                                                            {cand?.mobileNumber}
                                                                        </a>
                                                                    </td>

                                                                    {/* <td className='dash-table-data1 text-left'>
                                                                        <button className='send-email-btn'
                                                                        onClick={()=>handleSendEmail(candDeatil)}>
                                                                            <i class="bi bi-send-fill send-icon"></i>
                                                                            Send
                                                                        </button>
                                                                    </td> */}

                                                                    <td className='text-center'>
                                                                        <div className="action-btn-area">
                                                                            <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' 
                                                                            onClick={() => handleCard(cand?.candId)}
                                                                            data-target="#candidatesViewModal">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                </svg>
                                                                            </button>
                                                                            <button className='job-edit-btn' title='Edit candidate details...'
                                                                            onClick={() => navigate(`/offline-candidate-create`, { state: { cand } })}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                </svg>
                                                                            </button>
                                                                            <button className='job-delete-btn' title='Delete candidate data...'
                                                                            onClick={() => handleDeleteCand(cand?.candId)}>
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
                                                {/* <div className="no-data-created-area">
                                                    <div className='no-data-created'>
                                                        <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                        <div className='no-data-text'>No Candidates Created Yet..!</div>
                                                    </div>
                                                </div> */}

                                            </div>

                                            <div className="table-pagination-area pt-3">
                                                <div className="pagination-btn-area">
                                                    {x[0] > 0 && <button className='pag-prev-btn' onClick={() => setX([x[0] - 10, x[1] - 10])}>
                                                        <i class="bi bi-chevron-left"></i>
                                                    </button>}
                                                    <div className='pag-page'>
                                                        <span className='current-page'>{Math.ceil(x[0] / 10) + 1}</span>&nbsp;/&nbsp;
                                                        <span className='total-page'>{Math.ceil(filteredData.length / 10)}</span>
                                                    </div>
                                                    {(filteredData.slice(x[0], x[1]).length === 10 && filteredData.length > x[1]) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
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
                                            <div className="view-det-sub-head text-capitalized">{aCand?.firstName} {aCand?.lastName}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Mobile Number</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <a href={`tel:000000`}
                                                    className='view-det-sub-head link is-link'>
                                                    {aCand?.mobileNumber}
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
                                                <a href={`mailto:email`}
                                                    className='view-det-sub-head link is-link'>
                                                    {aCand?.emailId}
                                                </a>
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

export default AllOfflineCandidates