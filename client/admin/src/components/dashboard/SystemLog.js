import React from 'react'

const SystemLog = () => {
    return (
        <div className="col">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-primary m-0 font-weight-bold">System log</h6>
                </div>
                <div className="card-body system-log-events-container">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <div className="d-flex flex-row justify-content-between">
                                <p>Jorgo obtained a new badge</p>
                                <p>12:15</p>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex flex-row justify-content-between">
                                <p>Nicolas Cage registered</p>
                                <p>12:00</p>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex flex-row justify-content-between">
                                <p>Paul's left the room B</p>
                                <p>11:00</p>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex flex-row justify-content-between">
                                <p>Bob redeemed 200 points for a steel mug</p>
                                <p>10:00</p>
                            </div>
                        </li>
                    </ul>
                </div><a className="btn btn-link system-log-events-button" role="button" href="#"><i className="typcn typcn-arrow-sorted-down"></i></a></div>
        </div>
    )
}

export default SystemLog
