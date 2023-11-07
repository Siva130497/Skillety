import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import $, { event } from 'jquery';
import './Enquiry.css';
import './Enquiry-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Enquiry = () => {

    const initialCredentials = {
        fullName: "",
        email: "",
        phoneNo: "",
        companyName: "",
        designation: "",
        location: "",
        rpoModel: "Designer",
        positionCount: "",
        premisesType: "",
    }

    const [credentials, setCredentials] = useState(initialCredentials);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateString, setDateString] = useState("");

    const [CSEChoosing, setCSEChoosing] = useState(false);
    const [CSERecruiters, setCSERecruiters] = useState([]);

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

    useEffect(()=>{
        if(CSEChoosing){
            axios.get('http://localhost:5002/staff-cse')
            .then((res)=>{
                console.log(res.data);
                setCSERecruiters(res.data)
            })
            .catch((err)=>console.log(err))
        }
    }, [CSEChoosing])

    const enquiryFormDetails = async (detail) => {
        try {
            const response = await axios.post('http://localhost:5002/enquiry-form', detail, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const result = response.data;
    
            if (!result.error) {
                console.log(result);
                alert("enquiry form send successfully!")
                setCredentials(initialCredentials);
                setSelectedDate(null);
                setDateString("");
                setCSEChoosing(true);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
    }

    const handleDateChange = date => {
        setSelectedDate(date);

        if (date) {
            const dateString = date.toLocaleDateString('en-GB');
            setDateString(dateString);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedCredentials = {
            ...credentials,
            deadline: dateString,
        };
        console.log(updatedCredentials);
        enquiryFormDetails(updatedCredentials);
    };

    const handleMailSending = (email) => {
        const enquiryDetail = {
            ...credentials,
            deadline: dateString,
        };
        axios.post("http://localhost:5002/enquiry-form/cse", {email, enquiryDetail}, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>{
            console.log(res.data);
            if(res.data.emailSent){
                alert(`Your “RPO model“ is all set. Our CSE will contact you within 24 hours. Thank you and welcome onboard!!!
                `)
            }
        })
        .catch(err=>console.log(err))
    }

    return (
        <>
            <Layout />
            {CSEChoosing ? <div >
                {CSERecruiters.length > 0 && <table className="table table-hover">
                <tbody>
                                    {CSERecruiters.map((CSE) => {
                                        return <tr key={CSE.id} onClick={()=>{
                                                
                                                }}>
                                                    <th scope="row">{CSE.name}</th>
                                                     <th scope="col"><button type="button" className="btn btn-outline-info" 
                                                    onClick={()=>handleMailSending(CSE.email)}
                                                     >Contact Me</button></th>
                                                </tr>
                                        })}
                </tbody>
                </table>}
            </div> :
            <div className='client-register-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="custom--container">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <a className='sub--bredcrumb-link' href="/rpo">Rpo</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Enquiry Form</p>
                                </div>
                            </div>

                            <div className="cli--reg-heading-area">
                                <h3 className='cli--reg-heading' data-aos="fade-left">Hi, Welcome to <span>SKILLETY!!!</span></h3>
                                <h4 className='cli--reg-sub-heading' data-aos="fade-left">The exclusive enquiry Form</h4>
                            </div>

                            <div className="cli--reg-form-area">
                                <div className="con--note-form-area" data-aos="fade-up">
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                                <div className='reg--form-group custom'>
                                                    <input type="text" id='full_name' name="fullName" 
                                                    value={credentials.fullName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your full name" className='reg--form-input' required />
                                                    <label htmlFor="full_name" className='reg--form-label'>Your Full Name</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                                <div className='reg--form-group'>
                                                    <input type="number" id='mobile_no' name="phoneNo"
                                                    value={credentials.phoneNo}
                                                    onChange={handleInputChange}
                                                    min="0"
                                                    placeholder="Enter your mobile number" className='reg--form-input' required />
                                                    <label htmlFor="mobile_no" className='reg--form-label'>Mobile Number</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                                <div className='reg--form-group'>
                                                    <input type="email" id='email' name="email" 
                                                    value={credentials.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your email ID" className='reg--form-input' required />
                                                    <label htmlFor="email" className='reg--form-label'>Email ID</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='subject' name="companyName" 
                                                    value={credentials.companyName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter the company name" className='reg--form-input' required />
                                                    <label htmlFor="subject" className='reg--form-label'>Company Name</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='designation' name="designation" 
                                                    value={credentials.designation}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your designation" className='reg--form-input' required />
                                                    <label htmlFor="designation" className='reg--form-label'>Designation</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='location' name="location" 
                                                    value={credentials.location}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your location" className='reg--form-input' required />
                                                    <label htmlFor="location" className='reg--form-label'>Location</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 custom-padding-left-right">
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
                                                    <label htmlFor="rpo" className='custom--select-label white-space-nowrap custom-width-50'>Which RPO model do you want to opt for?</label>
                                                    <div class="sel sel--black-panther custom-width-50">
                                                        <i class="bi bi-chevron-down select--toggle"></i>
                                                        <select name="rpoModel" id="rpo" value={credentials.rpoModel} onChange={handleInputChange}>
                                                            <option value="" disabled>- Select RPO Here -</option>
                                                            <option value="RPO Lite">RPO Lite</option>
                                                            <option value="Enterprise RPO">Enterprise RPO</option>
                                                            <option value="PROJECT RPO">PROJECT RPO</option>
                                                            <option value="CONTINGENT RPO">CONTINGENT RPO</option>
                                                            <option value="Designer">Designer</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-right">
                                                <div className='reg--form-group'>
                                                    <input type="number" id='position_count' name="positionCount"
                                                    value={credentials.positionCount}
                                                    onChange={handleInputChange}
                                                    min='0'
                                                    placeholder="How many positions are open to be outsourced?" className='reg--form-input' required />
                                                    <label htmlFor="position_count" className='reg--form-label'>How many positions are open to be outsourced?</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 col-sm-6 custom-padding-left">
                                                {/* <div className='reg--form-group'>
                                                    <input type="text" id='deadline' name="deadline" placeholder="Tentative deadline to close these positions ?" className='reg--form-input' required />
                                                    <DatePicker
                                                    selected={credentials.deadline}
                                                    onChange={handleDateChange}
                                                    dateFormat="dd/MM/yyyy"
                                                    />
                                                    <label htmlFor="deadline" className='reg--form-label'>Tentative deadline to close these positions ?</label>
                                                </div> */}
                                                <div className="cand--reg-form-group can--reg-date">
                                                    <label htmlFor="deadline" className='reg--form-label my-5' >Tentative deadline to close these positions ?</label>
                                                    <div className="cand--reg-input-group">
                                                        <DatePicker
                                                            selected={selectedDate}
                                                            onChange={handleDateChange}
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText='dd/mm/yyyy'
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 custom-padding-left-right">
                                                <div className='reg--form-group'>
                                                    <input type="text" id='message' name="premisesType" 
                                                    value={credentials.premisesType}
                                                    onChange={handleInputChange}
                                                    placeholder="Would you like our dedicated Account Manager to work from your premises or our premises?" className='reg--form-input' />
                                                    <label htmlFor="message" className='reg--form-label'>Would you like our dedicated Account Manager to work from your premises or our premises?</label>
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
            </div>}

            <Footer />
            
        </>
    )
}

export default Enquiry;