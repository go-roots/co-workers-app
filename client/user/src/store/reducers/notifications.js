/* eslint-disable import/no-anonymous-default-export */
import {
    SET_NOTIFICATIONS, NOTIFICATION_ERROR,
    CLEAR_NOTIFICATIONS, UPDATE_ONE_NOTIFICATION
} from '../actions/notifications';

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
        case UPDATE_ONE_NOTIFICATION:
            let updatedNotifications = [...state.notifications];
            for (let notif of updatedNotifications) {
                if (notif._id == action.notifId) {
                    notif.seen = true;
                }
            }
            return {
                ...state,
                notifications: updatedNotifications
            }
        case NOTIFICATION_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case CLEAR_NOTIFICATIONS:
            return initialState;
        default:
            return state;
    }
};