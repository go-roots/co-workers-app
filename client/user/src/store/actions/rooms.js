import axios from 'axios';

export const SET_ROOMS = 'SET_ROOMS';
export const ROOMS_ERROR = 'ROOMS_ERROR';
export const SET_RECOM_ROOMS = 'SET_RECOM_ROOMS';

export const fetchRooms = () => {
    return async (dispatch, getState) => {

        const domain = getState().globalVars.currentDomain;
        let query = '/rooms/';
        try {
            const res = await axios.get(domain + query);
            return dispatch({ type: SET_ROOMS, rooms: res.data.data });
        } catch (err) {
            return dispatch({type: ROOMS_ERROR, error: {msg: err.response.statusText,status: err.response.status}});
        }
    }
}

export const fetchRecomendedRooms = (user) => {
    return async (dispatch, getState) => {

        const domain = getState().globalVars.currentDomain;
        let query = '/rooms/recommended/' + user;
        try {
            const res = await axios.get(domain + query);
            return dispatch({ type: SET_RECOM_ROOMS, rec_rooms: res.data.rooms });
        } catch (err) {
            return dispatch({type: ROOMS_ERROR, error: {msg: err.response.statusText,status: err.response.status}});
        }
    }
}

