/* eslint-disable import/no-anonymous-default-export */
import { SET_REDEEMABLES } from '../actions/redeemables'

const initialState = {
    redeemables: [],
    error: {},
    loading: false
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_REDEEMABLES:
            return {
                ...state,
                redeemables: action.redeemables,
                loading: false
            }
        default:
            return state
    }
}