import React from 'react'

const Attendance = () => {
    return (

        <div className="col-xl-12">
            <div className="card shadow mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary font-weight-bold m-0"><strong>Room-attendance</strong></h6>
                    <div className="dropdown no-arrow">
                        <button className="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false"
                            type="button"><i className="fas fa-ellipsis-v" id="graph-select-icon"></i></button>
                        <div className="dropdown-menu shadow dropdown-menu-right animated--fade-in">
                            <p className="text-center dropdown-header">Select a room</p><a className="dropdown-item" id="room1"
                                href="#">Room 1</a><a
                                    className="dropdown-item" id="room2" href="#">Room 2</a><a className="dropdown-item" id="room3"
                                        href="#">Room 3</a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="chart-area">
                        <canvas
                            data-bs-chart="{&quot;type&quot;:&quot;bar&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;January&quot;,&quot;February&quot;,&quot;March&quot;,&quot;April&quot;,&quot;May&quot;,&quot;June&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;Revenue&quot;,&quot;backgroundColor&quot;:&quot;#4e73df&quot;,&quot;borderColor&quot;:&quot;#4e73df&quot;,&quot;data&quot;:[&quot;4512&quot;,&quot;5312&quot;,&quot;6251&quot;,&quot;7841&quot;,&quot;9821&quot;,&quot;14984&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{},&quot;scales&quot;:{&quot;xAxes&quot;:[{&quot;gridLines&quot;:{&quot;color&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;zeroLineColor&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;drawBorder&quot;:false,&quot;drawTicks&quot;:false,&quot;borderDash&quot;:[&quot;2&quot;],&quot;zeroLineBorderDash&quot;:[&quot;2&quot;],&quot;drawOnChartArea&quot;:false},&quot;ticks&quot;:{&quot;fontColor&quot;:&quot;#858796&quot;,&quot;padding&quot;:20}}],&quot;yAxes&quot;:[{&quot;gridLines&quot;:{&quot;color&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;zeroLineColor&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;drawBorder&quot;:false,&quot;drawTicks&quot;:false,&quot;borderDash&quot;:[&quot;2&quot;],&quot;zeroLineBorderDash&quot;:[&quot;2&quot;]},&quot;ticks&quot;:{&quot;fontColor&quot;:&quot;#858796&quot;,&quot;padding&quot;:20}}]}}}"></canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Attendance
