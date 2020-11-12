/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { modalHandler } from '../../store/actions/profiles'
import noimage from '../../assets/img/noimage.jpg'


const Profile = ({ data: { profile, user } }) => {

    const dispatch = useDispatch();

    return (
        <Fragment>
            <div className="card vh-container" id="social-profile-inside">
                <img className="card-img-top w-100 d-block" alt='' src={profile?.photo + "?" + new Date().getTime() ?? noimage} />
                <div id="profile-info">
                    <p>{user?.firstName} {user?.lastName}{profile?.position && `, ${profile.position}`}</p>
                    <p>{user?.email}</p>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-baseline status-info">
                    <p className="profile-status">Current status</p>
                    <div className="dropdown current-status-dropdown">
                        <button
                            className="btn text-info d-flex flex-row-reverse align-items-center"
                            data-toggle="dropdown"
                            aria-expanded="false"
                            type="button"
                            disabled={profile?.status === 'Unavailable' ? true : false}
                        >
                            Select your status
                        </button>
                        <div className="dropdown-menu">
                            <button className="dropdown-item" type='button'>Do not disturb</button>
                            <button className="dropdown-item" type='button'>Invisible</button>
                            <button className="dropdown-item" type='button'>Available</button>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-baseline status-info">
                    <p className="profile-status">Mood</p>
                    <div className="dropdown current-status-dropdown">
                        <button
                            className="btn text-info d-flex flex-row-reverse align-items-center"
                            data-toggle="dropdown"
                            aria-expanded="false"
                            type="button"
                            disabled={profile?.status === 'Unavailable' ? true : false}
                        >
                            Select your mood
                        </button>
                        <div className="dropdown-menu">
                            <button className="dropdown-item" type='button'>Prefer to stay alone</button>
                            <button className="dropdown-item" type='button'>Feeling sociable</button>
                            <button className="dropdown-item" type='button'>Willing to help others</button>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-baseline status-info">
                    <p className="profile-status">Story</p>
                    <textarea
                        cols='30'
                        rows='5'
                        placeholder={profile?.story ? profile.story : "Tell to others what you are working on"}
                    ></textarea>
                </div>
                <div className="card-body">
                    <h4 className="card-title">Bio</h4>
                    <i className="card-text">{profile?.bio ? profile.bio : 'Edit your profile to add a bio here'}</i>
                    <button
                        className="btn text-info border rounded-0"
                        type='button'
                        onClick={() => dispatch(modalHandler(true, 'edit'))}
                        style={{ marginTop: '20px' }}
                    >
                        Edit profile
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;
