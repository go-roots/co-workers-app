/* eslint-disable import/no-anonymous-default-export */
import { SET_REDEEMABLES } from '../actions/redeemables'

const initialState = {
    redeemables: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_REDEEMABLES:
            return {
                ...state,
                redeemables: action.redeemables
            }
        default:
            return state
    }
}