import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './AllClients.css';
import './AllClients-responsive.css';
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AuthContext from '../../context/AuthContext';

const AllClients = () => {
    const { getProtectedData } = useContext(AuthContext);
    const [staffToken, setStaffToken] = useState("");
    const [clientDetail, setClientDetail] = useState([]);
    const [clientUrlWithEmail, setClientUrlWithEmail] = useState([]);
    // const [emailStatus, setEmailStatus] = useState(true);
    // const [emailMsg, setEmailMsg] = useState("");
    const [commonEmails, setCommonEmails] = useState([]);
    const [aClient, setAClient] = useState();

    const [x, setX] = useState([0, 10]);
    const [loading, setLoading] = useState(true);
    const [employeeId, setEmployeeId] = useState("");
    const [role, setRole] = useState("");

    const [isExpanded, setIsExpanded] = useState(false);

    const [selectedColumns, setSelectedColumns] = useState([]);
    let columns = ["Email ID", "Email Status", "Send Email", "Mobile Number", "Company Name", "Industry", "Headcount", "From where did you learn about Skillety?"]

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

        axios.post("https://skillety-n6r1.onrender.com/all-clients-column", columnData, {
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


    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    // useEffect(() => {
    //     ///toggle customize layout
    //     function handlelayoutToggle() {
    //         var expandArea = $(this).closest('.customize-table-layout-area').find('.customize-table-layout-content');

    //         if (expandArea.hasClass('opened')) {
    //             expandArea.slideUp();
    //             expandArea.removeClass('opened');
    //             $(this).removeClass('opened');
    //         } else {
    //             expandArea.slideDown();
    //             expandArea.addClass('opened');
    //             $(this).addClass('opened');
    //         }
    //     }
    //     ////

    //     $('.customize-table-layout-btn').on('click', handlelayoutToggle);

    //     // Cleanup function to remove event listeners when the component unmounts
    //     return () => {
    //         $('.customize-table-layout-btn').off('click', handlelayoutToggle);
    //     };

    // }, [staffToken]);

    const handlelayoutToggle = () => {
        setIsExpanded(prevState => !prevState);
    };

    const getAnIndividualRecruiter = async() => {
        try{
            const res = await axios.get(`https://skillety-n6r1.onrender.com/staff/${employeeId}`, {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setRole(result.companyStaff);
              
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
        }
      }

    useEffect(() => {
        if (staffToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(staffToken);
                    console.log(userData);
                    setEmployeeId(userData.id);
                    // setRole(userData.role);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
        }
    }, [staffToken]);

    useEffect(()=>{
        if(role){
            if(role === "Recruiter"){
                getAllRecruiterClientDetails()
            }else{
                getAllClientDetails();
            }
        }
    },[role])

    useEffect(() => {
        if (employeeId) {
            getAnIndividualRecruiter();
            getAllClientUrlWithEmail();
            axios.get(`https://skillety-n6r1.onrender.com/all-clients-column/${employeeId}`)
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

    const getAllClientDetails = async () => {
        try {

            const response = await axios.get(`https://skillety-n6r1.onrender.com/client-Detail`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setClientDetail(result.reverse());
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }

        } catch (err) {
            console.log(err);

        }
    }

    const getAllRecruiterClientDetails = async () => {
        try {

            const response = await axios.get(`https://skillety-n6r1.onrender.com/recruiter-client-Detail/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setClientDetail(result.reverse());
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

    const getAllClientUrlWithEmail = async () => {
        try {
            const response = await axios.get(`https://skillety-n6r1.onrender.com/clientUrlWithEmail`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setClientUrlWithEmail(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleCheckForEmailStatus = () => {
        const commonEmails = clientDetail
            .filter(obj1 => clientUrlWithEmail.some(obj2 => obj2.email === obj1.email))
            .map(obj => obj.email);

        setCommonEmails(commonEmails);
    }

    console.log(commonEmails)

    useEffect(() => {
        if (clientDetail.length > 0 && clientUrlWithEmail.length > 0) {
            handleCheckForEmailStatus();
        }
    }, [clientDetail, clientUrlWithEmail]);


    const createClient = async (id) => {
        const userId = { id };
        try {
            const response = await axios.post(`https://skillety-n6r1.onrender.com/tempPass-Client/${id}`, userId, {
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
                    showSuccessMessage('Email has been sent successfully.')
                    // setEmailStatus(false);
                    // setEmailMsg("Email has been sent successfully.")
                    getAllClientDetails();
                    getAllClientUrlWithEmail();
                } else {
                    console.log('Email sending failed.');
                    showErrorMessage('Email sending failed.')

                }
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGeneratePasswordAndTempUrl = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send mail!'
        }).then((result) => {
            if (result.isConfirmed) {
                createClient(id);
            }
        });
    };

    const handleCard = (id) => {
        const client = clientDetail.find(cli => cli.id === id)
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
                            <div className='d-flex align-items-end justify-content-between pt-4'>
                                <div className="admin-component-name pt-0">
                                    All Clients
                                </div>
                                <div className="create-btn-area">
                                    <a
                                        href="/create-client"
                                        className='btn creat-data-btn'
                                        title='Create new client...'
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
                                                <div className='man-app-title-area'>
                                                    <div className="man-app-title">
                                                        All Clients Details
                                                    </div>
                                                    <div className="man-app-sub-title">
                                                        Total Clients :&nbsp;
                                                        <span>{clientDetail.length}</span>
                                                    </div>
                                                    <div className='customize-table-layout-area'>
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
                                                                {columns.map(column => {
                                                                    if (selectedColumns?.includes(column)) {
                                                                        return (
                                                                            <th className='dash-table-head text-left'>{column}</th>
                                                                        )
                                                                    }
                                                                })}
                                                                <th className='dash-table-head text-center'>View</th>
                                                            </tr>

                                                            {/* table data */}
                                                            {clientDetail.slice(x[0], x[1]).map((client, index) => {
                                                                return (
                                                                    <tr className='dash-table-row client'>
                                                                        <td className='dash-table-data1'>{index + 1}.</td>
                                                                        <td className='dash-table-data1 text-capitalized'>
                                                                            {client.name}
                                                                        </td>
                                                                        {selectedColumns?.includes("Email ID") && <td className='dash-table-data1'>
                                                                            <a href={`mailto:${client.email}`}
                                                                                className='dash-table-data1 link is-link p-0'>
                                                                                {client.email}
                                                                            </a>
                                                                        </td>}
                                                                        {selectedColumns?.includes("Email Status") && <td className='dash-table-data1'>
                                                                            {/* <span className='text-warning p-0'>
                                                                    <i class="bi bi-exclamation-circle mr-2"></i>
                                                                    Email still not sent!
                                                                </span> */}
                                                                            {commonEmails.includes(client.email) ?
                                                                                <span className='text-success p-0'>
                                                                                    <i class="bi bi-check-circle mr-2"></i>
                                                                                    Email sent.
                                                                                </span> :
                                                                                <span className='text-warning p-0'>
                                                                                    <i class="bi bi-exclamation-circle mr-2"></i>
                                                                                    Email not yet sent.
                                                                                </span>
                                                                            }
                                                                        </td>}
                                                                        {selectedColumns?.includes("Send Email") && <td className='dash-table-data1 text-left'>
                                                                            <button className='send-email-btn' onClick={() => handleGeneratePasswordAndTempUrl(client.id)}>
                                                                                <i class="bi bi-send-fill send-icon"></i>
                                                                                {commonEmails.includes(client.email) ? "ReSend" : "Send"}
                                                                            </button>
                                                                        </td>}
                                                                        {selectedColumns?.includes("Mobile Number") &&
                                                                            <td className='dash-table-data1 text-left'>
                                                                                <a href={`tel:${client.phone}`}
                                                                                    className='dash-table-data1 link is-link p-0'>
                                                                                    {client.phone}
                                                                                </a>
                                                                            </td>}
                                                                        {selectedColumns?.includes("Company Name") && <td className='dash-table-data1 text-left'>
                                                                            {client.companyName}                                </td>}
                                                                        {selectedColumns?.includes("Industry") && <td className='dash-table-data1 text-left'>
                                                                            {client.industry}                                   </td>}
                                                                        {selectedColumns?.includes("Headcount") && <td className='dash-table-data1 text-left'>
                                                                            {client.count}                                      </td>}
                                                                        {selectedColumns?.includes("From where did you learn about Skillety?") && <td className='dash-table-data1 text-left'>
                                                                            {client.text}                                       </td>}
                                                                        <td className='text-center'>
                                                                            <div className="action-btn-area">
                                                                                <button className='job-view-btn' title='View Client Details...' data-toggle="modal" data-target="#clientsViewModal" onClick={() => handleCard(client.id)}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
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
                                                        <span className='total-page'>{Math.ceil(clientDetail.length / 10)}</span>
                                                    </div>
                                                    {(clientDetail.slice(x[0], x[1]).length === 10 && clientDetail.length > x[1]) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
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

                {/* Clients details view modal here */}
                <div className="modal fade" id="clientsViewModal" tabindex="-1" role="dialog" aria-labelledby="clientsViewModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client" id="clientsViewModalLabel">
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
                                            <div className="view-det-sub-head text-capitalized">{aClient?.name}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Mobile Number</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">
                                                <a href={`tel:${aClient?.phone}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {aClient?.phone}
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
                                                <a href={`mailto:${aClient?.email}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {aClient?.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Company Name</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.companyName}</div>
                                        </div>
                                    </div>
                                    <hr />
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