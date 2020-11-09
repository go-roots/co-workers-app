import React, { Fragment } from 'react'
import { FaInfoCircle } from 'react-icons/fa'

const initialState = {
    allMembers: true,
    friends: false,
    activity: null,
    status: null,
};

const FiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FRIENDS':
            return {
                ...state,
                friends: !state.friends
            };
        case 'SET_ACTIVITY':
            return {
                ...state,
                activity: action.name
            };
        case 'SET_STATUS':
            return {
                ...state,
                status: action.name
            };
        case 'SET_ALL_MEMBERS':
            return initialState;
        default:
            return state
    }
};

const RoomsBrowser = () => {
    
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
                                <div className="dropdown-menu"><a className="dropdown-item" href="#">Whiteboard</a><a className="dropdown-item" href="#">Video-projector</a><a className="dropdown-item" href="#">TV screen</a><a className="dropdown-item" href="#">Conference</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="row rooms-reco-inner-container">
                        <div className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div data-tip="I AM THE INFO OF THE ROOMS" className="small-image-container" style={{ background: "url(&quot;assets/img/conference-room.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div data-tip="I AM THE INFO OF THE ROOMS" className="small-image-container" style={{ background: "url(&quot;assets/img/conference-room2.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div className="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div data-tip="I AM THE INFO OF THE ROOMS" className="small-image-container" style={{ background: "url(&quot;assets/img/conference-room3.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RoomsBrowser;