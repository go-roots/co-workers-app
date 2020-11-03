import React, { Fragment } from 'react'
import { FaInfoCircle } from 'react-icons/fa'

import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';

const RoomsBrowser = () => {
    
    return (
        <Fragment>
            <div class="col">
                <div class="container-fluid recommendation-room-container">
                    <div class="row">
                        <div class="col">
                            <p>Recommended rooms&nbsp;<FaInfoCircle href="#" data-toggle="modal" data-target="#recommendation-modal" /></p>
                            

                            <div class="modal fade" role="dialog" tabindex="-1" id="recommendation-modal">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Rooms recommendation</h4><button type="button"
                                                class="close" data-dismiss="modal" aria-label="Close"><span
                                                    aria-hidden="true">×</span></button>
                                        </div>
                                        <div class="modal-body">
                                            <p>This recommendations are not an obligation, but will help you reduce your
                                                energy consumption. you can follow them or not...</p>
                                            <p>Rooms are recommended 2 parameters : your profile's mood and your
                                                activity sector</p>
                                        </div>
                                        <div class="modal-footer"><button class="btn btn-primary" type="button"
                                                data-dismiss="modal">Gotcha !</button></div>
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                    </div>
                    <div class="row rooms-reco-inner-container">
                        <div class="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div data-tip="I AM THE INFO OF THE ROOMS" class="small-image-container" style={{ background: "url(&quot;assets/img/office-space-1744805_640.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div class="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div class="small-image-container" style={{ background: "url(&quot;assets/img/small-office-4837892_640.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div class="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div class="small-image-container" style={{ background: "url(&quot;assets/img/office-space-1744803_640.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div class="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div class="small-image-container" style={{ background: "url(&quot;assets/img/woman-4780153_640.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid recommendation-room-container">
                    <div class="row">
                        <div class="col d-inline-flex align-items-baseline">
                            <p id="search-rooms-facilities-text-1">Or search rooms with facilities&nbsp;</p>
                            <div class="dropdown"><button class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">Choose a facility&nbsp;</button>
                                <div class="dropdown-menu"><a class="dropdown-item" href="#">Whiteboard</a><a class="dropdown-item" href="#">Video-projector</a><a class="dropdown-item" href="#">TV screen</a><a class="dropdown-item" href="#">Conference</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="row rooms-reco-inner-container">
                        <div class="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div class="small-image-container" style={{ background: "url(&quot;assets/img/conference-room.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div class="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div class="small-image-container" style={{ background: "url(&quot;assets/img/conference-room2.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                        <div class="col-auto col-sm-4 col-md-3 col-lg-3 col-xl-2">
                            <div class="small-image-container" style={{ background: "url(&quot;assets/img/conference-room3.jpg&quot;) center / cover no-repeat" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RoomsBrowser;