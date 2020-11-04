import Cookies from 'js-cookie';
import {
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED,
    AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT,
    ACCOUNT_DELETED, LINKEDIN_SUCCESS, LINKEDIN_FAIL
} from '../actions/auth';

const initialState = {
    token: Cookies.get('token'),
    linkedinToken: Cookies.get('linkedinToken'),
    isAuthenticated: null,
    loading: true,
    user: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            Cookies.set('token', action.token);
            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                loading: false
            };
        case LINKEDIN_SUCCESS:
            Cookies.set('token', action.token);
            Cookies.set('linkedinToken', action.linkedinToken);
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
            Cookies.remove('token');
            Cookies.remove('linkedinToken'); //if it exists...
            return {
                ...state,
                token: null,
                linkedinToken: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.user
            }
        default:
            return state;
    }
}