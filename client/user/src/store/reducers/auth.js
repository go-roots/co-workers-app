import {
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED,
    AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT,
    ACCOUNT_DELETED, LINKEDIN_SUCCESS, LINKEDIN_FAIL,
    SET_CURRENT_USER, PLUG_SOCKET, UNPLUG_SOCKET, SOCKET_ERROR
} from '../actions/auth';

const initialState = {
    token: localStorage.getItem('token'),
    linkedinToken: localStorage.getItem('linkedinToken'),
    isAuthenticated: null,
    socket: null,
    error: null,
    loading: true,
    user: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.token);
            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                loading: false
            };
        case LINKEDIN_SUCCESS:
            localStorage.setItem('token', action.token);
            localStorage.setItem('linkedinToken', action.linkedinToken);
            return {
                ...state,
                token: action.token,
                linkedinToken: action.linkedinToken,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LINKEDIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            localStorage.removeItem('linkedinToken');
            return initialState;
        case USER_LOADED:
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.user
            }
        case PLUG_SOCKET:
            return {
                ...state,
                socket: action.socket
            }
        case UNPLUG_SOCKET:
            return {
                ...state,
                socket: null
            }
        case SOCKET_ERROR:
            return {
                ...state,
                socket: null,
                error: action.error
            }
        default:
            return state;
    }
}