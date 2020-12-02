import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logoMedium from '../../assets/img/logo_medium.svg';
import { BiMessageRoundedError } from 'react-icons/bi';


const Navbar = props => {

    let { notifications, loading: loadingNotifications } = useSelector(state => state.notifications);
    const { user, loading: loadingUser } = useSelector(state => state.auth);

    if (loadingUser || loadingNotifications) {
        return null
    }

    notifications = notifications.filter(notif => !notif.seen);
    const messages = user.messages.filter(msg => !msg.seen);

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
                            <Link className="nav-link" to="/social">
                                <div className='d-flex flex-row align-items-start'>
                                    <p>Social</p>
                                    {messages.length > 0 && <BiMessageRoundedError color='blue' size='21' />}
                                    <span style={{ fontSize: '11px', marginTop: '1px' }} className="badge badge-pill badge-danger">{notifications.length ? notifications.length : ""}</span>
                                </div>
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