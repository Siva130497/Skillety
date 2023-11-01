import React from 'react'

const Sidebar = () => {
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
            <li className="dropdown active">
              <a href="" className="nav-link"><i data-feather="home"></i><span>Dashboard</span></a>
            </li>
            <li className="dropdown">
              <a href="" className="nav-link"><i data-feather="file-text"></i><span>My Application</span></a>
            </li>
            <li className="dropdown">
              <a href="" className="nav-link"><i data-feather="briefcase"></i><span>Search Jobs</span></a>
            </li>
            <li className="dropdown">
              <a href="" className="nav-link"><i data-feather="heart"></i><span>Favourite Jobs</span></a>
            </li>

            <div className='hr-line'></div>

            <li className="dropdown">
              <a href="" className="nav-link"><i data-feather="calendar"></i><span>Events</span></a>
            </li>
            <li className="dropdown">
              <a href="" className="nav-link"><i data-feather="settings"></i><span>Settings</span></a>
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