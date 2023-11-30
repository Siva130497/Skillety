import React from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import $ from 'jquery';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const ClientContact = () => {
    const [contactMsgDetails, setContactMsgDetails] = useState([]);
    const [staffToken, setStaffToken] = useState("");
    const [selectedViewDetail, setSelectedViewDetail] = useState();
    const [x, setX] = useState([0, 10]);

    useEffect(() => {
        $(document).ready(function () {
        });
    }, []);

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    const getAllContactMessages = async () => {
        try {
            const response = await axios.get('https://skillety.onrender.com/contact', {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            });
    
            const result = response.data;
    
            if (!result.error) {
                console.log(result);
                setContactMsgDetails(result);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
      };

      useEffect(()=>{
        getAllContactMessages();
      },[staffToken])

      const handleViewMsg = (id) => {
        const selectedMsg = contactMsgDetails.find(msg => msg._id === id);
        setSelectedViewDetail(selectedMsg);

    }

    const handleDelete = (id) => {

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
                axios.delete(`https://skillety.onrender.com/client-contact-msg/${id}`, {
                    headers: {
                        Authorization: `Bearer ${staffToken}`,
                        Accept: 'application/json'
                    }
                })
                .then(res => {
                    console.log(res.data);
                    getAllContactMessages();
                }
                )
                .catch(err => console.log(err));
            }
        });
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
                                Contact Message Details - Client
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className='admin-lg-table-area man-app'>

                                            <div className='man-app-title-area candidate'>
                                                <div>
                                                    <div className="man-app-title">
                                                        Contact Message Details
                                                    </div>
                                                    <div className="man-app-sub-title">
                                                        Total Contact Message Data :&nbsp;
                                                        <span>{contactMsgDetails.length}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {contactMsgDetails.length === 0 ?
                                                <div className="no-data-created-area">
                                                    <div className='no-data-created'>
                                                        <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                        <div className='no-data-text'>No Contact Msgs Found Yet..!</div>
                                                    </div>
                                                </div>
                                                :
                                            <div className="table-responsive table-scroll-area">
                                                <table className="table table-striped table-hover admin-lg-table">
                                                    <tr className='dash-table-row man-app'>
                                                        <th className='dash-table-head'>No.</th>
                                                        <th className='dash-table-head'>Full Name</th>
                                                        <th className='dash-table-head'>Mobile No.</th>
                                                        <th className='dash-table-head'>Email</th>
                                                        <th className='text-center'>Action</th>
                                                    </tr>

                                                    {/* table data */}
                                                    {contactMsgDetails.map((msg, index)=>{
                                                        return(
                                                            <tr className='dash-table-row client' key={msg._id}>
                                                        <td className='dash-table-data1'>{index+1}.</td>
                                                        <td className='dash-table-data1 text-capitalized'>
                                                        {msg.fullName}
                                                        </td>
                                                        <td className='dash-table-data1'>
                                                        {msg.phoneNo}
                                                        </td>
                                                        <td className='dash-table-data1'>
                                                        {msg.email}
                                                        </td>

                                                        <td className='text-center'>
                                                            <div className="action-btn-area">
                                                                <button className='job-view-btn' data-toggle="modal" title='View contact message details...' data-target="#contactMsgviewModal" onClick={()=>handleViewMsg(msg._id)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                                                                        />
                                                                    </svg>
                                                                </button>

                                                                <button className='job-delete-btn' data-toggle="modal" title='Delete contact message data...' data-target="#contactMsgdeleteModal" onClick={()=>handleDelete(msg._id)}>
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
                                                    <span className='total-page'>{Math.ceil(contactMsgDetails.length / 10)}</span>
                                                </div>
                                                {((contactMsgDetails.slice(x[0], x[1]).length === 10 && contactMsgDetails.length > x[1])) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
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

                {/* Event view modal here */}
                <div className="modal fade" id="contactMsgviewModal" tabindex="-1" role="dialog" aria-labelledby="contactMsgViewLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client" id="contactMsgViewLabel">
                                    Contact Message Details_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-view-card candidate">
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Full Name</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedViewDetail?.fullName}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Mobile Number</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head">{selectedViewDetail?.phoneNo}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Email</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head">{selectedViewDetail?.email}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Subject</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedViewDetail?.subject}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Message</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head">{selectedViewDetail?.message}</div>
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

                {/* Event delete modal here */}
                {/* <div className="modal fade" id="contactMsgdeleteModal" tabindex="-1" role="dialog" aria-labelledby="contactMsgDeleteLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content recruiter-delete-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title delete" id="contactMsgDeleteLabel">
                                    Warning..!
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-delete-card">
                                    <div className="recruiter-delete-data-area">
                                        <img src="../assets/img/no-data/warning.png" className='recruiter-delete-img' alt="" />
                                        <div className='recruiter-delete-text'>
                                            Are you sure you want to delete this contact data?<br />
                                            <b>You can't undo..!</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                <button type="button" className="btn modal-btn danger">Yes</button>
                                <button type="button" className="btn modal-btn success" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <Footer />
            </div >
        </div >
    )
}

export default ClientContact