/* eslint-disable import/no-anonymous-default-export */
import {
    SET_EVENTS,
    EVENTS_ERROR,
    UPDATE_ONE_EVENT,
    CLEAR_EVENTS
} from '../actions/events';

const initialState = {
    events: [],
    loading: true,
    error: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                events: action.events,
                loading: false
            };
        case UPDATE_ONE_EVENT:
            let updatedEvents = [...state.events];
            for (const event of updatedEvents) {
                if (event._id == action.eventId) {
                    event = action.event
                }
            }
            return {
                ...state,
                events: updatedEvents
            }
        case EVENTS_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case CLEAR_EVENTS:
            return initialState;
        default:
            return state;
    }
};