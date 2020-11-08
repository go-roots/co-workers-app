import React from 'react'
import photo from '../../assets/img/photo-icon.png'


const Redeemables = () => {
    return (
        <div className="col-xl-6">
            <header>
                <h2 className="text-center">Reedemable</h2>
            </header>
            <div className="d-flex flex-column justify-content-start align-items-center" id="redeemable-container">
                <div className="d-flex flex-row align-items-center reedemable-element">
                    <a className="btn" role="button" data-toggle="modal" data-target="#modify-reedemable-image">
                        <img src={photo} width="200" height="150" />
                    </a>
                    <div className="reedemable-text">
                        <p className="d-flex flex-row align-items-center" contenteditable="true">Coffee cup 100 cwp</p>
                        <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero quis odio lobortis malesuada id sed erat.</p>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center reedemable-element">
                    <a className="btn" role="button" data-toggle="modal" data-target="#modify-reedemable-image">
                        <img src={photo} width="200" height="150" />
                    </a>
                    <div className="reedemable-text">
                        <p className="d-flex flex-row align-items-center" contenteditable="true">Metal straw 200 cwp</p>
                        <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero quis odio lobortis malesuada id sed erat.</p>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center reedemable-element">
                    <a className="btn" role="button" data-toggle="modal" data-target="#modify-reedemable-image">
                        <img src={photo} width="200" height="150" />
                    </a>
                    <div className="reedemable-text">
                        <p className="d-flex flex-row align-items-center" contenteditable="true">Tot bag 800 cwp</p>
                        <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero quis odio lobortis malesuada id sed erat.</p>
                    </div>
                </div>
                <i className="fas fa-plus-circle" id="add-redeemable-icon" data-toggle="modal" data-target="#add-redeemable-modal"></i>
            </div>
            <div className="modal fade" role="dialog" tabindex="-1" id="modify-reedemable-image">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Change redeemable's image</h4>
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
                        <div className="modal-footer">
                            <button className="btn btn-light" type="button" data-dismiss="modal">Close</button>
                            <button className="btn btn-primary" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" role="dialog" tabindex="-1" id="add-redeemable-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add a redeemable</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex flex-column">
                            <div className="d-flex flex-column">
                                <input type="file" id="photo" onchange="handleFiles(files,preview)" size="20" />
                                <label for="photo">Select a photo from your local files</label>
                                <input type="text" id="photo2" placeholder="http://website.com/someImage.jpg" />
                                <label>...or from a web source</label>
                                <div>
                                    <div id="preview"></div>
                                </div>
                            </div>
                            <div id="redeemable-modal-description-container" style={{ paddingTop: '20px' }}>
                                <div className="form-group d-flex flex-column align-items-start">
                                    <textarea></textarea>
                                    <label>Description</label>
                                    <input type="text" />
                                    <label>Price</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-light" type="button" data-dismiss="modal">Close</button>
                            <button className="btn btn-primary" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Redeemables
