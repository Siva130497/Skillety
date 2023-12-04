import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import $ from 'jquery';
import './ClientRegister.css';
import './ClientRegister-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import GoogleAuth from '../../components/GoogleAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const ClientRegister = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const [isAgreed, setIsAgreed] = useState(false);
    const initialCredentials = {
        name: "",
        phone: "",
        email: "",
        companyName: "",
        count: "",
        text: "",
    }
    const [credentials, setcredentials] = useState(initialCredentials)
    const [industryArray, setIndustryArray] = useState([]);
    const [searchIndustryInput, setSearchIndustryInput] = useState("");
    const [filteredIndustry, setFilteredindustry] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState([]);

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const [require, setRequire] = useState(false)

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

    const getAllIndustry = async () => {
        try {
            const res = await axios.get("https://skillety.onrender.com/industries", {
                headers: {
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setIndustryArray(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllIndustry();
    }, [])

    useEffect(() => {
        setcredentials((prevCredentials) => ({
            ...prevCredentials,
            name: profile.name ? profile.name : "",
            email: profile.email ? profile.email : "",
        }));
    }, [profile]);

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
                        text: 'Your details have been sent for verification. After the verification process is complete, we will contact you through your email.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        setcredentials(initialCredentials);
                    });
                });
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleIndustrySearch = (e) => {
        const inputValue = e.target.value;
        setSearchIndustryInput(inputValue);
        if (inputValue.length > 0) {
            const industries = industryArray.filter((obj) => {
                return obj.industry.toLowerCase().includes(inputValue.toLowerCase());
            });
            if (industries.length > 0) {
                setFilteredindustry(industries);
            }
        } else {
            setFilteredindustry([]);
        }
    };

    const handleIndustryClick = (industry) => {
        setSelectedIndustry([industry]);
        setSearchIndustryInput("");
        setFilteredindustry([]);
    }

    const handleDeselectIndustry = (industry) => {
        setSelectedIndustry(selectedIndustry.filter(selectIndustry => selectIndustry !== industry));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (
            credentials.name &&
            credentials.companyName &&
            credentials.count &&
            credentials.email &&
            credentials.phone &&
            credentials.text &&
            selectedIndustry.length > 0 &&
            emailRegex.test(credentials.email) &&
            isAgreed
        ) {
           
                const updatedCredentials = {
                    ...credentials,
                    industry: selectedIndustry[0],
                };
                console.log(updatedCredentials);
                registerUser(updatedCredentials);
            
        } 
        
    };

    useEffect(() => {
        $('.sel').each(function () {
            $(this).children('select').css('display', 'none');

            var $current = $(this);

            $(this).find('option').each(function (i) {
                if (i === 0) {
                    $current.prepend($('<div>', {
                        class: $current.attr('class').replace(/sel/g, 'sel__box')
                    }));

                    var placeholder = $(this).text();
                    $current.prepend($('<span>', {
                        class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
                        text: placeholder,
                        'data-placeholder': placeholder
                    }));

                    return;
                }

                $current.children('div').append($('<span>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                    text: $(this).text()
                }));
            });
        });

        // Toggling the `.active` state on the `.sel`.
        $('.sel').click(function () {
            $(this).toggleClass('active');
        });

        // Toggling the `.selected` state on the options.
        $('.sel__box__options').click(function () {
            var txt = $(this).text();
            var index = $(this).index();

            $(this).siblings('.sel__box__options').removeClass('selected');
            $(this).addClass('selected');

            var $currentSel = $(this).closest('.sel');
            $currentSel.children('.sel__placeholder').text(txt);
            $currentSel.children('select').prop('selectedIndex', index + 1);
        });
    }, []);

    return (
        <div>
            <Layout />
            <div className='client-register-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="custom--container">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Registration Form</p>
                                </div>
                            </div>

                            <div className="cli--reg-heading-area">
                                <h3 className='cli--reg-heading' data-aos="fade-left">Hi, Welcome to <span>SKILLETY!!!</span></h3>
                                <h4 className='cli--reg-sub-heading' data-aos="fade-left">The exclusive Job Board for Immediate Joiners.</h4>
                            </div>

                            <div className='cli--reg-grab-area'>
                                <h5 className="cli--reg-grab" data-aos="fade-up">Grab your free DEMO in just a few seconds!</h5>
                            </div>

                            <div className='login--with-g-area'>
                                <GoogleAuth setProfile={setProfile} />
                            </div>

                            <div className="cli--reg-form-area">
                                <div className="con--note-form-area" data-aos="fade-up">
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                                <div className='reg--form-group custom'>
                                                    <input type="text" id='full_name' name="name" value={credentials.name} onChange={handleInputChange} placeholder="Enter your full name" className='reg--form-input' required />
                                                    <label htmlFor="full_name" className='reg--form-label'>Your Full Name</label>
                                                    <small className='text-danger'>{credentials.name === "" && "required"}</small>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                                <div className='reg--form-group'>
                                                    <input type="email" id='email' name="email" value={credentials.email} onChange={handleInputChange} placeholder="Enter your email address" className='reg--form-input' required />
                                                    <label htmlFor="email" className='reg--form-label'>Email ID</label>
                                                    {require && <small className='text-danger'>{credentials.email === "" && "required"}</small>}
                                                    <br/>
                                                   <small className='text-danger'>{!(emailRegex.test(credentials.email)) && "enter valid email address"}</small>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                                <div className='reg--form-group'>
                                                    <input type="number" id='phone_no' name="phone" value={credentials.phone} onChange={handleInputChange} placeholder="Enter your mobile number" className='reg--form-input' required />
                                                    <label htmlFor="phone_no" className='reg--form-label'>Mobile Number</label>
                                                    <small className='text-danger'>{credentials.phone === "" && "required"}</small>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='subject' name="companyName" value={credentials.companyName} onChange={handleInputChange} placeholder="Enter the company name" className='reg--form-input' required />
                                                    <label htmlFor="subject" className='reg--form-label'>Company Name</label>
                                                     <small className='text-danger'>{credentials.companyName === "" && "required"}</small>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-8 col-sm-8 custom-padding-right1">
                                                {/* <div className='reg--form-group' data-aos="fade-up">
                                                    <div className="custom--select-area">
                                                        <label htmlFor="" className='custom--select-label'>Industry</label>
                                                        <select name="" id="" className="custom--select-input">
                                                            <option value="">Option 1</option>
                                                            <option value="">Option 2</option>
                                                            <option value="">Option 3</option>
                                                            <option value="">Option 4</option>
                                                        </select>
                                                    </div>
                                                </div> */}
                                                <div className="custom--select-area" >
                                                    <label htmlFor="industry" className='custom--select-label'>Industry</label>
                                                    {/* <div className="sel sel--black-panther">
                                                        <i className="bi bi-chevron-down select--toggle"></i>
                                                        <select name="industry" id="industry" value={credentials.industry} onChange={handleInputChange}>
                                                            <option value="" disabled>- Select Here -</option>
                                                            <option value="hacker">Hacker</option>
                                                            <option value="gamer">Gamer</option>
                                                            <option value="developer">Developer</option>
                                                            <option value="programmer">Programmer</option>
                                                            <option value="designer">Designer</option>
                                                        </select>
                                                    </div> */}
                                                    {/* {selectedIndustry.map(selectIndustry => (
                                                        <span className="job-post-form-badge"
                                                            key={selectIndustry}
                                                            onClick={() => handleDeselectIndustry(selectIndustry)}
                                                        >{selectIndustry}
                                                        </span>
                                                    ))} */}

                                                    {/* <input type="text" className='job-post-form-input'
                                                        name='searchIndustryInput'
                                                        id='searchIndustryInput'
                                                        value={searchIndustryInput}
                                                        onChange={handleIndustrySearch}
                                                        placeholder='Enter a clear & specific industry to get better responses' /> */}

                                                    <div className='cand--reg-multi-input-form-group'>
                                                        <input type="text" id='searchIndustryInput' name='searchIndustryInput'
                                                            value={searchIndustryInput}
                                                            onChange={handleIndustrySearch}
                                                            className='cand--reg-flex-input industry'
                                                            placeholder='Select an industry to get better responses' />
                                                        <div className='search-result-data-area'>
                                                            {filteredIndustry.length > 0 &&
                                                                filteredIndustry.map((filterIndustry) => {
                                                                    return <div className='search-result-data' key={filterIndustry._id} onClick={() => handleIndustryClick(filterIndustry.industry)}>
                                                                        {filterIndustry.industry}
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                        <div className='cand-reg-form-badge-area'>
                                                            {selectedIndustry.map(selectIndustry => (
                                                                <span className="cand-reg-form-badge"
                                                                    key={selectIndustry}
                                                                    onClick={() => handleDeselectIndustry(selectIndustry)}
                                                                >{selectIndustry}</span>
                                                            ))}
                                                        </div>
                                                        <small className='text-danger'>{selectedIndustry.length === 0 && "required"}</small>
                                                    </div>

                                                    {/* <div className='search-result-data-area'>
                                                        {filteredIndustry.length > 0 &&
                                                            filteredIndustry.map((filterIndustry) => {
                                                                return <div className='search-result-data' key={filterIndustry._id} onClick={() => handleIndustryClick(filterIndustry.industry)}>
                                                                    {filterIndustry.industry}
                                                                </div>
                                                            })
                                                        }
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-4 col-sm-4 custom-padding-left">
                                                <div className='reg--form-group'>
                                                    <input type="number" id='subject' name="count" value={credentials.count} min="0" onChange={handleInputChange} placeholder="Enter the headcount" className='reg--form-input' required />
                                                    <label htmlFor="subject" className='reg--form-label'>Headcount</label>
                                                    <small className='text-danger'>{credentials.count === "" && "required"}</small>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 custom-padding-left-right mt-4">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='message' name="text" value={credentials.text} onChange={handleInputChange} placeholder="Where did you acquire knowledge about Skillety?" className='reg--form-input' />
                                                    <label htmlFor="message" className='reg--form-label'>From where did you learn about Skillety?</label>
                                                   <small className='text-danger'>{credentials.text === "" && "required"}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="reg--form-btn-area">
                                            <div className="cli--login-remember-area terms-condition" data-aos="fade-right">
                                                <label className="cli--login-remember-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={isAgreed}
                                                        onChange={() => {
                                                            setIsAgreed(!isAgreed)
                                                        }
                                                        }
                                                    />
                                                    <span className="cli--login-remember-checkmark"></span>
                                                    <span>By clicking Agree & Join, you agree to the Skillety&nbsp;<a href="#">User Agreement, Privacy Policy</a></span> 
                                                </label>
                                            </div>
                                            <button type='submit' className='reg--form-btn-sub' disabled={!isAgreed} data-aos="fade-left">
                                                <div className='reg--form-btn'>
                                                    Submit
                                                </div>
                                                <div className='reg--form-arrow-area'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                        <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ClientRegister;