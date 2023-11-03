import React from 'react'
import { useParams } from 'react-router-dom'

const ClientSidebar = ({dashBoard, searchCv, manageApp, postJob, manageJob, service, report}) => {
    const {token} = useParams()
    return (
        <div>
            <div className="main-sidebar client sidebar-style-2">
                <aside id="sidebar-wrapper">
                    <div className="sidebar-brand">
                        <a href=""> <img alt="image" src="../assets/img/logo/skillety-logo.png" className="header-logo" /> <span
                            className="logo-name">Skillety</span>
                        </a>
                    </div>
                    <ul className="sidebar-menu client">
                        {/* <li className="menu-header">Main</li> */}
                        <li className={dashBoard ? "dropdown active" : "dropdown"}>
                            <a href={`/client-dashboard/${token}`}className="nav-link"><i data-feather="home"></i><span>Dashboard</span></a>
                        </li>
                        <li className={searchCv ? "dropdown active" : "dropdown"}>
                            <a href={`/talent-profile-search/${token}`} className="nav-link"><i data-feather="search"></i><span>Search Candidates</span></a>
                        </li>
                        <li className={manageApp ? "dropdown active" : "dropdown"}>
                            <a href="" className="nav-link"><i data-feather="file"></i><span>Manage Applications</span></a>
                        </li>
                        <li className={postJob ? "dropdown active" : "dropdown"}>
                            <a href="" className="nav-link"><i data-feather="briefcase"></i><span>Post a Job</span></a>
                        </li>

                        <li className={manageJob ? "dropdown active" : "dropdown"}>
                            <a href="" className="nav-link"><i data-feather="sliders"></i><span>Manage Jobs</span></a>
                        </li>

                        <li className={service ? "dropdown active" : "dropdown"}>
                            <a href="" className="nav-link"><i data-feather="tool"></i><span>Services</span></a>
                        </li>

                        <div className='hr-line'></div>

                        <li className={report ? "dropdown active" : "dropdown"}>
                            <a href="" className="nav-link"><i data-feather="file-text"></i><span>Reports</span></a>
                        </li>
                        <li className="dropdown">
                            <a href="" className="nav-link"><i data-feather="dollar-sign"></i><span>Invoices& Payment</span></a>
                        </li>
                        <li className="dropdown">
                            <a href="" className="nav-link"><i data-feather="phone"></i><span>Contact Support</span></a>
                        </li>
                        <li className="dropdown">
                            <a href="" className="nav-link"><i data-feather="settings"></i><span>Settings</span></a>
                        </li>
                    </ul>

                    <div className='live-chat-area'>
                        <img src="assets/img/home/upgrade-img.png" className='live-chat-img' alt="" />
                        <div className="live-chat-text">
                            Upgrade to Pro <br />
                            for Premium Features
                        </div>

                        <button className="live-chat-btn client">Upgrade Package</button>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default ClientSidebar