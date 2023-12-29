import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './CreateCandidate.css';
import './CreateCandidate-responsive.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '../../context/AuthContext';


const CreateClient = () => {
    const { getProtectedData } = useContext(AuthContext);
    const [staffToken, setStaffToken] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [industryArray, setIndustryArray] = useState([])
    const [selectedIndustry, setSelectedIndustry] = useState([]);
    const [searchIndustryInput, setSearchIndustryInput] = useState("");
    const [filteredIndustry, setFilteredIndustry] = useState([]);
    
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [require, setRequire] = useState(false)
    
    const [IndustryAlert, setIndustryAlert] = useState("");

    const initialCredentials = {
        name: "",
        phone: "",
        email: "",
        companyName: "",
        count: "",
        text:"Client Created by ats",
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
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        if (staffToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(staffToken);
                    console.log(userData);
                    setEmployeeId(userData.id);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
        }
    }, [staffToken]);

    const registerUser = async (userData) => {
        try {
            const response = await axios.post('https://skillety.onrender.com/register-Client', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                await new Promise(() => {
                    Swal.fire({
                        title: 'Congratulations!',
                        text: 'Email has sent to created client.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        setCredentials(initialCredentials);
                        setSelectedIndustry([]);
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
            const res = await axios.get("https://skillety.onrender.com/industries");
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
        
        if (credentials.name === "" || credentials.phone === "" || credentials.email === "" || !(emailRegex.test(credentials.email)) || selectedIndustry.length === 0 || credentials.companyName === "" || credentials.count === "") {
            setRequire(true)
        }else{
                const updatedCredentials = {
                    ...credentials,
                    industry: selectedIndustry[0],
                    recruiterId:employeeId,
                };
                console.log(updatedCredentials);
                registerUser(updatedCredentials);
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
                                                    <label htmlFor="first_name" className='job-post-form-label'>Full Name<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='first_name' 
                                                        name="name"
                                                        value={credentials.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your first name"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.name === "" && "required"}</small>}
                                            </div>
                                        </div>

                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-6 m-b-35 mb-sm-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="mobile_number" className='job-post-form-label'>Mobile Number<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='mobile_number' 
                                                        name="phone"
                                                        value={credentials.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter mobile number"
                                                        min="0"
                                                        required />
                                                </div>
                                                {/* <div className='validation-msg pt-2'>This field is required.</div> */}
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.phone === "" && "required"}</small>}
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
                                                    <label htmlFor="company" className='job-post-form-label'>Current Company<span className='form-required'>*</span></label>
                                                    <input type="text"
                                                        className='job-post-form-input'
                                                        id='company' 
                                                        name="companyName"
                                                        value={credentials.companyName}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the current company"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized form-error-message'>{credentials.companyName === "" && "required"}</small>}
                                            </div>
                                        </div>
                                        <div className="row m-b-35 mt-4">
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="college_name" className='job-post-form-label'>Head Count<span className='form-required'>*</span></label>
                                                    <input type="number"
                                                        className='job-post-form-input'
                                                        id='college_name' name="count"
                                                        value={credentials.count}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the head count"
                                                        required />
                                                </div>
                                                {require && <small className='text-danger text-capitalized'>{credentials.count === "" && "required"}</small>}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="post-job-btn-area">
                                <button className='post-job-btn' onClick={handleSubmit}>Create</button>
                            </div>
                        </div>
                    </section>
                </div >
                <Footer />
            </div >
        </div >
    )

}

export default CreateClient