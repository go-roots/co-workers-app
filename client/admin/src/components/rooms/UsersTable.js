import React from 'react'

const UsersTable = () => {
    return (
        <div className="col-sm-12 col-md-4 col-lg-3 col-xl-4 offset-xl-0 d-flex flex-column">
            <div id="people-inner-container" className="responsive-margin">
                <div className="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <i className="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip=""
                            title="available"></i><a className="dashboard-name-link" href="profile.html">Nicolas Cage</a>
                    </div>
                    <div className="d-flex flex-row align-items-baseline">
                        <i className="fas fa-user-minus mood-status-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Prefer to stay alone"></i><i className="icon ion-help-buoy ask-help-icon"
                                data-toggle="tooltip" data-bs-tooltip=""
                                title="Send a help request"></i>
                        <i className="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Send a message"></i>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <i className="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip=""
                            title="Available"></i><a className="dashboard-name-link" href="profile.html">Laurent Perrussel</a>
                    </div>
                    <div className="d-flex flex-row align-items-baseline">
                        <i className="fas fa-user-plus mood-status-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Feeling social"></i><i className="icon ion-help-buoy ask-help-icon" data-toggle="tooltip"
                                data-bs-tooltip="" title="Send a help request"></i>
                        <i className="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Send a message"></i>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <i className="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip=""
                            title="Available"></i><a className="dashboard-name-link" href="profile.html">Daiqiao</a>
                    </div>
                    <div className="d-flex flex-row align-items-baseline">
                        <i className="fas fa-user-plus mood-status-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Feeling social"></i><i className="icon ion-help-buoy ask-help-icon" data-toggle="tooltip"
                                data-bs-tooltip="" title="Send a help request"></i>
                        <i className="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Send a message"></i>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-baseline people-inner-element">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <i className="fa fa-circle user-icon-dnd" data-toggle="tooltip" data-bs-tooltip="" title="DND"></i><a
                            className="dashboard-name-link" href="profile.html">Paul</a>
                    </div>
                    <div className="d-flex flex-row align-items-baseline">
                        <i className="fas fa-user-plus add-friend-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Feeling social"></i><i className="fa fa-comment-o comment-icon" data-toggle="tooltip"
                                data-bs-tooltip="" title="Send a message"></i>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-baseline people-inner-element">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <i className="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip=""
                            title="Available"></i><a className="dashboard-name-link" href="profile.html">Shradda</a>
                    </div>
                    <div className="d-flex flex-row align-items-baseline">
                        <i className="material-icons mood-status-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Willing to help others">accessibility</i><i className="icon ion-help-buoy ask-help-icon"
                                data-toggle="tooltip" data-bs-tooltip=""
                                title="Send a help request"></i>
                        <i className="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Send a message"></i>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-baseline people-inner-element">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <i className="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip=""
                            title="DND"></i><a className="dashboard-name-link" href="profile.html">Jorgo</a>
                    </div>
                    <div className="d-flex flex-row align-items-baseline">
                        <i className="material-icons mood-status-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Willing to help others">accessibility</i><i className="icon ion-help-buoy ask-help-icon"
                                data-toggle="tooltip" data-bs-tooltip=""
                                title="Send a help request"></i>
                        <i className="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Send a message"></i>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <i className="fa fa-circle user-icon-invisible" data-toggle="tooltip" data-bs-tooltip=""
                            title="Invisible"></i><a className="dashboard-name-link" href="profile.html">Ilya</a>
                    </div>
                    <div className="d-flex flex-row align-items-baseline">
                        <i className="fas fa-user-minus mood-status-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Prefer to stay alone"></i><i className="fa fa-comment-o comment-icon" data-toggle="tooltip"
                                data-bs-tooltip="" title="Send a message"></i>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-baseline people-inner-element">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <i className="fa fa-circle user-icon-dnd" data-toggle="tooltip" data-bs-tooltip=""
                            title="Available"></i><a className="dashboard-name-link" href="profile.html">Lonely Panda</a>
                    </div>
                    <div className="d-flex flex-row align-items-baseline">
                        <i className="fas fa-user-minus mood-status-icon" data-toggle="tooltip" data-bs-tooltip=""
                            title="Prefer to stay alone"></i><i className="fa fa-comment-o comment-icon" data-toggle="tooltip"
                                data-bs-tooltip="" title="Send a message"></i>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-baseline people-inner-element">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <i className="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip=""
                            title="Available"></i><a className="dashboard-name-link" href="profile.html">Cool Monkey</a>
                    </div>
                    <div className="d-flex flex-row align-items-baseline">
                        <i className="fas fa-user-plus add-friend-icon"></i><i
                            className="icon ion-help-buoy ask-help-icon"></i><i className="fa fa-comment-o comment-icon"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersTable
