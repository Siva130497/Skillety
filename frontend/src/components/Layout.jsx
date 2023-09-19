import React from 'react'
// import NavBar from './NavBar'
// import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import $ from 'jquery';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NewNav from './NewNav';
import NewNavBar from './NewNavBar';


const Layout = ({ newNavBarClientRegister, newNavBarClientLogin, newNavBarCandidateLogin, newNavBarCandidateRegister }) => {
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
      {newNavBarClientRegister ? <NewNavBar clientLogin={true} /> : newNavBarClientLogin ? <NewNavBar clientRegister={true} /> : newNavBarCandidateLogin ? <NewNavBar candidateRegister={true} /> : newNavBarCandidateRegister ? <NewNavBar /> : <NewNav />}
      {/* <div className='container-fluid'>{children}</div> */}
      {/* <div id="preloader"></div> */}
      <div id="preloader"></div>
      <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
        <i class="bi bi-chevron-up back-to-top-icon"></i>
      </a>

    </>

  )
}


// ReactDOM.render(<App />, document.getElementById('root'));
export default Layout;