import React, { useEffect, useCallback, useState } from 'react';
import Spinner from '../UI/Spinner';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { linkedinConnect } from '../../store/actions/auth';


const Loading = () => {

    const [dispatched, setDispatched] = useState(false);
    const code = window.location.search.split('&')[0].split('=')[1];

    const checkState = useSelector(state => state.globalVars.linkedinAuthState);
    const state = window.location.search.split('&')[1].split('=')[1];

    const dispatch = useDispatch();

    const connect = useCallback(async () => {
        await dispatch(linkedinConnect(code));
        setDispatched(true);
    }, [code, dispatch]);

    useEffect(() => {
        connect();
    }, [connect]);

    if (dispatched) {
        return <Redirect to="/dashboard" />
    }

    if (state != checkState) {
        //dispatch an alert here eventually
        return <Redirect to='/login' />
    }

    return (
        <div id="loading-screen">
            <Spinner />
        </div>
    )
}

export default Loading
