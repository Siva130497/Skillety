import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const NavBar = ({ notification, socket }) => {
  const [token, setToken] = useState("");
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

  const displayNotification = ({ senderName, type, time, date }) => {
    let action;

    if (type === "2") {
      action = "message"
    }
    return (
      <div className="notification-dropdown-content">
        <div className="notification-dropdown-content-left">
          <div className="noti-drpdwn-img-area">
            {/* <img src="assets/img/layout/user-img.png" className='noti-drpdwn-img' alt="" /> */}
            <i class="bi bi-person"></i>
          </div>
          <div className="dropdown-notification-item">
            {`${senderName} ${action} you`}
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

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('candidateToken')))
  }, [token])

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const userData = await getProtectedData(token);
          console.log(userData);
          setCandidateId(userData.id);
          setUserName(userData.name);
        } catch (error) {
          console.log(error)
        }
      };

      fetchData();

      axios.get("https://skillety-n6r1.onrender.com/candidate-notification", {
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
  }, [token]);

  useEffect(() => {
    if (candidateId) {
      axios.get(`https://skillety-n6r1.onrender.com/candidate-image/${candidateId}`)
        .then(res => setCandidateImg(res.data))
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

  useEffect(() => {
    if (candidateImg) {
      setCandidateImgUrl(`https://skillety-n6r1.onrender.com/candidate_profile/${candidateImg.image}`)
    }

  }, [candidateImg]);

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
                Notification&nbsp;<span>({notifications?.length})</span>
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
                  No new notifications.
                </p>
              )}
            </div>

            <div className="dropdown-footer notification-dropdown-footer text-center">
              <a className='drp-dwn-view-all-btn'
                onClick={() => setNotifications([])}
              >Mark All As Read.
                <i class="bi bi-chevron-right ml-3"></i>
              </a>
            </div>
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
            <div className="dropdown-btn-link-area">
              {/* <a href="#" className="dropdown-acc-btn">
                  <i class="bi bi-person-fill mr-3"></i>
                  Account
                </a> */}
              {/* <a href="#" className="dropdown-sub-btn">
                  <i class="bi bi-gear-fill mr-3"></i>
                  Settings
                </a> */}

              <a href="" onClick={() => {
                localStorage.removeItem("candidateToken");
                window.location.href = 'https://skillety-frontend-wcth.onrender.com/candidate-login'
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

export default NavBar