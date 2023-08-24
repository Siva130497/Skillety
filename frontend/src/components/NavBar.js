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
                                <Link to = "/client-register" className="nav-link">Client-Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default NavBar;