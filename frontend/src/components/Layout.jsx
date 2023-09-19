import React from 'react'
import NavBar from './NavBar'
// import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import $ from 'jquery';
import AOS from 'aos';
import 'aos/dist/aos.css';

// import './main.js'

const Layout = ({ navBar = true, children }) => {
  useEffect(() => {
    ///////////
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return $(el);
      } else {
        return $(el).first();
      }
    };

    ///////////
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all);
      if (selectEl) {
        if (all) {
          selectEl.each(function () {
            $(this).on(type, listener);
          });
        } else {
          selectEl.on(type, listener);
        }
      }
    };

    //////////
    const onscroll = (el, listener) => {
      $(el).on('scroll', listener);
    };

    ////////
    const navbarlinks = $('#navbar .scrollto');
    const navbarlinksActive = () => {
      const position = $(window).scrollTop() + 200;
      navbarlinks.each(function () {
        if (!this.hash) return;
        const section = $(this.hash);
        if (!section.length) return;
        if (position >= section.offset().top && position <= (section.offset().top + section.outerHeight())) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
    };

    $(window).on('load', navbarlinksActive);
    $(window).on('scroll', navbarlinksActive);


    //////////
    const scrollto = (el) => {
      const header = $('#header');
      const offset = header.outerHeight();

      const elementPos = $(el).offset().top;
      $('html, body').animate({
        scrollTop: elementPos - offset
      }, {
        duration: 'slow',
        easing: 'easeInOutCubic'
      });
    };

    /////////
    const selectHeader = $('#header');
    if (selectHeader.length) {
      const headerScrolled = () => {
        if ($(window).scrollTop() > 30) {
          selectHeader.addClass('header-scrolled');
        } else {
          selectHeader.removeClass('header-scrolled');
        }
      };

      $(window).on('load', headerScrolled);
      $(window).on('scroll', headerScrolled);
    }

    //////////
    const backtotop = $('.back-to-top');
    if (backtotop.length) {
      const toggleBacktotop = () => {
        if ($(window).scrollTop() > 100) {
          backtotop.addClass('active');
        } else {
          backtotop.removeClass('active');
        }
      };

      $(window).on('load', toggleBacktotop);
      $(window).on('scroll', toggleBacktotop);
    }


    /////////
    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('#navbar').toggleClass('navbar-mobile');
      $(this).toggleClass('bi-list bi-x');
    });

    ////////
    $(document).on('click', '.navbar .dropdown > a', function (e) {
      if ($('#navbar').hasClass('navbar-mobile')) {
        e.preventDefault();
        $(this).next().toggleClass('dropdown-active');
        $(this).find('i').toggleClass('bi-chevron-down bi-chevron-up');
      }
    });

    ////////
    $(document).on('click', '.scrollto', function (e) {
      if ($(this.hash).length) {
        e.preventDefault();

        const navbar = $('#navbar');
        if (navbar.hasClass('navbar-mobile')) {
          navbar.removeClass('navbar-mobile');
          $('.mobile-nav-toggle').toggleClass('bi-list bi-x');
        }
        scrollto(this.hash);
      }
    });

    ////////
    $(window).on('load', function () {
      if (window.location.hash) {
        if ($(window.location.hash).length) {
          scrollto(window.location.hash);
        }
      }
    });


    ////////
    const preloader = $('#preloader');
    if (preloader.length) {
      setTimeout(function () {
        preloader.fadeOut('slow', function () {
          preloader.remove();
        });
      }, 300);
    }

    ///////
    // $(document).ready(function () {
    //   // Attach a click event handler to the mobile menu toggle icon
    //   $('.mobile-nav-toggle').click(function () {
    //     // Toggle the "open" class on the header to change its style
    //     // $('.fixed--top').toggleClass('opened');
    //     $('.fixed--top').css('backdrop-filter', 'none');

    //     // Toggle the "open" class on the mobile menu to slide it down
    //     // $('.navbar-mobile').toggleClass('open');
    //   });
    // });


    ///////

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });

  }, []);

  return (
    <>
      {navBar && <NavBar />}
      <div>{children}</div>
      <footer className='footer--section'>
        <div className="container-fluid">
          <div className="footer--email-form-section">
            <div className="footer--email-form-card">
              <div className="row footer--custom-row">
                <div className="col-12 col-lg-7">
                  <div className="footer--email-left">
                    <h3 className='footer--email-head' data-aos="fade-left">
                      Get email updates <br />
                      from SKILLETY
                    </h3>
                    <p className='footer--email-desc' data-aos="fade-down">
                      Enter your email below to sign up for our twice weekly newsletter.
                    </p>
                    <form action="">
                      <input type="text" className='form-control footer--email-input' data-aos="fade-up"
                        placeholder='Your email' required />
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
                <div className="col-12 col-lg-5">
                  <div className="footer--logo-area">
                    <img src="assets/img/home-images/skilletty-logo.png" className='footer--logo' alt="" data-aos="zoom-out" />
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
                      <h6 className='footer--link-head' data-aos="fade">
                        For Talent
                      </h6>
                      <div className="footer--links">
                        <ul>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                    <div className="footer--link-area">
                      <h6 className='footer--link-head' data-aos="fade">
                        For Employer
                      </h6>
                      <div className="footer--links">
                        <ul>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-md-4 col-sm-4 footer--quick-link-area">
                    <div className="footer--link-area">
                      <h6 className='footer--link-head' data-aos="fade">
                        Our Company
                      </h6>
                      <div className="footer--links">
                        <ul>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li data-aos="fade-left">
                            <a href="" className='footer--link'>Lorem Ipsum</a>
                          </li>
                          <li data-aos="fade-left">
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
                    <div className="footer--social-icon-area" data-aos="fade-right">
                      <i className="ri-facebook-circle-fill footer--social-icon"></i>
                    </div>
                    <a href='' className='footer--social-link' data-aos="fade-left">Facebook</a>
                  </div>
                  <div className="footer--social-area">
                    <div className="footer--social-icon-area" data-aos="fade-right">
                      <i className="ri-instagram-fill footer--social-icon"></i>
                    </div>
                    <a href='' className='footer--social-link' data-aos="fade-left">Instagram</a>
                  </div>
                  <div className="footer--social-area">
                    <div className="footer--social-icon-area" data-aos="fade-right">
                      <i className="ri-twitter-x-fill footer--social-icon footer-twitter"></i>
                    </div>
                    <a href='' className='footer--social-link' data-aos="fade-left">Twitter</a>
                  </div>
                  <div className="footer--social-area">
                    <div className="footer--social-icon-area" data-aos="fade-right">
                      <i className="ri-linkedin-fill footer--social-icon footer-twitter"></i>
                    </div>
                    <a href='' className='footer--social-link' data-aos="fade-left">Linkedin</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer--link-section2'>
            <div className="row">
              <div className="col-12 col-lg-3 col-md-6 col-sm-6 footer--quick-link-area">
                <div className="footer--link-area">
                  <h6 className='footer--link-head pb-4' data-aos="fade">
                    Popular Job
                  </h6>
                  <div className="footer--links">
                    <ul>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
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
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
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
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
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
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                      <li data-aos="fade-left">
                        <a href="" className='footer--link'>Lorem Ipsum</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer--bottom-text-area" data-aos="fade-up">
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
      <div id="preloader"></div>
      <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-chevron-up back-to-top-icon"></i></a>
    </>

  )
}


// ReactDOM.render(<App />, document.getElementById('root'));
export default Layout;