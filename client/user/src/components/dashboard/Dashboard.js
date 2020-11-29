import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import Map from './Map'
import RoomsBrowser from './RoomsBrowser'
import UsersTable from './UsersTable'
import ReactTooltip from 'react-tooltip';
import Spinner from '../UI/Spinner';


const Dashboard = () => {

    const { profiles, loading: { profiles: loadingProfiles } } = useSelector(state => state.profiles);
    const { user: me, loading: loadingUser } = useSelector(state => state.auth);
    const { loading: loadingRooms, rooms, recommendedRooms, filteredRooms } = useSelector(state => state.rooms);


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
