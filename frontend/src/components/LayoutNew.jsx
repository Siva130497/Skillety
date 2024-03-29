import React from 'react';
import { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NewNavCandidateHome } from './NewNavCandidateHome';
import { useNavigate } from 'react-router-dom';
import RandomChat from './RandomChat';

const LayoutNew = ({ home, aboutUs, searchJob, events, contact }) => {

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

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
    const handleMobileNavToggle = () => {
      $('#navbar').toggleClass('navbar-mobile');
      $('.mobile-nav-toggle').toggleClass('bi-list bi-x');
    };


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
      }, 500);
    }

    ////////
    const myCursor = $('.mouseCursor'); // Select elements using jQuery

    if (myCursor.length) {
      const e = document.querySelector('.cursor-inner');
      const t = document.querySelector('.cursor-outer');
      let n, i = 0, o = false;

      // Handle mousemove event
      window.onmousemove = function (s) {
        if (!o) {
          t.style.transform = `translate(${s.clientX}px, ${s.clientY}px)`;
          e.style.transform = `translate(${s.clientX}px, ${s.clientY}px)`;
          n = s.clientY;
          i = s.clientX;
        }
      };

      // Handle mouseenter and mouseleave events
      $('body').on('mouseenter', 'button, a, .cursor-pointer', function () {
        e.classList.add('cursor-hover');
        t.classList.add('cursor-hover');
      });

      $('body').on('mouseleave', 'button, a, .cursor-pointer', function () {
        if (
          $(this).is('a, button') &&
          $(this).closest('.cursor-pointer').length === 0
        ) {
          e.classList.remove('cursor-hover');
          t.classList.remove('cursor-hover');
        }
      });

      e.style.visibility = 'visible';
      t.style.visibility = 'visible';
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

    $('.mobile-nav-toggle').on('click', handleMobileNavToggle);

    return () => {
      $('.mobile-nav-toggle').off('click', handleMobileNavToggle);
    };

  }, []);

  return (
    <div>
      <NewNavCandidateHome homeActive={home} aboutUsActive={aboutUs} searchJobActive={searchJob} eventsActive={events} contactActive={contact} />
      {/* <div id="preloader"></div> */}

      <div className="mouseCursor cursor-outer"></div>
      <div className="mouseCursor cursor-inner"></div>
      <div id="preloader" className='candidate'></div>

      {/* <button className="go-back-button" onClick={handleBackButtonClick}>
        <i className="bi bi-arrow-left go-back-icon mr-2"></i>
        <span>Back</span>
      </button> */}

      {/* {!(window.location.pathname === '/candidate-login' || window.location.pathname === '/candiate-register' || window.location.pathname === '/forgot-password/Candidate') && */}
      {!(window.location.pathname === '/') &&
        <button className="go-back-button-style-2" onClick={handleBackButtonClick}>
          <i className="bi bi-chevron-double-left"></i>
          <span>Back</span>
        </button>
      }

      {/* {!(window.location.pathname === '/candidate-login' || window.location.pathname === '/candiate-register' || window.location.pathname === '/forgot-password/Candidate') && */}
        <RandomChat />
      {/* } */}

      <a href="#" className="back-to-top candidate d-flex align-items-center justify-content-center">
        <i className="bi bi-chevron-double-up back-to-top-icon"></i>
      </a>
    </div>
  )
}

export default LayoutNew