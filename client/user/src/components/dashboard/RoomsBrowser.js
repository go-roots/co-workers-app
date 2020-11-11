/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import {
    createMuiTheme,
    MuiThemeProvider
} from "@material-ui/core/styles";

import { FaInfoCircle } from 'react-icons/fa'
import spinner from '../../assets/img/spinner.gif';


const RoomsBrowser = ({ data: rooms }) => {

    const [filter, setFilter] = useState("none");
    const [browseLoaded, setBrowseLoaded] = useState(0);
    const [recoLoaded, setRecoLoaded] = useState(0);

    const theme = createMuiTheme({
        overrides: {
            MuiTooltip: {
                tooltip: {
                    fontSize: "1em",
                    color: "white",
                    backgroundColor: "black"
                }
            }
        }
    });

    return (
        <Fragment>
            <div className="col">
                <div className="container-fluid recommendation-room-container">
                    <div className="row">
                        <div className="col">
                            <p>Recommended rooms&nbsp;<FaInfoCircle href="#" data-toggle="modal" data-target="#recommendation-modal" /></p>
                            <div className="modal fade" role="dialog" tabIndex="-1" id="recommendation-modal">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Rooms recommendation</h4><button type="button"
                                                className="close" data-dismiss="modal" aria-label="Close"><span
                                                    aria-hidden="true">×</span></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>This recommendations are not an obligation, but will help you reduce your
                                                energy consumption. you can follow them or not...</p>
                                            <p>Rooms are recommended 2 parameters : your profile's mood and your
                                                activity sector</p>
                                        </div>
                                        <div className="modal-footer"><button className="btn btn-primary" type="button"
                                            data-dismiss="modal">Gotcha !</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row rooms-reco-inner-container">
                        {rooms.recommendedRooms.map(room =>
                            <div key={room.id} className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip title={<Fragment>
                                        {room.name} <br />
                                        Capacity : {room.capacity} <br />
                                        Facilities: <br />
                                        {room.facilities.map((facility, index) =>
                                            <Fragment key={index}>{facility} <br /></Fragment>
                                        )}
                                    </Fragment>}>
                                        <div className="small-image-container">
                                            <img
                                                onLoad={() => setRecoLoaded(recoLoaded + 1)}
                                                alt=''
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: recoLoaded === rooms.recommendedRooms.length ? 'block' : 'none'
                                                }}
                                                src={room.image}
                                                className='rounded-circle'
                                            />
                                            <img
                                                alt=''
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: recoLoaded === rooms.recommendedRooms.length ? 'none' : 'block'
                                                }}
                                                src={spinner}
                                                className='rounded-circle'
                                            />
                                        </div>
                                    </Tooltip>
                                </MuiThemeProvider>
                            </div>
                        )}
                    </div>
                </div>
                <div className="container-fluid recommendation-room-container">
                    <div className="row">
                        <div className="col d-inline-flex align-items-baseline">
                            <p id="search-rooms-facilities-text-1">Or search rooms with facilities&nbsp;</p>
                            <div className="dropdown">
                                <button
                                    className="btn btn-primary dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                    type="button"
                                >
                                    {filter !== 'none' ? filter : 'Choose a facility '}
                                </button>
                                <div className="dropdown-menu">
                                    {filter !== 'none' && <a className="dropdown-item" onClick={() => setFilter("none")}>All rooms</a>}
                                    <a className="dropdown-item" onClick={() => setFilter("whiteboard")}>Whiteboard</a>
                                    <a className="dropdown-item" onClick={() => setFilter("video-projector")}>Video-projector</a>
                                    <a className="dropdown-item" onClick={() => setFilter("TV screen")}>TV screen</a>
                                    <a className="dropdown-item" onClick={() => setFilter("conference room")}>Conference Room</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row rooms-reco-inner-container">
                        {rooms.filteredRooms.map(room => (room.facilities.includes(filter) || filter === "none") && (
                            <div key={room.id} className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip title={<Fragment>
                                        {room.name} <br />
                                        Capacity : {room.capacity} <br />
                                        Facilities: <br />
                                        {room.facilities.map((facility, index) =>
                                            <Fragment key={index}>{facility} <br /></Fragment>
                                        )}
                                    </Fragment>}>
                                        <div className="small-image-container">
                                            <img
                                                onLoad={() => setBrowseLoaded(browseLoaded + 1)}
                                                alt=''
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: browseLoaded >= rooms.rooms.length ? 'block' : 'none'
                                                }}
                                                src={room.image}
                                                className='rounded-circle'
                                            />
                                            <img
                                                alt=''
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: browseLoaded >= rooms.rooms.length ? 'none' : 'block'
                                                }}
                                                src={spinner}
                                                className='rounded-circle'
                                            />
                                        </div>
                                    </Tooltip>
                                </MuiThemeProvider>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RoomsBrowser;