import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { auth } from '../firebase/firebaseConfig';
import axios from 'axios';

export const NewNavCandidateHome = ({homeActive, aboutUsActive, searchJobActive, eventsActive, contactActive}) => {

    const { getProtectedData } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [token, setToken] = useState("");

    const candidateToken = JSON.parse(localStorage.getItem('candidateToken'));

    const [talentJobPostContent, setTalentJobPostContent] = useState([]);

    useEffect(()=>{
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_2")
        .then(res=>{
          console.log(res.data);
          setTalentJobPostContent(res.data);
        }).catch(err=>console.log(err));
      },[])

    useEffect(() => {
       
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(candidateToken);
                    console.log(userData);
                    setUserName(userData.name || userData.responseData?.name);
                    setToken(userData.userToken);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        

    }, [candidateToken]);

    const extractLastName = () => {
        const nameParts = userName.split(' ');

        if (nameParts.length > 1) {
            return nameParts[0];
        } else {
            return userName;
        }
    };

    useEffect(() => {
        $(document).ready(function () {
            $('.scroll-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 100); // Adjust the speed (in milliseconds) as needed
            });
        });
    }, []);


    return (
        <header id="header" className="fixed--top candidate">
            <div className="container-fluid d-flex align-items-center justify-content-between ps-0 custom-right-nav-padding">

                <div>
                    <div className='logo--area me-auto'>
                        <div className='logo--subarea'>
                            <a href="/">
                            <img className='nav--logo candidate' 
                            // src={"data:image/jpeg;base64,"+talentJobPostContent[0]?.content ||
                            //             "../assets/img/logo/skillety-logo-sm.png"} 
                            src="../assets/img/logo/skillety-logo-sm.png"
                                        alt="" />
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
                        checked
                    />
                    <input
                        type="radio"
                        id="switchEmployer"
                        name="switchPlan"
                        value="Employer"
                        onChange={() => navigate("/client-home")}
                    />
                    <label htmlFor="switchTalent" className='scroll-to-top'>Talent</label>
                    <label htmlFor="switchEmployer" className='scroll-to-top'>Employer</label>
                    <div className="switch-wrapper">
                        <div className="switch candidate">
                            <div>Talent</div>
                            <div>Employer</div>
                        </div>
                    </div>
                </div>

                <nav id="navbar" className="navbar candidate navbar-expand-lg">
                    <ul>
                        {/* <li><div><a href="/" className={homeActive ? "nav-link scrollto active" : "nav-link scrollto"}>Home</a></div></li> */}
                        <li><a href="/job-search" className={searchJobActive ? "nav-link scrollto active" : "nav-link scrollto"}>Search Jobs</a></li>
                        <li><a href="/events" className={eventsActive ? "nav-link scrollto active" : "nav-link scrollto"}>Media</a></li>
                        <li><a href="/candidate-about-us" className={aboutUsActive ? "nav-link scrollto active" : "nav-link scrollto"}>About Us</a></li>
                        {/* <li><a href="#" className="nav-link scrollto">Companies</a></li> */}
                        <li><a href="/talent-contact-us" className={contactActive ? "nav-link scrollto active" : "nav-link scrollto"}>Contact Us</a></li>
                        {userName ?
                            <li className="dropdown"><a href='#'><span>{extractLastName()}</span><i className="bi bi-chevron-down"></i></a>
                                <ul className='loged-in'>
                                    <li><a href={`https://skillety-dashboard-tk2y.onrender.com/${candidateToken || `firebase:${token}`}`} target='_blank'>Dashboard</a></li>
                                    <li onClick={(e) => {
                                        e.preventDefault(); // Prevent default anchor tag behavior
                                        if(token){
                                          auth.signOut()
                                            .then(() => {
                                              console.log('User logged out successfully');
                                              navigate("/candidate-login")
                                            })
                                            .catch((error) => {
                                              console.error('Error logging out:', error);
                                              // Handle logout error if needed
                                            });
                                        }else{
                                          localStorage.removeItem("candidateToken");
                                          navigate("/candidate-login")
                                        }
                                        
                                    }}><a href='#'>Logout</a></li>
                                </ul>
                            </li> :
                            <li><a href="/candidate-login" className="nav-link scrollto login--btn"><i class='bx bx-log-in-circle login--icon me-2'></i>Login</a></li>
                        }
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle candidate"></i>
                </nav>

            </div>
        </header>
    )
}
