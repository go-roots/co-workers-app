import React from 'react'
import Attendance from './Attendance'
import Map from './Map'
import UsersTable from './UsersTable'


const RoomsDashboard = () => {
    return (
        <div className="container-fluid main">
            <div className="row">
                <Map />
                <UsersTable />
            </div>
            <div className="row" style={{ margintop: "20px" }}>
                <Attendance />
            </div>
        </div>
    )
}

export default RoomsDashboard
