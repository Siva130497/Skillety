import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const ClientSidebar = () => {
    const [clientToken, setClientToken] = useState("");
    const { getProtectedData, getClientChoosenPlan, packageSelectionDetail } = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState();
    const [sideBar, setSideBar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setClientToken(JSON.parse(localStorage.getItem('clientToken')))
    }, [clientToken])

    useEffect(() => {
        $(document).ready(function () {
            var path = window.location.pathname;

            if (path === `/client-dashboard/${clientToken}`) {
                $('#client_dashboard').addClass('active');
            } else if (path === '/talent-profile-search') {
                $('#search_candidate').addClass('active');
            } else if (path === '/manage-application') {
                $('#manage_application').addClass('active');
            } else if (path === '/post-job') {
                $('#post_job').addClass('active');
            } else if (path === '/manage-job') {
                $('#manage_job').addClass('active');
            } else if (path === '/services') {
                $('#services').addClass('active');
            } else if (path === '/reports') {
                $('#reports').addClass('active');
            } else if (path === '/invoice-payment' || path === '/package-plans') {
                $('#invoice_payment').addClass('active');
            } else if (path === '/contact-support') {
                $('#contact_support').addClass('active');
            } else if (path === '/client-settings') {
                $('#client_settings').addClass('active');
            }
        });

    }, [clientToken, packageSelectionDetail]);

    const getLoginClientDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:5002/client/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setLoginClientDetail(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (clientToken) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(clientToken);
                    console.log(user);
                    setEmployeeId(user.id);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, [clientToken]);

    useEffect(() => {
        if (employeeId) {
            getLoginClientDetail();
        }
    }, [employeeId]);

    useEffect(() => {
        if (loginClientDetail?.companyId) {
            
            const fetchData = async () => {
                try {

                    await getClientChoosenPlan(loginClientDetail?.companyId);

                    
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [loginClientDetail]);

    useEffect(()=>{
        if (packageSelectionDetail ) {
            
            setSideBar(true);
        }

    },[packageSelectionDetail])

    console.log(sideBar)

    return (
        <div>
            <div className="main-sidebar client sidebar-style-2">
                <aside id="sidebar-wrapper">
                    <div className="sidebar-brand">
                        <a href="/client-dashboard/"> <img alt="image" src="../assets/img/logo/skillety-logo.png" className="header-logo" /> <span
                            className="logo-name">Skillety</span>
                        </a>
                    </div>
                    <ul className="sidebar-menu client">
                        {/* <li className="menu-header">Main</li> */}
                        <li className="dropdown" id='client_dashboard'>
                            <a href={`/client-dashboard/${clientToken}`} className="nav-link"><i data-feather="home"></i><span>Dashboard</span></a>
                        </li>
                    </ul>

                    {sideBar && (
                        <ul className="sidebar-menu client">

                            <li className="dropdown" id='search_candidate'>
                                <a href="/talent-profile-search" className="nav-link"><i data-feather="search"></i><span>Search Candidates</span></a>
                            </li>

                            <li className="dropdown" id='post_job'>
                                <a href="/post-job" className="nav-link"><i data-feather="briefcase"></i><span>Post a Job</span></a>
                            </li>

                            <li className="dropdown" id='manage_job'>
                                <a href="/manage-job" className="nav-link"><i data-feather="sliders"></i><span>Manage Jobs</span></a>
                            </li>

                            <div className='hr-line'></div>

                            <li className="dropdown" id='invoice_payment'>
                                <a href="/invoice-payment" className="nav-link"><i data-feather="dollar-sign"></i><span>Invoices& Payment</span></a>
                            </li>

                            <li className="dropdown" id='client_settings'>
                                <a href="/client-settings" className="nav-link"><i data-feather="settings"></i><span>Settings</span></a>
                            </li>
                        </ul>)
                    }

                    <div className='live-chat-area'>
                        <img src="../assets/img/home/upgrade-img.png" className='live-chat-img' alt="" />
                        <div className="live-chat-text">
                            Upgrade to Pro <br />
                            for Premium Features
                        </div>

                        <button className="live-chat-btn client" onClick={() => navigate("/package-plans")}>Upgrade Package</button>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default ClientSidebar