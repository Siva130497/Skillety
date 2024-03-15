import React, { useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './ContactCandidate.css';
import './ContactCandidate-responsive.css';
import { CandidateFooter } from '../../components/CandidateFooter';
import LayoutNew from '../../components/LayoutNew';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const ContactCandidate = () => {
    const recaptcha = useRef();

    const [candidateContactContent, setCandidateContactContent] = useState([]);

    useEffect(()=>{
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_13,content_18,content_19,content_20,content_21,content_22,content_23,content_24,content_25")
        .then(res=>{
          console.log(res.data);
          setCandidateContactContent(res.data);
        }).catch(err=>console.log(err));
      },[])

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

    const sendMessage = async (messageDetail) => {
        try {
            const response = await axios.post('https://skillety-n6r1.onrender.com/contact-candidate', messageDetail, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                showSuccessMessage("Your message is recieved.One of our agent will contact you shortly")
                setCredentials(initialCredentials);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const initialCredentials = {
        fullName: "",
        email: "",
        phoneNo: "",
        subject: "",
        message: "",
    }

    const [credentials, setCredentials] = useState(initialCredentials);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "phoneNo" && value.length === 13) {
            return;
        }
        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(credentials);
        const captchaValue = recaptcha.current.getValue();

        if (!captchaValue) {
            showErrorMessage('Please verify the reCAPTCHA!');
        } else {
            try {
                const response = await axios.post('https://skillety-n6r1.onrender.com/verify', {
                    captchaValue,
                });

                const data = response.data;

                if (data.success) {
                    sendMessage(credentials);
                } else {
                    showErrorMessage('reCAPTCHA validation failed!');
                }
            } catch (error) {
                console.error('Error during API call:', error);
            }
        }
    };

    return (
        <div>
            <LayoutNew contact={true} />
            <div>
                <div className='container-fluid contact--section'>
                    <div className='container-fluid container-section'>
                        <div className="about--bg candidate">
                            <div className="row">
                                <div className="col-12 col-xl-8 col-lg-12 col-md-12 about--left-cover">
                                    <div className="breadcrumb--area candidate" data-aos="fade-down">
                                        <div className="breadcrumb--item">
                                            <a href="/candidate-home">Home</a>
                                        </div>
                                        <div className="breadcrumb--item">
                                            <p>Contact us</p>
                                        </div>
                                    </div>
                                    <div className="about--head candidate">
                                        <h2 data-aos="fade-left">
                                        {candidateContactContent.find(content=>content.id === "content_13")?.content ||
                                            "It’s Time to Make Skillety Work for You"}</h2>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-4 col-lg-6 offset-lg-6 offset-xl-0 col-md-12 about--right-cover">
                                    <div className="about--card-area">
                                        <div className="card about--card candidate" data-aos="fade-right">
                                            <div className="card--imgicon-area">
                                                <h6 className='card--text candidate'>I am an immediate joiner</h6>
                                                <img src="assets/img/home-images/clipboard-img.png" className='card--icon candidate' alt="" />
                                            </div>
                                            <div className="about--sub-des candidate">
                                                <p>
                                                You're just One Click away from the best opportunities.
                                                </p>
                                            </div>
                                            <a href='/candidate-login' className="arrow--icon-btn candidate">
                                                <img src="assets/img/home-images/arrow-dark.png" className='arrow--icon' alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='con--where-section'>
                            <div className="con--where-container">
                                <div className="con--where-heading-area">
                                    <h4 className='con--where-heading' data-aos="fade-up">
                                    {candidateContactContent.find(content=>content.id === "content_18")?.content ||
                                        "Where Do We Work?"}
                                    </h4>
                                </div>
                                <div className="con--where-desc-area">
                                    <p className="con--where-desc" data-aos="fade-left">
                                    {candidateContactContent.find(content=>content.id === "content_19")?.content ||
                                        "Hello!, seekers of wisdom and answers! Welcome to the Contact Us page at Skillety - the space where your questions meet their match, and your curiosity gets a VIP pass to the front of the line!"}
                                    </p>

                                    <p className="con--where-desc mt-4" data-aos="fade-left">
                                    {candidateContactContent.find(content=>content.id === "content_20")?.content ||
                                        "Need assistance, guidance, or just want to drop us a virtual high-five? We've got you covered like a cozy blanket on a chilly night. Our Contact Us page is more than just a form; it's a direct hotline to the wizards behind the career-curtain, ready to sprinkle a little magic on your queries."}
                                    </p>

                                    <p className="con--where-desc mt-4" data-aos="fade-left">
                                    {candidateContactContent.find(content=>content.id === "content_21")?.content ||
                                        "Whether you're navigating the labyrinth of Job listings, seeking career advice, or just want to share your latest cat meme (we love those too), this is the place where pixels become handshakes. So, put on your typing gloves, flex those fingers, and let the conversation begin!"}
                                    </p>

                                    <p className="con--where-desc mt-4" data-aos="fade-left">
                                        <b>
                                        {candidateContactContent.find(content=>content.id === "content_22")?.content ||
                                            "Even better, just pick up your phone and call us @ +91-99664-33330. We’re waiting!!!"}</b>
                                    </p>

                                </div>
                            </div>
                            <div className="con-where-content-area">
                                <div className="row custom-border-top custom-border-bottom">
                                    <div className="col-12 col-lg-7 col-md-12 custom-border-right">
                                        <div className="con--map-container">
                                            <h5 className="con--location-heading" data-aos="fade-down">
                                                Location
                                            </h5>
                                            <div className="con--map-area">
                                                <img src="assets/img/contact-img/map-img-talent.png" loading='lazy' data-aos="zoom-out-right" className='con--map-img' alt="" />
                                                <div className='con--map-pointer' data-aos="fade-down" data-aos-delay="300"></div>
                                                <div className='con--map-link-img-area' data-aos="zoom-out-left">
                                                    <a href="https://goo.gl/maps/SNX17mkAzaY8PVW36" className='con--map-link-img-sub' target='_blank'>
                                                        <img src="assets/img/contact-img/map-link.png" className='con--map-link-img' alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-5 col-md-12">
                                        <div className="con--content-area">
                                            <div className="con--content">
                                                <div className="con--icon-area candidate" data-aos="fade-down">
                                                    <img src="assets/img/contact-img/location-white.png" className='con--icon' alt="" />
                                                </div>
                                                <div className='con--loaction' data-aos="fade-left">
                                                    <a href="https://goo.gl/maps/SNX17mkAzaY8PVW36" target='_blank'>
                                                    {candidateContactContent.find(content=>content.id === "content_23")?.content ||
                                                        "Plot No. 45, 2nd Floor, Sarvasukhi Colony, West Marredpally, Secunderabad, Telangana 500026. INDIA."}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="con--content">
                                                <div className="con--icon-area candidate" data-aos="fade-down">
                                                    <img src="assets/img/contact-img/phone-call-white.png" className='con--icon' alt="" />
                                                </div>
                                                <div className='con--phone-no' data-aos="fade-left">
                                                    <a href="tel:+919966433330" target='_blank'>
                                                    {candidateContactContent.find(content=>content.id === "content_24")?.content ||
                                                        "+91-9966433330"}</a>
                                                </div>
                                            </div>
                                            <div className="con--content">
                                                <div className="con--icon-area candidate" data-aos="fade-down">
                                                    <img src="assets/img/contact-img/mail-white.png" className='con--icon' alt="" />
                                                </div>
                                                <div className='con--mail' data-aos="fade-left">
                                                    <a href="mailto:info@skillety.com" target='_blank'>
                                                    {candidateContactContent.find(content=>content.id === "content_25")?.content ||
                                                        "info@skillety.com"}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="con--note-section">
                            <div className="con--where-container">
                                <div className="con--where-heading-area">
                                    <h4 className='con--where-heading' data-aos="fade-up">
                                        SEND US A QUICK NOTE
                                    </h4>
                                </div>
                                <div className="con--where-desc-area">
                                    <p className="con--where-desc" data-aos="fade-left">
                                        It's easy. Just complete this form and send it to us. We will get in touch with you within 24 hours.
                                    </p>
                                </div>
                                <div className="con--note-form-area">
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12 col-lg-6 col-md-6 custom-padding-right">
                                                <div className='con--form-group custom' data-aos="fade-up">
                                                    <input type="text" id='full_name' name="fullName" value={credentials.fullName} onChange={handleInputChange} placeholder="Enter your full name" className='con--form-input' required />
                                                    <label htmlFor="full_name" className='con--form-label'>Full Name <span>*</span> </label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 custom-padding-left">
                                                <div className='con--form-group' data-aos="fade-up">
                                                    <input type="text" id='email' name="email" value={credentials.email} onChange={handleInputChange} placeholder="Enter you email address" className='con--form-input' required />
                                                    <label htmlFor="email" className='con--form-label'>E mail <span>*</span> </label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 custom-padding-right">
                                                <div className='con--form-group' data-aos="fade-up">
                                                    <input type="number" id='phone_no' name="phoneNo" value={credentials.phoneNo} onChange={handleInputChange} placeholder="Enter you phone number" className='con--form-input' min='0' required />
                                                    <label htmlFor="phone_no" className='con--form-label'>Phone Number <span>*</span> </label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 col-md-6 custom-padding-left">
                                                <div className='con--form-group' data-aos="fade-up">
                                                    <input type="text" id='subject' name="subject" value={credentials.subject} onChange={handleInputChange} placeholder="Enter the subject" className='con--form-input' required />
                                                    <label htmlFor="subject" className='con--form-label'>Subject <span>*</span> </label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-12 col-md-12 custom-padding-left-right">
                                                <div className='con--form-group' data-aos="fade-up">
                                                    <input type="text" id='message' name="message" value={credentials.message} onChange={handleInputChange} placeholder="Enter the message" className='con--form-input' />
                                                    <label htmlFor="message" className='con--form-label'>Message</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex align-items-center justify-content-center mb-4' data-aos="zoom-in">
                                            <ReCAPTCHA ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} />
                                        </div>

                                        <div className="con--form-btn-area candidate">
                                            <button type='submit' className='con--form-btn-sub candidate' data-aos="fade-up">
                                                <div className='con--form-btn candidate'>
                                                    Send Us Message
                                                </div>
                                                <div className='con--form-arrow-area candidate'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 27 27" fill="none">
                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                                        <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
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
            <CandidateFooter />
        </div>


    )
}
export default ContactCandidate;