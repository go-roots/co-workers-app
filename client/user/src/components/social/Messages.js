import React, { Fragment, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../../store/actions/auth'
import { setAlert } from '../../store/actions/alerts'
import { TiMessages } from 'react-icons/ti'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import Moment from 'react-moment'
import ReactTooltip from 'react-tooltip';


const Messages = ({ data: { profiles, user: me } }) => {

    const [selectedMessage, setSelectedMessage] = useState({});
    const [msg, setMsg] = useState("");
    const baseUrl = useSelector(state => state.globalVars.currentDomain + '/api/cw-api');
    const dispatch = useDispatch();

    return (
        <Fragment>
            <ReactTooltip place="bottom" type="dark" effect="solid" />
            <div className="col responsive-padding" style={{ marginBottom: 20 }}>
                <button
                    className="btn btn-outline-primary btn-block btn-lg header-msg-friends"
                    data-tip="Messages"
                    type="button"
                    title="Messages"
                >
                    <TiMessages
                        className="typcn typcn-messages"
                        size={30}
                    />
                </button>
                <div className="border border-primary friends-msg-container">
                    {me.messages.map(msg => (
                        <div className="d-flex flex-row justify-content-between msg-item border border-bottom">
                            <div className="d-flex flex-column justify-content-center">
                                <p className="msg-name">{msg?.lastName} {msg?.firstName}</p>
                                <p className="msg-date">
                                    <Moment format="DD/MM/YYYY HH:mm">{msg?.createdAt}</Moment>
                                </p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center msg-content">
                                <p className="lead">{msg?.text}</p>
                                <div className="dropdown">
                                    <button className="btn btn-primary" data-toggle="dropdown" aria-expanded="false" type="button">
                                        <FaEnvelopeOpenText className="icon-envelope-letter" />
                                    </button>
                                    <div className="dropdown-menu">
                                        <button
                                            className="dropdown-item answer-msg"
                                            type='button'
                                            data-toggle="modal"
                                            data-target="#answer-msg-modal"
                                            onClick={() => setSelectedMessage(msg)}
                                        >
                                            Answer
                                    </button>
                                        <button
                                            className="dropdown-item delete-msg bg-danger"
                                            data-toggle="modal"
                                            data-target="#del-msg-modal"
                                            type='button'
                                            onClick={() => setSelectedMessage(msg)}
                                        >
                                            Delete
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="modal fade" role="dialog" tabIndex="-1" id="del-msg-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this message ?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-light" type="button" data-dismiss="modal">Cancel</button>
                            <button
                                className="btn btn-primary"
                                type="button"
                                data-dismiss="modal"
                                onClick={async () => {
                                    try {
                                        const newUser = await axios.delete(baseUrl + '/users/message/' + selectedMessage._id);
                                        dispatch(setCurrentUser(newUser.data.data));
                                    } catch (err) {
                                        dispatch(setAlert('danger', "The message couldn't been deleted"));
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" role="dialog" tabIndex="-1" id="answer-msg-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{selectedMessage?.lastName} {selectedMessage?.firstName}</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex flex-column">
                            <em className="italic-small">{selectedMessage.text}</em>
                            <textarea
                                className="response-msg-modal"
                                style={{ fontSize: '1rem' }}
                                value={msg}
                                onChange={e => setMsg(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-light" type="button" data-dismiss="modal">Close</button>
                            <button
                                className="btn btn-primary"
                                type="button"
                                data-dismiss="modal"
                                onClick={async () => {
                                    try {
                                        await axios.post(baseUrl + '/users/message/' + selectedMessage.from, { message: msg });
                                        setMsg("");
                                        return dispatch(setAlert('success', "The message have been sent !"));
                                    } catch (err) {
                                        setMsg("");
                                        return dispatch(setAlert('danger', "The message couldn't been sent."));
                                    }
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Messages
