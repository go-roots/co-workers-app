import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Map from './Map'
import RoomsBrowser from './RoomsBrowser'
import UsersTable from './UsersTable'
import ReactTooltip from 'react-tooltip';
import { loadUser } from '../../store/actions/auth';
import Spinner from '../UI/Spinner';


const Dashboard = () => {

    const { profiles, loading: { profiles: loadingProfiles } } = useSelector(state => state.profiles);
    const { user: me, loading: loadingUser } = useSelector(state => state.auth);
    const { loading: loadingRooms, rooms, recommendedRooms, filteredRooms } = useSelector(state => state.rooms);
    const dispatch = useDispatch();

    //Tries to get the user if there's a token (auto-connect)
    useEffect(() => {
        dispatch(loadUser())
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
