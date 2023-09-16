import React from 'react'
import { Link } from "react-router-dom";

const NavBar = ({ title = "SKILLETY" }) => {

    return (
        // <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        //     <div className="container-fluid">
        //         <Link to="/" className="navbar-brand" >{title}</Link>
        //         <div className="collapse navbar-collapse" id="navbarColor01">
        //             <ul className="navbar-nav ms-auto">
        //                 <li className="nav-item">
        //                     <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
        //                         <button type="button" className="btn btn-primary">Client</button>
        //                         <div className="btn-group" role="group">
        //                             <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
        //                             <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
        //                                 <Link to="/client-register" className="dropdown-item" >Register</Link>
        //                                 <Link to="/client-login" className="dropdown-item" >Login</Link>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </li>
        //                 <li className="nav-item">
        //                     <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
        //                         <button type="button" className="btn btn-primary">Candidate</button>
        //                         <div className="btn-group" role="group">
        //                             <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
        //                             <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
        //                                 <Link to="/candiate-register" className="dropdown-item" >Register</Link>
        //                                 <Link to="/candidate-login" className="dropdown-item" >Login</Link>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
        <header id="header" className="fixed-top">
            <div className="container-fluid d-flex align-items-center">

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
                    <input type="radio" id="switchTalent" name="switchPlan" value="Talent" />
                    <input type="radio" id="switchEmployer" name="switchPlan" value="Employer" checked="checked" />
                    <label for="switchTalent">Talent</label>
                    <label for="switchEmployer">Employer</label>
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
                        <li><a href="/talents" className="nav-link scrollto">Talents</a></li>
                        <li className="dropdown"><a href="#"><span>Services</span> <i className="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="#">Service 1</a></li>
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
                        <li><a className="nav-link   scrollto" href="/rpo">RPO</a></li>
                        <li><a className="nav-link scrollto" href="/contact">Contact</a></li>
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
        </header>

    )
}

export default NavBar;