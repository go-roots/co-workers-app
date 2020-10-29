import React from 'react';
import logoMedium from '../../assets/img/logo_medium.svg';


const Navbar = props => {
    return (
        <nav className="navbar navbar-light navbar-expand-md">
            <div className="container-fluid">
                <a className="navbar-brand" href="landing.html">
                    <img src={logoMedium} alt="logo" />
                </a>
                <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
                    <span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="nav navbar-nav mr-auto">
                        <li className="nav-item"><a className="nav-link active" href="dashboard.html">My Dashboard</a></li>
                        <li className="nav-item"><a className="nav-link" href="consumption.html">My Consumption</a></li>
                        <li className="nav-item"><a className="nav-link" href="social.html">Social</a></li>
                        <li className="nav-item"><a className="nav-link" href="qr-code.html">Navigate</a></li>
                        <li className="nav-item"><a className="nav-link" href="events.html">Events</a></li>
                        <li className="nav-item"><a className="nav-link" href="cw-points.html">My CW Points</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;