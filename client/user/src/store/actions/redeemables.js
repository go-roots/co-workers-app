import axios from 'axios';

export const SET_REDEEMABLES = 'SET_REDEEMABLES';
export const REDEEMABLES_ERROR = 'REDEEMABLES_ERROR';


export const fetchRedeemables = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(getState().globalVars.currentDomain + '/api/cw-api/redeemables');
            return dispatch({ type: SET_REDEEMABLES, redeemables: res.data });
        } catch (err) {
            return dispatch({
                type: REDEEMABLES_ERROR,
                error: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
}