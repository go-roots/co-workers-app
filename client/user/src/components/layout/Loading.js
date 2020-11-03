import React, { useEffect, useCallback, useState } from 'react';
import Spinner from '../UI/Spinner';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


const Loading = () => {

    const [data, setData] = useState();
    const code = window.location.search.split('&')[0].split('=')[1];

    const connect = useCallback(async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ code: code });

        const res = await axios.post('https://co-workers.herokuapp.com/api/cw-api/auth/linkedinAuth', body, config);
        setData(res);
        console.log(res)
    }, []);

    console.log(data);

    useEffect(() => {
        connect();
    }, []);

    if (data) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div id="loading-screen">
            <Spinner />
        </div>
    )
}

export default Loading
