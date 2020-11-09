/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRooms } from '../../store/actions/rooms';

import Tooltip from '@material-ui/core/Tooltip';
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
  } from "@material-ui/core/styles";

import { FaInfoCircle } from 'react-icons/fa'
import rooms from '../../store/reducers/rooms';



const RoomsBrowser = ({ data: rooms }) => {

    const [filter, setFilter] = useState("none");

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
      console.log(filter)
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
                        <div className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div data-tip="I AM THE INFO OF THE ROOMS" className="small-image-container" style={{ background: "url(&quot;assets/img/office-space-1744805_640.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div data-tip="I AM THE INFO OF THE ROOMS" className="small-image-container" style={{ background: "url(&quot;assets/img/small-office-4837892_640.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div data-tip="I AM THE INFO OF THE ROOMS" className="small-image-container" style={{ background: "url(&quot;assets/img/office-space-1744803_640.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div data-tip="I AM THE INFO OF THE ROOMS" className="small-image-container" style={{ background: "url(&quot;assets/img/woman-4780153_640.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid recommendation-room-container">
                    <div className="row">
                        <div className="col d-inline-flex align-items-baseline">
                            <p id="search-rooms-facilities-text-1">Or search rooms with facilities&nbsp;</p>
                            <div className="dropdown"><button className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">Choose a facility&nbsp;</button>
                                <div className="dropdown-menu"><a className="dropdown-item" onClick={()=> setFilter("whiteboard")}>Whiteboard</a><a className="dropdown-item" onClick={()=> setFilter("video-projector")}>Video-projector</a><a className="dropdown-item" onClick={()=> setFilter("TV screen")}>TV screen</a><a className="dropdown-item" onClick={()=> setFilter("conference room")}>Conference Room</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="row rooms-reco-inner-container">
                   {rooms.filteredRooms.map(room => (room.facilities.includes(filter) || filter === "none") && (
                        <div className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <MuiThemeProvider theme={theme}>
                            <Tooltip title={<Fragment>
                                {room.name} <br/>
                                Capacity : {room.capacity} <br/>
                                Facilities: <br/>
                                {room.facilities.map(facility => 
                                    <Fragment>{facility} <br /></Fragment>
                                    )}
                            </Fragment>}>
                                <div className="small-image-container" style={{ background: `url(${room.image}) center / cover no-repeat` }}></div>
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