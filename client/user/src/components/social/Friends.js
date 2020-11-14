import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setIndividualProfile } from '../../store/actions/profiles'
import { FaUserFriends } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import { setAlert } from '../../store/actions/alerts'
import noimage from '../../assets/img/noimage.jpg'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import { FaCircle, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { ImAccessibility } from 'react-icons/im';


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
        width: '50%'
    },
}));


const Friends = ({ data: { user, profiles } }) => {

    const selectedProfile = useSelector(state => state.profiles.profile);
    const baseUrl = useSelector(state => state.globalVars.currentDomain + '/api/cw-api');

    const [messageModal, setMessageModal] = useState(false);
    const [message, setMessage] = useState("");
    const [locateModal, setLocateModal] = useState(false);
    const [deleteFriendModal, setDeleteFriendModal] = useState(false);
    const [imageError, setImageError] = useState(false);

    const dispatch = useDispatch();
    const classes = useStyles();


    return (
        <div className="col-xl-4 responsive-padding">
            <ReactTooltip place="bottom" type="dark" effect="solid" />
            <button className="btn btn-outline-info btn-block btn-lg header-msg-friends" data-tip="Friends">
                <FaUserFriends className="icon-people" size={30} />
            </button>
            <div
                className="d-flex flex-column justify-content-start align-items-center border border-info friends-msg-container">
                {user?.friends?.friends.map(friend => (
                    <div className="dropdown">
                        <button
                            className="btn btn-lg friends-item"
                            data-toggle="dropdown"
                            aria-expanded="false"
                            type="button">
                            {profiles.filter(profile => profile.id === friend.friend).map(f => (
                                f.lastName + " " + f.firstName
                            ))}
                        </button>
                        <div className="dropdown-menu">
                            <Link
                                className="dropdown-item"
                                to='/profile'
                                onMouseDown={() => {
                                    const profile = profiles.filter(profile => profile.id === friend.friend)[0]
                                    dispatch(setIndividualProfile(profile))
                                }}
                            >
                                View profile
                            </Link>
                            <button
                                className="dropdown-item"
                                type='button'
                                onMouseDown={async () => {
                                    const profile = profiles.filter(profile => profile.id === friend.friend)[0]
                                    await dispatch(setIndividualProfile(profile))
                                    setMessageModal(true)
                                }}
                            >
                                Send message
                            </button>
                            <button
                                className="dropdown-item"
                                type='button'
                                onMouseDown={async () => {
                                    const profile = profiles.filter(profile => profile.id === friend.friend)[0]
                                    await dispatch(setIndividualProfile(profile))
                                    setLocateModal(true)
                                }}
                            >
                                Locate
                            </button>
                            <button className="dropdown-item" type='button'>Delete friend</button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                className={classes.modal}
                open={messageModal}
                onClose={() => { setMessageModal(false); setMessage('') }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={messageModal}>
                    <div className={classes.paper}>
                        <div className='container'>
                            <div className='row' style={styles.modalHeader}>
                                <img
                                    className='rounded-circle'
                                    width='70'
                                    height='70'
                                    alt=''
                                    src={!imageError ? selectedProfile?.profile?.photo + "?" + new Date().getTime() : noimage}
                                    onError={() => setImageError(true)}
                                />
                                <div style={{ marginLeft: '10px' }}>
                                    <b>{selectedProfile?.lastName} {selectedProfile?.firstName}</b>
                                </div>
                            </div>
                            <div className='row' style={styles.message} onChange={e => setMessage(e.target.value)}>
                                <textarea cols='50' rows='5' placeholder='Type a message to your friend' ></textarea>
                            </div>
                            <div className='row d-flex flex-row justify-content-end'>
                                <button
                                    className='btn btn-light'
                                    style={{ marginRight: '15px' }}
                                    onClick={() => { setMessageModal(false); setMessage("") }}
                                >
                                    Close
                                </button>
                                <button
                                    className='btn btn-primary'
                                    style={{ marginRight: '10px' }}
                                    onClick={async () => {
                                        try {
                                            await axios.post(baseUrl + `/users/message/${selectedProfile.id}`, { message });
                                            await dispatch(setAlert('success', 'Your message has been sent!'))
                                            setMessageModal(false);
                                            setMessage("");
                                        } catch (err) {
                                            const errors = err.response.data.errors;

                                            if (errors) {
                                                errors.forEach(error => dispatch(setAlert('danger', error.msg)));
                                            }
                                        }
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <Modal
                className={classes.modal}
                open={locateModal}
                onClose={() => setLocateModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={locateModal}>
                    <div className={classes.paper}>
                        <p style={{ textAlign: 'center' }}>
                            {selectedProfile?.profile?.status !== 'Unavailable' ? (
                                <div>
                                    <div className='d-flex flex-row' >
                                        <Tooltip title={selectedProfile?.profile?.status}>
                                            <div>
                                                <FaCircle
                                                    className={selectedProfile?.profile?.status === 'Available'
                                                        ? "user-icon-available"
                                                        : (selectedProfile?.profile?.status === 'Do not disturb' ? "user-icon-dnd" : "user-icon-invisible")}
                                                />
                                            </div>
                                        </Tooltip>
                                        {selectedProfile?.profile?.mood === 'Prefer to stay alone' && (
                                            <Tooltip title={selectedProfile?.profile?.mood}>
                                                <div>
                                                    <FaUserMinus className="mood-status-icon" size={25} />
                                                </div>
                                            </Tooltip>
                                        )}
                                        {selectedProfile?.profile?.mood === 'Feeling sociable' && (
                                            <Tooltip title={selectedProfile?.profile?.mood}>
                                                <div>
                                                    <FaUserPlus className="mood-status-icon" size={25} />
                                                </div>
                                            </Tooltip>
                                        )}
                                        {selectedProfile?.profile?.mood === 'Willing to help others' && (
                                            <Tooltip title={selectedProfile?.profile?.mood}>
                                                <div>
                                                    <ImAccessibility className="mood-status-icon" size={25} />
                                                </div>
                                            </Tooltip>
                                        )}
                                    </div>

                                    <b style={{ marginTop: '20px' }} >{selectedProfile?.lastName} {selectedProfile?.firstName}</b> is in {selectedProfile?.room?.name}
                                </div>
                            ) : (
                                    <b>{selectedProfile?.lastName} {selectedProfile?.firstName} is unavailable</b>
                                )}
                        </p>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

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



export default Friends
