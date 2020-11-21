import React, { Fragment, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Map from './Map'
import RoomsBrowser from './RoomsBrowser'
import UsersTable from './UsersTable'
import ReactTooltip from 'react-tooltip';
import { fetchProfiles } from '../../store/actions/profiles';
import { fetchRooms, fetchRecomendedRooms } from '../../store/actions/rooms'
import { loadUser, connectWSS } from '../../store/actions/auth';
import Spinner from '../UI/Spinner';


const Dashboard = () => {

    const { profiles, loading: { profiles: loadingProfiles } } = useSelector(state => state.profiles);
    const { user: me, loading: loadingUser } = useSelector(state => state.auth);
    const rooms = useSelector(state => state.rooms);
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        await dispatch(loadUser()); //Tries to get the user if there's a token (auto-connect)
        dispatch(connectWSS());
        dispatch(fetchProfiles(null, null));
        dispatch(fetchRooms());
        dispatch(fetchRecomendedRooms());
    }, []);

    useEffect(() => {
        fetchData();
    }, []);


    if (loadingProfiles || loadingUser) {
        return (<div id="loading-screen">
            <Spinner />
        </div>)
    }

    return (
        <Fragment>
            <ReactTooltip place="top" type="dark" effect="solid" />
            <section className="main container">
                <div className="row">
                    <Map data={profiles} />
                    <UsersTable data={{ profiles, me }} />
                    <RoomsBrowser data={rooms} />
                </div>
            </section>
        </Fragment>
    )
}

export default Dashboard;
