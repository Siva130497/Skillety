import React from 'react'
import { Link } from 'react-router-dom'

const NewNavBar = ({ clientRegister, candidateRegister, clientLogin, candidateLogin }) => {
    return (
        <header id="clientheader" className="fixed--top">
            <div className="container-fluid d-flex align-items-center justify-content-between ps-0 custom-right-nav-padding">

                <div>

                    {clientRegister ?
                        <div className='logo--area client me-auto'>
                            <div className='logo--subarea'>
                                <a href="/">
                                    <img className='nav--logo client' src="../assets/img/logo/skillety-logo-sm.png" alt="" />
                                </a>
                            </div>
                        </div> :
                        clientLogin ?
                            <div className='logo--area client me-auto'>
                                <div className='logo--subarea'>
                                    <a href="/">
                                        <img className='nav--logo client' src="../assets/img/logo/skillety-logo-sm.png" alt="" />
                                    </a>
                                </div>
                            </div> :
                            candidateRegister ?
                                <div className='logo--area candidate me-auto'>
                                    <div className='logo--subarea'>
                                        <a href="/candidate-home">
                                            <img className='nav--logo candidate' src="assets/img/logo/skillety-logo-sm.png" alt="" />
                                        </a>
                                    </div>
                                </div> :
                                candidateLogin ?
                                    <div className='logo--area candidate me-auto'>
                                        <div className='logo--subarea'>
                                            <a href="/candidate-home">
                                                <img className='nav--logo candidate' src="assets/img/logo/skillety-logo-sm.png" alt="" />
                                            </a>
                                        </div>
                                    </div> : null
                    }
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
                            <Link to="/candidate-signup" className='nav--client-login-btn candidate'>Register</Link> :
                            clientLogin ?
                                <Link to="/client-login" className='nav--client-login-btn'>Login</Link> :
                                candidateLogin ?
                                    <Link to="/candidate-login" className='nav--client-login-btn candidate'>Login</Link> : null
                    }
                </div>
            </div>
        </header>
    )
}

export default NewNavBar