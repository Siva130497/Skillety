import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import feather from 'feather-icons';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
  const [candidateToken, setCandidateToken] = useState("");
  const { getProtectedData } = useContext(AuthContext);
  useEffect(() => {
    setCandidateToken(JSON.parse(localStorage.getItem('candidateToken')))
  }, [candidateToken])

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const userData = await getProtectedData();
        console.log(userData);
        
        setCandidateToken(userData.userToken);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
},[candidateToken])  

  useEffect(() => {
    $(document).ready(function () {
      var path = window.location.pathname;

      if (path === `/${candidateToken}`) {
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

      feather.replace();
    });

  }, [candidateToken]);

  // console.log(candidateToken);

  return (
    <div className="main-sidebar sidebar-style-2">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href={`/${candidateToken}`}> <img alt="image" src="../assets/img/logo/skillety-logo.png" className="header-logo" /> <span
            className="logo-name">Skillety</span>
          </a>
        </div>
        <ul className="sidebar-menu">
          {/* <li className="menu-header">Main</li> */}
          <li className="dropdown" id="dashboard">
            <a href={`/${candidateToken}`} className="nav-link"><i data-feather="home"></i><span>Dashboard</span></a>
          </li>
          <li className="dropdown" id="my_application">
            <a href="/my-application" className="nav-link"><i data-feather="file-text"></i><span>My Applications</span></a>
          </li>
          <li className="dropdown" id="search_jobs">
            <a href="/search-jobs" className="nav-link"><i data-feather="briefcase"></i><span>Search Jobs</span></a>
          </li>
          {/* <li className="dropdown" id="favourite_jobs">
              <a href="/favourite-jobs" className="nav-link"><i data-feather="heart"></i><span>Favourite Jobs</span></a>
            </li> */}

          <div className='hr-line'></div>

          {/* <li className="dropdown" id="events">
              <a href="/events" className="nav-link"><i data-feather="calendar"></i><span>Events</span></a>
            </li> */}
          <li className="dropdown" id="settings">
            <a href="/settings" className="nav-link"><i data-feather="settings"></i><span>Settings</span></a>
          </li>
        </ul>

        <div className='live-chat-area'>
          <img src="../assets/img/home/live-chat.png" className='live-chat-img' alt="" />
          <div className="live-chat-text">
            Have any query ? <br />
            we are there for you 24*7
          </div>

          <a href="/candidate-chat-support" className="live-chat-btn">Live Chat Support</a>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar