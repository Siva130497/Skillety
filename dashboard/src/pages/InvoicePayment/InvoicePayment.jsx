import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import './InvoicePayment.css';
import './InvoicePayment-responsive.css';
import $ from 'jquery';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoicePayment = () => {
    const [clientToken, setClientToken] = useState("");
    const { getProtectedData } = useContext(AuthContext);

    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState();
    const [viewedCandidate, setViewedCandidate] = useState([]);
    // const [postedJobs, setPostedJobs] = useState([]);
    const [allStaff, setAllStaff] = useState([]);

    const [invoice, setInvoice] = useState([]);

    const [loading, setLoading] = useState(true);

    const [allPackageBought, setAllPackageBought] = useState([]);
    const [individualPackageDetail, setIndividualPackageDetail] = useState();

    useEffect(() => {
        const calculateInvoice = () => {
            const cvViews = individualPackageDetail?.cvViews || individualPackageDetail?.quantities?.cvViews || 0;
            const usedViews = cvViews-(individualPackageDetail?.cvViewsRemaining || individualPackageDetail?.remainings?.cvViews || 0);
            const balanceViews = individualPackageDetail?.cvViewsRemaining || individualPackageDetail?.remainings?.cvViews || 0;

            const loginIDs = individualPackageDetail?.logins || individualPackageDetail?.quantities?.logins || 0;
            const usedLoginIDs = loginIDs-(individualPackageDetail?.loginsRemaining || individualPackageDetail?.remainings?.logins || 0);
            const balanceLoginIDs = individualPackageDetail?.loginsRemaining || individualPackageDetail?.remainings?.logins || 0;

            const jobPostings = individualPackageDetail?.activeJobs || individualPackageDetail?.quantities?.activeJobs || 0;
            const usedJobPostings = jobPostings-(individualPackageDetail?.activeJobsRemaining || individualPackageDetail?.remainings?.activeJobs || 0);
            const balanceJobPostings = individualPackageDetail?.activeJobsRemaining || individualPackageDetail?.remainings?.activeJobs || 0;

            setInvoice([
                ['Cv Views', usedViews, balanceViews],
                ['Login IDs', usedLoginIDs, balanceLoginIDs],
                ['Job Postings', usedJobPostings, balanceJobPostings]
            ]);
        };

        calculateInvoice();
    }, [individualPackageDetail]);

    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = ['Detail', 'Used', 'Balance'];
        const tableRows = [];


        tableRows.push(...invoice);

        doc.autoTable({ startY: 20, head: [tableColumn], body: tableRows });

        const date = new Date();
        const dateStr =
            date.getFullYear() +
            ('0' + (date.getMonth() + 1)).slice(-2) +
            ('0' + date.getDate()).slice(-2) +
            '_' +
            ('0' + date.getHours()).slice(-2) +
            ('0' + date.getMinutes()).slice(-2) +
            ('0' + date.getSeconds()).slice(-2);

        doc.save(`invoice_${dateStr}.pdf`);
    };

    useEffect(() => {
        $(document).ready(function () {
        });

    }, []);

    useEffect(() => {
        setClientToken(JSON.parse(localStorage.getItem("clientToken")))
    }, [clientToken])

    const getLoginClientDetail = async () => {
        try {
           
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

            
        } catch (err) {
            console.log(err);

            
        }
    }

    const getViewedCandidates = async () => {
        try {
         
            const res = await axios.get(`https://skillety-n6r1.onrender.com/cv-views/${loginClientDetail?.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setViewedCandidate(result);
            } else {
                console.log(result);
            }

          
        } catch (err) {
            console.log(err);

            
        }
    }

    // const getOwnPostedjobs = async () => {
    //     try {
    //         const res = await axios.get(`https://skillety-n6r1.onrender.com/my-posted-jobs/${loginClientDetail?.companyId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${clientToken}`,
    //                 Accept: 'application/json'
    //             }
    //         });
    //         const result = res.data;
    //         if (!result.error) {
    //             console.log(result);
    //             setPostedJobs(result.reverse());
    //         } else {
    //             console.log(result);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const allStaffFromCompany = async () => {
        try {
            
            const res = await axios.get(`https://skillety-n6r1.onrender.com/all-staff/${loginClientDetail?.companyId}`, {
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
        if (clientToken) {
            const fetchData = async () => {
                try {
                   
                    const user = await getProtectedData(clientToken);
                    console.log(user);
                    setEmployeeId(user.id || user.uid);

                    
                } catch (error) {
                    console.log(error);
                    window.location.href = 'https://skillety-frontend-wcth.onrender.com/client-login'
                   
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
        if (loginClientDetail?.companyId) {
            axios.get(`https://skillety-n6r1.onrender.com/client-all-package-plans/${loginClientDetail?.companyId}`,{
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            }).then(res=>{
                console.log(res.data);
                const sortedData = res.data.sort((a, b) => {
                    // Convert dates to milliseconds and compare
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setAllPackageBought(sortedData);
                setLoading(false);
            }).catch(err=>{
                console.log(err)
                setLoading(false);
            })
            getViewedCandidates();
            // getOwnPostedjobs();
            allStaffFromCompany();
        }
    }, [loginClientDetail]);

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ClientLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Invoices
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
                                            <div className="table-responsive admin-lg-table-area man-app">
                                                <div className='man-app-title-area'>
                                                    <div className="man-app-title">
                                                        Invoice History
                                                    </div>
                                                    <div className="man-app-sub-title">
                                                        Check your payment history here
                                                    </div>
                                                </div>
                                                {allPackageBought.length>0 ?
                                                    <table className="table table-striped table-hover admin-lg-table">
                                                        <tr className='dash-table-row man-app'>
                                                            <th className='dash-table-head text-left'>Sr.no</th>
                                                            <th className='dash-table-head text-center'>Package Name</th>
                                                            <th className='dash-table-head text-center'>Date of Purchase</th>
                                                            <th className='dash-table-head text-center'>Validity </th>
                                                            <th className='dash-table-head text-center'>Invoice Amount</th>
                                                            <th className='text-left'>View</th>
                                                        </tr>

                                                        {/* table data */}
                                                        {allPackageBought.map((pack, index)=>{
                                                            return (
                                                                <tr className='dash-table-row client'
                                                                key={pack._id}>
                                                                    <td className='dash-table-data1 text-left'>{index+1}.</td>
                                                                    <td className='dash-table-data1 text-center'>
                                                                        {pack?.packageType || "DIY"}
                                                                    </td>
                                                                    {/* <td className='dash-table-data1 text-center'>
                                                                        {`${new Date(pack?.createdAt).getDate().toString().padStart(2, '0')}/${(new Date(pack?.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(pack?.createdAt).getFullYear() % 100}`}
                                                                    </td> */}
                                                                    <td className='dash-table-data1 text-center'>
                                                                        {pack?.boughtDate}
                                                                    </td>

                                                                    <td className='dash-table-data1 text-center'>
                                                                        {pack.validity} {pack?.serviceNames ? "months" : "days"}
                                                                    </td>

                                                                    <td className='dash-table-data1 text-center'>
                                                                        Rs.&nbsp;<span>{pack?.amount || "INR "+pack?.finalAmount}/-</span>
                                                                    </td>

                                                                    <td className='text-left'>
                                                                        <div className="action-btn-area">
                                                                            <button className='job-view-btn' data-toggle="modal" data-target="#invoiceModal"
                                                                            onClick={()=>setIndividualPackageDetail(pack)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                                                                                    />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}

                                                    </table> :
                                                    <div className="no-data-created-area">
                                                        <div className='no-data-created'>
                                                            <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                            <div className='no-data-text'>No Packages Yet..!</div>
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
                                            {/* <div className="table-pagination-area pt-3">
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
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </section>
                </div>

                {/* Invoice view modal here */}
                <div className="modal fade" id="invoiceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content invoice-modal">
                            <div className="modal-header invoive-modal-header">
                                <h5 className="modal-title invoive-modal-title" id="exampleModalLabel">Invoice Detail</h5>
                                <a href='#' type="button" className="close modal-close-btn" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive invoice-table-area">
                                            <table className='table table-hover invoice-table'>
                                                <thead>
                                                    <tr className='row-of-table-head'>
                                                        <th className='table--head text-left'></th>
                                                        <th className='table--head text-center'>Used</th>
                                                        <th className='table--head text-center'>Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='row-of-table-row'>
                                                        <th className='table--head'>CV Views</th>
                                                        <td className='table--data text-center'>{individualPackageDetail?.cvViews || individualPackageDetail?.quantities?.cvViews || 0}</td>
                                                        <td className='table--data text-center'>{individualPackageDetail?.cvViewsRemaining || individualPackageDetail?.remainings?.cvViews || 0}</td>
                                                    </tr>
                                                    <tr className='row-of-table-row'>
                                                        <th className='table--head'>Login IDs</th>
                                                        <td className='table--data text-center'>{individualPackageDetail?.logins || individualPackageDetail?.quantities?.logins || 0}</td>
                                                        <td className='table--data text-center'>{individualPackageDetail?.loginsRemaining || individualPackageDetail?.remainings?.logins || 0}</td>
                                                    </tr>
                                                    <tr className='row-of-table-row'>
                                                        <th className='table--head'>Job Postings</th>
                                                        <td className='table--data text-center'>{individualPackageDetail?.activeJobs || individualPackageDetail?.quantities?.activeJobs || 0}</td>
                                                        <td className='table--data text-center'>{individualPackageDetail?.activeJobsRemaining || individualPackageDetail?.remainings?.activeJobs || 0}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer invoive-modal-footer bg-whitesmoke br">
                                <button className="btn invoice-download-btn" onClick={generatePDF}>
                                    <i class="bi bi-download mr-2"></i>
                                    Download Invoice
                                </button>
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

export default InvoicePayment