import { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NewNav = () => {
    const {getProtectedData} = useContext(AuthContext);

    const [userName, setUserName] = useState('');

    const clientToken = JSON.parse(localStorage.getItem('clientToken'));

    useEffect(() => {
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
    }, [clientToken]);

    useEffect(() => {
        $(document).ready(function () {
            $('.scroll-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 100); // Adjust the speed (in milliseconds) as needed
            });
        });
    }, []);
    const navigate = useNavigate();

    return (
        <header id="header" className="fixed--top">
            <div className="container-fluid d-flex align-items-center justify-content-between ps-0 custom-right-nav-padding">

                <div>
                    <div className='logo--area me-auto'>
                        <div className='logo--subarea'>
                            <a href="/">
                                <img className='nav--logo' src="assets/img/logo/skillety-logo-sm.png" alt="" />
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

                <nav id="navbar" className="navbar navbar-expand-lg">
                    <ul>
                        <li><div><a href="/" className="nav-link scrollto active">Home</a></div></li>
                        <li><a href="/about-us" className="nav-link scrollto">About Us</a></li>
                        <li><a href="/talent-profile-search" className="nav-link scrollto">Search CV</a></li>
                        <li className="dropdown"><a href="/services"><span>Services</span> <i className="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="/services">CV Sourcing</a></li>
                                {/* <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="#">Deep Drop Down 1</a></li>
                                        <li><a href="#">Deep Drop Down 2</a></li>
                                        <li><a href="#">Deep Drop Down 3</a></li>
                                        <li><a href="#">Deep Drop Down 4</a></li>
                                        <li><a href="#">Deep Drop Down 5</a></li>
                                    </ul>
                                </li> */}
                                <li><a href="/services">Job Posting</a></li>
                                <li><a href="/services">Skill Assessment</a></li>
                                <li><a href="/services">Interview as a Service</a></li>
                                <li><a href="/services">Onboarding Process</a></li>
                                <li><a href="/services">Background Verification</a></li>
                            </ul>
                        </li>
                        <li><a className="nav-link scrollto" href="/rpo">RPO</a></li>
                        <li><a className="nav-link scrollto" href="/contact-us">Contact</a></li>
                        {userName ? 
                            <li className="dropdown"><a href='#'><span>{userName}</span><i className="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li><a href="/client-dashboard">Dash Board</a></li>
                                    <li onClick={()=>{
                                        localStorage.removeItem("clientToken");
                                        window.location.reload();
                                    }}><a href='#'>Logout</a></li>
                                </ul>
                            </li> : 
                            <li><a className="nav-link scrollto" href="/client-login">Login</a></li>
                        }
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
        </header>
    )
}

export default NewNav