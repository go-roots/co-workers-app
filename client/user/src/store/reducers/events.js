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
            let newEvents = state.events.filter(event => event._id != action.eventId);
            newEvents.push(action.event);
            return {
                ...state,
                events: newEvents
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