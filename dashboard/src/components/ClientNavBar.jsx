import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { io } from "socket.io-client";
import { data } from 'jquery';

const ClientNavBar = ({ notification }) => {
  const loginId = new URLSearchParams(window.location.search).get('loginId');
  const [token, setToken] = useState("");
  const { getProtectedData } = useContext(AuthContext);
  const [employeeId, setEmployeeId] = useState("");
  const [loginClientDetail, setLoginClientDetail] = useState("");
  const [clientImg, setClientImg] = useState();
  const [clientImgUrl, setClientImgUrl] = useState("")
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [companyName, setCompanyName] = useState("");
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // const [audio] = useState(new Audio('../assets/media/notify-ring.mp3'));
  // const [audio, setAudio] = useState(null);
  // const [audioContext, setAudioContext] = useState(null);
  // const [audioBuffer, setAudioBuffer] = useState(null);
  // const [playedNotificationIds, setPlayedNotificationIds] = useState([]);

  // useEffect(() => {
  //   if(notification?.length>0){
  //     setNotifications(notification);
  //   }
  // }, [notification]);

  // const playSound = (context, buffer) => {
  //   const source = context.createBufferSource();
  //   source.buffer = buffer;
  //   source.connect(context.destination);
  //   source.start(0);
  // };

  // useEffect(()=>{
  //   if (notifications.length > 0) {
  //     if (audioContext === null) {
  //       const context = new (window.AudioContext || window.webkitAudioContext)();
  //       setAudioContext(context);

  //       fetch('../assets/media/notify-ring.mp3')
  //         .then((response) => response.arrayBuffer())
  //         .then((data) => {
  //           context.decodeAudioData(data, (buffer) => {
  //             setAudioBuffer(buffer);
  //             playSound(context, buffer);
  //           });
  //         });
  //     } else {
  //       playSound(audioContext, audioBuffer);
  //     }
  //   }

  // },[notifications, audioContext, audioBuffer])


  // useEffect(() => {
  //   audio.load();
  // }, [audio]);

  // useEffect(() => {
  //   if (notifications?.length > 0) {
  //     notifications.forEach(({ id }) => {
  //       if (!playedNotificationIds.includes(id)) {
  //         setTimeout(() => {
  //           audio.play().catch(error => {
  //             console.error('Failed to play audio:', error.message);
  //           });
  //           setPlayedNotificationIds(prevIds => [...prevIds, id]);
  //         }, 1000);
  //       }
  //     });
  //   }
  // }, [notifications, audio, playedNotificationIds]);

  //   useEffect(()=>{
  //       setSocket(io("https://skillety-n6r1.onrender.com"));
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

  useEffect(() => {
    setSocket(io("https://skillety-n6r1.onrender.com"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", userName)
}, [socket, userName]);

  useEffect(() => {

    socket?.on("getNotification", data => {
      console.log(data)
      setNotifications([data]);
      
    })

  }, [socket]);

  useEffect(() => {
    if (loginId) {
      socket?.emit('join_room', loginId)
    }
  }, [loginId, socket]);

  useEffect(() => {
    socket?.on('receive_message', (data) => {
      console.log(data);
      if(data.roomId === loginId){
        localStorage.removeItem("clientToken");
        window.location.href = 'https://skillety-frontend-wcth.onrender.com/client-login'
      }
      
    });
  }, [socket]);

  const handleClick = (notificationIdArray, redirect) => {
    if (notificationIdArray) {
      axios.patch("https://skillety-n6r1.onrender.com/read-notification", { notificationIdArray }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }).then(res => {
        console.log(res.data);
        
        if(window.location.pathname === redirect){
          const unReadNotifications = notifications.filter(notific=>notific.id !== notificationIdArray[0]);
          setNotifications(unReadNotifications);
        }else{
          navigate(redirect);
        }
        
      }).catch(err => console.log(err));
    }
  };

  const displayNotification = (notificationData) => {
    console.log(notificationData)
    const { content, time, date, redirect, id } = notificationData;
    const notificationIdArray = [id]
    return (
      <div className="notification-dropdown-content"
      onClick={()=>handleClick(notificationIdArray, redirect)}>
        <div className="notification-dropdown-content-left">
          <div className="noti-drpdwn-img-area">
            {/* <img src="assets/img/layout/user-img.png" className='noti-drpdwn-img' alt="" /> */}
            <i class="bi bi-person"></i>
          </div>
          <div className="dropdown-notification-item">
            {content}
          </div>
        </div>
        <div className="notification-dropdown-content-right">
          <div className="drpdwn-notify-time">
            {`${time}`}
            <span>{`${date}`}</span>
          </div>
        </div>
      </div>
    )
  }

  const handleClearNotifications = () => {
    
    const notificationIdArray = notifications.map(notific => notific.id)
    if(notifications?.length>0){
      axios.patch("https://skillety-n6r1.onrender.com/read-notification", {notificationIdArray}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
      .then(res=>{
        console.log(res.data)
        setNotifications([]);
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
          setEmployeeId(userData.id || userData.uid);
          setUserName(userData.name);
        } catch (error) {
          console.log(error)
        }
      };

      fetchData();
      
    }
  }, [token]);

  const getLoginClientDetail = async () => {
    try {
      const res = await axios.get(`https://skillety-n6r1.onrender.com/client/${employeeId}`, {
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
      axios.get(`https://skillety-n6r1.onrender.com/client-image/${loginClientDetail.companyId}`)
        .then(res => setClientImg(res.data))
        .catch(err => console.log(err))

        axios.get(`https://skillety-n6r1.onrender.com/all-notification/${loginClientDetail.companyId}?filter=unRead`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
        .then(res => {
          console.log(res.data);
          setNotifications(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [loginClientDetail.companyId]);

  useEffect(() => {
    if (clientImg) {
      setClientImgUrl(`data:image/jpeg;base64,${clientImg.image}`)
    }

  }, [clientImg]);

  const extractLastName = () => {
    const nameParts = userName.split(' ');

    if (nameParts?.length > 1) {
      return nameParts[0];
    } else {
      return userName;
    }
  };

  useEffect(()=>{
    if(loginClientDetail?.companyId){
        axios.get(`https://skillety-n6r1.onrender.com/checking-package-validity/${loginClientDetail?.companyId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
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
            <i data-feather="bell" className={notifications?.length > 0 ? "bell ring" : "bell"}></i>
            <div className='notification-badge'>
              <span>
                {notifications?.length < 99 ? notifications?.length : "99+"}
              </span>
            </div>
          </a>
          <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown notification-dropdown">
            <div className="notification-dropdown-header">
              <div className="notification-dropdown-head">
                Unread Notifications&nbsp;<span>{notifications?.length}</span>
              </div>
              {/* <a href="#" className='notify-settings-btn client'>
                <i class="bi bi-gear-fill"></i>
              </a> */}
            </div>
            <div className="notification-dropdown-content-area">
            {notifications?.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id}>{displayNotification(notification)}</div>
                ))
              ) : (
                <p className='no-notification'>
                  <i className='bi bi-exclamation-circle mr-2'></i>
                  No Notifications
                </p>
              )}
            </div>

            {notifications?.length>0 &&<div className="dropdown-footer notification-dropdown-footer text-center">
              <a className='drp-dwn-view-all-btn'
                onClick={handleClearNotifications}
              >Mark all as read
                <i class="bi bi-chevron-right ml-3"></i>
              </a>
            </div>}
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
                  window.open(`https://skillety-frontend-wcth.onrender.com/client-login`);
                  }} className="dropdown-logout-btn">
                  <i class="bi bi-box-arrow-right mr-3"></i>
                  Log Out
                </a> */}
              <a href="#" onClick={() => {
                localStorage.removeItem("clientToken");
                window.location.href = 'https://skillety-frontend-wcth.onrender.com/client-login'
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