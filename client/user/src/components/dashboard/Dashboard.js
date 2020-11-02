import React, { Fragment } from 'react'
import Map from './Map'
import RoomsBrowser from './RoomsBrowser'
import UsersTable from './UsersTable'


const Dashboard = () => {
    return (
        <Fragment>
            <section class="main container">
                <div class="row">
                    <Map />
                    <UsersTable />
                    <RoomsBrowser />
                </div>
            </section>
        </Fragment>
    )
}

export default Dashboard;
