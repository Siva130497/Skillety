import React, { useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './AllClients.css';
import './AllClients-responsive.css';
import $ from 'jquery';
import axios from 'axios';

const AllClients = () => {
    const [staffToken, setStaffToken] = useState("");
    const [clientDetail, setClientDetail] = useState([]);
    const [clientWithTempPass, setClientWithTempPass] = useState([]);
    const [emailStatus, setEmailStatus] = useState(true);
    const [emailMsg, setEmailMsg] = useState("");
    const [commonEmails, setCommonEmails] = useState([]);
    const [aClient, setAClient] = useState();

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        $(document).ready(function () {
        });

    }, []);

    const getAllClientDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/client-Detail`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setClientDetail(result.reverse());
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAllClient = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/clientWithUrl-Detail`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setClientWithTempPass(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleCheckForEmailStatus = () => {
        const newCommonEmails = clientDetail
            .filter(obj1 => clientWithTempPass.some(obj2 => obj2.email === obj1.email))
            .map(obj => obj.email);
        setCommonEmails(newCommonEmails);
    }

    useEffect(() => {
        // getAllClientDetails();
        getAllClient();
    }, [staffToken]);

    useEffect(() => {
        if (clientDetail.length > 0 && clientWithTempPass.length > 0) {
            handleCheckForEmailStatus();
        }
    }, [clientDetail, clientWithTempPass]);


    const createClient = async (id) => {
        const userId = { id };
        try {
            const response = await axios.post(`http://localhost:5002/tempPass-Client/${id}`, userId, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);

                // Access emailSent status
                if (result.emailSent) {
                    console.log('Email has been sent successfully.');
                    setEmailStatus(false);
                    setEmailMsg("Email has been sent successfully.")
                } else {
                    console.log('Email sending failed.');
                }
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGeneratePasswordAndTempUrl = (id) => {
        createClient(id);
    };

    const handleCard = (id) => {
        const client = clientDetail.find(cli => cli._id === id)
        setAClient(client);
    }

    console.log(aClient)

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                All Clients
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className='admin-lg-table-area man-app'>
                                            <div className='man-app-title-area'>
                                                <div className="man-app-title">
                                                    All Clients Details
                                                </div>
                                                <div className="man-app-sub-title">
                                                    Total Clients :&nbsp;
                                                    <span>{clientDetail.length}</span>
                                                </div>
                                            </div>
                                            <div className="no-data-created">

                                            </div>
                                            {clientDetail.length === 0 ?
                                                <div className="no-data-created-area">
                                                    <div className='no-data-created'>
                                                        <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                        <div className='no-data-text'>No Client Created Yet..!</div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="table-responsive table-scroll-area">
                                                    <table className="table table-striped table-hover admin-lg-table">
                                                        <tr className='dash-table-row man-app'>
                                                            <th className='dash-table-head'>No.</th>
                                                            <th className='dash-table-head'>Full Name</th>
                                                            <th className='dash-table-head'>Email ID</th>
                                                            <th className='dash-table-head'>Email Status</th>
                                                            <th className='dash-table-head text-center'>Send Email</th>
                                                            <th className='text-center'>View</th>
                                                        </tr>

                                                        {/* table data */}
                                                        {clientDetail.map((client, index) => {
                                                            return (
                                                                <tr className='dash-table-row client'>
                                                                    <td className='dash-table-data1'>{index + 1}.</td>
                                                                    <td className='dash-table-data1'>
                                                                        {client.name}
                                                                    </td>
                                                                    <td className='dash-table-data1'>
                                                                        {client.email}
                                                                    </td>

                                                                    <td className='dash-table-data1'>
                                                                        {/* <span className='text-warning p-0'>
                                                                    <i class="bi bi-exclamation-circle mr-2"></i>
                                                                    Email still not sent!
                                                                </span> */}

                                                                        <span className='text-success p-0'>
                                                                            <i class="bi bi-check-circle mr-2"></i>
                                                                            {commonEmails.includes(client.email) ? "Email already sent" : emailStatus ? "Email still not sent" : emailMsg}
                                                                        </span>
                                                                    </td>

                                                                    <td className='dash-table-data1 text-center'>
                                                                        <button className='send-email-btn' onClick={() => handleGeneratePasswordAndTempUrl(client._id)}>
                                                                            <i class="bi bi-send-fill send-icon"></i>
                                                                            Send
                                                                        </button>
                                                                    </td>

                                                                    <td className='text-center'>
                                                                        <button className='application-btn' title='View Client Details...' data-toggle="modal" data-target="#invoiceModal" onClick={() => handleCard(client._id)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                                                                                    fill='#0879bc' />
                                                                            </svg>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </table>
                                                </div>
                                            }
                                        </div>

                                        <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View More&nbsp;&nbsp;
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

                {/* Invoice view modal here */}
                <div className="modal fade" id="invoiceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client" id="exampleModalLabel">
                                    Client Details_
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
                                            <div className="view-det-sub-head">{aClient?.name}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Mobile Number</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">{aClient?.phone}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Email ID</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">{aClient?.email}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Company Name</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">{aClient?.companyName}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Industry</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">{aClient?.industry}</div>
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
                                            <div className="view-det-sub-head">{aClient?.text}</div>
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

export default AllClients