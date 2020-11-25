import React, { Fragment, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Map from './Map'
import RoomsBrowser from './RoomsBrowser'
import UsersTable from './UsersTable'
import ReactTooltip from 'react-tooltip';
import { fetchProfiles } from '../../store/actions/profiles';
import { fetchRooms, fetchRecomendedRooms } from '../../store/actions/rooms'
import { loadUser } from '../../store/actions/auth';
import Spinner from '../UI/Spinner';


const Dashboard = () => {

    const { profiles, loading: { profiles: loadingProfiles } } = useSelector(state => state.profiles);
    const { user: me, loading: loadingUser } = useSelector(state => state.auth);
    const { loading: loadingRooms, rooms, recommendedRooms, filteredRooms } = useSelector(state => state.rooms);
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        await dispatch(loadUser()); //Tries to get the user if there's a token (auto-connect)
        dispatch(fetchProfiles(null, null));
        await dispatch(fetchRecomendedRooms());
        dispatch(fetchRooms());
    }, []);

    useEffect(() => {
        fetchData();
    }, []);


    if (loadingProfiles || loadingUser || loadingRooms) {
        return (<div id="loading-screen">
            <Spinner />
        </div>)
    }


    return (
        <Fragment>
            <ReactTooltip place="top" type="dark" effect="solid" />
            <section className="main container">
                <div className="row">
                    <Map data={{ profiles, rooms }} />
                    <UsersTable data={{ profiles, me }} />
                    <RoomsBrowser data={{ rooms, recommendedRooms, filteredRooms }} />
                </div>
            </section>
        </Fragment>
    )
}

export default Dashboard;
