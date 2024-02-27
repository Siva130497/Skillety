import { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NewNav = ({homeActive, aboutUsActive, searchCVActive, serviceActive, RPOActive, contactActive, postJobActive}) => {
    const {getProtectedData} = useContext(AuthContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');

    const clientToken = JSON.parse(localStorage.getItem('clientToken'));

    useEffect(() => {
        if(clientToken){
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(clientToken);
                    console.log(userData);
                    setUserName(userData.name);
                } catch (error) {
                    console.error(error);
                }
            };
    
            fetchData();
        }
    }, [clientToken]);

    useEffect(() => {
        $(document).ready(function () {
            $('.scroll-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 100);
            });
        });
    }, []);
    
    const extractLastName = () => {
        const nameParts = userName.split(' ');
    
        if (nameParts.length > 1) {
          return nameParts[nameParts.length - 1];
        } else {
          return userName; 
        }
    };

    return (
        <header id="header" className="fixed--top client">
            <div className="container-fluid d-flex align-items-center justify-content-between ps-0 custom-right-nav-padding">

                <div>
                    <div className='logo--area me-auto'>
                        <div className='logo--subarea'>
                            <a href="/">
                                <img className='nav--logo' src="../assets/img/logo/skillety-logo-sm.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="switches-container">
                    <input
                        type="radio"
                        id="switchTalent"
                        name="switchPlan"
                        value="Talent"
                        onChange={() => navigate("/candidate-home")}
                    />
                    <input
                        type="radio"
                        id="switchEmployer"
                        name="switchPlan"
                        value="Employer"
                        checked
                    />
                    <label htmlFor="switchTalent" className='scroll-to-top'>Talent</label>
                    <label htmlFor="switchEmployer" className='scroll-to-top'>Employer</label>
                    <div className="switch-wrapper">
                        <div className="switch">
                            <div>Talent</div>
                            <div>Employer</div>
                        </div>
                    </div>
                </div>

                <nav id="navbar" className="navbar client navbar-expand-lg">
                    <ul>
                        {/* <li><div><a href="/" className={homeActive ? "nav-link scrollto active" : "nav-link scrollto"}>Home</a></div></li> */}
                        <li><a href={clientToken? `/post-job-web/${clientToken}` : "/client-login"} className={postJobActive ? "nav-link scrollto active" : "nav-link scrollto"}>Post Job</a></li>
                        <li><a href="/talent-profile-search" className={searchCVActive ? "nav-link scrollto active" : "nav-link scrollto"}>Search CV</a></li>
                        <li className="dropdown"><a href="#" className={serviceActive ? "nav-link scrollto active" : "nav-link scrollto"}><span>Services</span> <i className="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="/cv-sourcing">CV Sourcing</a></li>
                                {/* <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="#">Deep Drop Down 1</a></li>
                                        <li><a href="#">Deep Drop Down 2</a></li>
                                        <li><a href="#">Deep Drop Down 3</a></li>
                                        <li><a href="#">Deep Drop Down 4</a></li>
                                        <li><a href="#">Deep Drop Down 5</a></li>
                                    </ul>
                                </li> */}
                                <li><a href="/job-posting">Job Posting</a></li>
                                <li><a href="/skill-assessment">Skill Assessment</a></li>
                                <li><a href="/interview-as-a-service">Interview as a Service</a></li>
                                {/* <li><a href="/onboarding-process">Onboarding Process</a></li> */}
                                <li><a href="/background-verification">Background Verification</a></li>
                                {/* <li><a href="/rpo">RPO</a></li> */}
                            </ul>
                        </li>
                        <li><a href="/about-us" className={aboutUsActive ? "nav-link scrollto active" : "nav-link scrollto"}>About Us</a></li>
                        {/* <li><a className={RPOActive ? "nav-link scrollto active" : "nav-link scrollto"} href="/rpo">RPO</a></li> */}
                        <li><a className={contactActive ? "nav-link scrollto active" : "nav-link scrollto"} href="/contact-us">Contact Us</a></li>
                        {userName ? 
                            <li className="dropdown"><a href='#'><span>{extractLastName()}</span><i className="bi bi-chevron-down"></i></a>
                                <ul className='loged-in'>
                                    <li><a href={`https://skillety-dashboard-tk2y.onrender.com/client-dashboard/${clientToken}`} target='_blank'>Dash Board</a></li>
                                    <li onClick={()=>{
                                        localStorage.removeItem("clientToken");
                                        // window.location.reload();
                                        navigate("/client-login")
                                    }}><a href='#'>Logout</a></li>
                                </ul>
                            </li> : 
                            <li><a className="nav-link scrollto login--btn client" href="/client-login"><i class='bx bx-log-in-circle login--icon me-2'></i>Login</a></li>
                        }
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
        </header>
    )
}

export default NewNav