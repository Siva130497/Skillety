import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import {io} from "socket.io-client";
import { data } from 'jquery';

const ClientNavBar = ({notification}) => {
  const [token, setToken] = useState("");
  const { getProtectedData } = useContext(AuthContext);
  const [employeeId, setEmployeeId] = useState("");
  const [loginClientDetail, setLoginClientDetail] = useState("");
  const [clientImg, setClientImg] = useState();
  const [clientImgUrl, setClientImgUrl] = useState("")
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [companyName, setCompanyName] = useState("");
  // const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{
    setNotifications(notification)
  },[notification])

  //   useEffect(()=>{
  //       setSocket(io("https://skillety.onrender.com"));
  //   },[]);

  //   useEffect(()=>{
  //       socket?.emit("newUser", companyName)
  //   },[socket, companyName])

  //   useEffect(()=>{
  //     socket?.on("getNotification", data=>{
  //       console.log(data)
  //       setNotifications(prev=>[...prev, data]);
  //     })
  //   },[socket]);

    

  //   console.log(notifications)

    const displayNotification = ({senderName, type, time, date}) => {
      let action;

      if(type === "1"){
        action = "applied"
      }
      return (
            <div className="notification-dropdown-content">
                    <div className="notification-dropdown-content-left">
                      <div className="noti-drpdwn-img-area">
                        {/* <img src="assets/img/layout/user-img.png" className='noti-drpdwn-img' alt="" /> */}
                        <i class="bi bi-person"></i>
                      </div>
                      <div className="dropdown-notification-item">
                        {`${senderName} ${action} for your job`}
                      </div>
                    </div>
                    <div className="notification-dropdown-content-right">
                      <div className="drpdwn-notify-time">
                        {`${time} ${date}`}
                      </div>
                    </div>
            </div>
      )
    }

    const handleClearNotifications = () => {
      setNotifications([]);
      if(notifications?.length>0){
        axios.delete("https://skillety.onrender.com/notifications/delete-all", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        })
        .then(res=>{
          console.log(res.data)
        })
        .catch(err=>{
          console.log(err)
        })
      }
      
    }

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('clientToken')))
  }, [token])


  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const userData = await getProtectedData(token);
          console.log(userData);
          setEmployeeId(userData.id);
          setUserName(userData.name);
        } catch (error) {
          console.log(error)
        }
      };
      
      fetchData();
      axios.get("https://skillety.onrender.com/candidate-to-client-notification", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
      .then(res=>{
        console.log(res.data);
        setNotifications(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }, [token]);

  const getLoginClientDetail = async () => {
    try {
      const res = await axios.get(`https://skillety.onrender.com/client/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setLoginClientDetail(result);
        setCompanyName(result.companyName);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (employeeId) {
      getLoginClientDetail();
    }
  }, [employeeId]);

  useEffect(() => {
    if (loginClientDetail.companyId) {
      axios.get(`https://skillety.onrender.com/client-image/${loginClientDetail.companyId}`)
        .then(res => setClientImg(res.data))
        .catch(err => console.log(err))
    }
  }, [loginClientDetail.companyId]);

  useEffect(() => {
    if (clientImg) {
      setClientImgUrl(`https://skillety.onrender.com/client_profile/${clientImg.image}`)
    }

  }, [clientImg]);

  const extractLastName = () => {
    const nameParts = userName.split(' ');

    if (nameParts.length > 1) {
      return nameParts[nameParts.length - 1];
    } else {
      return userName;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg main-navbar sticky">
      <div className="form-inline mr-auto">
        <ul className="navbar-nav mr-3">
          <li>
            <a href="#" data-toggle="sidebar" className="nav-link nav-link-lg
									collapse-btn"> <i data-feather="align-justify"></i>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link nav-link-lg fullscreen-btn pl-3">
              <i data-feather="maximize"></i>
            </a>
          </li>
          {/* <li>
              <form className="form-inline mr-auto">
                <div className="search-element">
                  <input className="form-control" type="search" placeholder="Search" aria-label="Search" data-width="200" />
                  <button className="btn" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </li> */}
        </ul>
      </div>
      <ul className="navbar-nav navbar-right">
        <li className="dropdown dropdown-list-toggle">
          <a href="#" data-toggle="dropdown"
            className="nav-link notification-toggle nav-link-lg notify-btn client">
            <i data-feather="bell" className="bell"></i>
          </a>
          <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown notification-dropdown">
            <div className="notification-dropdown-header">
              <div className="notification-dropdown-head">
                Notification&nbsp;<span>({notifications?.length})</span>
              </div>
              <a href="#" className='notify-settings-btn client'>
                <i class="bi bi-gear-fill"></i>
              </a>
            </div>
            <div className="notification-dropdown-content-area">
              {notifications?.length > 0 ? (
                notifications.reverse().slice(0,10).map((notification) => (
                  <div key={notification.id}>{displayNotification(notification)}</div>
                ))
              ) : (
                <p>no new notifications</p>
              )}
            </div>


            <div className="dropdown-footer notification-dropdown-footer text-center">
              <a className='drp-dwn-view-all-btn'
              onClick={handleClearNotifications}
              >View All
                <i class="bi bi-chevron-right ml-3"></i>
              </a>
            </div>
          </div>
        </li>

        <li className="dropdown">
          <a href="#" data-toggle="dropdown"
            className="nav-user--btn client nav-link dropdown-toggle nav-link-lg nav-link-user">
            <span>Company Profile</span>
            <i class="bi bi-caret-down-fill"></i>
            <img alt="image" src={clientImgUrl ? clientImgUrl : "../assets/img/talents-images/avatar.jpg"}
              className="user-img-radious-style" />
            {/* <span className="d-sm-none d-lg-inline-block"></span> */}
          </a>
          <div className="dropdown-menu dropdown-menu-right pullDown profile-dropdown-menu">
            <div className="dropdown-top-area">
              <img src={clientImgUrl ? clientImgUrl : "../assets/img/talents-images/avatar.jpg"} className='dropdown-user-img' alt="" />
              <div className='dropdown-user-detail-area'>
                <div className="dropdown-user-name text-capitalized">{extractLastName()}</div>
                <div className="dropdown-user-role text-capitalized">{loginClientDetail?.companyName}</div>
              </div>
            </div>
            <a href={`/client-profile/${loginClientDetail.companyId}`} className="dropdown-view-pro-btn">
              View Profile
            </a>
            <div className="dropdown-btn-link-area">
              {/* <a href="#" className="dropdown-acc-btn">
                  <i class="bi bi-person-fill mr-3"></i>
                  Account
                </a>
                <a href="#" className="dropdown-sub-btn">
                  <i class="bi bi-gear-fill mr-3"></i>
                  Settings
                </a> */}

              {/* <a href="" onClick={()=>{
                  localStorage.removeItem("clientToken");
                  window.open(`https://skillety-frontend.onrender.com/client-login`);
                  }} className="dropdown-logout-btn">
                  <i class="bi bi-box-arrow-right mr-3"></i>
                  Log Out
                </a> */}
              <a href="#" onClick={() => {
                localStorage.removeItem("clientToken");
                window.location.href = 'https://skillety-frontend.onrender.com/client-login'
              }} className="dropdown-logout-btn">
                <i class="bi bi-box-arrow-right mr-3"></i>
                Log Out
              </a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default ClientNavBar