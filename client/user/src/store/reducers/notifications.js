/* eslint-disable import/no-anonymous-default-export */
import { SET_NOTIFICATIONS, NOTIFICATION_ERROR } from '../actions/notifications';

const initialState = {
    notifications: [],
    error: null,
    loading: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications,
                loading: false
            };
        case NOTIFICATION_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
};