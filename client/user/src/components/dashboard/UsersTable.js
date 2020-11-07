/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProfiles } from '../../store/actions/profiles';
//Icons
import { HiOutlineLightBulb, HiUserGroup } from 'react-icons/hi';
import { FaCircle, FaUserMinus, FaRegComment, FaUserPlus } from 'react-icons/fa';
import { ImLifebuoy, ImAccessibility } from 'react-icons/im';
import Tooltip from '@material-ui/core/Tooltip';


const initialState = {
    allMembers: true,
    friends: false,
    activity: null,
    status: null,
};

const FiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FRIENDS':
            return {
                ...state,
                friends: !state.friends
            };
        case 'SET_ACTIVITY':
            return {
                ...state,
                activity: action.name
            };
        case 'SET_STATUS':
            return {
                ...state,
                status: action.name
            };
        case 'SET_ALL_MEMBERS':
            return initialState;
        default:
            return state
    }
};

const UsersTable = ({ data: profiles }) => {

    const [activeElements, setActiveElements] = useState([]);
    const [socialDD, setSocialDD] = useState("dropdown-menu");
    const [activityDD, setActivityDD] = useState("dropdown-menu");
    const [activityDDModal, setActivityDDModal] = useState("dropdown-menu");

    const dispatch = useDispatch();

    const [appliedFilters, dispatchFilter] = useReducer(FiltersReducer, initialState);

    const filtersHandler = async (e, activity, status, friends) => {
        if (e.target.parentElement.id === 'status-sector-menu' || e.target.parentElement.id === 'activity-sector-menu') {
            let updatedActiveElements = [...activeElements];
            for (let child of e.target.parentElement.children) {
                child != e.target && child.classList.remove('checked-element');
                updatedActiveElements.includes(child) && updatedActiveElements.splice(child);
            }
            setActiveElements(updatedActiveElements);
            if (activity) await dispatchFilter({ type: 'SET_ACTIVITY', name: activity });
            if (status) await dispatchFilter({ type: 'SET_STATUS', name: status });
        }
        //All members needs to reset all other filters
        if (e.target.id === 'allMembers') {
            for (let elem of activeElements) {
                elem.classList.remove('checked-element');
            }
            setActiveElements([]);

            await dispatchFilter({ type: 'SET_ALL_MEMBERS' });
            return dispatch(fetchProfiles(null, null, null));
        }

        if (!e.target.classList.contains('checked-element')) {
            setActiveElements([...activeElements, e.target]);
        } else {
            let updatedActiveElements = [...activeElements];
            updatedActiveElements.splice(e.target);
            setActiveElements(updatedActiveElements);
        }

        e.target.classList.toggle('checked-element');

        if (friends) {
            return dispatchFilter({ type: 'SET_FRIENDS' });
        }
    };

    useEffect(() => {
        dispatch(fetchProfiles(appliedFilters.activity, appliedFilters.status, appliedFilters.friends));
    }, [appliedFilters]);


    return (
        <Fragment>
            <div className="col-sm-12 col-md-4 col-lg-3 col-xl-4 offset-xl-0 d-flex flex-column">
                <div id="people-container" className="responsive-margin">
                    <div className="d-flex flex-row justify-content-between align-items-start filters-container" id="people-header">
                        <div
                            data-tip="Send a help request"
                            className="d-flex flex-column justify-content-center align-items-center"
                            id="help-request"
                            data-toggle="modal"
                            data-target="#help-request-modal"
                        >
                            <HiOutlineLightBulb style={{ color: "rgb(255,255,0)", paddingTop: "2px", marginBottom: "-5px" }} />
                            <HiUserGroup
                                data-tip="Send a help request"
                                style={{ padding: "0px", paddingRight: "10px", paddingBottom: "5px", paddingLeft: "10px", width: "46px", height: "30px" }}
                            />
                        </div>
                        <div className="dropdown social-dropdown">
                            <button
                                className="btn btn-outline-success btn-sm dropdown-toggle text-body social-dropdown-button"
                                data-toggle="dropdown"
                                aria-expanded="false"
                                type="button">
                                I want to see...&nbsp;
                            </button>
                            {/* {Filters} */}
                            <div className="dropdown-menu">
                                {/* {All users - no filter} */}
                                <button
                                    id="allMembers"
                                    className="dropdown-item"
                                    type='button'
                                    onClick={e => filtersHandler(e, null, null, null)}
                                >
                                    All members
                                </button>
                                {/* {Status selected} */}
                                <div onMouseEnter={e => setSocialDD("dropdown-menu show")}
                                    onMouseLeave={e => setSocialDD("dropdown-menu")}
                                    className="dropleft"
                                    id="status-sector-dropleft"
                                >
                                    <button
                                        className="btn dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                        type="button">
                                        Status
                                    </button>
                                    <div className={socialDD} id="status-sector-menu">
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={e => filtersHandler(e, null, 'Available', null)}
                                        >
                                            Available
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={e => filtersHandler(e, null, 'Do not disturb', null)}
                                        >
                                            Do not disturb
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={e => filtersHandler(e, null, 'Unavailable', null)}
                                        >
                                            Unavailable
                                        </button>
                                    </div>
                                </div>
                                {/* {Friends selected} */}
                                <button
                                    className="dropdown-item"
                                    type='button'
                                    onClick={e => filtersHandler(e, null, null, true)}
                                >
                                    Friends
                                </button>
                                {/* {Activity sector selection} */}
                                <div
                                    className="dropleft"
                                    id="activity-sector-dropleft"
                                    onMouseEnter={e => setActivityDD("dropdown-menu show")}
                                    onMouseLeave={e => setActivityDD("dropdown-menu")}
                                >
                                    <button
                                        className="btn dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                        type="button">
                                        Activity Sector
                                    </button>
                                    <div className={activityDD} id="activity-sector-menu">
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Accountancy, banking and finance', null, null)}
                                        >
                                            Accountancy, banking and finance
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Business, consulting and management', null, null)}
                                        >
                                            Business, consulting and management
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Charity and voluntary work', null, null)}
                                        >
                                            Charity and voluntary work
                                        </button><button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Creative arts and design', null, null)}
                                        >
                                            Creative arts and design
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Student or Learning', null, null)}
                                        >
                                            Student or Learning
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Instructor or Teacher', null, null)}
                                        >
                                            Instructor or Teacher
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Energy and utilities', null, null)}
                                        >
                                            Energy and utilities
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Engineering and manufacturing', null, null)}
                                        >
                                            Engineering and manufacturing
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Environement and agriculture', null, null)}
                                        >
                                            Environement and agriculture
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Healthcare', null, null)}
                                        >
                                            Healthcare
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Hospitality and events management', null, null)}
                                        >
                                            Hospitality and events management
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Information technologies', null, null)}
                                        >
                                            Information technologies
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Law', null, null)}
                                        >
                                            Law
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Leisure, sport and tourism', null, null)}
                                        >
                                            Leisure, sport and tourism
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Marketing, advertising and PR', null, null)}
                                        >
                                            Marketing, advertising and PR
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Media and internet', null, null)}
                                        >
                                            Media and internet
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Recruitement and retailement', null, null)}
                                        >
                                            Recruitement and retailement
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'HR', null, null)}
                                        >
                                            HR
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Sales', null, null)}
                                        >
                                            Sales
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Science and pharmaceuticals', null, null)}
                                        >
                                            Science and pharmaceuticals
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Social care', null, null)}
                                        >
                                            Social care
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => filtersHandler(e, 'Transportation and logistics', null, null)}
                                        >
                                            Transportation and logistics
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" role="dialog" tabIndex="-1" id="help-request-modal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Help request</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="modal-form" style={{ fontSize: "1rem" }}>
                                            <div className="form-group">
                                                <label>Send help request to ...</label>
                                                <div className="dropdown social-dropdown">
                                                    <button
                                                        className="btn btn-outline-success btn-sm dropdown-toggle text-body social-dropdown-button"
                                                        data-toggle="dropdown"
                                                        aria-expanded="false"
                                                        type="button"
                                                    >
                                                        I want to see...&nbsp;
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <button
                                                            className="dropdown-item"
                                                            type='button'
                                                        >
                                                            Available
                                                        </button>
                                                        <button
                                                            className="dropdown-item"
                                                            type='button'
                                                        >
                                                            Friends
                                                        </button>
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
                                                                    logistics</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Explain your problem in a few words</label>
                                                <textarea className="form-control"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-light" type="button" data-dismiss="modal">Close</button>
                                        <button className="btn btn-primary" type="button">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Start of displaying the users */}
                    <div id="people-body">
                        {profiles.map(profile => profile.role === 'user' && (
                            <div key={profile.id} className="d-flex flex-row justify-content-between align-items-baseline people-inner-element">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <Tooltip title={profile?.profile?.status}>
                                        <div>
                                            <FaCircle
                                                className={profile?.profile?.status === 'Available'
                                                    ? "user-icon-available"
                                                    : (profile?.profile?.status === 'Do not disturb' ? "user-icon-dnd" : "user-icon-invisible")}
                                            />
                                        </div>
                                    </Tooltip>
                                    <Link className="dashboard-name-link" to={`profile/${profile.id}`}>{`${profile.firstName} ${profile.lastName}`}</Link>
                                </div>
                                <div className="d-flex flex-row align-items-baseline">
                                    {profile?.profile?.mood === 'Prefer to stay alone' && (
                                        <Tooltip title={profile?.profile?.mood}>
                                            <div>
                                                <FaUserMinus className="mood-status-icon" size={25} />
                                            </div>
                                        </Tooltip>
                                    )}
                                    {profile?.profile?.mood === 'Feeling sociable' && (
                                        <Tooltip title={profile?.profile?.mood}>
                                            <div>
                                                <FaUserPlus className="mood-status-icon" size={25} />
                                            </div>
                                        </Tooltip>
                                    )}
                                    {profile?.profile?.mood === 'Willing to help others' && (
                                        <Tooltip title={profile?.profile?.mood}>
                                            <div>
                                                <ImAccessibility className="mood-status-icon" size={25} />
                                            </div>
                                        </Tooltip>
                                    )}

                                    {profile?.profile?.status !== 'Unavailable' && (
                                        <Tooltip title="Send a help request">
                                            <div>
                                                <ImLifebuoy className="ask-help-icon" size={25} />
                                            </div>
                                        </Tooltip>
                                    )}

                                    {profile?.profile?.status !== 'Unavailable' && (
                                        <Tooltip title="Send a message">
                                            <div>
                                                <FaRegComment className="comment-icon" size={25} />
                                            </div>
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UsersTable;