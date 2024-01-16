import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../atsComponents/ATSLayout';
import Footer from '../../components/Footer';
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AllOfflineClients = () => {
    const navigate = useNavigate();
    const { getProtectedData } = useContext(AuthContext);
    const [atsToken, setatsToken] = useState("");
    const [clientDetail, setClientDetail] = useState([]);
    const [activeJobs, setActiveJobs] = useState([]);
    const [inActiveJobs, setInActiveJobs] = useState([]);
    const [aClient, setAClient] = useState();

    const [x, setX] = useState([0, 10]);
    const [loading, setLoading] = useState(true);
    const [employeeId, setEmployeeId] = useState("");

    const [isExpanded, setIsExpanded] = useState(false);

    const [selectedColumns, setSelectedColumns] = useState([]);
    let columns = ["Company Website", "Mobile Number", "Email ID", "Industry", "Address", "Head Count", "Contact Person", "GST Number", "About Client", "CIN Number", "Documents (NDA, Agreements etc...)", "Payment Category", "Active Jobs", "In-Active Jobs"]

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientDocUrl, setClientDocUrl] = useState("");

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterData(term);
    };

    const filterData = (term) => {
        const filteredArray = clientDetail.filter((item) => {
            const lowerCaseTerm = term.toLowerCase();
            return Object.values(item)
                .map((value) => (value || '').toString().toLowerCase())
                .some((value) => value.includes(lowerCaseTerm));
        });
        setFilteredData(filteredArray);
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

        axios.post("https://skillety-n6r1.onrender.com/all-offline-clients-column", columnData, {
            headers: {
                Authorization: `Bearer ${atsToken}`,
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
        setatsToken(JSON.parse(localStorage.getItem('atsToken')))
    }, [atsToken])

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

    // }, [atsToken]);

    const handlelayoutToggle = () => {
        setIsExpanded(prevState => !prevState);
    };

    useEffect(() => {
        if (atsToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(atsToken);
                    console.log(userData);
                    setEmployeeId(userData.id);
                    // setRole(userData.role);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
            getAllClientDetails();
            
        }
    }, [atsToken]);

    useEffect(() => {
        if (employeeId) {

            getAllActiveJobs();
            getAllInActiveJobs();
           
            axios.get(`https://skillety-n6r1.onrender.com/all-offline-clients-column/${employeeId}`)
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

    const getAllActiveJobs = async () => {
        try {

            const response = await axios.get(`https://skillety-n6r1.onrender.com/ats-active-jobs/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setActiveJobs(result);

            } else {
                console.log(result);

            }

        } catch (err) {
            console.log(err);

        }
    }

    const getAllInActiveJobs = async () => {
        try {

            const response = await axios.get(`https://skillety-n6r1.onrender.com/my-posted-jobs/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setInActiveJobs(result);

            } else {
                console.log(result);

            }

        } catch (err) {
            console.log(err);

        }
    }

    const getAllClientDetails = async () => {
        try {

            const response = await axios.get(`https://skillety-n6r1.onrender.com/offline-client-Details`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setClientDetail(result.reverse());
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
        const client = filteredData.find(cli => cli.clientId === id)
        setAClient(client);
    }

    const handleViewDOC = (fileUrl) => {
        setClientDocUrl(fileUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        // setCandidateResumeUrl(null);
        setIsModalOpen(false);
    };

    const handleDeleteClient = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete Client!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`https://skillety-n6r1.onrender.com/delete-exiesting-offline-client/${id}`, {
                    headers: {
                        Authorization: `Bearer ${atsToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        console.log(res.data);
                        showSuccessMessage("Client has been deleted!");
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                        showErrorMessage();
                    });
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
                            <div className='d-flex align-items-end justify-content-between pt-4'>
                                <div className="admin-component-name pt-0">
                                    All Clients
                                </div>
                                <div className="create-btn-area">
                                    <a
                                        href="/offline-client-create"
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
                                                <div className='man-app-title-area candidate'>
                                                    <div>
                                                        <div className="man-app-title">
                                                            All Clients Details
                                                        </div>
                                                        <div className="man-app-sub-title">
                                                            Total Clients :&nbsp;
                                                            <span>{filteredData.length}</span>
                                                        </div>
                                                    </div>
                                                    <div className="recruiter-search-input-area">
                                                        <input type="search" className='recruiter-search-input' placeholder='Search...'
                                                            value={searchTerm}
                                                            onChange={handleInputChange}
                                                        />
                                                        <i className='bi bi-search search-icon'></i>
                                                        <button className='recruiter-search-btn'>Search</button>
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
                                                {filteredData.length === 0 ?
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
                                                                <th className='dash-table-head'>Company Name</th>
                                                                {columns.map(column => {
                                                                    if (selectedColumns?.includes(column)) {
                                                                        return (
                                                                            <th className='dash-table-head text-left'>{column}</th>
                                                                        )
                                                                    }
                                                                })}
                                                                <th className='dash-table-head text-center'>Action</th>
                                                            </tr>

                                                            {/* table data */}
                                                            {filteredData.slice(x[0], x[1]).map((client, index) => {
                                                            
                                                                const ActJobs = activeJobs.filter(job => job.clientId === client.clientId)
                                                                const updatedActJobs = ActJobs?.map(job => ({ ...job, active: true }));
                                                                const InActJobs = inActiveJobs.filter(job => job.clientId === client.clientId);
                                                                
                                                                const clientLogo  = (client?.clientLogo) ? `https://skillety-n6r1.onrender.com/offline_client_logo/${client?.clientLogo}` : "../assets/img/talents-images/avatar.jpg"
                                                                return (
                                                                    <tr className='dash-table-row client'>
                                                                        <td className='dash-table-data1'>{index + 1}.</td>
                                                                        <td className='dash-table-data1 text-capitalized'>
                                                                            <img src={clientLogo} className='dash-table-avatar-img' alt="" />
                                                                            {client.companyName}
                                                                        </td>
                                                                
                                                                        {selectedColumns?.includes("Company Website") && <td className='dash-table-data1 text-left'>
                                                                            <a href={`${client?.companyWebsite}`}
                                                                                className='view-det-sub-head link is-link'
                                                                                target='_blank'>
                                                                                {client?.companyWebsite}
                                                                            </a>                                </td>}                                                               {selectedColumns?.includes("Mobile Number") &&
                                                                            <td className='dash-table-data1 text-left'>
                                                                                <a href={`tel:${client.mobile}`}
                                                                                    className='dash-table-data1 link is-link p-0'>
                                                                                    {client.mobile}
                                                                                </a>
                                                                            </td>}
                                                                            {selectedColumns?.includes("Email ID") && <td className='dash-table-data1'>
                                                                            <a href={`mailto:${client.email}`}
                                                                                className='dash-table-data1 link is-link p-0'>
                                                                                {client.email}
                                                                            </a>
                                                                        </td>}
      
                                                                        {selectedColumns?.includes("Industry") && <td className='dash-table-data1 text-left'>
                                                                            {client.industry}                                   </td>}
                                                                        {selectedColumns?.includes("Address") && <td className='dash-table-data1 text-left'>
                                                                            {client.address}                                      </td>}
                                                                        {selectedColumns?.includes("Head Count") && <td className='dash-table-data1 text-left'>
                                                                            {client.headCount}                                       </td>}
                                                                            {selectedColumns?.includes("Contact Person") && <td className='dash-table-data1 text-left'>
                                                                            {client.contactPerson}                                      </td>}
                                                                            {selectedColumns?.includes("GST Number") && <td className='dash-table-data1 text-left'>
                                                                            {client.GSTNumber}                                      </td>}
                                                                            {selectedColumns?.includes("About Client") && <td className='dash-table-data1 text-left'>
                                                                            {client.aboutClient}                                      </td>}
                                                                            {selectedColumns?.includes("CIN Number") && <td className='dash-table-data1 text-left'>
                                                                            {client.CINNumber}                                      </td>}
                                                                            {selectedColumns?.includes("Documents (NDA, Agreements etc...)") && <td className='dash-table-data1 text-left'>
                                                                            <button className='application-btn with-modal' onClick={() => handleViewDOC(`https://skillety-n6r1.onrender.com/offline_client_doc/${client?.clientDoc}`)}>
                                                                                        <span></span>&nbsp;&nbsp;&nbsp;
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" fill='#0879bc' />
                                                                                        </svg>
                                                                                    </button>                                      </td>}
                                                                            {selectedColumns?.includes("Payment Category") && <td className='dash-table-data1 text-left'>
                                                                            {client.paymentCategory}                                      </td>}
                                                                        {selectedColumns?.includes("Active Jobs") && <td className='dash-table-data1 text-left'>
                                                                        <button className='application-btn with-modal' onClick={() => updatedActJobs?.length > 0 && navigate(`/all-ats-jobs`, { state: { jobs: updatedActJobs } })}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-briefcase-fill" viewBox="0 0 16 16">
                                                                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5" fill='#0879bc' />
                                                                                    <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z" fill='#0879bc' />
                                                                                </svg>
                                                                                &nbsp;&nbsp;&nbsp;
                                                                                <span>{updatedActJobs?.length}</span>
                                                                            </button>
                                                                        </td>}
                                                                        {selectedColumns?.includes("In-Active Jobs") && <td className='dash-table-data1 text-left'>
                                                                            <button className='application-btn with-modal' onClick={() => InActJobs?.length > 0 && navigate(`/all-ats-jobs`, { state: { jobs: InActJobs } })}>
                                                                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
                                                                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" fill='#0879bc' />
                                                                                </svg>
                                                                                &nbsp;&nbsp;&nbsp;
                                                                                <span>{InActJobs?.length}</span>
                                                                            </button>
                                                                                </td>}
                                                                        <td className='text-center'>
                                                                            <div className="action-btn-area">
                                                                                <button className='job-view-btn' title='View Client Details...' data-toggle="modal" data-target="#clientsViewModal" onClick={() => handleCard(client.clientId)}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                    </svg>
                                                                                </button>
                                                                                <button className='job-edit-btn' title='Edit client details...' onClick={() => navigate(`/offline-client-create`, { state: { id: client.clientId } })}
                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                    </svg>
                                                                                </button>
                                                                                <button className='job-delete-btn' title='Delete client data...' onClick={() => handleDeleteClient(client.clientId)}
                                                                         >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                    </svg>
                                                                                </button>
                                                                                <button className='job-edit-btn' title='Post job for client...' onClick={() => navigate(`/job-posting-ats`, { state: { id: client.clientId } })}
                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                                                                                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"/>
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
                                            <div className="view-det-head">Company Name</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.companyName}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Company Website</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized"><a href={`${aClient?.companyWebsite}`}
                                                className='view-det-sub-head link is-link'
                                                target='_blank'>
                                                {aClient?.companyWebsite}
                                            </a></div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Mobile Number</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">
                                                <a href={`tel:${aClient?.mobile}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {aClient?.mobile}
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
                                            <div className="view-det-head">Address</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.address}</div>
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
                                            <div className="view-det-head">Head Count</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head">{aClient?.headCount}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Contact Person</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.contactPerson}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">GST Number</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.GSTNumber}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">About Client</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.aboutClient}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">CIN Number</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.CINNumber}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-head">Payment Category</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="view-det-sub-head text-capitalized">{aClient?.paymentCategory}</div>
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

                    {clientDocUrl && (
                        <DocViewer
                            documents={[{ uri: clientDocUrl }]}
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

export default AllOfflineClients