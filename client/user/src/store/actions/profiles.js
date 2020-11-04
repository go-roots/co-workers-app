import axios from 'axios';
import { CLEAR_PROFILE } from './auth' //clear_profile is used in auth actions after account deletion

export const SET_PROFILE = 'SET_PROFILE';
export const SET_OWN_PROFILE = 'SET_OWN_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const SET_PROFILES = 'SET_PROFILES';


export const getCurrentProfile = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(getState().globalVars.currentDomain + '/profiles/me');
            dispatch({ type: SET_OWN_PROFILE, profile: res.data });
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

export const fetchProfiles = (activitySector, status) => {
    return async (dispatch, getState) => {
        dispatch({ type: CLEAR_PROFILE });
        const domain = getState().globalVars.currentDomain;
        let query = '/users/extended?select=firstName,lastName';
        if (activitySector || status) {
            query += '?';
            if (activitySector) query += `&activitySector=${activitySector}`;
            if (status) query += `&status=${status}`;
        }
        try {
            const res = await axios.get(domain + query);
            dispatch({ type: SET_PROFILES, profiles: res.data });
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

export const getProfileById = userId => {
    return async (dispatch, getState) => {
        dispatch({ type: CLEAR_PROFILE });
        try {
            const res = await axios.get(getState().globalVars.currentDomain + '/profiles/user/' + userId);
            dispatch({ type: SET_PROFILE, profile: res.data });
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

export const editOrCreateProfile = data => {
    return async (dispatch, getState) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post(getState().globalVars.currentDomain + '/profiles', data, config);
            dispatch({ type: SET_PROFILE, profile: res.data });
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