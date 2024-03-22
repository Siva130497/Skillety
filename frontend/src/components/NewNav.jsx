import { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import io from 'socket.io-client';
import { v4 as uuidv4 } from "uuid";

const NewNav = ({ homeActive, aboutUsActive, searchCVActive, serviceActive, RPOActive, contactActive, postJobActive }) => {
    const { getProtectedData } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');

    const clientToken = JSON.parse(localStorage.getItem('clientToken'));

    const [talentJobPostContent, setTalentJobPostContent] = useState([]);

    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState();

    const [socket, setSocket] = useState(null);
    const [loginId, setLoginId] = useState("");

    //for show success message for payment
  function showSuccessMessage(message) {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  }

  //for show error message for payment
  function showErrorMessage(message) {
    Swal.fire({
      title: "Payment failed. Please try again!",
      text: message,
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  }

  useEffect(()=>{
    if(clientToken){
        setSocket(io("https://skillety-n6r1.onrender.com"));
    }
    
},[clientToken]);

useEffect(() => {
    if (clientToken && socket) {
        const id = uuidv4();
        setLoginId(id);
      socket?.emit('join_room', id)
    }
  }, [clientToken, socket]);

  const handleLogout = () => {
    const logoutMsg = {
        roomId: loginId,
        message: `Logging out as ${userName}`
    }
    socket.emit('send_message', logoutMsg);

    localStorage.removeItem("clientToken");
    navigate("/client-login")
}

    useEffect(() => {
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_32,content_34,content_36,content_38,content_40,content_2")
            .then(res => {
                console.log(res.data);
                setTalentJobPostContent(res.data);
            }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (clientToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(clientToken);
                    console.log(userData);
                    setUserName(userData.name);
                    setEmployeeId(userData.id);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [clientToken]);

    const getLoginClientDetail = async () => {
        try {
          const res = await axios.get(
            `https://skillety-n6r1.onrender.com/client/${employeeId}`,
            {
              headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: "application/json",
              },
            }
          );
          const result = res.data;
          if (!result.error) {
            console.log(result);
            setLoginClientDetail(result);
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        if (employeeId) {
          getLoginClientDetail();
        }
      }, [employeeId]);

    useEffect(()=>{
        if(loginClientDetail?.companyId){
            axios.get(`https://skillety-n6r1.onrender.com/checking-package-validity/${loginClientDetail?.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            }).then(res=>{
                console.log(res.data);
                // showSuccessMessage(res.data.message);
            }).catch(err=>{
                console.log(err);
                // showErrorMessage(err.response.data.error);
            })
        }
        
      },[loginClientDetail])

    useEffect(() => {
        $(document).ready(function () {
            $('.scroll-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 100);
            });
        });
    }, []);

    const extractLastName = () => {
        const nameParts = userName.split(' ');

        if (nameParts.length > 1) {
            return nameParts[0];
        } else {
            return userName;
        }
    };

    return (
        <header id="header" className="fixed--top client">
            <div className="container-fluid d-flex align-items-center justify-content-between ps-0 custom-right-nav-padding">

                <div>
                    <div className='logo--area me-auto'>
                        <div className='logo--subarea'>
                            <a href="/client-home">
                                <img className='nav--logo'
                                    // src=
                                    // {"data:image/jpeg;base64," + talentJobPostContent.find(content => content.id === "content_2")?.content ||
                                    //     "../assets/img/logo/skillety-logo-sm.png"}
                                    src="../assets/img/logo/skillety-logo-sm.png"
                                    alt=""
                                />
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
                        onChange={() => navigate("/")}
                    />
                    <input
                        type="radio"
                        id="switchEmployer"
                        name="switchPlan"
                        value="Employer"
                        checked
                    />
                    <label htmlFor="switchTalent" className='scroll-to-top'>Talent</label>
                    <label htmlFor="switchEmployer" className='scroll-to-top'>Employer</label>
                    <div className="switch-wrapper">
                        <div className="switch">
                            <div>Talent</div>
                            <div>Employer</div>
                        </div>
                    </div>
                </div>

                <nav id="navbar" className="navbar client navbar-expand-lg">
                    <ul>
                        {/* <li><div><a href="/client-home" className={homeActive ? "nav-link scrollto active" : "nav-link scrollto"}>Home</a></div></li> */}
                        <li><a href={clientToken ? `/post-job-web/${clientToken}` : "/client-login"} className={postJobActive ? "nav-link scrollto active" : "nav-link scrollto"}>Post Job</a></li>
                        <li><a href="/talent-profile-search" className={searchCVActive ? "nav-link scrollto active" : "nav-link scrollto"}>Search CV</a></li>
                        <li className="dropdown"><a href="#" className={serviceActive ? "nav-link scrollto active" : "nav-link scrollto"}><span>Services</span> <i className="bi bi-chevron-down"></i></a>
                            <ul className={window.location.pathname == '/cv-sourcing' ||
                                window.location.pathname == '/job-posting' ||
                                window.location.pathname == '/skill-assessment' ||
                                window.location.pathname == '/interview-as-a-service' || 
                                window.location.pathname == '/background-verification' ? 'dropdown-active' : ''}>
                                <li className={window.location.pathname == '/cv-sourcing' ? 'active-page' : ''}><a href="/cv-sourcing">
                                    {talentJobPostContent.find(content => content.id === "content_32")?.content ||
                                        "CV Sourcing"}
                                </a></li>
                                {/* <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="#">Deep Drop Down 1</a></li>
                                        <li><a href="#">Deep Drop Down 2</a></li>
                                        <li><a href="#">Deep Drop Down 3</a></li>
                                        <li><a href="#">Deep Drop Down 4</a></li>
                                        <li><a href="#">Deep Drop Down 5</a></li>
                                    </ul>
                                </li> */}
                                <li className={window.location.pathname == '/job-posting' ? 'active-page' : ''}><a href="/job-posting">
                                    {talentJobPostContent.find(content => content.id === "content_34")?.content ||
                                        "Job Posting"}
                                </a></li>
                                <li className={window.location.pathname == '/skill-assessment' ? 'active-page' : ''}><a href="/skill-assessment">
                                    {talentJobPostContent.find(content => content.id === "content_36")?.content ||
                                        "Skill Assessment"}
                                </a></li>
                                <li className={window.location.pathname == '/interview-as-a-service' ? 'active-page' : ''}><a href="/interview-as-a-service">
                                    {talentJobPostContent.find(content => content.id === "content_38")?.content ||
                                        "Interview as a Service"}
                                </a></li>
                                {/* <li><a href="/onboarding-process">Onboarding Process</a></li> */}
                                <li className={window.location.pathname == '/background-verification' ? 'active-page' : ''}><a href="/background-verification">
                                    {talentJobPostContent.find(content => content.id === "content_40")?.content ||
                                        "Background Verification"}
                                </a></li>
                                {/* <li><a href="/rpo">RPO</a></li> */}
                            </ul>
                        </li>
                        <li><a href="/packages" className={`nav-link scrollto ${window.location.pathname === '/packages' ? 'active' : ''}`}>Pricing</a></li>
                        {/* <li><a href="/about-us" className={aboutUsActive ? "nav-link scrollto active" : "nav-link scrollto"}>About Us</a></li> */}
                        {/* <li><a className={RPOActive ? "nav-link scrollto active" : "nav-link scrollto"} href="/rpo">RPO</a></li> */}
                        {/* <li><a className={contactActive ? "nav-link scrollto active" : "nav-link scrollto"} href="/contact-us">Contact Us</a></li> */}
                        {userName ?
                            <li className="dropdown"><a href='#'><span>{extractLastName()}</span><i className="bi bi-chevron-down"></i></a>
                                <ul className='loged-in'>
                                    <li><a href={`https://skillety-dashboard-tk2y.onrender.com/client-dashboard/${clientToken}?loginId=${loginId}`} target='_blank'>Dashboard</a></li>
                                    <li onClick={handleLogout}><a href='#'>Logout</a></li>
                                </ul>
                            </li> :
                            <li><a className="nav-link scrollto login--btn client" href="/client-login"><i class='bx bx-log-in-circle login--icon me-2'></i>Login</a></li>
                        }
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
        </header>
    )
}

export default NewNav