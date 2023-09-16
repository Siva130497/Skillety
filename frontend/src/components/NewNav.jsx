import React from 'react'
import { Link } from 'react-router-dom'

const NewNav = () => {
  return (
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

                <nav id="navbar" className="navbar">
                    <ul>
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to="/about-us" className="nav-link">About Us</Link></li>
                        <li><Link to="/talents" className="nav-link">Talents</Link></li>
                        <li className="dropdown"><Link to="#"><span>Services</span> <i className="bi bi-chevron-down"></i></Link>
                            <ul>
                                <li><Link to="#">Service 1</Link></li>
                                <li><Link to="#">Service 2</Link></li>
                                <li><Link to="#">Service 3</Link></li>
                                <li><Link to="#">Service 4</Link></li>
                            </ul>
                        </li>
                        <li><Link className="nav-link" to="/rpo">RPO</Link></li>
                        <li><Link className="nav-link" to="/contact">Contact</Link></li>
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>
                
            </div>
        </header>
  )
}

export default NewNav