import axios from 'axios';

export const SET_EVENTS = 'SET_EVENTS';
export const UPDATE_ONE_EVENT = 'UPDATE_ONE_EVENT';
export const EVENTS_ERROR = 'EVENTS_ERROR';

export const fetchEvents = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(getState().globalVars.currentDomain + '/api/cw-api/events');
            return dispatch({ type: SET_EVENTS, events: res.data.data });
        } catch (err) {
            return dispatch({
                type: EVENTS_ERROR,
                error: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
};

export const updateEvent = eventId => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.put(getState().globalVars.currentDomain + '/api/cw-api/events/' + eventId);
            return dispatch({ type: UPDATE_ONE_EVENT, event: res.data.data, eventId });
        } catch (err) {
            return dispatch({
                type: EVENTS_ERROR,
                error: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
}