import React from 'react'
import { Link } from 'react-router-dom'

const NewNavBar = ({ clientRegister, candidateRegister, clientLogin, candidateLogin }) => {
    return (
        <header id="clientheader" className="fixed--top">
            <div className="container-fluid d-flex align-items-center justify-content-between ps-0 custom-right-nav-padding">

                <div>
                    <div className='logo--area client me-auto'>
                        <div className='logo--subarea'>
                            <a href="/">
                                <img className='nav--logo client' src="assets/img/logo/skillety-logo-sm.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>


                {/* <nav id="navbar" className="navbar">
                    <ul>
                        {clientRegister ?
                            <li><Link to="/client-register" className="nav-link">Register</Link></li> :
                            candidateRegister ? <li><Link to="/candiate-register" className="nav-link">Register</Link></li> :

                            clientLogin ? <li><Link to="/client-login" className="nav-link">Login</Link></li> :
                            candidateLogin ? <li><Link to="/candidate-login" className="nav-link">Login</Link></li> : null

                        }

                    </ul>
                </nav> */}

                <div className="nav--client-login-btn-area">
                    {clientRegister ?
                        <Link to="/client-signup" className='nav--client-login-btn'>Register</Link> :
                        candidateRegister ?
                            <Link to="/candiate-register" className='nav--client-login-btn'>Register</Link> :
                            clientLogin ?
                                <Link to="/client-login" className='nav--client-login-btn'>Login</Link> :
                                candidateLogin ?
                                    <Link to="/candidate-login" className='nav--client-login-btn'>Login</Link> : null
                    }
                </div>
            </div>
        </header>
    )
}

export default NewNavBar