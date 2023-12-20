import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import $ from 'jquery';
import feather from 'feather-icons';
import AuthContext from '../context/AuthContext';

const ATSSideBar = () => {
    const [staffToken, setStaffToken] = useState("");
    const { getProtectedData } = useContext(AuthContext);
    const [role, setRole] = useState("");

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        $(document).ready(function () {
            var path = window.location.pathname;

            if (path === `/recruiter-dashboard/${staffToken}`) {
                $('#recruiter_dashboard').addClass('active');
            } else if (path === '/all-company-staff') {
                $('#all-company-staff').addClass('active');
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
            } else if (path === '/media-posting/event') {
                $('#media_posting').addClass('active');
                $('#event_posting').addClass('active');
            } else if (path === '/media-posting/blog') {
                $('#media_posting').addClass('active');
                $('#blog_posting').addClass('active');
            } else if (path === '/media-posting/video') {
                $('#media_posting').addClass('active');
                $('#video_posting').addClass('active');
            } else if (path === '/media-posting/news') {
                $('#media_posting').addClass('active');
                $('#news_posting').addClass('active');
            } else if (path === '/media-posting/podcast') {
                $('#media_posting').addClass('active');
                $('#podcast_posting').addClass('active');
            } else if (path === '/client-contact-message') {
                $('#contact-message-client').addClass('active');
                $('#contact-message').addClass('active');
            } else if (path === '/candidate-contact-message') {
                $('#contact-message-candidate').addClass('active');
                $('#contact-message').addClass('active');
            } else if (path === '/enquiry-details') {
                $('#enquiry_details').addClass('active');
            } else if (path === '/posted-media/event') {
                $('#posted_media').addClass('active');
                $('#posted_events').addClass('active');
            } else if (path === '/posted-media/blog') {
                $('#posted_media').addClass('active');
                $('#posted_blogs').addClass('active');
            } else if (path === '/posted-media/video') {
                $('#posted_media').addClass('active');
                $('#posted_videos').addClass('active');
            } else if (path === '/posted-media/news') {
                $('#posted_media').addClass('active');
                $('#posted_news').addClass('active');
            } else if (path === '/posted-media/podcast') {
                $('#posted_media').addClass('active');
                $('#posted_podcasts').addClass('active');
            } else if (path === '/chat-client') {
                $('#chat').addClass('active');
                $('#chat_client').addClass('active');
            } else if (path === '/chat-candidate') {
                $('#chat').addClass('active');
                $('#chat_candidate').addClass('active');
            }

            feather.replace();
        });

    }, [staffToken, role]);

    useEffect(() => {
        if (staffToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(staffToken);
                    console.log(userData);
                    setRole(userData.role);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
        }
    }, [staffToken]);

    return (
        <div className="main-sidebar recruiter client sidebar-style-2">
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
                    {role === "Admin" && <li className="dropdown" id='all-company-staff'>
                        <a href="/all-company-staff" className="nav-link"><i data-feather="user-check"></i><span>Company Staffs</span></a>
                    </li>}
                    {/* {role === "Admin" && <li className="dropdown" id='company-staff-create'>
                            <a href="/company-staff-create" className="nav-link"><i data-feather="user"></i><span>Company Staff Create</span></a>
                        </li>} */}
                    <li className="dropdown" id='all_clients'>
                        <a href="/all-clients" className="nav-link"><i data-feather="user"></i><span>All Clients</span></a>
                    </li>
                    <li className="dropdown" id='all_candidates'>
                        <a href="/all-candidates" className="nav-link"><i data-feather="users"></i><span>All Candidates</span></a>
                    </li>
                    <li className="dropdown" id='search_candidate'>
                        <a href="/talent-profile-search" className="nav-link"><i data-feather="search"></i><span>Search Candidates</span></a>
                    </li>
                    <li className="dropdown" id="search_jobs">
            <a href="/search-jobs" className="nav-link"><i data-feather="briefcase"></i><span>Search Jobs</span></a>
          </li>
                    <li className="dropdown" id='all_jobs'>
                        <a href="/all-jobs" className="nav-link"><i data-feather="briefcase"></i><span>All Jobs</span></a>
                    </li>
                    <li className="dropdown" id='non_approval_jobs'>
                        <a href="/non-approval-jobs" className="nav-link"><i data-feather="alert-circle"></i><span>Non Approval Jobs</span></a>
                    </li>
                    <li className="dropdown" id='posted_jobs'>
                        <a href="/posted-jobs" className="nav-link"><i data-feather="mail"></i><span>Posted Jobs</span></a>
                    </li>
                    <li className="dropdown" id='job_posting'>
                        <a href="/job-posting" className="nav-link"><i data-feather="share"></i><span>Job Posting</span></a>
                    </li>
                    <li className="dropdown" id='media_posting'>
                        <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="video"></i><span>Media Posting</span></a>
                        <ul className="dropdown-menu">
                            <li id='event_posting'><a className="nav-link" href="/media-posting/event">Event Posting</a></li>
                            <li id='blog_posting'><a className="nav-link" href="/media-posting/blog">Blog Posting</a></li>
                            <li id='video_posting'><a className="nav-link" href="/media-posting/video">Video Posting</a></li>
                            <li id='podcast_posting'><a className="nav-link" href="/media-posting/podcast">Podcast Posting</a></li>
                            <li id='news_posting'><a className="nav-link" href="/media-posting/news">News Posting</a></li>
                        </ul>
                    </li>
                    {/* <li className="dropdown" id='event_posting'>
                            <a href="/event-posting" className="nav-link"><i data-feather="calendar"></i><span>Media Posting</span></a>
                        </li> */}

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
                    <li className="dropdown" id='posted_media'>
                        <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="calendar"></i><span>Posted Media</span></a>
                        <ul className="dropdown-menu">
                            <li id='posted_events'><a className="nav-link" href="/posted-media/event">Posted Events</a></li>
                            <li id='posted_blogs'><a className="nav-link" href="/posted-media/blog">Posted Blogs</a></li>
                            <li id='posted_videos'><a className="nav-link" href="/posted-media/video">Posted Videos</a></li>
                            <li id='posted_podcasts'><a className="nav-link" href="/posted-media/podcast">Posted Podcasts</a></li>
                            <li id='posted_news'><a className="nav-link" href="/posted-media/news">Posted News</a></li>
                        </ul>
                    </li>
                    {/* <li className="dropdown" id='posted_events'>
                            <a href="/posted-events" className="nav-link"><i data-feather="calendar"></i><span>Posted Events</span></a>
                        </li> */}
                    <li className="dropdown" id='chat'>
                        <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="send"></i><span>Chat</span></a>
                        <ul className="dropdown-menu">
                            <li id='chat_client'><a className="nav-link" href="/chat-client">Client</a></li>
                            <li id='chat_candidate'><a className="nav-link" href="/chat-candidate">Candidate</a></li>
                        </ul>
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
    )
}

export default ATSSideBar