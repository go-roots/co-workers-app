import React from 'react';
import logo from '../../assets/img/logo_small.svg';


const Sidebar = () => {
    return (
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-success p-0">
            <div className="container-fluid d-flex flex-column p-1"><a className="navbar-brand align-self-start sidebar-brand m-0" href="#"><img src={logo} /></a>
                <ul className="nav navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item"><a className="nav-link active" href="dashboard.html"><i className="fas fa-tachometer-alt sidebar-icon"></i><span className="sidebar-menu-text">Dashboard</span></a></li>
                    <li className="nav-item"><a className="nav-link" href="rooms.html"><i className="fas fa-table sidebar-icon"></i><span className="sidebar-menu-text">Rooms</span></a></li>
                    <li className="nav-item"><a className="nav-link" href="users.html"><i className="fas fa-user sidebar-icon"></i><span className="sidebar-menu-text">Users</span></a></li>
                    <li className="nav-item"><a className="nav-link" href="settings.html"><i className="fas fa-window-maximize sidebar-icon"></i><span className="sidebar-menu-text">Settings</span></a></li>
                </ul>
                <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>
    )
}

export default Sidebar
