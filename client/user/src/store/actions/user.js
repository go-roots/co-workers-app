import axios from 'axios';
import { setIndividualProfile, UPDATE_ONE_PROFILE } from './profiles';
import { setAlert } from './alerts'


export const cancelFriendR = (userId) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.delete(getState().globalVars.currentDomain + '/api/cw-api/users/friendReq/' + userId);
            await dispatch(setIndividualProfile(res.data.data));
            await dispatch({ type: UPDATE_ONE_PROFILE, profile: res.data.data, userId });
            await dispatch(setAlert('success', 'The friend request has been canceled!'));
        } catch (err) {
            await dispatch(setAlert('danger', err.response.data.error));
        }

        const ws = getState().auth.socket;

        return ws.send(JSON.stringify({
            type: 'user',
            event: 'friendR',
            payload: {
                userToUpdate: userId
            }
        }));
    }
}

export const sendFriendR = (userId, firstName, lastName) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.put(getState().globalVars.currentDomain + '/api/cw-api/users/friendReq/' + userId);
            await dispatch({ type: UPDATE_ONE_PROFILE, profile: res.data.data, userId });
            await dispatch(setIndividualProfile(res.data.data))
            await dispatch(setAlert('success', `The friend request has been sent to ${firstName} ${lastName}!`));
        } catch (err) {
            await dispatch(setAlert('danger', err.response.data.error));
        }

        const ws = getState().auth.socket;

        return ws.send(JSON.stringify({
            type: 'user',
            event: 'friendR',
            payload: {
                userToUpdate: userId
            }
        }));
    }
}

export const sendMessage = (userId, firstName, lastName, message) => {
    return async (dispatch, getState) => {
        try {
            await axios.post(getState().globalVars.currentDomain + '/api/cw-api/users/message/' + userId, { message });
            await dispatch(setAlert('success', `Your message has been sent to ${firstName} ${lastName}!`));
        } catch (err) {
            await dispatch(setAlert('danger', err.response.data.error));
        }

        const ws = getState().auth.socket;

        return ws.send(JSON.stringify({
            type: 'user',
            event: 'sendMessage',
            payload: {
                userToUpdate: userId
            }
        }));
    }
}