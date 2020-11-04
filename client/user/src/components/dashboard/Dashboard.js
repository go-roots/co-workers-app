import React, { Fragment } from 'react'
import Map from './Map'
import RoomsBrowser from './RoomsBrowser'
import UsersTable from './UsersTable'
import ReactTooltip from 'react-tooltip';


const Dashboard = () => {
    return (
        <Fragment>
            <ReactTooltip place="top" type="dark" effect="solid" />
            <section className="main container">
                <div className="row">
                    <Map />
                    <UsersTable />
                    <RoomsBrowser />
                </div>
            </section>
        </Fragment>
    )
}

export default Dashboard;
