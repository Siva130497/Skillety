import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ notification, socket }) => {
  const navigate = useNavigate()
  const [candToken, setCandToken] = useState("");
  const token = JSON.parse(localStorage.getItem('candidateToken'));
  const { getProtectedData } = useContext(AuthContext);
  const [candidateId, setCandidateId] = useState("");
  const [candidateImg, setCandidateImg] = useState();
  const [candidateImgUrl, setCandidateImgUrl] = useState("")
  const [loginCandidate, setLoginCandidate] = useState();

  const [userName, setUserName] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(notification);

  }, [notification]);

  const displayNotification = ({ senderName, content, time, date, redirect, _id }) => {
    const notificationIdArray = [_id]
    return (
      <div className="notification-dropdown-content"
      onClick={()=>{
        axios.patch("https://skillety-n6r1.onrender.com/read-notification", notificationIdArray, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }).then(res=>{
          console.log(res.data)
          navigate(redirect)
        }).catch(err=>console.log(err))
      }}>
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
    
    const notificationIdArray = notifications.map(notific => notific._id)
    if(notifications?.length>0){
      axios.patch("https://skillety-n6r1.onrender.com/read-notification", notificationIdArray, {
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

  // useEffect(() => {
  //   setToken(JSON.parse(localStorage.getItem('candidateToken'))) 
  // }, [token])

  useEffect(() => {
    
      const fetchData = async () => {
        try {
          const userData = await getProtectedData(token);
          console.log(userData);
          setCandidateId(userData.id || userData?.responseData.uid);
          setUserName(userData.name || userData?.responseData.name);
          setCandToken(userData.userToken);
        } catch (error) {
          console.log(error)
        }
      };

      fetchData();

      axios.get(`https://skillety-n6r1.onrender.com/all-notification/${candidateId}?filter=unRead`, {
        headers: {
          Authorization: `Bearer ${token? token : candToken}`,
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

    
  }, []);

  useEffect(() => {
    if (candidateId) {
      axios.get(`https://skillety-n6r1.onrender.com/candidate-image/${candidateId}`)
        .then(res => {
          console.log(res.data)
          setCandidateImg(res.data)})
        .catch(err => console.log(err))

      axios.get(`https://skillety-n6r1.onrender.com/candidate/${candidateId}`)
        .then(res => {
          console.log(res.data)
          setLoginCandidate(res.data)
        })
        .catch(err => {
          console.log(err)
        })

      
    }
  }, [candidateId]);

  useEffect(()=>{
    // console.log(token)
    if((token ? token : candToken) && candidateId){
      axios.patch("https://skillety-n6r1.onrender.com/update-candidate-activeIn", {candidateId}, {
          headers: {
            Authorization: `Bearer ${token ? token : candToken}`,
            Accept: 'application/json'
          }
        })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err)
          })
    }

  },[token, candidateId, candToken])

  useEffect(() => {
    if (candidateImg) {
      if (candidateImg.image.startsWith('https')) {
        setCandidateImgUrl(candidateImg.image);
      } else {
        setCandidateImgUrl(`https://skillety-n6r1.onrender.com/candidate_profile/${candidateImg.image}`);
      }
    }
}, [candidateImg]);


  const extractLastName = () => {
    const nameParts = userName.split(' ');

    if (nameParts?.length > 1) {
      return nameParts[nameParts?.length - 1];
    } else {
      return userName;
    }
  };

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default anchor tag behavior
    if(candToken){
      auth.signOut()
        .then(() => {
          console.log('User logged out successfully');
          window.location.href = 'https://skillety-frontend-wcth.onrender.com/candidate-login'
        })
        .catch((error) => {
          console.error('Error logging out:', error);
          // Handle logout error if needed
        });
    }else{
      localStorage.removeItem("candidateToken");
      window.location.href = 'https://skillety-frontend-wcth.onrender.com/candidate-login'
    }
  } 

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
            className="nav-link notification-toggle nav-link-lg notify-btn">
            <i data-feather="bell" className={socket ? "bell ring" : "bell"}></i>
            <div className='notification-badge candidate'>
              <span>
                {notifications?.length < 99 ? notifications?.length : "99+"}
              </span>
            </div>
          </a>
          <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown notification-dropdown">
            <div className="notification-dropdown-header">
              <div className="notification-dropdown-head">
                Unread Notifications&nbsp;<span>({notifications?.length})</span>
              </div>
              {/* <a href="#" className='notify-settings-btn'>
                <i class="bi bi-gear-fill"></i>
              </a> */}
            </div>
            <div className="notification-dropdown-content-area">
              {notifications?.length > 0 ? (
                notifications.reverse().slice(0, 10).map((notification) => (
                  <div key={notification.id}>{displayNotification(notification)}</div>
                ))
              ) : (
                <p className='no-notification'>
                  <i className='bi bi-exclamation-circle mr-2'></i>
                  No unread notifications.
                </p>
              )}
            </div>

            {notifications?.length>0 && <div className="dropdown-footer notification-dropdown-footer text-center">
              <a className='drp-dwn-view-all-btn'
                onClick={handleClearNotifications}
              >Mark All As Read.
                <i class="bi bi-chevron-right ml-3"></i>
              </a>
            </div>}
          </div>
        </li>

        <li className="dropdown">
          <a href="#" data-toggle="dropdown"
            className="nav-user--btn nav-link dropdown-toggle nav-link-lg nav-link-user">
            <span>Profile</span>
            <i class="bi bi-caret-down-fill"></i>
            <img alt="image" src={candidateImgUrl ? candidateImgUrl : "../assets/img/talents-images/avatar.jpg"}
              className="user-img-radious-style" />
            {/* <span className="d-sm-none d-lg-inline-block"></span> */}
          </a>
          <div className="dropdown-menu dropdown-menu-right pullDown profile-dropdown-menu">
            <div className="dropdown-top-area">
              <img src={candidateImgUrl ? candidateImgUrl : "../assets/img/talents-images/avatar.jpg"} className='dropdown-user-img' alt="" />
              <div className='dropdown-user-detail-area'>
                <div className="dropdown-user-name text-capitalized">{extractLastName()}</div>
                <div className="dropdown-user-role text-capitalized">{loginCandidate?.designation + " - " + loginCandidate?.companyName}</div>
              </div>
            </div>
            <a href={`/candidate-profile/${candidateId}`} className="dropdown-view-pro-btn">
              View Profile
            </a>
            <div className="dropdown-btn-link-area"
            >
              {/* <a href="#" className="dropdown-acc-btn">
                  <i class="bi bi-person-fill mr-3"></i>
                  Account
                </a> */}
              {/* <a href="#" className="dropdown-sub-btn">
                  <i class="bi bi-gear-fill mr-3"></i>
                  Settings
                </a> */}

              <a href="#"  className="dropdown-logout-btn"
              onClick={
                handleLogout
              }>
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

export default NavBar