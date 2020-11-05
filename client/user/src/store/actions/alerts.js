import { v4 as uuidv4 } from 'uuid';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REMOVE_ALL_ALERTS = 'REMOVE_ALL_ALERTS';

export const setAlert = (color, message, timeout = 5000) => {
    return dispatch => {
        const id = uuidv4();

        dispatch({
            type: SET_ALERT,
            payload: { id, color, message }
        });

        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT, id })
        }, timeout);
    };
}

export const removeAllAlerts = () => {
    return { type: REMOVE_ALL_ALERTS };
}