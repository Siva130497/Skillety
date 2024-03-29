import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   //for show success message for payment
   function showSuccessMessage(message) {
    Swal.fire({
      title: 'Thank you for subscribing!',
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }

  //for show error message for payment
  function showErrorMessage(message) {
    Swal.fire({
      title: 'Sorry to say!',
      text: message,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
    });
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    axios.post("https://skillety-n6r1.onrender.com/subscribe", {subscriberEmail})
    .then(res=>{
      console.log(res.data);
      showSuccessMessage("Subscribed successfully!");
      setSubscriberEmail("");
    }).catch(err=>{
      console.log(err);
      showErrorMessage(`Subcribtion failed!, Try again: ${err.response.data.error}`);
    })
  }
  return (
      
        <footer className='footer--section'>
          <div className="container-fluid">
            <div className="footer--email-form-section">
              <div className="footer--email-form-card">
                <div className="row footer--custom-row">
                  <div className="col-12 col-lg-7 col-xl-7">
                    <div className="footer--email-left">
                      <h3 className='footer--email-head' data-aos="fade-left">
                        Get email updates <br />
                        from SKILLETY
                      </h3>
                      <p className='footer--email-desc' data-aos="fade-right">
                        Enter your email below to sign up for our twice weekly newsletter.
                      </p>
                      <form action=""
                      onSubmit={handleSubmit}>
                        <input type="email" className='form-control footer--email-input' data-aos="fade-up"
                          placeholder='Your email' required 
                          value={subscriberEmail}
                          onChange={(e)=>{
                            setSubscriberEmail(e.target.value)
                            }}/>
                            <small className='text-danger pt-4'>{(!emailRegex.test(subscriberEmail) && subscriberEmail) ? "Enter valid email address" : ""}</small>
                        <div className="footer--sub-btn-area">
                          <button type='submit' className='footer--sub-btn-sub' data-aos="fade-right">
                            <div className='footer--sub-btn'>
                              Subscribe
                            </div>
                            <div className='footer--btn-arrow-area'>
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
                  <div className="col-12 col-lg-5 col-xl-5">
                    <div className="footer--logo-area">
                      <img src="../assets/img/home-images/skilletty-logo.png" className='footer--logo' alt="" data-aos="zoom-out" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid footer--link-container">
            <div className="footer--link-section">
              <div className="row">
                <div className="col-12 col-lg-8 col-xl-6">
                  <div className="row">
                    {/* <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                      <div className="footer--link-area">
                        <h6 className='footer--link-head' data-aos="fade">
                          For Talent
                        </h6>
                        <div className="footer--links">
                          <ul>
                            <li data-aos="fade">
                              <a href="/candidate-about-us" className='footer--link'>About Us</a>
                            </li>
                            <li data-aos="fade">
                              <a href="/job-search" className='footer--link'>Search Jobs</a>
                            </li>
                            <li data-aos="fade">
                              <a href="/events" className='footer--link'>Media</a>
                            </li>
                            <li data-aos="fade">
                              <a href="/talent-contact-us" className='footer--link'>Contact Us</a>
                            </li>
                            <li data-aos="fade">
                              <a href="/terms-and-conditions" className='footer--link'>Terms & Conditions</a>
                            </li>
                            <li data-aos="fade">
                              <a href="/privacy-policy" className='footer--link'>Privacy Policies</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                      <div className="footer--link-area">
                        {/* <h6 className='footer--link-head' data-aos="fade">
                          For Employer
                        </h6> */}
                        <div className="footer--links">
                          <ul>
                            <li data-aos="fade">
                              <a href="/about-us" className='footer--link'>About Us</a>
                            </li>
                            <li data-aos="fade">
                              <a href="/talent-profile-search" className='footer--link'>Search CV</a>
                            </li>
                            <li data-aos="fade">
                              <a href="/contact-us" className='footer--link'>Contact Us</a>
                            </li>
                            <li data-aos="fade">
                              <a href="/terms-and-conditions" className='footer--link'>Terms & Conditions</a>
                            </li>
                            <li data-aos="fade">
                              <a href="/privacy-policy" className='footer--link'>Privacy & Policy</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                      <div className="footer--link-area">
                        <h6 className='footer--link-head' data-aos="fade">
                          Our Company
                        </h6>
                        <div className="footer--links">
                          <ul>
                            <li data-aos="fade">
                              <a href="" className='footer--link'>Lorem Ipsum</a>
                            </li>
                            <li data-aos="fade">
                              <a href="" className='footer--link'>Lorem Ipsum</a>
                            </li>
                            <li data-aos="fade">
                              <a href="" className='footer--link'>Lorem Ipsum</a>
                            </li>
                            <li data-aos="fade">
                              <a href="" className='footer--link'>Lorem Ipsum</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    
                  </div>
                </div>
                <div className="col-12 col-lg-4 col-sm-12 col-xl-6">
                  <div className="footer--social-section">
                    <div className="footer--social-area">
                      <div className="footer--social-icon-area" data-aos="fade">
                        <i className="ri-facebook-circle-fill footer--social-icon"></i>
                      </div>
                      <a href='' className='footer--social-link' data-aos="fade">Facebook</a>
                    </div>
                    <div className="footer--social-area">
                      <div className="footer--social-icon-area" data-aos="fade">
                        <i className="ri-instagram-fill footer--social-icon"></i>
                      </div>
                      <a href='' className='footer--social-link' data-aos="fade">Instagram</a>
                    </div>
                    <div className="footer--social-area">
                      <div className="footer--social-icon-area" data-aos="fade">
                        <i className="ri-twitter-x-fill footer--social-icon footer-twitter"></i>
                      </div>
                      <a href='' className='footer--social-link' data-aos="fade">Twitter</a>
                    </div>
                    <div className="footer--social-area">
                      <div className="footer--social-icon-area" data-aos="fade">
                        <i className="ri-linkedin-fill footer--social-icon footer-twitter"></i>
                      </div>
                      <a href='' className='footer--social-link' data-aos="fade">Linkedin</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className='footer--link-section2'>
              <div className="row">
                <div className="col-12 col-lg-3 col-md-6 col-sm-6 footer--quick-link-area">
                  <div className="footer--link-area">
                    <h6 className='footer--link-head pb-4' data-aos="fade">
                      Popular Job
                    </h6>
                    <div className="footer--links">
                      <ul>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 col-md-6 col-sm-6 footer--quick-link-area">
                  <div className="footer--link-area">
                    <h6 className='footer--link-head pb-4' data-aos="fade">
                      Popular Remote job
                    </h6>
                    <div className="footer--links">
                      <ul>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-md-5 mt-sm-5 footer--quick-link-area">
                  <div className="footer--link-area">
                    <h6 className='footer--link-head pb-4' data-aos="fade">
                      Popular job location
                    </h6>
                    <div className="footer--links">
                      <ul>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-md-5 mt-sm-5 footer--quick-link-area">
                  <div className="footer--link-area">
                    <h6 className='footer--link-head pb-4' data-aos="fade">
                      Popular Resources
                    </h6>
                    <div className="footer--links">
                      <ul>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                        <li data-aos="fade">
                          <a href="" className='footer--link'>Lorem Ipsum</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

          </div>
          <div className="footer--bottom-text-area" data-aos="fade-up">
            SKILLETY
          </div>
          <div className="sub--footer">
            <div className="container-fluid">
              <div className="sub--footer-content">
                <span className='footer--copyright'>© {currentYear} - Skillety Technologies Private Limited, All Rights Reserved.</span>
                <div className='footer--bottom-credit-area'>
                  <span className='footer--cerdit'>Designed & Developed by</span>
                  <a href="/https://www.prodigit.in/" target='_blank'>
                    <img src="assets/img/logo/prodigit-logo.png" className='prodigit--logo' alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

  )
}

export default Footer;