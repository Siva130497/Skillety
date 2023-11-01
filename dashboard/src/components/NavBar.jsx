import React from 'react'

const NavBar = () => {
  return (
    <div>
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
              <i data-feather="bell" className="bell"></i>
            </a>
            {/* <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown">
              <div className="dropdown-header">
                Notifications
                <div className="float-right">
                  <a href="#">Mark All As Read</a>
                </div>
              </div>
              <div className="dropdown-list-content dropdown-list-icons">
                <a href="#" className="dropdown-item dropdown-item-unread"> <span
                  className="dropdown-item-icon bg-primary text-white"> <i className="fas
												fa-code"></i>
                </span> <span className="dropdown-item-desc"> Template update is
                  available now! <span className="time">2 Min
                    Ago</span>
                  </span>
                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-info text-white"> <i className="far
												fa-user"></i>
                </span> <span className="dropdown-item-desc"> <b>You</b> and <b>Dedik
                  Sugiharto</b> are now friends <span className="time">10 Hours
                    Ago</span>
                  </span>
                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-success text-white"> <i
                  className="fas
												fa-check"></i>
                </span> <span className="dropdown-item-desc"> <b>Kusnaedi</b> has
                  moved task <b>Fix bug header</b> to <b>Done</b> <span className="time">12
                    Hours
                    Ago</span>
                  </span>
                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-danger text-white"> <i
                  className="fas fa-exclamation-triangle"></i>
                </span> <span className="dropdown-item-desc"> Low disk space. Let's
                  clean it! <span className="time">17 Hours Ago</span>
                  </span>
                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-info text-white"> <i className="fas
												fa-bell"></i>
                </span> <span className="dropdown-item-desc"> Welcome to Otika
                  template! <span className="time">Yesterday</span>
                  </span>
                </a>
              </div>
              <div className="dropdown-footer text-center">
                <a href="#">View All <i className="fas fa-chevron-right"></i></a>
              </div>
            </div> */}
          </li>

          <li className="dropdown">
            <a href="#" data-toggle="dropdown"
              className="nav-user--btn nav-link dropdown-toggle nav-link-lg nav-link-user">
              Profile
              <i class="bi bi-caret-down-fill"></i>
              <img alt="image" src="assets/img/layout/user-img.png"
                className="user-img-radious-style" />
              <span className="d-sm-none d-lg-inline-block"></span>
            </a>
            {/* <div className="dropdown-menu dropdown-menu-right pullDown">
              <div className="dropdown-title">Hello Sarah Smith</div>
              <a href="profile.html" className="dropdown-item has-icon"> <i className="far
										fa-user"></i> Profile
              </a> <a href="timeline.html" className="dropdown-item has-icon"> <i className="fas fa-bolt"></i>
                Activities
              </a> <a href="#" className="dropdown-item has-icon"> <i className="fas fa-cog"></i>
                Settings
              </a>
              <div className="dropdown-divider"></div>
              <a href="auth-login.html" className="dropdown-item has-icon text-danger"> <i className="fas fa-sign-out-alt"></i>
                Logout
              </a>
            </div> */}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar