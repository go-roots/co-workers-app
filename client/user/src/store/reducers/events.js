/* eslint-disable import/no-anonymous-default-export */
import {
    SET_EVENTS,
} from '../actions/events';

const initialState = {
    events: [],
    loading: true,
    errors: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                events: action.events,
            };
        default:
            return state;
    }
};