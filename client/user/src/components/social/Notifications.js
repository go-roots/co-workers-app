import React from 'react'

const Notifications = props => {
    return (
        <div className="card vh-container">
            <div className="card-body">
                <h4 className="card-title">Notifications</h4>
                <ul className="list-group">
                    <li className="list-group-item d-flex flex-column help-request-notif">
                        <img
                            className="notif-image"
                            src={notifProfile}/>
                        <p className="notif-text-button">Jorgo sent you a help request.</p>
                        <button
                            className="btn btn-warning btn-sm text-nowrap align-self-center notif-button"
                            type="button">
                            Help!
                        </button>
                    </li>
                    <li className="list-group-item d-flex flex-column event-notif">
                        <img
                            className="notif-image"
                            src={halloween}/>
                        <p className="notif-text-button">Halloween party !</p>
                        <button
                            className="btn btn-warning btn-sm text-nowrap align-self-center notif-button"
                            type="button">Go!
                        </button>
                    </li>
                    <li className="list-group-item d-flex flex-column friend-request-notif"><img
                        className="notif-image"
                        src={notifProfile}/>
                        <p className="notif-text-button">Paul wants to be your friend.</p>
                        <div className="d-flex flex-row justify-content-around">
                            <button className="btn btn-success btn-sm text-nowrap notif-button"
                                    type="button">Accept
                            </button>
                            <button className="btn btn-danger btn-sm text-nowrap notif-button"
                                    type="button">Decline
                            </button>
                        </div>
                    </li>
                    <li className="list-group-item d-flex flex-column friend-request-notif"><img
                        className="notif-image"
                        src={notifProfile}/>
                        <p className="notif-text-button">Ilya wants to be your friend.</p>
                        <div className="d-flex flex-row justify-content-around">
                            <button className="btn btn-success btn-sm text-nowrap notif-button"
                                    type="button">Accept
                            </button>
                            <button className="btn btn-danger btn-sm text-nowrap notif-button"
                                    type="button">Decline
                            </button>
                        </div>
                    </li>
                    <li className="list-group-item d-flex flex-column friend-request-notif"><img
                        className="notif-image"
                        src={notifProfile}/>
                        <p className="notif-text-button">You asked Shradda for help. Feel free to leave
                            a
                            comment on her profile
                            and recommend her skills !</p>
                        <div className="text-center">
                            <button className="btn btn-info btn-sm notif-button" type="submit">Go to
                                profile
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default Notifications
