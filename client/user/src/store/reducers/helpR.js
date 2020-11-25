/* eslint-disable import/no-anonymous-default-export */
import {
    SET_HELP_REQUESTS, HELP_REQUESTS_ERROR,
    UPDATE_ONE_HELP_REQUEST, CREATE_HELP_REQUEST
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
            let newHelpR = state.helpR.filter(h => h._id != action.helprId);
            newHelpR.push(action.helpr);
            return {
                ...state,
                helpR: newHelpR
            }
        case HELP_REQUESTS_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
}