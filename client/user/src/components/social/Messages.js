import React, { Fragment } from 'react'

const Messages = () => {
    return (
        <Fragment>
        <div className="col responsive-padding" style={{marginBottom: 20}}>
                <button className="btn btn-outline-primary btn-block btn-lg header-msg-friends"
                        data-toggle="tooltip"
                        data-bs-tooltip="" type="button" title="Messages"><i
                    className="typcn typcn-messages"
                    style={{fontSize: 30}}
                    title="Messages"></i></button>
                <div
                    className="border border-primary friends-msg-container">
                    <div
                        className="d-flex flex-row justify-content-between msg-item border border-bottom">
                        <div className="d-flex flex-column justify-content-center">
                            <p className="msg-name">Paul</p>
                            <p className="msg-date">2 days ago</p>
                        </div>
                        <div
                            className="d-flex flex-column justify-content-center align-items-center msg-content">
                            <p className="lead">Hey, do you think we will need a video projector for the
                                next meeting ?</p>
                            <div className="dropdown">
                                <button className="btn btn-primary" data-toggle="dropdown"
                                        aria-expanded="false" type="button"><i
                                    className="icon-envelope-letter"></i></button>
                                <div className="dropdown-menu"><a className="dropdown-item answer-msg"
                                                                  href="#">Answer</a><a
                                    className="dropdown-item delete-msg bg-danger" href="#">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="d-flex flex-row justify-content-between msg-item border border-bottom">
                        <div className="d-flex flex-column justify-content-center">
                            <p className="msg-name">Jorgo</p>
                            <p className="msg-date">3 minutes ago</p>
                        </div>
                        <div
                            className="d-flex flex-column justify-content-center align-items-center msg-content">
                            <p className="lead">Are you up for a coffee-break ?</p>
                            <div className="dropdown">
                                <button className="btn btn-primary" data-toggle="dropdown"
                                        aria-expanded="false" id="action-message-1"
                                        type="button"><i className="icon-envelope-letter"></i></button>
                                <div className="dropdown-menu"><a className="dropdown-item answer-msg"
                                                                  href="#">Answer</a><a
                                    className="dropdown-item delete-msg bg-danger" href="#">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" role="dialog" tabIndex="-1" id="del-msg-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this message ?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-light" type="button" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" type="button">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" role="dialog" tabIndex="-1" id="answer-msg-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Jorgo</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex flex-column"><em className="italic-small">Are you up for a
                            coffee-break ?</em><textarea
                            className="response-msg-modal" style={{fontSize: '1rem'}}></textarea></div>
                        <div className="modal-footer">
                            <button className="btn btn-light" type="button" data-dismiss="modal">Close</button>
                            <button className="btn btn-primary" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Messages
