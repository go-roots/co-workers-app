import { SET_LINKEDIN_STATE } from '../actions/globalVars';

const initialState = {
    devDomain: 'http://localhost:5000',
    prodDomain: 'https://co-workers.herokuapp.com',
    currentDomain: 'http://localhost:5000',
    linkedinAuthState: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LINKEDIN_STATE:
            return {
                ...state,
                linkedinAuthState: action.state
            }
        default:
            return state;
    }
}
