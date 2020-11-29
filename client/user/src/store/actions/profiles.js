import axios from 'axios';
import { setAlert } from './alerts';

export const SET_PROFILE = 'SET_PROFILE';
export const SET_OWN_PROFILE = 'SET_OWN_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const SET_PROFILES = 'SET_PROFILES';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_FRIENDS = 'SET_FRIENDS';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const UPDATE_ONE_PROFILE = 'UPDATE_ONE_PROFILE';


export const modalHandler = (state, kind) => {
    return { type: TOGGLE_MODAL, state, kind }
}


export const getCurrentProfile = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(getState().globalVars.currentDomain + '/api/cw-api/profiles/me');
            dispatch({ type: SET_OWN_PROFILE, profile: res.data.data });
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

export const fetchProfiles = (activitySector, status, friends) => {
    return async (dispatch, getState) => {

        const baseUrl = getState().globalVars.currentDomain + '/api/cw-api/users/extended';
        let query = '?select=firstName,lastName,role,friends';

        if (activitySector || status || friends) {
            if (activitySector) query += `&activitySector=${activitySector}`;
            if (status) query += `&status=${status}`;
            if (friends) query += '&friends=true';
        }

        try {
            const res = await axios.get(baseUrl + query);
            return dispatch({ type: SET_PROFILES, profiles: res.data.data });
        } catch (err) {
            return dispatch({
                type: PROFILE_ERROR, error: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
}

export const fetchProfileById = userId => {
    return async (dispatch, getState) => {

        const baseUrl = getState().globalVars.currentDomain + '/api/cw-api/users/extended/' + userId;
        let query = '?select=firstName,lastName,role,friends';

        try {
            const res = await axios.get(baseUrl + query);
            return dispatch({ type: UPDATE_ONE_PROFILE, profile: res.data.data, userId });
        } catch (err) {
            return dispatch({
                type: PROFILE_ERROR, error: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
}

export const setIndividualProfile = profile => {
    return { type: SET_PROFILE, profile };
}

export const editOrCreateProfile = (data, kind) => {
    return async (dispatch, getState) => {
        try {
            let formData = new FormData();

            for (const field in data) {
                if (data[field]) {
                    formData.append(field, data[field]);
                }
            };

            let res;

            res = await fetch(getState().globalVars.currentDomain + '/api/cw-api/profiles', {
                method: kind === 'edit' ? 'PUT' : 'POST',
                body: formData,
                headers: {
                    'authorization': 'Bearer ' + getState().auth.token
                }
            });

            const newProfile = await res.json();

            dispatch({ type: SET_OWN_PROFILE, profile: newProfile.data });
            dispatch({ type: TOGGLE_MODAL, state: false, kind: 'edit' });
            dispatch(setAlert('success', 'Profile successfully updated !'));
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert('danger', error.msg)));
            }

            dispatch({
                type: PROFILE_ERROR, error: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
}

export const updateSocialInfos = (field, value) => {
    return async (dispatch, getState) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ [field]: value });

        try {
            const profile = await axios.put(getState().globalVars.currentDomain + '/api/cw-api/profiles/social', body, config);
            dispatch({ type: SET_OWN_PROFILE, profile: profile.data.newProfile });
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