/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, setIndividualProfile } from '../../store/actions/profiles';
import { sendhelpR } from '../../store/actions/helpR';
import { setAlert } from '../../store/actions/alerts'
import { activitySectors } from '../../utils/constants'
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import { HiOutlineLightBulb, HiUserGroup } from 'react-icons/hi';
import { FaCircle, FaUserMinus, FaRegComment, FaUserPlus } from 'react-icons/fa';
import { ImLifebuoy, ImAccessibility } from 'react-icons/im';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';


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

const UsersTable = ({ data: { profiles, me } }) => {

    const baseUrl = useSelector(state => state.globalVars.currentDomain + '/api/cw-api');
    const selectedProfile = useSelector(state => state.profiles.profile);
    const [individualHelpR, setIndividualHelpR] = useState(false);
    const [activeElements, setActiveElements] = useState([]);
    const [socialDD, setSocialDD] = useState("dropdown-menu");
    const [activityDD, setActivityDD] = useState("dropdown-menu");
    const [message, setMessage] = useState("");
    const [question, setQuestion] = useState("");

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
            if (activity) await dispatchFilter({ type: 'SET_ACTIVITY', name: !e.target.classList.contains('checked-element') ? activity : null });
            if (status) await dispatchFilter({ type: 'SET_STATUS', name: !e.target.classList.contains('checked-element') ? status : null });
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
                            onClick={() => setIndividualHelpR(false)}
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
                                        {activitySectors.map(sector => (
                                            <button
                                                key={sector}
                                                className="dropdown-item"
                                                type='button'
                                                onClick={e => filtersHandler(e, sector, null, null)}
                                            >
                                                {sector}
                                            </button>
                                        ))}
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
                                    <Link
                                        onClick={() => dispatch(setIndividualProfile(profile))}
                                        className="dashboard-name-link"
                                        to={'/profile'}
                                    >
                                        {`${profile.firstName} ${profile.lastName}`}
                                    </Link>
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

                                    {profile?.profile?.status === 'Available' && profile.id != me.id && (
                                        <Tooltip title="Send a help request">
                                            <div>
                                                <ImLifebuoy
                                                    data-toggle="modal"
                                                    data-target="#help-request-modal"
                                                    className="ask-help-icon"
                                                    onClick={async () => {
                                                        await dispatch(setIndividualProfile(profile))
                                                        setIndividualHelpR(true);
                                                    }}
                                                    size={25}
                                                />
                                            </div>
                                        </Tooltip>
                                    )}

                                    {profile?.profile?.status === 'Available' && profile.id != me.id && (
                                        <Tooltip title="Send a message">
                                            <div>
                                                <FaRegComment
                                                    data-toggle='modal'
                                                    data-target='#messaging-modal'
                                                    className="comment-icon"
                                                    size={25}
                                                    onClick={() => dispatch(setIndividualProfile(profile))}
                                                />
                                            </div>
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div id="messaging-modal" role="dialog" tabIndex="-1" className="modal fade">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header align-items-center">
                                        <img className='rounded-circle' alt='' src={selectedProfile?.profile?.photo} width='50' height='50' />
                                        <h4 style={{ marginLeft: '10px' }} className="modal-title">{`${selectedProfile?.firstName} ${selectedProfile?.lastName}`}</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Type your message"
                                                    value={message}
                                                    onChange={e => setMessage(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        {selectedProfile?.friends?.friendRequests.some(user => user.user == me.id) ? (<button
                                            className="btn btn-danger d-flex flex-row align-items-center mr-auto"
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    const res = await axios.delete(baseUrl + '/users/friendReq/' + selectedProfile.id);
                                                    await dispatch(fetchProfiles(appliedFilters.activity, appliedFilters.status, appliedFilters.friends));
                                                    await dispatch(setIndividualProfile(res.data.data));
                                                    dispatch(setAlert('success', 'The friend request has been canceled!'));
                                                } catch (err) {
                                                    dispatch(setAlert('danger', err.response.data.error));
                                                }
                                            }}
                                        >
                                            Cancel friend request
                                            <AiOutlineUserDelete
                                                style={{ marginLeft: '5px' }}
                                                size='25'
                                            />
                                        </button>) : (selectedProfile?.friends.friends.some(user => user.user == me.id) ? (
                                            <button
                                                className="btn btn-primary d-flex flex-row align-items-center mr-auto"
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        const res = await axios.put(baseUrl + '/users/friendReq/' + selectedProfile.id);
                                                        await dispatch(fetchProfiles(appliedFilters.activity, appliedFilters.status, appliedFilters.friends));
                                                        await dispatch(setIndividualProfile(res.data.data));
                                                        dispatch(setAlert('success', `The friend request has been sent to ${selectedProfile?.firstName} ${selectedProfile?.lastName}!`));
                                                    } catch (err) {
                                                        dispatch(setAlert('danger', err.response.data.error));
                                                    }
                                                }}
                                            >
                                                Add friend
                                                <AiOutlineUserAdd
                                                    style={{ marginLeft: '5px' }}
                                                    size='25'
                                                />
                                            </button>
                                        ) : null)
                                        }
                                        <button className="btn btn-light" type="button" data-dismiss="modal">Close</button>
                                        <button
                                            data-dismiss="modal"
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    await axios.post(baseUrl + '/users/message/' + selectedProfile.id, { message });
                                                    dispatch(setAlert('success', `Your message has been sent to ${selectedProfile?.firstName} ${selectedProfile?.lastName}!`));
                                                } catch (err) {
                                                    dispatch(setAlert('danger', err.response.data.error));
                                                }
                                            }}
                                        >
                                            Save
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
                                            The help request will be sent to :
                                            <div
                                                style={{ marginTop: '20px', marginBottom: '25px' }}
                                                className="row"
                                            >
                                                {!individualHelpR ? profiles.map(profile => (
                                                    <div
                                                        style={{ marginLeft: '20px' }}
                                                        className='d-flex flex-column align-items-center'
                                                        key={profile.id}
                                                    >
                                                        {profile?.profile?.photo &&
                                                            <img
                                                                className='rounded-circle'
                                                                src={profile.profile.photo}
                                                                alt=''
                                                                width='50'
                                                                height='50'
                                                            ></img>
                                                        }
                                                        <em>{profile.firstName}</em>
                                                    </div>
                                                )) : (
                                                        <div
                                                            style={{ marginLeft: '20px' }}
                                                            className='d-flex flex-column align-items-center'
                                                            key={selectedProfile?.id}
                                                        >
                                                            {selectedProfile?.profile?.photo &&
                                                                <img
                                                                    className='rounded-circle'
                                                                    src={selectedProfile.profile.photo}
                                                                    alt=''
                                                                    width='50'
                                                                    height='50'
                                                                ></img>
                                                            }
                                                            <em>{selectedProfile?.firstName}</em>
                                                        </div>
                                                    )}
                                            </div>
                                            <div className="form-group">
                                                <label>Explain your problem in a few words</label>
                                                <textarea
                                                    className="form-control"
                                                    onChange={e => setQuestion(e.target.value)}
                                                    value={question}
                                                >
                                                </textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            data-dismiss="modal"
                                            onClick={() => setQuestion("")}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                const users = !individualHelpR ? profiles.map(profile => profile.id) : [selectedProfile.id];
                                                dispatch(sendhelpR(users, question));
                                                setQuestion("");
                                            }}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UsersTable;