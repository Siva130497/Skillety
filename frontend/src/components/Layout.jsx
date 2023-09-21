import React from 'react'
// import NavBar from './NavBar'
// import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import $ from 'jquery';
import NewNav from './NewNav';
import NewNavBar from './NewNavBar';

import './main.js'

const Layout = ({ newNavBarClientRegister, newNavBarClientLogin, newNavBarCandidateLogin, newNavBarCandidateRegister, newNavBarAdminLogin, newNavBarRecruiterLogin }) => {
  useEffect(() => {
    const select = (el, all = false) => {
      if (all) {
        return $(el);
      } else {
        return $(el).first();
      }
    };
    

    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }

    window.addEventListener('load', () => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView();
        }
      }
    });

    $(document).on('click', '.scrollto', function (e) {
      e.preventDefault();
      let navbar = $('#navbar');
      if (navbar.hasClass('navbar-mobile')) {
        navbar.removeClass('navbar-mobile');
        let navbarToggle = $('.mobile-nav-toggle');
        navbarToggle.toggleClass('bi-list');
        navbarToggle.toggleClass('bi-x');
      }
      let target = $(this).attr('href');
      if (target) {
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 1000);
      }
    });

    

  }, []);

  return (
    <>
      {newNavBarClientRegister ? <NewNavBar clientLogin = {true} />: newNavBarClientLogin ? <NewNavBar clientRegister = {true} />: newNavBarCandidateLogin ? <NewNavBar candidateRegister = {true} /> : newNavBarAdminLogin ? <NewNavBar /> : newNavBarRecruiterLogin ? <NewNavBar /> : newNavBarCandidateRegister ? <NewNavBar candidateLogin ={true}/> : <NewNav />}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* <div className='container-fluid'>{children}</div> */}
      {/* <div id="preloader"></div> */}
      
    </>

  )
}


// ReactDOM.render(<App />, document.getElementById('root'));
export default Layout;