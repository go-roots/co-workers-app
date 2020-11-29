/* eslint-disable import/no-anonymous-default-export */
import {
    SET_HELP_REQUESTS, HELP_REQUESTS_ERROR,
    UPDATE_ONE_HELP_REQUEST, CREATE_HELP_REQUEST, CLEAR_HELP_REQUESTS
} from '../actions/helpR';

const initialState = {
    helpR: [],
    error: {},
    loading: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HELP_REQUESTS:
            return {
                ...state,
                helpR: action.helpR,
                loading: false
            };
        case CREATE_HELP_REQUEST:
            return {
                ...state,
                helpR: [...state.helpR, action.helpr]
            };
        case UPDATE_ONE_HELP_REQUEST:
            let updatedHelpR = [...state.helpR];
            for (let helpr of updatedHelpR) {
                if (helpr._id == action.helprId) {
                    helpr = action.helpr;
                }
            }
            return {
                ...state,
                helpR: updatedHelpR
            }
        case HELP_REQUESTS_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case CLEAR_HELP_REQUESTS:
            return initialState;
        default:
            return state;
    }
}