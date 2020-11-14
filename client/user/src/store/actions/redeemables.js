import axios from 'axios';

export const SET_REDEEMABLES = 'SET_REDEEMABLES';


export const fetchRedeemables = () => {
    return async (dispatch, getState) => {
        const res = await axios.get(getState().globalVars.currentDomain + '/api/cw-api/redeemables');
        return dispatch({ type: SET_REDEEMABLES, redeemables: res.data });
    }
}