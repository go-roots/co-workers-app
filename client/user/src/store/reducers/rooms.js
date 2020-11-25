/* eslint-disable import/no-anonymous-default-export */
import {
    SET_ROOMS,
    ROOMS_ERROR,
    SET_RECOM_ROOMS,
} from '../actions/rooms';

const initialState = {
    rooms: [],
    filteredRooms: [],
    recommendedRooms: [],
    loading: true,
    error: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
                filteredRooms: action.rooms,
                loading: false
            };
        case SET_RECOM_ROOMS:
            return {
                ...state,
                recommendedRooms: action.rec_rooms,
            }
        case ROOMS_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};