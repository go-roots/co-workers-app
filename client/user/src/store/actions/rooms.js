import axios from 'axios';

export const SET_ROOMS = 'SET_ROOMS';
export const ROOMS_ERROR = 'ROOMS_ERROR';

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

