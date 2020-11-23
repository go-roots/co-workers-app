import axios from 'axios';
import { setAlert } from './alerts';
import { PROFILE_ERROR, TOGGLE_MODAL } from './profiles';
import { SET_ROOMS } from './rooms'

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
export const CLEAR_PROFILE = 'CLEAR_PROFILE'; //when we logout we clear auth state but also profile logically
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';
export const LINKEDIN_SUCCESS = 'LINKEDIN_SUCCESS';
export const LINKEDIN_FAIL = 'LINKEDIN_FAIL';


export const connectWSS = () => {
    return (dispatch, getState) => {
        if (!getState().auth.socket) {
            const token = getState().auth.token;
            const ws = new WebSocket(getState().globalVars.currentDomain.replace('http', 'ws'));

            ws.addEventListener('open', () => {
                ws.send(JSON.stringify({ event: 'authorization', token: `Bearer ${token}` }));
            });

            ws.addEventListener('error', err => {
                dispatch(setAlert('danger', err));
                return dispatch({ type: SOCKET_ERROR, error: err });
            });

            ws.addEventListener('message', message => {
                if (message.isTrusted) {

                    const msg = JSON.parse(message.data);

                    if (msg.event === 'rooms') {
                        dispatch({ type: SET_ROOMS, rooms: msg.payload });
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
        //Setting token as a header for all requests
        if (localStorage.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }

        try {
            //The server will verify the token, and then get the user
            const res = await axios.get(getState().globalVars.currentDomain + '/api/cw-api/auth/me');
            dispatch({ type: USER_LOADED, user: res.data.data });

            const doIHaveAProfile = await axios.get(getState().globalVars.currentDomain + '/api/cw-api/profiles/hasAProfile');
            return dispatch({ type: TOGGLE_MODAL, state: !doIHaveAProfile.data.hasAProfile, kind: 'create' });
        } catch (err) {
            return dispatch({ type: AUTH_ERROR });
        }
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

            dispatch({ type: REGISTER_SUCCESS, token: res.data.token });
            dispatch(setAlert('success', 'Welcome to CO-workers !'));
            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert('danger', error.msg)));
            }

            dispatch({ type: REGISTER_FAIL });
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

            dispatch({ type: LOGIN_SUCCESS, token: res.data.token });
            dispatch(loadUser());
        } catch (err) {
            const error = err.response.data.error;

            if (error) {
                dispatch(setAlert('danger', error));
            }

            dispatch({ type: LOGIN_FAIL });
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
            dispatch({ type: LINKEDIN_SUCCESS, token: res.data.token, linkedinToken: res.data.linkedinToken });
            dispatch(setAlert('success', res.data.status === 'register' && 'Welcome to CO-workers !'))
            dispatch(loadUser());
        } catch (err) {
            dispatch({ type: LINKEDIN_FAIL });
        }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({ type: LOGOUT });
        dispatch({ type: CLEAR_PROFILE });
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
