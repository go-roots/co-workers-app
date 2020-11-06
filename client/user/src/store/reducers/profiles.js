/* eslint-disable import/no-anonymous-default-export */
import {
    SET_PROFILE,
    SET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    SET_OWN_PROFILE,
} from '../actions/profiles';
import {
    CLEAR_PROFILE
} from '../actions/auth';

//We don't necessarily need a redux state for storing state.profiles since we use it in
//only one screen (dashboard), but it's just to have the whole data in one place.

const initialState = {
    myProfile: null, //used in social, rooms recommendations, ...
    profile: null, //Current profile being viewed (.../profile/:profileId)
    profiles: [], //List of extended profiles used in the dashboard, vary regarding the applied filters
    loading: true,
    errors: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_OWN_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                myProfile: action.profile,
                loading: false,
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile,
                loading: false,
            };
        case SET_PROFILES:
            return {
                ...state,
                profiles: action.profiles,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
                profile: null,
            };
        case CLEAR_PROFILE:
            return initialState;
        default:
            return state;
    }
};