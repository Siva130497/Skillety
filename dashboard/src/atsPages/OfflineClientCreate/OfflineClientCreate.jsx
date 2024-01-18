import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import ATSLayout from '../../atsComponents/ATSLayout';
import Footer from '../../components/Footer';
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";


const OfflineClientCreate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const [client, setClient] = useState();
    const { getProtectedData } = useContext(AuthContext);
    const [atsToken, setatsToken] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [industryArray, setIndustryArray] = useState([])
    const [selectedIndustry, setSelectedIndustry] = useState([]);
    const [searchIndustryInput, setSearchIndustryInput] = useState("");
    const [filteredIndustry, setFilteredIndustry] = useState([]);
    const [doc, setDoc] = useState();
    const [logo, setLogo] = useState();
    const [logoUrl, setLogoUrl] = useState("");
    const [fileName, setFileName] = useState('');

    const [editingLogo, setEditingLogo] = useState();
    const [editingLogoUrl, setEditingLogoUrl] = useState("");
    const [editingDoc, setEditingDoc] = useState();

    const fileInputRef = useRef(null);
    
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [require, setRequire] = useState(false)
    
    const [IndustryAlert, setIndustryAlert] = useState("");

    const initialCredentials = {
        companyName: "",
        address: "",
        companyWebsite: "",
        contactPerson: "",
        email: "",
        mobile:"",
        headCount:"",
        aboutClient:"",
        GSTNumber:"",
        CINNumber:"",
        paymentCategory:"",
        paymentTerms:false,
    };
    const [credentials, setCredentials] = useState(initialCredentials);
    
    
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
            title: 'Alert',
            text: message,
            icon: 'info',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    useEffect(() => {
        if (logo) {
            setLogoUrl(URL.createObjectURL(logo));

            setFileName(logo.name);
        }
    }, [logo]);

    useEffect(() => {
        if (editingLogo) {
            setEditingLogoUrl(`https://skillety-n6r1.onrender.com/offline_client_logo/${editingLogo?.logo}`);

            setFileName(editingLogo?.logo);
        }
    }, [editingLogo]);

    useEffect(() => {
        if (id && atsToken) {
          axios.get(`https://skillety-n6r1.onrender.com/an-offline-client/${id}`, {
            headers: {
              Authorization: `Bearer ${atsToken}`,
              Accept: 'application/json'
            }
          })
            .then(res => {
              console.log(res.data)
              setClient(res.data)
            })
            .catch(err => {
              console.log(err)
            })

            axios.get(`https://skillety-n6r1.onrender.com/offline-client-doc/${id}`, {
                headers: {
                  Authorization: `Bearer ${atsToken}`,
                  Accept: 'application/json'
                }
              })
                .then(res => {
                    console.log(res.data)
                    setEditingDoc(res.data)
                })
                .catch(err => console.log(err))

            axios.get(`https://skillety-n6r1.onrender.com/an-offline-client-logo/${id}`, {
                    headers: {
                      Authorization: `Bearer ${atsToken}`,
                      Accept: 'application/json'
                    }
                  })
                    .then(res => {
                        console.log(res.data)
                        setEditingLogo(res.data)
                    })
                    .catch(err => console.log(err))
        }
      }, [id, atsToken])
    
      useEffect(() => {
        if (client) {
            console.log(client)
          setSelectedIndustry(client.industry)
          setCredentials({
            ...credentials,
            companyName: client.companyName,
            address: client.address,
            companyWebsite: client.companyWebsite,
            contactPerson: client.contactPerson,
            email: client.email,
            mobile:client.mobile,
            headCount:client.headCount,
            aboutClient:client.aboutClient,
            GSTNumber:client.GSTNumber,
            CINNumber:client.CINNumber,
            paymentCategory:client.paymentCategory,
            paymentTerms:client.paymentTerms,
          })
        }
      }, [client])

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
        }
    }, [atsToken]);

    const registerUser = async (userData) => {
        try {
            const response = await axios.post('https://skillety-n6r1.onrender.com/offline-client-reg', userData, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                  }
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                await new Promise(() => {
                    Swal.fire({
                        title: 'Congratulations!',
                        text: 'Client has been created Successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate("/all-offline-clients")
                    });
                });
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateClient = async (userData) => {
        try {
            const response = await axios.patch(`https://skillety-n6r1.onrender.com/update-exiesting-offline-client/${id}`, userData, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                  }
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                await new Promise(() => {
                    Swal.fire({
                        title: 'Updated!',
                        text: '',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate("/all-offline-clients")
                    });
                });
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllIndustries = async () => {
        try {
            const res = await axios.get("https://skillety-n6r1.onrender.com/industries");
            setIndustryArray(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        function toggleDisabledInputArea() {
            var isChecked = $(this).is(':checked');
            var disabledInputArea = $(this).closest('.job-post-form-group').find('.disabled-input-area');

            if (isChecked) {
                disabledInputArea.slideDown();
            } else {
                disabledInputArea.slideUp();
            }
        }

        $('.toggleDisabledInput').on('change', toggleDisabledInputArea);

        $('.toggleDisabledInput').each(function () {
            toggleDisabledInputArea.call(this);
        });

        getAllIndustries();
        
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setDoc(selectedFile);
    };

    const handleClearFile = () => {
        if(logo){
            setLogoUrl('');
        }else{
            setEditingLogoUrl("");
        }
        setFileName('');
        document.getElementById('customFile').value = '';
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value,
            }));
        
    };

    const handleIndustrySearch = (e) => {
        setIndustryAlert("")
        const inputValue = e.target.value;
        setSearchIndustryInput(inputValue);
        if (inputValue.length > 0) {
            const clientIndustry = industryArray.filter((obj) => {
                return obj.industry.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (clientIndustry.length > 0) {
                setFilteredIndustry(clientIndustry);
            }
        } else {
            setFilteredIndustry([]);
        }
    }

    const handleIndustryClick = (industry) => {
        setSelectedIndustry([industry]);
        setSearchIndustryInput("");
        setFilteredIndustry([]);
    }

    const handleDeselectIndustry = (industry) => {
        setSelectedIndustry(selectedIndustry.filter(selectIndustry => selectIndustry !== industry));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (credentials.companyName === "" || credentials.address === "" || credentials.companyWebsite === "" || !(emailRegex.test(credentials.email)) || selectedIndustry.length === 0 || credentials.contactPerson === "" || credentials.mobile === "" || credentials.headCount === "" || credentials.aboutClient === "" || credentials.GSTNumber === "" || credentials.CINNumber === "" || credentials.paymentCategory === "" || !(credentials.paymentTerms) || !doc || !logo) {
            setRequire(true)
        }else{
                const clientId = uuidv4();

                const formDataDoc = new FormData();
                formDataDoc.append('doc', doc);
                formDataDoc.append('clientId', clientId);

                const formDataLogo = new FormData();
                formDataLogo.append('logo', logo);
                formDataLogo.append('clientId', clientId);

                const updatedCredentials = {
                    ...credentials,
                    industry: selectedIndustry,
                    managerId:employeeId,
                    clientId,
                };
                console.log(updatedCredentials);
                console.log(logo, doc)
            
                axios.post('https://skillety-n6r1.onrender.com/offline-client-doc/upload', formDataDoc, {
                    headers: {
                        Authorization: `Bearer ${atsToken}`,
                        Accept: 'application/json'
                      }
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            
                axios.post('https://skillety-n6r1.onrender.com/offline-client-logo/upload', formDataLogo, {
                        headers: {
                            Authorization: `Bearer ${atsToken}`,
                            Accept: 'application/json'
                          }
                    })
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => console.log(err));  
                
                registerUser(updatedCredentials);
        }
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        
        if (credentials.companyName === "" || credentials.address === "" || credentials.companyWebsite === "" || !(emailRegex.test(credentials.email)) || selectedIndustry.length === 0 || credentials.contactPerson === "" || credentials.mobile === "" || credentials.headCount === "" || credentials.aboutClient === "" || credentials.GSTNumber === "" || credentials.CINNumber === "" || credentials.paymentCategory === "" || !(credentials.paymentTerms) || !doc || !(logo || editingLogo)) {
            setRequire(true)
        }else{
                const updatedCredentials = {
                    ...credentials,
                    industry: selectedIndustry,
                };
                console.log(updatedCredentials);
                if(doc){
                    const formDataDoc = new FormData();
                    formDataDoc.append('doc', doc);
                    axios.patch(`https://skillety-n6r1.onrender.com/update-exiesting-offline-client-doc/${id}`, formDataDoc, {
                    headers: {
                        Authorization: `Bearer ${atsToken}`,
                        Accept: 'application/json'
                      }
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                }
                if(logo){
                    const formDataLogo = new FormData();
                    formDataLogo.append('logo', logo);
                    axios.patch(`https://skillety-n6r1.onrender.com/update-exiesting-offline-client-logo/${id}`, formDataLogo, {
                        headers: {
                            Authorization: `Bearer ${atsToken}`,
                            Accept: 'application/json'
                          }
                    })
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => console.log(err));
                }

                updateClient(updatedCredentials);

        }
    };


    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="post-job-section">
                            <div className="admin-component-name">
                                Create Client
                            </div>
                            <div className="card post-job-card">
                                <div className="post-job-title">Create New Client </div>
                                {/* <div className="post-job-sub-title">Begin from scratch</div> */}


                                <div className="job-post-form-area p-t-40">
                                    <form action="" onSubmit={handleSubmit}>
                                        
                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="first_name" className='job-post-form-label'>Company Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='first_name' 
                                                        name="companyName"
                                                        value={credentials.companyName}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter company name"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.companyName === "" && "required"}</small>}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="email_id" className='job-post-form-label'>Company Website<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='email_id' 
                                                        name="companyWebsite"
                                                        value={credentials.companyWebsite}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter company website"
                                                        required />
                                                </div>
                                                <div className='text-capitalized form-error-message'>
                                                    {require && <small className='text-danger text-capitalized form-error-message'>{credentials.companyWebsite === "" && "required"}</small>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="mobile_number" className='job-post-form-label'>Mobile Number<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='mobile_number' 
                                                        name="mobile"
                                                        value={credentials.mobile}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter mobile number"
                                                        min="0"
                                                        required />
                                                </div>
                                                {/* <div className='validation-msg pt-2'>This field is required.</div> */}
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.mobile === "" && "required"}</small>}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="email_id" className='job-post-form-label'>Email ID<span className='form-required'>*</span></label>
                                                    <input type="email"
                                                        className='job-post-form-input'
                                                        id='email_id' 
                                                        name="email"
                                                        value={credentials.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter e-mail id"
                                                        required />
                                                </div>
                                                <div className='text-capitalized form-error-message'>
                                                    {require && <small className='text-danger'>{credentials.email === "" && "required"}</small>}&nbsp;
                                                     <small className='text-danger text-capitalized'>{(credentials.email && !(emailRegex.test(credentials.email))) && "Enter valid email address"}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6 m-b-35 mb-xl-0">
                                                <div className="job-post-form-group">

                                                    <div className='job-post-form-label-with-badge'>
                                                        <label htmlFor="" className='job-post-form-label'>Industry<span className='form-required'>*</span></label>
                                                        {/* <i class="bi bi-chevron-down"></i> */}
                                                        {selectedIndustry.map(selectIndustry => (
                                                            <span className="job-post-form-badge"
                                                                key={selectIndustry}
                                                                onClick={() => handleDeselectIndustry(selectIndustry)}
                                                            >{selectIndustry}</span>
                                                        ))}
                                                    </div>

                                                    <input type="search" className='job-post-form-input'
                                                        name='searchDesignationInput'
                                                        id='searchDesignationInput'
                                                        value={searchIndustryInput}
                                                        onChange={handleIndustrySearch}
                                                        placeholder='Enter the industry to search here' />

                                                    <div className='search-result-data-area'>
                                                        {filteredIndustry.length > 0 &&
                                                        filteredIndustry.map((filterIndustry) => {
                                                            return <div className='search-result-data' key={filterIndustry._id} onClick={() => handleIndustryClick(filterIndustry.industry)}>
                                                                {filterIndustry.industry}
                                                            </div>
                                                        })
                                                        }
                                                    </div>

                                                    {require && <small className='text-danger text-capitalized'>{selectedIndustry.length === 0 && "required"}</small>}
                                                    <small className='text-danger'>{IndustryAlert}</small>

                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="company" className='job-post-form-label'>Address<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='company' 
                                                        name="address"
                                                        value={credentials.address}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the company address"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.address === "" && "required"}</small>}
                                            </div>
                                        </div>
                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="college_name" className='job-post-form-label'>Head Count<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='college_name' name="headCount"
                                                        value={credentials.headCount}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the head count"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized'>{credentials.headCount === "" && "required"}</small>}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="email_id" className='job-post-form-label'>Contact Person<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='email_id' 
                                                        name="contactPerson"
                                                        value={credentials.contactPerson}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the contact person of that company"
                                                        required />
                                                </div>
                                                <div className='text-capitalized form-error-message'>
                                                    {require && <small className='text-danger text-capitalized form-error-message'>{credentials.contactPerson === "" && "required"}</small>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="college_name" className='job-post-form-label'>GST Number<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='college_name' name="GSTNumber"
                                                        value={credentials.GSTNumber}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the GSTNumber"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized'>{credentials.GSTNumber === "" && "required"}</small>}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="email_id" className='job-post-form-label'>About Client<span className='form-required'>*</span></label>
                                                    <textarea type="text"
                                                        className='job-post-form-input'
                                                        id='email_id' 
                                                        name="aboutClient"
                                                        value={credentials.aboutClient}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the detail of client"
                                                        required />
                                                </div>
                                                <div className='text-capitalized form-error-message'>
                                                    {require && <small className='text-danger text-capitalized form-error-message'>{credentials.aboutClient === "" && "required"}</small>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="college_name" className='job-post-form-label'>CIN Number<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='college_name' name="CINNumber"
                                                        value={credentials.CINNumber}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the CINNumber"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized'>{credentials.CINNumber === "" && "required"}</small>}
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="email_id" className='job-post-form-label'>Client Logo<span className='form-required'>*</span></label>
                                                    {(logoUrl || editingLogoUrl) &&
                                                        <div className="event-preview-area">
                                                            <div className='event-preview-image-area'>
                                                                <img src={logoUrl ? logoUrl : editingLogoUrl} className='event-preview-image' title={`Client logo`} alt={`Client logo`} />
                                                            </div>
                                                            <button id='clear-file' className='clear-image-btn'
                                                                title='Clear the image file...' onClick={handleClearFile}>
                                                                <span>Clear</span>
                                                            </button>
                                                            {/* <p>if you want to change the image of the event change it below</p> */}
                                                        </div>
                                                    }
                                                    <div className="custom-file ats">
                                                        <input type="file" className="custom-file-input ats" id="customFile" name="filename" onChange={e => setLogo(e.target.files[0])} />
                                                        <label className="custom-file-label ats" for="customFile">{fileName || 'Choose logo...'}</label>
                                                    </div>
                                                </div>
                                                <div className='text-capitalized form-error-message'>
                                                {require && <small className='text-danger text-capitalized'>{!(logo||editingLogo) && "required"}</small>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12">
                                                <div className='job-post-form-group'>
                                                    <div className="cand--reg-file-upload-area">
                                                        <input type="file" id="file_upload" 
                                                        accept=".doc,.docx,.pdf,.rtf"
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                            required />
                                                        <label for="file_upload" className='cand--reg-file-upload-label'>
                                                            <i class="bi bi-upload" onClick={() => fileInputRef.current.click()}></i>
                                                            {editingDoc?"Update":"Upload"} Documents (NDA, Agreements etc...)&nbsp;<span className='is-form-required'>*</span></label>
                                                        <span id="file-chosen">{doc?doc?.name : editingDoc?editingDoc.doc : 'No file chosen'}</span>
                                                        <div className='file--upload-text'>Either in .doc/ docx/.pdf format only</div>
                                                    </div>
                                                    {require && <small className='text-danger text-capitalized'>{!(doc||editingDoc) && "required"}</small>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row m-b-35 mt-4">
                                        <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                            <div className="job-post-form-group">
                                            <label htmlFor="college_name" className='job-post-form-label'>Payment Category<span className='form-required'>*</span></label>
                                                <select className='job-post-form-input select-input'
                                                name="paymentCategory"
                                                value={credentials.paymentCategory}
                                                onChange={handleInputChange}>
                                                <option value="" selected disabled>select the payment category mode</option>
                                                <option value="NEFT/RTGS" selected>NEFT/RTGS</option>
                                                <option value="Cheque">Cheque</option>
                                                </select>
                                            </div>
                                            {require && <small className='text-danger text-capitalized'>{credentials.paymentCategory === "" && "required"}</small>}
                                        </div>
                                        </div>
                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12">
                                                <div className='job-post-form-group'>
                                                <label className="cli--login-remember-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={credentials.paymentTerms}
                                                        onChange={() => {
                                                            setCredentials({
                                                                ...credentials,
                                                                paymentTerms: !credentials.paymentTerms
                                                            });
                                                        }}
                                                    />
                                                    <span className="cli--login-remember-checkmark"></span>
                                                    <span>By clicking Agree & Join, you agree to the Skillety
                                                        &nbsp;<a href="" target='_blank'>Payment terms</a>,&nbsp;<a href="" target='_blank'>Privacy Policy</a>
                                                    </span>
                                                </label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="post-job-btn-area">
                                {id ? <button className='post-job-btn' onClick={handleUpdate}>Update</button> : <button className='post-job-btn' onClick={handleSubmit}>Create</button>}
                            </div>
                        </div>
                    </section>
                </div >
                <Footer />
            </div >
        </div >
    )

}

export default OfflineClientCreate