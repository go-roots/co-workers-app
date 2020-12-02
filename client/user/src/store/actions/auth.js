import axios from 'axios';
import { REMOVE_ALL_ALERTS, setAlert } from './alerts';
import {
    CLEAR_EVENTS,
    fetchEvents
} from './events';
import {
    CLEAR_HELP_REQUESTS,
    fetchHelpR
} from './helpR';
import {
    CLEAR_NOTIFICATIONS,
    fetchNotifications
} from './notifications';
import {
    CLEAR_PROFILE, PROFILE_ERROR, TOGGLE_MODAL,
    fetchProfiles, getCurrentProfile, fetchProfileById
} from './profiles';
import { CLEAR_REDEEMABLES } from './redeemables';
import {
    CLEAR_ROOMS,
    fetchRecomendedRooms, fetchRooms
} from './rooms';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const PLUG_SOCKET = 'PLUG_SOCKET';
export const UNPLUG_SOCKET = 'UNPLUG_SOCKET';
export const SOCKET_ERROR = 'SOCKET_ERROR';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';
export const LINKEDIN_SUCCESS = 'LINKEDIN_SUCCESS';
export const LINKEDIN_FAIL = 'LINKEDIN_FAIL';


export const connectWSS = () => {
    return (dispatch, getState) => {
        if (!getState().auth.socket) {
            const token = getState().auth.token;
            const ws = new WebSocket(getState().globalVars.currentDomain.replace('http', 'ws'));

            ws.addEventListener('open', () => {
                ws.send(JSON.stringify({
                    type: 'auth',
                    event: 'authorize',
                    payload: {
                        token: `Bearer ${token}`
                    }
                }));
            });

            ws.addEventListener('error', err => {
                dispatch(setAlert('danger', err));
                return dispatch({ type: SOCKET_ERROR, error: err });
            });

            ws.addEventListener('message', message => {
                if (message.isTrusted) {
                    const msg = JSON.parse(message.data);

                    switch (msg.type) {
                        case 'helpR':
                            if (msg.event === 'getHelpR') {
                                dispatch(fetchHelpR());
                            } break;
                        case 'notifications':
                            dispatch(fetchNotifications()); break;
                        case 'user':
                            if (msg.event === 'reloadUser') {
                                dispatch(loadUser());
                            } break;
                        case 'room':
                            if (msg.event === 'userMoved') {
                                dispatch(fetchProfileById(msg.payload.user))
                                    .then(dispatch(fetchRooms()))
                                    .catch(e => void e);
                            } break;
                        case 'transaction':
                            if (msg.event === 'balanceUpdated') {
                                dispatch(loadUser());
                            } break;
                        default: break;
                    }
                }
            });

            ws.addEventListener('close', () => {
                return dispatch({ type: UNPLUG_SOCKET });
            });

            return dispatch({ type: PLUG_SOCKET, socket: ws });
        }
    }
};

export const setCurrentUser = data => {
    return { type: SET_CURRENT_USER, user: data }
}

export const loadUser = () => {
    return async (dispatch, getState) => {
        if (localStorage.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }

        try {
            const res = await axios.get(getState().globalVars.currentDomain + '/api/cw-api/auth/me');
            return dispatch({ type: USER_LOADED, user: res.data.data });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
            throw new Error('Error while loading data');
        }
    }
}

export const loadData = () => {
    return async (dispatch, getState) => {

        dispatch(fetchProfiles(null, null));
        dispatch(getCurrentProfile());
        dispatch(fetchRecomendedRooms());
        dispatch(fetchRooms());
        dispatch(fetchEvents());
        dispatch(fetchNotifications());
        dispatch(fetchHelpR());
        dispatch(connectWSS());

        const doIHaveAProfile = await axios.get(getState().globalVars.currentDomain + '/api/cw-api/profiles/hasAProfile');
        return dispatch({ type: TOGGLE_MODAL, state: !doIHaveAProfile.data.hasAProfile, kind: 'create' });
    }
}

//login and register are without linkedin here...
export const registerUser = (firstName, lastName, email, password) => {
    return async (dispatch, getState) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ firstName, lastName, email, password });

        try {
            const res = await axios.post(getState().globalVars.currentDomain + '/api/cw-api/auth/register', body, config);
            await dispatch({ type: REGISTER_SUCCESS, token: res.data.token });
            await dispatch(setAlert('success', 'Welcome to CO-workers !'));
            await dispatch(loadUser());
            return dispatch(loadData());
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert('danger', error.msg)));
            }

            return dispatch({ type: REGISTER_FAIL });
        }
    }
}

export const loginUser = (email, password) => {
    return async (dispatch, getState) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post(getState().globalVars.currentDomain + '/api/cw-api/auth/login', body, config);
            await dispatch({ type: LOGIN_SUCCESS, token: res.data.token });
            await dispatch(loadUser());
            return dispatch(loadData());
        } catch (err) {
            const error = err.response.data.error;

            if (error) {
                dispatch(setAlert('danger', error));
            }

            return dispatch({ type: LOGIN_FAIL });
        }
    }
}

export const linkedinConnect = code => {
    return async (dispatch, getState) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ code });

        try {
            const res = await axios.post(getState().globalVars.currentDomain + '/api/cw-api/auth/linkedinAuth', body, config);
            await dispatch({ type: LINKEDIN_SUCCESS, token: res.data.token, linkedinToken: res.data.linkedinToken });
            await dispatch(setAlert('success', res.data.status === 'register' && 'Welcome to CO-workers !'))
            await dispatch(loadUser());
            return dispatch(loadData());
        } catch (err) {
            dispatch({ type: LINKEDIN_FAIL });
        }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({ type: LOGOUT });
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: CLEAR_EVENTS });
        dispatch({ type: CLEAR_HELP_REQUESTS });
        dispatch({ type: CLEAR_NOTIFICATIONS });
        dispatch({ type: CLEAR_ROOMS });
        dispatch({ type: CLEAR_REDEEMABLES });
        dispatch({ type: REMOVE_ALL_ALERTS });
    };
}


export const deleteAccount = id => {
    return async (dispatch, getState) => {
        if (window.confirm('Are you sure ? This can NOT be undone.')) {
            try {
                await axios.delete(getState().globalVars.currentDomain + '/api/cw-api/profile');
                dispatch({ type: ACCOUNT_DELETED });
                dispatch({ type: CLEAR_PROFILE });
                dispatch(setAlert('success', 'Account deleted.'))
            } catch (err) {
                dispatch({
                    type: PROFILE_ERROR, error: {
                        msg: err.response.statusText,
                        status: err.response.status
                    }
                });
            }
        }
    }
}
