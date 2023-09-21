import React from 'react'
import { Link } from 'react-router-dom'


const NewNavBar = ({clientRegister, candidateRegister, clientLogin, candidateLogin}) => {
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


                <nav id="navbar" className="navbar">
                    <ul>
                        {clientRegister ?
                            <li><Link to="/client-register" className="nav-link">Register</Link></li> :
                            candidateRegister ? <li><Link to="/candiate-register" className="nav-link">Register</Link></li> :

                            clientLogin ? <li><Link to="/client-login" className="nav-link">Login</Link></li> :
                            candidateLogin ? <li><Link to="/candidate-login" className="nav-link">Login</Link></li> : null

                        }

                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NewNavBar