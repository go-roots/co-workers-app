import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logoMedium from '../../assets/img/logo_medium.svg';


const Navbar = props => {

    const notifications = useSelector(state => state.notifications.notifications);

    return (
        <nav className="navbar navbar-light navbar-expand-md">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logoMedium} alt="logo" />
                </Link>
                <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="nav navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link active" to="/dashboard">My Dashboard</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/consumption">My Consumption</Link></li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex flex-row align-items-start" to="/social">
                                <p>Social</p>
                                <span style={{ fontSize: '11px' }} class="badge badge-pill badge-danger">{notifications.length ? notifications.length : ""}</span>
                            </Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cw-points">My CW Points</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;