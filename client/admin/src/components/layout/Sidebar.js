import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_small.svg';


const Sidebar = () => {
    return (
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-success p-0">
            <div className="container-fluid d-flex flex-column p-1">
                <Link className="navbar-brand align-self-start sidebar-brand m-0" to='/'>
                    <img src={logo} alt='' />
                </Link>
                <ul className="nav navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/admin/dashboard">
                            <i className="fas fa-tachometer-alt sidebar-icon"></i>
                            <span className="sidebar-menu-text">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/rooms">
                            <i className="fas fa-table sidebar-icon"></i>
                            <span className="sidebar-menu-text">Rooms</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/users">
                            <i className="fas fa-user sidebar-icon"></i>
                            <span className="sidebar-menu-text">Users</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/settings">
                            <i className="fas fa-window-maximize sidebar-icon"></i>
                            <span className="sidebar-menu-text">Settings</span>
                        </Link>
                    </li>
                </ul>
                <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>
    )
}

export default Sidebar
