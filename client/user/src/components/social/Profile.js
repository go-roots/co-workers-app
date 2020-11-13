/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSocialInfos } from '../../store/actions/profiles'
import { modalHandler } from '../../store/actions/profiles'
import noimage from '../../assets/img/noimage.jpg'
import { status, moods } from '../../utils/constants';


const Profile = ({ data: { profile, user } }) => {

    const dispatch = useDispatch();
    const [imageError, setImageError] = useState(false);

    return (
        <div className="card vh-container" id="social-profile-inside">
            <img
                className="card-img-top w-100 d-block"
                alt=''
                onError={() => setImageError(true)}
                // date is for force reredenring an image update
                src={!imageError ? profile?.photo + "?" + new Date().getTime() : noimage}
            />
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
                        {profile?.status}
                    </button>
                    <div className="dropdown-menu">
                        {status.map(s => s === profile.status ? ("") : (
                            <button
                                key={s}
                                className="dropdown-item"
                                type='button'
                                value={s}
                                onClick={() => dispatch(updateSocialInfos("status", s))}
                            >
                                {s}
                            </button>
                        ))}
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
                        {profile?.mood}
                    </button>
                    <div className="dropdown-menu">
                        {moods.map(mood => profile.mood === mood ? ("") : (
                            <button
                                key={mood}
                                className="dropdown-item"
                                type='button'
                                onClick={() => dispatch(updateSocialInfos("mood", mood))}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-baseline status-info">
                <p className="profile-status">Story</p>
                <textarea
                    cols='30'
                    rows='5'
                    placeholder={profile?.story ? profile.story : "Tell to others what you are working on"}
                    onBlur={e => dispatch(updateSocialInfos('story', e.target.value))}
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
    )
}

export default Profile;
