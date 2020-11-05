/* eslint-disable import/no-anonymous-default-export */
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from '../actions/alerts';
import Alert from '../../models/Alert';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT:
            const newAlert = new Alert(action.payload.id, action.payload.color, action.payload.message);
            return {
                ...state,
                [newAlert.id]: newAlert
            };
        case REMOVE_ALERT:
            const modifiedAlerts = { ...state };
            delete modifiedAlerts[action.id];
            return modifiedAlerts;
        case REMOVE_ALL_ALERTS:
            return initialState;
        default:
            return state;
    }
};