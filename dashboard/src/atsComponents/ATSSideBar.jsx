import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import $ from 'jquery';
import feather from 'feather-icons';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const ATSSideBar = () => {
    const [atsToken, setatsToken] = useState("");
    const { getProtectedData } = useContext(AuthContext);
    const [role, setRole] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    useEffect(() => {
        setatsToken(JSON.parse(localStorage.getItem('atsToken')))
    }, [atsToken])

    useEffect(() => {
        $(document).ready(function () {
            var path = window.location.pathname;

            if (path === `/ats-dashboard/${atsToken}`) {
                $('#ats_dashboard').addClass('active');
            } else if (path === '/all-ats-staff') {
                $('#all-ats-staff').addClass('active');
            } else if (path === '/all-offline-clients') {
                $('#all_offline_clients').addClass('active');
            } else if (path === '/all-ats-jobs') {
                $('#all_ats_jobs').addClass('active');
            } else if (path === '/all-offline-candidates') {
                $('#all_offline_candidates').addClass('active');
            }
            feather.replace();
        });

    }, [atsToken, role]);

    const getAnIndividualAtsStaff = async () => {
        try {
            const res = await axios.get(`https://skillety-n6r1.onrender.com/ats-staff/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                //   setRole(result.atsStaff);

            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (atsToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(atsToken);
                    console.log(userData);
                    setEmployeeId(userData.id);
                    setRole(userData.role);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
        }
    }, [atsToken]);

    useEffect(() => {
        if (employeeId) {
            getAnIndividualAtsStaff();
        }
    }, [employeeId])

    return (
        <div className="main-sidebar recruiter client sidebar-style-2">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <a href={`/ats-dashboard/${atsToken}`}> <img alt="image" src="../assets/img/logo/skillety-logo.png" className="header-logo" /> <span
                        className="logo-name">Skillety</span>
                    </a>
                </div>
                <ul className="sidebar-menu client">
                    {/* <li className="menu-header">Main</li> */}
                    <li className="dropdown" id='ats_dashboard'>
                        <a href={`/ats-dashboard/${atsToken}`} className="nav-link"><i data-feather="home"></i><span>Dashboard</span></a>
                    </li>
                     <li className="dropdown" id='all-ats-staff'>
                        {role === "Super-Admin"&& <a href="/all-company-staff-ats" className="nav-link"><i data-feather="user-check"></i><span>ATS Staffs</span></a>}
                    </li>
                    {/* {role === "Admin" && <li className="dropdown" id='company-staff-create'>
                            <a href="/company-staff-create" className="nav-link"><i data-feather="user"></i><span>Company Staff Create</span></a>
                        </li>} */}
                    <li className="dropdown" id='all_offline_clients'>
                        <a href="/all-offline-clients" className="nav-link"><i data-feather="user"></i><span>All Clients</span></a>
                    </li>
                    <li className="dropdown" id='all_ats_jobs'>
                        <a href="/all-ats-jobs" className="nav-link"><i data-feather="mail"></i><span>All Jobs</span></a>
                    </li>
                    <li className="dropdown" id='all_offline_candidates'>
                        <a href="/all-offline-candidates" className="nav-link"><i data-feather="users"></i><span>All Candidates</span></a>
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