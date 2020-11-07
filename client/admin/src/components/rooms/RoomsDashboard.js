import React, { Fragment } from 'react'
import Attendance from './Attendance'
import Map from './Map'
import UsersTable from './UsersTable'


const RoomsDashboard = () => {
    return (
        <Fragment>
            <Map />
            <UsersTable />
            <Attendance />
        </Fragment>
    )
}

export default RoomsDashboard
