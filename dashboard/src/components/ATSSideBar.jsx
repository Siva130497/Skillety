import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import $ from 'jquery';
import feather from 'feather-icons';
import AuthContext from '../context/AuthContext';

const ATSSideBar = () => {
    const [staffToken, setStaffToken] = useState("");
    const {getProtectedData} = useContext(AuthContext);
    const [role, setRole] = useState("");

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        $(document).ready(function () {
            var path = window.location.pathname;

            if (path === `/recruiter-dashboard/${staffToken}`) {
                $('#recruiter_dashboard').addClass('active');
            } else if (path === '/all-clients') {
                $('#all_clients').addClass('active');
            } else if (path === '/all-candidates') {
                $('#all_candidates').addClass('active');
            } else if (path === '/all-jobs') {
                $('#all_jobs').addClass('active');
            } else if (path === '/non-approval-jobs') {
                $('#non_approval_jobs').addClass('active');
            } else if (path === '/posted-jobs') {
                $('#posted_jobs').addClass('active');
            } else if (path === '/job-posting') {
                $('#job_posting').addClass('active');
            } else if (path === '/event-posting') {
                $('#event_posting').addClass('active');
            } else if (path === '/client-contact-message') {
                $('#contact-message-client').addClass('active');
                $('#contact-message').addClass('active');
            } else if (path === '/candidate-contact-message') {
                $('#contact-message-candidate').addClass('active');
                $('#contact-message').addClass('active');
            } else if (path === '/enquiry-details') {
                $('#enquiry_details').addClass('active');
            } else if (path === '/posted-events') {
                $('#posted_events').addClass('active');
            } else if (path === '/chat') {
                $('#chat').addClass('active');
            }

            feather.replace();
        });

    }, [staffToken]);

    useEffect(() => {
        if(staffToken){
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(staffToken);
                    console.log(userData);
                    setRole(userData.id);
                } catch (error) {
                    console.log(error)
                }
            };
    
            fetchData();
        }
    }, [staffToken]);

    return (
        <div>
            <div className="main-sidebar client sidebar-style-2">
                <aside id="sidebar-wrapper">
                    <div className="sidebar-brand">
                        <a href={`/recruiter-dashboard/${staffToken}`}> <img alt="image" src="../assets/img/logo/skillety-logo.png" className="header-logo" /> <span
                            className="logo-name">Skillety</span>
                        </a>
                    </div>
                    <ul className="sidebar-menu client">
                        {/* <li className="menu-header">Main</li> */}
                        <li className="dropdown" id='recruiter_dashboard'>
                            <a href={`/recruiter-dashboard/${staffToken}`} className="nav-link"><i data-feather="home"></i><span>Dashboard</span></a>
                        </li>
                        {role === "Admin" && <li className="dropdown" id='all_clients'>
                            <a href="" className="nav-link"><i data-feather="user"></i><span>Company Staff</span></a>
                        </li>}
                        <li className="dropdown" id='all_clients'>
                            <a href="/all-clients" className="nav-link"><i data-feather="user"></i><span>All Clients</span></a>
                        </li>
                        <li className="dropdown" id='all_candidates'>
                            <a href="/all-candidates" className="nav-link"><i data-feather="users"></i><span>All Candidates</span></a>
                        </li>
                        <li className="dropdown" id='all_jobs'>
                            <a href="/all-jobs" className="nav-link"><i data-feather="briefcase"></i><span>All Jobs</span></a>
                        </li>
                        <li className="dropdown" id='non_approval_jobs'>
                            <a href="/non-approval-jobs" className="nav-link"><i data-feather="briefcase"></i><span>Non Approval Jobs</span></a>
                        </li>
                        <li className="dropdown" id='posted_jobs'>
                            <a href="/posted-jobs" className="nav-link"><i data-feather="mail"></i><span>Posted Jobs</span></a>
                        </li>
                        <li className="dropdown" id='job_posting'>
                            <a href="/job-posting" className="nav-link"><i data-feather="share"></i><span>Job Posting</span></a>
                        </li>
                        <li className="dropdown" id='event_posting'>
                            <a href="/event-posting" className="nav-link"><i data-feather="calendar"></i><span>Event Posting</span></a>
                        </li>

                        <div className='hr-line'></div>

                        <li className="dropdown" id='contact-message'>
                            <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="message-circle"></i><span>Contact Messages</span></a>
                            <ul className="dropdown-menu">
                                <li id='contact-message-client'><a className="nav-link" href="/client-contact-message">Client Contact</a></li>
                                <li id='contact-message-candidate'><a className="nav-link" href="/candidate-contact-message">Candidate Contact</a></li>
                            </ul>
                        </li>

                        <li className="dropdown" id='enquiry_details'>
                            <a href="/enquiry-details" className="nav-link"><i data-feather="message-square"></i><span>Enquiry Details</span></a>
                        </li>
                        <li className="dropdown" id='posted_events'>
                            <a href="/posted-events" className="nav-link"><i data-feather="calendar"></i><span>Posted Events</span></a>
                        </li>
                        <li className="dropdown" id='chat'>
                            <a href="/chat" className="nav-link"><i data-feather="send"></i><span>Chat</span></a>
                        </li>
                    </ul>

                    {/* <div className='live-chat-area'>
                        <img src="../assets/img/home/upgrade-img.png" className='live-chat-img' alt="" />
                        <div className="live-chat-text">
                            Upgrade to Pro <br />
                            for Premium Features
                        </div>

                        <button className="live-chat-btn client">Upgrade Package</button>
                    </div> */}
                </aside>
            </div>
        </div>
    )
}

export default ATSSideBar