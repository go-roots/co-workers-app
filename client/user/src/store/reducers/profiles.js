/* eslint-disable import/no-anonymous-default-export */
import {
    SET_PROFILE, SET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE,
    SET_OWN_PROFILE, TOGGLE_MODAL, CLEAR_PROFILE
} from '../actions/profiles';

//We don't necessarily need a redux state for storing state.profiles since we use it in
//only one screen (dashboard), but it's just to have the whole data in one place.

const initialState = {
    modalOpened: { state: false, kind: null }, //edit/create profile modal state
    myProfile: null, //used in social, rooms recommendations, ...
    profile: null, //Current profile being viewed (.../profile/:profileId)
    profiles: [], //List of extended profiles used in the dashboard, vary regarding the applied filters
    messages: [], //list of received messages
    friends: [], //Contains the list of friends and friend-requests
    loading: { myProfile: true, profiles: true },
    errors: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                modalOpened: {
                    state: action.state,
                    kind: action.kind
                }
            }
        case SET_OWN_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                myProfile: action.profile,
                loading: { ...state.loading, myProfile: false },
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_PROFILES:
            return {
                ...state,
                profiles: action.profiles,
                loading: { ...state.loading, profiles: false },
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.error,
                loading: { ...state.loading, profiles: false, myProfile: false },
                profile: null,
            };
        case CLEAR_PROFILE:
            return initialState;
        default:
            return state;
    }
};