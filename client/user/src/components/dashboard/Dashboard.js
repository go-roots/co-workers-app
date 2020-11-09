import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Map from './Map'
import RoomsBrowser from './RoomsBrowser'
import UsersTable from './UsersTable'
import ReactTooltip from 'react-tooltip';
import { fetchProfiles } from '../../store/actions/profiles';
import { loadUser } from '../../store/actions/auth';
import Spinner from '../UI/Spinner';


const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const profiles = useSelector(state => state.profiles.profiles);
    const me = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const connect = useCallback(async () => {
        await dispatch(loadUser());
        setLoading(false);
    }, []);

    //Tries to get the user if there's a token (auto-connect)
    useEffect(() => {
        connect();
        dispatch(fetchProfiles(null, null));
        //dispatch(fetchRooms()) (c'est pour toi Paul)
        //dispatch(roomsRecommendations())?
    }, []);


    if (loading) {
        return (<div id="loading-screen">
            <Spinner />
        </div>)
    }

    return (
        <Fragment>
            <ReactTooltip place="top" type="dark" effect="solid" />
            <section className="main container">
                <div className="row">
                    <Map data={profiles}/>
                    <UsersTable data={profiles} />
                    <RoomsBrowser />
                </div>
            </section>
        </Fragment>
    )
}

export default Dashboard;
