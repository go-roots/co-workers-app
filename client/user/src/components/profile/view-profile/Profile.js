import React, { Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getProfileById } from '../../../store/actions/profiles';
import Awards from './Awards'
import Comments from './Comments'
import Presentation from './Presentation'
import Recommend from './Recommend'
import Skills from './Skills'


const Profile = () => {

    const profile = useSelector(state => state.profiles.profile);

    if (!profile?.profile) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <section className="main container">
                <Presentation data={profile} />
                <div className="row" style={{ marginBottom: "15px" }}>
                    <Skills data={profile} />
                    <Recommend data={profile} />
                </div>
                <Awards awards={profile.profile.awards} />
                <Comments comments={profile.profile.comments} />
            </section>
        </Fragment>
    )
}

export default Profile
