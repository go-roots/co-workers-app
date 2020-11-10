import React from 'react';
import { Link } from 'react-router-dom'
import logoMedium from '../../assets/img/logo_medium.svg';


const Navbar = props => {
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
                        <li className="nav-item"><Link className="nav-link" to="/social">Social</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cw-points">My CW Points</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

// Notifications : <span *ngIf="ordersCount!=0" class="badge badge-pill badge-danger">{{ ordersCount }}</span>

export default Navbar;