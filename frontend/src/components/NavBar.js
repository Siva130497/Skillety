import React from 'react'
import{Link} from "react-router-dom";


const NavBar = ({title = "SKILLETY"}) => {

    return (
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to ="/" className="navbar-brand" >{title}</Link>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                            <button type="button" className="btn btn-primary">Client</button>
                                            <div className="btn-group" role="group">
                                                <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                    <Link to = "/client-register" className="dropdown-item" >Register</Link>
                                                    <Link to = "/client-login"className="dropdown-item" >Login</Link>
                                            </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                            <button type="button" className="btn btn-primary">Candidate</button>
                                            <div className="btn-group" role="group">
                                                <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                    <Link to = "/candiate-register" className="dropdown-item" >Register</Link>
                                                    <Link to = "/candidate-login"className="dropdown-item" >Login</Link>
                                            </div>
                                            </div>
                                        </div>
                                    </li> 
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default NavBar;