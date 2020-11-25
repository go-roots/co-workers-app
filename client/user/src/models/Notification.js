import React, { useState } from 'react'
import axios from 'axios';
import noimage from '../assets/img/noimage.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../store/actions/auth'
import { setIndividualProfile } from '../store/actions/profiles'
import { setAlert } from '../store/actions/alerts'
import { updateEvent } from '../store/actions/events'
import { updateHelpR } from '../store/actions/helpR'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { CgCloseR } from 'react-icons/cg'


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '40%'
    },
}));

//Modal for help requests and events notifs, otherwise just links.

const Notification = ({ data: { notif, profile, event, user, helpr, myProfile } }) => {

    const [helpRModal, setHelpRModal] = useState(false);
    const [eventModal, setEventModal] = useState(false);
    const [imageError, setImageError] = useState();
    const baseUrl = useSelector(state => state.globalVars.currentDomain)
    const dispatch = useDispatch();
    const classes = useStyles();

    const onFriendRHandler = async (e, userId) => {
        const body = { action: e.target.innerText.toLowerCase() };
        try {
            const res = await axios.put(baseUrl + '/api/cw-api/users/friendReq/res/' + userId, body);
            return dispatch(setCurrentUser(res.data.data));
        } catch (err) {
            return dispatch(setAlert('danger', err.response.data.error));
        }
    }

    const renderSwitch = type => {
        switch (type) {
            case 'event':
                return (
                    <li className="list-group-item d-flex flex-column event-notif">
                        <p className="notif-text-button">{notif.title}</p>
                        <button
                            className="btn btn-warning btn-sm align-self-center notif-button"
                            type="button"
                            onClick={() => setEventModal(true)}
                        >
                            View event
                        </button>
                        <Modal
                            className={classes.modal}
                            open={eventModal}
                            onClose={() => setEventModal(false)}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={eventModal}>
                                <div className={classes.paper}>
                                    <div className='container'>
                                        <div className='row d-flex flex-row justify-content-between' style={{ borderBottom: '1px solid grey', marginLeft: '10px' }}>
                                            <b style={{ fontSize: '20px' }} >{event.title}</b>
                                            <p
                                                style={{ color: 'grey', cursor: 'pointer' }}
                                                onClick={() => setEventModal(false)}
                                            >
                                                <CgCloseR size={25} />
                                            </p>
                                        </div>
                                        <div className='row d-flex justify-content-center' style={{ marginBottom: '15px', marginTop: '15px' }}>
                                            <img alt='' src={event.image} width='250' height='250' ></img>
                                        </div>
                                        <div className='row'>
                                            <p>{event.description}</p>
                                        </div>
                                        <div className='row d-flex flex-row justify-content-end'>
                                            <Link
                                                className='btn btn-info'
                                                to='/events'
                                                onClick={() => setEventModal(false)}
                                            >
                                                Go to events
                                            </Link>
                                            {event.attending.find(u => u.user == user._id) ? (
                                                <button
                                                    style={{ marginLeft: '15px' }}
                                                    className='btn btn-danger'
                                                    onClick={() => dispatch(updateEvent(event._id))}
                                                >
                                                    Revoke attendance
                                                </button>
                                            ) : (
                                                    <button
                                                        style={{ marginLeft: '15px' }}
                                                        className='btn btn-primary'
                                                        onClick={() => dispatch(updateEvent(event._id))}
                                                    >
                                                        Join the event
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        </Modal>
                    </li>
                );
            case 'friend-request':
                return (
                    <li className="list-group-item d-flex flex-column friend-request-notif">
                        <img
                            className="notif-image"
                            src={!imageError?.[profile._id] ? profile?.profile?.photo + "?" + new Date().getTime() : noimage}
                            onError={() => setImageError({ ...imageError, [profile._id]: true })}
                            alt=''
                        />
                        <p className="notif-text-button">{notif.title}</p>
                        <div className="d-flex flex-row justify-content-around">
                            <button
                                className="btn btn-success btn-sm text-nowrap notif-button"
                                type="button"
                                onClick={e => onFriendRHandler(e, profile._id)}
                            >
                                Accept
                            </button>
                            <button
                                className="btn btn-danger btn-sm text-nowrap notif-button"
                                type="button"
                                onClick={e => onFriendRHandler(e, profile._id)}
                            >
                                Decline
                            </button>
                        </div>
                    </li>
                );
            case 'help-request':
                return (
                    <li className="list-group-item d-flex flex-column help-request-notif">
                        <img
                            className="notif-image"
                            src={!imageError?.[profile._id] ? profile?.profile?.photo + "?" + new Date().getTime() : noimage}
                            onError={() => setImageError({ ...imageError, [profile._id]: true })}
                            alt=''
                        />
                        <p className="notif-text-button">{notif.title}</p>
                        <button
                            className="btn btn-warning btn-sm align-self-center notif-button"
                            type="button"
                            onClick={() => setHelpRModal(true)}
                        >
                            View request
                        </button>
                        <Modal
                            className={classes.modal}
                            open={helpRModal}
                            onClose={() => setHelpRModal(false)}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={helpRModal}>
                                <div className={classes.paper}>
                                    <div className='container'>
                                        <div className='row' style={styles.modalHeader}>
                                            <img
                                                className='rounded-circle'
                                                width='70'
                                                height='70'
                                                alt=''
                                                src={!imageError?.[profile._id] ? profile?.profile?.photo + "?" + new Date().getTime() : noimage}
                                                onError={() => setImageError({ ...imageError, [profile._id]: true })}
                                            />
                                            <div style={{ marginLeft: '10px' }}>
                                                <b>{profile?.firstName} {profile?.lastName}</b>
                                            </div>
                                        </div>
                                        <div className='row' style={styles.message}>
                                            <p>{helpr.question}</p>
                                        </div>
                                        <div className='row d-flex flex-row justify-content-end'>
                                            {helpr.status === 'ongoing' ? (
                                                <button
                                                    className='btn btn-success'
                                                    style={{ marginRight: '10px' }}
                                                    onClick={async () => {
                                                        await dispatch(updateHelpR(helpr._id));
                                                        setHelpRModal(false);
                                                    }}
                                                >
                                                    Help !
                                                </button>
                                            ) : (
                                                    <p>This help request is no longer active.</p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        </Modal>
                    </li>
                );
            case 'accept-help-request':
                return (
                    <li className="list-group-item d-flex flex-column help-request-notif">
                        <img
                            className='rounded-circle'
                            width='70'
                            height='70'
                            alt=''
                            src={!imageError?.[profile._id] ? profile?.profile?.photo + "?" + new Date().getTime() : noimage}
                            onError={() => setImageError({ ...imageError, [profile._id]: true })}
                        />
                        <p className="notif-text-button"><b>{profile.firstName} {profile.lastName}</b> has accepted your help request. {profile.firstName} will reach out to you soon !</p>
                    </li>
                );
            case 'post-help-request':
                return (
                    <li className="list-group-item d-flex flex-column friend-request-notif">
                        <img
                            className='rounded-circle'
                            width='70'
                            height='70'
                            alt=''
                            src={!imageError?.[profile._id] ? profile?.profile?.photo + "?" + new Date().getTime() : noimage}
                            onError={() => setImageError({ ...imageError, [profile._id]: true })}
                        />
                        <p className="notif-text-button">You asked <b>{profile.firstName} {profile.lastName}</b> for help. Feel free to leave a comment on {profile?.firstName}'s profile and recommend his/her skills !</p>
                        <div className="text-center">
                            <Link
                                className="btn btn-info btn-sm notif-button"
                                to='/profile'
                                onClick={() => dispatch(setIndividualProfile(profile))}
                            >
                                Go to profile
                            </Link>
                        </div>
                    </li>
                );
            case 'recommendation-comments':
                return (
                    <li className="list-group-item d-flex flex-column friend-request-notif">
                        <img
                            className='rounded-circle'
                            width='70'
                            height='70'
                            alt=''
                            src={!imageError?.[profile._id] ? profile?.profile?.photo + "?" + new Date().getTime() : noimage}
                            onError={() => setImageError({ ...imageError, [profile._id]: true })}
                        />
                        <p className="notif-text-button"><b>{profile?.firstName} {profile?.lastName}</b> has left a comment on your profile !</p>
                        <div className="text-center">
                            <Link
                                className="btn btn-info btn-sm notif-button"
                                to='/profile'
                                onClick={() => dispatch(setIndividualProfile({ ...user, profile: myProfile }))}
                            >
                                My profile
                            </Link>
                        </div>
                    </li>
                );
            default:
                return null
        }
    }

    return renderSwitch(notif.type);

};

const styles = {
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        borderBottom: "1px solid grey",
        paddingBottom: '10px'
    },
    message: {
        paddingTop: '25px',
        textAlign: 'center',
        paddingBottom: '25px'
    }
}


export default Notification
