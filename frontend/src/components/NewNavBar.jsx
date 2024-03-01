import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const NewNavBar = ({ clientRegister, candidateRegister, clientLogin, candidateLogin, candVerification }) => {
    const [talentJobPostContent, setTalentJobPostContent] = useState([]);

    useEffect(()=>{
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_2")
        .then(res=>{
          console.log(res.data);
          setTalentJobPostContent(res.data);
        }).catch(err=>console.log(err));
      },[])
    
    return (
        <header id="clientheader" className="fixed--top">
            <div className="container-fluid d-flex align-items-center justify-content-between ps-0 custom-right-nav-padding">

                <div>

                    {
                        (candidateRegister || candidateLogin || candVerification) ?
                            <div className='logo--area candidate me-auto'>
                                <div className='logo--subarea'>
                                    <a href="/candidate-home">
                                        <img className='nav--logo candidate' src=
                                        {"data:image/jpeg;base64,"+talentJobPostContent[0]?.content ||
                                        "../assets/img/logo/skillety-logo-sm.png"} 
                                        alt="Skillety Logo" />
                                    </a>
                                </div>
                            </div> :
                            <div className='logo--area client me-auto'>
                                <div className='logo--subarea'>
                                    <a href="/">
                                    <img className='nav--logo candidate' src=
                                        {"data:image/jpeg;base64,"+talentJobPostContent[0]?.content ||
                                        "../assets/img/logo/skillety-logo-sm.png"} 
                                        alt="Skillety Logo" />
                                    </a>
                                </div>
                            </div>
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
                        <Link to="/client-register" className='nav--client-login-btn'>Register</Link> :
                        candidateRegister ?
                            <Link to="/candiate-register" className='nav--client-login-btn candidate'>Register</Link> :
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