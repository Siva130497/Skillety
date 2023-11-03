import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';

const Sidebar = () => {
  useEffect(() => {
    $(document).ready(function () {
      var path = window.location.pathname;

      if (path === '/') {
        $('#dashboard').addClass('active');
      } else if (path === '/my-application') {
        $('#my_application').addClass('active');
      } else if (path === '/search-jobs') {
        $('#search_jobs').addClass('active');
      } else if (path === '/favourite-jobs') {
        $('#favourite_jobs').addClass('active');
      } else if (path === '/events') {
        $('#events').addClass('active');
      } else if (path === '/settings') {
        $('#settings').addClass('active');
      }
    });

  }, []);

  return (
    <div>
      <div className="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <a href=""> <img alt="image" src="assets/img/logo/skillety-logo.png" className="header-logo" /> <span
              className="logo-name">Skillety</span>
            </a>
          </div>
          <ul className="sidebar-menu">
            {/* <li className="menu-header">Main</li> */}
            <li className="dropdown" id="dashboard">
              <a href="/" className="nav-link"><i data-feather="home"></i><span>Dashboard</span></a>
            </li>
            <li className="dropdown" id="my_application">
              <a href="/my-application" className="nav-link"><i data-feather="file-text"></i><span>My Application</span></a>
            </li>
            <li className="dropdown" id="search_jobs">
              <a href="search-jobs" className="nav-link"><i data-feather="briefcase"></i><span>Search Jobs</span></a>
            </li>
            <li className="dropdown" id="favourite_jobs">
              <a href="/favourite-jobs" className="nav-link"><i data-feather="heart"></i><span>Favourite Jobs</span></a>
            </li>

            <div className='hr-line'></div>

            <li className="dropdown" id="events">
              <a href="/events" className="nav-link"><i data-feather="calendar"></i><span>Events</span></a>
            </li>
            <li className="dropdown" id="settings">
              <a href="/settings" className="nav-link"><i data-feather="settings"></i><span>Settings</span></a>
            </li>
          </ul>

          <div className='live-chat-area'>
            <img src="assets/img/home/live-chat.png" className='live-chat-img' alt="" />
            <div className="live-chat-text">
              Have any query ? <br />
              we are there for you 24*7
            </div>

            <button className="live-chat-btn">Live Chat Support</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Sidebar