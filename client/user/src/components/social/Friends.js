import React from 'react';
import {FaUserFriends} from 'react-icons/fa';

import ReactTooltip from 'react-tooltip';

const Friends = props => {
    return (
        <div className="col-xl-4 responsive-padding">
            <ReactTooltip place="bottom" type="dark" effect="solid" />
            <button className="btn btn-outline-info btn-block btn-lg header-msg-friends"
                    data-tip="Friends">
                <FaUserFriends className="icon-people" size={30}/>
            </button>
            <div
                className="d-flex flex-column justify-content-start align-items-center border border-info friends-msg-container">
                <div className="dropdown">
                    <button className="btn btn-lg friends-item" data-toggle="dropdown"
                            aria-expanded="false" type="button">
                        Jorgo&nbsp;
                    </button>
                    <div className="dropdown-menu"><a className="dropdown-item" href="#">View
                        profile</a><a className="dropdown-item"
                                      href="#">Send
                        message</a><a className="dropdown-item" href="#">Locate</a><a
                        className="dropdown-item" href="#">Delete
                        friend</a></div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-lg friends-item" data-toggle="dropdown"
                            aria-expanded="false" type="button">
                        Nicolas&nbsp;
                    </button>
                    <div className="dropdown-menu"><a className="dropdown-item" href="#">View
                        profile</a><a className="dropdown-item"
                                      href="#">Send
                        message</a><a className="dropdown-item" href="#">Locate</a><a
                        className="dropdown-item" href="#">Delete
                        friend</a></div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-lg friends-item" data-toggle="dropdown"
                            aria-expanded="false" type="button">
                        Daiqiao&nbsp;
                    </button>
                    <div className="dropdown-menu"><a className="dropdown-item" href="#">View
                        profile</a><a className="dropdown-item"
                                      href="#">Send
                        message</a><a className="dropdown-item" href="#">Locate</a><a
                        className="dropdown-item" href="#">Delete
                        friend</a></div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-lg friends-item" data-toggle="dropdown"
                            aria-expanded="false" type="button">
                        Laurent&nbsp;
                    </button>
                    <div className="dropdown-menu"><a className="dropdown-item" href="#">View
                        profile</a><a className="dropdown-item"
                                      href="#">Send
                        message</a><a className="dropdown-item" href="#">Locate</a><a
                        className="dropdown-item" href="#">Delete
                        friend</a></div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-lg friends-item" data-toggle="dropdown"
                            aria-expanded="false" type="button">
                        Shradda&nbsp;
                    </button>
                    <div className="dropdown-menu"><a className="dropdown-item" href="#">View
                        profile</a><a className="dropdown-item"
                                      href="#">Send
                        message</a><a className="dropdown-item" href="#">Locate</a><a
                        className="dropdown-item" href="#">Delete
                        friend</a></div>
                </div>
            </div>
        </div>
    )
}



export default Friends
