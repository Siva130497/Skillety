import React from "react";

export const CandidateFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer className="footer--section candidate">
        <div className="container-fluid">
          <div className="footer--email-form-section">
            <div className="footer--email-form-card candidate">
              <div className="row footer--custom-row">
                <div className="col-12 col-lg-7 col-xl-7">
                  <div className="footer--email-left">
                    <h3 className="footer--email-head" data-aos="fade-left">
                      Get email updates <br />
                      from SKILLETY
                    </h3>
                    <p className="footer--email-desc" data-aos="fade-right">
                      Enter your email below to sign up for our twice weekly
                      newsletter.
                    </p>
                    <form action="">
                      <input
                        type="text"
                        className="form-control footer--email-input candidate"
                        data-aos="fade-up"
                        placeholder="Your email"
                        required
                      />
                      <div className="footer--sub-btn-area">
                        <button
                          type="submit"
                          className="footer--sub-btn-sub candidate"
                          data-aos="fade-right"
                        >
                          <div className="footer--sub-btn candidate">
                            Subscribe
                          </div>
                          <div className="footer--btn-arrow-area candidate">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="27"
                              viewBox="0 0 27 27"
                              fill="none"
                            >
                              <path
                                d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                stroke="#5C3B2E"
                                stroke-width="2"
                              />
                              <path
                                d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                stroke="#5C3B2E"
                                stroke-width="2"
                              />
                              <path
                                d="M1 26L25.1667 1"
                                stroke="#5C3B2E"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-12 col-lg-5 col-xl-5">
                  <div className="footer--logo-area">
                    <img
                      src="../assets/img/home-images/skilletty-logo.png"
                      className="footer--logo"
                      alt=""
                      data-aos="zoom-out"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid footer--link-container">
          <div className="footer--link-section candidate">
            <div className="row">
              <div className="col-12 col-lg-8 col-xl-6">
                <div className="row">
                  <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                    <div className="footer--link-area">
                      {/* <h6 className="footer--link-head candidate" data-aos="fade">
                        For Talent
                      </h6> */}
                      <div className="footer--links candidate">
                        <ul>
                          <li data-aos="fade">
                            <a
                              href="/candidate-about-us"
                              className="footer--link"
                            >
                              About Us
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a href="/job-search" className="footer--link">
                              Search Jobs
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a href="/events" className="footer--link">
                              Media
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a
                              href="/talent-contact-us"
                              className="footer--link"
                            >
                              Contact Us
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a
                              href="/terms-and-conditions-talent"
                              className="footer--link"
                            >
                              Terms & Conditions
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a href="/privacy-policy-talent" className="footer--link">
                              Privacy & Policy
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                    <div className="footer--link-area">
                      <h6
                        className="footer--link-head candidate"
                        data-aos="fade"
                      >
                        For Employer
                      </h6>
                      <div className="footer--links candidate">
                        <ul>
                          <li data-aos="fade">
                            <a href="/about-us" className="footer--link">
                              About Us
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a
                              href="/talent-profile-search"
                              className="footer--link"
                            >
                              Search CV
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a href="/contact-us" className="footer--link">
                              Contact Us
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a
                              href="/terms-and-conditions"
                              className="footer--link"
                            >
                              Terms & Conditions
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a href="/privacy-policy" className="footer--link">
                              Privacy Policies
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                    <div className="footer--link-area">
                      <h6
                        className="footer--link-head candidate"
                        data-aos="fade"
                      >
                        Our Company
                      </h6>
                      <div className="footer--links candidate">
                        <ul>
                          <li data-aos="fade">
                            <a href="" className="footer--link">
                              Lorem Ipsum
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a href="" className="footer--link">
                              Lorem Ipsum
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a href="" className="footer--link">
                              Lorem Ipsum
                            </a>
                          </li>
                          <li data-aos="fade">
                            <a href="" className="footer--link">
                              Lorem Ipsum
                            </a>
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
                    <div
                      className="footer--social-icon-area candidate"
                      data-aos="fade"
                    >
                      <i className="ri-facebook-circle-fill footer--social-icon candidate"></i>
                    </div>
                    <a
                      href=""
                      className="footer--social-link candidate"
                      data-aos="fade"
                    >
                      Facebook
                    </a>
                  </div>
                  <div className="footer--social-area">
                    <div
                      className="footer--social-icon-area candidate"
                      data-aos="fade"
                    >
                      <i className="ri-instagram-fill footer--social-icon candidate"></i>
                    </div>
                    <a
                      href=""
                      className="footer--social-link candidate"
                      data-aos="fade"
                    >
                      Instagram
                    </a>
                  </div>
                  <div className="footer--social-area">
                    <div
                      className="footer--social-icon-area candidate"
                      data-aos="fade"
                    >
                      <i className="ri-twitter-x-fill footer--social-icon footer-twitter candidate"></i>
                    </div>
                    <a
                      href=""
                      className="footer--social-link candidate"
                      data-aos="fade"
                    >
                      Twitter
                    </a>
                  </div>
                  <div className="footer--social-area">
                    <div
                      className="footer--social-icon-area candidate"
                      data-aos="fade"
                    >
                      <i className="ri-linkedin-fill footer--social-icon footer-twitter candidate"></i>
                    </div>
                    <a
                      href=""
                      className="footer--social-link candidate"
                      data-aos="fade"
                    >
                      Linkedin
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className='footer--link-section2'>
                            <div className="row">
                                <div className="col-12 col-lg-3 col-md-6 col-sm-6 footer--quick-link-area">
                                    <div className="footer--link-area">
                                        <h6 className='footer--link-head candidate pb-4' data-aos="fade">
                                            Popular Job
                                        </h6>
                                        <div className="footer--links candidate">
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
                                        <h6 className='footer--link-head candidate pb-4' data-aos="fade">
                                            Popular Remote job
                                        </h6>
                                        <div className="footer--links candidate">
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
                                        <h6 className='footer--link-head candidate pb-4' data-aos="fade">
                                            Popular job location
                                        </h6>
                                        <div className="footer--links candidate">
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
                                        <h6 className='footer--link-head candidate pb-4' data-aos="fade">
                                            Popular Resources
                                        </h6>
                                        <div className="footer--links candidate">
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
        <div className="footer--bottom-text-area candidate" data-aos="fade-up">
          SKILLETY
        </div>
        <div className="sub--footer candidate">
          <div className="container-fluid">
            <div className="sub--footer-content">
              <span className="footer--copyright">
                © {currentYear} - Skillety Technologies Private Limited, All
                Rights Reserved.
              </span>
              <div className="footer--bottom-credit-area">
                <span className="footer--cerdit">Designed & Developed by</span>
                <a href="/https://www.prodigit.in/" target="_blank">
                  <img
                    src="assets/img/logo/prodigit-logo.png"
                    className="prodigit--logo"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CandidateFooter;
