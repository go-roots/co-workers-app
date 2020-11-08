import React from 'react'

const NavBar = () => {
    return (
        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
            <div className="container-fluid">
                <button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button">
                    <i className="fas fa-bars"></i>
                </button>
                <ul className="nav navbar-nav flex-nowrap ml-auto">
                    <div className="d-none d-sm-block topbar-divider"></div>
                    <li className="nav-item dropdown no-arrow">
                        <div className="nav-item dropdown no-arrow">
                            <button className="dropdown-toggle nav-link" type='button' data-toggle="dropdown" aria-expanded="false">
                                <span className="d-none d-lg-inline mr-2 text-gray-600 small">Administrator Admin</span>
                                <i className="fa fa-user-circle-o" id="nav-user-icon"></i>
                            </button>
                            <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in">
                                <button type='button' className="dropdown-item">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    &nbsp;Logout
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;
