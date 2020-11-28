import axios from 'axios';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const UPDATE_ONE_NOTIFICATION = 'UPDATE_ONE_NOTIFICATION';


export const fetchNotifications = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(getState().globalVars.currentDomain + '/api/cw-api/notifications/me');
            return dispatch({ type: SET_NOTIFICATIONS, notifications: res.data.data });
        } catch (err) {
            return dispatch({
                type: NOTIFICATION_ERROR,
                error: {
                    msg: err.response.statusText, status: err.response.status
                }
            });
        }
    }
}

export const updateNotification = notifId => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.put(getState().globalVars.currentDomain + '/api/cw-api/notifications/' + notifId);
            return dispatch({ type: UPDATE_ONE_NOTIFICATION, notification: res.data.data, notifId });
        } catch (err) {
            return dispatch({
                type: NOTIFICATION_ERROR,
                error: {
                    msg: err.response.statusText, status: err.response.status
                }
            });
        }
    }
}