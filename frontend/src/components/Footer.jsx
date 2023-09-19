import React from 'react'

export const Footer = () => {
  return (
    <footer className='footer--section'>
        <div className="container-fluid">
          <div className="footer--email-form-section">
            <div className="footer--email-form-card">
              <div className="row footer--custom-row">
                <div className="col-12 col-lg-7">
                  <div className="footer--email-left">
                    <h3 className='footer--email-head'>
                      Get email updates <br />
                      from SKILLETY
                    </h3>
                    <p className='footer--email-desc'>
                      Enter your email below to sign up for our twice weekly newsletter.
                    </p>
                    <form action="">
                      <input type="text" className='form-control footer--email-input'
                        placeholder='Your email' required />
                      <div className="footer--sub-btn-area">
                        <button type='submit' className='footer--sub-btn-sub'>
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
                <div className="col-12 col-lg-5">
                  <div className="footer--logo-area">
                    <img src="assets/img/home-images/skilletty-logo.png" className='footer--logo' alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid footer--link-container">
          <div className="footer--link-section">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="row">
                  <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                    <div className="footer--link-area">
                      <h6 className='footer--link-head'>
                        For Talent
                      </h6>
                      <div className="footer--links">
                        <ul>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                    <div className="footer--link-area">
                      <h6 className='footer--link-head'>
                        For Employer
                      </h6>
                      <div className="footer--links">
                        <ul>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                    <div className="footer--link-area">
                      <h6 className='footer--link-head'>
                        Our Company
                      </h6>
                      <div className="footer--links">
                        <ul>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li>
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-sm-12">
                <div className="footer--social-section">
                  <div className="footer--social-area">
                    <div className="footer--social-icon-area">
                      <i className="ri-facebook-circle-fill footer--social-icon"></i>
                    </div>
                    <a href='' className='footer--social-link'>Facebook</a>
                  </div>
                  <div className="footer--social-area">
                    <div className="footer--social-icon-area">
                      <i className="ri-instagram-fill footer--social-icon"></i>
                    </div>
                    <a href='' className='footer--social-link'>Instagram</a>
                  </div>
                  <div className="footer--social-area">
                    <div className="footer--social-icon-area">
                      <i className="ri-twitter-x-fill footer--social-icon footer-twitter"></i>
                    </div>
                    <a href='' className='footer--social-link'>Twitter</a>
                  </div>
                  <div className="footer--social-area">
                    <div className="footer--social-icon-area">
                      <i className="ri-linkedin-fill footer--social-icon footer-twitter"></i>
                    </div>
                    <a href='' className='footer--social-link'>Linkedin</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer--link-section2'>
            <div className="row">
              <div className="col-12 col-lg-3 col-md-6 col-sm-6 footer--quick-link-area">
                <div className="footer--link-area">
                  <h6 className='footer--link-head pb-4'>
                    Popular Job
                  </h6>
                  <div className="footer--links">
                    <ul>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 col-md-6 col-sm-6 footer--quick-link-area">
                <div className="footer--link-area">
                  <h6 className='footer--link-head pb-4'>
                    Popular Remote job
                  </h6>
                  <div className="footer--links">
                    <ul>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-md-5 mt-sm-5 footer--quick-link-area">
                <div className="footer--link-area">
                  <h6 className='footer--link-head pb-4'>
                    Popular job location
                  </h6>
                  <div className="footer--links">
                    <ul>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-md-5 mt-sm-5 footer--quick-link-area">
                <div className="footer--link-area">
                  <h6 className='footer--link-head pb-4'>
                    Popular Resources
                  </h6>
                  <div className="footer--links">
                    <ul>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li>
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer--bottom-text-area">
          SKILLETY
        </div>
        <div className="sub--footer">
          <div className="container-fluid">
            <div className="sub--footer-content">
              <span className='footer--copyright'>© 2023 - Skillety Technologies Private Limited, All Rights Reserved.</span>
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
