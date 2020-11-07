import React from 'react';
import Charts from './Charts'
import Events from './Events'; //check the react-chartjs-2 lib (already installed)
import SystemLog from './SystemLog'


const Dashboard = () => {
    return (
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7 col-xl-12">
                            <div className="card shadow mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h6 className="text-primary font-weight-bold m-0" id="graph-title">Electricity consumption</h6>
                                    <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button"><i className="fas fa-ellipsis-v" id="graph-select-icon"></i></button>
                                        <div className="dropdown-menu shadow dropdown-menu-right animated--fade-in">
                                            <p className="text-center dropdown-header">Select a graph</p><a className="dropdown-item" id="toggle-electricity-chart" href="#">Electricity</a><a className="dropdown-item" id="toggle-help-chart" href="#">Help requests</a><a className="dropdown-item" id="toggle-socializing-chart"
                                                href="#">Socializing people</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="electricity-chart" className="chart-area"><canvas data-bs-chart="{&quot;type&quot;:&quot;line&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;Jan&quot;,&quot;Feb&quot;,&quot;Mar&quot;,&quot;Apr&quot;,&quot;May&quot;,&quot;Jun&quot;,&quot;Jul&quot;,&quot;Aug&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;Earnings&quot;,&quot;fill&quot;:true,&quot;data&quot;:[&quot;0&quot;,&quot;10000&quot;,&quot;5000&quot;,&quot;15000&quot;,&quot;10000&quot;,&quot;20000&quot;,&quot;15000&quot;,&quot;25000&quot;],&quot;backgroundColor&quot;:&quot;rgba(78, 115, 223, 0.05)&quot;,&quot;borderColor&quot;:&quot;rgba(78, 115, 223, 1)&quot;}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{},&quot;scales&quot;:{&quot;xAxes&quot;:[{&quot;gridLines&quot;:{&quot;color&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;zeroLineColor&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;drawBorder&quot;:false,&quot;drawTicks&quot;:false,&quot;borderDash&quot;:[&quot;2&quot;],&quot;zeroLineBorderDash&quot;:[&quot;2&quot;],&quot;drawOnChartArea&quot;:false},&quot;ticks&quot;:{&quot;fontColor&quot;:&quot;#858796&quot;,&quot;padding&quot;:20}}],&quot;yAxes&quot;:[{&quot;gridLines&quot;:{&quot;color&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;zeroLineColor&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;drawBorder&quot;:false,&quot;drawTicks&quot;:false,&quot;borderDash&quot;:[&quot;2&quot;],&quot;zeroLineBorderDash&quot;:[&quot;2&quot;]},&quot;ticks&quot;:{&quot;fontColor&quot;:&quot;#858796&quot;,&quot;padding&quot;:20}}]}}}"></canvas>
                                    </div>
                                    <div
                                        id="help-chart" className="chart-area"><canvas data-bs-chart="{&quot;type&quot;:&quot;doughnut&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;Direct&quot;,&quot;Social&quot;,&quot;Referral&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;&quot;,&quot;backgroundColor&quot;:[&quot;#4e73df&quot;,&quot;#1cc88a&quot;,&quot;#36b9cc&quot;],&quot;borderColor&quot;:[&quot;#ffffff&quot;,&quot;#ffffff&quot;,&quot;#ffffff&quot;],&quot;data&quot;:[&quot;50&quot;,&quot;30&quot;,&quot;15&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{}}}"></canvas>
                                    </div>
                                    <div
                                        id="socializing-chart" className="chart-area"><canvas data-bs-chart="{&quot;type&quot;:&quot;bar&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;January&quot;,&quot;February&quot;,&quot;March&quot;,&quot;April&quot;,&quot;May&quot;,&quot;June&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;Revenue&quot;,&quot;backgroundColor&quot;:&quot;#4e73df&quot;,&quot;borderColor&quot;:&quot;#4e73df&quot;,&quot;data&quot;:[&quot;4512&quot;,&quot;5312&quot;,&quot;6251&quot;,&quot;7841&quot;,&quot;9821&quot;,&quot;14984&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{},&quot;scales&quot;:{&quot;xAxes&quot;:[{&quot;gridLines&quot;:{&quot;color&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;zeroLineColor&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;drawBorder&quot;:false,&quot;drawTicks&quot;:false,&quot;borderDash&quot;:[&quot;2&quot;],&quot;zeroLineBorderDash&quot;:[&quot;2&quot;],&quot;drawOnChartArea&quot;:false},&quot;ticks&quot;:{&quot;fontColor&quot;:&quot;#858796&quot;,&quot;padding&quot;:20}}],&quot;yAxes&quot;:[{&quot;gridLines&quot;:{&quot;color&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;zeroLineColor&quot;:&quot;rgb(234, 236, 244)&quot;,&quot;drawBorder&quot;:false,&quot;drawTicks&quot;:false,&quot;borderDash&quot;:[&quot;2&quot;],&quot;zeroLineBorderDash&quot;:[&quot;2&quot;]},&quot;ticks&quot;:{&quot;fontColor&quot;:&quot;#858796&quot;,&quot;padding&quot;:20}}]}}}"></canvas></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard


