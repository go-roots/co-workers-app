/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from 'react'

import profile from '../../assets/img/profile-image.png'

const Profile = () => {

    const [preview, setPreview] = useState("");

    const handleFiles = e => {
        const files = e.target.files;
        let img;
        if (!e.target.value.startsWith('http')) {
            let file = files[0];
            
            let reader = new FileReader();
            let img = (<img file={file} class="obj" />);

            reader.onload = (function (aImg) {
                return function (e) {
                    aImg = (<img src={e.target.result} style={{width:'100%'}} />)
                    setPreview(aImg);
                };
            })(img);

            reader.readAsDataURL(file);
        } else {
            if (e.target.value.length !== 0) {
                img = (<img src={e.target.value} style={{width:'100%'}} />);
                setPreview(img);
            }
        }
    }

    return (
        <Fragment>
            <div className="card vh-container" id="social-profile-inside">
                <img className="card-img-top w-100 d-block" src={profile} />
                <div id="profile-info">
                    <p>Polar Bear</p>
                    <p>polar.bear2020@gmail.com</p>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-baseline status-info">
                    <p className="profile-status">Current status</p>
                    <div className="dropdown current-status-dropdown">
                        <button className="btn text-info d-flex flex-row-reverse align-items-center"
                            data-toggle="dropdown" aria-expanded="false" type="button">Select your status
                        </button>
                        <div className="dropdown-menu"><a className="dropdown-item" href="#">Do not
                                disturb</a><a className="dropdown-item" href="#">Invisible</a><a
                                className="dropdown-item" href="#">Available</a></div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-baseline status-info">
                    <p className="profile-status">Mood</p>
                    <div className="dropdown current-status-dropdown">
                        <button className="btn text-info d-flex flex-row-reverse align-items-center"
                            data-toggle="dropdown" aria-expanded="false" type="button">Select your mood
                        </button>
                        <div className="dropdown-menu"><a className="dropdown-item" href="#">Prefer to stay
                                alone</a><a className="dropdown-item" href="#">Feeling sociable</a><a
                                className="dropdown-item" href="#">Willing to help
                                others</a></div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-baseline status-info">
                    <p className="profile-status">Stories</p><textarea
                        placeholder="Tell to others what you are working on"></textarea>
                </div>
                <div className="card-body">
                    <h4 className="card-title">Bio</h4>
                    <p className="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
                        odio, dapibus ac
                        facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus...</p>
                    <a className="btn text-info border rounded-0" role="button" href="#" data-toggle="modal"
                        data-target="#edit-profile-modal">Edit profile</a>
                </div>
            </div>
            <div className="modal fade" role="dialog" tabIndex="-1" id="edit-profile-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body" id="edit-profile-container"><small>* = required
                                field</small>
                            <form className="form">
                                <div className="form-group">
                                    <select className="profile-inputs" name="activity-sector">
                                        <option value="0">* Select your main activity-sector</option>
                                        <option value="Accountancy, banking and finance">Accountancy, banking
                                            and
                                            finance
                                        </option>
                                        <option value="Business, consulting and management">Business, consulting
                                            and
                                            management
                                        </option>
                                        <option value="Charity and voluntary work">Charity and voluntary work
                                        </option>
                                        <option value="Creative arts and design">Creative arts and design
                                        </option>
                                        <option value="Student or Learning">Student or Learning</option>
                                        <option value="Instructor or Teacher">Instructor or Teacher</option>
                                        <option value="Energy and utilities">Energy and utilities</option>
                                        <option value="Engineering and manufacturing">Engineering and
                                            manufacturing
                                        </option>
                                        <option value="Environement and agriculture">Environement and
                                            agriculture
                                        </option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Hospitality and events management">Hospitality and events
                                            management
                                        </option>
                                        <option value="Information technologies">Information technologies
                                        </option>
                                        <option value="Law">Law</option>
                                        <option value="Leisure, sport and tourism">Leisure, sport and tourism
                                        </option>
                                        <option value="Marketing, advertising and PR">Marketing, advertising and
                                            PR
                                        </option>
                                        <option value="Media and internet">Media and internet</option>
                                        <option value="Recruitement and retailement">Recruitement and
                                            retailement
                                        </option>
                                        <option value="HR">HR</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Science and pharmaceuticals">Science and pharmaceuticals
                                        </option>
                                        <option value="Social care">Social care</option>
                                        <option value="Transportation and logistics">Transportation and
                                            logistics
                                        </option>
                                    </select>
                                    <small className="form-text">Give us an idea of your field of work</small>
                                </div>
                                <div className="form-group">
                                    <input className="profile-inputs" type="file" onChange={e=> handleFiles(e)}
                                    name="userfile"
                                    id="photo"
                                    size="20"/>
                                    <small className="form-text">Select a photo from your local files</small>
                                    <input className="profile-inputs" type="text" onBlur={e=> handleFiles(e)}
                                    name="webPhoto"
                                    id="photo2"
                                    size="20"
                                    placeholder="http://website.com/someImage.jpg"/>
                                    <small className="form-text">Or from the web...</small>
                                    <div>
                                        <label htmlFor="photo">
                                            <div id="preview">{preview}</div>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input className="profile-inputs" type="text" placeholder="* Company"
                                        name="company" />
                                    <small className="form-text">Could be your own company or one you work
                                        for</small>
                                </div>
                                <div className="form-group">
                                    <input className="profile-inputs" type="text" placeholder="Position"
                                        name="position" />
                                    <small className="form-text">Your position in the above-mentioned
                                        company</small>
                                </div>
                                <div className="form-group">
                                    <input className="profile-inputs" type="text" placeholder="Website"
                                        name="website" />
                                    <small className="form-text">Could be your own or a company website</small>
                                </div>
                                <div className="form-group">
                                    <input className="profile-inputs" type="text" placeholder="* Skills"
                                        name="skills" />
                                    <small className="form-text">Please use comma separated values (eg.
                                        advertisement,e-commerce,teaching,front-end-web-development)</small>
                                </div>
                                <div className="form-group">
                                    <textarea placeholder="A short bio of yourself" rows="5" cols="50" name="bio"
                                        style={{marginTop: 10}}></textarea>
                                    <small className="form-text">Tell us a little about yourself</small>
                                </div>

                                <div id="social-networks-toggler">
                                    <button type="button" className="btn btn-light">
                                        Add Social Network Links
                                    </button>
                                    <span>Optional</span>
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-twitter fa-2x"></i>
                                    <input className="profile-inputs" type="text" placeholder="Twitter URL"
                                        name="twitter" />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-facebook fa-2x"></i>
                                    <input className="profile-inputs" type="text" placeholder="Facebook URL"
                                        name="facebook" />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-youtube fa-2x"></i>
                                    <input className="profile-inputs" type="text" placeholder="YouTube URL"
                                        name="youtube" />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-linkedin fa-2x"></i>
                                    <input className="profile-inputs" type="text" placeholder="Linkedin URL"
                                        name="linkedin" />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-instagram fa-2x"></i>
                                    <input className="profile-inputs" type="text" placeholder="Instagram URL"
                                        name="instagram" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-light" type="button" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;
