import React from 'react'

const Events = () => {
    return (
        <div className="col">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-primary m-0 font-weight-bold">Ongoing events</h6>
                </div>
                <div className="card-body system-log-events-container">
                    <ul className="list-group">
                        <li className="list-group-item d-flex flex-row justify-content-between"><span>Dev Night</span><em>A whole night of challenge for devs</em></li>
                        <li className="list-group-item d-flex flex-row justify-content-between"><span>Halloween Party</span><em>Spooky day</em></li>
                        <li className="list-group-item d-flex flex-row justify-content-between"><span>Chinese class</span><em>Learn a new language</em></li>
                        <li className="list-group-item d-flex flex-row justify-content-between"><span>Speed chess Tournament</span><em>Challenge your chess skills</em></li>
                    </ul>
                </div><a className="btn btn-link system-log-events-button" role="button" href="#"><i className="typcn typcn-arrow-sorted-down"></i></a></div>
        </div>
    )
}

export default Events
