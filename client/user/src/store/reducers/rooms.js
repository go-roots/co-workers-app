/* eslint-disable import/no-anonymous-default-export */
import {
    SET_ROOMS,
    ROOMS_ERROR,
} from '../actions/rooms';

const initialState = {
    rooms: [],
    filteredRooms: [],
    recommendedRooms: [],
    loading: true,
    errors: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
                filteredRooms: action.rooms,
            };
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