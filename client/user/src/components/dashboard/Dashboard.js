import React, { Fragment, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Map from './Map'
import RoomsBrowser from './RoomsBrowser'
import UsersTable from './UsersTable'
import ReactTooltip from 'react-tooltip';
import {fetchProfiles} from '../../store/actions/profiles';


const Dashboard = () => {

    const profiles = useSelector(state => state.profiles.profiles);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfiles(null, null));
    }, [dispatch]);

    return (
        <Fragment>
            <ReactTooltip place="top" type="dark" effect="solid" />
            <section className="main container">
                <div className="row">
                    <Map />
                    <UsersTable data={profiles} />
                    <RoomsBrowser />
                </div>
            </section>
        </Fragment>
    )
}

export default Dashboard;
