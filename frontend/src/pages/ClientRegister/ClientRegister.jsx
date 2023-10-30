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

const ClientRegister = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const initialCredentials = {
        name: "",
        phone: "",
        email: "",
        companyName: "",
        industry: "Developer",
        count: "",
        text: "",
    }
    const [credentials, setcredentials] = useState(initialCredentials)

    useEffect(() => {
        setcredentials((prevCredentials) => ({
            ...prevCredentials,
            name: profile.name ? profile.name : "",
            email: profile.email ? profile.email : "",
        }));
    }, [profile]);

    const registerUser = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5002/register-Client', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const result = response.data;
    
            if (!result.error) {
                console.log(result);
                alert("your details send for verification, after verification we contact you through your email")
                setcredentials(initialCredentials);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(credentials);
        registerUser(credentials);
        // navigate("/packages");
    }

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

                            <GoogleAuth setProfile={setProfile} />

                            <div className="cli--reg-form-area">
                                <div className="con--note-form-area" data-aos="fade-up">
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                                <div className='reg--form-group custom'>
                                                    <input type="text" id='full_name' name="name" value={credentials.name} onChange={handleInputChange} placeholder="Enter your full name" className='reg--form-input' required />
                                                    <label htmlFor="full_name" className='reg--form-label'>Your Full Name</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='email' name="email" value={credentials.email} onChange={handleInputChange} placeholder="Enter your email address" className='reg--form-input' required />
                                                    <label htmlFor="email" className='reg--form-label'>Email ID</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='phone_no' name="phone" value={credentials.phone} onChange={handleInputChange} placeholder="Enter your mobile number" className='reg--form-input' required />
                                                    <label htmlFor="phone_no" className='reg--form-label'>Mobile Number</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='subject' name="companyName" value={credentials.companyName} onChange={handleInputChange} placeholder="Enter the company name" className='reg--form-input' required />
                                                    <label htmlFor="subject" className='reg--form-label'>Company Name</label>
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
                                                    <div className="sel sel--black-panther">
                                                        <i className="bi bi-chevron-down select--toggle"></i>
                                                        <select name="industry" id="industry" value={credentials.industry} onChange={handleInputChange}>
                                                            <option value="" disabled>- Select Here -</option>
                                                            <option value="hacker">Hacker</option>
                                                            <option value="gamer">Gamer</option>
                                                            <option value="developer">Developer</option>
                                                            <option value="programmer">Programmer</option>
                                                            <option value="designer">Designer</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-4 col-sm-4 custom-padding-left">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='subject' name="count" value={credentials.count} onChange={handleInputChange} placeholder="Enter the headcount" className='reg--form-input' required />
                                                    <label htmlFor="subject" className='reg--form-label'>Headcount</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 custom-padding-left-right">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='message' name="text" value={credentials.text} onChange={handleInputChange} placeholder="Where did you acquire knowledge about Skillety?" className='reg--form-input' />
                                                    <label htmlFor="message" className='reg--form-label'>From where did you learn about Skillety?</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="reg--form-btn-area">
                                            <button type='submit' className='reg--form-btn-sub' data-aos="fade-down">
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