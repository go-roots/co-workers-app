import React from 'react'

const Friends = props => {
    return (
        <div className="col-xl-4 responsive-padding">
            <button className="btn btn-outline-info btn-block btn-lg header-msg-friends"
                    data-toggle="tooltip"
                    data-bs-tooltip="" type="button" title="Friends">
                <i className="icon-people"
                   style={{fontSize: 30}}
                   title="Friends"></i>
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
