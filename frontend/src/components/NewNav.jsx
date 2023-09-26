import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const NewNav = () => {
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
                        onChange={()=>navigate("/candidate-home")}
                    />
                    <input
                        type="radio"
                        id="switchEmployer"
                        name="switchPlan"
                        value="Employer"
                        checked
                    />
                    <label htmlFor="switchTalent">Talent</label>
                    <label htmlFor="switchEmployer">Employer</label>
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
                        <li><a href="/talent-profile-search" className="nav-link scrollto">Talents</a></li>
                        <li className="dropdown"><a href="#"><span>Services</span> <i className="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="/services">Service 1</a></li>
                                {/* <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="#">Deep Drop Down 1</a></li>
                                        <li><a href="#">Deep Drop Down 2</a></li>
                                        <li><a href="#">Deep Drop Down 3</a></li>
                                        <li><a href="#">Deep Drop Down 4</a></li>
                                        <li><a href="#">Deep Drop Down 5</a></li>
                                    </ul>
                                </li> */}
                                <li><a href="#">Service 2</a></li>
                                <li><a href="#">Service 3</a></li>
                                <li><a href="#">Service 4</a></li>
                            </ul>
                        </li>
                        <li><a className="nav-link scrollto" href="/rpo">RPO</a></li>
                        <li><a className="nav-link scrollto" href="/contact-us">Contact</a></li>
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
        </header>
    )
}

export default NewNav