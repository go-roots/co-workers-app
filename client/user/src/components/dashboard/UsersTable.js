/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
//Icons
import { HiOutlineLightBulb, HiUserGroup } from 'react-icons/hi';
import { FaCircle, FaUserMinus, FaRegComment, FaUserPlus } from 'react-icons/fa';
import { ImLifebuoy, ImAccessibility } from 'react-icons/im';


const UsersTable = ({ data }) => {

    const [socialDD, setSocialDD] = useState("dropdown-menu");
    const [activityDD, setActivityDD] = useState("dropdown-menu");
    const [activityDDModal, setActivityDDModal] = useState("dropdown-menu");

    return (
        <Fragment>
            <div className="col-sm-12 col-md-4 col-lg-3 col-xl-4 offset-xl-0 d-flex flex-column">
                <div id="people-container" className="responsive-margin">
                    <div className="d-flex flex-row justify-content-between align-items-start filters-container" id="people-header">
                        <div data-tip="Send a help request" className="d-flex flex-column justify-content-center align-items-center"
                            id="help-request" data-toggle="modal" data-target="#help-request-modal">
                            <HiOutlineLightBulb style={{ color: "rgb(255,255,0)", paddingTop: "2px", marginBottom: "-5px" }} />
                            <HiUserGroup data-tip="Send a help request"
                                style={{ padding: "0px", paddingRight: "10px", paddingBottom: "5px", paddingLeft: "10px", width: "46px", height: "30px" }} />
                        </div>
                        <div className="dropdown social-dropdown">
                            <button className="btn btn-outline-success btn-sm dropdown-toggle text-body social-dropdown-button"
                                data-toggle="dropdown" aria-expanded="false" type="button">I want to see...&nbsp;
                            </button>
                            <div className="dropdown-menu">
                                <div onMouseEnter={e => setSocialDD("dropdown-menu show")}
                                    onMouseLeave={e => setSocialDD("dropdown-menu")}
                                    className="dropleft"
                                    id="status-sector-dropleft"
                                >
                                    <button className="btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false"
                                        type="button">
                                        Status
                                    </button>
                                    <div className={socialDD} id="status-sector-menu">
                                        <a className="dropdown-item" href="#">Available</a>
                                        <a className="dropdown-item" href="#">Do not disturb</a>
                                        <a className="dropdown-item" href="#">Unavailable</a>
                                    </div>
                                </div><a className="dropdown-item" href="#">Friends</a>
                                <div className="dropleft" id="activity-sector-dropleft" onMouseEnter={e =>
                                    setActivityDD("dropdown-menu show")}
                                    onMouseLeave={e => setActivityDD("dropdown-menu")}
                                >
                                    <button className="btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false"
                                        type="button"> Activity Sector
                                    </button>
                                    <div className={activityDD} id="activity-sector-menu">
                                        <a className="dropdown-item" href="#">Accountancy, banking and finance</a><a
                                            className="dropdown-item" href="#">Business, consulting and management</a><a
                                                className="dropdown-item" href="#">Charity and voluntary work</a><a
                                                    className="dropdown-item" href="#">Creative arts and design</a><a className="dropdown-item"
                                                        href="#">Student or Learning</a><a className="dropdown-item" href="#">Instructor
                                            or Teacher</a><a className="dropdown-item" href="#">Energy and utilities</a>
                                        <a className="dropdown-item" href="#">Engineering and manufacturing</a><a
                                            className="dropdown-item" href="#">Environement and agriculture</a><a
                                                className="dropdown-item" href="#">Healthcare</a><a className="dropdown-item"
                                                    href="#">Hospitality and events management</a>
                                        <a className="dropdown-item" href="#">Information technologies</a><a className="dropdown-item"
                                            href="#">Law</a><a className="dropdown-item" href="#">Leisure, sport and tourism</a><a
                                                className="dropdown-item" href="#">Marketing, advertising and PR</a><a
                                                    className="dropdown-item" href="#">Media and internet</a><a className="dropdown-item"
                                                        href="#">Recruitement and retailement</a><a className="dropdown-item" href="#">HR</a><a
                                                            className="dropdown-item" href="#">Sales</a><a className="dropdown-item" href="#">Science
                                            and pharmaceuticals</a><a className="dropdown-item" href="#">Social care</a><a
                                            className="dropdown-item" href="#">Transportation and logistics</a></div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" role="dialog" tabIndex="-1" id="help-request-modal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Help request</h4><button type="button" className="close"
                                            data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="modal-form" style={{ fontSize: "1rem" }}>
                                            <div className="form-group"><label>Send help request to ...</label>
                                                <div className="dropdown social-dropdown"><button
                                                    className="btn btn-outline-success btn-sm dropdown-toggle text-body social-dropdown-button"
                                                    data-toggle="dropdown" aria-expanded="false" type="button">I
                                                        want to see...&nbsp;</button>
                                                    <div className="dropdown-menu"><a className="dropdown-item" href="#">Available</a><a
                                                        className="dropdown-item" href="#">Friends</a>
                                                        <div className="dropleft" id="activity-sector-dropleft-modal"
                                                            onMouseEnter={e => setActivityDDModal("dropdown-menu show")}
                                                            onMouseLeave={e => setActivityDDModal("dropdown-menu")}
                                                        >
                                                            <button className="btn dropdown-toggle" data-toggle="dropdown"
                                                                aria-expanded="false" type="button">Activity
                                                                Sector</button>
                                                            <div className={activityDDModal} id="activity-sector-menu-modal">
                                                                <a className="dropdown-item" href="#">Accountancy, banking
                                                                    and finance</a><a className="dropdown-item" href="#">Business,
                                                                    consulting and management</a><a className="dropdown-item"
                                                                    href="#">Charity and voluntary
                                                                    work</a>
                                                                <a className="dropdown-item" href="#">Creative arts and
                                                                    design</a><a className="dropdown-item" href="#">Student
                                                                    or Learning</a><a className="dropdown-item" href="#">Instructor
                                                                    or Teacher</a><a className="dropdown-item" href="#">Energy and
                                                                    utilities</a>
                                                                <a className="dropdown-item" href="#">Engineering and
                                                                    manufacturing</a><a className="dropdown-item"
                                                                    href="#">Environement and agriculture</a><a
                                                                        className="dropdown-item" href="#">Healthcare</a><a
                                                                            className="dropdown-item" href="#">Hospitality and
                                                                    events management</a>
                                                                <a className="dropdown-item" href="#">Information
                                                                    technologies</a><a className="dropdown-item" href="#">Law</a><a
                                                                    className="dropdown-item" href="#">Leisure, sport and
                                                                    tourism</a><a className="dropdown-item" href="#">Marketing,
                                                                    advertising and PR</a>
                                                                <a className="dropdown-item" href="#">Media and
                                                                    internet</a><a className="dropdown-item" href="#">Recruitement
                                                                    and retailement</a><a className="dropdown-item"
                                                                    href="#">HR</a><a className="dropdown-item" href="#">Sales</a><a
                                                                        className="dropdown-item" href="#">Science and
                                                                    pharmaceuticals</a><a className="dropdown-item" href="#">Social
                                                                    care</a><a className="dropdown-item" href="#">Transportation and
                                                                    logistics</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group"><label>Explain your problem in a few
                                                    words</label><textarea className="form-control"></textarea></div>
                                        </form>
                                    </div>
                                    <div className="modal-footer"><button className="btn btn-light" type="button"
                                        data-dismiss="modal">Close</button><button className="btn btn-primary"
                                            type="button">Save</button></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Start of displaying the users */}
                    <div id="people-body">
                        <div className="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <FaCircle data-tip="Available" className="user-icon-available" title="available" />
                                <a className="dashboard-name-link" href="profile.html">Nicolas Cage</a>
                            </div>
                            <div className="d-flex flex-row align-items-baseline">
                                <FaUserMinus className="mood-status-icon" data-tip="Prefer to stay alone" size={25} />
                                <ImLifebuoy className="ask-help-icon" data-tip="Send a help request" size={25} />
                                <FaRegComment className="comment-icon" data-tip="Send a message" size={25} />
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <FaCircle data-tip="Available" className="user-icon-available" title="available" />
                                <a className="dashboard-name-link" href="profile.html">Laurent Perrussel</a>
                            </div>
                            <div className="d-flex flex-row align-items-baseline">
                                <FaUserMinus className="mood-status-icon" data-tip="Prefer to stay alone" size={25} />
                                <ImLifebuoy className="ask-help-icon" data-tip="Send a help request" size={25} />
                                <FaRegComment className="comment-icon" data-tip="Send a message" size={25} />
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <FaCircle data-tip="Available" className="user-icon-available" title="available" />
                                <a className="dashboard-name-link" href="profile.html">Daiqiao</a></div>
                            <div className="d-flex flex-row align-items-baseline">
                                <FaUserPlus className="mood-status-icon" data-tip="Feeling social" size={25} />
                                <ImLifebuoy className="ask-help-icon" data-tip="Send a help request" size={25} />
                                <FaRegComment className="comment-icon" data-tip="Send a message" size={25} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-baseline people-inner-element">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <FaCircle data-tip="DND" className="user-icon-dnd" title="DND" />
                                <a className="dashboard-name-link" href="profile.html">Paul</a></div>
                            <div className="d-flex flex-row align-items-baseline">
                                <FaUserPlus className="mood-status-icon" data-tip="Feeling social" size={25} />
                                <FaRegComment className="comment-icon" data-tip="Send a message" size={25} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-baseline people-inner-element">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <FaCircle data-tip="Available" className="user-icon-available" title="available" />
                                <a className="dashboard-name-link" href="profile.html">Shradda</a></div>
                            <div className="d-flex flex-row align-items-baseline">
                                <ImAccessibility className="mood-status-icon" data-tip="Willing to help others" size={25} />
                                <ImLifebuoy className="ask-help-icon" data-tip="Send a help request" size={25} />
                                <FaRegComment className="comment-icon" data-tip="Send a message" size={25} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-baseline people-inner-element">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <FaCircle data-tip="Available" className="user-icon-available" title="available" />
                                <a className="dashboard-name-link" href="profile.html">Jorgo</a>
                            </div>
                            <div className="d-flex flex-row align-items-baseline">
                                <ImAccessibility className="mood-status-icon" data-tip="Willing to help others" size={25} />
                                <ImLifebuoy className="ask-help-icon" data-tip="Send a help request" size={25} />
                                <FaRegComment className="comment-icon" data-tip="Send a message" size={25} />
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <FaCircle data-tip="Invisible" className="user-icon-invisible" title="Invisible" />
                                <a className="dashboard-name-link" href="profile.html">Ilya</a></div>
                            <div className="d-flex flex-row align-items-baseline">
                                <FaUserMinus className="mood-status-icon" data-tip="Prefer to stay alone" size={25} />
                                <FaRegComment className="comment-icon" data-tip="Send a message" size={25} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-baseline people-inner-element">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <FaCircle data-tip="DND" className="user-icon-dnd" title="DND" />
                                <a className="dashboard-name-link" href="profile.html">Lonely Panda</a>
                            </div>
                            <div className="d-flex flex-row align-items-baseline">
                                <FaUserMinus className="mood-status-icon" data-tip="Prefer to stay alone" size={25} />
                                <FaRegComment className="comment-icon" data-tip="Send a message" size={25} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UsersTable;