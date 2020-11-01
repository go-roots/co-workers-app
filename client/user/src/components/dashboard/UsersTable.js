import React, { Fragment } from 'react'

const UsersTable = () => {
    return (
        <Fragment>
            <div class="col-sm-12 col-md-4 col-lg-3 col-xl-4 offset-xl-0 d-flex flex-column">
                <div id="people-inner-container" class="responsive-margin">
                    <div class="d-flex flex-row justify-content-between align-items-start filters-container" id="people-header">
                        <div class="d-flex flex-column justify-content-center align-items-center" id="help-request">
                            <i class="la la-lightbulb-o" data-toggle="tooltip" data-bs-tooltip="" style={{color: "rgb(255,255,0)", fontSize: "15px", paddingTop: "5px"}}></i>
                            <i class="fa fa-group" data-toggle="tooltip" data-bs-tooltip="" title="Send a help request"
                                style={{padding: "0px", paddingRight: "10px", paddingBottom: "5px", paddingLeft: "10px"}}></i>
                        </div>
                        <div class="dropdown social-dropdown"><button class="btn btn-outline-success btn-sm dropdown-toggle text-body social-dropdown-button" data-toggle="dropdown" aria-expanded="false" type="button">I want to see...&nbsp;</button>
                            <div class="dropdown-menu"><a class="dropdown-item" href="#">Available</a><a class="dropdown-item" href="#">Friends</a><a class="dropdown-item" href="#">Peers</a></div>
                        </div>
                        <div class="modal fade" role="dialog" tabindex="-1" id="help-request-modal">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Help request</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                                    <div class="modal-body">
                                        <form class="modal-form" style={{fontSize: "1rem"}}>
                                            <div class="form-group"><label>Send help request to ...</label>
                                                <div class="dropdown social-dropdown"><button class="btn btn-outline-success btn-sm dropdown-toggle text-body social-dropdown-button" data-toggle="dropdown" aria-expanded="false" type="button">I want to see...&nbsp;</button>
                                                    <div class="dropdown-menu"><a class="dropdown-item" href="#">Available</a><a class="dropdown-item" href="#">Friends</a><a class="dropdown-item" href="#">Peers</a></div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label>Explain your problem in a few words</label><textarea class="form-control"></textarea></div>
                                        </form>
                                    </div>
                                    <div class="modal-footer"><button class="btn btn-light" type="button" data-dismiss="modal">Close</button><button class="btn btn-primary" type="button">Save</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                        <div class="d-flex flex-row justify-content-between align-items-center"><i class="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip="" title="available"></i><a class="dashboard-name-link" href="profile.html">Nicolas Cage</a></div>
                        <div class="d-flex flex-row align-items-baseline"><i class="fas fa-user-minus mood-status-icon" data-toggle="tooltip" data-bs-tooltip="" title="Prefer to stay alone"></i><i class="icon ion-help-buoy ask-help-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a help request"></i>
                            <i
                                class="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a message"></i>
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                        <div class="d-flex flex-row justify-content-between align-items-center"><i class="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip="" title="Available"></i><a class="dashboard-name-link" href="profile.html">Laurent Perrussel</a></div>
                        <div class="d-flex flex-row align-items-baseline"><i class="fas fa-user-plus mood-status-icon" data-toggle="tooltip" data-bs-tooltip="" title="Feeling social"></i><i class="icon ion-help-buoy ask-help-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a help request"></i>
                            <i
                                class="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a message"></i>
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                        <div class="d-flex flex-row justify-content-between align-items-center"><i class="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip="" title="Available"></i><a class="dashboard-name-link" href="profile.html">Daiqiao</a></div>
                        <div class="d-flex flex-row align-items-baseline"><i class="fas fa-user-plus mood-status-icon" data-toggle="tooltip" data-bs-tooltip="" title="Feeling social"></i><i class="icon ion-help-buoy ask-help-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a help request"></i>
                            <i
                                class="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a message"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-baseline people-inner-element">
                        <div class="d-flex flex-row justify-content-between align-items-center"><i class="fa fa-circle user-icon-dnd" data-toggle="tooltip" data-bs-tooltip="" title="DND"></i><a class="dashboard-name-link" href="profile.html">Paul</a></div>
                        <div class="d-flex flex-row align-items-baseline"><i class="fas fa-user-plus add-friend-icon" data-toggle="tooltip" data-bs-tooltip="" title="Feeling social"></i><i class="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a message"></i></div>
                    </div>
                    <div class="d-flex justify-content-between align-items-baseline people-inner-element">
                        <div class="d-flex flex-row justify-content-between align-items-center"><i class="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip="" title="Available"></i><a class="dashboard-name-link" href="profile.html">Shradda</a></div>
                        <div class="d-flex flex-row align-items-baseline"><i class="material-icons mood-status-icon" data-toggle="tooltip" data-bs-tooltip="" title="Willing to help others">accessibility</i><i class="icon ion-help-buoy ask-help-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a help request"></i>
                            <i
                                class="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a message"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-baseline people-inner-element">
                        <div class="d-flex flex-row justify-content-between align-items-center"><i class="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip="" title="DND"></i><a class="dashboard-name-link" href="profile.html">Jorgo</a></div>
                        <div class="d-flex flex-row align-items-baseline"><i class="material-icons mood-status-icon" data-toggle="tooltip" data-bs-tooltip="" title="Willing to help others">accessibility</i><i class="icon ion-help-buoy ask-help-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a help request"></i>
                            <i
                                class="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a message"></i>
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                        <div class="d-flex flex-row justify-content-between align-items-center"><i class="fa fa-circle user-icon-invisible" data-toggle="tooltip" data-bs-tooltip="" title="Invisible"></i><a class="dashboard-name-link" href="profile.html">Ilya</a></div>
                        <div class="d-flex flex-row align-items-baseline"><i class="fas fa-user-minus mood-status-icon" data-toggle="tooltip" data-bs-tooltip="" title="Prefer to stay alone"></i><i class="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a message"></i></div>
                    </div>
                    <div class="d-flex justify-content-between align-items-baseline people-inner-element">
                        <div class="d-flex flex-row justify-content-between align-items-center"><i class="fa fa-circle user-icon-dnd" data-toggle="tooltip" data-bs-tooltip="" title="Available"></i><a class="dashboard-name-link" href="profile.html">Lonely Panda</a></div>
                        <div class="d-flex flex-row align-items-baseline"><i class="fas fa-user-minus mood-status-icon" data-toggle="tooltip" data-bs-tooltip="" title="Prefer to stay alone"></i><i class="fa fa-comment-o comment-icon" data-toggle="tooltip" data-bs-tooltip="" title="Send a message"></i></div>
                    </div>
                    <div class="d-flex justify-content-between align-items-baseline people-inner-element">
                        <div class="d-flex flex-row justify-content-between align-items-center"><i class="fa fa-circle user-icon-available" data-toggle="tooltip" data-bs-tooltip="" title="Available"></i><a class="dashboard-name-link" href="profile.html">Cool Monkey</a></div>
                        <div class="d-flex flex-row align-items-baseline"><i class="fas fa-user-plus add-friend-icon"></i><i class="icon ion-help-buoy ask-help-icon"></i><i class="fa fa-comment-o comment-icon"></i></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UsersTable;
