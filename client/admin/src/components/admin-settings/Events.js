import React from 'react'
import photo from '../../assets/img/photo-icon.png'


const Events = () => {
    return (
        <div className="col-lg-12 col-xl-6">
            <header>
                <h2 className="text-center">Events</h2>
            </header>
            <div className="d-flex flex-row" id="events-cards">
                <div className="row no-gutters" id="events-cards-container">
                    <div className="col-xl-6">
                        <div className="events-cards-element">
                            <div className="d-flex flex-column align-items-center">
                                <a className="btn" role="button" data-toggle="modal" data-target="#modify-event-image">
                                    <img src={photo} width="180" height="150" />
                                </a>
                                <strong contenteditable="true">Dev night</strong>
                            </div>
                            <p contenteditable="true">Mauris quis augue porta, vehicula justo non, luctus lorem. Etiam bibendum aliquet orci, pretium mollis libero finibus quis.</p>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="events-cards-element">
                            <div className="d-flex flex-column align-items-center">
                                <a className="btn" role="button" data-toggle="modal" data-target="#modify-event-image">
                                    <img src={photo} width="180" height="150" />
                                </a>
                                <strong contenteditable="true">Halloween party</strong>
                            </div>
                            <p contenteditable="true">Morbi eu mauris non tellus tristique laoreet sit amet ut sem. Mauris aliquam tellus in nibh molestie consequat sed at augue.</p>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="events-cards-element">
                            <div className="d-flex flex-column align-items-center">
                                <a className="btn" role="button" data-toggle="modal" data-target="#modify-event-image">
                                    <img src={photo} width="180" height="150" />
                                </a>
                                <strong contenteditable="true">Chinese className</strong>
                            </div>
                            <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales at ipsum non fermentum.</p>
                        </div>
                    </div>
                </div>
                <div className="modal fade" role="dialog" tabindex="-1" id="modify-event-image">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Change event's image</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body d-flex flex-column align-items-start">
                                <img src={photo} width="180" height="150" />
                                <label>Enter the url or a file to submit</label>
                                <input type="file" />
                                <input type="text" style={{ marginTop: '10px' }} placeholder="http://website.com/someImage.jpg" />
                            </div>
                            <div
                                className="modal-footer"><button className="btn btn-light" type="button" data-dismiss="modal">Close</button>
                                <button className="btn btn-primary" type="button">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events
